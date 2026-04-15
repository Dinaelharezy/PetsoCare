

// 'use client';

// import { useEffect, useState } from 'react';
// import { Container, Row, Col, Card, Button, Modal, Form, Badge, Alert } from 'react-bootstrap';
// import { Shelter, CreateShelterDto, AnimalType } from '../../types/shelter';

// const GOVERNORATES = [
//   "Port Said", "Cairo", "Alexandria", "Giza", "Luxor",
//   "Aswan", "Mansoura", "Tanta", "Zagazig", "Ismailia",
// ];

// const EMPTY_FORM: CreateShelterDto = {
//   name: "",
//   location: "",
//   animalType: "Dogs",
//   capacity: null,
//   contactNumber: "",
//   workingHours: "",
//   additionalNotes: "",
//   governorate: "",
//   isOperational: false,
// };

// export default function DashboardSheltersClient() {
//   const [shelters, setShelters] = useState<Shelter[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [showModal, setShowModal] = useState(false);
//   const [editingShelter, setEditingShelter] = useState<Shelter | null>(null);
//   const [successMessage, setSuccessMessage] = useState('');
//   const [form, setForm] = useState<CreateShelterDto>(EMPTY_FORM);
//   const [submitting, setSubmitting] = useState(false);

//   const fetchShelters = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch("/api/shelters");
//       const json = await response.json();
//       setShelters(json.data ?? []);
//     } catch (error) {
//       console.error('Failed to load shelters:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchShelters();
//   }, []);

//   const handleShowModal = (shelter?: Shelter) => {
//     if (shelter) {
//       setEditingShelter(shelter);
//       setForm({
//         name: shelter.name,
//         location: shelter.address ?? "",
//         animalType: shelter.animalType as AnimalType,
//         capacity: shelter.capacity ? parseInt(shelter.capacity) : null,
//         contactNumber: shelter.phone ?? "",
//         workingHours: shelter.workingHours ?? "",
//         additionalNotes: shelter.notes ?? "",
//         governorate: shelter.governorate,
//         isOperational: false, // Default since backend doesn't have this field
//       });
//     } else {
//       setEditingShelter(null);
//       setForm(EMPTY_FORM);
//     }
//     setShowModal(true);
//   };

//   const handleCloseModal = () => {
//     setShowModal(false);
//     setEditingShelter(null);
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setForm({ ...form, [name]: value });
//   };
// const handleSubmit = async (e: React.FormEvent) => {
//   e.preventDefault();
//   setSubmitting(true);

//   const url = editingShelter
//     ? `/api/dashboard/shelters/${editingShelter.id}`
//     : "/api/dashboard/shelters";

//   const method = editingShelter ? "PUT" : "POST";

//   const payload = {
//     name: form.name,
//     governorate: form.governorate,
//     location: form.location,
//     animalType: form.animalType,
//     capacity: form.capacity,
//     contactNumber: form.contactNumber,
//     workingHours: form.workingHours,
//     additionalNotes: form.additionalNotes,
//   };

//   try {
//     const response = await fetch(url, {
//       method,
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(payload),
//     });

//     if (!response.ok) {
//       const err = await response.text();
//       console.error("API ERROR:", err);
//       throw new Error("Failed");
//     }

//     setSuccessMessage(
//       editingShelter
//         ? "Shelter updated successfully!"
//         : "Shelter added successfully!"
//     );

//     await fetchShelters();
//     handleCloseModal();

//     setTimeout(() => setSuccessMessage(""), 3000);
//   } catch (error) {
//     console.error(error);
//     alert("Failed to save shelter");
//   } finally {
//     setSubmitting(false);
//   }
// };
//   // const handleSubmit = async (e: React.FormEvent) => {
//   //   e.preventDefault();
//   //   setSubmitting(true);
    
//   //   const url = editingShelter
//   //     ? `/api/dashboard/shelters/${editingShelter.id}`
//   //     : "/api/dashboard/shelters";
//   //   const method = editingShelter ? "PUT" : "POST";

//   //   try {
//   //     const response = await fetch(url, {
//   //       method,
//   //       headers: { "Content-Type": "application/json" },
//   //       body: JSON.stringify(form),
//   //     });
      
//   //     if (response.ok) {
//   //       setSuccessMessage(editingShelter ? 'Shelter updated successfully!' : 'Shelter added successfully!');
//   //       await fetchShelters();
//   //       handleCloseModal();
//   //       setTimeout(() => setSuccessMessage(''), 3000);
//   //     } else {
//   //       throw new Error('Failed to save shelter');
//   //     }
//   //   } catch (error) {
//   //     console.error('Error saving shelter:', error);
//   //     alert('Failed to save shelter.');
//   //   } finally {
//   //     setSubmitting(false);
//   //   }
//   // };

