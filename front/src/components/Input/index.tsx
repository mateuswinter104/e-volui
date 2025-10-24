import React, { useState, ReactNode, ForwardedRef } from 'react'
import './styles.scss'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6'
import { IMaskInput } from 'react-imask'
import Text from '../Text'
import { Tooltip } from 'react-tooltip'
import colors from '@/styles/colors.module.scss'
import Icon from '../Icon'

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'placeholder'> {
  label?: ReactNode
  className?: string | any
  show?: boolean
  password?: boolean
  fluid?: boolean
  placeholder?: string
  value?: string
  mask?: any
  disabled?: boolean
  noLazy?: boolean
  required?: boolean
  tooltip?: string
  icon?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onValueChange?: (val: string) => void
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      placeholder,
      fluid,
      password,
      onChange,
      value,
      mask,
      disabled,
      noLazy,
      required,
      tooltip,
      onValueChange,
      icon
    },
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const [show, setShow] = useState(false)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(e)
      }
    }

    const [active, setActive] = useState(false)
    const tooltipActive = tooltip && tooltip.length > 0

    return (
      <div className={`${className} ${label && 'label'} position-relative`}>
        <div className="d-flex gap-1 align-items-center">
          {label && (
            <div
              id={tooltipActive ? 'label-tooltip' : ''}
              style={{
                maxWidth: '275px',
                cursor: tooltipActive ? 'pointer' : 'default'
              }}
            >
              {label}
              {tooltip && (
                <Tooltip
                  anchorSelect="#label-tooltip"
                  content={tooltip}
                  className="tooltip-style"
                />
              )}
            </div>
          )}
          {required && (
            <Text color={colors.error} className="f-12">
              *
            </Text>
          )}
        </div>

        <div
          className={`input-wrapper ${active ? 'active' : ''}`}
          onFocus={() => setActive(true)}
          onBlur={() => setActive(false)}
          style={{ width: fluid ? '100%' : '290px' }}
        >
          <IMaskInput
            type={password ? (show ? 'text' : 'password') : 'text'}
            placeholder={placeholder}
            className={`${className} input`}
            style={{ width: fluid ? '100%' : '290px' }}
            onChange={handleInputChange}
            value={value}
            lazy={noLazy ? false : true}
            mask={mask || ''}
            inputRef={ref}
            disabled={disabled}
            onAccept={(val: any) => onValueChange?.(val)}
            autoComplete="false"
            maxLength={255}
          />
          {password && (
            <div
              onClick={() => setShow(!show)}
              className="icon-input can-interact"
            >
              {show ? (
                <FaRegEye color={colors.gray2} />
              ) : (
                <FaRegEyeSlash color={colors.gray2} />
              )}
            </div>
          )}

          {icon && (
            <div className="icon-input">
              <Icon name={icon} fill={colors.primary} size={25} />
            </div>
          )}
        </div>
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input
