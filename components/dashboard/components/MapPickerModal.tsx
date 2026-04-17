
'use client'

import { useEffect, useRef, useState } from 'react'
import { Modal, Button } from 'react-bootstrap'

interface Props {
  show: boolean
  onHide: () => void
  onConfirm: (lat: number, lng: number) => void
  initialLat?: number
  initialLng?: number
}

export default function MapPickerModal({ show, onHide, onConfirm, initialLat, initialLng }: Props) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  const markerRef = useRef<any>(null)
  const [pickedLat, setPickedLat] = useState<number | null>(initialLat ?? null)
  const [pickedLng, setPickedLng] = useState<number | null>(initialLng ?? null)

  useEffect(() => {
    if (!show) return

    const init = () => {
      if (!window.L || !mapRef.current || mapInstanceRef.current) return
      const L = window.L

      const center: [number, number] =
        initialLat && initialLng ? [initialLat, initialLng] : [31.2565, 32.2941]

      const map = L.map(mapRef.current).setView(center, 13)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap',
      }).addTo(map)

      if (initialLat && initialLng) {
        markerRef.current = L.marker([initialLat, initialLng]).addTo(map)
        setPickedLat(initialLat)
        setPickedLng(initialLng)
      }

      map.on('click', (e: any) => {
        const { lat, lng } = e.latlng
        setPickedLat(lat)
        setPickedLng(lng)
        if (markerRef.current) markerRef.current.remove()
        markerRef.current = L.marker([lat, lng]).addTo(map)
      })

      mapInstanceRef.current = map
    }

    if (window.L) {
      setTimeout(init, 100) // wait for modal to render
    } else {
      const script = document.createElement('script')
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
      script.onload = () => setTimeout(init, 100)
      document.body.appendChild(script)
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [show])

  const handleConfirm = () => {
    if (pickedLat !== null && pickedLng !== null) {
      onConfirm(pickedLat, pickedLng)
      onHide()
    }
  }

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Pick Location on Map</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ padding: 0 }}>
        <div ref={mapRef} style={{ height: '450px', width: '100%' }} />
        {pickedLat && pickedLng && (
          <div className="p-2 text-muted small text-center">
            Selected: {pickedLat.toFixed(5)}, {pickedLng.toFixed(5)}
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Cancel</Button>
        <Button
          className="btn-primary-green"
          disabled={pickedLat === null}
          onClick={handleConfirm}
        >
          Confirm Location
        </Button>
      </Modal.Footer>
    </Modal>
  )
}