//   const handleDelete = async (id: string) => {
//     if (window.confirm('Are you sure you want to delete this shelter?')) {
//       try {
//         const response = await fetch(`/api/dashboard/shelters/${id}`, { method: "DELETE" });
//         if (response.ok) {
//           setSuccessMessage('Shelter deleted successfully!');
//           await fetchShelters();
//           setTimeout(() => setSuccessMessage(''), 3000);
//         }
//       } catch (error) {
//         console.error('Error deleting shelter:', error);
//       }
//     }
//   };

//   if (loading) {
//     return (
//       <Container className="py-5 text-center">
//         <div className="spinner-border text-primary" role="status"></div>
//       </Container>
//     );
//   }

//   return (
//     <Container fluid className="px-4 py-4">
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h1 className="page-title">Shelter Management</h1>
//         <Button className="color-for-app" onClick={() => handleShowModal()}>
//           <i className="bi bi-plus-circle me-2"></i>Add New Shelter
//         </Button>
//       </div>

//       {successMessage && (
//         <Alert variant="success" dismissible onClose={() => setSuccessMessage('')}>
//           {successMessage}
//         </Alert>
//       )}

//       <Row className="g-4">
//         {shelters.map((shelter) => (
//           <Col lg={4} md={6} key={shelter.id}>
//             <Card className="h-100">
//               <div style={{ height: '180px', overflow: 'hidden', position: 'relative', background: '#f8f9fa' }}>
//                 <div className="d-flex align-items-center justify-content-center h-100">
//                   <i className="bi bi-building text-secondary" style={{ fontSize: '4rem' }}></i>
//                 </div>
//               </div>

//               <Card.Body>
//                 <h5 className="mb-2">{shelter.name}</h5>
                
//                 <p className="text-muted mb-1">
//                   <i className="bi bi-geo-alt me-1"></i>{shelter.address || 'Address not provided'}
//                 </p>
//                 <p className="text-muted mb-1">
//                   <i className="bi bi-map me-1"></i>{shelter.governorate}
//                 </p>
//                 <p className="text-muted mb-1">
//                   <i className="bi bi-telephone me-1"></i>{shelter.phone || 'Not available'}
//                 </p>
//                 <p className="text-muted mb-1">
//                   <i className="bi bi-clock me-1"></i>{shelter.workingHours || 'Not specified'}
//                 </p>
//                 <p className="text-muted mb-3">
//                   <Badge bg="info" className="me-1">{shelter.animalType}</Badge>
//                   {shelter.capacity && (
//                     <Badge bg="secondary">Capacity: {shelter.capacity}</Badge>
//                   )}
//                 </p>

//                 <div className="d-flex gap-2 flex-wrap">
//                   <Button variant="outline-primary" size="sm" onClick={() => handleShowModal(shelter)}>
//                     <i className="bi bi-pencil me-1"></i>Edit
//                   </Button>
//                   <Button variant="outline-danger" size="sm" onClick={() => handleDelete(shelter.id)}>
//                     <i className="bi bi-trash me-1"></i>Delete
//                   </Button>
//                 </div>
//               </Card.Body>
//             </Card>
//           </Col>
//         ))}

//         {shelters.length === 0 && (
//           <Col>
//             <Card>
//               <Card.Body className="text-center text-muted py-5">
//                 <i className="bi bi-building-x" style={{ fontSize: '48px' }}></i>
//                 <p className="mt-3">No shelters found. Add your first shelter!</p>
//               </Card.Body>
//             </Card>
//           </Col>
//         )}
//       </Row>

//       <Modal show={showModal} onHide={handleCloseModal} size="lg" scrollable>
//         <Modal.Header closeButton>
//           <Modal.Title>{editingShelter ? 'Edit Shelter' : 'Add New Shelter'}</Modal.Title>
//         </Modal.Header>
//         <Form onSubmit={handleSubmit}>
//           <Modal.Body>
//             <Row>
//               <Col md={6}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Shelter Name *</Form.Label>
//                   <Form.Control
//                     type="text" 
//                     name="name" 
//                     value={form.name}
//                     onChange={handleInputChange} 
//                     placeholder="Shelter Name" 
//                     required
//                   />
//                 </Form.Group>
//               </Col>
//               <Col md={6}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Phone Number</Form.Label>
//                   <Form.Control
//                     type="tel" 
//                     name="contactNumber" 
//                     value={form.contactNumber || ''}
//                     onChange={handleInputChange} 
//                     placeholder="+20 XXX XXX XXXX"
//                   />
//                 </Form.Group>
//               </Col>
//             </Row>

