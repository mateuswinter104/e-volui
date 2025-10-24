"use client";

import "./styles.scss";
import { useEffect } from "react";
import Text from "@/components/Text";
import Button from "@/components/Button";
import colors from "@/styles/colors.module.scss";
import useMediaQuery from "@/app/utils/functions/useMediaQuery";
import { toast } from "sonner";
import { PatientData } from "@/utils/services/api";
import Icon from "@/components/Icon";
import { Controller, useForm } from "react-hook-form";
import Input from "@/components/Input";
import { yupResolver } from '@hookform/resolvers/yup'
import { schema } from "./schema";
import { Select } from "@/components/Select";
import RadioButton from "@/components/RadioButton";
import { getCep, isOtherOption } from "@/app/utils/functions/generalFunctions";
import TextArea from "@/components/TextArea";
import Link from "next/link";

interface Option {
  label: string
  value: string
}

interface FormValues {
  name: string
  birth_date: string
  age: number | null
  sex: Option
  school: Option
  job: string
  civil_state: Option
  children: string
  birth_place: string
  phone: string
  state: string
  city: string
  neighborhood: string
  street: string
  number: string
  main_complain: string
  deasease_history: string
  diagnosis: string
  risk_events: string
  medicine: string
  simptoms: string
  evolution: string
  postal_code: string | null
  other_characteristics: string | null
  children_number: string
  complement: string | null
}

const childrenOptions: Option[] = [
  {
    value: 'yes',
    label: 'Sim'
  },
  {
    value: 'no',
    label: 'Não'
  }
]

const schoolOptions: Option[] = [
  { value: 'fundamental_incompleto', label: 'Ensino Fundamental Incompleto' },
  { value: 'fundamental_completo', label: 'Ensino Fundamental Completo' },
  { value: 'medio_incompleto', label: 'Ensino Médio Incompleto' },
  { value: 'medio_completo', label: 'Ensino Médio Completo' },
  { value: 'superior_incompleto', label: 'Ensino Superior Incompleto' },
  { value: 'superior_completo', label: 'Ensino Superior Completo' },
  { value: 'pos_graduacao', label: 'Pós-graduação' },
  { value: 'mestrado', label: 'Mestrado' },
  { value: 'doutorado', label: 'Doutorado' }
]

const civilStateOptions: Option[] = [
  { value: 'solteiro', label: 'Solteiro(a)' },
  { value: 'casado', label: 'Casado(a)' },
  { value: 'divorciado', label: 'Divorciado(a)' },
  { value: 'separado', label: 'Separado(a)' },
  { value: 'viuvo', label: 'Viúvo(a)' },
  { value: 'uniao_estavel', label: 'União Estável' }
]

const sexOptions: Option[] = [
  { label: 'Masculino', value: 'male' },
  { label: 'Feminino', value: 'female' }
]

interface Props {
  data: PatientData | ''
  id: number
}

