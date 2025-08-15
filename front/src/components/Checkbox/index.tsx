import React from 'react'
import './styles.scss'
import Text from '../Text'
import Icon from '../Icon'

interface CheckboxProps {
  onChange: (checked: boolean) => void
  checked: boolean
  disabled?: boolean
  label?: string
  button?: boolean
  list?: boolean
  write?: string | false
  writeValue?: string
  small?: boolean
  onWriteChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Checkbox: React.FC<CheckboxProps> = ({
  onChange,
  checked,
  disabled = false,
  label,
  button = false,
  list = false,
  write = false,
  writeValue,
  onWriteChange,
  small
}) => {
  const handleClick = () => {
    if (!disabled) {
      onChange(!checked)
    }
  }

  return (
    <div
      onClick={handleClick}
      style={{ gap: small ? '6px' : '12px' }}
      className={`custom-checkbox ${list ? 'check-list' : ''} ${button ? `checkbox-button ${checked ? 'active' : ''}` : ''} ${disabled ? 'disabled' : ''}`}
    >
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange(e.target.checked)}
      />
      <div
        style={{
          width: small ? '13px' : '15px',
          height: small ? '13px' : '15px'
        }}
        className={`checkbox-mark ${checked ? 'active' : ''}`}
      >
        {checked && (
          <div className="d-flex">
            <Icon name="RiCheckFill" fill="white" size={14} />
          </div>
        )}
      </div>
      <Text
        className={`${small ? 'f-12' : 'f-14'} ${checked ? 'semi-bold' : ''}`}
      >
        {label}
      </Text>
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

export default Checkbox