//             <Row>
//               <Col md={6}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Address *</Form.Label>
//                   <Form.Control
//                     type="text" 
//                     name="location" 
//                     value={form.location || ''}
//                     onChange={handleInputChange} 
//                     placeholder="Street, Area" 
//                     required
//                   />
//                 </Form.Group>
//               </Col>
//               <Col md={6}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Governorate *</Form.Label>
//                   <Form.Select 
//                     name="governorate" 
//                     value={form.governorate} 
//                     onChange={handleInputChange} 
//                     required
//                   >
//                     <option value="">Select governorate</option>
//                     {GOVERNORATES.map(gov => <option key={gov} value={gov}>{gov}</option>)}
//                   </Form.Select>
//                 </Form.Group>
//               </Col>
//             </Row>

//             <Row>
//               <Col md={6}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Animal Type *</Form.Label>
//                   <Form.Select 
//                     name="animalType" 
//                     value={form.animalType} 
//                     onChange={handleInputChange} 
//                     required
//                   >
//                     <option value="Dogs">Dogs</option>
//                     <option value="Cats">Cats</option>
//                     <option value="Both">Both</option>
//                   </Form.Select>
//                 </Form.Group>
//               </Col>
//               <Col md={6}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Capacity</Form.Label>
//                   <Form.Control
//                     type="number" 
//                     name="capacity" 
//                     value={form.capacity || ''}
//                     onChange={(e) => setForm({ ...form, capacity: e.target.value ? Number(e.target.value) : null })}
//                     placeholder="e.g. 50" 
//                     min="0"
//                   />
//                 </Form.Group>
//               </Col>
//             </Row>

//             <Row>
//               <Col md={6}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Working Hours</Form.Label>
//                   <Form.Control
//                     type="text" 
//                     name="workingHours" 
//                     value={form.workingHours || ''}
//                     onChange={handleInputChange} 
//                     placeholder="e.g. 9:00 AM - 5:00 PM"
//                   />
//                 </Form.Group>
//               </Col>
//               <Col md={6}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Status</Form.Label>
//                   <Form.Select 
//                     name="isOperational" 
//                     value={form.isOperational ? "true" : "false"} 
//                     onChange={(e) => setForm({ ...form, isOperational: e.target.value === "true" })}
//                   >
//                     <option value="true">Operational</option>
//                     <option value="false">Under Construction</option>
//                   </Form.Select>
//                 </Form.Group>
//               </Col>
//             </Row>

//             <Form.Group className="mb-3">
//               <Form.Label>Additional Notes</Form.Label>
//               <Form.Control
//                 as="textarea" 
//                 rows={2} 
//                 name="additionalNotes" 
//                 value={form.additionalNotes || ''}
//                 onChange={handleInputChange} 
//                 placeholder="Any additional information about the shelter..."
//               />
//             </Form.Group>
//           </Modal.Body>

//           <Modal.Footer>
//             <Button variant="secondary" onClick={handleCloseModal}>Cancel</Button>
//             <Button 
//               type="submit" 
//               className="btn-primary-green" 
//               disabled={submitting || !form.name || !form.governorate}
//             >
//               {submitting ? "Saving..." : (editingShelter ? 'Update Shelter' : 'Add Shelter')}
//             </Button>
//           </Modal.Footer>
//         </Form>
//       </Modal>
//     </Container>
//   );
// }

'use client';

import { useEffect, useState } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Form,
  Badge,
  Alert
} from 'react-bootstrap';

import { Shelter, AnimalType } from '../../types/shelter';

