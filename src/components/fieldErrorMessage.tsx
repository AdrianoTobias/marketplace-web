import informationCircleRedIcon from '../assets/icons/information-circle-red.svg'

interface FieldErrorMessageProps {
  message: string | undefined
}

export function FieldErrorMessage({ message }: FieldErrorMessageProps) {
  if (!message) return null

  return (
    <span className="body-xs text-danger flex items-center gap-1 p-1">
      <img
        src={informationCircleRedIcon}
        className="h-4 w-4"
        alt="Íconde de informação"
      />
      {message}
    </span>
  )
}
