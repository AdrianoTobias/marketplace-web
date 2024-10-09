import React, { useState } from 'react'

import viewIcon from '../assets/icons/view.svg'
import viewOffIcon from '../assets/icons/view-off.svg'

interface InputWithIconProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: string
  placeholder?: string
  icon: string // Tipo como React.ReactNode, para receber um elemento React para o ícone
  className?: string // Para permitir estilos adicionais
}

export function InputWithIcon({
  type = 'text',
  placeholder,
  icon,
  className = '',
  ...props
}: InputWithIconProps) {
  const [showPassword, setShowPassword] = useState(false)

  // Função para alternar a visibilidade da senha
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div
      className={`flex items-center gap-2 border-b-[1px] border-[var(--gray-100)] px-[2px] py-3.5 focus-within:border-[var(--gray-400)] ${className}`}
    >
      <img src={icon} className="h-6 w-6 opacity-50" alt="Ícone" />
      <input
        type={type === 'password' && !showPassword ? 'password' : 'text'}
        placeholder={placeholder}
        className="flex-1 text-[var(--gray-400)] placeholder-[var(--gray-200)] focus:outline-none"
        {...props}
      />
      {type === 'password' && (
        <button type="button" onClick={togglePasswordVisibility}>
          <img
            className="h-6 w-6 opacity-90"
            src={showPassword ? viewIcon : viewOffIcon}
            alt={showPassword ? 'Esconder a senha' : 'Mostar a senha'}
          />
        </button>
      )}
    </div>
  )
}
