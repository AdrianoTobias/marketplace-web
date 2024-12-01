import { ViewIcon, ViewOffIcon } from 'hugeicons-react'
import React, { useState } from 'react'

interface InputWithIconProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: string
  placeholder?: string
  icon?: React.ReactNode // Tipo como React.ReactNode, para receber um elemento React para o ícone
  className?: string // Para permitir estilos adicionais
}

export const InputWithIcon = React.forwardRef<
  HTMLInputElement,
  InputWithIconProps
>(({ type = 'text', placeholder, icon, className = '', ...props }, ref) => {
  const [showPassword, setShowPassword] = useState(false)

  // Função para alternar a visibilidade da senha
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
    console.log(props)
  }

  return (
    <div
      className={`flex items-center gap-2 border-b-[1px] border-gray-100 px-[2px] py-3 focus-within:border-gray-400 
        
        ${className}`}
    >
      {icon && (
        <div className="flex h-6 w-6 items-center justify-center text-gray-200">
          {icon}
        </div>
      )}
      <input
        type={type === 'password' && !showPassword ? 'password' : 'text'}
        placeholder={placeholder}
        className="body-md my-[2.5px] w-full text-gray-400 placeholder-gray-200 focus:outline-none"
        {...props}
        ref={ref}
      />
      {type === 'password' && (
        <button type="button" onClick={togglePasswordVisibility}>
          <div className="h-6 w-6 text-gray-300">
            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
          </div>
        </button>
      )}
    </div>
  )
})

// Permite usar o ref no componente com React Hook Form
InputWithIcon.displayName = 'InputWithIcon'
