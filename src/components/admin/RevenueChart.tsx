import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface RevenueChartProps {
  data: Array<{
    month: string
    revenue: number
    sessions: number
  }>
}

export default function RevenueChart({ data }: RevenueChartProps) {
  // Formater les données pour Recharts
  const chartData = data.map((item) => ({
    month: new Date(item.month).toLocaleDateString('fr-FR', { month: 'short' }),
    revenue: Math.round(item.revenue),
    sessions: item.sessions,
  }))

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" />
        <XAxis
          dataKey="month"
          stroke="#a1a1aa"
          style={{ fontSize: '12px' }}
        />
        <YAxis
          stroke="#a1a1aa"
          style={{ fontSize: '12px' }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: '#18181b',
            border: '1px solid #3f3f46',
            borderRadius: '8px',
            color: '#fff',
          }}
          formatter={(value: number | string | undefined, name: string) => {
            const numericValue = typeof value === 'number' ? value : 0
            if (name === 'revenue') {
              return [`${numericValue.toFixed(2)} €`, 'Revenus']
            }
            return [numericValue, 'Séances']
          }}
        />
        <Legend
          wrapperStyle={{ color: '#a1a1aa' }}
          iconType="line"
        />
        <Line
          type="monotone"
          dataKey="revenue"
          stroke="#f97316"
          strokeWidth={2}
          dot={{ fill: '#f97316', r: 4 }}
          name="Revenus (€)"
        />
        <Line
          type="monotone"
          dataKey="sessions"
          stroke="#3b82f6"
          strokeWidth={2}
          dot={{ fill: '#3b82f6', r: 4 }}
          name="Séances"
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

