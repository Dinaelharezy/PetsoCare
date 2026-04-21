
// 'use client'

// import { useEffect, useRef, useState } from 'react'
// import { clinicsApi } from '../../data/api/Clinic'
// import { getAllLocations } from '../../data/api/VaccLocations'
// import { getAllReports } from '../../data/api/report'
// import { Clinic } from '../../types/Clinic'
// import { VaccLocation } from '../../types/VaccLocation'
// import { Report } from '../../types/report'

// // ── types ──────────────────────────────────────────────────────────────────
// type MapLocation = {
//   id:      string | number
//   name:    string
//   address: string
//   lat:     number
//   lng:     number
//   type:    'clinic' | 'vaccine' | 'report'
//   extra?:  Record<string, any>
// }

// type Props = {
//   onSelectLocation?: (lat: number, lng: number) => void
//   allowPinDrop?:     boolean
// }

// // ── constants ──────────────────────────────────────────────────────────────
// const TYPE_COLORS = {
//   clinic:  '#22c55e',
//   vaccine: '#3b82f6',
//   report:  '#ef4444',
// } as const

// const FILTER_LABELS = {
//   clinic:  '🏥 Clinics',
//   vaccine: '💉 Vaccine',
//   report:  '⚠️ Reports',
// } as const

// // ── geocode helper ─────────────────────────────────────────────────────────
// async function geocode(address: string): Promise<{ lat: number; lng: number } | null> {
//   try {
//     const res  = await fetch(
//       `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`,
//       { headers: { 'Accept-Language': 'en' } }
//     )
//     const data = await res.json()
//     if (data.length > 0) return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) }
//   } catch {}
//   return null
// }

// // ── component ──────────────────────────────────────────────────────────────
// export default function PetMap({ onSelectLocation, allowPinDrop = false }: Props) {
//   const mapRef         = useRef<HTMLDivElement>(null)
//   const mapInstanceRef = useRef<any>(null)
//   const markersRef     = useRef<any[]>([])

//   const [allLocations,  setAllLocations]  = useState<MapLocation[]>([])
//   const [activeFilters, setActiveFilters] = useState<Set<string>>(new Set(['clinic', 'vaccine', 'report']))
//   const [selectedLoc,   setSelectedLoc]   = useState<MapLocation | null>(null)
//   const [geocoding,     setGeocoding]     = useState(false)

//   // ── fetch all data (async inside useEffect ✅) ─────────────────────────
//   useEffect(() => {
//     const build = async () => {
//       setGeocoding(true)
//       const result: MapLocation[] = []

//       // 1. Clinics
//       try {
//         const clinics: Clinic[] = await clinicsApi.getAll()
//         for (const c of clinics) {
//           if (c.latitude && c.longitude) {
//             result.push({
//               id:      c.id,
//               name:    c.name,
//               address: c.address ?? '',
//               lat:     Number(c.latitude),
//               lng:     Number(c.longitude),
//               type:    'clinic',
//               extra:   { hours: c.workingHours, price: c.bookingPrice, phone: c.phone },
//             })
//           } else if (c.address) {
//             const coords = await geocode(c.address)
//             if (coords) result.push({
//               id: c.id, name: c.name, address: c.address,
//               ...coords, type: 'clinic',
//               extra: { hours: c.workingHours, price: c.bookingPrice },
//             })
//           }
//         }
//       } catch (e) { console.error('clinics fetch error', e) }

//       // 2. Vaccine locations
//       try {
//         const locs: VaccLocation[] = await getAllLocations()
//         for (const v of locs) {
//           if (v.address) {
//             const coords = await geocode(v.address)
//             if (coords) result.push({
//               id:      v.id,
//               name:    v.name    ?? 'Vaccine Location',
//               address: v.address ?? '',
//               ...coords,
//               type:  'vaccine',
//               extra: { phone: v.phone, hours: v.hours, locType: v.type },
//             })
//           }
//         }
//       } catch (e) { console.error('vaccine fetch error', e) }

//       // 3. Reports
//       try {
//         const raw     = await getAllReports()
//         const reports: Report[] = Array.isArray(raw) ? raw : raw?.data ?? []
//         for (const r of reports) {
//           const addr = [r.district, r.governorate].filter(Boolean).join(', ')
//           if (addr) {
//             const coords = await geocode(addr)
//             if (coords) result.push({
//               id:      r.id,
//               name:    `Report #${r.id}`,
//               address: addr,
//               ...coords,
//               type:  'report',
//               extra: { status: r.status, reportType: r.type },
//             })
//           }
//         }
//       } catch (e) { console.error('reports fetch error', e) }

//       setAllLocations(result)
//       setGeocoding(false)
//     }

//     build() // ✅ async function called inside useEffect — no await at top level
//   }, [])

//   useEffect(() => {
//   // ✅ تحميل Leaflet CSS أولاً
//   if (!document.getElementById('leaflet-css')) {
//     const link = document.createElement('link')
//     link.id = 'leaflet-css'
//     link.rel = 'stylesheet'
//     link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
//     document.head.appendChild(link)
//   }

//   const init = () => {
//     if (!window.L || !mapRef.current || mapInstanceRef.current) return
//     const L = window.L

//     const map = L.map(mapRef.current).setView([26.8206, 30.8025], 6)
//     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//       attribution: '© OpenStreetMap contributors',
//     }).addTo(map)

//     if (allowPinDrop && onSelectLocation) {
//       map.on('click', (e: any) => onSelectLocation(e.latlng.lat, e.latlng.lng))
//     }

//     mapInstanceRef.current = map
//   }

//   if (window.L) {
//     init()
//   } else {
//     const script = document.createElement('script')
//     script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
//     script.onload = init
//     document.body.appendChild(script)
//   }

//   return () => {
//     mapInstanceRef.current?.remove()
//     mapInstanceRef.current = null
//   }
// }, [])
//   // ── init map ───────────────────────────────────────────────────────────

//   useEffect(() => {
//     const init = () => {
//       if (!window.L || !mapRef.current || mapInstanceRef.current) return
//       const L = window.L

//       const map = L.map(mapRef.current).setView([26.8206, 30.8025], 6)
//       L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//         attribution: '© OpenStreetMap contributors',
//       }).addTo(map)

