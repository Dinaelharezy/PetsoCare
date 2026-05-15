
// 'use client'

// import { useEffect, useRef, useState } from 'react'
// import { clinicsApi } from '../../data/api/Clinic'
// import { getAllApprovedReports } from '../../data/api/report'
// import { Clinic } from '../../types/Clinic'
// import { apiUrl } from '@/lib/api'
// // ── types ──────────────────────────────────────────────────────────────────
// type MapLocation = {
//   id:      string | number
//   name:    string
//   address: string
//   lat:     number
//   lng:     number
//   type:    'clinic' | 'report-bite' | 'report-animal'
//   extra?:  Record<string, any>
// }

// type Props = {
//   onSelectLocation?: (lat: number, lng: number, address?: string) => void
//   allowPinDrop?:     boolean
//   currentUserId?:    string | number
// }

// const TYPE_COLORS = {
//   clinic:          '#306beb',
//   'report-bite':   '#8b5cf6',
//   'report-animal': '#ef4444',
//   'my-reports':    '#f39df5',
// } as const

// const FILTER_LABELS = {
//   clinic:          '🏥 Clinics',
//   'report-bite':   '🐕 Exposure',
//   'report-animal': '⚠️ Dangerous Animal',
//   'my-reports':    '👤 My Reports',
// } as const

// type FilterKey = keyof typeof FILTER_LABELS

// const geocodeCache = new Map<string, { lat: number; lng: number }>()

// async function geocode(address: string): Promise<{ lat: number; lng: number } | null> {
//   const cacheKey = address.toLowerCase().trim()
//   if (geocodeCache.has(cacheKey)) return geocodeCache.get(cacheKey)!
//   const params = new URLSearchParams({
//     format: 'json', q: address, limit: '1',
//     countrycodes: 'eg', viewbox: '32.20,31.20,32.40,31.35', bounded: '0',
//   })
//   try {
//     await new Promise(r => setTimeout(r, 1100))
//     const res  = await fetch(`https://nominatim.openstreetmap.org/search?${params}`, { headers: { 'Accept-Language': 'en' } })
//     const data = await res.json()
//     if (data.length > 0) {
//       const coords = { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) }
//       geocodeCache.set(cacheKey, coords)
//       return coords
//     }
//   } catch {}
//   return null
// }

// async function reverseGeocode(lat: number, lng: number): Promise<string> {
//   try {
//     const res  = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`, { headers: { 'Accept-Language': 'en' } })
//     const data = await res.json()
//     return data.display_name ?? `${lat.toFixed(5)}, ${lng.toFixed(5)}`
//   } catch {}
//   return `${lat.toFixed(5)}, ${lng.toFixed(5)}`
// }

// const getStatusText = (status: number): string => {
//   const statusMap: Record<number, string> = {
//     0: 'Pending', 1: 'In Progress', 2: 'Approved',
//     3: 'Rejected', 4: 'Under Review', 5: 'Closed',
//   }
//   return statusMap[status] ?? 'Unknown'
// }

// const getReportFilterType = (type: number): 'report-bite' | 'report-animal' =>
//   type === 0 ? 'report-bite' : 'report-animal'

// // ── build danger zones from clustered reports ──────────────────────────────
// function buildDangerZones(
//   reportLocs: MapLocation[],
//   minCount = 2
// ): Array<{ lat: number; lng: number; count: number; radius: number; color: string; fillColor: string; label: string }> {
//   const CLUSTER_DIST_DEG = 0.004
//   const visited = new Set<string | number>()
//   const zones: ReturnType<typeof buildDangerZones> = []

//   for (const loc of reportLocs) {
//     if (visited.has(loc.id)) continue
//     const cluster = reportLocs.filter(other => {
//       const dLat = other.lat - loc.lat
//       const dLng = other.lng - loc.lng
//       return Math.sqrt(dLat * dLat + dLng * dLng) <= CLUSTER_DIST_DEG
//     })
//     if (cluster.length < minCount) continue

//     cluster.forEach(c => visited.add(c.id))

//     const centerLat = cluster.reduce((s, c) => s + c.lat, 0) / cluster.length
//     const centerLng = cluster.reduce((s, c) => s + c.lng, 0) / cluster.length

//     const maxDistDeg = Math.max(...cluster.map(c => {
//       const dLat = c.lat - centerLat
//       const dLng = c.lng - centerLng
//       return Math.sqrt(dLat * dLat + dLng * dLng)
//     }))
//     const radiusMeters = Math.max(maxDistDeg * 111_000 * 1.5, 300)

//     const count = cluster.length
//     const { color, fillColor, label } =
//       count >= 7 ? { color: '#7f1d1d', fillColor: '#ef4444', label: '🔴 Critical Zone'  } :
//       count >= 4 ? { color: '#9a3412', fillColor: '#f97316', label: '🟠 High Risk Zone'  } :
//                    { color: '#854d0e', fillColor: '#facc15', label: '🟡 Caution Zone'    }

//     zones.push({ lat: centerLat, lng: centerLng, count, radius: radiusMeters, color, fillColor, label })
//   }

//   return zones
// }

// // ── component ──────────────────────────────────────────────────────────────
// export default function PetMap({ onSelectLocation, allowPinDrop = false, currentUserId }: Props) {
//  const mapRef = useRef<HTMLDivElement & { _leaflet_id?: number }>(null)
//   const modalMapRef    = useRef<HTMLDivElement>(null)
//   const mapInstanceRef = useRef<any>(null)
//   const modalMapInst   = useRef<any>(null)
//   const markersRef     = useRef<any[]>([])
//   const zoneLayersRef  = useRef<any[]>([])
//   const pinMarkerRef   = useRef<any>(null)

//   const [allLocations,  setAllLocations]  = useState<MapLocation[]>([])
//   const [myReportIds,   setMyReportIds]   = useState<Set<string | number>>(new Set())
//   const [activeFilters, setActiveFilters] = useState<Set<FilterKey>>(
//     new Set(['clinic', 'report-bite', 'report-animal'] as FilterKey[])
//   )
//   const [selectedLoc,  setSelectedLoc]  = useState<MapLocation | null>(null)
//   const [loading,      setLoading]      = useState(false)

//   const [showLocModal,   setShowLocModal]   = useState(false)
//   const [addressInput,   setAddressInput]   = useState('')
//   const [addressLoading, setAddressLoading] = useState(false)
//   const [addressError,   setAddressError]   = useState('')
//   const [pickedCoords,   setPickedCoords]   = useState<{ lat: number; lng: number; address: string } | null>(null)
//   const [modalMapReady,  setModalMapReady]  = useState(false)

//   // ── fetch data ─────────────────────────────────────────────────────────
//   useEffect(() => {
//     const fetchDynamic = async () => {
//       setLoading(true)
//       const dynamic: MapLocation[]       = []
//       const myIds: Set<string | number>  = new Set()

//       try {
//         const clinics: Clinic[] = await clinicsApi.getAll()
//         for (const c of clinics) {
//           if (c.latitude && c.longitude) {
//             dynamic.push({
//               id: c.id, name: c.name, address: c.address ?? '',
//               lat: Number(c.latitude), lng: Number(c.longitude), type: 'clinic',
//               extra: { hours: c.workingHours, price: c.bookingPrice, phone: c.phone },
//             })
//           } else if (c.address) {
//             const coords = await geocode(c.address)
//             if (coords) dynamic.push({
//               id: c.id, name: c.name, address: c.address,
//               lat: coords.lat, lng: coords.lng, type: 'clinic',
//               extra: { hours: c.workingHours, price: c.bookingPrice },
//             })
//           }
//         }
//       } catch (e) { console.error('clinics fetch error', e) }

