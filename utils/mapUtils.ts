import type { MapLocation } from '../types/MapLocation'

// ── geocoding ──────────────────────────────────────────────────────────────

const geocodeCache = new Map<string, { lat: number; lng: number }>()

export async function geocode(address: string): Promise<{ lat: number; lng: number } | null> {
  const cacheKey = address.toLowerCase().trim()
  if (geocodeCache.has(cacheKey)) return geocodeCache.get(cacheKey)!

  const params = new URLSearchParams({
    format: 'json', q: address, limit: '1',
    countrycodes: 'eg', viewbox: '32.20,31.20,32.40,31.35', bounded: '0',
  })
  try {
    await new Promise(r => setTimeout(r, 1100))
    const res  = await fetch(`https://nominatim.openstreetmap.org/search?${params}`, {
      headers: { 'Accept-Language': 'en' },
    })
    const data = await res.json()
    if (data.length > 0) {
      const coords = { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) }
      geocodeCache.set(cacheKey, coords)
      return coords
    }
  } catch {}
  return null
}

export async function reverseGeocode(lat: number, lng: number): Promise<string> {
  try {
    const res  = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
      { headers: { 'Accept-Language': 'en' } }
    )
    const data = await res.json()
    return data.display_name ?? `${lat.toFixed(5)}, ${lng.toFixed(5)}`
  } catch {}
  return `${lat.toFixed(5)}, ${lng.toFixed(5)}`
}

// ── report helpers ─────────────────────────────────────────────────────────

export const getStatusText = (status: number): string => {
  const statusMap: Record<number, string> = {
    0: 'Pending', 1: 'In Progress', 2: 'Approved',
    3: 'Rejected', 4: 'Under Review', 5: 'Closed',
  }
  return statusMap[status] ?? 'Unknown'
}

export const getReportFilterType = (type: number): 'report-bite' | 'report-animal' =>
  type === 0 ? 'report-bite' : 'report-animal'

// ── danger zone clustering ─────────────────────────────────────────────────

export type DangerZone = {
  lat:       number
  lng:       number
  count:     number
  radius:    number
  color:     string
  fillColor: string
  label:     string
}

export function buildDangerZones(reportLocs: MapLocation[], minCount = 2): DangerZone[] {
  const CLUSTER_DIST_DEG = 0.004
  const visited = new Set<string | number>()
  const zones: DangerZone[] = []

  for (const loc of reportLocs) {
    if (visited.has(loc.id)) continue

    const cluster = reportLocs.filter(other => {
      const dLat = other.lat - loc.lat
      const dLng = other.lng - loc.lng
      return Math.sqrt(dLat * dLat + dLng * dLng) <= CLUSTER_DIST_DEG
    })
    if (cluster.length < minCount) continue

    cluster.forEach(c => visited.add(c.id))

    const centerLat = cluster.reduce((s, c) => s + c.lat, 0) / cluster.length
    const centerLng = cluster.reduce((s, c) => s + c.lng, 0) / cluster.length
    const maxDistDeg = Math.max(...cluster.map(c => {
      const dLat = c.lat - centerLat
      const dLng = c.lng - centerLng
      return Math.sqrt(dLat * dLat + dLng * dLng)
    }))
    const radius = Math.max(maxDistDeg * 111_000 * 1.5, 300)
    const count  = cluster.length

    const style =
      count >= 7 ? { color: '#7f1d1d', fillColor: '#ef4444', label: '🔴 Critical Zone'  } :
      count >= 4 ? { color: '#9a3412', fillColor: '#f97316', label: '🟠 High Risk Zone'  } :
                   { color: '#854d0e', fillColor: '#facc15', label: '🟡 Caution Zone'    }

    zones.push({ lat: centerLat, lng: centerLng, count, radius, ...style })
  }
  return zones
}

// ── process a raw report into a MapLocation ────────────────────────────────

export async function processReport(
  r: any,
  dynamic: MapLocation[],
  myIds: Set<string | number>,
  forceMyReport = false
): Promise<void> {
  if (r.type === 2) return

  let lat: number | null = null
  let lng: number | null = null
  let addressForDisplay  = ''

  const locationCity  = r.details?.locationCity
  const hasRootCoords = r.latitude || r.lat
  if (!locationCity && !hasRootCoords) return

  // 1. Try root-level coords
  const rootLat = Number(r.latitude ?? r.lat)
  const rootLng = Number(r.longitude ?? r.lng)
  if (rootLat && rootLng && !isNaN(rootLat) && !isNaN(rootLng)) {
    lat = rootLat
    lng = rootLng
    addressForDisplay = [r.district, r.governorate].filter(Boolean).join(', ') || '📍 Unknown'
  }

  // 2. Try locationCity string
  if (!lat && locationCity?.trim()) {
    const coordMatch = locationCity.match(/^(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)$/)
    if (coordMatch) {
      lat = parseFloat(coordMatch[1])
      lng = parseFloat(coordMatch[2])
      addressForDisplay = `📍 ${lat}, ${lng}`
    } else if (locationCity.length > 5) {
      const coords = await geocode(locationCity.trim())
      if (coords) { lat = coords.lat; lng = coords.lng; addressForDisplay = locationCity }
    }
  }

  // 3. Try district + governorate
  if (!lat) {
    const addr = [r.district, r.governorate].filter(Boolean).join(', ')
    if (addr && addr.length > 3) {
      const coords = await geocode(addr)
      if (coords) { lat = coords.lat; lng = coords.lng; addressForDisplay = addr }
    }
  }

  if (!lat || !lng || isNaN(lat) || isNaN(lng)) return

  let symptoms = r.details?.selectedSymptoms || r.details?.symptoms
  if (symptoms && typeof symptoms === 'string') {
    try { symptoms = JSON.parse(symptoms) } catch {}
  }

  if (forceMyReport) myIds.add(r.id)

  const filterType = getReportFilterType(r.type)
  const typeLabel  = r.type === 0 ? '🐕 Bite' : '⚠️ Dangerous Animal'

  dynamic.push({
    id:      r.id,
    name:    `${typeLabel} #${r.id}`,
    address: addressForDisplay,
    lat, lng,
    type:    filterType,
    extra: {
      status:           r.status,
      statusText:       getStatusText(r.status),
      reportType:       r.type === 0 ? 'Bite' : 'Dangerous Animal',
      animalType:       r.details?.animalType,
      symptoms,
      reporterName:     r.name,
      phone:            r.phone,
      exposureDateTime: r.details?.exposureDateTime,
      severity:         r.details?.severity,
      locationCity,
      isMyReport:       forceMyReport,
    },
  })
}