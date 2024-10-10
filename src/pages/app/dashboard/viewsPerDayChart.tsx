import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from 'recharts'

import calendarIcon from '../../../assets//icons/calendar.svg'
import userMultipleIcon from '../../../assets//icons/user-multiple.svg'

interface DataProps {
  date: string
  amount: number
}

const data: DataProps[] = [
  { date: '26', amount: 1200 },
  { date: '27', amount: 800 },
  { date: '28', amount: 900 },
  { date: '29', amount: 400 },
  { date: '30', amount: 2300 },
  { date: '01', amount: 1000 },
  { date: '02', amount: 1050 },
  { date: '03', amount: 2000 },
  { date: '04', amount: 300 },
  { date: '05', amount: 200 },
  { date: '06', amount: 220 },
  { date: '07', amount: 220 },
  { date: '08', amount: 712 },
  { date: '09', amount: 120 },
  { date: '10', amount: 1200 },
  { date: '11', amount: 800 },
  { date: '12', amount: 900 },
  { date: '13', amount: 400 },
  { date: '14', amount: 2300 },
  { date: '15', amount: 800 },
  { date: '16', amount: 640 },
  { date: '17', amount: 1200 },
  { date: '18', amount: 800 },
  { date: '19', amount: 900 },
  { date: '20', amount: 400 },
  { date: '21', amount: 2300 },
  { date: '22', amount: 800 },
  { date: '23', amount: 640 },
  { date: '24', amount: 400 },
  { date: '25', amount: 2300 },
]

const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="box-shadow flex w-[146px] flex-col gap-2 rounded-lg p-3">
        <p className="label-sm text-[var(--gray-400)]">{`${label} de julho`}</p>

        <div className="flex items-center gap-2">
          <img
            src={userMultipleIcon}
            className="h-4 w-4"
            alt="Ícone de múltiplos usuários"
          />

          <p className="body-xs text-[var(--gray-300)]">
            {payload[0].value} visitantes
          </p>
        </div>
      </div>
    )
  }

  return null
}

export function ViewsPerDayChart() {
  return (
    <div className="flex h-full flex-col gap-7">
      <div className="flex items-center justify-between">
        <h2 className="title-sm text-[var(--gray-500)]">Visitantes</h2>

        <div className="flex items-center justify-center gap-2">
          <img
            src={calendarIcon}
            className="h-4 w-4"
            alt="Íconde de um calendário"
          />

          <span className="label-sm text-[var(--gray-300)]">
            26 de junho - 25 de julho
          </span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} style={{ fontSize: 12 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            stroke="#949494"
            dataKey="date"
            axisLine={false}
            tickLine={false}
            dy={18}
          />
          <YAxis
            stroke="#949494"
            axisLine={false}
            tickLine={false}
            width={30}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            stroke="#5EC5FD"
            type="natural"
            strokeWidth={2}
            dataKey="amount"
            activeDot={{ r: 5 }}
            // dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
