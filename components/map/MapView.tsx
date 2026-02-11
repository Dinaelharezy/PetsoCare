// 'use client'

// interface Location {
//   id: number
//   name: string
//   type: string
//   position: { top: string; left: string }
// }

// interface MapViewProps {
//   locations: Location[]
//   selectedLocation: Location
//   onLocationSelect: (location: Location) => void
// }

// export default function MapView({ locations, selectedLocation, onLocationSelect }: MapViewProps) {
//   return (
//     <div className="map-container">
//       {/* SVG Map Background (simplified Egypt coastline) */}
//       <svg className="map-svg" viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice">
//         {/* Water */}
//         <rect width="800" height="400" fill="#a8d5e2" />
        
//         {/* Land masses */}
//         <path
//           d="M 0 0 L 200 0 L 180 100 L 150 200 L 100 250 L 50 300 L 0 350 Z"
//           fill="#8bb9c9"
//           opacity="0.6"
//         />
        
//         <path
//           d="M 800 400 L 800 0 L 600 0 L 620 100 L 650 200 L 700 250 L 750 300 L 800 350 Z"
//           fill="#8bb9c9"
//           opacity="0.6"
//         />
        
//         <path
//           d="M 200 50 Q 400 80 600 50 L 650 150 Q 400 200 150 150 Z"
//           fill="#6b9baa"
//           opacity="0.4"
//         />
        
//         {/* Simplified coastline decorations */}
//         <circle cx="300" cy="180" r="3" fill="#5a8a9a" opacity="0.5" />
//         <circle cx="500" cy="200" r="3" fill="#5a8a9a" opacity="0.5" />
//         <circle cx="400" cy="220" r="3" fill="#5a8a9a" opacity="0.5" />
//       </svg>

//       {/* Location Markers */}
//       {locations.map((location) => (
//         <div
//           key={location.id}
//           className="map-marker"
//           style={{
//             top: location.position.top,
//             left: location.position.left,
//             transform: 'translate(-50%, -100%)'
//           }}
//           onClick={() => onLocationSelect(location)}
//         >
//           <div className="marker-pin">
//             <span className="marker-icon">
//               {location.type === 'hospital' ? '🏥' : location.type === 'shelter' ? '🏠' : '🏥'}
//             </span>
//           </div>
//           <div className="marker-label">{location.name}</div>
//         </div>
//       ))}
//     </div>
//   )
// }