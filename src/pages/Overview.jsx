import { Activity, CheckCircle2, Clock3, DollarSign, Globe2, TrendingDown, TrendingUp, UserPlus, Users } from 'lucide-react'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Table from '../components/common/Table'
import EmptyState from '../components/ui/EmptyState'
import RevenueAreaChart from '../components/charts/RevenueAreaChart'
import RegionPieChart from '../components/charts/RegionPieChart'
import GenreBarChart from '../components/charts/GenreBarChart'
import ChurnLineChart from '../components/charts/ChurnLineChart'
import PageHeader from '../components/common/PageHeader'
import { kpis, kpiChanges, topContent, recentSignups, planData, deviceData } from '../data/netflixData'
import { formatCurrency, formatDate, formatNumber } from '../utils/format'

const chartCard = 'rounded-xl border border-[#2F2F2F] bg-[#181818] p-5'
function SectionTitle({ children, detail }) { return <div className="mb-4 flex items-center justify-between"><h2 className="text-base font-semibold text-white">{children}</h2>{detail && <span className="text-xs text-gray-500">{detail}</span>}</div> }
export default function Overview() {
  const metrics = [
    { title: 'Total Subscribers', value: formatNumber(kpis.totalSubscribers), change: kpiChanges.totalSubscribers, icon: Users, subtitle: 'Global paid memberships' },
    { title: 'Monthly Revenue', value: formatCurrency(kpis.monthlyRevenue), change: kpiChanges.monthlyRevenue, icon: DollarSign, subtitle: 'Across all plans' },
    { title: 'ARPU', value: `$${kpis.arpu}`, change: kpiChanges.arpu, icon: TrendingUp, subtitle: 'Average revenue per user' },
    { title: 'Churn Rate', value: `${kpis.churnRate}%`, change: kpiChanges.churnRate, icon: TrendingDown, subtitle: 'Monthly subscriber churn', changeIsGoodWhenNegative: true },
    { title: 'Watch Time', value: formatNumber(kpis.watchTime), change: kpiChanges.watchTime, icon: Clock3, subtitle: 'Hours streamed this year' },
    { title: 'DAU / MAU', value: `${kpis.dauMau}%`, change: kpiChanges.dauMau, icon: Activity, subtitle: 'Audience stickiness' },
    { title: 'Completion Rate', value: `${kpis.completionRate}%`, change: kpiChanges.completionRate, icon: CheckCircle2, subtitle: 'Episodes watched to end' },
    { title: 'Net Additions', value: `+${formatNumber(kpis.netAdditions)}`, change: kpiChanges.netAdditions, icon: UserPlus, subtitle: 'New paid memberships' },
  ]
  return <div className="mx-auto max-w-[1600px]"><PageHeader title="Streaming at a glance" description="A real-time view of your audience, content performance, and business health." action={<div className="rounded-lg border border-[#2F2F2F] bg-[#181818] px-3 py-2 text-xs text-gray-400">Reporting period <span className="ml-2 font-semibold text-white">FY 2025</span></div>} />
    <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">{metrics.map((metric) => <Card key={metric.title} {...metric} />)}</div>
    <div className="mb-6 grid grid-cols-1 gap-5 xl:grid-cols-2"><section className={chartCard}><SectionTitle detail="USD · BILLIONS">Revenue growth</SectionTitle><RevenueAreaChart /></section><section className={chartCard}><SectionTitle detail="MILLIONS OF MEMBERS">Subscribers by region</SectionTitle><RegionPieChart /></section></div>
    <div className="mb-6 grid grid-cols-1 gap-5 xl:grid-cols-2"><section className={chartCard}><SectionTitle detail="MILLION HOURS">Watch time by genre</SectionTitle><GenreBarChart /></section><section className={chartCard}><SectionTitle detail="MONTH OVER MONTH">Churn rate trend</SectionTitle><ChurnLineChart /></section></div>
    <div className="mb-6 grid grid-cols-1 gap-5 xl:grid-cols-2"><section className="overflow-hidden rounded-xl border border-[#2F2F2F] bg-[#181818]"><div className="p-5 pb-2"><SectionTitle detail="MOST WATCHED">Top content</SectionTitle></div><Table columns={[{ key: 'rank', label: '#' }, { key: 'title', label: 'Title', render: (v) => <span className="font-medium text-white">{v}</span> }, { key: 'views', label: 'Views' }, { key: 'hours', label: 'Hours' }, { key: 'completion', label: 'Completion', render: (v) => <span>{v}%</span> }]} rows={topContent.slice(0, 5)} empty={<EmptyState />} /></section>
      <section className="overflow-hidden rounded-xl border border-[#2F2F2F] bg-[#181818]"><div className="p-5 pb-2"><SectionTitle detail="LATEST MEMBERS">Recent signups</SectionTitle></div><Table columns={[{ key: 'email', label: 'Email', render: (v) => <span className="font-medium text-white">{v}</span> }, { key: 'plan', label: 'Plan', render: (v) => <Badge variant={v === 'Premium' ? 'warning' : v === 'Standard' ? 'info' : 'default'}>{v}</Badge> }, { key: 'country', label: 'Country' }, { key: 'date', label: 'Joined', render: (v) => formatDate(v) }]} rows={recentSignups} empty={<EmptyState />} /></section></div>
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-2"><section className="overflow-hidden rounded-xl border border-[#2F2F2F] bg-[#181818]"><div className="p-5 pb-2"><SectionTitle detail="260.3M TOTAL MEMBERS">Plan distribution</SectionTitle></div><Table columns={[{ key: 'plan', label: 'Plan', render: (v) => <span className="font-medium text-white">{v}</span> }, { key: 'users', label: 'Users', render: (v) => `${v}M` }, { key: 'revenue', label: 'Revenue', render: (v) => `$${v}B` }, { key: 'price', label: 'Price', render: (v) => `$${v.toFixed(2)}` }]} rows={planData} empty={<EmptyState />} /></section>
      <section className="overflow-hidden rounded-xl border border-[#2F2F2F] bg-[#181818]"><div className="p-5 pb-2"><SectionTitle detail="PRIMARY SCREEN">Device distribution</SectionTitle></div><Table columns={[{ key: 'device', label: 'Device', render: (v) => <span className="font-medium text-white">{v}</span> }, { key: 'users', label: 'Users', render: (v) => `${v}M` }, { key: 'percentage', label: 'Share', render: (v) => <div className="flex items-center gap-3"><div className="h-1.5 w-20 overflow-hidden rounded-full bg-[#2F2F2F]"><div className="h-full rounded-full bg-[#E50914]" style={{ width: `${v}%` }} /></div><span>{v}%</span></div> }]} rows={deviceData} empty={<EmptyState icon={Globe2} />} /></section></div>
  </div>
}
