"use client";

import "./styles.scss";
/* import searchFile from "../../../../public/file-search.svg";
import Image from "next/image"; */
import { Table } from "@/components/Table";
import { useState } from "react";
import Text from "@/components/Text";
import { SearchBar } from "@/components/SearchBar";
import Button from "@/components/Button";
import colors from "@/styles/colors.module.scss";
import useMediaQuery from "@/app/utils/functions/useMediaQuery";
import { toast } from "sonner";
import { patientsList } from "@/utils/services/api";
import Icon from "@/components/Icon";
import { Controller, useForm } from "react-hook-form";
import Input from "@/components/Input";
import { yupResolver } from '@hookform/resolvers/yup'
import { schema } from "./schema";
import DatePicker from "@/components/DatePicker";
import { Select } from "@/components/Select";

interface Option {
  label: string
  value: string
}

interface FormValues {
  name: string
  birth_date: string
  age: number | null
  sex: Option
}

const sexOptions: Option[] = [
  { label: 'Masculino', value: 'male' },
  { label: 'Feminino', value: 'female' }
]

export default function Index(): JSX.Element {

  const methods = useForm<FormValues>({
    defaultValues: {
      name: '',
      birth_date: '',
      age: null,
      sex: null as unknown as Option
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
    formState: { errors, isSubmitting, isSubmitSuccessful }
  } = methods

  return (
    <div className="container">
      <div className="d-flex flex-column gap-32">
        <div className="d-flex w-100 justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-8">
            <Icon name="RiArrowLeftSLine" />
            <Text className="f-24 semi-bold">
              Anamnese
            </Text>
          </div>
        </div>
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
                />
              )}
            />
            {errors.sex && (
              <Text className="form-error-message">
                {errors.sex.message}
              </Text>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
