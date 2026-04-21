'use client'

import { useEffect, useRef, useState } from 'react'

type Props = {
  show:      boolean
  onClose:   () => void
  onConfirm: (lat: number, lng: number, address: string) => void
}

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

export default function LocationMapModal({ show, onClose, onConfirm }: Props) {
  const mapDivRef    = useRef<HTMLDivElement>(null)
  const mapInstRef   = useRef<any>(null)
  const pinRef       = useRef<any>(null)

  const [ready,         setReady]         = useState(false)
  const [addressInput,  setAddressInput]  = useState('')
  const [searching,     setSearching]     = useState(false)
  const [searchError,   setSearchError]   = useState('')
  const [picked,        setPicked]        = useState<{ lat: number; lng: number; address: string } | null>(null)

  // ── load Leaflet CSS once ──────────────────────────────────────────────
  useEffect(() => {
    if (!document.getElementById('leaflet-css')) {
      const link   = document.createElement('link')
      link.id      = 'leaflet-css'
      link.rel     = 'stylesheet'
      link.href    = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
      document.head.appendChild(link)
    }
  }, [])

  // ── init / destroy modal map ───────────────────────────────────────────
  useEffect(() => {
    if (!show) {
      mapInstRef.current?.remove()
      mapInstRef.current = null
      setReady(false)
      setPicked(null)
      setAddressInput('')
      setSearchError('')
      if (pinRef.current) { pinRef.current = null }
      return
    }

    const tryInit = () => {
      const L = (window as any).L
      if (!L || !mapDivRef.current || mapInstRef.current) return

      setTimeout(() => {
        if (!mapDivRef.current) return
        const map = L.map(mapDivRef.current).setView([31.2653, 32.3019], 12)

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors',
        }).addTo(map)

        map.on('click', async (e: any) => {
          const { lat, lng } = e.latlng
          placePin(map, L, lat, lng)
          const address = await reverseGeocode(lat, lng)
          setAddressInput(address)
          setPicked({ lat, lng, address })
        })

        mapInstRef.current = map
        setReady(true)
      }, 250)
    }

    if ((window as any).L) {
      tryInit()
    } else {
      const script  = document.createElement('script')
      script.src    = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
      script.onload = tryInit
      document.body.appendChild(script)
    }
  }, [show])

  const placePin = (map: any, L: any, lat: number, lng: number) => {
    if (pinRef.current) { pinRef.current.remove(); pinRef.current = null }
    const icon = L.divIcon({
      html: `<div style="width:22px;height:22px;border-radius:50%;background:#ef4444;border:3px solid white;box-shadow:0 3px 10px rgba(0,0,0,.4)"></div>`,
      className: '', iconSize: [22, 22], iconAnchor: [11, 11],
    })
    pinRef.current = L.marker([lat, lng], { icon }).addTo(map)
    map.setView([lat, lng], Math.max(map.getZoom(), 14))
  }

  const handleSearch = async () => {
    if (!addressInput.trim()) return
    setSearching(true)
    setSearchError('')

    const coords = await geocode(addressInput.trim())
    if (!coords) {
      setSearchError('Address not found. Try a more specific address.')
      setSearching(false)
      return
    }

    const L   = (window as any).L
    const map = mapInstRef.current
    if (map && L) placePin(map, L, coords.lat, coords.lng)

    setPicked({ lat: coords.lat, lng: coords.lng, address: addressInput.trim() })
    setSearching(false)
  }

  const handleConfirm = () => {
    if (!picked) return
    onConfirm(picked.lat, picked.lng, picked.address)
    onClose()
  }

  if (!show) return null

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(0,0,0,0.55)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '1rem',
      }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        style={{
          background: '#fff', borderRadius: 16, width: '100%', maxWidth: 600,
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          display: 'flex', flexDirection: 'column', maxHeight: '90vh',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div style={{
          padding: '16px 20px 12px', borderBottom: '1px solid #f0f0f0',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <div>
            <h5 style={{ margin: 0, fontWeight: 700 }}>📍 Select Location</h5>
            <p style={{ margin: 0, color: '#6b7280', fontSize: 13 }}>
              Type an address and search, or click directly on the map
            </p>
          </div>
          <button
            onClick={onClose}
            style={{ border: 'none', background: 'none', fontSize: 22, cursor: 'pointer', color: '#9ca3af', lineHeight: 1 }}
          >×</button>
        </div>

        {/* Search bar */}
        <div style={{ padding: '12px 20px', borderBottom: '1px solid #f0f0f0' }}>
          <div style={{ display: 'flex', gap: 8 }}>
            <input
              value={addressInput}
              onChange={e => setAddressInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSearch()}
              placeholder="e.g. Al-Manakh District, Port Said"
              style={{
                flex: 1, padding: '9px 14px', borderRadius: 10,
                border: '1.5px solid #d1d5db', fontSize: 14, outline: 'none',
              }}
            />
            <button
              onClick={handleSearch}
              disabled={searching}
              style={{
                padding: '9px 18px', borderRadius: 10, border: 'none',
                background: '#6366f1', color: '#fff', fontWeight: 700,
                cursor: searching ? 'not-allowed' : 'pointer',
                fontSize: 14, opacity: searching ? 0.7 : 1, whiteSpace: 'nowrap',
              }}
            >
              {searching ? '⏳' : '🔍 Search'}
            </button>
          </div>

          {searchError && (
            <p style={{ color: '#ef4444', fontSize: 12, margin: '6px 0 0' }}>{searchError}</p>
          )}

          {picked && (
            <div style={{
              marginTop: 8, padding: '7px 12px', borderRadius: 8,
              background: '#f0fdf4', border: '1px solid #bbf7d0',
              fontSize: 12, color: '#166534',
            }}>
              ✅ <strong>Selected:</strong> {picked.address}
            </div>
          )}
        </div>

        {/* Map */}
        <div style={{ flex: 1, minHeight: 300, position: 'relative' }}>
          {!ready && (
            <div style={{
              position: 'absolute', inset: 0, display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              background: '#f9fafb', zIndex: 1, fontSize: 14, color: '#6b7280',
            }}>
              ⏳ Loading map…
            </div>
          )}
          <div ref={mapDivRef} style={{ height: '100%', minHeight: 300, width: '100%', zIndex: 0 }} />
        </div>

        {/* Footer */}
        <div style={{
          padding: '12px 20px', borderTop: '1px solid #f0f0f0',
          display: 'flex', justifyContent: 'flex-end', gap: 10, background: '#fafafa',
        }}>
          <button
            onClick={onClose}
            style={{
              padding: '8px 20px', borderRadius: 10, border: '1.5px solid #d1d5db',
              background: '#fff', cursor: 'pointer', fontWeight: 600, fontSize: 14,
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={!picked}
            style={{
              padding: '8px 22px', borderRadius: 10, border: 'none',
              background: picked ? '#6366f1' : '#e5e7eb',
              color: picked ? '#fff' : '#9ca3af',
              cursor: picked ? 'pointer' : 'not-allowed',
              fontWeight: 700, fontSize: 14,
            }}
          >
            ✅ Confirm Location
          </button>
        </div>
      </div>
    </div>
  )
}