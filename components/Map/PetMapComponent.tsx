
'use client'

import { useEffect, useRef, useState } from 'react'
import { clinicsApi } from '../../data/api/Clinic'
import { getAllApprovedReports } from '../../data/api/report'
import { Clinic } from '../../types/Clinic'

// ── types ──────────────────────────────────────────────────────────────────
type MapLocation = {
  id:      string | number
  name:    string
  address: string
  lat:     number
  lng:     number
  type:    'clinic' | 'vaccine' | 'report' | 'vacc-animal' | 'vacc-human' | 'vacc-area'
  extra?:  Record<string, any>
}

type Props = {
  onSelectLocation?: (lat: number, lng: number, address?: string) => void
  allowPinDrop?:     boolean
}

// ── colors & labels ────────────────────────────────────────────────────────
const TYPE_COLORS = {
  clinic:        '#22c55e',
  vaccine:       '#3b82f6',
  report:        '#ef4444',
  'vacc-animal': '#f59e0b',
  'vacc-human':  '#8b5cf6',
  'vacc-area':   '#06b6d4',
} as const

const FILTER_LABELS = {
  clinic:        '🏥 Clinics',
  vaccine:       '💉 Vaccine Centers',
  report:        '⚠️ Reports',
  'vacc-animal': '🐕 Animal Vacc',
  'vacc-human':  '👤 Human Vacc',
  'vacc-area':   '📍 Vacc Areas',
} as const

// ── geocode cache ──────────────────────────────────────────────────────────
const geocodeCache = new Map<string, { lat: number; lng: number }>()

// ── Nominatim geocode — Port Said biased ──────────────────────────────────
async function geocode(address: string): Promise<{ lat: number; lng: number } | null> {
  const cacheKey = address.toLowerCase().trim()
  if (geocodeCache.has(cacheKey)) return geocodeCache.get(cacheKey)!

  const params = new URLSearchParams({
    format:       'json',
    q:            address,
    limit:        '1',
    countrycodes: 'eg',
    viewbox:      '32.20,31.20,32.40,31.35',
    bounded:      '0',
  })

  try {
    await new Promise(r => setTimeout(r, 1100))
    const res  = await fetch(
      `https://nominatim.openstreetmap.org/search?${params}`,
      { headers: { 'Accept-Language': 'en' } }
    )
    const data = await res.json()
    if (data.length > 0) {
      const coords = { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) }
      geocodeCache.set(cacheKey, coords)
      return coords
    }
  } catch {}
  return null
}