//       if (allowPinDrop && onSelectLocation) {
//         map.on('click', (e: any) => onSelectLocation(e.latlng.lat, e.latlng.lng))
//       }

//       mapInstanceRef.current = map
//     }

//     if (window.L) {
//       init()
//     } else {
//       const script    = document.createElement('script')
//       script.src      = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
//       script.onload   = init
//       document.body.appendChild(script)
//     }

//     return () => {
//       mapInstanceRef.current?.remove()
//       mapInstanceRef.current = null
//     }
//   }, [])

//   // ── update markers ─────────────────────────────────────────────────────
//   useEffect(() => {
//     const map = mapInstanceRef.current
//     if (!map || !window.L) return
//     const L = window.L

//     markersRef.current.forEach(m => m.remove())
//     markersRef.current = []

//     allLocations
//       .filter(loc => activeFilters.has(loc.type))
//       .forEach(loc => {
//         const color = TYPE_COLORS[loc.type]
//         const icon  = L.divIcon({
//           html:      `<div style="width:14px;height:14px;border-radius:50%;background:${color};border:2.5px solid white;box-shadow:0 2px 6px rgba(0,0,0,.35)"></div>`,
//           className: '',
//           iconSize:  [14, 14],
//           iconAnchor:[7, 7],
//         })

//         const popup = `
//           <div style="min-width:160px;font-size:13px">
//             <strong>${loc.name}</strong><br/>
//             ${loc.address                ? `<span style="color:#666">${loc.address}</span><br/>`    : ''}
//             ${loc.extra?.hours           ? `🕐 ${loc.extra.hours}<br/>`                             : ''}
//             ${loc.extra?.phone           ? `📞 ${loc.extra.phone}<br/>`                             : ''}
//             ${loc.extra?.price           ? `💰 ${loc.extra.price} EGP<br/>`                         : ''}
//             ${loc.extra?.status          ? `Status: ${loc.extra.status}`                            : ''}
//           </div>
//         `

//         const marker = L.marker([loc.lat, loc.lng], { icon })
//           .addTo(map)
//           .bindPopup(popup)
//           .on('click', () => setSelectedLoc(loc))

//         markersRef.current.push(marker)
//       })
//   }, [allLocations, activeFilters])

//   // ── toggle filter ──────────────────────────────────────────────────────
//   const toggleFilter = (type: string) => {
//     setActiveFilters(prev => {
//       const next = new Set(prev)
//       next.has(type) ? next.delete(type) : next.add(type)
//       return next
//     })
//     setSelectedLoc(null)
//   }

//   // ── render ─────────────────────────────────────────────────────────────
//   return (
//     <div style={{ minHeight: '100vh', padding: '2rem 0' }}>
//       <div className="container">

//         {/* Filters */}
//         <div className="d-flex gap-2 flex-wrap mb-3">
//           {(Object.keys(TYPE_COLORS) as (keyof typeof TYPE_COLORS)[]).map(type => {
//             const active = activeFilters.has(type)
//             const color  = TYPE_COLORS[type]
//             return (
//               <button
//                 key={type}
//                 onClick={() => toggleFilter(type)}
//                 style={{
//                   padding:      '6px 16px',
//                   borderRadius: 20,
//                   cursor:       'pointer',
//                   border:       `2px solid ${color}`,
//                   background:   active ? color : 'transparent',
//                   color:        active ? 'white' : color,
//                   fontWeight:   600,
//                   fontSize:     13,
//                 }}
//               >
//                 {FILTER_LABELS[type]}
//               </button>
//             )
//           })}

//           {geocoding && (
//             <span className="text-muted small align-self-center ms-2">
//               ⏳ Geocoding addresses…
//             </span>
//           )}
//         </div>

//         {/* Map */}
//         <div style={{ height: '500px', borderRadius: 12, overflow: 'hidden', border: '1px solid #ddd' }}>
//           {/* <div ref={mapRef} style={{ height: '100%', width: '100%' }} />
//            */}
//            <div
//   ref={mapRef}
//   style={{
//     height: '100%',
//     width: '100%',
//     // ✅ مهم جداً
//     zIndex: 0,
//   }}
// />
//         </div>

//         {/* Selected card */}
//         {selectedLoc && (
//           <div className="card mt-4 p-3">
//             <div className="d-flex justify-content-between align-items-start">
//               <h5 className="mb-1">{selectedLoc.name}</h5>
//               <button
//                 onClick={() => setSelectedLoc(null)}
//                 style={{ border: 'none', background: 'none', fontSize: 20, cursor: 'pointer', lineHeight: 1 }}
//               >×</button>
//             </div>
//             {selectedLoc.address          && <p className="mb-1 text-muted small">📍 {selectedLoc.address}</p>}
//             {selectedLoc.extra?.hours     && <p className="mb-1 small">🕐 {selectedLoc.extra.hours}</p>}
//             {selectedLoc.extra?.phone     && <p className="mb-1 small">📞 {selectedLoc.extra.phone}</p>}
//             {selectedLoc.extra?.price     && <p className="mb-1 small">💰 {selectedLoc.extra.price} EGP</p>}
//             {selectedLoc.extra?.status    && <p className="mb-1 small">Status: {selectedLoc.extra.status}</p>}
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }







// 'use client'

// import { useEffect, useRef, useState, useCallback } from 'react'
// import { clinicsApi } from '../../data/api/Clinic'
// import { getAllLocations } from '../../data/api/VaccLocations'
// import { getAllReports } from '../../data/api/report'
// import { Clinic } from '../../types/Clinic'
// import { VaccLocation } from '../../types/VaccLocation'
// import { Report } from '../../types/report'

// // ── types ──────────────────────────────────────────────────────────────────
// type MapLocation = {
//   id:      string | number
//   name:    string
//   address: string
//   lat:     number
//   lng:     number
//   type:    'clinic' | 'vaccine' | 'report' | 'vacc-animal' | 'vacc-human' | 'vacc-area'
//   extra?:  Record<string, any>
// }

// type Props = {
//   onSelectLocation?: (lat: number, lng: number, address?: string) => void
//   allowPinDrop?:     boolean
// }