//       try {
//         const raw     = await getAllApprovedReports()
//         const reports: any[] = Array.isArray(raw) ? raw : (raw?.data ?? [])

//         for (const r of reports) {
//           if (r.status === 3) continue
//           if (r.type === 2)   continue

//           let lat: number | null = null
//           let lng: number | null = null
//           let addressForDisplay  = ''

//           const locationCity  = r.details?.locationCity
//           const hasRootCoords = r.latitude || r.lat
//           if (!locationCity && !hasRootCoords) continue

//           const rootLat = Number(r.latitude ?? r.lat)
//           const rootLng = Number(r.longitude ?? r.lng)
//           if (rootLat && rootLng && !isNaN(rootLat) && !isNaN(rootLng)) {
//             lat = rootLat; lng = rootLng
//             addressForDisplay = [r.district, r.governorate].filter(Boolean).join(', ') || '📍 Unknown'
//           }

//           if (!lat && locationCity?.trim()) {
//             const coordMatch = locationCity.match(/^(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)$/)
//             if (coordMatch) {
//               lat = parseFloat(coordMatch[1]); lng = parseFloat(coordMatch[2])
//               addressForDisplay = `📍 ${lat}, ${lng}`
//             } else if (locationCity.length > 5) {
//               const coords = await geocode(locationCity.trim())
//               if (coords) { lat = coords.lat; lng = coords.lng; addressForDisplay = locationCity }
//             }
//           }

//           if (!lat) {
//             const addr = [r.district, r.governorate].filter(Boolean).join(', ')
//             if (addr && addr.length > 3) {
//               const coords = await geocode(addr)
//               if (coords) { lat = coords.lat; lng = coords.lng; addressForDisplay = addr }
//             }
//           }

//           if (lat && lng && !isNaN(lat) && !isNaN(lng)) {
//             let symptoms = r.details?.selectedSymptoms || r.details?.symptoms
//             if (symptoms && typeof symptoms === 'string') { try { symptoms = JSON.parse(symptoms) } catch {} }

//             const filterType = getReportFilterType(r.type)
//             if (currentUserId && (r.userId === currentUserId || r.reporterId === currentUserId)) myIds.add(r.id)

//             const typeLabel = r.type === 0 ? '🐕 Bite' : '⚠️ Dangerous Animal'
//             dynamic.push({
//               id: r.id, name: `${typeLabel} #${r.id}`,
//               address: addressForDisplay, lat, lng, type: filterType,
//               extra: {
//                 status: r.status, statusText: getStatusText(r.status),
//                 reportType: r.type === 0 ? 'Bite' : 'Dangerous Animal',
//                 animalType: r.details?.animalType, symptoms,
//                 reporterName: r.name, phone: r.phone,
//                 exposureDateTime: r.details?.exposureDateTime,
//                 severity: r.details?.severity, locationCity,
//                 isMyReport: currentUserId && (r.userId === currentUserId || r.reporterId === currentUserId),
//               },
//             })
//           }
//         }
//       } catch (e) { console.error('reports fetch error', e) }

//       setAllLocations(dynamic)
//       setMyReportIds(myIds)
//       setLoading(false)
//     }
//     fetchDynamic()
//   }, [currentUserId])

//   // ── Leaflet CSS ────────────────────────────────────────────────────────
//   useEffect(() => {
//     if (!document.getElementById('leaflet-css')) {
//       const link = document.createElement('link')
//       link.id = 'leaflet-css'; link.rel = 'stylesheet'
//       link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
//       document.head.appendChild(link)
//     }
//   }, [])

//   // ── init main map ──────────────────────────────────────────────────────
//   useEffect(() => {
//     const init = () => {
//       if (!(window as any).L || !mapRef.current || mapInstanceRef.current) return
//       const L   = (window as any).L
//       const map = L.map(mapRef.current).setView([31.2653, 32.3019], 12)
//       L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//         attribution: '© OpenStreetMap contributors',
//       }).addTo(map)
//       mapInstanceRef.current = map
//     }
//     if ((window as any).L) init()
//     else {
//       const script = document.createElement('script')
//       script.src   = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
//       script.onload = init
//       document.body.appendChild(script)
//     }
//     return () => { mapInstanceRef.current?.remove(); mapInstanceRef.current = null }
//   }, [])

//   // ── update markers + danger zones ─────────────────────────────────────
//   useEffect(() => {
//     const map = mapInstanceRef.current
//     const L   = (window as any).L

//     // ✅ guard: map must exist and be fully loaded
  
//     if (!map || !L || !(map as any)._loaded) return;

//     // clear old markers
//     markersRef.current.forEach(m => { try { m.remove() } catch {} })
//     markersRef.current = []

//     // clear old zones
//     zoneLayersRef.current.forEach(z => { try { z.remove() } catch {} })
//     zoneLayersRef.current = []

//     const visibleLocations = allLocations.filter(loc => {
//       if (activeFilters.has('my-reports') && myReportIds.has(loc.id)) return true
//       return activeFilters.has(loc.type as FilterKey)
//     })

//     // density map for dot colouring
//     const GRID = 0.02
//     const densityMap = new Map<string, number>()
//     visibleLocations.filter(l => l.type.startsWith('report')).forEach(loc => {
//       const key = `${Math.floor(loc.lat / GRID)}_${Math.floor(loc.lng / GRID)}`
//       densityMap.set(key, (densityMap.get(key) ?? 0) + 1)
//     })
//     const getDensityColor = (lat: number, lng: number): string => {
//       const count = densityMap.get(`${Math.floor(lat / GRID)}_${Math.floor(lng / GRID)}`) ?? 1
//       if (count >= 7) return '#dc2626'
//       if (count >= 4) return '#f97316'
//       if (count >= 2) return '#facc15'
//       return '#22c55e'
//     }

//     // ── danger zones drawn first (below markers) ───────────────────────
//     const reportLocs = visibleLocations.filter(l => l.type.startsWith('report'))
//     const zones      = buildDangerZones(reportLocs, 2)

//     zones.forEach(zone => {
//       try {
//         const outerRing = L.circle([zone.lat, zone.lng], {
//           radius:      zone.radius * 1.25,
//           color:       zone.color,
//           fillColor:   zone.fillColor,
//           fillOpacity: 0.06,
//           weight:      0,
//           interactive: false,
//         }).addTo(map)

//         const circle = L.circle([zone.lat, zone.lng], {
//           radius:      zone.radius,
//           color:       zone.color,
//           fillColor:   zone.fillColor,
//           fillOpacity: 0.15,
//           weight:      2,
//           dashArray:   '6 5',
//           interactive: true,
//         }).addTo(map)

//         circle.bindPopup(`
//           <div style="min-width:180px;font-size:13px;line-height:1.7">
//             <strong style="font-size:14px">${zone.label}</strong><br/>
//             <span style="color:#666">📍 ${zone.count} reports in this area</span><br/>
//             <span style="color:#ef4444;font-weight:600">⚠️ Exercise caution nearby</span>
//           </div>
//         `)

//         zoneLayersRef.current.push(outerRing, circle)
//       } catch (e) {
//         console.warn('Zone render failed:', e)
//       }
//     })

//     // ── markers ────────────────────────────────────────────────────────
//     visibleLocations.forEach(loc => {
//       try {
//         const isMyReport = activeFilters.has('my-reports') && myReportIds.has(loc.id)
//         const color =
//           isMyReport ? TYPE_COLORS['my-reports']
//           : loc.type.startsWith('report') ? getDensityColor(loc.lat, loc.lng)
//           : (TYPE_COLORS as any)[loc.type] ?? '#666'

//         const isHot   = loc.type.startsWith('report') && (color === '#dc2626' || color === '#f97316')
//         const dotSize = isHot ? 18 : 14

