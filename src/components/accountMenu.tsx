import { useState } from 'react'

import logoutIcon from '../assets/icons/logout.svg'

interface AccountMenuProps {
  imageUrl: string
  name: string
}

export function AccountMenu({ imageUrl, name }: AccountMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleAccountMenu = () => {
    setIsOpen((prev) => !prev)
  }

  return (
    <div className="relative">
      <div onClick={toggleAccountMenu} className="fcursor-pointer">
        <img
          src={imageUrl}
          className="h-12 w-12 cursor-pointer rounded-[10px]"
          alt="Imagem do usuário"
        />
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-3 flex w-[168px] flex-col gap-5 rounded-[12px] bg-white p-4 shadow-lg">
          <div className="flex items-center gap-3">
            <img
              src={imageUrl}
              alt="Imagem do usuário"
              className="h-8 w-8 rounded-lg border border-[var(--shape)]"
            />

            <p className="body-sm text-[var(--gray-300)]">{name}</p>
          </div>

          <div className="border-t border-[var(--shape)]"></div>

          <button className="flex items-center justify-between  p-0.5 text-[var(--orange-base)] transition-colors duration-200 hover:text-[var(--orange-dark)]">
            <p className="action-sm">Sair</p>

            <img src={logoutIcon} className="h-5 w-5" alt="Ícone de logout" />
          </button>
        </div>
      )}
    </div>
  )
}
