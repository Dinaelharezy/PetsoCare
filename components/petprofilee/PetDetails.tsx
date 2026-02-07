export default function PetDetails({ species, breed, age, licenseNo, diseases }: { species: string, breed: string, age: string, licenseNo: string, diseases: string[] }) {
  return (
    <div style={{width: '100%', maxWidth: '600px'}}>
      <div className="d-flex flex-column gap-3 ">
        <div className="">
          <p className="mb-1 text-muted" style={{fontSize: '14px',}}>Species:</p>
          <p className="fw-medium mb-0">{species}</p>
        </div>
        <div>
          <p className="mb-1 text-muted" style={{fontSize: '14px'}}>Breed:</p>
          <p className="fw-medium mb-0">{breed}</p>
        </div>
        <div>
          <p className="mb-1 text-muted" style={{fontSize: '14px'}}>Age:</p>
          <p className="fw-medium mb-0">{age}</p>
        </div>
        <div>
          <p className="mb-1 text-muted" style={{fontSize: '14px'}}>License No:</p>
          <p className="fw-medium mb-0">{licenseNo}</p>
        </div>
        <div>
          <p className="mb-2 text-muted" style={{fontSize: '14px'}}>Diseases:</p>
          <div className="d-flex gap-2 flex-wrap">
            {diseases.map((disease, index) => (
              <span key={index} className="badge bg-light fw-medium disease px-3 py-2">{disease}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}