//         const icon = L.divIcon({
//           html: isHot
//             ? `<div style="position:relative;width:${dotSize}px;height:${dotSize}px">
//                  <div style="position:absolute;inset:-5px;border-radius:50%;border:2px solid ${color};opacity:.45;animation:ping 1.4s cubic-bezier(0,0,.2,1) infinite"></div>
//                  <div style="width:100%;height:100%;border-radius:50%;background:${color};border:2.5px solid white;box-shadow:0 2px 8px rgba(0,0,0,.45)"></div>
//                </div>`
//             : `<div style="width:${dotSize}px;height:${dotSize}px;border-radius:50%;background:${color};border:2.5px solid white;box-shadow:0 2px 6px rgba(0,0,0,.35)"></div>`,
//           className: '', iconSize: [dotSize, dotSize], iconAnchor: [dotSize / 2, dotSize / 2],
//         })

//         let symptomsDisplay = ''
//         if (loc.extra?.symptoms) {
//           try {
//             const parsed: string[] = typeof loc.extra.symptoms === 'string'
//               ? JSON.parse(loc.extra.symptoms) : loc.extra.symptoms
//             if (Array.isArray(parsed) && parsed.length > 0)
//               symptomsDisplay = `🔍 ${parsed.slice(0, 3).join(', ')}${parsed.length > 3 ? '...' : ''}<br/>`
//           } catch {}
//         }

//         const severityBadge = loc.extra?.severity ? (() => {
//           const sv = loc.extra.severity.toLowerCase()
//           const bg = sv === 'superficial' ? '#fef9c3' : sv === 'moderate' || sv === 'deep' ? '#ffedd5' : '#fee2e2'
//           const fg = sv === 'superficial' ? '#854d0e' : sv === 'moderate' || sv === 'deep' ? '#9a3412' : '#7f1d1d'
//           const lbl = sv === 'superficial' ? '🟡 Superficial' : sv === 'moderate' ? '🟠 Moderate'
//             : sv === 'deep' ? '🟠 Deep' : sv === 'severe' ? '🔴 Severe' : `⚫ ${loc.extra.severity}`
//           return `<span style="display:inline-block;padding:2px 8px;border-radius:10px;background:${bg};color:${fg};font-size:11px;font-weight:700;margin-bottom:4px">${lbl}</span><br/>`
//         })() : ''

//         const popup = `
//           <div style="min-width:200px;font-size:13px;line-height:1.6">
//             <strong>${loc.name}</strong><br/>
//             ${severityBadge}
//             ${loc.address             ? `<span style="color:#666;font-size:12px">📍 ${loc.address}</span><br/>` : ''}
//             ${loc.extra?.reporterName ? `👤 ${loc.extra.reporterName}<br/>` : ''}
//             ${loc.extra?.phone        ? `📞 ${loc.extra.phone}<br/>` : ''}
//             ${loc.extra?.reportType   ? `📋 ${loc.extra.reportType}<br/>` : ''}
//             ${loc.extra?.animalType   ? `🐾 ${loc.extra.animalType}<br/>` : ''}
//             ${loc.extra?.exposureDateTime ? `🕐 ${new Date(loc.extra.exposureDateTime).toLocaleString()}<br/>` : ''}
//             ${symptomsDisplay}
//             ${loc.extra?.hours        ? `🕐 ${loc.extra.hours}<br/>` : ''}
//             ${loc.extra?.price        ? `💰 ${loc.extra.price} EGP<br/>` : ''}
//             ${loc.extra?.statusText   ? `🏷 Status: ${loc.extra.statusText}<br/>` : ''}
//           </div>`

//         const marker = L.marker([loc.lat, loc.lng], { icon })
//           .addTo(map).bindPopup(popup)
//           .on('click', () => setSelectedLoc(loc))
//         markersRef.current.push(marker)
//       } catch (e) {
//         console.warn('Marker render failed:', e)
//       }
//     })
//   }, [allLocations, activeFilters, myReportIds])

//   // ── init modal map ─────────────────────────────────────────────────────
//   useEffect(() => {
//     if (!showLocModal) {
//       modalMapInst.current?.remove()
//       modalMapInst.current = null
//       setModalMapReady(false)
//       return
//     }
//     const tryInit = () => {
//       if (!modalMapRef.current || modalMapInst.current) return
//       const L = (window as any).L
//       if (!L) return
//       setTimeout(() => {
//         if (!modalMapRef.current) return
//         const mmap = L.map(modalMapRef.current).setView([31.2653, 32.3019], 12)
//         L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//           attribution: '© OpenStreetMap contributors',
//         }).addTo(mmap)
//         mmap.on('click', async (e: any) => {
//           const { lat, lng } = e.latlng
//           placePinOnModalMap(mmap, L, lat, lng)
//           const address = await reverseGeocode(lat, lng)
//           setPickedCoords({ lat, lng, address })
//           setAddressInput(address)
//         })
//         modalMapInst.current = mmap
//         setModalMapReady(true)
//       }, 200)
//     }
//     if ((window as any).L) tryInit()
//     else {
//       const script = document.createElement('script')
//       script.src   = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
//       script.onload = tryInit
//       document.body.appendChild(script)
//     }
//   }, [showLocModal])

//   const placePinOnModalMap = (mmap: any, L: any, lat: number, lng: number) => {
//     if (pinMarkerRef.current) { pinMarkerRef.current.remove(); pinMarkerRef.current = null }
//     const icon = L.divIcon({
//       html:      `<div style="width:22px;height:22px;border-radius:50%;background:#ef4444;border:3px solid white;box-shadow:0 3px 10px rgba(0,0,0,.4)"></div>`,
//       className: '', iconSize: [22, 22], iconAnchor: [11, 11],
//     })
//     pinMarkerRef.current = L.marker([lat, lng], { icon }).addTo(mmap)
//     mmap.setView([lat, lng], Math.max(mmap.getZoom(), 14))
//   }

//   const handleAddressSearch = async () => {
//     if (!addressInput.trim()) return
//     setAddressLoading(true); setAddressError('')
//     const coords = await geocode(addressInput.trim())
//     if (!coords) { setAddressError('Address not found. Try a more specific address.'); setAddressLoading(false); return }
//     const mmap = modalMapInst.current; const L = (window as any).L
//     if (mmap && L) placePinOnModalMap(mmap, L, coords.lat, coords.lng)
//     setPickedCoords({ lat: coords.lat, lng: coords.lng, address: addressInput.trim() })
//     setAddressLoading(false)
//   }

//   const handleConfirmLocation = () => {
//     if (!pickedCoords) return
//     onSelectLocation?.(pickedCoords.lat, pickedCoords.lng, pickedCoords.address)
//     setShowLocModal(false); setPickedCoords(null); setAddressInput('')
//   }

//   const toggleFilter = (type: FilterKey) => {
//     setActiveFilters(prev => { const next = new Set(prev); next.has(type) ? next.delete(type) : next.add(type); return next })
//     setSelectedLoc(null)
//   }

//   // ── render ─────────────────────────────────────────────────────────────
//   return (
//     <div style={{ minHeight: '100vh', padding: '2rem 0' }}>
//       <div className="container">