// // ── constants ──────────────────────────────────────────────────────────────
// const TYPE_COLORS = {
//   clinic:       '#22c55e',
//   vaccine:      '#3b82f6',
//   report:       '#ef4444',
//   'vacc-animal':'#f59e0b',
//   'vacc-human': '#8b5cf6',
//   'vacc-area':  '#06b6d4',
// } as const

// const FILTER_LABELS = {
//   clinic:       '🏥 Clinics',
//   vaccine:      '💉 Vaccine Centers',
//   report:       '⚠️ Reports',
//   'vacc-animal':'🐕 Animal Vacc',
//   'vacc-human': '👤 Human Vacc',
//   'vacc-area':  '📍 Vacc Areas',
// } as const

// // Static vaccination data (from useVaccLocations & useVaccAreas)
// const ANIMAL_VACC_LOCATIONS = [
//   {
//     name: 'Port Said Veterinary Medicine Directorate',
//     address: 'New Qabuti Area, South of the Governorate, Port Said',
//     services: 'Stray Animal Rabies Vaccination Campaigns',
//     hours: null, phone: null,
//   },
//   {
//     name: 'Pet Animal Hospital – Old Qabuti',
//     address: 'Behind Al-Nour Housing, Old Qabuti, Port Said',
//     services: 'Animal Rabies Vaccination',
//     hours: null, phone: null,
//   },
//   {
//     name: 'Pet Animal Hospital – Port Fouad',
//     address: 'Behind Port Fouad Secondary School for Girls, Port Fouad, Port Said',
//     services: 'Animal Rabies Vaccination',
//     hours: null, phone: null,
//   },
// ]

// const HUMAN_VACC_LOCATIONS = [
//   {
//     name: 'Port Said Health Affairs Directorate',
//     address: 'Al-Nahda Street, off Mohamed Ali Street, El-Sharq District, Port Said',
//     services: 'Inquiries & Referrals Only',
//     phone: null,
//   },
//   {
//     name: 'Al-Hayah Hospital – Port Fouad',
//     address: 'Al-Obour Housing, Port Fouad, Port Said',
//     services: 'Emergency – Human Rabies Vaccine (PEP)',
//     phone: '0663400849',
//   },
//   {
//     name: '30 June Hospital',
//     address: 'Al-Ganoub District, First Axis of 30 June, Port Said',
//     services: 'Emergency – Human Rabies Vaccine (PEP)',
//     phone: '0663254111',
//   },
//   {
//     name: 'Al-Salam Hospital',
//     address: 'Safeya Zaghloul Street, El-Sharq District, Port Said',
//     services: 'Emergency – Human Rabies Vaccine (PEP)',
//     phone: null,
//   },
//   {
//     name: 'Health Unit – Al-Manakh',
//     address: 'Al-Manakh District, Port Said',
//     services: 'Primary Healthcare – PEP Inquiries',
//     phone: '15344',
//   },
//   {
//     name: 'Health Unit – Al-Dawahi',
//     address: 'Al-Dawahi District, Port Said',
//     services: 'Primary Healthcare – PEP Inquiries',
//     phone: '15344',
//   },
// ]

// const VACC_AREAS = [
//   { name: 'Al-Sharq District – Vaccinated', address: 'Al-Sharq District, Port Said' },
//   { name: 'Al-Manakh District – Vaccinated', address: 'Al-Manakh District, Port Said' },
//   { name: 'Al-Arab District – Vaccinated',   address: 'Al-Arab District, Port Said' },
//   { name: 'Al-Dawahi District – Vaccinated', address: 'Al-Dawahi District, Port Said' },
//   { name: 'Al-Zohour District – Vaccinated', address: 'Al-Zohour District, Port Said' },
//   { name: 'Al-Janoub District – Vaccinated', address: 'Al-Janoub District, Port Said' },
//   { name: 'Al-Gharb District – Vaccinated',  address: 'Al-Gharb District, Port Said' },
//   { name: 'Port Fouad City – Vaccinated',    address: 'Port Fouad, Port Said' },
// ]

// // ── geocode helper ─────────────────────────────────────────────────────────
// async function geocode(address: string): Promise<{ lat: number; lng: number } | null> {
//   try {
//     const res  = await fetch(
//       `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`,
//       { headers: { 'Accept-Language': 'en' } }
//     )
//     const data = await res.json()
//     if (data.length > 0) return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) }
//   } catch {}
//   return null
// }

// async function reverseGeocode(lat: number, lng: number): Promise<string> {
//   try {
//     const res  = await fetch(
//       `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
//       { headers: { 'Accept-Language': 'en' } }
//     )
//     const data = await res.json()
//     return data.display_name ?? `${lat.toFixed(5)}, ${lng.toFixed(5)}`
//   } catch {}
//   return `${lat.toFixed(5)}, ${lng.toFixed(5)}`
// }

// // ── component ──────────────────────────────────────────────────────────────
// export default function PetMap({ onSelectLocation, allowPinDrop = false }: Props) {
//   const mapRef         = useRef<HTMLDivElement>(null)
//   const modalMapRef    = useRef<HTMLDivElement>(null)
//   const mapInstanceRef = useRef<any>(null)
//   const modalMapRef2   = useRef<any>(null)
//   const markersRef     = useRef<any[]>([])
//   const pinMarkerRef   = useRef<any>(null)

//   const [allLocations,  setAllLocations]  = useState<MapLocation[]>([])
//   const [activeFilters, setActiveFilters] = useState<Set<string>>(
//     new Set(['clinic', 'vaccine', 'report', 'vacc-animal', 'vacc-human', 'vacc-area'])
//   )
//   const [selectedLoc,    setSelectedLoc]    = useState<MapLocation | null>(null)
//   const [geocoding,      setGeocoding]      = useState(false)

//   // Location detection modal state
//   const [showLocModal,   setShowLocModal]   = useState(false)
//   const [addressInput,   setAddressInput]   = useState('')
//   const [addressLoading, setAddressLoading] = useState(false)
//   const [addressError,   setAddressError]   = useState('')
//   const [pickedCoords,   setPickedCoords]   = useState<{ lat: number; lng: number; address: string } | null>(null)
//   const [modalMapReady,  setModalMapReady]  = useState(false)

