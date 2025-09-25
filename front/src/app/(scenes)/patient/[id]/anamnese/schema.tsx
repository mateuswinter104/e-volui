import * as yup from 'yup'
const cepRegex = /^\d{5}-\d{3}$/
const phoneRegex = /^\(\d{2}\)\s\d{5}-\d{4}$/

export const schema = yup.object().shape({
    name: yup.string().required('Nome completo é obrigatório'),
    birth_date: yup.string().required('Data de nascimento é obrigatória'),
    age: yup.number().required('Idade é obrigatória').min(60, 'Idade mínima é de 60 anos').nullable(),
    sex: yup
        .object({
            label: yup.string().required(),
            value: yup.string().required()
        })
        .nullable()
        .required('Selecione o sexo antes de continuar'),
    civil_state: yup
        .object({
            label: yup.string().required(),
            value: yup.string().required()
        })
        .nullable()
        .required('Selecione o estado civil antes de continuar'),
    school: yup
        .object({
            label: yup.string().required(),
            value: yup.string().required()
        })
        .nullable()
        .required('Selecione a escolaridade antes de continuar'),
    job: yup.string().required('Profissão é obrigatória'),
    birth_place: yup.string().required('Naturalidade é obrigatória'),
    phone: yup
        .string()
        .matches(phoneRegex, 'Formato inválido')
        .required('Telefone é obrigatório'),
    children: yup.string().required('Selecione uma opção'),
    state: yup.string().required('Estado é obrigatório'),
    city: yup.string().required('Cidade é obrigatória'),
    neighborhood: yup.string().required('Bairro é obrigatório'),
    street: yup.string().required('Logradouro é obrigatório'),
    number: yup.string().required('Número é obrigatório'),
    main_complain: yup.string().required('Queixa principal é obrigatória'),
    deasease_history: yup.string().required('Histórico da doença é obrigatório'),
    diagnosis: yup.string().required('Diagnóstico é obrigatório'),
    simptoms: yup.string().required('Sinais e sintomas são obrigatórios'),
    evolution: yup.string().required('Início e evolução são obrigatórios'),
    children_number: yup.string().default(''),
    postal_code: yup.string().matches(cepRegex, 'Formato inválido').notRequired().default(''),
    complement: yup.string().notRequired().default(''),
    other_characteristics: yup.string().notRequired().default(''),

})