//         {/* Filters + Detect button */}
//         <div className="d-flex gap-2 flex-wrap mb-3 align-items-center justify-content-between">
//           <div className="d-flex gap-2 flex-wrap align-items-center">
//             {(Object.keys(FILTER_LABELS) as FilterKey[]).map(type => {
//               const active = activeFilters.has(type)
//               const color  = TYPE_COLORS[type]
//               return (
//                 <button key={type} onClick={() => toggleFilter(type)} style={{
//                   padding: '5px 14px', borderRadius: 20, cursor: 'pointer',
//                   border: `2px solid ${color}`,
//                   background: active ? color : 'transparent',
//                   color:      active ? 'white' : color,
//                   fontWeight: 600, fontSize: 12, transition: 'all 0.2s',
//                 }}>
//                   {FILTER_LABELS[type]}
//                 </button>
//               )
//             })}
//             {loading && <span className="text-muted small align-self-center ms-1">⏳ Loading…</span>}
//           </div>

//           {(allowPinDrop || onSelectLocation) && (
//             <button onClick={() => setShowLocModal(true)} style={{
//               padding: '8px 20px', borderRadius: 20, cursor: 'pointer',
//               border: '2px solid #6366f1', background: '#6366f1', color: 'white',
//               fontWeight: 700, fontSize: 13, display: 'flex', alignItems: 'center', gap: 6,
//               boxShadow: '0 2px 8px rgba(99,102,241,0.35)', whiteSpace: 'nowrap',
//             }}>
//               📍 Detect Location
//             </button>
//           )}
//         </div>

//         {/* Main Map */}
//         <div style={{ height: '500px', borderRadius: 12, overflow: 'hidden', border: '1px solid #ddd', position: 'relative' }}>
//           <style>{`@keyframes ping { 75%,100% { transform:scale(2);opacity:0; } }`}</style>
//           <div ref={mapRef} style={{ height: '100%', width: '100%', zIndex: 0 }} />

//           {/* Legend */}
//           <div style={{
//             position: 'absolute', bottom: 24, right: 12, zIndex: 999,
//             background: 'rgba(255,255,255,0.95)', borderRadius: 10,
//             padding: '10px 14px', boxShadow: '0 2px 12px rgba(0,0,0,.18)',
//             fontSize: 12, lineHeight: 1.8, backdropFilter: 'blur(4px)',
//             border: '1px solid #e5e7eb',
//           }}>
//             <div style={{ fontWeight: 700, marginBottom: 4, color: '#374151', fontSize: 11 }}>📊 Report Density</div>
//             {[
//               { color: '#22c55e', label: 'Low (1 report)'  },
//               { color: '#facc15', label: 'Moderate (2–3)'  },
//               { color: '#f97316', label: 'High (4–6)'      },
//               { color: '#dc2626', label: 'Critical (7+)'   },
//             ].map(({ color, label }) => (
//               <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
//                 <div style={{ width: 12, height: 12, borderRadius: '50%', background: color, border: '2px solid white', boxShadow: '0 1px 4px rgba(0,0,0,.25)', flexShrink: 0 }} />
//                 <span style={{ color: '#374151' }}>{label}</span>
//               </div>
//             ))}
//             <div style={{ borderTop: '1px solid #f0f0f0', marginTop: 8, paddingTop: 8, fontWeight: 700, color: '#374151', fontSize: 11, marginBottom: 4 }}>
//               🔴 Danger Zones
//             </div>
//             {[
//               { color: '#facc15', border: '#854d0e', label: '🟡 Caution (2–3)'   },
//               { color: '#f97316', border: '#9a3412', label: '🟠 High Risk (4–6)'  },
//               { color: '#ef4444', border: '#7f1d1d', label: '🔴 Critical (7+)'    },
//             ].map(({ color, border, label }) => (
//               <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
//                 <div style={{ width: 14, height: 14, borderRadius: '50%', background: color + '40', border: `2px dashed ${border}`, flexShrink: 0 }} />
//                 <span style={{ color: '#374151' }}>{label}</span>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Selected card */}
//         {selectedLoc && (
//           <div className="card mt-4 p-3">
//             <div className="d-flex justify-content-between align-items-start">
//               <div>
//                 <span style={{
//                   display: 'inline-block', padding: '2px 10px', borderRadius: 12,
//                   background: ((TYPE_COLORS as any)[selectedLoc.type] ?? '#666') + '22',
//                   color: (TYPE_COLORS as any)[selectedLoc.type] ?? '#666',
//                   fontSize: 11, fontWeight: 700, marginBottom: 6,
//                 }}>
//                   {(FILTER_LABELS as any)[selectedLoc.type]}
//                 </span>
//                 <h5 className="mb-1">{selectedLoc.name}</h5>
//               </div>
//               <button onClick={() => setSelectedLoc(null)}
//                 style={{ border: 'none', background: 'none', fontSize: 20, cursor: 'pointer', lineHeight: 1 }}>×</button>
//             </div>
//             {selectedLoc.address               && <p className="mb-1 text-muted small">📍 {selectedLoc.address}</p>}
//             {selectedLoc.extra?.reporterName   && <p className="mb-1 small">👤 {selectedLoc.extra.reporterName}</p>}
//             {selectedLoc.extra?.phone          && <p className="mb-1 small">📞 {selectedLoc.extra.phone}</p>}
//             {selectedLoc.extra?.reportType     && <p className="mb-1 small">📋 {selectedLoc.extra.reportType}</p>}
//             {selectedLoc.extra?.animalType     && <p className="mb-1 small">🐾 {selectedLoc.extra.animalType}</p>}
//             {selectedLoc.extra?.exposureDateTime && <p className="mb-1 small">🕐 {new Date(selectedLoc.extra.exposureDateTime).toLocaleString()}</p>}
//             {selectedLoc.extra?.severity && (() => {
//               const sv = selectedLoc.extra!.severity.toLowerCase()
//               const bg = sv === 'superficial' ? '#fef9c3' : sv === 'deep' || sv === 'moderate' ? '#ffedd5' : '#fee2e2'
//               const fg = sv === 'superficial' ? '#854d0e' : sv === 'deep' || sv === 'moderate' ? '#9a3412' : '#7f1d1d'
//               const dotColor = sv === 'superficial' ? '#facc15' : sv === 'deep' || sv === 'moderate' ? '#f97316' : '#dc2626'
//               const label = sv === 'superficial' ? 'Superficial' : sv === 'deep' ? 'Deep'
//                 : sv === 'moderate' ? 'Moderate' : sv === 'severe' ? 'Severe' : selectedLoc.extra!.severity
//               return (
//                 <p className="mb-1 small d-flex align-items-center gap-2">
//                   <span>⚠️ Severity:</span>
//                   <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '2px 10px', borderRadius: 12, background: bg, color: fg, fontWeight: 700, fontSize: 11 }}>
//                     <span style={{ width: 9, height: 9, borderRadius: '50%', background: dotColor, display: 'inline-block' }} />
//                     {label}
//                   </span>
//                 </p>
//               )
//             })()}
//             {selectedLoc.extra?.symptoms && (() => {
//               try {
//                 const parsed: string[] = typeof selectedLoc.extra!.symptoms === 'string'
//                   ? JSON.parse(selectedLoc.extra!.symptoms) : selectedLoc.extra!.symptoms
//                 if (Array.isArray(parsed) && parsed.length > 0)
//                   return <p className="mb-1 small">🔍 {parsed.join(', ')}</p>
//               } catch {}
//               return null
//             })()}
//             {selectedLoc.extra?.hours      && <p className="mb-1 small">🕐 {selectedLoc.extra.hours}</p>}
//             {selectedLoc.extra?.price      && <p className="mb-1 small">💰 {selectedLoc.extra.price} EGP</p>}
//             {selectedLoc.extra?.statusText && <p className="mb-1 small">🏷 Status: {selectedLoc.extra.statusText}</p>}
//           </div>
//         )}
//       </div>

