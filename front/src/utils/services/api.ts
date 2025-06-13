export interface TestProps {
  id: number;
  code: string;
  name: string;
  objective: string;
  description: string;
  result: string;
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
      "Consiste no preenchimento de questões que envolvem (1) orientação do paciente, questionando o ano, estação, dia/semana, dia/mês e mês; (2) capacidade de registro, solicitando que o paciente repita as palavras “pente, rua e azul”; (3) atenção e cálculo, solicitando que o paciente realize um cálculo de subtração cinco vezes;  (4) evocação, solicitando que o paciente repita as palavras pronunciadas na etapa de “capacidade de registro”; e (5) linguagem, solicitando que o paciente identifique objetos, repita uma frase, siga um comando de três estágios, leia, escreva e copie um desenho.",
    result:
      "O resultado final é obtido através da soma da pontuação que o paciente adquiriu em cada uma das etapas, sendo 30 a pontuação máxima.",
  },
];

export const patientsList = [
  {
    name: "Maria Oliveira",
    age: 67,
    sex: "Feminino",
    diagnosis: "Osteoporose no joelho direito",
  },
  {
    name: "João Ferreira",
    age: 62,
    sex: "Masculino",
    diagnosis: "Hérnia de disco lombar",
  },
  {
    name: "Ana Beatriz Silva",
    age: 73,
    sex: "Feminino",
    diagnosis: "Tendinite no ombro esquerdo",
  },
  {
    name: "Carlos Eduardo Souza",
    age: 69,
    sex: "Masculino",
    diagnosis: "Artrose bilateral de joelhos",
  },
  {
    name: "Luciana Ribeiro",
    age: 64,
    sex: "Feminino",
    diagnosis: "Lesão de LCA no joelho direito",
  },
  {
    name: "Fernando Gomes",
    age: 69,
    sex: "Masculino",
    diagnosis: "Entorse de tornozelo esquerdo",
  },
  {
    name: "Juliana Mendes",
    age: 61,
    sex: "Feminino",
    diagnosis: "Bursite trocantérica",
  },
  {
    name: "Ricardo Martins",
    age: 65,
    sex: "Masculino",
    diagnosis: "Compressão do nervo ciático",
  },
  {
    name: "Patrícia Lima",
    age: 70,
    sex: "Feminino",
    diagnosis: "Fibromialgia",
  },
  {
    name: "Marcelo Castro",
    age: 68,
    sex: "Masculino",
    diagnosis: "Escoliose leve",
  },
  {
    name: "Tatiane Rocha",
    age: 75,
    sex: "Feminino",
    diagnosis: "Síndrome do impacto no ombro direito",
  },
  {
    name: "Diego Alves",
    age: 63,
    sex: "Masculino",
    diagnosis: "Lombalgia crônica",
  },
  {
    name: "Helena Costa",
    age: 66,
    sex: "Feminino",
    diagnosis: "Artrite reumatoide",
  },
  {
    name: "Fábio Nogueira",
    age: 61,
    sex: "Masculino",
    diagnosis: "Degeneração de disco intervertebral",
  },
  {
    name: "Rafaela Monteiro",
    age: 67,
    sex: "Feminino",
    diagnosis: "Cervicalgia com radiculopatia",
  },
];
