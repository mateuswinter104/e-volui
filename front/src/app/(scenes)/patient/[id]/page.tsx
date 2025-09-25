import { patientsList } from "@/utils/services/api";
import Index from ".";

const getPatient = (id: number) => {
  return patientsList.find(patient => patient.id === id);
}

export default function PatientList({ params }: any) {
  const { id } = params;
  const patient = getPatient(Number(id));

  if (!patient) return <div>Paciente não encontrado</div>;

  return (
    <div className="container">
      <Index patient={patient} />
    </div>
  );
}
