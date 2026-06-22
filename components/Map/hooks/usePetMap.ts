// 'use client'

// import { useEffect, useRef, useState } from 'react'
// import { clinicsApi } from '../../../data/api/Clinic'
// import { getAllApprovedReports, getMyReports } from '../../../data/api/report'
// import { Clinic } from '../../../types/Clinic'
// import type { FilterKey, MapLocation } from '../../../types/MapLocation'
// import { TYPE_COLORS, FILTER_LABELS } from '../../../types/MapLocation'
// import { buildDangerZones, geocode, processReport } from '../../../utils/mapUtils'

// export function usePetMap(currentUserId?: string | number) {
//   const mapRef         = useRef<HTMLDivElement & { _leaflet_id?: number }>(null)
//   const mapInstanceRef = useRef<any>(null)
//   const markersRef     = useRef<any[]>([])
//   const zoneLayersRef  = useRef<any[]>([])

//   const [allLocations,  setAllLocations]  = useState<MapLocation[]>([])
//   const [myReportIds,   setMyReportIds]   = useState<Set<string | number>>(new Set())
//   const [activeFilters, setActiveFilters] = useState<Set<FilterKey>>(
//     new Set(['clinic', 'report-bite', 'report-animal'] as FilterKey[])
//   )
//   const [selectedLoc, setSelectedLoc] = useState<MapLocation | null>(null)
//   const [loading,     setLoading]     = useState(false)

//   // ── fetch all data ─────────────────────────────────────────────────────
//   useEffect(() => {
//     const fetchDynamic = async () => {
//       setLoading(true)
//       const dynamic: MapLocation[]      = []
//       const myIds: Set<string | number> = new Set()

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
//         const raw = await getAllApprovedReports()
//         const reports: any[] = Array.isArray(raw) ? raw : (raw?.data ?? [])
//         for (const r of reports) {
//           if (r.status === 3) continue
//           await processReport(r, dynamic, myIds, false)
//         }
//       } catch (e) { console.error('reports fetch error', e) }

//       try {
//         const raw = await getMyReports()
//         const myReports: any[] = Array.isArray(raw) ? raw : (raw?.data ?? [])
//         for (const r of myReports) {
//           if (r.status === 3) continue
//           const existing = dynamic.find(d => d.id === r.id)
//           if (existing) {
//             myIds.add(r.id)
//             existing.extra = { ...existing.extra, isMyReport: true }
//           } else {
//             await processReport(r, dynamic, myIds, true)
//           }
//         }
//       } catch (e) { console.error('my reports fetch error', e) }

//       setAllLocations(dynamic)
//       setMyReportIds(myIds)
//       setLoading(false)
//     }
//     fetchDynamic()
//   }, [currentUserId])

//   // ── inject Leaflet CSS ─────────────────────────────────────────────────
//   useEffect(() => {
//     if (!document.getElementById('leaflet-css')) {
//       const link = document.createElement('link')
//       link.id   = 'leaflet-css'
//       link.rel  = 'stylesheet'
//       link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
//       document.head.appendChild(link)
//     }
//   }, [])

//   // ── init Leaflet map ───────────────────────────────────────────────────
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
//       const script    = document.createElement('script')
//       script.src      = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
//       script.onload   = init
//       document.body.appendChild(script)
//     }
//     return () => { mapInstanceRef.current?.remove(); mapInstanceRef.current = null }
//   }, [])

//   // ── re-render markers + danger zones when data / filters change ────────
//   useEffect(() => {
//     const map = mapInstanceRef.current
//     const L   = (window as any).L
//     if (!map || !L || !(map as any)._loaded) return

//     markersRef.current.forEach(m => { try { m.remove() } catch {} })
//     markersRef.current = []
//     zoneLayersRef.current.forEach(z => { try { z.remove() } catch {} })
//     zoneLayersRef.current = []

//     const visibleLocations = allLocations.filter(loc => {
//       if (activeFilters.has('my-reports') && myReportIds.has(loc.id)) return true
//       return activeFilters.has(loc.type as FilterKey)
//     })

//     // ── danger zones ───────────────────────────────────────────────────
//     const reportLocs = visibleLocations.filter(l => l.type.startsWith('report'))
//     const zones      = buildDangerZones(reportLocs, 2)

//     zones.forEach(zone => {
//       try {
//         const outerRing = L.circle([zone.lat, zone.lng], {
//           radius: zone.radius * 1.25, color: zone.color, fillColor: zone.fillColor,
//           fillOpacity: 0.06, weight: 0, interactive: false,
//         }).addTo(map)
//         const circle = L.circle([zone.lat, zone.lng], {
//           radius: zone.radius, color: zone.color, fillColor: zone.fillColor,
//           fillOpacity: 0.15, weight: 2, dashArray: '6 5', interactive: true,
//         }).addTo(map)
//         circle.bindPopup(`
//           <div style="min-width:180px;font-size:13px;line-height:1.7">
//             <strong style="font-size:14px">${zone.label}</strong><br/>
//             <span style="color:#666">📍 ${zone.count} reports in this area</span><br/>
//             <span style="color:#ef4444;font-weight:600">⚠️ Exercise caution nearby</span>
//           </div>`)
//         zoneLayersRef.current.push(outerRing, circle)
//       } catch (e) { console.warn('Zone render failed:', e) }
//     })