//   // ── fetch all data ─────────────────────────────────────────────────────
//   useEffect(() => {
//     const build = async () => {
//       setGeocoding(true)
//       const result: MapLocation[] = []

//       // 1. Clinics (from API)
//       try {
//         const clinics: Clinic[] = await clinicsApi.getAll()
//         for (const c of clinics) {
//           if (c.latitude && c.longitude) {
//             result.push({
//               id: c.id, name: c.name, address: c.address ?? '',
//               lat: Number(c.latitude), lng: Number(c.longitude),
//               type: 'clinic',
//               extra: { hours: c.workingHours, price: c.bookingPrice, phone: c.phone },
//             })
//           } else if (c.address) {
//             const coords = await geocode(c.address)
//             if (coords) result.push({
//               id: c.id, name: c.name, address: c.address, ...coords, type: 'clinic',
//               extra: { hours: c.workingHours, price: c.bookingPrice },
//             })
//           }
//         }
//       } catch (e) { console.error('clinics fetch error', e) }

//       // 2. Vaccine locations (from API)
//       try {
//         const locs: VaccLocation[] = await getAllLocations()
//         for (const v of locs) {
//           if (v.address) {
//             const coords = await geocode(v.address)
//             if (coords) result.push({
//               id: v.id, name: v.name ?? 'Vaccine Location', address: v.address ?? '',
//               ...coords, type: 'vaccine',
//               extra: { phone: v.phone, hours: v.hours, locType: v.type },
//             })
//           }
//         }
//       } catch (e) { console.error('vaccine fetch error', e) }

//       // 3. Reports (from API)
//       try {
//         const raw     = await getAllReports()
//         const reports: Report[] = Array.isArray(raw) ? raw : raw?.data ?? []
//         for (const r of reports) {
//           const addr = [r.district, r.governorate].filter(Boolean).join(', ')
//           if (addr) {
//             const coords = await geocode(addr)
//             if (coords) result.push({
//               id: r.id, name: `Report #${r.id}`, address: addr, ...coords, type: 'report',
//               extra: { status: r.status, reportType: r.type },
//             })
//           }
//         }
//       } catch (e) { console.error('reports fetch error', e) }

//       // 4. Animal vaccination locations (static)
//       for (const v of ANIMAL_VACC_LOCATIONS) {
//         const coords = await geocode(v.address)
//         if (coords) result.push({
//           id: `av-${v.name}`, name: v.name, address: v.address, ...coords,
//           type: 'vacc-animal',
//           extra: { services: v.services, hours: v.hours, phone: v.phone },
//         })
//       }

//       // 5. Human vaccination locations (static)
//       for (const v of HUMAN_VACC_LOCATIONS) {
//         const coords = await geocode(v.address)
//         if (coords) result.push({
//           id: `hv-${v.name}`, name: v.name, address: v.address, ...coords,
//           type: 'vacc-human',
//           extra: { services: v.services, phone: v.phone },
//         })
//       }

//       // 6. Vaccination areas (static)
//       for (const a of VACC_AREAS) {
//         const coords = await geocode(a.address)
//         if (coords) result.push({
//           id: `va-${a.name}`, name: a.name, address: a.address, ...coords,
//           type: 'vacc-area',
//           extra: { campaign: 'Vaccination campaign conducted' },
//         })
//       }

//       setAllLocations(result)
//       setGeocoding(false)
//     }

//     build()
//   }, [])

//   // ── init main map ──────────────────────────────────────────────────────
//   useEffect(() => {
//     if (!document.getElementById('leaflet-css')) {
//       const link   = document.createElement('link')
//       link.id      = 'leaflet-css'
//       link.rel     = 'stylesheet'
//       link.href    = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
//       document.head.appendChild(link)
//     }

//     const init = () => {
//       if (!window.L || !mapRef.current || mapInstanceRef.current) return
//       const L   = window.L
//       const map = L.map(mapRef.current).setView([31.2653, 32.3019], 12) // Port Said
//       L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//         attribution: '© OpenStreetMap contributors',
//       }).addTo(map)

//       if (allowPinDrop && onSelectLocation) {
//         map.on('click', (e: any) => onSelectLocation(e.latlng.lat, e.latlng.lng))
//       }
//       mapInstanceRef.current = map
//     }

//     if ((window as any).L) init()
//     else {
//       const script  = document.createElement('script')
//       script.src    = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
//       script.onload = init
//       document.body.appendChild(script)
//     }

//     return () => {
//       mapInstanceRef.current?.remove()
//       mapInstanceRef.current = null
//     }
//   }, [])

//   // ── update markers ─────────────────────────────────────────────────────
//   useEffect(() => {
//     const map = mapInstanceRef.current
//     if (!map || !(window as any).L) return
//     const L = (window as any).L

//     markersRef.current.forEach(m => m.remove())
//     markersRef.current = []

//     allLocations
//       .filter(loc => activeFilters.has(loc.type))
//       .forEach(loc => {
//         const color = TYPE_COLORS[loc.type] ?? '#666'
//         const icon  = L.divIcon({
//           html:      `<div style="width:14px;height:14px;border-radius:50%;background:${color};border:2.5px solid white;box-shadow:0 2px 6px rgba(0,0,0,.35)"></div>`,
//           className: '',
//           iconSize:  [14, 14],
//           iconAnchor:[7, 7],
//         })

//         const popup = `
//           <div style="min-width:170px;font-size:13px;line-height:1.5">
//             <strong>${loc.name}</strong><br/>
//             ${loc.address              ? `<span style="color:#666">${loc.address}</span><br/>`       : ''}
//             ${loc.extra?.services      ? `🏷 ${loc.extra.services}<br/>`                             : ''}
//             ${loc.extra?.hours         ? `🕐 ${loc.extra.hours}<br/>`                                : ''}
//             ${loc.extra?.phone         ? `📞 ${loc.extra.phone}<br/>`                                : ''}
//             ${loc.extra?.price         ? `💰 ${loc.extra.price} EGP<br/>`                            : ''}
//             ${loc.extra?.status        ? `Status: ${loc.extra.status}`                               : ''}
//             ${loc.extra?.campaign      ? `📋 ${loc.extra.campaign}`                                  : ''}
//           </div>
//         `

