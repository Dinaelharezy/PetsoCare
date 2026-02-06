export default function PetDetails({ species, breed, age, licenseNo, diseases }: { species: string, breed: string, age: string, licenseNo: string, diseases: string[] }) {
  return (
    <div className="col-md-8" style={{position:'absolute', left: '+500px'}}>
    <div className="row g-2">
      <div className="col-12">
        <p className="mb-1 text-muted" style={{fontSize: '14px'}}>Species:</p>
        <p className="fw-medium mb-0">{species}</p>
      </div>
      <div className="col-12">
        <p className="mb-1 text-muted" style={{fontSize: '14px'}}>Breed:</p>
        <p className="fw-medium mb-0">{breed}</p>
      </div>
      <div className="col-12">
        <p className="mb-1 text-muted" style={{fontSize: '14px'}}>Age:</p>
        <p className="fw-medium mb-0">{age}</p>
      </div>
      <div className="col-12">
        <p className="mb-1 text-muted" style={{fontSize: '14px'}}>License No:</p>
        <p className="fw-medium mb-0">{licenseNo}</p>
      </div>
      <div className="col-12">
        <p className="mb-2 text-muted" style={{fontSize: '14px'}}>Diseases:</p>
        <div className="d-flex gap-2">
          {diseases.map((disease, index) => (
            <span key={index} className="badge bg-light fw-medium disease">{disease}</span>
          ))}
        </div>
      </div>
    </div>
  </div>
  )
}