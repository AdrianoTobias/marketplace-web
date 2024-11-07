import React from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'

interface CustomTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  placeholder?: string
  register: UseFormRegisterReturn
}

export function CustomTextarea({
  placeholder = '',
  register,
  ...props
}: CustomTextareaProps) {
  return (
    <div className="border-b-[1px] border-gray-100 px-0.5 py-3.5 focus-within:border-gray-400">
      <textarea
        placeholder={placeholder}
        className="utline-none body-md w-full flex-1 text-gray-400 placeholder-gray-200 focus:outline-none"
        {...props}
        {...register}
      />
    </div>
  )
}
