import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useParams } from 'react-router-dom'
import { z } from 'zod'

import arrowLeftOrangeIcon from '../../../assets/icons/arrow-left-orange.svg'
import realCurrencyIcon from '../../../assets/icons/real-currency-orange.svg'
import tickIcon from '../../../assets/icons/tick.svg'
import unavailableIcon from '../../../assets/icons/unavailable.svg'
import productTestImage2 from '../../../assets/images/productTestImage2.png'
import { CustomSelect } from '../../../components/customSelect'
import { CustomTextarea } from '../../../components/customTextarea'
import { InputWithIcon } from '../../../components/inputWithIcon'
import { Label } from '../../../components/label'
import { Tag } from './tag'

const editProductForm = z.object({
  title: z.string(),
  amount: z.number(),
  description: z.string(),
  category: z.string(),
})

export type EditProductForm = z.infer<typeof editProductForm>

const options = [
  { label: 'Opção 1', value: '1' },
  { label: 'Opção 2', value: '2' },
  { label: 'Opção 3', value: '3' },
]

export function EditProduct() {
  const { id } = useParams()

  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<EditProductForm>({
    defaultValues: {
      category: '',
    },
  })

  async function handleEditProduct(data: EditProductForm) {
    console.log(data)
    console.log(id)

    await new Promise((resolve) => setTimeout(resolve, 2000))
  }

  return (
    <>
      <Helmet title="Edição de Produto" />

      <div className="mb-10 mt-8 flex">
        <div className="flex flex-col gap-2">
          <Link
            to="/products"
            className="action-md flex items-center gap-2 p-0.5 text-[var(--orange-base)] hover:text-[var(--orange-dark)]"
          >
            <img
              src={arrowLeftOrangeIcon}
              className="h-5 w-5"
              alt="Ícone de seta para a esquerda"
            />
            Voltar
          </Link>

          <h2 className="title-md text-[var(--gray-500)]">Editar produto</h2>

          <p className="body-sm text-[var(--gray-300)]">
            Gerencie as informações do produto cadastrado
          </p>
        </div>

        <div className="action-sm ml-auto flex items-end gap-4 pr-3 text-[var(--orange-base)]">
          <button className="flex items-end gap-2 p-0.5 hover:text-[var(--orange-dark)]">
            <img src={tickIcon} className="h-5 w-5" alt="Íconde de ticado" />
            Marcar como vendido
          </button>

          <button className="flex items-end gap-2 p-0.5 hover:text-[var(--orange-dark)]">
            <img
              src={unavailableIcon}
              className="h-5 w-5"
              alt="Íconde de indisponível"
            />
            Desativar anúncio
          </button>
        </div>
      </div>

      <div className="flex gap-6">
        <div className="h-[340px] w-[415px] rounded-[20]">
          <img
            src={productTestImage2}
            alt="Imagem do produto"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex w-[591px] flex-col gap-6 rounded-[20px] bg-white p-6">
          <div className="flex items-center justify-between">
            <p className="title-sm text-[var(--gray-300)]">Dados do produto</p>

            <Tag bgColor="var(--blue-dark)" textColor="var(--white)">
              anunciado
            </Tag>
          </div>

          <form
            className="flex flex-col gap-10"
            onSubmit={handleSubmit(handleEditProduct)}
          >
            <div className="flex flex-col gap-5">
              <div className="flex gap-5">
                <div className="w-[323px]">
                  <Label htmlFor="title">Título</Label>
                  <InputWithIcon
                    id="title"
                    placeholder="Nome do produto"
                    {...register('title')}
                  />
                </div>

                <div>
                  <Label htmlFor="amount">Valor</Label>
                  <InputWithIcon
                    icon={realCurrencyIcon}
                    id="amount"
                    placeholder="0,00"
                    {...register('amount')}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Descrição</Label>
                <CustomTextarea
                  rows={4}
                  placeholder="Escreva detalhes sobre o produto, tamanho e características"
                  register={register('description')}
                />
              </div>

              <div>
                <Label htmlFor="category">Categoria</Label>
                <CustomSelect
                  name="category"
                  options={options}
                  placeholder="Selecione"
                  control={control}
                />
              </div>
            </div>

            <div className="flex h-12 gap-3">
              <Link to="/products" className="flex h-full w-full">
                <button
                  className={`action-md flex w-full items-center justify-center rounded-[.625rem] border border-[var(--orange-base)] bg-white px-4 text-[var(--orange-base)] transition-colors duration-200 
                    ${isSubmitting ? 'cursor-not-allowed opacity-55' : 'hover:border-[var(--orange-dark)] hover:text-[var(--orange-dark)]'}
                    `}
                  disabled={isSubmitting}
                >
                  Cancelar
                </button>
              </Link>

              <button
                type="submit"
                className={`action-md flex h-full w-full items-center justify-center rounded-[.625rem] bg-[var(--orange-base)] px-4 text-[var(--white)] transition-colors duration-200
                    ${isSubmitting ? 'cursor-not-allowed opacity-55' : 'hover:bg-[var(--orange-dark)]'}
                `}
                disabled={isSubmitting}
              >
                Salvar e atualizar
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
