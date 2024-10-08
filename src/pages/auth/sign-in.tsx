import { Helmet } from 'react-helmet-async'

import accessIcon from '../../assets/icons/access.svg'
import arrowRightIconOrange from '../../assets/icons/arrow-right-orange.svg'
import arrowRightIconWhite from '../../assets/icons/arrow-right-white.svg'
import mailIcon from '../../assets/icons/mail.svg'
import { InputWithIcon } from '../../components/inputWithIcon'
import { Label } from '../../components/label'

export function SignIn() {
  return (
    <>
      <Helmet title="Login" />

      <div className="h-full w-full rounded-[32px] bg-[var(--white)] px-20 py-[4.5rem]">
        <div className="flex h-full flex-col gap-12">
          <div className="flex flex-col gap-2 ">
            <h2 className="title-md">Acesse sua conta</h2>
            <p className="body-sm">Informe seu e-mail e senha para entrar</p>
          </div>

          <form className="flex flex-col gap-5">
            <div className="flex flex-col">
              <Label htmlFor="mail">E-mail</Label>
              <InputWithIcon
                icon={mailIcon}
                id="mail"
                placeholder="Seu e-mail cadastrado"
              />
            </div>

            <div className="flex flex-col">
              <Label htmlFor="password">Senha</Label>
              <InputWithIcon
                icon={accessIcon}
                id="password"
                placeholder="Sua senha de acesso"
                type="password"
              />
            </div>

            <button
              className="mt-12 flex h-14 w-full items-center justify-between rounded-[.625rem] bg-[var(--orange-base)] px-5 text-[var(--white)] transition-colors duration-200 hover:bg-[var(--orange-dark)]"
              type="submit"
            >
              <span className="action-md">Acessar</span>
              <img
                src={arrowRightIconWhite}
                className="h-6 w-6"
                alt="Seta para a direita"
              />
            </button>
          </form>

          <div className="mt-auto space-y-5">
            <p className="body-md text-[var(--gray-300)]">
              Ainda não tem uma conta?
            </p>
            <button className="flex h-14 w-full items-center justify-between rounded-[.625rem] border-[1px] border-[var(--orange-base)] px-5 text-[var(--orange-base)] transition-colors duration-200 hover:border-[var(--orange-dark)] hover:text-[var(--orange-dark)]">
              <span className="action-md">Acessar</span>
              <img
                src={arrowRightIconOrange}
                className="h-6 w-6"
                alt="Seta para a direita"
              />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
