import React, { useState } from 'react'
import { Control, Controller } from 'react-hook-form'

import arrowDownIcon from '../assets/icons/arrow-down.svg'
import cancelIcon from '../assets/icons/cancel.svg'
import tickIcon from '../assets/icons/tick.svg'

interface SelectOption {
  label: string
  value: string
}

interface CustomSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  name: string
  options: SelectOption[]
  placeholder?: string
  icon?: string // Tipo como React.ReactNode, para receber um elemento React para o ícone
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>
}

export function CustomSelect({
  name,
  options,
  placeholder = 'Selecione uma opção',
  icon,
  control,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleOpen = () => setIsOpen(!isOpen)

  return (
    <div className="relative">
      <Controller
        name={name}
        control={control}
        render={({ field: { value, onChange } }) => (
          <>
            <div
              className={`flex cursor-pointer items-center gap-2 border-b-[1px] px-[2px] py-3.5
                ${value ? 'border-gray-400 ' : 'border-gray-100 '}`}
              onClick={toggleOpen}
            >
              {icon && (
                <img src={icon} className="h-6 w-6 opacity-50" alt="Ícone" />
              )}

              <span
                className={`body-md flex-1 
                    ${value ? 'text-gray-400' : 'text-gray-200'}`}
              >
                {value || placeholder}
              </span>

              {value && (
                <span className="bg-shape flex h-6 w-6 items-center justify-center rounded-full">
                  <img
                    src={cancelIcon}
                    onClick={(e) => {
                      e.stopPropagation()
                      onChange('')
                    }}
                    className="h-4 w-4"
                    alt="Ícone de cancelar"
                  />
                </span>
              )}

              <img
                src={arrowDownIcon}
                alt="Íconde de uma seta"
                className={`h-6 w-6
                    ${isOpen && '-scale-y-100 transform'}
                `}
              />
            </div>

            {isOpen && (
              <div className="border-shape absolute mt-1 flex w-full flex-col rounded-lg border bg-white shadow-lg">
                {options.map((option) => (
                  <div
                    key={option.value}
                    className="flex h-12 cursor-pointer items-center gap-2 px-4 hover:bg-gray-200"
                    onClick={() => {
                      onChange(option.value)
                      setIsOpen(false)
                    }}
                  >
                    <p
                      className={`body-sm flex h-full w-full items-center 
                        ${
                          value === option.value
                            ? 'text-orange-base'
                            : 'hover:text-orange-dark text-gray-300'
                        }
                        `}
                    >
                      {option.label}
                    </p>

                    {value === option.value && (
                      <img
                        src={tickIcon}
                        alt="Ícone de ticado"
                        className="h-6 w-6"
                      />
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      />
    </div>
  )
}