//       {/* ── Location Modal ── */}
//       {showLocModal && (
//         <div
//           style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}
//           onClick={e => { if (e.target === e.currentTarget) setShowLocModal(false) }}
//         >
//           <div style={{ background: '#fff', borderRadius: 16, width: '100%', maxWidth: 620, boxShadow: '0 20px 60px rgba(0,0,0,0.3)', overflow: 'hidden', display: 'flex', flexDirection: 'column', maxHeight: '90vh' }}>
//             <div style={{ padding: '18px 20px 14px', borderBottom: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//               <div>
//                 <h5 style={{ margin: 0, fontWeight: 700 }}>📍 Select Location</h5>
//                 <p style={{ margin: 0, color: '#6b7280', fontSize: 13 }}>Type an address or click on the map</p>
//               </div>
//               <button onClick={() => setShowLocModal(false)} style={{ border: 'none', background: 'none', fontSize: 22, cursor: 'pointer', color: '#9ca3af', lineHeight: 1 }}>×</button>
//             </div>
//             <div style={{ padding: '14px 20px', borderBottom: '1px solid #f0f0f0' }}>
//               <div style={{ display: 'flex', gap: 8 }}>
//                 <input value={addressInput} onChange={e => setAddressInput(e.target.value)}
//                   onKeyDown={e => e.key === 'Enter' && handleAddressSearch()}
//                   placeholder="e.g. Al-Manakh District, Port Said"
//                   style={{ flex: 1, padding: '9px 14px', borderRadius: 10, border: '1.5px solid #d1d5db', fontSize: 14, outline: 'none' }} />
//                 <button onClick={handleAddressSearch} disabled={addressLoading} style={{
//                   padding: '9px 18px', borderRadius: 10, border: 'none',
//                   background: '#6366f1', color: '#fff', fontWeight: 700,
//                   cursor: addressLoading ? 'not-allowed' : 'pointer',
//                   fontSize: 14, whiteSpace: 'nowrap', opacity: addressLoading ? 0.7 : 1,
//                 }}>
//                   {addressLoading ? '⏳' : '🔍 Search'}
//                 </button>
//               </div>
//               {addressError && <p style={{ color: '#ef4444', fontSize: 12, margin: '6px 0 0' }}>{addressError}</p>}
//               {pickedCoords && (
//                 <div style={{ marginTop: 8, padding: '8px 12px', borderRadius: 8, background: '#f0fdf4', border: '1px solid #bbf7d0', fontSize: 12, color: '#166534' }}>
//                   ✅ <strong>Selected:</strong> {pickedCoords.address}
//                 </div>
//               )}
//             </div>
//             <div style={{ flex: 1, minHeight: 320, position: 'relative' }}>
//               {!modalMapReady && (
//                 <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f9fafb', zIndex: 1, fontSize: 14, color: '#6b7280' }}>
//                   ⏳ Loading map…
//                 </div>
//               )}
//               <div ref={modalMapRef} style={{ height: '100%', minHeight: 320, width: '100%', zIndex: 0 }} />
//             </div>
//             <div style={{ padding: '14px 20px', borderTop: '1px solid #f0f0f0', display: 'flex', justifyContent: 'flex-end', gap: 10, background: '#fafafa' }}>
//               <button onClick={() => setShowLocModal(false)} style={{ padding: '8px 20px', borderRadius: 10, border: '1.5px solid #d1d5db', background: '#fff', cursor: 'pointer', fontWeight: 600, fontSize: 14 }}>Cancel</button>
//               <button onClick={handleConfirmLocation} disabled={!pickedCoords} style={{
//                 padding: '8px 22px', borderRadius: 10, border: 'none',
//                 background: pickedCoords ? '#6366f1' : '#e5e7eb',
//                 color:      pickedCoords ? '#fff'    : '#9ca3af',
//                 cursor:     pickedCoords ? 'pointer' : 'not-allowed',
//                 fontWeight: 700, fontSize: 14,
//               }}>Confirm Location</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

'use client'

import { useEffect, useRef, useState } from 'react'
import { clinicsApi } from '../../data/api/Clinic'
import { getAllApprovedReports, getMyReports } from '../../data/api/report'
import { Clinic } from '../../types/Clinic'
import { apiUrl } from '@/lib/api'

// ── types ──────────────────────────────────────────────────────────────────
type MapLocation = {
  id:      string | number
  name:    string
  address: string
  lat:     number
  lng:     number
  type:    'clinic' | 'report-bite' | 'report-animal'
  extra?:  Record<string, any>
}

type Props = {
  onSelectLocation?: (lat: number, lng: number, address?: string) => void
  allowPinDrop?:     boolean
  currentUserId?:    string | number
}

const TYPE_COLORS = {
  clinic:          '#306beb',
  'report-bite':   '#8b5cf6',
  'report-animal': '#ef4444',
  'my-reports':    '#2fd2d2',
} as const

const FILTER_LABELS = {
  clinic:          '🏥 Clinics',
  'report-bite':   '🐕 Exposure',
  'report-animal': '⚠️ Dangerous Animal',
  'my-reports':    '👤 My Reports',
} as const

type FilterKey = keyof typeof FILTER_LABELS

const geocodeCache = new Map<string, { lat: number; lng: number }>()

async function geocode(address: string): Promise<{ lat: number; lng: number } | null> {
  const cacheKey = address.toLowerCase().trim()
  if (geocodeCache.has(cacheKey)) return geocodeCache.get(cacheKey)!
  const params = new URLSearchParams({
    format: 'json', q: address, limit: '1',
    countrycodes: 'eg', viewbox: '32.20,31.20,32.40,31.35', bounded: '0',
  })
  try {
    await new Promise(r => setTimeout(r, 1100))
    const res  = await fetch(`https://nominatim.openstreetmap.org/search?${params}`, { headers: { 'Accept-Language': 'en' } })
    const data = await res.json()
    if (data.length > 0) {
      const coords = { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) }
      geocodeCache.set(cacheKey, coords)
      return coords
    }
  } catch {}
  return null
}

