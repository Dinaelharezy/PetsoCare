export default function MedicalRecord({ date, title, description }: { date: string, title: string, description: string }) {
  return (
    <div className="mb-3">
      <div className="body">
        <p className="mb-1" style={{color: 'rgb(139, 195, 74)', fontSize: '14px'}}>📅 {date}</p>
        <h6 className="mb-1">{title}</h6>
        <p className="mb-0 text-muted" style={{fontSize: '14px'}}>{description}</p>
      </div>
    </div>
  )}