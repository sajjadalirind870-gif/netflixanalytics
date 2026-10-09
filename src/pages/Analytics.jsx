import { useMemo, useState } from 'react'
import { Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Activity } from 'lucide-react'
import PageHeader from '../components/common/PageHeader'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import { deviceData, funnelData, peakStreams, revenueData } from '../data/netflixData'

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
const colors = ['#E50914', '#B20710', '#FF6B6B', '#FFA00A']
export default function Analytics() {
  const [range, setRange] = useState(12)
  const growth = useMemo(() => revenueData.slice(-range), [range])
  return (
    <div className="mx-auto max-w-375">
      <PageHeader title="Audience analytics" description="Understand activation, retention, and streaming behavior." eyebrow="PRODUCT ANALYTICS" action={<div className="flex rounded-lg border border-[#2F2F2F] bg-[#181818] p-1">{[3, 6, 12].map((months) => <Button key={months} size="sm" variant={range === months ? 'primary' : 'ghost'} onClick={() => setRange(months)}>{months}M</Button>)}</div>} />
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3"><Card title="Activation rate" value="85%" change={2.8} icon={Activity} subtitle="Sign-up to first session" /><Card title="30-day active" value="42%" change={2.1} icon={Activity} subtitle="Cohort retention" /><Card title="Peak concurrent" value="22.0M" change={9.4} icon={Activity} subtitle="Highest simultaneous streams" /></div>
      <div className="mb-6 grid grid-cols-1 gap-5 xl:grid-cols-2">
        <section className={frame}>
          <div className="mb-4 flex items-center justify-between"><h2 className="font-semibold text-white">Engagement funnel</h2><span className="text-xs text-gray-500">% OF SIGNUPS</span></div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={funnelData} layout="vertical" margin={{ top: 4, right: 15, left: 8, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2F2F2F" vertical={false} />
              <XAxis type="number" domain={[0, 100]} stroke="#808080" tick={{ fill: '#808080', fontSize: 12 }} axisLine={{ stroke: '#2F2F2F' }} tickLine={{ stroke: '#2F2F2F' }} tickFormatter={(value) => `${value}%`} />
              <YAxis type="category" dataKey="stage" width={95} stroke="#808080" tick={{ fill: '#808080', fontSize: 12 }} axisLine={{ stroke: '#2F2F2F' }} tickLine={{ stroke: '#2F2F2F' }} />
              <Tooltip {...tooltip} formatter={(value) => [`${value}%`, 'Conversion']} />
              <Bar dataKey="value" name="Conversion" fill="#E50914" radius={[4, 4, 0, 0]} maxBarSize={24}>{funnelData.map((item, index) => <Cell key={item.stage} fill={colors[index % colors.length]} />)}</Bar>
            </BarChart>
          </ResponsiveContainer>
        </section>
        <section className={frame}>
          <div className="mb-4 flex items-center justify-between"><h2 className="font-semibold text-white">Subscriber growth</h2><span className="text-xs text-gray-500">MEMBERS · MILLIONS</span></div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={growth} margin={{ top: 10, right: 8, left: -15, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2F2F2F" vertical={false} />
              <XAxis dataKey="month" stroke="#808080" tick={{ fill: '#808080', fontSize: 12 }} axisLine={{ stroke: '#2F2F2F' }} tickLine={{ stroke: '#2F2F2F' }} />
              <YAxis stroke="#808080" tick={{ fill: '#808080', fontSize: 12 }} axisLine={{ stroke: '#2F2F2F' }} tickLine={{ stroke: '#2F2F2F' }} />
              <Tooltip {...tooltip} formatter={(value) => [`${value}M`, 'Subscribers']} />
              <Line type="monotone" dataKey="subscribers" stroke="#E50914" strokeWidth={2} dot={{ fill: '#E50914', stroke: '#181818', strokeWidth: 2, r: 4 }} activeDot={{ r: 6, fill: '#E50914', stroke: '#FFFFFF', strokeWidth: 2 }} />
            </LineChart>
          </ResponsiveContainer>
        </section>
      </div>
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <section className={frame}>
          <div className="mb-4 flex items-center justify-between"><h2 className="font-semibold text-white">Peak concurrent streams</h2><span className="text-xs text-gray-500">MILLIONS · LOCAL TIME</span></div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={peakStreams} margin={{ top: 8, right: 10, left: -16, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2F2F2F" vertical={false} />
              <XAxis dataKey="hour" stroke="#808080" tick={{ fill: '#808080', fontSize: 12 }} axisLine={{ stroke: '#2F2F2F' }} tickLine={{ stroke: '#2F2F2F' }} />
              <YAxis stroke="#808080" tick={{ fill: '#808080', fontSize: 12 }} axisLine={{ stroke: '#2F2F2F' }} tickLine={{ stroke: '#2F2F2F' }} />
              <Tooltip {...tooltip} formatter={(value) => [`${value}M`, 'Streams']} />
              <Bar dataKey="streams" fill="#E50914" radius={[4, 4, 0, 0]} maxBarSize={45} />
            </BarChart>
          </ResponsiveContainer>
        </section>
        <section className={frame}>
          <div className="mb-4 flex items-center justify-between"><h2 className="font-semibold text-white">Device mix</h2><span className="text-xs text-gray-500">BY ACTIVE MEMBERS</span></div>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={deviceData} dataKey="users" nameKey="device" innerRadius={55} outerRadius={90} paddingAngle={4} stroke="none" label={({ name, value, x, y, textAnchor }) => <text x={x} y={y} textAnchor={textAnchor} fill="#FFFFFF" style={{ fill: '#FFFFFF', fontSize: 12, fontWeight: 500 }}>{`${name}: ${value}`}</text>} labelLine={{ stroke: '#2F2F2F' }}>
                {deviceData.map((item, index) => <Cell key={item.device} fill={colors[index]} />)}
              </Pie>
              <Tooltip {...tooltip} formatter={(value, name) => [`${value}M`, name]} />
              <Legend verticalAlign="bottom" content={<LegendContent />} wrapperStyle={{ color: '#FFFFFF', paddingTop: '10px' }} />
            </PieChart>
          </ResponsiveContainer>
        </section>
      </div>
    </div>
  )
}
function LegendContent() { return <div className="flex justify-center gap-4">{deviceData.map((device, index) => <span key={device.device} className="flex items-center gap-1.5 text-[10px] text-white"><i className="h-2 w-2 rounded-full" style={{ background: colors[index] }} />{device.device}</span>)}</div> }