export default function Index({ data, id }: Props): JSX.Element {
  const isMobile = useMediaQuery("(max-width: 920px)");


  const methods = useForm<FormValues>({
    defaultValues: {
      name: '',
      birth_date: '',
      age: null,
      sex: null as unknown as Option,
      school: null as unknown as Option,
      civil_state: null as unknown as Option,
      job: '',
      birth_place: '',
      phone: '',
      children: '',
      children_number: '',
      postal_code: '',
      state: '',
      city: '',
      neighborhood: '',
      street: '',
      number: '',
      complement: '',
      main_complain: '',
      deasease_history: '',
      diagnosis: '',
      risk_events: '',
      medicine: '',
      simptoms: '',
      evolution: '',
      other_characteristics: ''
    },
    resolver: yupResolver(schema),
    mode: 'onChange'
  })

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    watch,
    trigger,
    register,
    formState: { errors }
  } = methods

  const handleCEP = async (cep: string) => {
    if (cep.length === 9) {
      try {
        const res = await getCep(cep)

        setValue('state', res.erro ? '' : res.estado)
        setValue('city', res.erro ? '' : res.localidade)
        setValue('street', res.erro ? '' : res.logradouro)
        setValue('neighborhood', res.erro ? '' : res.bairro)

        trigger(['state', 'city', 'street', 'neighborhood'])
      } catch (error) {
        toast.error('Erro ao buscar o CEP')
      }
    }
  }

  useEffect(() => {
    register('children_number')
  }, [register])

  useEffect(() => {
    if (data) {
      const {
        name,
        birth_date,
        age,
        sex,
        school,
        job,
        civil_state,
        children,
        birth_place,
        phone,
        postal_code,
        state,
        city,
        neighborhood,
        street,
        number,
        main_complain,
        deasease_history,
        diagnosis,
        risk_events,
        medicine,
        simptoms,
        evolution,
        other_characteristics,
        children_number,
        complement,
      } = data

      const formattedCivilState = civilStateOptions.find(state => state.value === civil_state)

      const formattedSchool = schoolOptions.find(s => s.value === school)

      const formattedSex = sexOptions.find(s => s.value === sex)

      reset({
        birth_date,
        age,
        name,
        job,
        children,
        birth_place,
        phone,
        postal_code,
        state,
        city,
        neighborhood,
        street,
        number,
        main_complain,
        deasease_history,
        diagnosis,
        risk_events,
        medicine,
        simptoms,
        evolution,
        other_characteristics,
        children_number,
        complement,
        civil_state: formattedCivilState,
        school: formattedSchool,
        sex: formattedSex,
      })
    }
  }, [data])

  return (
    <div className="form">
      <div className="d-flex w-100 justify-content-between align-items-center">
        <Link href={`/patient/${id}`} className="d-flex align-items-center gap-1">
          <Icon name="RiArrowLeftSLine" />
          <Text className="f-24 semi-bold">
            Anamnese
          </Text>
        </Link>
        {!isMobile &&
          <div className="d-flex gap-16">
            <Button
              icon="RiFilePdf2Line"
              fill={colors.white}
              iconSize={20}
              className="secondary"
              onClick={() => toast("Em breve")}
            >
              <Text color={colors.white} className="semi-bold f-14">
                Exportar anamnese
              </Text>
            </Button>
            <Button
              className="primary"
              onClick={() => toast("Em breve")}
            >
              <Text color={colors.white} className="semi-bold f-14">
                Salvar alterações
              </Text>
            </Button>
          </div>}
      </div>
      {isMobile &&
        <div className="d-flex gap-8">
          <Button
            icon="RiFilePdf2Line"
            fill={colors.white}
            iconSize={20}
            className="secondary"
            fluid
            onClick={() => toast("Em breve")}
          >
            <Text color={colors.white} className="semi-bold f-14">
              Exportar
            </Text>
          </Button>
          <Button
            className="primary"
            onClick={() => toast("Em breve")}
            fluid
          >
            <Text color={colors.white} className="semi-bold f-14">
              Salvar
            </Text>
          </Button>
        </div>}
      <div className="inputs-column">
        <div className="form-group">
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                required
                label={
                  <Text className="f-12 bold">Nome completo</Text>
                }
                placeholder="Digite o nome completo"
              />
            )}
          />
          {errors.name && (
            <Text className="form-error-message">
              {errors.name.message}
            </Text>
          )}
        </div>
        <div className="form-group">
          <Controller
            name="birth_date"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                required
                label={
                  <Text className="f-12 bold">Data de nascimento</Text>
                }
                mask={"00/00/0000"}
                onValueChange={(val) => field.onChange(val)}
                placeholder="Digite a data de nascimento"
              />
            )}
          />
          {errors.birth_date && (
            <Text className="form-error-message">
              {errors.birth_date.message}
            </Text>
          )}
        </div>
        <div className="form-group">
          <Controller
            name="age"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                required
                mask={Number}
                value={field.value === null ? '' : field.value.toString()}
                label={
                  <Text className="f-12 bold">Idade</Text>
                }
                placeholder="Digite a idade"
              />
            )}
          />
          {errors.age && (
            <Text className="form-error-message">
              {errors.age.message}
            </Text>
          )}
        </div>
      </div>
      <div className="inputs-column">
        <div className="form-group">
          <Controller
            name="sex"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                label={<Text className="f-12 bold">Sexo</Text>}
                options={sexOptions}
                placeholder="Selecione o sexo"
                required
                fluid={isMobile}
                id="sex"
              />
            )}
          />
          {errors.sex && (
            <Text className="form-error-message">
              {errors.sex.message}
            </Text>
          )}
        </div>
        <div className="form-group">
          <Controller
            name="school"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                label={<Text className="f-12 bold">Escolaridade</Text>}
                options={schoolOptions}
                placeholder="Selecione a escolaridade"
                required
                fluid={isMobile}
                id="school"
              />
            )}
          />
          {errors.school && (
            <Text className="form-error-message">
              {errors.school.message}
            </Text>
          )}
        </div>
        <div className="form-group">
          <Controller
            name="job"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                required
                label={
                  <Text className="f-12 bold">Profissão</Text>
                }
                placeholder="Digite a profissão"
              />
            )}
          />
          {errors.job && (
            <Text className="form-error-message">
              {errors.job.message}
            </Text>
          )}
        </div>
      </div>
      <div className="inputs-column">
        <div className="form-group">
          <Controller
            name="civil_state"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                id="civil_state"
                label={<Text className="f-12 bold">Estado civil</Text>}
                options={civilStateOptions}
                placeholder="Selecione o estado civil"
                required
                fluid={isMobile}
              />
            )}
          />
          {errors.civil_state && (
            <Text className="form-error-message">
              {errors.civil_state.message}
            </Text>
          )}
        </div>
        <div className="form-group">
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                required
                label={<Text className="f-12 bold">Telefone</Text>}
                placeholder="Digite o telefone"
                onValueChange={field.onChange}
                mask={'(00) 00000-0000'}
              />
            )}
          />
          {errors.phone && (
            <Text className="form-error-message">
              {errors.phone.message}
            </Text>
          )}
        </div>
        <div className="form-group">
          <Controller
            name="birth_place"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                required
                label={<Text className="f-12 bold">Naturalidade</Text>}
                placeholder="Digite a nacionalidade"
              />
            )}
          />
          {errors.birth_place && (
            <Text className="form-error-message">
              {errors.birth_place.message}
            </Text>
          )}
        </div>
      </div>
      <div className="d-flex flex-column gap-8">
        <Text className="f-12 bold">Possui filhos</Text>
        <div className="form-group">
          <Controller
            name="children"
            control={control}
            render={({ field }) => (
              <>
                {childrenOptions.map((option: Option) => {
                  const hasChildren = isOtherOption(option.value, 'yes')

                  return (
                    <RadioButton
                      key={option.value}
                      label={option.label}
                      name={field.name}
                      value={option.value}
                      checked={field.value === option.value}
                      onChange={field.onChange}
                      list
                      write={hasChildren && 'Digite quantos filhos'}
                      writeValue={hasChildren ? watch('children_number') : undefined}
                      onWriteChange={
                        hasChildren
                          ? (e) => setValue('children_number', e.target.value)
                          : undefined
                      }
                    />
                  )
                })}
              </>
            )}
          />
          {errors.children && (
            <Text className="form-error-message">
              {errors.children.message}
            </Text>
          )}
        </div>
      </div>
      <div className="inputs-column">
        <div className="form-group">
          <Controller
            name="postal_code"
            control={control}
            render={({ field }) => (
              <Input
                fluid={isMobile}
                {...field}
                value={field.value ?? ''}
                label={<Text className="f-12 bold">CEP</Text>}
                placeholder="Digite o CEP"
                mask="00000-000"
                onChange={(e) => {
                  const newCep = e.target.value
                  field.onChange(newCep) // atualiza o react-hook-form
                  handleCEP(newCep) // dispara busca se necessário
                }}
              />
            )}
          />
          {errors.postal_code && (
            <Text className="form-error-message">
              {errors.postal_code.message}
            </Text>
          )}
        </div>
        <div className="form-group">
          <Controller
            name="state"
            control={control}
            render={({ field }) => (
              <Input
                fluid={isMobile}
                {...field}
                required
                label={<Text className="f-12 bold">Estado</Text>}
                placeholder="Digite o estado"
              />
            )}
          />
          {errors.state && (
            <Text className="form-error-message">
              {errors.state.message}
            </Text>
          )}
        </div>
        <div className="form-group">
          <Controller
            name="city"
            control={control}
            render={({ field }) => (
              <Input
                fluid={isMobile}
                {...field}
                required
                label={<Text className="f-12 bold">Cidade</Text>}
                placeholder="Digite a cidade"
              />
            )}
          />
          {errors.city && (
            <Text className="form-error-message">
              {errors.city.message}
            </Text>
          )}
        </div>
      </div>
      <div className="inputs-column">
        <div className="form-group">
          <Controller
            name="neighborhood"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                required
                label={<Text className="f-12 bold">Bairro</Text>}
                placeholder="Digite o bairro"
              />
            )}
          />
          {errors.neighborhood && (
            <Text className="form-error-message">
              {errors.neighborhood.message}
            </Text>
          )}
        </div>
        <div className="form-group">
          <Controller
            name="street"
            control={control}
            render={({ field }) => (
              <Input
                fluid={isMobile}
                {...field}
                required
                label={<Text className="f-12 bold">Logradouro</Text>}
                placeholder="Digite o logradouro"
              />
            )}
          />
          {errors.street && (
            <Text className="form-error-message">
              {errors.street.message}
            </Text>
          )}
        </div>
        <div className="form-group">
          <Controller
            name="number"
            control={control}
            render={({ field }) => (
              <Input
                fluid={isMobile}
                {...field}
                required
                label={<Text className="f-12 bold">Número</Text>}
                placeholder="Digite o número"
              />
            )}
          />
          {errors.number && (
            <Text className="form-error-message">
              {errors.number.message}
            </Text>
          )}
        </div>
      </div>
      <div className="inputs-column">
        <div className="form-group">
          <Controller
            name="complement"
            control={control}
            render={({ field }) => (
              <Input
                fluid={isMobile}
                {...field}
                value={field.value ?? ''}
                label={<Text className="f-12 bold">Complemento</Text>}
                placeholder="Digite o complemento"
              />
            )}
          />
        </div>
      </div>
      <div className="inputs-column">
        <div className="form-group w-100">
          <Controller
            name="main_complain"
            control={control}
            render={({ field }) => (
              <TextArea
                label={
                  <Text className="f-16">Queixa principal (QP)</Text>
                }
                placeholder="Digite a queixa principal"
                rows={5}
                fluid
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
          {errors.main_complain && (
            <Text className="form-error-message">
              {errors.main_complain.message}
            </Text>
          )}
        </div>
        <div className="form-group w-100">
          <Controller
            name="deasease_history"
            control={control}
            render={({ field }) => (
              <TextArea
                label={
                  <Text className="f-16">Histórico da doença atual (HDA)</Text>
                }
                placeholder="Digite o histórico da doença atual"
                rows={5}
                fluid
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
          {errors.deasease_history && (
            <Text className="form-error-message">
              {errors.deasease_history.message}
            </Text>
          )}
        </div>
      </div>
      <div className="inputs-column">
        <div className="form-group w-100">
          <Controller
            name="diagnosis"
            control={control}
            render={({ field }) => (
              <TextArea
                label={
                  <Text className="f-16">Diagnóstico</Text>
                }
                placeholder="Digite o diagnóstico"
                rows={5}
                fluid
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
          {errors.diagnosis && (
            <Text className="form-error-message">
              {errors.diagnosis.message}
            </Text>
          )}
        </div>
        <div className="form-group w-100">
          <Controller
            name="simptoms"
            control={control}
            render={({ field }) => (
              <TextArea
                label={
                  <Text className="f-16">Sinais e sintomas</Text>
                }
                placeholder="Digite os sinais e sintomas"
                rows={5}
                fluid
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
          {errors.simptoms && (
            <Text className="form-error-message">
              {errors.simptoms.message}
            </Text>
          )}
        </div>
      </div>
      <div className="inputs-column">
        <div className="form-group w-100">
          <Controller
            name="evolution"
            control={control}
            render={({ field }) => (
              <TextArea
                label={
                  <Text className="f-16">Início e evolução</Text>
                }
                placeholder="Digite o início e a evolução"
                rows={5}
                fluid
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
          {errors.evolution && (
            <Text className="form-error-message">
              {errors.evolution.message}
            </Text>
          )}
        </div>
        <div className="form-group w-100">
          <Controller
            name="other_characteristics"
            control={control}
            render={({ field }) => (
              <TextArea
                label={
                  <Text className="f-16">Características adicionais</Text>
                }
                placeholder="Digite as características adicionais"
                rows={5}
                fluid
                value={field.value ?? ''}
                onChange={field.onChange}
              />
            )}
          />
          {errors.other_characteristics && (
            <Text className="form-error-message">
              {errors.other_characteristics.message}
            </Text>
          )}
        </div>
      </div>
      <div className="inputs-column">
        <div className="form-group w-100">
          <Controller
            name="risk_events"
            control={control}
            render={({ field }) => (
              <TextArea
                label={
                  <Text className="f-16">Fatores de risco</Text>
                }
                placeholder="Digite os fatores de risco"
                rows={5}
                fluid
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
          {errors.risk_events && (
            <Text className="form-error-message">
              {errors.risk_events.message}
            </Text>
          )}
        </div>
        <div className="form-group w-100">
          <Controller
            name="medicine"
            control={control}
            render={({ field }) => (
              <TextArea
                label={
                  <Text className="f-16">Medicações em uso</Text>
                }
                placeholder="Digite as medicações em uso"
                rows={5}
                fluid
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
          {errors.medicine && (
            <Text className="form-error-message">
              {errors.medicine.message}
            </Text>
          )}
        </div>
      </div>
    </div>
  );
}
