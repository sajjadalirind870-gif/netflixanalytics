import { useState } from 'react'
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Globe2 } from 'lucide-react'
import PageHeader from '../components/common/PageHeader'
import Table from '../components/common/Table'
import Card from '../components/ui/Card'
import EmptyState from '../components/ui/EmptyState'
import RegionPieChart from '../components/charts/RegionPieChart'
import { regionalData } from '../data/netflixData'

const frame = 'rounded-xl border border-[#2F2F2F] bg-[#181818] p-5'
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
export default function Regions() {
  const [selected, setSelected] = useState('All regions')
  const data = selected === 'All regions' ? regionalData : regionalData.filter((item) => item.region === selected)
  const columns = [{ key: 'region', label: 'Region', render: (value) => <span className="font-medium text-white">{value}</span> }, { key: 'users', label: 'Subscribers', render: (value) => `${value}M` }, { key: 'revenue', label: 'Revenue', render: (value) => `$${value.toFixed(1)}B` }, { key: 'arpu', label: 'ARPU', render: (value) => `$${value.toFixed(2)}` }, { key: 'share', label: 'Audience share', render: (_, row) => { const pct = Math.round(row.users / regionalData.reduce((sum, entry) => sum + entry.users, 0) * 100); return <div className="flex items-center gap-2"><div className="h-1.5 w-20 rounded-full bg-[#2F2F2F]"><div className="h-full rounded-full bg-[#E50914]" style={{ width: `${pct}%` }} /></div><span>{pct}%</span></div> } }]
  return <div className="mx-auto max-w-375"><PageHeader title="Regional performance" description="Compare audience scale and revenue efficiency across markets." eyebrow="GLOBAL REACH" /><div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3"><Card title="Markets represented" value="190+" icon={Globe2} subtitle="Countries and territories" /><Card title="Largest audience" value="Europe" icon={Globe2} subtitle="78M subscribers" /><Card title="Highest ARPU" value="$14.20" icon={Globe2} subtitle="US & Canada" /></div>
    <div className="mb-6 grid grid-cols-1 gap-5 xl:grid-cols-2"><section className={frame}><div className="mb-3 flex items-center justify-between"><h2 className="font-semibold text-white">Subscribers by region</h2><span className="text-xs text-gray-500">MILLIONS</span></div><RegionPieChart data={data} /></section><section className={frame}><div className="mb-3 flex items-center justify-between"><h2 className="font-semibold text-white">Revenue by region</h2><span className="text-xs text-gray-500">USD · BILLIONS</span></div><ResponsiveContainer width="100%" height={300}><BarChart data={data} margin={{ top: 10, right: 10, left: -16, bottom: 0 }}><CartesianGrid strokeDasharray="3 3" stroke="#2F2F2F" vertical={false} /><XAxis dataKey="region" stroke="#808080" tick={{ fill: '#808080', fontSize: 12 }} axisLine={{ stroke: '#2F2F2F' }} tickLine={{ stroke: '#2F2F2F' }} interval={0} /><YAxis stroke="#808080" tick={{ fill: '#808080', fontSize: 12 }} axisLine={{ stroke: '#2F2F2F' }} tickLine={{ stroke: '#2F2F2F' }} tickFormatter={(value) => `$${value}B`} /><Tooltip {...tooltip} formatter={(value) => [`$${value}B`, 'Revenue']} /><Bar dataKey="revenue" fill="#E50914" radius={[4, 4, 0, 0]} maxBarSize={44} /></BarChart></ResponsiveContainer></section></div>
    <section className="overflow-hidden rounded-xl border border-[#2F2F2F] bg-[#181818]"><div className="flex items-center justify-between border-b border-[#2F2F2F] px-5 py-4"><div><h2 className="font-semibold text-white">Regional breakdown</h2><p className="mt-1 text-xs text-gray-500">Performance by operating region</p></div><select value={selected} onChange={(event) => setSelected(event.target.value)} className="rounded-lg border border-[#2F2F2F] bg-[#141414] px-3 py-2 text-xs text-gray-300 outline-none"><option>All regions</option>{regionalData.map((entry) => <option key={entry.region}>{entry.region}</option>)}</select></div><Table columns={columns} rows={data} rowKey="region" empty={<EmptyState icon={Globe2} />} /></section>
  </div>
}
