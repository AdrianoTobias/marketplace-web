import { useMutation } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import z from 'zod'

import { signUp } from '../../api/sign-up'
import { uploadAttachments } from '../../api/upload-attachments'
import accessIcon from '../../assets/icons/access.svg'
import arrowRightIconOrange from '../../assets/icons/arrow-right-orange.svg'
import arrowRightIconWhite from '../../assets/icons/arrow-right-white.svg'
import callIcon from '../../assets/icons/call.svg'
import mailIcon from '../../assets/icons/mail.svg'
import userIcon from '../../assets/icons/user.svg'
import { ImageUpload } from '../../components/imageUpload'
import { InputWithIcon } from '../../components/inputWithIcon'
import { Label } from '../../components/label'

const signUpForm = z.object({
  avatar: z.custom<FileList>(),
  fullname: z.string(),
  phone: z.string(),
  email: z.string().email(),
  password: z.string(),
  passwordConfirmation: z.string(),
})

type SignUpForm = z.infer<typeof signUpForm>

export function SignUp() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignUpForm>()

  const { mutateAsync: uploadAvatar } = useMutation({
    mutationFn: uploadAttachments,
  })

  const { mutateAsync: signUpFn } = useMutation({
    mutationFn: signUp,
  })

  async function handleSignUp(data: SignUpForm) {
    try {
      let attachmentId = null

      if (data.avatar?.length) {
        const files = new FormData()
        files.append('files', data.avatar[0])

        const uploadedAvatar = await uploadAvatar({ files })

        attachmentId = uploadedAvatar?.attachments[0]?.id

        if (!attachmentId) throw new Error()
      }

      await signUpFn({
        name: data.fullname,
        phone: data.phone,
        email: data.email,
        avatarId: attachmentId,
        password: data.password,
        passwordConfirmation: data.passwordConfirmation,
      })

      toast.success('Cadastro realizado com sucesso!', {
        action: {
          label: 'Login',
          onClick: () => navigate(`/sign-in?email=${data.email}`),
        },
      })
    } catch (error) {
      toast.error('Erro ao cadastrar.')
    }
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

              <div className="h-[120px] w-[120px] ">
                <ImageUpload
                  id="avatar"
                  accept=".png"
                  register={register('avatar')}
                />
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
                <Label htmlFor="email">E-mail</Label>
                <InputWithIcon
                  icon={mailIcon}
                  id="email"
                  placeholder="Seu e-mail cadastrado"
                  {...register('email')}
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
                <Label htmlFor="passwordConfirmation">Confirmar senha</Label>
                <InputWithIcon
                  icon={accessIcon}
                  id="passwordConfirmation"
                  placeholder="Confirme a senha"
                  type="password"
                  {...register('passwordConfirmation')}
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
