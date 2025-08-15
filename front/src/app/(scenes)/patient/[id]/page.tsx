import { patientsList } from "@/utils/services/api";
import Index from ".";

interface Props {
  params: {
    id: number
  }
}

const getPatient = async (id: number) => {
  const patient = patientsList.find(patient => patient.id === id)
  return patient
}

export default async function PatientList({ params }: Props) {
  const { id } = params
  const patient = await getPatient(Number(id))

  if (!patient) return
  return (
    <div className="d-flex flex-column">
      <Index patient={patient} />
    </div>
  );
}
