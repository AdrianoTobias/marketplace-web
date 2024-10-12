import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { z } from 'zod'

import saleTagIcon from '../../../assets/icons/sale-tag.svg'
import searchIcon from '../../../assets/icons/search.svg'
import productTestImage from '../../../assets/images/productTestImage.png'
import { CustomSelect } from '../../../components/customSelect'
import { InputWithIcon } from '../../../components/inputWithIcon'
import { ProductCard } from './productCard'

const productsForm = z.object({
  search: z.string(),
  status: z.string(),
})

export type ProductsForm = z.infer<typeof productsForm>

export function Products() {
  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<ProductsForm>({
    defaultValues: {
      status: '',
    },
  })

  const options = [
    { label: 'Opção 1', value: '1' },
    { label: 'Opção 2', value: '2' },
    { label: 'Opção 3', value: '3' },
  ]

  const products = {
    productId: '7895461237879',
    imageURL: productTestImage,
    title: 'Sofá',
    description:
      'Sofá revestido em couro legítimo, com estrutura em madeira maciça e pés em metal cromado.',
    priceInCents: 1200.9,
    status: 'Anunciado',
    category: 'Móvel',
  }

  async function handleApplyFilter(data: ProductsForm) {
    console.log(data)

    await new Promise((resolve) => setTimeout(resolve, 2000))
  }

  return (
    <>
      <Helmet title="Produtos" />

      <div className="mb-10 mt-16 flex flex-col gap-2">
        <h2 className="title-md text-[var(--gray-500)]">Seus produtos</h2>

        <p className="body-sm text-[var(--gray-300)]">
          Acesse gerencie a sua lista de produtos à venda
        </p>
      </div>

      <div className="flex gap-6">
        <div className="flex h-[306px] w-[327px] flex-col gap-6 rounded-[20px] bg-[var(--white)] p-6">
          <h3 className="title-sm text-[var(gray-300)]">Filtrar</h3>

          <form
            className="flex flex-col gap-10"
            onSubmit={handleSubmit(handleApplyFilter)}
          >
            <div className="flex flex-col gap-5">
              <InputWithIcon
                icon={searchIcon}
                id="search"
                placeholder="Pesquisar"
                {...register('search')}
              />

              <CustomSelect
                name="status"
                options={options}
                placeholder="Status"
                icon={saleTagIcon}
                control={control}
              />
            </div>

            <button
              type="submit"
              className={`action-md flex h-14 w-full items-center justify-center rounded-[.625rem] bg-[var(--orange-base)] px-4 text-[var(--white)] transition-colors duration-200
              ${isSubmitting ? 'cursor-not-allowed opacity-55' : 'hover:bg-[var(--orange-dark)]'}`}
              disabled={isSubmitting}
            >
              Aplicar filtro
            </button>
          </form>
        </div>

        <div className="flex w-[679px] flex-wrap gap-4">
          {Array.from({ length: 6 }).map((_, i) => {
            return (
              <Link to={`/products/edit/${i}`} key={i}>
                <ProductCard {...products} />
              </Link>
            )
          })}
        </div>
      </div>
    </>
  )
}
