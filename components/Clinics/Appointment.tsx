// 'use client'

// import { useState, useEffect } from 'react'
// import { useParams, useRouter } from 'next/navigation'
// import { Container, Row, Col, Card, Button, Form, Spinner } from 'react-bootstrap'
// import Image from 'next/image'
// import { vetsApi } from '../../data/api/vet'
// import { Vet } from '../../types/Vet'

//       <div className="section-header mb-3">
//         <h3 style={{ fontSize: '1.5rem', fontWeight: '600' }}>Book an Appointment</h3>
//         <p className="text-muted">Please select time to schedule your appointment. Emergency appointments available upon request.</p>
//       </div>

//       <Card className="p-4 mb-4" style={{ boxShadow: '0 4px 15px rgba(0,0,0,0.08)', borderRadius: '15px', border: 'none' }}>
//         <h5 className="mb-3">Select a Day</h5>
//         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))', gap: '10px', marginBottom: '20px' }}>
//           {weekDays.map((item) => (
//             <div
//               key={item.day}
//               onClick={() => setSelectedDate(item.day)}
//               style={{
//                 padding: '15px', textAlign: 'center', borderRadius: '10px', cursor: 'pointer', transition: 'all 0.3s',
//                 border: selectedDate === item.day ? '2px solid #7CB342' : '2px solid #ddd',
//                 backgroundColor: selectedDate === item.day ? '#f0f8e8' : 'white'
//               }}
//             >
//               <span style={{ display: 'block', fontSize: '0.85rem', color: '#666', marginBottom: '5px' }}>{item.label}</span>
//               <span style={{ display: 'block', fontSize: '1.5rem', fontWeight: '600', color: selectedDate === item.day ? '#7CB342' : '#333' }}>{item.day}</span>
//             </div>
//           ))}
//         </div>
//         <div className="text-center mt-4">
//           <Button onClick={handleConfirmAppointment} style={{ backgroundColor: '#7CB342', border: 'none', padding: '12px 40px', borderRadius: '10px', fontWeight: '500', fontSize: '1rem' }}>
//             Confirm Appointment
//           </Button>
//         </div>
//       </Card> fix this code to be show availbale days and ava hours and date and get them from back end 