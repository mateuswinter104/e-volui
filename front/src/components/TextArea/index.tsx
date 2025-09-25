import React, { ReactNode, ForwardedRef } from 'react'
import './styles.scss'
import Text from '../Text'
import Checkbox from '../Checkbox'
import colors from "@/styles/colors.module.scss";

export interface TextAreaProps
  extends Omit<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    'placeholder'
  > {
  label?: ReactNode
  className?: string | any
  fluid?: boolean
  placeholder?: string
  value?: string
  disabled?: boolean
  rows?: number
  max?: number
  subLabel?: string | false
  apply?: boolean
  checkboxDeclarationChecked?: boolean
  required?: boolean
  onCheckboxDeclarationChange?: (checked: boolean) => void
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      className,
      label,
      placeholder,
      fluid,
      onChange,
      value,
      disabled,
      max,
      subLabel,
      apply,
      checkboxDeclarationChecked,
      onCheckboxDeclarationChange,
      rows = 4,
      required,
      ...props
    },
    ref: ForwardedRef<HTMLTextAreaElement>
  ) => {
    const handleTextAreaChange = (
      e: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
      if (onChange) {
        onChange(e)
      }
    }

    return (
      <div
        className={`${className} ${label && 'label'} ${fluid && 'fluid'} position-relative`}
        style={{ width: fluid ? '100%' : 'calc(50% - 16px)' }}
      >
        {subLabel ? (
          <div className="d-flex flex-column">
            <div
              className={`d-flex ${apply ? 'w-100 justify-content-between align-items-center' : ''}`}
            >
              <div className="d-flex gap-1 align-items-center">
                {label && label}
                {required && (
                  <Text color={colors.red} className="f-12">
                    *
                  </Text>
                )}
              </div>
              {apply && (
                <Checkbox
                  label="Não se aplica"
                  onChange={onCheckboxDeclarationChange || (() => { })}
                  checked={checkboxDeclarationChecked || false}
                />
              )}
            </div>
            <Text className="f-12">{subLabel}</Text>
          </div>
        ) : (
          <div className="d-flex gap-1 align-items-center">
            {label && label}
            {required && (
              <Text color={colors.red} className="f-12">
                *
              </Text>
            )}
          </div>
        )}
        {max && (
          <div className="d-flex justify-content-end w-100">
            <Text className="f-12 gray-1">{`${value?.length ?? 0}/${max}`}</Text>
          </div>
        )}
        <textarea
          {...props}
          placeholder={placeholder}
          className={`${className} textarea`}
          style={{ width: '100%' }}
          onChange={handleTextAreaChange}
          value={value}
          disabled={disabled}
          rows={rows}
          ref={ref}
          maxLength={max}
        />
      </div>
    )
  }
)

TextArea.displayName = 'TextArea'

export default TextArea