//     // ── markers ────────────────────────────────────────────────────────
//     visibleLocations.forEach(loc => {
//       try {
//         const color   = (TYPE_COLORS as any)[loc.type] ?? '#666'
//         const isMyReport = myReportIds.has(loc.id)
//         const isHot   = !isMyReport && loc.type.startsWith('report') &&
//           (color === '#dc2626' || color === '#f97316')
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
//           const lbl =
//             sv === 'superficial' ? '🟡 Superficial' :
//             sv === 'moderate'    ? '🟠 Moderate'    :
//             sv === 'deep'        ? '🟠 Deep'        :
//             sv === 'severe'      ? '🔴 Severe'      : `⚫ ${loc.extra.severity}`
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
//       } catch (e) { console.warn('Marker render failed:', e) }
//     })
//   }, [allLocations, activeFilters, myReportIds])

//   const toggleFilter = (type: FilterKey) => {
//     setActiveFilters(prev => {
//       const next = new Set(prev)
//       next.has(type) ? next.delete(type) : next.add(type)
//       return next
//     })
//     setSelectedLoc(null)
//   }

//   return {
//     mapRef,
//     loading,
//     activeFilters,
//     selectedLoc,
//     setSelectedLoc,
//     toggleFilter,
//   }
// }

'use client'

import { useEffect, useRef, useState } from 'react'
import { clinicsApi } from '../../../data/api/Clinic'
import { getAllApprovedReports, getMyReports } from '../../../data/api/report'
import { Clinic } from '../../../types/Clinic'
import type { FilterKey, MapLocation } from '../../../types/MapLocation'
import { TYPE_COLORS, FILTER_LABELS } from '../../../types/MapLocation'
import { buildDangerZones, geocode, processReport } from '../../../utils/mapUtils'

export function usePetMap(currentUserId?: string | number) {
  const mapRef         = useRef<HTMLDivElement & { _leaflet_id?: number }>(null)
  const mapInstanceRef = useRef<any>(null)
  const markersRef     = useRef<any[]>([])
  const zoneLayersRef  = useRef<any[]>([])

  const [allLocations,  setAllLocations]  = useState<MapLocation[]>([])
  const [myReportIds,   setMyReportIds]   = useState<Set<string | number>>(new Set())
  const [activeFilters, setActiveFilters] = useState<Set<FilterKey>>(
    new Set(['clinic', 'report-bite', 'report-animal'] as FilterKey[])
  )
  const [selectedLoc, setSelectedLoc] = useState<MapLocation | null>(null)
  const [loading,     setLoading]     = useState(false)

  // ── fetch all data ─────────────────────────────────────────────────────
  useEffect(() => {
    const fetchDynamic = async () => {
      setLoading(true)
      const dynamic: MapLocation[]      = []
      const myIds: Set<string | number> = new Set()

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

      try {
        const raw = await getAllApprovedReports()
        const reports: any[] = Array.isArray(raw) ? raw : (raw?.data ?? [])
        for (const r of reports) {
          // الـ backend بيرجع approved + in progress + done بس، مش محتاجين نفلتر
          await processReport(r, dynamic, myIds, false)
        }
      } catch (e) { console.error('reports fetch error', e) }

      try {
        const raw = await getMyReports()
        const myReports: any[] = Array.isArray(raw) ? raw : (raw?.data ?? [])
        for (const r of myReports) {
          if (r.status === 0 || r.status === 3) continue // شيل pending + rejected
          const existing = dynamic.find(d => d.id === r.id)
          if (existing) {
            myIds.add(r.id)
            existing.extra = { ...existing.extra, isMyReport: true }
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

  // ── inject Leaflet CSS ─────────────────────────────────────────────────
  useEffect(() => {
    if (!document.getElementById('leaflet-css')) {
      const link = document.createElement('link')
      link.id   = 'leaflet-css'
      link.rel  = 'stylesheet'
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
      document.head.appendChild(link)
    }
  }, [])

  // ── init Leaflet map ───────────────────────────────────────────────────
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
      const script    = document.createElement('script')
      script.src      = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
      script.onload   = init
      document.body.appendChild(script)
    }
    return () => { mapInstanceRef.current?.remove(); mapInstanceRef.current = null }
  }, [])

  // ── re-render markers + danger zones when data / filters change ────────
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

    // ── danger zones ───────────────────────────────────────────────────
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

    // ── markers ────────────────────────────────────────────────────────
    visibleLocations.forEach(loc => {
      try {
        const color      = (TYPE_COLORS as any)[loc.type] ?? '#666'
        const isMyReport = myReportIds.has(loc.id)
        const isHot      = !isMyReport && loc.type.startsWith('report') &&
          (color === '#dc2626' || color === '#f97316')
        const dotSize    = isHot ? 18 : 14

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
          const lbl =
            sv === 'superficial' ? '🟡 Superficial' :
            sv === 'moderate'    ? '🟠 Moderate'    :
            sv === 'deep'        ? '🟠 Deep'        :
            sv === 'severe'      ? '🔴 Severe'      : `⚫ ${loc.extra.severity}`
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

  const toggleFilter = (type: FilterKey) => {
    setActiveFilters(prev => {
      const next = new Set(prev)
      next.has(type) ? next.delete(type) : next.add(type)
      return next
    })
    setSelectedLoc(null)
  }

  return {
    mapRef,
    loading,
    activeFilters,
    selectedLoc,
    setSelectedLoc,
    toggleFilter,
  }
}