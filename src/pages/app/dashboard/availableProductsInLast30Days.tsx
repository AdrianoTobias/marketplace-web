import { useQuery } from '@tanstack/react-query'

import { getAvailableProductsInLast30Days } from '../../../api/get-available-products-in-last-30-days'
import storeIcon from '../../../assets//icons/store.svg'
import { MetricCard } from './metricCard'

export function AvailableProductsInLast30Days() {
  const { data: availableProducts, isLoading: isLoadingAvailableProducts } =
    useQuery({
      queryKey: ['metrics', 'available-roducts-in-last-30-days'],
      queryFn: getAvailableProductsInLast30Days,
      staleTime: Infinity,
    })

  return (
    <MetricCard
      icon={storeIcon}
      amount={availableProducts?.amount}
      metric="Produtos anunciados"
      isLoading={isLoadingAvailableProducts}
    />
  )
}
