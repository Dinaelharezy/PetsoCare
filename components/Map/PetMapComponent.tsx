
'use client'

import { useEffect, useRef, useState } from 'react'
import { clinicsApi } from '../../data/api/Clinic'
import { getAllLocations } from '../../data/api/VaccLocations'
import { getAllReports } from '../../data/api/report'
import { Clinic } from '../../types/Clinic'
import { VaccLocation } from '../../types/VaccLocation'
import { Report } from '../../types/report'

// ── types ──────────────────────────────────────────────────────────────────
type MapLocation = {
  id:      string | number
  name:    string
  address: string
  lat:     number
  lng:     number
  type:    'clinic' | 'vaccine' | 'report'
  extra?:  Record<string, any>
}

type Props = {
  onSelectLocation?: (lat: number, lng: number) => void
  allowPinDrop?:     boolean
}

// ── constants ──────────────────────────────────────────────────────────────
const TYPE_COLORS = {
  clinic:  '#22c55e',
  vaccine: '#3b82f6',
  report:  '#ef4444',
} as const

const FILTER_LABELS = {
  clinic:  '🏥 Clinics',
  vaccine: '💉 Vaccine',
  report:  '⚠️ Reports',
} as const

// ── geocode helper ─────────────────────────────────────────────────────────
async function geocode(address: string): Promise<{ lat: number; lng: number } | null> {
  try {
    const res  = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`,
      { headers: { 'Accept-Language': 'en' } }
    )
    const data = await res.json()
    if (data.length > 0) return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) }
  } catch {}
  return null
}

// ── component ──────────────────────────────────────────────────────────────
export default function PetMap({ onSelectLocation, allowPinDrop = false }: Props) {
  const mapRef         = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  const markersRef     = useRef<any[]>([])

  const [allLocations,  setAllLocations]  = useState<MapLocation[]>([])
  const [activeFilters, setActiveFilters] = useState<Set<string>>(new Set(['clinic', 'vaccine', 'report']))
  const [selectedLoc,   setSelectedLoc]   = useState<MapLocation | null>(null)
  const [geocoding,     setGeocoding]     = useState(false)

  // ── fetch all data (async inside useEffect ✅) ─────────────────────────
  useEffect(() => {
    const build = async () => {
      setGeocoding(true)
      const result: MapLocation[] = []

      // 1. Clinics
      try {
        const clinics: Clinic[] = await clinicsApi.getAll()
        for (const c of clinics) {
          if (c.latitude && c.longitude) {
            result.push({
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
            if (coords) result.push({
              id: c.id, name: c.name, address: c.address,
              ...coords, type: 'clinic',
              extra: { hours: c.workingHours, price: c.bookingPrice },
            })
          }
        }
      } catch (e) { console.error('clinics fetch error', e) }

      // 2. Vaccine locations
      try {
        const locs: VaccLocation[] = await getAllLocations()
        for (const v of locs) {
          if (v.address) {
            const coords = await geocode(v.address)
            if (coords) result.push({
              id:      v.id,
              name:    v.name    ?? 'Vaccine Location',
              address: v.address ?? '',
              ...coords,
              type:  'vaccine',
              extra: { phone: v.phone, hours: v.hours, locType: v.type },
            })
          }
        }
      } catch (e) { console.error('vaccine fetch error', e) }

      // 3. Reports
      try {
        const raw     = await getAllReports()
        const reports: Report[] = Array.isArray(raw) ? raw : raw?.data ?? []
        for (const r of reports) {
          const addr = [r.district, r.governorate].filter(Boolean).join(', ')
          if (addr) {
            const coords = await geocode(addr)
            if (coords) result.push({
              id:      r.id,
              name:    `Report #${r.id}`,
              address: addr,
              ...coords,
              type:  'report',
              extra: { status: r.status, reportType: r.type },
            })
          }
        }
      } catch (e) { console.error('reports fetch error', e) }

      setAllLocations(result)
      setGeocoding(false)
    }

    build() // ✅ async function called inside useEffect — no await at top level
  }, [])

  useEffect(() => {
  // ✅ تحميل Leaflet CSS أولاً
  if (!document.getElementById('leaflet-css')) {
    const link = document.createElement('link')
    link.id = 'leaflet-css'
    link.rel = 'stylesheet'
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
    document.head.appendChild(link)
  }

  const init = () => {
    if (!window.L || !mapRef.current || mapInstanceRef.current) return
    const L = window.L

    const map = L.map(mapRef.current).setView([26.8206, 30.8025], 6)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(map)

    if (allowPinDrop && onSelectLocation) {
      map.on('click', (e: any) => onSelectLocation(e.latlng.lat, e.latlng.lng))
    }

    mapInstanceRef.current = map
  }

  if (window.L) {
    init()
  } else {
    const script = document.createElement('script')
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
    script.onload = init
    document.body.appendChild(script)
  }

  return () => {
    mapInstanceRef.current?.remove()
    mapInstanceRef.current = null
  }
}, [])
  // ── init map ───────────────────────────────────────────────────────────

  useEffect(() => {
    const init = () => {
      if (!window.L || !mapRef.current || mapInstanceRef.current) return
      const L = window.L

      const map = L.map(mapRef.current).setView([26.8206, 30.8025], 6)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
      }).addTo(map)

      if (allowPinDrop && onSelectLocation) {
        map.on('click', (e: any) => onSelectLocation(e.latlng.lat, e.latlng.lng))
      }

      mapInstanceRef.current = map
    }

    if (window.L) {
      init()
    } else {
      const script    = document.createElement('script')
      script.src      = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
      script.onload   = init
      document.body.appendChild(script)
    }

    return () => {
      mapInstanceRef.current?.remove()
      mapInstanceRef.current = null
    }
  }, [])

  // ── update markers ─────────────────────────────────────────────────────
  useEffect(() => {
    const map = mapInstanceRef.current
    if (!map || !window.L) return
    const L = window.L

    markersRef.current.forEach(m => m.remove())
    markersRef.current = []

    allLocations
      .filter(loc => activeFilters.has(loc.type))
      .forEach(loc => {
        const color = TYPE_COLORS[loc.type]
        const icon  = L.divIcon({
          html:      `<div style="width:14px;height:14px;border-radius:50%;background:${color};border:2.5px solid white;box-shadow:0 2px 6px rgba(0,0,0,.35)"></div>`,
          className: '',
          iconSize:  [14, 14],
          iconAnchor:[7, 7],
        })

        const popup = `
          <div style="min-width:160px;font-size:13px">
            <strong>${loc.name}</strong><br/>
            ${loc.address                ? `<span style="color:#666">${loc.address}</span><br/>`    : ''}
            ${loc.extra?.hours           ? `🕐 ${loc.extra.hours}<br/>`                             : ''}
            ${loc.extra?.phone           ? `📞 ${loc.extra.phone}<br/>`                             : ''}
            ${loc.extra?.price           ? `💰 ${loc.extra.price} EGP<br/>`                         : ''}
            ${loc.extra?.status          ? `Status: ${loc.extra.status}`                            : ''}
          </div>
        `

        const marker = L.marker([loc.lat, loc.lng], { icon })
          .addTo(map)
          .bindPopup(popup)
          .on('click', () => setSelectedLoc(loc))

        markersRef.current.push(marker)
      })
  }, [allLocations, activeFilters])

  // ── toggle filter ──────────────────────────────────────────────────────
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

        {/* Filters */}
        <div className="d-flex gap-2 flex-wrap mb-3">
          {(Object.keys(TYPE_COLORS) as (keyof typeof TYPE_COLORS)[]).map(type => {
            const active = activeFilters.has(type)
            const color  = TYPE_COLORS[type]
            return (
              <button
                key={type}
                onClick={() => toggleFilter(type)}
                style={{
                  padding:      '6px 16px',
                  borderRadius: 20,
                  cursor:       'pointer',
                  border:       `2px solid ${color}`,
                  background:   active ? color : 'transparent',
                  color:        active ? 'white' : color,
                  fontWeight:   600,
                  fontSize:     13,
                }}
              >
                {FILTER_LABELS[type]}
              </button>
            )
          })}

          {geocoding && (
            <span className="text-muted small align-self-center ms-2">
              ⏳ Geocoding addresses…
            </span>
          )}
        </div>

        {/* Map */}
        <div style={{ height: '500px', borderRadius: 12, overflow: 'hidden', border: '1px solid #ddd' }}>
          {/* <div ref={mapRef} style={{ height: '100%', width: '100%' }} />
           */}
           <div
  ref={mapRef}
  style={{
    height: '100%',
    width: '100%',
    // ✅ مهم جداً
    zIndex: 0,
  }}
/>
        </div>

        {/* Selected card */}
        {selectedLoc && (
          <div className="card mt-4 p-3">
            <div className="d-flex justify-content-between align-items-start">
              <h5 className="mb-1">{selectedLoc.name}</h5>
              <button
                onClick={() => setSelectedLoc(null)}
                style={{ border: 'none', background: 'none', fontSize: 20, cursor: 'pointer', lineHeight: 1 }}
              >×</button>
            </div>
            {selectedLoc.address          && <p className="mb-1 text-muted small">📍 {selectedLoc.address}</p>}
            {selectedLoc.extra?.hours     && <p className="mb-1 small">🕐 {selectedLoc.extra.hours}</p>}
            {selectedLoc.extra?.phone     && <p className="mb-1 small">📞 {selectedLoc.extra.phone}</p>}
            {selectedLoc.extra?.price     && <p className="mb-1 small">💰 {selectedLoc.extra.price} EGP</p>}
            {selectedLoc.extra?.status    && <p className="mb-1 small">Status: {selectedLoc.extra.status}</p>}
          </div>
        )}
      </div>
    </div>
  )
}