//         const marker = L.marker([loc.lat, loc.lng], { icon })
//           .addTo(map)
//           .bindPopup(popup)
//           .on('click', () => setSelectedLoc(loc))

//         markersRef.current.push(marker)
//       })
//   }, [allLocations, activeFilters])

//   // ── init modal map ─────────────────────────────────────────────────────
//   useEffect(() => {
//     if (!showLocModal) {
//       modalMapRef2.current?.remove()
//       modalMapRef2.current = null
//       setModalMapReady(false)
//       return
//     }

//     const tryInit = () => {
//       if (!modalMapRef.current || modalMapRef2.current) return
//       const L   = (window as any).L
//       if (!L) return

//       setTimeout(() => {
//         if (!modalMapRef.current) return
//         const mmap = L.map(modalMapRef.current).setView([31.2653, 32.3019], 12)
//         L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//           attribution: '© OpenStreetMap contributors',
//         }).addTo(mmap)

//         mmap.on('click', async (e: any) => {
//           const { lat, lng } = e.latlng

//           if (pinMarkerRef.current) {
//             pinMarkerRef.current.remove()
//             pinMarkerRef.current = null
//           }

//           const icon = L.divIcon({
//             html: `<div style="width:22px;height:22px;border-radius:50%;background:#ef4444;border:3px solid white;box-shadow:0 3px 10px rgba(0,0,0,.4)"></div>`,
//             className: '', iconSize: [22, 22], iconAnchor: [11, 11],
//           })
//           pinMarkerRef.current = L.marker([lat, lng], { icon }).addTo(mmap)

//           const address = await reverseGeocode(lat, lng)
//           setPickedCoords({ lat, lng, address })
//           setAddressInput(address)
//         })

//         modalMapRef2.current = mmap
//         setModalMapReady(true)
//       }, 200)
//     }

//     if ((window as any).L) tryInit()
//     else {
//       const script  = document.createElement('script')
//       script.src    = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
//       script.onload = tryInit
//       document.body.appendChild(script)
//     }
//   }, [showLocModal])

//   // ── handle address search ──────────────────────────────────────────────
//   const handleAddressSearch = async () => {
//     if (!addressInput.trim()) return
//     setAddressLoading(true)
//     setAddressError('')

//     const coords = await geocode(addressInput.trim())
//     if (!coords) {
//       setAddressError('Address not found. Try a more specific address.')
//       setAddressLoading(false)
//       return
//     }

//     const L    = (window as any).L
//     const mmap = modalMapRef2.current
//     if (mmap && L) {
//       mmap.setView([coords.lat, coords.lng], 15)

//       if (pinMarkerRef.current) {
//         pinMarkerRef.current.remove()
//         pinMarkerRef.current = null
//       }

//       const icon = L.divIcon({
//         html: `<div style="width:22px;height:22px;border-radius:50%;background:#ef4444;border:3px solid white;box-shadow:0 3px 10px rgba(0,0,0,.4)"></div>`,
//         className: '', iconSize: [22, 22], iconAnchor: [11, 11],
//       })
//       pinMarkerRef.current = L.marker([coords.lat, coords.lng], { icon }).addTo(mmap)
//     }

//     setPickedCoords({ lat: coords.lat, lng: coords.lng, address: addressInput.trim() })
//     setAddressLoading(false)
//   }

//   // ── confirm location from modal ────────────────────────────────────────
//   const handleConfirmLocation = () => {
//     if (!pickedCoords) return
//     onSelectLocation?.(pickedCoords.lat, pickedCoords.lng, pickedCoords.address)
//     setShowLocModal(false)
//     setPickedCoords(null)
//     setAddressInput('')
//   }

//   // ── toggle filter ──────────────────────────────────────────────────────
//   const toggleFilter = (type: string) => {
//     setActiveFilters(prev => {
//       const next = new Set(prev)
//       next.has(type) ? next.delete(type) : next.add(type)
//       return next
//     })
//     setSelectedLoc(null)
//   }

//   // ── render ─────────────────────────────────────────────────────────────
//   return (
//     <div style={{ minHeight: '100vh', padding: '2rem 0' }}>
//       <div className="container">

//         {/* Top bar: filters + detect location button */}
//         <div className="d-flex gap-2 flex-wrap mb-3 align-items-center justify-content-between">
//           <div className="d-flex gap-2 flex-wrap align-items-center">
//             {(Object.keys(TYPE_COLORS) as (keyof typeof TYPE_COLORS)[]).map(type => {
//               const active = activeFilters.has(type)
//               const color  = TYPE_COLORS[type]
//               return (
//                 <button
//                   key={type}
//                   onClick={() => toggleFilter(type)}
//                   style={{
//                     padding: '5px 14px', borderRadius: 20, cursor: 'pointer',
//                     border: `2px solid ${color}`,
//                     background: active ? color : 'transparent',
//                     color:      active ? 'white' : color,
//                     fontWeight: 600, fontSize: 12,
//                     transition: 'all 0.2s',
//                   }}
//                 >
//                   {FILTER_LABELS[type]}
//                 </button>
//               )
//             })}

//             {geocoding && (
//               <span className="text-muted small align-self-center ms-1">
//                 ⏳ Loading locations…
//               </span>
//             )}
//           </div>

//           {/* Detect Location Button */}
//           {(allowPinDrop || onSelectLocation) && (
//             <button
//               onClick={() => setShowLocModal(true)}
//               style={{
//                 padding: '8px 20px', borderRadius: 20, cursor: 'pointer',
//                 border: '2px solid #6366f1',
//                 background: '#6366f1', color: 'white',
//                 fontWeight: 700, fontSize: 13,
//                 display: 'flex', alignItems: 'center', gap: 6,
//                 boxShadow: '0 2px 8px rgba(99,102,241,0.35)',
//                 transition: 'all 0.2s',
//                 whiteSpace: 'nowrap',
//               }}
//             >
//               📍 Detect Location
//             </button>
//           )}
//         </div>

