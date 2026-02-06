'use client'
import 'bootstrap/dist/css/bootstrap.min.css';
import VaccineItem from './VaccineItem';
import MedicalRecord from './MedicalRecord';
import PetDetails from './PetDetails';

export default function AnimalProfile() {
  return (
    <div className="container-fluid mt-5">
      <div className=" mx-auto" style={{maxWidth: '1000px'}}>
        <div className="body p-3">
          {/* Header with title and Edit button */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3 className="mb-0">Buddy's Profile</h3>
            <button className="btn btn-outline btn-sm edit-animal px-4">Edit Pet Details</button>
          </div>

          {/* Profile Section */}
<div className="row g-5 spaceBetweenSections position-relative">
  {/* Left side - Profile Image */}
  <div className="col-md-4  d-flex justify-content-center align-items-center">
    <div className="position-relative ">
      <img 
        src="/dog.png" 
        className="rounded-circle" 
        alt="Buddy" 
        style={{
            marginTop: '20%',
            marginRight: '1em',
          width: '200px', 
          height: '200px', 
          objectFit: 'cover',
          border: '5px solid rgb(199, 242, 167)'
        }}
      />
    </div>
  </div>

  {/* Right side - Pet Details */}
<PetDetails species='Dog' breed='Golden Retriever' age='3 years' licenseNo='GB-2021-001' diseases={['Allergies', 'Anxiety']} />
</div>

       

          {/* Upcoming Vaccines Section */}
          <div className="spaceBetweenSections">
            <h5 className="mb-3">Upcoming Vaccines</h5>
            
            {/* Vaccine Item 1 */}
            <VaccineItem name = 'Rabies' dueDate = '9/15/2024'/>

            {/* Vaccine Item 2 */}
            <VaccineItem name= 'Distemper' dueDate = '9/30/2024'/>

            {/* Vaccine Item 3 */}
           <VaccineItem name = 'Bordetella' dueDate = '10/12/2024'/>
          </div>


          {/* Medical History Section */}
          <div className="spaceBetweenSections">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="mb-0">Medical History</h5>
              <button className="btn btn-sm edit-medicalHist px-4">Add New Record</button>
            </div>
            
            {/* Medical Record 1 */}
           <MedicalRecord date = '12/1/2023' title = 'Annual Check-up' description = 'All vitals normal, recommended regular exercise and balanced diet.' />
            {/* Medical Record 2 */}
           <MedicalRecord date = '5/20/2023' title = 'Allergy Testing' description = 'Tested positive for pollen and dust mites. Prescribed antihistamines.' />
            {/* Medical Record 3 */}
          <MedicalRecord date = '3/15/2023' title = 'Dental Cleaning' description = 'Routine dental cleaning performed. No issues found.' />    
          </div>

      

          {/* Need to see a Vet Section */}
          <div className="text-center py-4">
            <h5 className="mb-2">Need to see a Vet?</h5>
            <p className="text-muted mb-3">Easily book a new appointment with our trusted veterinarians.</p>
            <button className="btn" style={{backgroundColor: 'rgb(199, 242, 167)', border: 'none', padding: '10px 30px'}}>
              Book New Appointment
            </button>
          </div>

     

          {/* Footer */}
          <div className="text-center mt-5">
            <p className="text-muted mb-0" style={{fontSize: '12px'}}>© 2025 Pawsitive Health. All rights reserved.</p>
          </div>
        </div>
      </div>

    </div>
  
  );
}