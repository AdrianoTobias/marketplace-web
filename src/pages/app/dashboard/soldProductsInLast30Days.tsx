import { useQuery } from '@tanstack/react-query'

import { getSoldProductsInLast30Days } from '../../../api/get-sold-products-in-last-30-days'
import saleTagBlueIcon from '../../../assets//icons/sale-tag-blue.svg'
import { MetricCard } from './metricCard'

export function SoldProductsInLast30Days() {
  const { data: soldProducts, isLoading: isLoadingSoldProducts } = useQuery({
    queryKey: ['metrics', 'sold-products-in-last-30-days'],
    queryFn: getSoldProductsInLast30Days,
    staleTime: Infinity,
  })

  return (
    <MetricCard
      icon={saleTagBlueIcon}
      amount={soldProducts?.amount}
      metric="Produtos vendidos"
      isLoading={isLoadingSoldProducts}
    />
  )
}
