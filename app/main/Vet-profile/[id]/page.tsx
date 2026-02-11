import DoctorProfile from '../../../../components/DoctorProfile/DoctorProfile';
import DocPage1 from '../../../../components/DoctorProfile/DoctorProfile';
import { vets } from '../../../../data/vets';


export default async function VetProfilePage({ params } :any) {
  const { id } = await params;
  const vet = vets.find(v => v.id === Number(id));

  if (!vet) return <div>Doctor not found</div>;

  return <DoctorProfile vet={vet} />;
}
