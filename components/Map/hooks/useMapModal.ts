'use client'

import { useEffect, useRef, useState } from 'react'
import { geocode, reverseGeocode } from '../../../utils/mapUtils'

export function useMapModal(
  showLocModal: boolean,
  onSelectLocation?: (lat: number, lng: number, address?: string) => void
) {
  const modalMapRef  = useRef<HTMLDivElement>(null)
  const modalMapInst = useRef<any>(null)
  const pinMarkerRef = useRef<any>(null)

  const [addressInput,   setAddressInput]   = useState('')
  const [addressLoading, setAddressLoading] = useState(false)
  const [addressError,   setAddressError]   = useState('')
  const [pickedCoords,   setPickedCoords]   = useState<{ lat: number; lng: number; address: string } | null>(null)
  const [modalMapReady,  setModalMapReady]  = useState(false)

  const placePinOnModalMap = (mmap: any, L: any, lat: number, lng: number) => {
    if (pinMarkerRef.current) { pinMarkerRef.current.remove(); pinMarkerRef.current = null }
    const icon = L.divIcon({
      html: `<div style="width:22px;height:22px;border-radius:50%;background:#ef4444;border:3px solid white;box-shadow:0 3px 10px rgba(0,0,0,.4)"></div>`,
      className: '', iconSize: [22, 22], iconAnchor: [11, 11],
    })
    pinMarkerRef.current = L.marker([lat, lng], { icon }).addTo(mmap)
    mmap.setView([lat, lng], Math.max(mmap.getZoom(), 14))
  }

  // ── init / destroy modal map ───────────────────────────────────────────
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

  const handleConfirmLocation = (onClose: () => void) => {
    if (!pickedCoords) return
    onSelectLocation?.(pickedCoords.lat, pickedCoords.lng, pickedCoords.address)
    onClose()
    setPickedCoords(null)
    setAddressInput('')
  }

  return {
    modalMapRef,
    addressInput, setAddressInput,
    addressLoading,
    addressError,
    pickedCoords,
    modalMapReady,
    handleAddressSearch,
    handleConfirmLocation,
  }
}