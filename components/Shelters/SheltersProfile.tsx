// "use client";

// import { useEffect, useState } from "react";
// import { useParams, useRouter } from "next/navigation";
// import { Shelter } from "@/types/shelter";

// export default function SheltersProfile() {
//   const params = useParams();
//   const router = useRouter();
//   const [shelter, setShelter] = useState<Shelter | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [notFound, setNotFound] = useState(false);

//   useEffect(() => {
//     fetch(`/api/shelters/${params.id}`)
//       .then((res) => {
//           console.log("ID:", params.id)
//         if (res.status === 404) {
//           setNotFound(true);
          
//           return null;
//         }
//         return res.json();
//       })
//       .then((json) => {
//           console.log("API RESPONSE:", json);
//         if (json) setShelter(json);
//       })
//       .finally(() => setLoading(false));
//   }, [params.id]);

//   if (loading) {
//     return (
//       <div className="flex min-h-screen items-center justify-center bg-gray-50">
//         <div className="flex items-center gap-3 text-gray-400">
//           <span className="h-5 w-5 animate-spin rounded-full border-2 border-teal-400 border-t-transparent" />
//           <span className="text-sm">Loading shelter…</span>
//         </div>
//       </div>
//     );
//   }

//   if (notFound || !shelter) {
//     return (
//       <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gray-50 px-4">
//         {/* <p className="text-lg font-semibold text-gray-700">Shelter not found</p> */}
//         <button
//           onClick={() => router.back()}
//         //   className="rounded-xl bg-teal-500 px-5 py-2 text-sm font-medium text-white hover:bg-teal-600 transition-colors"
//         >
//           Go Back
//         </button>
//       </div>
//     );
//   }

//   const animalTypeColor: Record<string, string> = {
//     Dogs: "bg-amber-100 text-amber-700",
//     Cats: "bg-purple-100 text-purple-700",
//     Both: "bg-teal-100 text-teal-700",
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 px-4 py-10">
//       <div className="mx-auto max-w-xl">
//         {/* Back */}
//         <button
//           onClick={() => router.back()}
//           className="mb-6 flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors"
//         >
//           <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
//           </svg>
//           Back to Shelters
//         </button>

//         {/* Card */}
//         <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
//           {/* Title row */}
//           <div className="flex items-start justify-between gap-3 mb-6">
//             <div>
//               <h1 className="text-xl font-bold text-gray-900">{shelter.name}</h1>
//               <p className="text-sm text-gray-400 mt-0.5">{shelter.governorate}</p>
//             </div>
//               {shelter.animalType}
//           </div>

//           {/* Info rows */}
//           <div className="space-y-4 divide-y divide-gray-50">
//             <InfoRow
//               label="Location"
//               value={shelter.address}
//             />
//             <InfoRow
//               label="Capacity"
//               value={shelter.capacity ? `${shelter.capacity} animals` : null}
//             />
//             <InfoRow
//               label="Working Hours"
//               value={shelter.workingHours}
//             />
//           </div>

//           {/* Contact Button */}
//           <div className="mt-6">
//             <button
//               disabled={!shelter.phone}
//               onClick={() => {
//                 if (shelter.phone) {
//                   window.location.href = `tel:${shelter.phone}`;
//                 }
//               }}
//               className="flex w-full items-center justify-center gap-2 rounded-xl bg-teal-500 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-teal-600 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400"
//             >
//               {shelter.phone ? `Call: ${shelter.phone}` : "Contact Not Available"}
//             </button>
//           </div>

//           {/* Status */}
//           <div className="mt-4 flex items-center justify-center gap-1.5 text-xs">
//             <span
//               className={`h-2 w-2 rounded-full ${
//                 shelter.workingHours ? "bg-green-400" : "bg-orange-400"
//               }`}
//             />
//             <span className={shelter.workingHours ? "text-green-600" : "text-orange-500"}>
//               {shelter.workingHours ? "Operational" : "Under Construction"}
//             </span>
//           </div>

//           {/* Additional Notes */}
//           {shelter.notes && (
//             <div className="mt-5 rounded-xl bg-amber-50 border border-amber-100 p-4">
//               <p className="text-xs font-semibold text-amber-700 mb-1">Additional Notes</p>
//               <p className="text-sm text-amber-800 leading-relaxed">{shelter.notes}</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// function InfoRow({
//   label,
//   value,
// }: {
//   label: string;
//   value: string | null | undefined;
// }) {
//   return (
//     <div className="flex items-start gap-3 pt-4 first:pt-0">
//       <div>
//         <p className="text-xs text-gray-400 font-medium mb-0.5">{label}</p>
//         <p className={value ? "text-sm text-gray-800" : "text-sm text-gray-400 italic"}>
//           {value ?? "Not Available"}
//         </p>
//       </div>
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap";
import { Shelter } from "../../types/Shelter";

export default function ShelterProfile() {
  const params = useParams();
  const router = useRouter();

  const [shelter, setShelter] = useState<Shelter | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetch(`/api/shelters/${params.id}`)
      .then((res) => {
        if (res.status === 404) {
          setNotFound(true);
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (data) setShelter(data);
      })
      .finally(() => setLoading(false));
  }, [params.id]);

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