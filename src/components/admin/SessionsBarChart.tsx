import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface SessionsBarChartProps {
  data: Array<{
    month: string
    sessions: number
    confirmed: number
    cancelled: number
  }>
}

export default function SessionsBarChart({ data }: SessionsBarChartProps) {
  const chartData = data.map((item) => ({
    month: new Date(item.month).toLocaleDateString('fr-FR', { month: 'short' }),
    sessions: item.sessions,
    confirmées: item.confirmed,
    annulées: item.cancelled,
  }))

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
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
        />
        <Legend
          wrapperStyle={{ color: '#a1a1aa' }}
        />
        <Bar dataKey="confirmées" fill="#22c55e" name="Confirmées" radius={[4, 4, 0, 0]} />
        <Bar dataKey="annulées" fill="#ef4444" name="Annulées" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