async function reverseGeocode(lat: number, lng: number): Promise<string> {
  try {
    const res  = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`, { headers: { 'Accept-Language': 'en' } })
    const data = await res.json()
    return data.display_name ?? `${lat.toFixed(5)}, ${lng.toFixed(5)}`
  } catch {}
  return `${lat.toFixed(5)}, ${lng.toFixed(5)}`
}

const getStatusText = (status: number): string => {
  const statusMap: Record<number, string> = {
    0: 'Pending', 1: 'In Progress', 2: 'Approved',
    3: 'Rejected', 4: 'Under Review', 5: 'Closed',
  }
  return statusMap[status] ?? 'Unknown'
}

const getReportFilterType = (type: number): 'report-bite' | 'report-animal' =>
  type === 0 ? 'report-bite' : 'report-animal'

// ── build danger zones ─────────────────────────────────────────────────────
function buildDangerZones(
  reportLocs: MapLocation[],
  minCount = 2
): Array<{ lat: number; lng: number; count: number; radius: number; color: string; fillColor: string; label: string }> {
  const CLUSTER_DIST_DEG = 0.004
  const visited = new Set<string | number>()
  const zones: ReturnType<typeof buildDangerZones> = []

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
    const radiusMeters = Math.max(maxDistDeg * 111_000 * 1.5, 300)
    const count = cluster.length
    const { color, fillColor, label } =
      count >= 7 ? { color: '#7f1d1d', fillColor: '#ef4444', label: '🔴 Critical Zone'  } :
      count >= 4 ? { color: '#9a3412', fillColor: '#f97316', label: '🟠 High Risk Zone'  } :
                   { color: '#854d0e', fillColor: '#facc15', label: '🟡 Caution Zone'    }
    zones.push({ lat: centerLat, lng: centerLng, count, radius: radiusMeters, color, fillColor, label })
  }
  return zones
}

// ── helper: process one report into dynamic + myIds ────────────────────────
async function processReport(
  r: any,
  dynamic: MapLocation[],
  myIds: Set<string | number>,
  forceMyReport = false
) {
  if (r.type === 2) return

  let lat: number | null = null
  let lng: number | null = null
  let addressForDisplay  = ''

  const locationCity  = r.details?.locationCity
  const hasRootCoords = r.latitude || r.lat
  if (!locationCity && !hasRootCoords) return

  const rootLat = Number(r.latitude ?? r.lat)
  const rootLng = Number(r.longitude ?? r.lng)
  if (rootLat && rootLng && !isNaN(rootLat) && !isNaN(rootLng)) {
    lat = rootLat; lng = rootLng
    addressForDisplay = [r.district, r.governorate].filter(Boolean).join(', ') || '📍 Unknown'
  }

  if (!lat && locationCity?.trim()) {
    const coordMatch = locationCity.match(/^(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)$/)
    if (coordMatch) {
      lat = parseFloat(coordMatch[1]); lng = parseFloat(coordMatch[2])
      addressForDisplay = `📍 ${lat}, ${lng}`
    } else if (locationCity.length > 5) {
      const coords = await geocode(locationCity.trim())
      if (coords) { lat = coords.lat; lng = coords.lng; addressForDisplay = locationCity }
    }
  }

  if (!lat) {
    const addr = [r.district, r.governorate].filter(Boolean).join(', ')
    if (addr && addr.length > 3) {
      const coords = await geocode(addr)
      if (coords) { lat = coords.lat; lng = coords.lng; addressForDisplay = addr }
    }
  }

  if (!lat || !lng || isNaN(lat) || isNaN(lng)) return

  let symptoms = r.details?.selectedSymptoms || r.details?.symptoms
  if (symptoms && typeof symptoms === 'string') { try { symptoms = JSON.parse(symptoms) } catch {} }

  const filterType = getReportFilterType(r.type)

  if (forceMyReport) myIds.add(r.id)

  const typeLabel = r.type === 0 ? '🐕 Bite' : '⚠️ Dangerous Animal'
  dynamic.push({
    id: r.id,
    name: `${typeLabel} #${r.id}`,
    address: addressForDisplay,
    lat, lng,
    type: filterType,
    extra: {
      status: r.status,
      statusText: getStatusText(r.status),
      reportType: r.type === 0 ? 'Bite' : 'Dangerous Animal',
      animalType: r.details?.animalType,
      symptoms,
      reporterName: r.name,
      phone: r.phone,
      exposureDateTime: r.details?.exposureDateTime,
      severity: r.details?.severity,
      locationCity,
      isMyReport: forceMyReport,
    },
  })
}

