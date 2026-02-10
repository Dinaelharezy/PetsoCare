'use client'
import { Container, Row, Col } from 'react-bootstrap'
import AddVaccineForm from '../../components/Vaccine/VaccineForm'
import VaccineCalendar from '../../components/Vaccine/VaccineCalendar'
import VaccineList from '../../components/Vaccine/VaccineList'
import { FiMessageCircle } from 'react-icons/fi'
import useVaccineSchedule from '../../hooks/useVaccineSchedule'
import { Vaccine } from '../../types/Vaccine'

export default function VaccineClient() {
  const {
    vaccines,
    addVaccine,
    deleteVaccine,
    toggleComplete,
    editVaccine,
    upcomingVaccines,
    completedVaccines
  } = useVaccineSchedule();

  return (
    <div className="app-container">
      <header className="page-header">
        <h1 className="page-title">Your Pet&apos;s Vaccine Schedule</h1>
        <p className="page-subtitle">Effortlessly manage all their immunization needs.</p>
      </header>

      <Container fluid className="px-0">
        <Row className="g-4 mb-4">
          <Col lg={4}>
            <AddVaccineForm onAddVaccine={addVaccine} />
          </Col>
          <Col lg={8}>
            <VaccineCalendar vaccines={vaccines} />
          </Col>
        </Row>

        <Row className="g-4">
          <Col xs={12}>
            <VaccineList
              title="Upcoming Vaccines"
              vaccines={upcomingVaccines}
              onDelete={deleteVaccine}
              onToggleComplete={toggleComplete}
              onEdit={editVaccine}
            />
          </Col>
          <Col xs={12}>
            <VaccineList
              title="Completed Vaccines"
              vaccines={completedVaccines}
              onDelete={deleteVaccine}
              onToggleComplete={toggleComplete}
              onEdit={editVaccine}
            />
          </Col>
        </Row>
      </Container>

      <button className="fab-button" aria-label="Help">
        <FiMessageCircle />
      </button>
    </div>
  )
}