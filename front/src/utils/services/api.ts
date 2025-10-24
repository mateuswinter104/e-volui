import { StaticImageData } from "next/image";

export interface TestProps {
  id: number;
  code: string;
  name: string;
  objective: string;
  description: string;
  result: string;
  image?: StaticImageData
}
export interface Test {
  id: number
  name: string
  code: string
  created_at: string
  result: number
}

export interface Patient {
  id: number
  name: string
  age: number
  sex: "Feminino" | "Masculino"
  diagnosis: string
  tests: Test[]
}

export interface PatientData {
  name: string
  birth_date: string
  age: number | null
  sex: string
  school: string
  job: string
  civil_state: string
  children: string
  birth_place: string
  phone: string
  postal_code?: string
  state: string
  city: string
  neighborhood: string
  street: string
  number: string
  main_complain: string
  deasease_history: string
  diagnosis: string
  simptoms: string
  risk_events: string
  medicine: string
  evolution: string
  other_characteristics: string
  children_number?: string
  complement?: string
}



export const functionalTests: TestProps[] = [
  {
    id: 1,
    code: "TUG",
    name: "Timed Up and Go",
    objective: "Avaliar o equilíbrio dinâmico",
    description:
      "Solicita-se que o paciente levante-se de uma cadeira, caminhe 3 metros, vire, retorne e sente-se novamente na mesma cadeira. O tempo para completar a tarefa é cronometrado.",
    result:
      "O resultado final é obtido em segundos através da média das duas últimas tentativas",
  },
  {
    id: 3,
    code: "FRT",
    name: "Functional Reach Test",
    objective: "Avaliar o equilíbrio durante a inclinação",
    description:
      "Solicita-se que o paciente se posicione ao lado de uma parede com os ombros flexionados em 90° e cotovelos estendidos. O paciente deve inclinar o tronco para frente mantendo os braços estendidos e sem tirar o calcanhar do chão. Mede-se a distância entre a marca inicial e a marca que o paciente alcançou.",
    result: "O resultado final é obtido através da média de três tentativas.",
  },
  {
    id: 4,
    code: "TST",
    name: "Tandem Stand Test",
    objective: "Avaliar o equilíbrio em linha",
    description:
      "Solicita-se que o paciente posicione um pé à frente do outro, encostando o calcanhar do pé à frente nos dedos do pé de trás, e permaneça nessa posição o máximo de tempo possível (até 10 segundos).",
    result: "O resultado final é obtido através da média de três tentativas.",
  },
  {
    id: 5,
    code: "TSL5",
    name: "Teste Senta e Levanta 5 (cinco) vezes",
    objective: "Avaliar o nível do mobilidade",
    description:
      "Avalia força e resistência dos membros inferiores, medindo o tempo necessário para sentar e levantar da cadeira cinco vezes consecutivas, sem uso dos braços.",
    result:
      "O resultado final é obtido através do menor tempo entre duas tentativas.",
  },
  {
    id: 7,
    code: "FMPP",
    name: "Força Máxima de Preensão Palmar",
    objective: "Avaliar força muscular",
    description:
      "Solicita-se que o paciente se posicione em uma cadeira com as costas e braços apoiados, cotovelo flexionado a 90° e realize a maior força de preensão possível na alça de um dinamômetro de preensão palmar.",
    result:
      "O resultado final é obtido através da quantidade de força que o paciente deposita no aparelho.",
  },
  {
    id: 8,
    code: "MEEM",
    name: "Mini-Mental",
    objective: "Avaliar a capacidade cognitiva",
    description:
      `Consiste no preenchimento de questões que envolvem
      (1) orientação do paciente, questionando o ano, estação, dia/semana, dia/mês e mês
      (2) capacidade de registro, solicitando que o paciente repita as palavras “pente, rua e azul”
      (3) atenção e cálculo, solicitando que o paciente realize um cálculo de subtração cinco vezes
      (4) evocação, solicitando que o paciente repita as palavras pronunciadas na etapa de “capacidade de registro”
      e (5) linguagem, solicitando que o paciente identifique objetos, repita uma frase, siga um comando de três estágios, leia, escreva e copie um desenho.`,
    result:
      "O resultado final é obtido através da soma da pontuação que o paciente adquiriu em cada uma das etapas, sendo 30 a pontuação máxima.",
  },
];

