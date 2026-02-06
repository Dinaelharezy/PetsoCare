export default function VaccineItem({ name, dueDate }: { name: string, dueDate: string }) {
  return (
 <div className="d-flex justify-content-between align-items-center  mt-4 mb-3 p-3" >
              <div>
                <h6 className="mb-1">{name}</h6>
                <p className="mb-0 text-muted" style={{fontSize: '14px'}}>Due: {dueDate}</p>
              </div>
              <button className="btn btn-md vac-button mx-3 px-3" style={{backgroundColor: 'rgb(199, 242, 167)', border: 'none'}}>
                Mark Completed
              </button>
            </div>
  )}