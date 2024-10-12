import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useParams } from 'react-router-dom'
import { z } from 'zod'

import imageUploadIcon from '../../../assets/icons/image-upload.svg'
import realCurrencyIcon from '../../../assets/icons/real-currency-orange.svg'
import { CustomSelect } from '../../../components/customSelect'
import { CustomTextarea } from '../../../components/customTextarea'
import { InputWithIcon } from '../../../components/inputWithIcon'
import { Label } from '../../../components/label'

const addProductForm = z.object({
  title: z.string(),
  amount: z.number(),
  description: z.string(),
  category: z.string(),
})

export type AddProductForm = z.infer<typeof addProductForm>

const options = [
  { label: 'Opção 1', value: '1' },
  { label: 'Opção 2', value: '2' },
  { label: 'Opção 3', value: '3' },
]

export function AddProduct() {
  const { id } = useParams()

  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<AddProductForm>({
    defaultValues: {
      category: '',
    },
  })

  async function handleAddProduct(data: AddProductForm) {
    console.log(data)
    console.log(id)

    await new Promise((resolve) => setTimeout(resolve, 2000))
  }

  return (
    <>
      <Helmet title="Cadastro de Produto" />

      <div className="mb-10 mt-16 flex flex-col gap-2">
        <h2 className="title-md text-[var(--gray-500)]">Novo produto</h2>

        <p className="body-sm text-[var(--gray-300)]">
          Cadastre um produto para venda no Marketplace
        </p>
      </div>

      <div className="flex gap-6">
        <div className="flex h-[340px] w-[415px] cursor-pointer items-center justify-center rounded-[20px] bg-[var(--shape)]">
          <div className="flex w-[159px] flex-col items-center justify-center gap-4">
            <img src={imageUploadIcon} className="h-10 w-10" alt="" />

            <p className="body-sm text-center text-[var(--gray-300)]">
              Selecione a imagem do produto
            </p>
          </div>
        </div>

        <div className="flex w-[591px] flex-col gap-6 rounded-[20px] bg-white p-6">
          <p className="title-sm text-[var(--gray-300)]">Dados do produto</p>

          <form
            className="flex flex-col gap-10"
            onSubmit={handleSubmit(handleAddProduct)}
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
                Salvar e publicar
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
