import React from 'react'
import './styles.scss'
import Text from '../Text'

export interface RadioButtonProps {
  label: string
  name: string
  value: string | number
  checked: boolean
  onChange: (value: string | number) => void
  disabled?: boolean
  button?: boolean
  list?: boolean
  write?: string | false
  writeValue?: string
  onWriteChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const RadioButton: React.FC<RadioButtonProps> = ({
  label,
  name,
  value,
  checked,
  onChange,
  button = false,
  disabled = false,
  list = false,
  write = false,
  writeValue,
  onWriteChange
}) => {
  return (
    <div
      onClick={() => onChange(value)}
      className={`custom-radio ${list ? 'check-list' : ''} ${button ? `radio-button ${checked ? 'active' : ''}` : ''}`}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        onChange={() => onChange(value)}
      />
      <div className="radio-mark">
        <span className={checked ? 'radio-checked' : ''} />
      </div>
      <Text className={`f-14 ${checked ? 'semi-bold' : ''}`}>{label}</Text>
      {write && (
        <input
          type="text"
          placeholder={write}
          value={writeValue}
          onChange={onWriteChange}
          className="checkbox-write-input"
          onClick={(e) => e.stopPropagation()}
        />
      )}
    </div>
  )
}

export default RadioButton
