// // import { useVaccLocations} from "./hooks/useVaccLocations";

// export default function LocationCard({
//   loc,
//   type,
// }: {
//   loc: any; 
//   type: 'animal' | 'human';
// }) {
//   const accentColor = type === 'animal' ? '#198754' : '#0d6efd'
//   const lightBg = type === 'animal' ? '#f0fff4' : '#f0f4ff'

//   return (
//     <div
//       style={{
//         background: '#fff',
//         border: '1px solid #e9ecef',
//         borderLeft: `4px solid ${accentColor}`,
//         borderRadius: '10px',
//         padding: '18px 20px',
//         boxShadow: '0 1px 6px rgba(0,0,0,0.06)',
//       }}
//     >
//       <div className="d-flex flex-wrap justify-content-between align-items-start gap-2 mb-2">
//         <div>
//           <div className="fw-bold" style={{ fontSize: '1rem' }}>
//             🏥 {loc.name}
//           </div>
//           <div className="text-muted small mt-1">📍 {loc.address}</div>
//           {loc.phone && (
//             <div className="small mt-1">📞 {loc.phone}</div>
//           )}
//           {loc.hours && (
//             <div className="small mt-1">🕐 {loc.hours}</div>
//           )}
//           <div className="small mt-1">
//             <span
//               style={{
//                 background: lightBg,
//                 color: accentColor,
//                 borderRadius: '6px',
//                 padding: '2px 8px',
//                 fontWeight: 500,
//               }}
//             >
//               🩺 {loc.services}
//             </span>
//           </div>
//         </div>
//       </div>

//       {loc.note && (
//         <div
//           className="small text-muted mt-2"
//           style={{
//             background: '#f8f9fa',
//             borderRadius: '6px',
//             padding: '8px 10px',
//           }}
//         >
//           ℹ️ {loc.note}
//         </div>
//       )}

//       {'isInquiryOnly' in loc && loc.isInquiryOnly ? null : (
//         <div className="d-flex gap-2 mt-3">
//           {loc.phone && (
//             <a
//               href={`tel:${loc.phone}`}
//               style={{
//                 background: type === 'animal' ? '#198754' : '#dc3545',
//                 color: '#fff',
//                 border: 'none',
//                 borderRadius: '8px',
//                 padding: '8px 18px',
//                 fontWeight: 600,
//                 fontSize: '0.875rem',
//                 textDecoration: 'none',
//                 display: 'inline-flex',
//                 alignItems: 'center',
//                 gap: '6px',
//                 transition: 'filter 0.15s',
//               }}
//               onMouseOver={e => (e.currentTarget.style.filter = 'brightness(0.88)')}
//               onMouseOut={e => (e.currentTarget.style.filter = 'none')}
//             >
//               📞 Call Now
//             </a>
//           )}
//           <button
//             style={{
//               background: '#fff',
//               color: '#333',
//               border: '1px solid #dee2e6',
//               borderRadius: '8px',
//               padding: '8px 18px',
//               fontWeight: 500,
//               fontSize: '0.875rem',
//               cursor: 'pointer',
//             }}
//             onClick={() => alert('Map view coming soon')}
//           >
//             🗺 View on Map
//           </button>
//         </div>
//       )}
//     </div>
//   )
// }
'use client'

import { VaccLocation, SERVICE_TYPE_LABELS, typeColor } from '../../../../types/VaccLocation'

