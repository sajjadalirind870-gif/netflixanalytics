import { useMemo, useState } from 'react'
import { Banknote, DollarSign, TrendingUp, Wallet } from 'lucide-react'
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import PageHeader from '../components/common/PageHeader'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import RevenueAreaChart from '../components/charts/RevenueAreaChart'
import { regionalData, planData, revenueData, kpis } from '../data/netflixData'
import { formatCurrency } from '../utils/format'

const chartFrame = 'rounded-xl border border-[#2F2F2F] bg-[#181818] p-5'
const tooltip = {
  contentStyle: {
    backgroundColor: '#181818',
    border: '1px solid #2F2F2F',
    borderRadius: '8px',
    color: '#FFFFFF',
    boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
  },
  labelStyle: { color: '#FFFFFF', fontWeight: 600, marginBottom: '4px' },
  itemStyle: { color: '#FFFFFF' },
  cursor: { fill: 'rgba(229, 9, 20, 0.1)' },
  wrapperStyle: { zIndex: 1000 },
}
export default function Revenue() {
  const [range, setRange] = useState(12)
  const monthly = useMemo(() => revenueData.slice(-range), [range])
  const metrics = [
    { title: 'Total revenue', value: formatCurrency(kpis.monthlyRevenue * 12), change: 8.2, icon: DollarSign, subtitle: 'Trailing twelve months' },
    { title: 'Monthly recurring revenue', value: formatCurrency(kpis.monthlyRevenue), change: 6.4, icon: Banknote, subtitle: 'Current run rate' },
    { title: 'Average revenue per user', value: `$${kpis.arpu}`, change: 3.4, icon: TrendingUp, subtitle: 'Global blended ARPU' },
    { title: 'Lifetime value', value: '$552', change: 4.8, icon: Wallet, subtitle: 'Estimated member LTV' },
  ]
  return (
    <div className="mx-auto max-w-375">
      <PageHeader title="Revenue performance" description="Track recurring revenue, plan mix, and regional yield." eyebrow="FINANCIAL PERFORMANCE" action={<div className="flex rounded-lg border border-[#2F2F2F] bg-[#181818] p-1">{[3, 6, 12].map((months) => <Button key={months} size="sm" variant={range === months ? 'primary' : 'ghost'} onClick={() => setRange(months)}>{months}M</Button>)}</div>} />
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">{metrics.map((metric) => <Card key={metric.title} {...metric} />)}</div>
      <div className="mb-6 grid grid-cols-1 gap-5 xl:grid-cols-2">
        <section className={chartFrame}>
          <div className="mb-4 flex items-center justify-between"><h2 className="font-semibold text-white">Revenue by plan</h2><span className="text-xs text-gray-500">USD · BILLIONS</span></div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={planData} margin={{ top: 8, right: 8, left: -15, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2F2F2F" vertical={false} />
              <XAxis dataKey="plan" stroke="#808080" tick={{ fill: '#808080', fontSize: 12 }} axisLine={{ stroke: '#2F2F2F' }} tickLine={{ stroke: '#2F2F2F' }} />
              <YAxis stroke="#808080" tick={{ fill: '#808080', fontSize: 12 }} axisLine={{ stroke: '#2F2F2F' }} tickLine={{ stroke: '#2F2F2F' }} tickFormatter={(value) => `$${value}B`} />
              <Tooltip {...tooltip} formatter={(value) => [`$${value}B`, 'Revenue']} />
              <Bar dataKey="revenue" fill="#E50914" radius={[4, 4, 0, 0]} maxBarSize={56} />
            </BarChart>
          </ResponsiveContainer>
        </section>
        <section className={chartFrame}>
          <div className="mb-4 flex items-center justify-between"><h2 className="font-semibold text-white">Revenue by region</h2><span className="text-xs text-gray-500">USD · BILLIONS</span></div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={regionalData} layout="vertical" margin={{ top: 8, right: 12, left: 15, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2F2F2F" vertical={false} />
              <XAxis type="number" stroke="#808080" tick={{ fill: '#808080', fontSize: 12 }} axisLine={{ stroke: '#2F2F2F' }} tickLine={{ stroke: '#2F2F2F' }} tickFormatter={(value) => `$${value}B`} />
              <YAxis type="category" dataKey="region" width={95} stroke="#808080" tick={{ fill: '#808080', fontSize: 12 }} axisLine={{ stroke: '#2F2F2F' }} tickLine={{ stroke: '#2F2F2F' }} />
              <Tooltip {...tooltip} formatter={(value) => [`$${value}B`, 'Revenue']} />
              <Bar dataKey="revenue" fill="#E50914" radius={[4, 4, 0, 0]} maxBarSize={30} />
            </BarChart>
          </ResponsiveContainer>
        </section>
      </div>
      <section className={chartFrame}><div className="mb-4 flex items-center justify-between"><h2 className="font-semibold text-white">Monthly revenue</h2><span className="text-xs text-gray-500">LAST {range} MONTHS · USD BILLIONS</span></div><RevenueAreaChart data={monthly} /></section>
    </div>
  )
}