//         {/* Main Map */}
//         <div style={{ height: '500px', borderRadius: 12, overflow: 'hidden', border: '1px solid #ddd' }}>
//           <div ref={mapRef} style={{ height: '100%', width: '100%', zIndex: 0 }} />
//         </div>

//         {/* Selected card */}
//         {selectedLoc && (
//           <div className="card mt-4 p-3">
//             <div className="d-flex justify-content-between align-items-start">
//               <div>
//                 <span
//                   style={{
//                     display: 'inline-block', padding: '2px 10px', borderRadius: 12,
//                     background: TYPE_COLORS[selectedLoc.type] + '22',
//                     color: TYPE_COLORS[selectedLoc.type],
//                     fontSize: 11, fontWeight: 700, marginBottom: 6,
//                   }}
//                 >
//                   {FILTER_LABELS[selectedLoc.type]}
//                 </span>
//                 <h5 className="mb-1">{selectedLoc.name}</h5>
//               </div>
//               <button
//                 onClick={() => setSelectedLoc(null)}
//                 style={{ border: 'none', background: 'none', fontSize: 20, cursor: 'pointer', lineHeight: 1 }}
//               >×</button>
//             </div>
//             {selectedLoc.address           && <p className="mb-1 text-muted small">📍 {selectedLoc.address}</p>}
//             {selectedLoc.extra?.services   && <p className="mb-1 small">🏷 {selectedLoc.extra.services}</p>}
//             {selectedLoc.extra?.hours      && <p className="mb-1 small">🕐 {selectedLoc.extra.hours}</p>}
//             {selectedLoc.extra?.phone      && <p className="mb-1 small">📞 {selectedLoc.extra.phone}</p>}
//             {selectedLoc.extra?.price      && <p className="mb-1 small">💰 {selectedLoc.extra.price} EGP</p>}
//             {selectedLoc.extra?.status     && <p className="mb-1 small">Status: {selectedLoc.extra.status}</p>}
//             {selectedLoc.extra?.campaign   && <p className="mb-1 small">📋 {selectedLoc.extra.campaign}</p>}
//           </div>
//         )}
//       </div>

//       {/* ── Location Detection Modal ── */}
//       {showLocModal && (
//         <div
//           style={{
//             position: 'fixed', inset: 0, zIndex: 9999,
//             background: 'rgba(0,0,0,0.55)',
//             display: 'flex', alignItems: 'center', justifyContent: 'center',
//             padding: '1rem',
//           }}
//           onClick={e => { if (e.target === e.currentTarget) setShowLocModal(false) }}
//         >
//           <div
//             style={{
//               background: '#fff', borderRadius: 16, width: '100%', maxWidth: 620,
//               boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
//               overflow: 'hidden',
//               display: 'flex', flexDirection: 'column', maxHeight: '90vh',
//             }}
//           >
//             {/* Modal Header */}
//             <div style={{ padding: '18px 20px 14px', borderBottom: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//               <div>
//                 <h5 style={{ margin: 0, fontWeight: 700 }}>📍 Select Location</h5>
//                 <p style={{ margin: 0, color: '#6b7280', fontSize: 13 }}>Type an address or click on the map</p>
//               </div>
//               <button
//                 onClick={() => setShowLocModal(false)}
//                 style={{ border: 'none', background: 'none', fontSize: 22, cursor: 'pointer', color: '#9ca3af', lineHeight: 1 }}
//               >×</button>
//             </div>

//             {/* Address Input */}
//             <div style={{ padding: '14px 20px', borderBottom: '1px solid #f0f0f0' }}>
//               <div style={{ display: 'flex', gap: 8 }}>
//                 <input
//                   value={addressInput}
//                   onChange={e => setAddressInput(e.target.value)}
//                   onKeyDown={e => e.key === 'Enter' && handleAddressSearch()}
//                   placeholder="e.g. Al-Manakh District, Port Said"
//                   style={{
//                     flex: 1, padding: '9px 14px', borderRadius: 10,
//                     border: '1.5px solid #d1d5db', fontSize: 14,
//                     outline: 'none',
//                   }}
//                 />
//                 <button
//                   onClick={handleAddressSearch}
//                   disabled={addressLoading}
//                   style={{
//                     padding: '9px 18px', borderRadius: 10, border: 'none',
//                     background: '#6366f1', color: '#fff', fontWeight: 700,
//                     cursor: addressLoading ? 'not-allowed' : 'pointer',
//                     fontSize: 14, whiteSpace: 'nowrap', opacity: addressLoading ? 0.7 : 1,
//                   }}
//                 >
//                   {addressLoading ? '⏳' : '🔍 Search'}
//                 </button>
//               </div>
//               {addressError && (
//                 <p style={{ color: '#ef4444', fontSize: 12, margin: '6px 0 0' }}>{addressError}</p>
//               )}
//               {pickedCoords && (
//                 <div style={{
//                   marginTop: 8, padding: '8px 12px', borderRadius: 8,
//                   background: '#f0fdf4', border: '1px solid #bbf7d0',
//                   fontSize: 12, color: '#166534',
//                 }}>
//                   ✅ <strong>Selected:</strong> {pickedCoords.address}
//                 </div>
//               )}
//             </div>

//             {/* Modal Map */}
//             <div style={{ flex: 1, minHeight: 320, position: 'relative' }}>
//               {!modalMapReady && (
//                 <div style={{
//                   position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
//                   background: '#f9fafb', zIndex: 1, fontSize: 14, color: '#6b7280',
//                 }}>
//                   ⏳ Loading map…
//                 </div>
//               )}
//               <div ref={modalMapRef} style={{ height: '100%', minHeight: 320, width: '100%', zIndex: 0 }} />
//             </div>

