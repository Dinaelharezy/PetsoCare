

"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap";
import { Shelter } from "../../types/Shelter";
import { useAppStore } from '../../store/Appstore'
import { apiUrl } from "@/lib/api";

export default function ShelterProfile() {
  const params = useParams();
  const router = useRouter();

  const [shelter, setShelter] = useState<Shelter | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
const { getShelterProfile, setShelterProfile } = useAppStore()


useEffect(() => {
  const cachedShelter = getShelterProfile(params.id as string)

  if (cachedShelter) {
    setShelter(cachedShelter)
    setLoading(false)
    return
  }

  fetch(apiUrl(`shelters/${params.id}`))
    .then((res) => {
      if (res.status === 404) {
        setNotFound(true)
        return null
      }

      return res.json()
    })
    .then((data) => {
      if (data) {
        setShelter(data)

        setShelterProfile(
          params.id as string,
          data
        )
      }
    })
    .finally(() => setLoading(false))
}, [params.id])


  // ── Loading ─────────────────────────────────────────────
  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" />
        <p className="mt-3 text-muted">Loading shelter profile...</p>
      </Container>
    );
  }

  // ── Not Found ───────────────────────────────────────────
  if (notFound || !shelter) {
    return (
      <Container className="py-5 text-center">
        <h4 className="text-muted">Shelter not found</h4>
        <Button className="mt-3" onClick={() => router.back()}>
          Go Back
        </Button>
      </Container>
    );
  }

  const getTypeColor = (type?: string) => {
    switch (type) {
      case "Dogs":
        return "text-warning";
      case "Cats":
        return "text-info";
      case "Both":
        return "text-success";
      default:
        return "text-muted";
    }
  };

  return (
    <Container className="py-5">

      {/* ── Shelter Profile Card ───────────────────────────── */}
      <Card
        className="p-5 mb-4"
        style={{
          boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
          borderRadius: "15px",
          border: "none",
        }}
      >
        <Row>
          {/* Left side (icon / image placeholder) */}
          <Col md={2}>
            <div
              style={{
                width: "100%",
                height: "160px",
                borderRadius: "12px",
                background: "#f8f9fa",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <i
                className="bi bi-house-heart text-secondary"
                style={{ fontSize: "3rem" }}
              />
            </div>
          </Col>

          {/* Right side */}
          <Col md={10}>
            <div className="d-flex justify-content-between align-items-start mb-3">
              <div>
                <h2 className="mb-1">{shelter.name}</h2>
                <p className="text-muted mb-1">{shelter.governorate}</p>

                <p className={`mb-0 fw-semibold ${getTypeColor(shelter.animalType)}`}>
                  {shelter.animalType || "Not specified"}
                </p>
              </div>

              <div className="text-end">
                {shelter.capacity && (
                  <p className="mb-1">
                    <i className="bi bi-collection me-1 text-success"></i>
                    <strong>{shelter.capacity}</strong> animals
                  </p>
                )}

                <p className="mb-0">
                  <i className="bi bi-geo-alt-fill text-success me-1"></i>
                  {shelter.governorate}
                </p>
              </div>
            </div>

            {/* Contact info row */}
            <div className="d-flex flex-wrap gap-3 text-muted">
              {shelter.phone && (
                <span>
                  <i className="bi bi-telephone me-1"></i>
                  {shelter.phone}
                </span>
              )}

              {shelter.address && (
                <span>
                  <i className="bi bi-map me-1"></i>
                  {shelter.address}
                </span>
              )}

              {shelter.workingHours && (
                <span>
                  <i className="bi bi-clock me-1"></i>
                  {shelter.workingHours}
                </span>
              )}
            </div>
          </Col>
        </Row>
      </Card>

      {/* ── Details Card ───────────────────────────────────── */}
      <Card
        className="p-4"
        style={{
          boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
          borderRadius: "15px",
          border: "none",
        }}
      >
        <h5 className="mb-3">Additional Information</h5>

        <Row className="gy-3">
          <Col md={6}>
            <p className="text-muted mb-1">Location</p>
            <p>{shelter.address || "Not Available"}</p>
          </Col>

          <Col md={6}>
            <p className="text-muted mb-1">Working Hours</p>
            <p>{shelter.workingHours || "Not Available"}</p>
          </Col>

          <Col md={12}>
            <p className="text-muted mb-1">Status</p>
            <p>
              <span
                className={`me-2 ${
                  shelter.workingHours ? "text-success" : "text-warning"
                }`}
              >
                ●
              </span>
              {shelter.workingHours ? "Operational" : "Under Construction"}
            </p>
          </Col>

          {shelter.notes && (
            <Col md={12}>
              <div
                className="p-3 bg-light rounded"
                style={{ border: "1px solid #eee" }}
              >
                <p className="mb-1 fw-semibold">Notes</p>
                <p className="mb-0 text-muted">{shelter.notes}</p>
              </div>
            </Col>
          )}
        </Row>

        {/* Back Button */}
        <div className="text-center mt-4">
          <Button variant="primary" onClick={() => router.back()}>
            Back to Shelters
          </Button>
        </div>
      </Card>
    </Container>
  );
}