export default function LocationCard({
  loc,
  type,
}: {
  loc: VaccLocation;
  type: 'animal' | 'human';
}) {
  const accentColor = type === 'animal' ? '#198754' : '#0d6efd'
  const lightBg = type === 'animal' ? '#f0fff4' : '#f0f4ff'
  
  // تحديد إذا كان المكان للاستفسار فقط (لا يوجد تطعيم مباشر)
  const isInquiryOnly = loc.serviceType === 4 // InquiryOnly = 4
  
  // الحصول على نص الخدمة من الـ labels
  const serviceLabel = SERVICE_TYPE_LABELS[loc.serviceType] || 'Vaccination Service'
  
  // تنسيق رقم الهاتف (إزالة المسافات الزائدة)
  const phoneNumber = loc.phone?.replace(/\s/g, '') || ''

  const handleCall = () => {
    if (phoneNumber) {
      window.location.href = `tel:${phoneNumber}`
    }
  }

  const handleMap = () => {
    // يمكن تحسين هذا لفتح خرائط جوجل مع العنوان
    const encodedAddress = encodeURIComponent(`${loc.address}, ${loc.governorate}`)
    window.open(`https://maps.google.com/?q=${encodedAddress}`, '_blank')
  }

  return (
    <div
      style={{
        background: '#fff',
        border: '1px solid #e9ecef',
        borderLeft: `4px solid ${accentColor}`,
        borderRadius: '12px',
        padding: '18px 20px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        transition: 'transform 0.2s, box-shadow 0.2s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)'
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)'
      }}
    >
      <div className="d-flex flex-wrap justify-content-between align-items-start gap-2 mb-2">
        <div style={{ flex: 1 }}>
          <div className="fw-bold" style={{ fontSize: '1.1rem', marginBottom: '8px' }}>
            🏥 {loc.name}
          </div>
          
          {loc.address && (
            <div className="text-muted small mt-1" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>📍</span> {loc.address}
            </div>
          )}
          
          {loc.phone && (
            <div className="text-muted small mt-1" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>📞</span> {loc.phone}
            </div>
          )}
          
          {loc.hours && (
            <div className="text-muted small mt-1" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>🕐</span> {loc.hours}
            </div>
          )}
          
          <div className="small mt-2">
            <span
              style={{
                background: lightBg,
                color: accentColor,
                borderRadius: '20px',
                padding: '4px 12px',
                fontWeight: 500,
                fontSize: '0.75rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              🩺 {serviceLabel}
            </span>
          </div>
        </div>
      </div>

      {loc.note && (
        <div
          className="small text-muted mt-3"
          style={{
            background: '#f8f9fa',
            borderRadius: '8px',
            padding: '10px 12px',
            borderLeft: `3px solid ${accentColor}`,
          }}
        >
          <span>ℹ️</span> {loc.note}
        </div>
      )}

      {/* Inquiry Only locations don't show call button (only informational) */}
      {isInquiryOnly ? (
        <div className="mt-3">
          <span
            style={{
              background: '#e9ecef',
              color: '#6c757d',
              borderRadius: '8px',
              padding: '8px 12px',
              fontSize: '0.75rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            ℹ️ For inquiries only · Call for referrals
          </span>
        </div>
      ) : (
        <div className="d-flex gap-2 mt-3">
          {loc.phone && (
            <button
              onClick={handleCall}
              style={{
                background: type === 'animal' ? '#198754' : '#dc3545',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                padding: '10px 20px',
                fontWeight: 600,
                fontSize: '0.875rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = type === 'animal' ? '#146c43' : '#bb2d3b'
                e.currentTarget.style.transform = 'scale(1.02)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = type === 'animal' ? '#198754' : '#dc3545'
                e.currentTarget.style.transform = 'scale(1)'
              }}
            >
              📞 Call Now
            </button>
          )}
          
          <button
            onClick={handleMap}
            style={{
              background: '#fff',
              color: '#333',
              border: '1.5px solid #dee2e6',
              borderRadius: '8px',
              padding: '10px 20px',
              fontWeight: 500,
              fontSize: '0.875rem',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#f8f9fa'
              e.currentTarget.style.borderColor = accentColor
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#fff'
              e.currentTarget.style.borderColor = '#dee2e6'
            }}
          >
            🗺️ View on Map
          </button>
        </div>
      )}
      
    
    </div>
  )
}