//             {/* Modal Footer */}
//             <div style={{
//               padding: '14px 20px', borderTop: '1px solid #f0f0f0',
//               display: 'flex', justifyContent: 'flex-end', gap: 10,
//               background: '#fafafa',
//             }}>
//               <button
//                 onClick={() => setShowLocModal(false)}
//                 style={{
//                   padding: '8px 20px', borderRadius: 10, border: '1.5px solid #d1d5db',
//                   background: '#fff', cursor: 'pointer', fontWeight: 600, fontSize: 14,
//                 }}
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleConfirmLocation}
//                 disabled={!pickedCoords}
//                 style={{
//                   padding: '8px 22px', borderRadius: 10, border: 'none',
//                   background: pickedCoords ? '#6366f1' : '#e5e7eb',
//                   color: pickedCoords ? '#fff' : '#9ca3af',
//                   cursor: pickedCoords ? 'pointer' : 'not-allowed',
//                   fontWeight: 700, fontSize: 14,
//                 }}
//               >
//                 Confirm Location
//               </button>
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
import { getAllLocations } from '../../data/api/VaccLocations'
import { getMapReports } from '../../data/api/report'
import { Clinic } from '../../types/Clinic'
import { VaccLocation } from '../../types/VaccLocation'

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

// ── Static locations: hardcoded coords — no geocoding needed ───────────────
const STATIC_LOCATIONS: Omit<MapLocation, 'id'>[] = [
  // Animal Vaccination
  { name: 'Port Said Veterinary Medicine Directorate', address: 'New Qabuti Area, Port Said',
    lat: 31.2150, lng: 32.2900, type: 'vacc-animal',
    extra: { services: 'Stray Animal Rabies Vaccination Campaigns' } },
  { name: 'Pet Animal Hospital – Old Qabuti', address: 'Behind Al-Nour Housing, Port Said',
    lat: 31.2200, lng: 32.2950, type: 'vacc-animal',
    extra: { services: 'Animal Rabies Vaccination' } },
  { name: 'Pet Animal Hospital – Port Fouad', address: 'Port Fouad, Port Said',
    lat: 31.2600, lng: 32.3250, type: 'vacc-animal',
    extra: { services: 'Animal Rabies Vaccination' } },

  // Human Vaccination
  { name: 'Port Said Health Affairs Directorate', address: 'Al-Nahda Street, El-Sharq District, Port Said',
    lat: 31.2680, lng: 32.3010, type: 'vacc-human',
    extra: { services: 'Inquiries & Referrals Only' } },
  { name: 'Al-Hayah Hospital – Port Fouad', address: 'Al-Obour Housing, Port Fouad',
    lat: 31.2580, lng: 32.3230, type: 'vacc-human',
    extra: { services: 'Emergency – Human Rabies Vaccine (PEP)', phone: '0663400849' } },
  { name: '30 June Hospital', address: 'Al-Ganoub District, Port Said',
    lat: 31.2350, lng: 32.2870, type: 'vacc-human',
    extra: { services: 'Emergency – Human Rabies Vaccine (PEP)', phone: '0663254111' } },
  { name: 'Al-Salam Hospital', address: 'Safeya Zaghloul Street, El-Sharq District, Port Said',
    lat: 31.2670, lng: 32.3040, type: 'vacc-human',
    extra: { services: 'Emergency – Human Rabies Vaccine (PEP)' } },
  { name: 'Health Unit – Al-Manakh', address: 'Al-Manakh District, Port Said',
    lat: 31.2530, lng: 32.2960, type: 'vacc-human',
    extra: { services: 'Primary Healthcare – PEP Inquiries', phone: '15344' } },
  { name: 'Health Unit – Al-Dawahi', address: 'Al-Dawahi District, Port Said',
    lat: 31.2480, lng: 32.2920, type: 'vacc-human',
    extra: { services: 'Primary Healthcare – PEP Inquiries', phone: '15344' } },

  // Vaccination Areas
  { name: 'Al-Sharq District – Vaccinated',  address: 'Al-Sharq District, Port Said',  lat: 31.2700, lng: 32.3050, type: 'vacc-area', extra: { campaign: 'Vaccination campaign conducted' } },
  { name: 'Al-Manakh District – Vaccinated', address: 'Al-Manakh District, Port Said', lat: 31.2530, lng: 32.2960, type: 'vacc-area', extra: { campaign: 'Vaccination campaign conducted' } },
  { name: 'Al-Arab District – Vaccinated',   address: 'Al-Arab District, Port Said',   lat: 31.2450, lng: 32.2900, type: 'vacc-area', extra: { campaign: 'Campaign – Egypt Free of Rabies' } },
  { name: 'Al-Dawahi District – Vaccinated', address: 'Al-Dawahi District, Port Said', lat: 31.2480, lng: 32.2920, type: 'vacc-area', extra: { campaign: 'Large-scale stray dog vaccination' } },
  { name: 'Al-Zohour District – Vaccinated', address: 'Al-Zohour District, Port Said', lat: 31.2420, lng: 32.2850, type: 'vacc-area', extra: { campaign: 'Vaccination campaign conducted' } },
  { name: 'Al-Janoub District – Vaccinated', address: 'Al-Janoub District, Port Said', lat: 31.2300, lng: 32.2800, type: 'vacc-area', extra: { campaign: 'Field campaign – stray dogs' } },
  { name: 'Al-Gharb District – Vaccinated',  address: 'Al-Gharb District, Port Said',  lat: 31.2560, lng: 32.2880, type: 'vacc-area', extra: { campaign: 'Vaccination campaign conducted' } },
  { name: 'Port Fouad City – Vaccinated',    address: 'Port Fouad, Port Said',          lat: 31.2600, lng: 32.3250, type: 'vacc-area', extra: { campaign: 'Vaccination campaign conducted' } },
]

