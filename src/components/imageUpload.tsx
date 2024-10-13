import { useState } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'

import imageUploadIcon from '../assets/icons/image-upload.svg'

interface ImageUploadProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string
  register: UseFormRegisterReturn
}

export function ImageUpload({
  placeholder,
  register,
  ...props
}: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null)

  function handleChangeFile(imagePreviewUrl: string) {
    setPreview(imagePreviewUrl)
  }

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-xl bg-[var(--shape)]">
      <input
        type="file"
        className="absolute inset-0 cursor-pointer opacity-0"
        {...props}
        {...register}
        onChange={(e) => {
          const file = e.target.files ? e.target.files[0] : null
          if (file) {
            const imagePreviewUrl = URL.createObjectURL(file)
            handleChangeFile(imagePreviewUrl)
          }
        }}
      />

      {preview ? (
        <img
          src={preview}
          className="h-full w-full object-cover"
          alt="Preview da imagem"
        />
      ) : (
        <div className="flex max-w-[159px] flex-col items-center justify-center gap-4">
          <img
            src={imageUploadIcon}
            className="h-8 w-8"
            alt="Ícone de upload de imagem"
          />

          {placeholder && (
            <p className="body-sm text-center text-[var(--gray-300)]">
              {placeholder}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
