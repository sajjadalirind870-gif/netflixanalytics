import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Activity } from 'lucide-react'
import PageHeader from '../components/common/PageHeader'
import Card from '../components/ui/Card'
import Table from '../components/common/Table'
import { kpis } from '../data/netflixData'

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
const daily = [{ day: 'Mon', dau: 38, duration: 42 }, { day: 'Tue', dau: 40, duration: 45 }, { day: 'Wed', dau: 39, duration: 44 }, { day: 'Thu', dau: 42, duration: 48 }, { day: 'Fri', dau: 48, duration: 56 }, { day: 'Sat', dau: 55, duration: 64 }, { day: 'Sun', dau: 52, duration: 61 }]
const cohorts = [{ cohort: 'Jan 2025', week0: 100, week1: 68, week2: 55, week4: 42, week8: 34 }, { cohort: 'Feb 2025', week0: 100, week1: 71, week2: 59, week4: 45, week8: 36 }, { cohort: 'Mar 2025', week0: 100, week1: 69, week2: 57, week4: 43, week8: '—' }, { cohort: 'Apr 2025', week0: 100, week1: 73, week2: 61, week4: '—', week8: '—' }]
export default function Engagement() {
  const columns = [{ key: 'cohort', label: 'Signup cohort', render: (value) => <span className="font-medium text-white">{value}</span> }, ...['week0', 'week1', 'week2', 'week4', 'week8'].map((week) => ({ key: week, label: week.replace('week', 'Week '), render: (value) => value === '—' ? <span className="text-gray-600">—</span> : <span className={value >= 60 ? 'text-[#46D369]' : 'text-gray-300'}>{value}%</span> }))]
  return <div className="mx-auto max-w-375"><PageHeader title="Member engagement" description="Monitor viewing frequency, session depth, and cohort retention." eyebrow="VIEWING BEHAVIOR" /><div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3"><Card title="DAU / MAU" value={`${kpis.dauMau}%`} change={2.1} icon={Activity} subtitle="Daily audience / monthly audience" /><Card title="Avg. session" value="48 min" change={5.2} icon={Activity} subtitle="Per active viewing session" /><Card title="Weekly active" value="152M" change={4.3} icon={Activity} subtitle="Unique members this week" /></div>
    <div className="mb-6 grid grid-cols-1 gap-5 xl:grid-cols-2"><section className={frame}><div className="mb-3 flex items-center justify-between"><h2 className="font-semibold text-white">DAU / MAU trend</h2><span className="text-xs text-gray-500">DAILY AUDIENCE · MILLIONS</span></div><ResponsiveContainer width="100%" height={290}><LineChart data={daily} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}><CartesianGrid strokeDasharray="3 3" stroke="#2F2F2F" vertical={false} /><XAxis dataKey="day" stroke="#808080" tick={{ fill: '#808080', fontSize: 12 }} axisLine={{ stroke: '#2F2F2F' }} tickLine={{ stroke: '#2F2F2F' }} /><YAxis stroke="#808080" tick={{ fill: '#808080', fontSize: 12 }} axisLine={{ stroke: '#2F2F2F' }} tickLine={{ stroke: '#2F2F2F' }} /><Tooltip {...tooltip} formatter={(value) => [`${value}M`, 'Daily active']} /><Line type="monotone" dataKey="dau" stroke="#E50914" strokeWidth={2} dot={{ fill: '#E50914', stroke: '#181818', strokeWidth: 2, r: 4 }} activeDot={{ r: 6, fill: '#E50914', stroke: '#FFFFFF', strokeWidth: 2 }} /></LineChart></ResponsiveContainer></section>
      <section className={frame}><div className="mb-3 flex items-center justify-between"><h2 className="font-semibold text-white">Average session duration</h2><span className="text-xs text-gray-500">MINUTES · BY DAY</span></div><ResponsiveContainer width="100%" height={290}><BarChart data={daily} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}><CartesianGrid strokeDasharray="3 3" stroke="#2F2F2F" vertical={false} /><XAxis dataKey="day" stroke="#808080" tick={{ fill: '#808080', fontSize: 12 }} axisLine={{ stroke: '#2F2F2F' }} tickLine={{ stroke: '#2F2F2F' }} /><YAxis stroke="#808080" tick={{ fill: '#808080', fontSize: 12 }} axisLine={{ stroke: '#2F2F2F' }} tickLine={{ stroke: '#2F2F2F' }} /><Tooltip {...tooltip} formatter={(value) => [`${value} min`, 'Duration']} /><Bar dataKey="duration" fill="#E50914" radius={[4, 4, 0, 0]} maxBarSize={38} /></BarChart></ResponsiveContainer></section></div>
    <section className="overflow-hidden rounded-xl border border-[#2F2F2F] bg-[#181818]"><div className="border-b border-[#2F2F2F] px-5 py-4"><h2 className="font-semibold text-white">Retention cohorts</h2><p className="mt-1 text-xs text-gray-500">Percentage of members active after signup</p></div><Table columns={columns} rows={cohorts} rowKey="cohort" /></section>
  </div>
}