const GOVERNORATES = [
  "Port Said", "Cairo", "Alexandria", "Giza", "Luxor",
  "Aswan", "Mansoura", "Tanta", "Zagazig", "Ismailia",
];
const EMPTY_FORM: Shelter = {
  id: "",
  name: "",
  governorate: "",
  address: "",
  animalType: "Dogs",
  capacity: "",
  phone: "",
  workingHours: "",
  notes: "",
};
export default function DashboardSheltersClient() {
  const [shelters, setShelters] = useState<Shelter[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingShelter, setEditingShelter] = useState<Shelter | null>(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [form, setForm] = useState<Shelter>(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);

  const fetchShelters = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/shelters");
      const json = await res.json();
      setShelters(json.data ?? json);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShelters();
  }, []);

  const handleShowModal = (shelter?: Shelter) => {
    if (shelter) {
      setEditingShelter(shelter);
     setForm({
  id: shelter.id,
  name: shelter.name,
  address: shelter.address ?? "",
  animalType: shelter.animalType,
  capacity: shelter.capacity ?? "",
  phone: shelter.phone ?? "",
  workingHours: shelter.workingHours ?? "",
  notes: shelter.notes ?? "",
  governorate: shelter.governorate,
});
    } else {
      setEditingShelter(null);
      setForm(EMPTY_FORM);
    }

    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingShelter(null);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  // ✅ FIXED PAYLOAD (THIS IS THE IMPORTANT PART)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const url = editingShelter
      ? `/api/dashboard/shelters/${editingShelter.id}`
      : "/api/dashboard/shelters";

    const method = editingShelter ? "PUT" : "POST";

    const payload = {
      name: form.name,
      governorate: form.governorate,
      address: form.address,            // ✅ FIXED
      animalType: form.animalType,
      capacity: form.capacity,
      phone: form.phone,         // ✅ FIXED
      workingHours: form.workingHours,
      notes: form.notes,       // ✅ FIXED
    };

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.text();
        console.error("API ERROR:", err);
        throw new Error("Request failed");
      }

      setSuccessMessage(
        editingShelter
          ? "Shelter updated successfully!"
          : "Shelter added successfully!"
      );

      await fetchShelters();
      handleCloseModal();
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      console.error(err);
      alert("Failed to save shelter");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;

    await fetch(`/api/dashboard/shelters/${id}`, {
      method: "DELETE",
    });

    await fetchShelters();
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <div className="spinner-border" />
      </Container>
    );
  }

  return (
    <Container fluid className="px-4 py-4">
      <div className="d-flex justify-content-between mb-4">
        <h1>Shelters</h1>

        <Button onClick={() => handleShowModal()}>
          Add Shelter
        </Button>
      </div>

      {successMessage && (
        <Alert variant="success">{successMessage}</Alert>
      )}

      <Row className="g-3">
        {shelters.map(s => (
          <Col md={4} key={s.id}>
            <Card>
              <Card.Body>
                <h5>{s.name}</h5>
                <p>{s.address}</p>

                <Badge bg="info">{s.animalType}</Badge>

                <div className="mt-3 d-flex gap-2">
                  <Button size="sm" onClick={() => handleShowModal(s)}>
                    Edit
                  </Button>
                  <Button size="sm" variant="danger" onClick={() => handleDelete(s.id)}>
                    Delete
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* MODAL */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>
              {editingShelter ? "Edit" : "Add"} Shelter
            </Modal.Title>
          </Modal.Header>
<Modal.Body>
  <Form.Group className="mb-2">
    <Form.Label>Name</Form.Label>
    <Form.Control
      name="name"
      value={form.name}
      onChange={handleInputChange}
    />
  </Form.Group>

  <Form.Group className="mb-2">
    <Form.Label>Address</Form.Label>
    <Form.Control
      name="address"
      value={form.address}
      onChange={handleInputChange}
    />
  </Form.Group>

  <Form.Group className="mb-2">
    <Form.Label>Governorate</Form.Label>
    <Form.Select
      name="governorate"
      value={form.governorate}
      onChange={handleInputChange}
    >
      <option value="">Select</option>
      {GOVERNORATES.map(g => (
        <option key={g} value={g}>{g}</option>
      ))}
    </Form.Select>
  </Form.Group>

  <Form.Group className="mb-2">
    <Form.Label>Animal Type</Form.Label>
    <Form.Select
      name="animalType"
      value={form.animalType}
      onChange={handleInputChange}
    >
      <option value="Dogs">Dogs</option>
      <option value="Cats">Cats</option>
      <option value="Both">Both</option>
    </Form.Select>
  </Form.Group>

  <Form.Group className="mb-2">
    <Form.Label>Capacity</Form.Label>
    <Form.Control
      name="capacity"
      value={form.capacity}
      onChange={handleInputChange}
    />
  </Form.Group>

  <Form.Group className="mb-2">
    <Form.Label>Phone</Form.Label>
    <Form.Control
      name="phone"
      value={form.phone}
      onChange={handleInputChange}
    />
  </Form.Group>

  <Form.Group className="mb-2">
    <Form.Label>Working Hours</Form.Label>
    <Form.Control
      name="workingHours"
      value={form.workingHours}
      onChange={handleInputChange}
    />
  </Form.Group>

  <Form.Group className="mb-2">
    <Form.Label>Notes</Form.Label>
    <Form.Control
      as="textarea"
      rows={2}
      name="notes"
      value={form.notes}
      onChange={handleInputChange}
    />
  </Form.Group>
</Modal.Body>
          {/* <Modal.Body>
            <Form.Group className="mb-2">
              <Form.Label>Name</Form.Label>
              <Form.Control
                name="name"
                value={form.name}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Address</Form.Label>
              <Form.Control
                name="location"
                value={form.address }
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Governorate</Form.Label>
              <Form.Select
                name="governorate"
                value={form.governorate}
                onChange={handleInputChange}
              >
                <option value="">Select</option>
                {GOVERNORATES.map(g => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Modal.Body> */}

          <Modal.Footer>
            <Button onClick={handleCloseModal}>Cancel</Button>
            <Button type="submit" disabled={submitting}>
              {submitting ? "Saving..." : "Save"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
}