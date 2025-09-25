import Index from ".";

const patientData = {
  name: 'Maria Oliveira',
  birth_date: '10/09/1958',
  age: 67,
  sex: 'female',
  school: 'fundamental_completo',
  job: 'Artesã',
  civil_state: 'casado',
  children: 'yes',
  children_number: '2 filhos',
  birth_place: 'São Leopoldo, RS',
  phone: '51981387466',
  postal_code: '',
  state: 'Rio Grande do Sul',
  city: 'São Leopoldo',
  neighborhood: 'Cristo Rei',
  street: 'Av. Unisinos',
  number: '000',
  complement: '',
  main_complain: 'Dores pontuais em joelho direito',
  deasease_history: 'Paciente relata dor progressiva no joelho direito com início há aproximadamente 8 meses. Sem histórico de trauma direto. Refere dores pontuais com piora aos esforços, principalmente ao descer escadas e  levantar-se da cadeira. Paciente refere dor nível 7 na END e que tem impactado na realização de atividades de vida diária (AVDs), como caminhar, agachar, cuidar da casa, praticar exercícios. Relata também episódios de rigidez articular matinal, além de sensação de fraqueza e insegurança ao apoio do membro acometido.',
  diagnosis: 'Osteoporose, diagnosticada através de exame pelo médico ortopedista.',
  simptoms: 'Dores pontuais em joelho direito com piora aos esforços, principalmente ao descer escadas e  levantar-se da cadeira.',
  evolution: 'Os sintomas iniciaram há 8 meses, com piora progressiva.',
  other_characteristics: 'Paciente não realiza atividades físicas e, devido à profissão, passa a maior parte do seu dia sentada.'
}

export default function Anamnese({ params }: any) {
  const { id } = params;

  return (
    <div className="container">
      <Index data={patientData} id={id ? Number(id) : 0} />
    </div>
  );
}