// ── geocode — only for dynamic API data that has no coords ────────────────
async function geocode(address: string): Promise<{ lat: number; lng: number } | null> {
  try {
    await new Promise(r => setTimeout(r, 1100)) // nominatim: max 1 req/sec
    const res  = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`,
      { headers: { 'Accept-Language': 'en' } }
    )
    const data = await res.json()
    if (data.length > 0) return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) }
  } catch {}
  return null
}

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
    new Set(['clinic', 'vaccine', 'report', 'vacc-animal', 'vacc-human', 'vacc-area'])
  )
  const [selectedLoc,   setSelectedLoc]   = useState<MapLocation | null>(null)
  const [loading,       setLoading]       = useState(false)

  // modal state
  const [showLocModal,   setShowLocModal]   = useState(false)
  const [addressInput,   setAddressInput]   = useState('')
  const [addressLoading, setAddressLoading] = useState(false)
  const [addressError,   setAddressError]   = useState('')
  const [pickedCoords,   setPickedCoords]   = useState<{ lat: number; lng: number; address: string } | null>(null)
  const [modalMapReady,  setModalMapReady]  = useState(false)

  // ── Step 1: load static locations immediately (no waiting) ────────────
  useEffect(() => {
    setAllLocations(
      STATIC_LOCATIONS.map((loc, i) => ({ ...loc, id: `static-${i}` }))
    )
  }, [])

  // ── Step 2: fetch dynamic data from APIs ──────────────────────────────
  useEffect(() => {
    const fetchDynamic = async () => {
      setLoading(true)
      const dynamic: MapLocation[] = []

      // Clinics
      try {
        const clinics: Clinic[] = await clinicsApi.getAll()
        for (const c of clinics) {
          if (c.latitude && c.longitude) {
            dynamic.push({
              id: c.id, name: c.name, address: c.address ?? '',
              lat: Number(c.latitude), lng: Number(c.longitude),
              type: 'clinic',
              extra: { hours: c.workingHours, price: c.bookingPrice, phone: c.phone },
            })
          } else if (c.address) {
            const coords = await geocode(c.address)
            if (coords) dynamic.push({
              id: c.id, name: c.name, address: c.address, ...coords, type: 'clinic',
              extra: { hours: c.workingHours, price: c.bookingPrice },
            })
          }
        }
      } catch (e) { console.error('clinics fetch error', e) }

      // Vaccine locations (API)
      try {
        const locs: VaccLocation[] = await getAllLocations()
        for (const v of locs) {
          if ((v as any).latitude && (v as any).longitude) {
            dynamic.push({
              id: v.id, name: v.name ?? 'Vaccine Location', address: v.address ?? '',
              lat: Number((v as any).latitude), lng: Number((v as any).longitude),
              type: 'vaccine',
              extra: { phone: v.phone, hours: v.hours, locType: v.type },
            })
          } else if (v.address) {
            const coords = await geocode(v.address)
            if (coords) dynamic.push({
              id: v.id, name: v.name ?? 'Vaccine Location', address: v.address ?? '',
              ...coords, type: 'vaccine',
              extra: { phone: v.phone, hours: v.hours, locType: v.type },
            })
          }
        }
      } catch (e) { console.error('vaccine fetch error', e) }

      // ── Reports: use getMapReports which returns lat/lng from server ──
      try {
        const raw = await getMapReports()
        const reports: any[] = Array.isArray(raw) ? raw : (raw?.data ?? [])

        for (const r of reports) {
          const lat = Number(r.latitude ?? r.lat)
          const lng = Number(r.longitude ?? r.lng)

          if (lat && lng && !isNaN(lat) && !isNaN(lng)) {
            // ✅ Server has coords — use directly, no geocoding
            dynamic.push({
              id:      r.id,
              name:    `Report #${r.id}`,
              address: [r.district, r.governorate].filter(Boolean).join(', '),
              lat, lng,
              type:  'report',
              extra: { status: r.status, reportType: r.type },
            })
          } else {
            // ⚠️ Fallback: geocode district+governorate
            const addr = [r.district, r.governorate].filter(Boolean).join(', ')
            if (addr) {
              const coords = await geocode(addr)
              if (coords) dynamic.push({
                id: r.id, name: `Report #${r.id}`, address: addr,
                ...coords, type: 'report',
                extra: { status: r.status, reportType: r.type },
              })
            }
          }
        }
      } catch (e) { console.error('reports fetch error', e) }

      // Merge: keep statics, add dynamic
      setAllLocations(prev => [
        ...prev.filter(l => String(l.id).startsWith('static-')),
        ...dynamic,
      ])
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
      const script = document.createElement('script')
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
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
          html:       `<div style="width:14px;height:14px;border-radius:50%;background:${color};border:2.5px solid white;box-shadow:0 2px 6px rgba(0,0,0,.35)"></div>`,
          className:  '', iconSize: [14, 14], iconAnchor: [7, 7],
        })
        const popup = `
          <div style="min-width:170px;font-size:13px;line-height:1.6">
            <strong>${loc.name}</strong><br/>
            ${loc.address         ? `<span style="color:#666;font-size:12px">${loc.address}</span><br/>` : ''}
            ${loc.extra?.services ? `🏷 ${loc.extra.services}<br/>`    : ''}
            ${loc.extra?.hours    ? `🕐 ${loc.extra.hours}<br/>`       : ''}
            ${loc.extra?.phone    ? `📞 ${loc.extra.phone}<br/>`       : ''}
            ${loc.extra?.price    ? `💰 ${loc.extra.price} EGP<br/>`  : ''}
            ${loc.extra?.status   ? `Status: ${loc.extra.status}<br/>` : ''}
            ${loc.extra?.campaign ? `📋 ${loc.extra.campaign}`         : ''}
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
      const script = document.createElement('script')
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
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
            {selectedLoc.address         && <p className="mb-1 text-muted small">📍 {selectedLoc.address}</p>}
            {selectedLoc.extra?.services && <p className="mb-1 small">🏷 {selectedLoc.extra.services}</p>}
            {selectedLoc.extra?.hours    && <p className="mb-1 small">🕐 {selectedLoc.extra.hours}</p>}
            {selectedLoc.extra?.phone    && <p className="mb-1 small">📞 {selectedLoc.extra.phone}</p>}
            {selectedLoc.extra?.price    && <p className="mb-1 small">💰 {selectedLoc.extra.price} EGP</p>}
            {selectedLoc.extra?.status   && <p className="mb-1 small">Status: {selectedLoc.extra.status}</p>}
            {selectedLoc.extra?.campaign && <p className="mb-1 small">📋 {selectedLoc.extra.campaign}</p>}
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
                color: pickedCoords ? '#fff' : '#9ca3af',
                cursor: pickedCoords ? 'pointer' : 'not-allowed',
                fontWeight: 700, fontSize: 14,
              }}>Confirm Location</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}