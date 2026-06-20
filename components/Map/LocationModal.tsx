import { useMapModal } from './hooks/useMapModal'

type Props = {
  onClose:          () => void
  onSelectLocation: (lat: number, lng: number, address?: string) => void
}

export default function LocationModal({ onClose, onSelectLocation }: Props) {
  const {
    modalMapRef,
    addressInput, setAddressInput,
    addressLoading,
    addressError,
    pickedCoords,
    modalMapReady,
    handleAddressSearch,
    handleConfirmLocation,
  } = useMapModal(true, onSelectLocation)

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(0,0,0,0.55)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem',
      }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div style={{
        background: '#fff', borderRadius: 16, width: '100%', maxWidth: 620,
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        overflow: 'hidden', display: 'flex', flexDirection: 'column', maxHeight: '90vh',
      }}>
        {/* Header */}
        <div style={{ padding: '18px 20px 14px', borderBottom: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h5 style={{ margin: 0, fontWeight: 700 }}>📍 Select Location</h5>
            <p style={{ margin: 0, color: '#6b7280', fontSize: 13 }}>Type an address or click on the map</p>
          </div>
          <button
            onClick={onClose}
            style={{ border: 'none', background: 'none', fontSize: 22, cursor: 'pointer', color: '#9ca3af', lineHeight: 1 }}
          >×</button>
        </div>

        {/* Search bar */}
        <div style={{ padding: '14px 20px', borderBottom: '1px solid #f0f0f0' }}>
          <div style={{ display: 'flex', gap: 8 }}>
            <input
              value={addressInput}
              onChange={e => setAddressInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleAddressSearch()}
              placeholder="e.g. Al-Manakh District, Port Said"
              style={{ flex: 1, padding: '9px 14px', borderRadius: 10, border: '1.5px solid #d1d5db', fontSize: 14, outline: 'none' }}
            />
            <button
              onClick={handleAddressSearch}
              disabled={addressLoading}
              style={{
                padding: '9px 18px', borderRadius: 10, border: 'none',
                background: '#6366f1', color: '#fff', fontWeight: 700,
                cursor: addressLoading ? 'not-allowed' : 'pointer',
                fontSize: 14, whiteSpace: 'nowrap', opacity: addressLoading ? 0.7 : 1,
              }}
            >
              {addressLoading ? '⏳' : '🔍 Search'}
            </button>
          </div>
          {addressError && (
            <p style={{ color: '#ef4444', fontSize: 12, margin: '6px 0 0' }}>{addressError}</p>
          )}
          {pickedCoords && (
            <div style={{ marginTop: 8, padding: '8px 12px', borderRadius: 8, background: '#f0fdf4', border: '1px solid #bbf7d0', fontSize: 12, color: '#166534' }}>
              ✅ <strong>Selected:</strong> {pickedCoords.address}
            </div>
          )}
        </div>

        {/* Map */}
        <div style={{ flex: 1, minHeight: 320, position: 'relative' }}>
          {!modalMapReady && (
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f9fafb', zIndex: 1, fontSize: 14, color: '#6b7280' }}>
              ⏳ Loading map…
            </div>
          )}
          <div ref={modalMapRef} style={{ height: '100%', minHeight: 320, width: '100%', zIndex: 0 }} />
        </div>

        {/* Footer */}
        <div style={{ padding: '14px 20px', borderTop: '1px solid #f0f0f0', display: 'flex', justifyContent: 'flex-end', gap: 10, background: '#fafafa' }}>
          <button
            onClick={onClose}
            style={{ padding: '8px 20px', borderRadius: 10, border: '1.5px solid #d1d5db', background: '#fff', cursor: 'pointer', fontWeight: 600, fontSize: 14 }}
          >Cancel</button>
          <button
            onClick={() => handleConfirmLocation(onClose)}
            disabled={!pickedCoords}
            style={{
              padding: '8px 22px', borderRadius: 10, border: 'none',
              background: pickedCoords ? '#6366f1' : '#e5e7eb',
              color:      pickedCoords ? '#fff'    : '#9ca3af',
              cursor:     pickedCoords ? 'pointer' : 'not-allowed',
              fontWeight: 700, fontSize: 14,
            }}
          >Confirm Location</button>
        </div>
      </div>
    </div>
  )
}