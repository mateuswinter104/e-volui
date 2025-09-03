import * as yup from 'yup'

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
})
