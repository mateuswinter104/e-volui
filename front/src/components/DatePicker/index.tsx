import { ReactNode, useEffect, useRef } from 'react'
import { LuCalendar } from 'react-icons/lu'
import flatpickr from 'flatpickr'
import 'flatpickr/dist/flatpickr.min.css'
import './styles.scss'
import { Tooltip } from 'react-tooltip'
import Text from '../Text'
import colors from '@/styles/colors.module.scss'
import { Portuguese } from 'flatpickr/dist/l10n/pt.js'

export interface Props {
  options?: any
  label?: ReactNode
  fluid?: boolean
  placeholder?: string
  disabled?: boolean
  disablePastDates?: boolean
  disablePrevious3Days?: boolean
  disablePrevious7Days?: boolean
  value?: string | Date | null
  enableTime?: boolean
  time24hr?: boolean
  required?: boolean
  tooltip?: string
  customTrigger?: ReactNode
  onChange?: (
    selectedDates: Date[],
    dateStr: string,
    instance: flatpickr.Instance
  ) => void
}

export const DatePicker: React.FC<Props> = ({
  options,
  onChange,
  label,
  fluid,
  placeholder,
  disabled,
  value,
  disablePastDates,
  customTrigger,
  disablePrevious3Days,
  disablePrevious7Days,
  enableTime = false,
  time24hr = false,
  required,
  tooltip
}) => {
  const datePickerRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!datePickerRef.current) return

    const today = new Date()
    let minDate: Date | undefined = undefined

    if (disablePrevious3Days) {
      minDate = new Date()
      minDate.setDate(today.getDate() + 3)
    }

    if (disablePrevious7Days) {
      minDate = new Date()
      minDate.setDate(today.getDate() + 7)
    }

    const instance = flatpickr(datePickerRef.current, {
      dateFormat: 'd/m/Y',
      locale: Portuguese,
      minDate: minDate || (disablePastDates ? today : undefined),
      defaultDate:
        typeof value === 'string' ? new Date(value) : value || undefined,
      enableTime,
      time_24hr: time24hr,
      closeOnSelect: false,
      disableMobile: 'true',
      ...options,
      onClose: (selectedDates, dateStr, instance) => {
        if (enableTime) {
          const timeSelected = dateStr.match(/\d{1,2}:\d{2}$/)
          if (!timeSelected) {
            instance.open()
          }
        }
      },
      onChange: (selectedDates, dateStr, instance) => {
        if (onChange) {
          onChange(selectedDates, dateStr, instance)
        }
      }
    })

    instance?.calendarContainer?.classList?.add('flatpickr-light')

    return () => {
      instance.destroy()
    }
  }, [
    options,
    onChange,
    value,
    enableTime,
    time24hr,
    disablePastDates,
    disablePrevious3Days,
    disablePrevious7Days
  ])

  const tooltipActive = tooltip && tooltip.length > 0

  return (
    <div
      className={`${disabled} ? 'date-picker-disabled' : '' ${label && 'label'}`}
    >
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
          <Text color={colors.red} className="f-12">
            *
          </Text>
        )}
      </div>

      <div
        className={`datePickerContainer ${disabled ? 'disabled-container' : ''}`}
      >
        {customTrigger ? (
          <div
            onClick={() => {
              if (datePickerRef.current && !disabled) {
                datePickerRef.current.focus()
              }
            }}
          >
            {customTrigger}
          </div>
        ) : (
          <>
            <input
              ref={datePickerRef}
              type="text"
              style={{ width: fluid ? '100%' : '290px' }}
              placeholder={placeholder ? placeholder : 'Selecione a data'}
              disabled={disabled}
              className={`input-date ${disabled ? 'input-disabled' : ''}`}
            />
            <div
              className={`placeholder-icon ${disabled ? 'icon-disabled' : ''}`}
            >
              <LuCalendar
                color={disabled ? '#A9A9A9' : '#FFCC66'}
                style={{
                  marginLeft: '-30px',
                  cursor: disabled ? 'not-allowed' : 'pointer'
                }}
              />
            </div>
          </>
        )}

        {customTrigger && (
          <input
            ref={datePickerRef}
            type="text"
            style={{ opacity: 0, position: 'absolute', pointerEvents: 'none' }}
            disabled={disabled}
          />
        )}
      </div>
    </div>
  )
}

export default DatePicker
