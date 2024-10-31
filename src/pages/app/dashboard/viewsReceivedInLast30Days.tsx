import { useQuery } from '@tanstack/react-query'

import { getViewsReceivedInLast30Days } from '../../../api/views-received-in-last-30-days'
import userMultipleIcon from '../../../assets//icons/user-multiple.svg'
import { MetricCard } from './metricCard'

export function ViewsReceivedInLast30Days() {
  const { data: viewsReceived, isLoading: isLoadingViewsReceived } = useQuery({
    queryKey: ['mretics', 'views-received-in-last-30-days'],
    queryFn: getViewsReceivedInLast30Days,
  })

  return (
    <MetricCard
      icon={userMultipleIcon}
      amount={viewsReceived?.amount}
      metric="Pessoas visitantes"
      isLoading={isLoadingViewsReceived}
    />
  )
}