// ── component ──────────────────────────────────────────────────────────────
export default function PetMap({ onSelectLocation, allowPinDrop = false, currentUserId }: Props) {
  const mapRef         = useRef<HTMLDivElement & { _leaflet_id?: number }>(null)
  const modalMapRef    = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  const modalMapInst   = useRef<any>(null)
  const markersRef     = useRef<any[]>([])
  const zoneLayersRef  = useRef<any[]>([])
  const pinMarkerRef   = useRef<any>(null)

  const [allLocations,  setAllLocations]  = useState<MapLocation[]>([])
  const [myReportIds,   setMyReportIds]   = useState<Set<string | number>>(new Set())
  const [activeFilters, setActiveFilters] = useState<Set<FilterKey>>(
    new Set(['clinic', 'report-bite', 'report-animal'] as FilterKey[])
  )
  const [selectedLoc,  setSelectedLoc]  = useState<MapLocation | null>(null)
  const [loading,      setLoading]      = useState(false)

  const [showLocModal,   setShowLocModal]   = useState(false)
  const [addressInput,   setAddressInput]   = useState('')
  const [addressLoading, setAddressLoading] = useState(false)
  const [addressError,   setAddressError]   = useState('')
  const [pickedCoords,   setPickedCoords]   = useState<{ lat: number; lng: number; address: string } | null>(null)
  const [modalMapReady,  setModalMapReady]  = useState(false)

  // ── fetch data ─────────────────────────────────────────────────────────
  useEffect(() => {
    const fetchDynamic = async () => {
      setLoading(true)
      const dynamic: MapLocation[]      = []
      const myIds: Set<string | number> = new Set()

      // ── clinics ───────────────────────────────────────────────────────
      try {
        const clinics: Clinic[] = await clinicsApi.getAll()
        for (const c of clinics) {
          if (c.latitude && c.longitude) {
            dynamic.push({
              id: c.id, name: c.name, address: c.address ?? '',
              lat: Number(c.latitude), lng: Number(c.longitude), type: 'clinic',
              extra: { hours: c.workingHours, price: c.bookingPrice, phone: c.phone },
            })
          } else if (c.address) {
            const coords = await geocode(c.address)
            if (coords) dynamic.push({
              id: c.id, name: c.name, address: c.address,
              lat: coords.lat, lng: coords.lng, type: 'clinic',
              extra: { hours: c.workingHours, price: c.bookingPrice },
            })
          }
        }
      } catch (e) { console.error('clinics fetch error', e) }

      // ── approved public reports ───────────────────────────────────────
      try {
        const raw = await getAllApprovedReports()
        const reports: any[] = Array.isArray(raw) ? raw : (raw?.data ?? [])
        for (const r of reports) {
          if (r.status === 3) continue
          await processReport(r, dynamic, myIds, false)
        }
      } catch (e) { console.error('reports fetch error', e) }

      // ── my reports (بالتوكن) ──────────────────────────────────────────
      try {
        const raw = await getMyReports()
        const myReports: any[] = Array.isArray(raw) ? raw : (raw?.data ?? [])
        for (const r of myReports) {
          if (r.status === 3) continue // rejected مش هيظهر
          // لو موجود بالفعل في الـ approved reports، حدّث الـ myIds بس
          const alreadyExists = dynamic.find(d => d.id === r.id)
          if (alreadyExists) {
            myIds.add(r.id)
            alreadyExists.extra = { ...alreadyExists.extra, isMyReport: true }
          } else {
            await processReport(r, dynamic, myIds, true)
          }
        }
      } catch (e) { console.error('my reports fetch error', e) }

      setAllLocations(dynamic)
      setMyReportIds(myIds)
      setLoading(false)
    }
    fetchDynamic()
  }, [currentUserId])

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
      const script = document.createElement('script')
      script.src   = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
      script.onload = init
      document.body.appendChild(script)
    }
    return () => { mapInstanceRef.current?.remove(); mapInstanceRef.current = null }
  }, [])

  // ── update markers + danger zones ─────────────────────────────────────
  useEffect(() => {
    const map = mapInstanceRef.current
    const L   = (window as any).L
    if (!map || !L || !(map as any)._loaded) return

    markersRef.current.forEach(m => { try { m.remove() } catch {} })
    markersRef.current = []
    zoneLayersRef.current.forEach(z => { try { z.remove() } catch {} })
    zoneLayersRef.current = []

    const visibleLocations = allLocations.filter(loc => {
      if (activeFilters.has('my-reports') && myReportIds.has(loc.id)) return true
      return activeFilters.has(loc.type as FilterKey)
    })

    const GRID = 0.02
    const densityMap = new Map<string, number>()
    visibleLocations.filter(l => l.type.startsWith('report')).forEach(loc => {
      const key = `${Math.floor(loc.lat / GRID)}_${Math.floor(loc.lng / GRID)}`
      densityMap.set(key, (densityMap.get(key) ?? 0) + 1)
    })
    const getDensityColor = (lat: number, lng: number): string => {
      const count = densityMap.get(`${Math.floor(lat / GRID)}_${Math.floor(lng / GRID)}`) ?? 1
      if (count >= 7) return '#dc2626'
      if (count >= 4) return '#f97316'
      if (count >= 2) return '#facc15'
      return '#22c55e'
    }

    const reportLocs = visibleLocations.filter(l => l.type.startsWith('report'))
    const zones      = buildDangerZones(reportLocs, 2)

    zones.forEach(zone => {
      try {
        const outerRing = L.circle([zone.lat, zone.lng], {
          radius: zone.radius * 1.25, color: zone.color, fillColor: zone.fillColor,
          fillOpacity: 0.06, weight: 0, interactive: false,
        }).addTo(map)
        const circle = L.circle([zone.lat, zone.lng], {
          radius: zone.radius, color: zone.color, fillColor: zone.fillColor,
          fillOpacity: 0.15, weight: 2, dashArray: '6 5', interactive: true,
        }).addTo(map)
        circle.bindPopup(`
          <div style="min-width:180px;font-size:13px;line-height:1.7">
            <strong style="font-size:14px">${zone.label}</strong><br/>
            <span style="color:#666">📍 ${zone.count} reports in this area</span><br/>
            <span style="color:#ef4444;font-weight:600">⚠️ Exercise caution nearby</span>
          </div>`)
        zoneLayersRef.current.push(outerRing, circle)
      } catch (e) { console.warn('Zone render failed:', e) }
    })

    visibleLocations.forEach(loc => {
      try {

const color = loc.type.startsWith('report')
  ? getDensityColor(loc.lat, loc.lng)
  : (TYPE_COLORS as any)[loc.type] ?? '#666'

// الـ my report بس بيأثر على الـ size مش اللون
const isMyReport = myReportIds.has(loc.id)
// const dotSize = isMyReport ? 20 : (color === '#dc2626' || color === '#f97316') ? 18 : 14
    const isHot   = !isMyReport && loc.type.startsWith('report') && (color === '#dc2626' || color === '#f97316')
    const dotSize = isHot ? 18 : 14

        const icon = L.divIcon({
          html: isHot
            ? `<div style="position:relative;width:${dotSize}px;height:${dotSize}px">
                 <div style="position:absolute;inset:-5px;border-radius:50%;border:2px solid ${color};opacity:.45;animation:ping 1.4s cubic-bezier(0,0,.2,1) infinite"></div>
                 <div style="width:100%;height:100%;border-radius:50%;background:${color};border:2.5px solid white;box-shadow:0 2px 8px rgba(0,0,0,.45)"></div>
               </div>`
            : `<div style="width:${dotSize}px;height:${dotSize}px;border-radius:50%;background:${color};border:2.5px solid white;box-shadow:0 2px 6px rgba(0,0,0,.35)"></div>`,
          className: '', iconSize: [dotSize, dotSize], iconAnchor: [dotSize / 2, dotSize / 2],
        })

        let symptomsDisplay = ''
        if (loc.extra?.symptoms) {
          try {
            const parsed: string[] = typeof loc.extra.symptoms === 'string'
              ? JSON.parse(loc.extra.symptoms) : loc.extra.symptoms
            if (Array.isArray(parsed) && parsed.length > 0)
              symptomsDisplay = `🔍 ${parsed.slice(0, 3).join(', ')}${parsed.length > 3 ? '...' : ''}<br/>`
          } catch {}
        }

        const severityBadge = loc.extra?.severity ? (() => {
          const sv = loc.extra.severity.toLowerCase()
          const bg = sv === 'superficial' ? '#fef9c3' : sv === 'moderate' || sv === 'deep' ? '#ffedd5' : '#fee2e2'
          const fg = sv === 'superficial' ? '#854d0e' : sv === 'moderate' || sv === 'deep' ? '#9a3412' : '#7f1d1d'
          const lbl = sv === 'superficial' ? '🟡 Superficial' : sv === 'moderate' ? '🟠 Moderate'
            : sv === 'deep' ? '🟠 Deep' : sv === 'severe' ? '🔴 Severe' : `⚫ ${loc.extra.severity}`
          return `<span style="display:inline-block;padding:2px 8px;border-radius:10px;background:${bg};color:${fg};font-size:11px;font-weight:700;margin-bottom:4px">${lbl}</span><br/>`
        })() : ''

        const popup = `
          <div style="min-width:200px;font-size:13px;line-height:1.6">
            <strong>${loc.name}</strong><br/>
            ${severityBadge}
            ${loc.address             ? `<span style="color:#666;font-size:12px">📍 ${loc.address}</span><br/>` : ''}
            ${loc.extra?.reporterName ? `👤 ${loc.extra.reporterName}<br/>` : ''}
            ${loc.extra?.phone        ? `📞 ${loc.extra.phone}<br/>` : ''}
            ${loc.extra?.reportType   ? `📋 ${loc.extra.reportType}<br/>` : ''}
            ${loc.extra?.animalType   ? `🐾 ${loc.extra.animalType}<br/>` : ''}
            ${loc.extra?.exposureDateTime ? `🕐 ${new Date(loc.extra.exposureDateTime).toLocaleString()}<br/>` : ''}
            ${symptomsDisplay}
            ${loc.extra?.hours        ? `🕐 ${loc.extra.hours}<br/>` : ''}
            ${loc.extra?.price        ? `💰 ${loc.extra.price} EGP<br/>` : ''}
            ${loc.extra?.statusText   ? `🏷 Status: ${loc.extra.statusText}<br/>` : ''}
          </div>`

        const marker = L.marker([loc.lat, loc.lng], { icon })
          .addTo(map).bindPopup(popup)
          .on('click', () => setSelectedLoc(loc))
        markersRef.current.push(marker)
      } catch (e) { console.warn('Marker render failed:', e) }
    })
  }, [allLocations, activeFilters, myReportIds])

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
      const script = document.createElement('script')
      script.src   = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
      script.onload = tryInit
      document.body.appendChild(script)
    }
  }, [showLocModal])

  const placePinOnModalMap = (mmap: any, L: any, lat: number, lng: number) => {
    if (pinMarkerRef.current) { pinMarkerRef.current.remove(); pinMarkerRef.current = null }
    const icon = L.divIcon({
      html: `<div style="width:22px;height:22px;border-radius:50%;background:#ef4444;border:3px solid white;box-shadow:0 3px 10px rgba(0,0,0,.4)"></div>`,
      className: '', iconSize: [22, 22], iconAnchor: [11, 11],
    })
    pinMarkerRef.current = L.marker([lat, lng], { icon }).addTo(mmap)
    mmap.setView([lat, lng], Math.max(mmap.getZoom(), 14))
  }

  const handleAddressSearch = async () => {
    if (!addressInput.trim()) return
    setAddressLoading(true); setAddressError('')
    const coords = await geocode(addressInput.trim())
    if (!coords) { setAddressError('Address not found. Try a more specific address.'); setAddressLoading(false); return }
    const mmap = modalMapInst.current; const L = (window as any).L
    if (mmap && L) placePinOnModalMap(mmap, L, coords.lat, coords.lng)
    setPickedCoords({ lat: coords.lat, lng: coords.lng, address: addressInput.trim() })
    setAddressLoading(false)
  }

  const handleConfirmLocation = () => {
    if (!pickedCoords) return
    onSelectLocation?.(pickedCoords.lat, pickedCoords.lng, pickedCoords.address)
    setShowLocModal(false); setPickedCoords(null); setAddressInput('')
  }

  const toggleFilter = (type: FilterKey) => {
    setActiveFilters(prev => { const next = new Set(prev); next.has(type) ? next.delete(type) : next.add(type); return next })
    setSelectedLoc(null)
  }

  // ── render ─────────────────────────────────────────────────────────────
  return (
    <div style={{ minHeight: '100vh', padding: '2rem 0' }}>
      <div className="container">
        <div className="d-flex gap-2 flex-wrap mb-3 align-items-center justify-content-between">
          <div className="d-flex gap-2 flex-wrap align-items-center">
            {(Object.keys(FILTER_LABELS) as FilterKey[]).map(type => {
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

        <div style={{ height: '500px', borderRadius: 12, overflow: 'hidden', border: '1px solid #ddd', position: 'relative' }}>
          <style>{`@keyframes ping { 75%,100% { transform:scale(2);opacity:0; } }`}</style>
          <div ref={mapRef} style={{ height: '100%', width: '100%', zIndex: 0 }} />
          <div style={{
            position: 'absolute', bottom: 24, right: 12, zIndex: 999,
            background: 'rgba(255,255,255,0.95)', borderRadius: 10,
            padding: '10px 14px', boxShadow: '0 2px 12px rgba(0,0,0,.18)',
            fontSize: 12, lineHeight: 1.8, backdropFilter: 'blur(4px)',
            border: '1px solid #e5e7eb',
          }}>
            <div style={{ fontWeight: 700, marginBottom: 4, color: '#374151', fontSize: 11 }}>📊 Report Density</div>
            {[
              { color: '#22c55e', label: 'Low (1 report)'  },
              { color: '#facc15', label: 'Moderate (2–3)'  },
              { color: '#f97316', label: 'High (4–6)'      },
              { color: '#dc2626', label: 'Critical (7+)'   },
            ].map(({ color, label }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: color, border: '2px solid white', boxShadow: '0 1px 4px rgba(0,0,0,.25)', flexShrink: 0 }} />
                <span style={{ color: '#374151' }}>{label}</span>
              </div>
            ))}
            <div style={{ borderTop: '1px solid #f0f0f0', marginTop: 8, paddingTop: 8, fontWeight: 700, color: '#374151', fontSize: 11, marginBottom: 4 }}>
              🔴 Danger Zones
            </div>
            {[
              { color: '#facc15', border: '#854d0e', label: '🟡 Caution (2–3)'   },
              { color: '#f97316', border: '#9a3412', label: '🟠 High Risk (4–6)'  },
              { color: '#ef4444', border: '#7f1d1d', label: '🔴 Critical (7+)'    },
            ].map(({ color, border, label }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                <div style={{ width: 14, height: 14, borderRadius: '50%', background: color + '40', border: `2px dashed ${border}`, flexShrink: 0 }} />
                <span style={{ color: '#374151' }}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {selectedLoc && (
          <div className="card mt-4 p-3">
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <span style={{
                  display: 'inline-block', padding: '2px 10px', borderRadius: 12,
                  background: ((TYPE_COLORS as any)[selectedLoc.type] ?? '#666') + '22',
                  color: (TYPE_COLORS as any)[selectedLoc.type] ?? '#666',
                  fontSize: 11, fontWeight: 700, marginBottom: 6,
                }}>
                  {(FILTER_LABELS as any)[selectedLoc.type]}
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
            {selectedLoc.extra?.severity && (() => {
              const sv = selectedLoc.extra!.severity.toLowerCase()
              const bg = sv === 'superficial' ? '#fef9c3' : sv === 'deep' || sv === 'moderate' ? '#ffedd5' : '#fee2e2'
              const fg = sv === 'superficial' ? '#854d0e' : sv === 'deep' || sv === 'moderate' ? '#9a3412' : '#7f1d1d'
              const dotColor = sv === 'superficial' ? '#facc15' : sv === 'deep' || sv === 'moderate' ? '#f97316' : '#dc2626'
              const label = sv === 'superficial' ? 'Superficial' : sv === 'deep' ? 'Deep'
                : sv === 'moderate' ? 'Moderate' : sv === 'severe' ? 'Severe' : selectedLoc.extra!.severity
              return (
                <p className="mb-1 small d-flex align-items-center gap-2">
                  <span>⚠️ Severity:</span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '2px 10px', borderRadius: 12, background: bg, color: fg, fontWeight: 700, fontSize: 11 }}>
                    <span style={{ width: 9, height: 9, borderRadius: '50%', background: dotColor, display: 'inline-block' }} />
                    {label}
                  </span>
                </p>
              )
            })()}
            {selectedLoc.extra?.symptoms && (() => {
              try {
                const parsed: string[] = typeof selectedLoc.extra!.symptoms === 'string'
                  ? JSON.parse(selectedLoc.extra!.symptoms) : selectedLoc.extra!.symptoms
                if (Array.isArray(parsed) && parsed.length > 0)
                  return <p className="mb-1 small">🔍 {parsed.join(', ')}</p>
              } catch {}
              return null
            })()}
            {selectedLoc.extra?.hours      && <p className="mb-1 small">🕐 {selectedLoc.extra.hours}</p>}
            {selectedLoc.extra?.price      && <p className="mb-1 small">💰 {selectedLoc.extra.price} EGP</p>}
            {selectedLoc.extra?.statusText && <p className="mb-1 small">🏷 Status: {selectedLoc.extra.statusText}</p>}
          </div>
        )}
      </div>

      {showLocModal && (
        <div
          style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}
          onClick={e => { if (e.target === e.currentTarget) setShowLocModal(false) }}
        >
          <div style={{ background: '#fff', borderRadius: 16, width: '100%', maxWidth: 620, boxShadow: '0 20px 60px rgba(0,0,0,0.3)', overflow: 'hidden', display: 'flex', flexDirection: 'column', maxHeight: '90vh' }}>
            <div style={{ padding: '18px 20px 14px', borderBottom: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h5 style={{ margin: 0, fontWeight: 700 }}>📍 Select Location</h5>
                <p style={{ margin: 0, color: '#6b7280', fontSize: 13 }}>Type an address or click on the map</p>
              </div>
              <button onClick={() => setShowLocModal(false)} style={{ border: 'none', background: 'none', fontSize: 22, cursor: 'pointer', color: '#9ca3af', lineHeight: 1 }}>×</button>
            </div>
            <div style={{ padding: '14px 20px', borderBottom: '1px solid #f0f0f0' }}>
              <div style={{ display: 'flex', gap: 8 }}>
                <input value={addressInput} onChange={e => setAddressInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleAddressSearch()}
                  placeholder="e.g. Al-Manakh District, Port Said"
                  style={{ flex: 1, padding: '9px 14px', borderRadius: 10, border: '1.5px solid #d1d5db', fontSize: 14, outline: 'none' }} />
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
                <div style={{ marginTop: 8, padding: '8px 12px', borderRadius: 8, background: '#f0fdf4', border: '1px solid #bbf7d0', fontSize: 12, color: '#166534' }}>
                  ✅ <strong>Selected:</strong> {pickedCoords.address}
                </div>
              )}
            </div>
            <div style={{ flex: 1, minHeight: 320, position: 'relative' }}>
              {!modalMapReady && (
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f9fafb', zIndex: 1, fontSize: 14, color: '#6b7280' }}>
                  ⏳ Loading map…
                </div>
              )}
              <div ref={modalMapRef} style={{ height: '100%', minHeight: 320, width: '100%', zIndex: 0 }} />
            </div>
            <div style={{ padding: '14px 20px', borderTop: '1px solid #f0f0f0', display: 'flex', justifyContent: 'flex-end', gap: 10, background: '#fafafa' }}>
              <button onClick={() => setShowLocModal(false)} style={{ padding: '8px 20px', borderRadius: 10, border: '1.5px solid #d1d5db', background: '#fff', cursor: 'pointer', fontWeight: 600, fontSize: 14 }}>Cancel</button>
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