import { ReactNode } from 'react'
import ReactSelect, { SingleValue, MultiValue, ActionMeta } from 'react-select'
import Text from '../Text'
import './styles.scss'
import colors from '@/styles/colors.module.scss'

export interface Option {
  label: string | number | null
  value: string | number | null
}

interface SelectProps {
  options: Option[]
  label?: ReactNode
  value: any //SingleValue<Option> | Option[]
  bootstrapClass?: string | any
  className?: string | any
  placeholder?: string
  disabled?: boolean
  isMulti?: boolean
  noClear?: boolean
  required?: boolean
  isLoading?: boolean
  id?: string
  fluid?: boolean
  onChange: (
    selectedOption: SingleValue<Option> | MultiValue<Option> | Option,
    actionMeta: ActionMeta<Option>
  ) => void
}

export const Select: React.FC<SelectProps> = ({
  options,
  value,
  placeholder,
  label,
  onChange,
  disabled,
  isMulti,
  noClear,
  required,
  isLoading,
  id = '',
  fluid
}) => {
  const isClearable = options?.length > 1 && !noClear

  return (
    <div className="label">
      <div className="d-flex gap-1 align-items-center">
        {label && label}
        {required && (
          <Text color={colors.red} className="f-12">
            *
          </Text>
        )}
      </div>

      <div style={{ maxWidth: fluid ? '100%' : '290px' }}>
        <ReactSelect
          options={options}
          onChange={onChange}
          noOptionsMessage={() => <Text>Sem opções</Text>}
          placeholder={placeholder}
          value={value}
          isMulti={isMulti}
          isClearable={isClearable}
          isDisabled={disabled}
          classNamePrefix="select"
          isLoading={isLoading}
          inputId={id}
          instanceId={id}
        />
      </div>
    </div>
  )
}
