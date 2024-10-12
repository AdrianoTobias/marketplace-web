import { Tag } from './tag'

interface ProductCardProps {
  imageURL: string
  title: string
  description: string
  priceInCents: number
  status: string
  category: string
}

export function ProductCard({
  imageURL,
  title,
  description,
  priceInCents,
  status,
  category,
}: ProductCardProps) {
  return (
    <div className="relative flex w-[331px] cursor-pointer flex-col gap-1 rounded-[20px] border-2 border-transparent bg-white p-1 hover:border-[var(--blue-base)]">
      <div className="h-36">
        <img
          src={imageURL}
          className="h-full w-full rounded-2xl object-cover"
          alt="Imagem do produto"
        />
      </div>

      <div className="flex h-[94px] flex-col gap-2 px-3 pb-4 pt-3">
        <div className="flex items-center justify-between gap-4">
          <div className="subtitle text-[var(--gray-400)]">
            <p>{title}</p>
          </div>

          <div className="flex gap-1 text-[var(--gray-500)]">
            <span className="label-md mt-1">R$</span>
            <p className="title-sm">{priceInCents}</p>
          </div>
        </div>

        <p className="body-sm truncate-multiline h-full text-[var(--gray-300)]">
          {description}
        </p>
      </div>

      <div className="end absolute right-3 top-3 flex h-5 gap-1">
        <Tag bgColor="var(--blue-dark)" textColor="var(--white)">
          {status}
        </Tag>

        <Tag bgColor="var(--gray-400)" textColor="var(--white)">
          {category}
        </Tag>
      </div>
    </div>
  )
}
