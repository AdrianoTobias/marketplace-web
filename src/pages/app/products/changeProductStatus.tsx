import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import {
  changeProductStatus,
  ChangeProductStatusParams,
} from '../../../api/change-product-status'
import { GetProductByIdResponse } from '../../../api/get-product-by-id'
import { Status } from '../../../api/types/product'
import tickIcon from '../../../assets/icons/tick.svg'
import unavailableIcon from '../../../assets/icons/unavailable.svg'
import { Skeleton } from '../../../components/skeleton'
import { queryClient } from '../../../lib/react-query'

interface ChangeProductStatusProps {
  productId: string
  productStatus: keyof typeof Status | undefined
}

export function ChangeProductStatus({
  productId,
  productStatus,
}: ChangeProductStatusProps) {
  const {
    mutateAsync: changeProductStatusFn,
    isPending: isChangindProductStatus,
  } = useMutation({
    mutationFn: changeProductStatus,
    onSuccess(_, { id, status }) {
      const cached = queryClient.getQueryData<GetProductByIdResponse>([
        'get-product-by-id',
        id,
      ])

      if (cached) {
        queryClient.setQueryData<GetProductByIdResponse>(
          ['get-product-by-id', id],
          {
            product: { ...cached.product, status },
          },
        )
      }
    },
  })

  async function handleChangeProductStatus({
    id,
    status,
  }: ChangeProductStatusParams) {
    try {
      await changeProductStatusFn({ id, status })

      toast.success(`Status do produto alterado com sucesso!`)
    } catch (error) {
      toast.error('Erro ao alterar o status do produto.')
    }
  }

  return (
    <div className="text-orange-base flex gap-4">
      {productStatus === 'available' ? (
        <>
          <button
            className={`action-sm flex items-end gap-2 p-0.5
                  ${
                    isChangindProductStatus
                      ? 'opacity-55'
                      : 'hover:text-orange-dark'
                  }`}
            disabled={isChangindProductStatus}
            onClick={() =>
              handleChangeProductStatus({ id: productId, status: 'sold' })
            }
          >
            <img src={tickIcon} className="h-5 w-5" alt="Íconde de ticado" />
            Marcar como vendido
          </button>

          <button
            className={`action-sm flex items-end gap-2 p-0.5
                  ${
                    isChangindProductStatus
                      ? 'opacity-55'
                      : 'hover:text-orange-dark'
                  }`}
            disabled={isChangindProductStatus}
            onClick={() =>
              handleChangeProductStatus({ id: productId, status: 'cancelled' })
            }
          >
            <img
              src={unavailableIcon}
              className="h-5 w-5"
              alt="Íconde de indisponível"
            />
            Desativar anúncio
          </button>
        </>
      ) : productStatus === 'sold' ? (
        <>
          <button
            className={`action-sm flex items-end gap-2 p-0.5
                  ${
                    isChangindProductStatus
                      ? 'opacity-55'
                      : 'hover:text-orange-dark'
                  }`}
            disabled={isChangindProductStatus}
            onClick={() =>
              handleChangeProductStatus({ id: productId, status: 'available' })
            }
          >
            <img src={tickIcon} className="h-5 w-5" alt="Íconde de ticado" />
            Marcar como disponível
          </button>

          <button
            className="action-sm flex items-end gap-2 p-0.5 opacity-55"
            disabled
          >
            <img
              src={unavailableIcon}
              className="h-5 w-5"
              alt="Íconde de indisponível"
            />
            Produto vendiddo
          </button>
        </>
      ) : productStatus === 'cancelled' ? (
        <>
          <button
            className={`action-sm flex items-end gap-2 p-0.5
                  ${
                    isChangindProductStatus
                      ? 'opacity-55'
                      : 'hover:text-orange-dark'
                  }`}
            disabled={isChangindProductStatus}
            onClick={() =>
              handleChangeProductStatus({ id: productId, status: 'available' })
            }
          >
            <img src={tickIcon} className="h-5 w-5" alt="Íconde de ticado" />
            Reativar produto
          </button>

          <button
            className="action-sm flex items-end gap-2 p-0.5 opacity-55"
            disabled
          >
            <img
              src={unavailableIcon}
              className="h-5 w-5"
              alt="Íconde de indisponível"
            />
            Produto desabilitado
          </button>
        </>
      ) : (
        <>
          <Skeleton className="h-6 w-[170px] rounded-xl" />
          <Skeleton className="h-6 w-[170px] rounded-xl" />
        </>
      )}
    </div>
  )
}
