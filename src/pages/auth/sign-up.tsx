import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import z from 'zod'

import accessIcon from '../../assets/icons/access.svg'
import arrowRightIconOrange from '../../assets/icons/arrow-right-orange.svg'
import arrowRightIconWhite from '../../assets/icons/arrow-right-white.svg'
import callIcon from '../../assets/icons/call.svg'
import ImageUploadIcon from '../../assets/icons/image-upload.svg'
import mailIcon from '../../assets/icons/mail.svg'
import userIcon from '../../assets/icons/user.svg'
import { InputWithIcon } from '../../components/inputWithIcon'
import { Label } from '../../components/label'

const signUpForm = z.object({
  fullname: z.string(),
  phone: z.string(),
  mail: z.string().email(),
  password: z.string(),
  confirmPassword: z.string(),
})

type SignUpForm = z.infer<typeof signUpForm>

export function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignUpForm>()

  async function handleSignUp(data: SignUpForm) {
    console.log(data)

    await new Promise((resolve) => setTimeout(resolve, 2000))
  }

  return (
    <>
      <Helmet title="Cadastro" />

      <div className="scrollbar flex h-full w-full flex-col gap-20 overflow-y-scroll rounded-[32px] bg-[var(--white)] px-20 py-[4.5rem]">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-2 ">
            <h2 className="title-md text-[var(--gray-500)]">Crie sua conta</h2>
            <p className="body-sm">Informe seus dados pessoais e de acesso </p>
          </div>

          <form className="space-y-12" onSubmit={handleSubmit(handleSignUp)}>
            <div className="space-y-5">
              <h3 className="title-sm text-[var(--gray-500)]">Perfil</h3>

              <div className="flex h-[120px] w-[120px] items-center justify-center rounded-xl bg-[var(--shape)] ">
                <img src={ImageUploadIcon} className="h-8 w-8" alt="Imagem" />
              </div>

              <div className="flex flex-col">
                <Label htmlFor="fullname">Nome</Label>
                <InputWithIcon
                  icon={userIcon}
                  id="fullname"
                  placeholder="Seu nome completo"
                  {...register('fullname')}
                />
              </div>

              <div className="flex flex-col">
                <Label htmlFor="phone">Telefone</Label>
                <InputWithIcon
                  icon={callIcon}
                  id="phone"
                  placeholder="(00) 00000-0000"
                  {...register('phone')}
                />
              </div>
            </div>

            <div className="space-y-5">
              <h3 className="title-sm text-[var(--gray-500)]">Acesso</h3>

              <div className="flex flex-col">
                <Label htmlFor="mail">E-mail</Label>
                <InputWithIcon
                  icon={mailIcon}
                  id="mail"
                  placeholder="Seu e-mail cadastrado"
                  {...register('mail')}
                />
              </div>

              <div className="flex flex-col">
                <Label htmlFor="password">Senha</Label>
                <InputWithIcon
                  icon={accessIcon}
                  id="password"
                  placeholder="Sua senha de acesso"
                  type="password"
                  {...register('password')}
                />
              </div>

              <div className="flex flex-col">
                <Label htmlFor="confirmPassword">Confirmar senha</Label>
                <InputWithIcon
                  icon={accessIcon}
                  id="confirmPassword"
                  placeholder="Confirme a senha"
                  type="password"
                  {...register('confirmPassword')}
                />
              </div>
            </div>

            <button
              className={`mt-12 flex h-14 w-full items-center justify-between rounded-[.625rem] bg-[var(--orange-base)] px-5 text-[var(--white)] transition-colors duration-200
              ${isSubmitting ? 'cursor-not-allowed opacity-55' : 'hover:bg-[var(--orange-dark)]'}`}
              disabled={isSubmitting}
              type="submit"
            >
              <span className="action-md">Cadastrar</span>
              <img
                src={arrowRightIconWhite}
                className="h-6 w-6"
                alt="Seta para a direita"
              />
            </button>
          </form>
        </div>

        <div className="mt-auto space-y-5">
          <p className="body-md text-[var(--gray-300)]">Já tem uma conta?</p>

          <div>
            <Link to="/sign-in">
              <button
                className={`flex h-14 w-full items-center justify-between rounded-[.625rem] border-[1px] border-[var(--orange-base)] px-5 text-[var(--orange-base)] transition-colors duration-200                            
                ${isSubmitting ? 'cursor-not-allowed opacity-55' : 'hover:border-[var(--orange-dark)] hover:text-[var(--orange-dark)]'}`}
                disabled={isSubmitting}
              >
                <span className="action-md">Acessar</span>
                <img
                  src={arrowRightIconOrange}
                  className="h-6 w-6"
                  alt="Seta para a direita"
                />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