// ── reverse geocode (modal pin drop) ──────────────────────────────────────
async function reverseGeocode(lat: number, lng: number): Promise<string> {
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

// ── status label ──────────────────────────────────────────────────────────
const getStatusText = (status: number): string => {
  const statusMap: Record<number, string> = {
    0: 'Pending',
    1: 'In Progress',
    2: 'Approved',
    3: 'Rejected',
    4: 'Under Review',
    5: 'Closed',
  }
  return statusMap[status] ?? 'Unknown'
}

// ── component ──────────────────────────────────────────────────────────────
export default function PetMap({ onSelectLocation, allowPinDrop = false }: Props) {
  const mapRef         = useRef<HTMLDivElement>(null)
  const modalMapRef    = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  const modalMapInst   = useRef<any>(null)
  const markersRef     = useRef<any[]>([])
  const pinMarkerRef   = useRef<any>(null)

  const [allLocations,  setAllLocations]  = useState<MapLocation[]>([])
  const [activeFilters, setActiveFilters] = useState<Set<string>>(
    new Set(['clinic', 'vaccine', 'report', 'My Reports', 'Dangerous Animal Report', 'Bite Report'])
  )
  const [selectedLoc,  setSelectedLoc]  = useState<MapLocation | null>(null)
  const [loading,      setLoading]      = useState(false)

  // modal state
  const [showLocModal,   setShowLocModal]   = useState(false)
  const [addressInput,   setAddressInput]   = useState('')
  const [addressLoading, setAddressLoading] = useState(false)
  const [addressError,   setAddressError]   = useState('')
  const [pickedCoords,   setPickedCoords]   = useState<{ lat: number; lng: number; address: string } | null>(null)
  const [modalMapReady,  setModalMapReady]  = useState(false)

  // ── fetch data ────────────────────────────────────────────────────────
  useEffect(() => {
    const fetchDynamic = async () => {
      setLoading(true)
      const dynamic: MapLocation[] = []

      // ── Clinics ────────────────────────────────────────────────────
      try {
        const clinics: Clinic[] = await clinicsApi.getAll()
        for (const c of clinics) {
          if (c.latitude && c.longitude) {
            dynamic.push({
              id:      c.id,
              name:    c.name,
              address: c.address ?? '',
              lat:     Number(c.latitude),
              lng:     Number(c.longitude),
              type:    'clinic',
              extra:   { hours: c.workingHours, price: c.bookingPrice, phone: c.phone },
            })
          } else if (c.address) {
            const coords = await geocode(c.address)
            if (coords) dynamic.push({
              id:      c.id,
              name:    c.name,
              address: c.address,
              lat:     coords.lat,
              lng:     coords.lng,
              type:    'clinic',
              extra:   { hours: c.workingHours, price: c.bookingPrice },
            })
          }
        }
      } catch (e) { console.error('clinics fetch error', e) }

      // ── Reports ────────────────────────────────────────────────────
      try {
        const raw     = await getAllApprovedReports()
        const reports: any[] = Array.isArray(raw) ? raw : (raw?.data ?? [])

        console.log(`📊 Total reports from API: ${reports.length}`)

        for (const r of reports) {
          let lat: number | null = null
          let lng: number | null = null
          let addressForDisplay  = ''

          const locationCity  = r.details?.locationCity
          const hasRootCoords = r.latitude || r.lat

          if (!locationCity && !hasRootCoords) {
            console.log(`⚠️ Report ${r.id} has no location data, skipping`)
            continue
          }

          // CASE 1: root-level lat/lng
          const rootLat = Number(r.latitude ?? r.lat)
          const rootLng = Number(r.longitude ?? r.lng)
          if (rootLat && rootLng && !isNaN(rootLat) && !isNaN(rootLng)) {
            lat = rootLat
            lng = rootLng
            addressForDisplay = [r.district, r.governorate].filter(Boolean).join(', ') || '📍 Unknown'
            console.log(`✅ Report ${r.id} - using root coordinates`)
          }

          // CASE 2: locationCity is direct coordinates "31.xxx, 32.xxx"
          if (!lat && locationCity?.trim()) {
            const coordMatch = locationCity.match(/^(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)$/)
            if (coordMatch) {
              lat = parseFloat(coordMatch[1])
              lng = parseFloat(coordMatch[2])
              addressForDisplay = `📍 ${lat}, ${lng}`
              console.log(`✅ Report ${r.id} - direct coordinates from locationCity`)
            } else if (locationCity.length > 5) {
              // CASE 3: locationCity is an address string
              console.log(`🌍 Geocoding Report ${r.id}: "${locationCity.substring(0, 60)}..."`)
              const coords = await geocode(locationCity.trim())
              if (coords) {
                lat = coords.lat
                lng = coords.lng
                addressForDisplay = locationCity
                console.log(`✅ Report ${r.id} - geocoded from locationCity`)
              } else {
                console.log(`❌ Report ${r.id} - geocoding failed for locationCity`)
              }
            }
          }

          // CASE 4: fallback — district + governorate
          if (!lat) {
            const addr = [r.district, r.governorate].filter(Boolean).join(', ')
            if (addr && addr.length > 3) {
              console.log(`🌍 Fallback geocoding Report ${r.id}: "${addr}"`)
              const coords = await geocode(addr)
              if (coords) {
                lat = coords.lat
                lng = coords.lng
                addressForDisplay = addr
                console.log(`✅ Report ${r.id} - fallback geocoded`)
              }
            }
          }

          if (lat && lng && !isNaN(lat) && !isNaN(lng)) {
            let symptoms = r.details?.selectedSymptoms || r.details?.symptoms
            if (symptoms && typeof symptoms === 'string') {
              try { symptoms = JSON.parse(symptoms) } catch {}
            }

            dynamic.push({
              id:      r.id,
              name:    `${r.type === 0 ? '🐕 Bite' : r.type === 1 ? '⚠️ Complaint' : '📋 Dangerous'} #${r.id}`,
              address: addressForDisplay,
              lat, lng,
              type:    'report',
              extra: {
                status:           r.status,
                statusText:       getStatusText(r.status),
                reportType:       r.type === 0 ? 'Bite' : r.type === 1 ? 'Complaint' : 'Dangerous Animal',
                animalType:       r.details?.animalType,
                symptoms,
                reporterName:     r.name,
                phone:            r.phone,
                exposureDateTime: r.details?.exposureDateTime,
                severity:         r.details?.severity,
                locationCity,
              },
            })
          } else {
            console.log(`⚠️ Report ${r.id} - no coordinates found after all attempts`)
          }
        }

        console.log(`✅ Total reports added to map: ${dynamic.filter(l => l.type === 'report').length}`)
      } catch (e) { console.error('reports fetch error', e) }

      setAllLocations(dynamic)
      setLoading(false)
    }

    fetchDynamic()
  }, [])

  // ── Leaflet CSS ────────────────────────────────────────────────────────
  useEffect(() => {
    if (!document.getElementById('leaflet-css')) {
      const link = document.createElement('link')
      link.id = 'leaflet-css'; link.rel = 'stylesheet'
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
      document.head.appendChild(link)
    }
  }, [])

  // ── init main map ──────────────────────────────────────────────────────
  useEffect(() => {
    const init = () => {
      if (!(window as any).L || !mapRef.current || mapInstanceRef.current) return
      const L   = (window as any).L
      const map = L.map(mapRef.current).setView([31.2653, 32.3019], 12)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
      }).addTo(map)
      mapInstanceRef.current = map
    }

    if ((window as any).L) init()
    else {
      const script  = document.createElement('script')
      script.src    = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
      script.onload = init
      document.body.appendChild(script)
    }
    return () => { mapInstanceRef.current?.remove(); mapInstanceRef.current = null }
  }, [])

  // ── update markers ─────────────────────────────────────────────────────
  useEffect(() => {
    const map = mapInstanceRef.current
    if (!map || !(window as any).L) return
    const L = (window as any).L

    markersRef.current.forEach(m => m.remove())
    markersRef.current = []

    allLocations
      .filter(loc => activeFilters.has(loc.type))
      .forEach(loc => {
        const color = TYPE_COLORS[loc.type] ?? '#666'
        const icon  = L.divIcon({
          html:      `<div style="width:14px;height:14px;border-radius:50%;background:${color};border:2.5px solid white;box-shadow:0 2px 6px rgba(0,0,0,.35)"></div>`,
          className: '', iconSize: [14, 14], iconAnchor: [7, 7],
        })

        let symptomsDisplay = ''
        if (loc.extra?.symptoms) {
          try {
            const parsed: string[] = typeof loc.extra.symptoms === 'string'
              ? JSON.parse(loc.extra.symptoms)
              : loc.extra.symptoms
            if (Array.isArray(parsed) && parsed.length > 0) {
              symptomsDisplay = `🔍 ${parsed.slice(0, 3).join(', ')}${parsed.length > 3 ? '...' : ''}<br/>`
            }
          } catch {}
        }

        const popup = `
          <div style="min-width:200px;font-size:13px;line-height:1.6">
            <strong>${loc.name}</strong><br/>
            ${loc.address             ? `<span style="color:#666;font-size:12px">📍 ${loc.address}</span><br/>` : ''}
            ${loc.extra?.reporterName ? `👤 ${loc.extra.reporterName}<br/>` : ''}
            ${loc.extra?.phone        ? `📞 ${loc.extra.phone}<br/>` : ''}
            ${loc.extra?.reportType   ? `📋 ${loc.extra.reportType}<br/>` : ''}
            ${loc.extra?.animalType   ? `🐾 ${loc.extra.animalType}<br/>` : ''}
            ${loc.extra?.exposureDateTime ? `🕐 ${new Date(loc.extra.exposureDateTime).toLocaleString()}<br/>` : ''}
            ${loc.extra?.severity     ? `⚠️ Severity: ${loc.extra.severity}<br/>` : ''}
            ${symptomsDisplay}
            ${loc.extra?.services     ? `🏷 ${loc.extra.services}<br/>` : ''}
            ${loc.extra?.hours        ? `🕐 ${loc.extra.hours}<br/>` : ''}
            ${loc.extra?.price        ? `💰 ${loc.extra.price} EGP<br/>` : ''}
            ${loc.extra?.statusText   ? `🏷 Status: ${loc.extra.statusText}<br/>` : ''}
            ${loc.extra?.campaign     ? `📋 ${loc.extra.campaign}` : ''}
          </div>`

        const marker = L.marker([loc.lat, loc.lng], { icon })
          .addTo(map).bindPopup(popup)
          .on('click', () => setSelectedLoc(loc))
        markersRef.current.push(marker)
      })
  }, [allLocations, activeFilters])

  // ── init modal map ─────────────────────────────────────────────────────
  useEffect(() => {
    if (!showLocModal) {
      modalMapInst.current?.remove()
      modalMapInst.current = null
      setModalMapReady(false)
      return
    }

    const tryInit = () => {
      if (!modalMapRef.current || modalMapInst.current) return
      const L = (window as any).L
      if (!L) return
      setTimeout(() => {
        if (!modalMapRef.current) return
        const mmap = L.map(modalMapRef.current).setView([31.2653, 32.3019], 12)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors',
        }).addTo(mmap)

        mmap.on('click', async (e: any) => {
          const { lat, lng } = e.latlng
          placePinOnModalMap(mmap, L, lat, lng)
          const address = await reverseGeocode(lat, lng)
          setPickedCoords({ lat, lng, address })
          setAddressInput(address)
        })

        modalMapInst.current = mmap
        setModalMapReady(true)
      }, 200)
    }

    if ((window as any).L) tryInit()
    else {
      const script  = document.createElement('script')
      script.src    = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
      script.onload = tryInit
      document.body.appendChild(script)
    }
  }, [showLocModal])

  const placePinOnModalMap = (mmap: any, L: any, lat: number, lng: number) => {
    if (pinMarkerRef.current) { pinMarkerRef.current.remove(); pinMarkerRef.current = null }
    const icon = L.divIcon({
      html:      `<div style="width:22px;height:22px;border-radius:50%;background:#ef4444;border:3px solid white;box-shadow:0 3px 10px rgba(0,0,0,.4)"></div>`,
      className: '', iconSize: [22, 22], iconAnchor: [11, 11],
    })
    pinMarkerRef.current = L.marker([lat, lng], { icon }).addTo(mmap)
    mmap.setView([lat, lng], Math.max(mmap.getZoom(), 14))
  }

  const handleAddressSearch = async () => {
    if (!addressInput.trim()) return
    setAddressLoading(true)
    setAddressError('')
    const coords = await geocode(addressInput.trim())
    if (!coords) {
      setAddressError('Address not found. Try a more specific address.')
      setAddressLoading(false)
      return
    }
    const mmap = modalMapInst.current
    const L    = (window as any).L
    if (mmap && L) placePinOnModalMap(mmap, L, coords.lat, coords.lng)
    setPickedCoords({ lat: coords.lat, lng: coords.lng, address: addressInput.trim() })
    setAddressLoading(false)
  }

  const handleConfirmLocation = () => {
    if (!pickedCoords) return
    onSelectLocation?.(pickedCoords.lat, pickedCoords.lng, pickedCoords.address)
    setShowLocModal(false)
    setPickedCoords(null)
    setAddressInput('')
  }

  const toggleFilter = (type: string) => {
    setActiveFilters(prev => {
      const next = new Set(prev)
      next.has(type) ? next.delete(type) : next.add(type)
      return next
    })
    setSelectedLoc(null)
  }

  // ── render ─────────────────────────────────────────────────────────────
  return (
    <div style={{ minHeight: '100vh', padding: '2rem 0' }}>
      <div className="container">

        {/* Filters + Detect button */}
        <div className="d-flex gap-2 flex-wrap mb-3 align-items-center justify-content-between">
          <div className="d-flex gap-2 flex-wrap align-items-center">
            {(Object.keys(TYPE_COLORS) as (keyof typeof TYPE_COLORS)[]).map(type => {
              const active = activeFilters.has(type)
              const color  = TYPE_COLORS[type]
              return (
                <button key={type} onClick={() => toggleFilter(type)} style={{
                  padding: '5px 14px', borderRadius: 20, cursor: 'pointer',
                  border: `2px solid ${color}`,
                  background: active ? color : 'transparent',
                  color:      active ? 'white' : color,
                  fontWeight: 600, fontSize: 12, transition: 'all 0.2s',
                }}>
                  {FILTER_LABELS[type]}
                </button>
              )
            })}
            {loading && <span className="text-muted small align-self-center ms-1">⏳ Loading…</span>}
          </div>

          {(allowPinDrop || onSelectLocation) && (
            <button onClick={() => setShowLocModal(true)} style={{
              padding: '8px 20px', borderRadius: 20, cursor: 'pointer',
              border: '2px solid #6366f1', background: '#6366f1', color: 'white',
              fontWeight: 700, fontSize: 13, display: 'flex', alignItems: 'center', gap: 6,
              boxShadow: '0 2px 8px rgba(99,102,241,0.35)', whiteSpace: 'nowrap',
            }}>
              📍 Detect Location
            </button>
          )}
        </div>

        {/* Main Map */}
        <div style={{ height: '500px', borderRadius: 12, overflow: 'hidden', border: '1px solid #ddd' }}>
          <div ref={mapRef} style={{ height: '100%', width: '100%', zIndex: 0 }} />
        </div>

        {/* Selected card */}
        {selectedLoc && (
          <div className="card mt-4 p-3">
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <span style={{
                  display: 'inline-block', padding: '2px 10px', borderRadius: 12,
                  background: TYPE_COLORS[selectedLoc.type] + '22',
                  color: TYPE_COLORS[selectedLoc.type], fontSize: 11, fontWeight: 700, marginBottom: 6,
                }}>
                  {FILTER_LABELS[selectedLoc.type]}
                </span>
                <h5 className="mb-1">{selectedLoc.name}</h5>
              </div>
              <button onClick={() => setSelectedLoc(null)}
                style={{ border: 'none', background: 'none', fontSize: 20, cursor: 'pointer', lineHeight: 1 }}>×</button>
            </div>
            {selectedLoc.address               && <p className="mb-1 text-muted small">📍 {selectedLoc.address}</p>}
            {selectedLoc.extra?.reporterName   && <p className="mb-1 small">👤 {selectedLoc.extra.reporterName}</p>}
            {selectedLoc.extra?.phone          && <p className="mb-1 small">📞 {selectedLoc.extra.phone}</p>}
            {selectedLoc.extra?.reportType     && <p className="mb-1 small">📋 {selectedLoc.extra.reportType}</p>}
            {selectedLoc.extra?.animalType     && <p className="mb-1 small">🐾 {selectedLoc.extra.animalType}</p>}
            {selectedLoc.extra?.exposureDateTime && <p className="mb-1 small">🕐 {new Date(selectedLoc.extra.exposureDateTime).toLocaleString()}</p>}
            {selectedLoc.extra?.severity       && <p className="mb-1 small">⚠️ Severity: {selectedLoc.extra.severity}</p>}
            {selectedLoc.extra?.symptoms && (() => {
              try {
                const parsed: string[] = typeof selectedLoc.extra!.symptoms === 'string'
                  ? JSON.parse(selectedLoc.extra!.symptoms)
                  : selectedLoc.extra!.symptoms
                if (Array.isArray(parsed) && parsed.length > 0) {
                  return <p className="mb-1 small">🔍 {parsed.join(', ')}</p>
                }
              } catch {}
              return null
            })()}
            {selectedLoc.extra?.services       && <p className="mb-1 small">🏷 {selectedLoc.extra.services}</p>}
            {selectedLoc.extra?.hours          && <p className="mb-1 small">🕐 {selectedLoc.extra.hours}</p>}
            {selectedLoc.extra?.price          && <p className="mb-1 small">💰 {selectedLoc.extra.price} EGP</p>}
            {selectedLoc.extra?.statusText     && <p className="mb-1 small">🏷 Status: {selectedLoc.extra.statusText}</p>}
            {selectedLoc.extra?.campaign       && <p className="mb-1 small">📋 {selectedLoc.extra.campaign}</p>}
          </div>
        )}
      </div>

      {/* ── Location Detection Modal ── */}
      {showLocModal && (
        <div
          style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.55)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}
          onClick={e => { if (e.target === e.currentTarget) setShowLocModal(false) }}
        >
          <div style={{
            background: '#fff', borderRadius: 16, width: '100%', maxWidth: 620,
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)', overflow: 'hidden',
            display: 'flex', flexDirection: 'column', maxHeight: '90vh',
          }}>
            <div style={{ padding: '18px 20px 14px', borderBottom: '1px solid #f0f0f0',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h5 style={{ margin: 0, fontWeight: 700 }}>📍 Select Location</h5>
                <p style={{ margin: 0, color: '#6b7280', fontSize: 13 }}>Type an address or click on the map</p>
              </div>
              <button onClick={() => setShowLocModal(false)}
                style={{ border: 'none', background: 'none', fontSize: 22, cursor: 'pointer', color: '#9ca3af', lineHeight: 1 }}>×</button>
            </div>

            <div style={{ padding: '14px 20px', borderBottom: '1px solid #f0f0f0' }}>
              <div style={{ display: 'flex', gap: 8 }}>
                <input value={addressInput} onChange={e => setAddressInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleAddressSearch()}
                  placeholder="e.g. Al-Manakh District, Port Said"
                  style={{ flex: 1, padding: '9px 14px', borderRadius: 10,
                    border: '1.5px solid #d1d5db', fontSize: 14, outline: 'none' }} />
                <button onClick={handleAddressSearch} disabled={addressLoading} style={{
                  padding: '9px 18px', borderRadius: 10, border: 'none',
                  background: '#6366f1', color: '#fff', fontWeight: 700,
                  cursor: addressLoading ? 'not-allowed' : 'pointer',
                  fontSize: 14, whiteSpace: 'nowrap', opacity: addressLoading ? 0.7 : 1,
                }}>
                  {addressLoading ? '⏳' : '🔍 Search'}
                </button>
              </div>
              {addressError && <p style={{ color: '#ef4444', fontSize: 12, margin: '6px 0 0' }}>{addressError}</p>}
              {pickedCoords && (
                <div style={{ marginTop: 8, padding: '8px 12px', borderRadius: 8,
                  background: '#f0fdf4', border: '1px solid #bbf7d0', fontSize: 12, color: '#166534' }}>
                  ✅ <strong>Selected:</strong> {pickedCoords.address}
                </div>
              )}
            </div>

            <div style={{ flex: 1, minHeight: 320, position: 'relative' }}>
              {!modalMapReady && (
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center',
                  justifyContent: 'center', background: '#f9fafb', zIndex: 1, fontSize: 14, color: '#6b7280' }}>
                  ⏳ Loading map…
                </div>
              )}
              <div ref={modalMapRef} style={{ height: '100%', minHeight: 320, width: '100%', zIndex: 0 }} />
            </div>

            <div style={{ padding: '14px 20px', borderTop: '1px solid #f0f0f0',
              display: 'flex', justifyContent: 'flex-end', gap: 10, background: '#fafafa' }}>
              <button onClick={() => setShowLocModal(false)} style={{
                padding: '8px 20px', borderRadius: 10, border: '1.5px solid #d1d5db',
                background: '#fff', cursor: 'pointer', fontWeight: 600, fontSize: 14,
              }}>Cancel</button>
              <button onClick={handleConfirmLocation} disabled={!pickedCoords} style={{
                padding: '8px 22px', borderRadius: 10, border: 'none',
                background: pickedCoords ? '#6366f1' : '#e5e7eb',
                color:      pickedCoords ? '#fff'    : '#9ca3af',
                cursor:     pickedCoords ? 'pointer' : 'not-allowed',
                fontWeight: 700, fontSize: 14,
              }}>Confirm Location</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}