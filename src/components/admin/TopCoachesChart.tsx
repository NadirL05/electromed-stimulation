import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface TopCoachesChartProps {
  data: Array<{
    name: string
    sessions: number
    rating: number
  }>
}

export default function TopCoachesChart({ data }: TopCoachesChartProps) {
  const chartData = data
    .sort((a, b) => b.sessions - a.sessions)
    .slice(0, 5)
    .map((coach) => ({
      name: coach.name.length > 15 ? coach.name.substring(0, 15) + '...' : coach.name,
      sessions: coach.sessions,
      rating: coach.rating,
    }))

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={chartData}
        layout="vertical"
        margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" />
        <XAxis type="number" stroke="#a1a1aa" style={{ fontSize: '12px' }} />
        <YAxis
          dataKey="name"
          type="category"
          stroke="#a1a1aa"
          style={{ fontSize: '12px' }}
          width={70}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: '#18181b',
            border: '1px solid #3f3f46',
            borderRadius: '8px',
            color: '#fff',
          }}
          formatter={(value: number) => [`${value} séances`, 'Séances']}
        />
        <Bar dataKey="sessions" fill="#f97316" radius={[0, 4, 4, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

