// 'use client'

// import { useState } from 'react'
// import { Container } from 'react-bootstrap'
// import MapView from './MapView'
// import CategoryFilters from './CategoryFilters'
// import ClinicDetails from './ClinicDetails'
// import { MapCategories } from '@/data/MapCategories'
// const locations = [
//   {
//     id: 1,
//     name: 'Happy Paws Veterinary Clinic',
//     address: '123 Pet Lane, Port Said, Egypt',
//     hours: 'Mon-Fri: 9 AM - 6 PM, Sat: 10 AM - 4 PM',
//     rating: 4.7,
//     type: 'clinic',
//     position: { top: '45%', left: '35%' },
//     services: ['Emergency', 'Grooming', 'Boarding'],
//     reviews: [
//       {
//         id: 1,
//         name: 'Ahmed Hassan',
//         rating: 5,
//         text: 'Excellent service! The staff are incredibly kind and knowledgeable. My cat always feels comfortable here.'
//       },
//       {
//         id: 2,
//         name: 'Layla Mohamed',
//         rating: 5,
//         text: 'Very professional and caring. Dr. Emad saved my dog\'s life! Highly recommend this clinic.'
//       },
//       {
//         id: 3,
//         name: 'Sara Tarek',
//         rating: 4,
//         text: 'Great clinic, but waiting times can be long sometimes. Overall a positive experience for my parrot.'
//       }
//     ]
//   },
//   {
//     id: 2,
//     name: 'Care Veterinary Clinic',
//     address: '456 Animal Ave, Port Said, Egypt',
//     hours: 'Mon-Sun: 8 AM - 8 PM',
//     rating: 4.5,
//     type: 'clinic',
//     position: { top: '30%', left: '25%' },
//     services: ['Surgery', 'Emergency'],
//     reviews: []
//   },
//   {
//     id: 3,
//     name: 'Port Ismaili Hospital',
//     address: '789 Medical St, Port Said, Egypt',
//     hours: '24/7 Emergency',
//     rating: 4.8,
//     type: 'hospital',
//     position: { top: '25%', left: '55%' },
//     services: ['Emergency', 'Surgery'],
//     reviews: []
//   },
//   {
//     id: 4,
//     name: 'Ether Nikkei',
//     address: '321 Care Rd, Port Said, Egypt',
//     hours: 'Mon-Fri: 10 AM - 5 PM',
//     rating: 4.3,
//     type: 'clinic',
//     position: { top: '27%', left: '45%' },
//     services: ['Grooming', 'Boarding'],
//     reviews: []
//   },
//   {
//     id: 5,
//     name: 'Personal Clinic',
//     address: '654 Pet Blvd, Port Said, Egypt',
//     hours: 'Mon-Sat: 9 AM - 7 PM',
//     rating: 4.6,
//     type: 'clinic',
//     position: { top: '32%', left: '52%' },
//     services: ['Emergency'],
//     reviews: []
//   }
// ]
// const categories = [
//   { id: 'all', label: 'All', type: null },
//   { id: 'clinics', label: 'Clinics', type: 'clinic' },
//   { id: 'hospitals', label: 'Hospitals', type: 'hospital' },
//   { id: 'shelters', label: 'Shelters', type: 'shelter' },
//   { id: 'reports', label: 'Dangerous Reports', type: 'report' }
// ]


// export default function MapPage() {
//   const [activeCategory, setActiveCategory] = useState('all')
//   const [selectedLocation, setSelectedLocation] = useState(locations[0])

//   const filteredLocations = activeCategory === 'all' 
//     ? locations 
//     : locations.filter(loc => loc.type === categories.find(c => c.id === activeCategory)?.type)

//   return (
//     <>
//       <div className="page-header">
//         <Container>
//           <h1 className="page-title">Interactive Map: Find Your Nearest Pet Care</h1>
//         </Container>
//       </div>

//       <Container className="py-4">
//         {/* Map View */}
//         <MapView 
//           locations={filteredLocations}
//           selectedLocation={selectedLocation}
//           onLocationSelect={setSelectedLocation}
//         />

//         {/* Category Filters */}
//         <CategoryFilters
//           categories={categories}
//           activeCategory={activeCategory}
//           onCategoryChange={setActiveCategory}
//         />

//         {/* Clinic Details */}
//         <ClinicDetails location={selectedLocation} />
//       </Container>

//       {/* View Badge */}
//       <div className="view-badge">
//         <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//           <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
//           <circle cx="12" cy="12" r="3"></circle>
//         </svg>
//         You are a viewer
//       </div>
//     </>
//   )
// }