export const tests: Test[] = [
  // TSL 5
  { id: 1, name: 'TSL5', code: 'TSL5', created_at: '2025-06-17', result: 25 },
  { id: 2, name: 'TSL5', code: 'TSL5', created_at: '2025-07-01', result: 22 },
  { id: 3, name: 'TSL5', code: 'TSL5', created_at: '2025-07-15', result: 22 },
  { id: 4, name: 'TSL5', code: 'TSL5', created_at: '2025-07-29', result: 20 },
  { id: 5, name: 'TSL5', code: 'TSL5', created_at: '2025-08-12', result: 18 },

  // TST (unificado com máximo 5 resultados)
  { id: 6, name: 'TST', code: 'TST', created_at: '2025-06-17', result: 7 },
  { id: 7, name: 'TST', code: 'TST', created_at: '2025-07-01', result: 8 },
  { id: 8, name: 'TST', code: 'TST', created_at: '2025-07-15', result: 10 },

  // FRT
  { id: 9, name: 'FRT', code: 'FRT', created_at: '2025-06-17', result: 14 },
  { id: 10, name: 'FRT', code: 'FRT', created_at: '2025-07-01', result: 18 },
  { id: 11, name: 'FRT', code: 'FRT', created_at: '2025-07-15', result: 22 },
  { id: 12, name: 'FRT', code: 'FRT', created_at: '2025-07-29', result: 26 },
  { id: 13, name: 'FRT', code: 'FRT', created_at: '2025-08-12', result: 26 },

  // MEEM
  { id: 14, name: 'MEEM', code: 'MEEM', created_at: '2025-06-17', result: 24 },
  { id: 15, name: 'MEEM', code: 'MEEM', created_at: '2025-08-12', result: 27 },

  // FMPP
  { id: 16, name: 'FMPP', code: 'FMPP', created_at: '2025-06-17', result: 14.7 },
  { id: 17, name: 'FMPP', code: 'FMPP', created_at: '2025-07-01', result: 15.2 },
  { id: 18, name: 'FMPP', code: 'FMPP', created_at: '2025-07-15', result: 16.8 },
  { id: 19, name: 'FMPP', code: 'FMPP', created_at: '2025-07-29', result: 18.6 },
  { id: 20, name: 'FMPP', code: 'FMPP', created_at: '2025-08-12', result: 20.1 },

  // TUG
  { id: 21, name: 'TUG', code: 'TUG', created_at: '2025-06-17', result: 17.8 },
  { id: 22, name: 'TUG', code: 'TUG', created_at: '2025-07-01', result: 16.5 },
  { id: 23, name: 'TUG', code: 'TUG', created_at: '2025-07-15', result: 15.7 },
  { id: 24, name: 'TUG', code: 'TUG', created_at: '2025-07-29', result: 14.8 },
  { id: 25, name: 'TUG', code: 'TUG', created_at: '2025-08-12', result: 14.2 },
];




export const patientsList: Patient[] = [
  {
    id: 1,
    name: "Maria Oliveira",
    age: 67,
    sex: "Feminino",
    diagnosis: "Lombalgia",
    tests
  },
  {
    id: 2,
    name: "João Ferreira",
    age: 62,
    sex: "Masculino",
    diagnosis: "Hérnia de disco lombar",
    tests,
  },
  {
    id: 3,
    name: "Ana Beatriz Silva",
    age: 73,
    sex: "Feminino",
    diagnosis: "Tendinite suprespinhal ombro esquerdo",
    tests,
  },
  {
    id: 4,
    name: "Carlos Eduardo Souza",
    age: 69,
    sex: "Masculino",
    diagnosis: "Artrose joelho direito",
    tests,
  },
  {
    id: 5,
    name: "Luciana Ribeiro",
    age: 64,
    sex: "Feminino",
    diagnosis: "Sindrome do Impacto Femoroacetabular",
    tests,
  },
  {
    id: 6,
    name: "Fernando Gomes",
    age: 69,
    sex: "Masculino",
    diagnosis: "Entorse de tornozelo esquerdo",
    tests,
  },
  {
    id: 7,
    name: "Juliana Mendes",
    age: 61,
    sex: "Feminino",
    diagnosis: "DPOC",
    tests,
  },
  {
    id: 8,
    name: "Ricardo Martins",
    age: 65,
    sex: "Masculino",
    diagnosis: "Cervicalgia",
    tests,
  },
  {
    id: 9,
    name: "Patrícia Lima",
    age: 70,
    sex: "Feminino",
    diagnosis: "Fibromialgia",
    tests,
  },
  {
    id: 10,
    name: "Marcelo Castro",
    age: 68,
    sex: "Masculino",
    diagnosis: "Parkinson",
    tests,
  },
  {
    id: 11,
    name: "Tatiane Rocha",
    age: 75,
    sex: "Feminino",
    diagnosis: "AVC",
    tests,
  },
  {
    id: 12,
    name: "Diego Alves",
    age: 63,
    sex: "Masculino",
    diagnosis: "Lombalgia crônica",
    tests,
  },
  {
    id: 13,
    name: "Helena Costa",
    age: 66,
    sex: "Feminino",
    diagnosis: "DTM",
    tests,
  },
  {
    id: 14,
    name: "Fábio Nogueira",
    age: 61,
    sex: "Masculino",
    diagnosis: "Epicondilite lateral E",
    tests,
  },
  {
    id: 14,
    name: "Rafaela Monteiro",
    age: 67,
    sex: "Feminino",
    diagnosis: "Cervicalgia",
    tests,
  },
];
