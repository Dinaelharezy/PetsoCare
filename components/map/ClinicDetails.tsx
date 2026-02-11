// 'use client'

// interface Review {
//   id: number
//   name: string
//   rating: number
//   text: string
// }

// interface Location {
//   id: number
//   name: string
//   address: string
//   hours: string
//   rating: number
//   services: string[]
//   reviews: Review[]
// }

// interface ClinicDetailsProps {
//   location: Location
// }

// export default function ClinicDetails({ location }: ClinicDetailsProps) {
//   const getServiceBadgeClass = (service: string) => {
//     const serviceMap: { [key: string]: string } = {
//       'Emergency': 'emergency',
//       'Grooming': 'grooming',
//       'Boarding': 'boarding',
//       'Surgery': 'surgery'
//     }
//     return serviceMap[service] || 'emergency'
//   }

//   const getInitials = (name: string) => {
//     return name
//       .split(' ')
//       .map(word => word[0])
//       .join('')
//       .toUpperCase()
//       .slice(0, 2)
//   }

//   const renderStars = (rating: number) => {
//     const fullStars = Math.floor(rating)
//     const hasHalfStar = rating % 1 !== 0
//     const emptyStars = 5 - Math.ceil(rating)

//     return (
//       <>
//         {'★'.repeat(fullStars)}
//         {hasHalfStar && '☆'}
//         {'☆'.repeat(emptyStars)}
//       </>
//     )
//   }

//   return (
//     <div className="clinic-details animate-fade-in">
//       <div className="clinic-header">
//         <h2 className="clinic-name">{location.name}</h2>
        
//         <div className="clinic-address">
//           <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//             <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
//             <circle cx="12" cy="10" r="3"></circle>
//           </svg>
//           {location.address}
//         </div>

//         <div className="clinic-hours">
//           <strong>Hours:</strong> {location.hours}
//         </div>

//         <div className="rating-container">
//           <span className="star-rating">{renderStars(location.rating)}</span>
//           <span className="rating-score">{location.rating}</span>
//         </div>
//       </div>

//       {/* Services */}
//       <div className="status-badges">
//         {location.services.map((service, index) => (
//           <span key={index} className={`status-badge ${getServiceBadgeClass(service)}`}>
//             {service}
//           </span>
//         ))}
//       </div>

//       {/* Reviews Section */}
//       {location.reviews.length > 0 && (
//         <div className="reviews-section">
//           <h3 className="section-header">Reviews ({location.reviews.length})</h3>
          
//           {location.reviews.map((review) => (
//             <div key={review.id} className="review-card">
//               <div className="review-header">
//                 <div className="reviewer-avatar">
//                   {getInitials(review.name)}
//                 </div>
//                 <div className="reviewer-info">
//                   <div className="reviewer-name">{review.name}</div>
//                   <div className="review-stars">
//                     {renderStars(review.rating)}
//                   </div>
//                 </div>
//               </div>
//               <p className="review-text">{review.text}</p>
//             </div>
//           ))}

//           <button className="add-review-btn">
//             Add a Review
//           </button>
//         </div>
//       )}
//     </div>
//   )
// }