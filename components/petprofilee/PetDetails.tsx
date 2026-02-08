export default function PetDetails({ species, breed, age, licenseNo, diseases }: { species: string, breed: string, age: string, licenseNo: string, diseases: string[] }) {
  return (
    <div style={{width: '100%', maxWidth: '600px'}}>
      <div className="d-flex flex-column gap-3 ">
        <div className="">
          <p className="mb-1 text-muted" style={{fontSize: '14px',}}>Species:  <span className="fw-bold mb-0">{species}</span></p>
  
        </div>
        <div> 
          <p className="mb-1 text-muted" style={{fontSize: '14px'}}>Breed:  <span className="fw-bold mb-0">{breed}</span></p>
         
        </div>
        <div>
          <p className="mb-1 text-muted" style={{fontSize: '14px'}}>Age:  <span className="fw-bold mb-0">{age}</span></p>
        </div>
        <div>
          <p className="mb-1 text-muted" style={{fontSize: '14px'}}>License No: <span className="fw-bold mb-0">{licenseNo}</span></p>
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