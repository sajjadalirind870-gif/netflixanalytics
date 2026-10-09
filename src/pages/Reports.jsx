import { useMemo, useState } from 'react'
import { Download, FileText, Printer } from 'lucide-react'
import PageHeader from '../components/common/PageHeader'
import Table from '../components/common/Table'
import Button from '../components/ui/Button'
import Select from '../components/ui/Select'
import Input from '../components/ui/Input'
import EmptyState from '../components/ui/EmptyState'
import { formatCurrency, formatDate } from '../utils/format'
import { mockSubscribers, planData, recentSignups, topContent } from '../data/netflixData'
import { useData } from '../context/DataContext'
import { useToast } from '../context/ToastContext'

const reports = {
  Revenue: { rows: planData.map((item) => ({ plan: item.plan, members: `${item.users}M`, revenue: `$${item.revenue.toFixed(1)}B`, monthlyPrice: formatCurrency(item.price) })), columns: [{ key: 'plan', label: 'Plan' }, { key: 'members', label: 'Members' }, { key: 'revenue', label: 'Revenue' }, { key: 'monthlyPrice', label: 'Monthly price' }] },
  Subscribers: { columns: [{ key: 'email', label: 'Email' }, { key: 'plan', label: 'Plan' }, { key: 'country', label: 'Country' }, { key: 'status', label: 'Status' }, { key: 'joinDate', label: 'Joined' }, { key: 'monthlySpend', label: 'Monthly spend' }] },
  Content: { rows: topContent.map(({ rank, title, genre, views, hours, completion }) => ({ rank, title, genre, views, hours, completion: `${completion}%` })), columns: [{ key: 'rank', label: 'Rank' }, { key: 'title', label: 'Title' }, { key: 'genre', label: 'Genre' }, { key: 'views', label: 'Views' }, { key: 'hours', label: 'Hours' }, { key: 'completion', label: 'Completion' }] },
  Engagement: { rows: [{ metric: 'Daily active members', value: '110M' }, { metric: 'Monthly active members', value: '260M' }, { metric: 'DAU / MAU', value: '42%' }, { metric: 'Average session duration', value: '48 min' }, { metric: 'Completion rate', value: '87%' }], columns: [{ key: 'metric', label: 'Metric' }, { key: 'value', label: 'Value' }] },
}
const isoToday = new Date().toISOString().slice(0, 10)
function csvCell(value) { const text = String(value ?? ''); return `"${text.replaceAll('"', '""')}"` }
export default function Reports() {
  const { subscribers } = useData()
  const { showToast } = useToast()
  const [type, setType] = useState('Revenue')
  const [from, setFrom] = useState('2025-01-01')
  const [to, setTo] = useState(isoToday)
  const [preview, setPreview] = useState(false)
  const sourceRows = useMemo(() => {
    if (type === 'Subscribers') return (subscribers?.length ? subscribers : mockSubscribers).map((item) => ({ ...item, monthlySpend: formatCurrency(item.monthlySpend), joinDate: formatDate(item.joinDate) }))
    return reports[type]?.rows || []
  }, [type, subscribers])
  const columns = reports[type]?.columns || []
  const generate = () => {
    if (from && to && from > to) { showToast('Start date must be before the end date.', 'error'); return }
    setPreview(true)
    showToast(`${type} report generated.`)
  }
  const exportCsv = () => {
    if (!preview) { showToast('Generate a report before exporting.', 'error'); return }
    const csv = [columns.map((column) => csvCell(column.label)).join(','), ...sourceRows.map((row) => columns.map((column) => csvCell(row[column.key])).join(','))].join('\r\n')
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }))
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = `netflix-${type.toLowerCase()}-report-${from}-to-${to}.csv`
    document.body.appendChild(anchor); anchor.click(); anchor.remove(); URL.revokeObjectURL(url)
    showToast('CSV report downloaded.')
  }
  return <div className="mx-auto max-w-375"><PageHeader title="Reports" description="Build a snapshot of key business metrics and export it for your team." eyebrow="REPORTING & EXPORTS" /><section className="mb-6 rounded-xl border border-[#2F2F2F] bg-[#181818] p-5"><h2 className="mb-4 font-semibold text-white">Configure report</h2><div className="grid grid-cols-1 gap-4 md:grid-cols-[1.2fr_1fr_1fr_auto]"><Select label="Report type" value={type} onChange={(event) => { setType(event.target.value); setPreview(false) }} options={['Revenue', 'Subscribers', 'Content', 'Engagement']} /><Input label="Start date" type="date" value={from} onChange={(event) => setFrom(event.target.value)} /><Input label="End date" type="date" value={to} onChange={(event) => setTo(event.target.value)} /><div className="flex items-end"><Button variant="primary" onClick={generate}><FileText size={16} />Generate report</Button></div></div></section>
    <section className="overflow-hidden rounded-xl border border-[#2F2F2F] bg-[#181818]"><div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#2F2F2F] px-5 py-4"><div><h2 className="font-semibold text-white">Report preview</h2><p className="mt-1 text-xs text-gray-500">{preview ? `${type} · ${from ? formatDate(from) : 'Any date'} – ${to ? formatDate(to) : 'Any date'} · ${sourceRows.length} records` : 'Generate a report to preview the data.'}</p></div><div className="no-print flex gap-2"><Button size="sm" onClick={exportCsv} disabled={!preview}><Download size={14} />Export CSV</Button><Button size="sm" onClick={() => window.print()} disabled={!preview}><Printer size={14} />Print</Button></div></div>{preview ? <Table columns={columns} rows={sourceRows} empty={<EmptyState icon={FileText} title="No report data" description="There are no records for this report." />} /> : <EmptyState icon={FileText} title="Your report is ready to build" description="Choose a report type and date range, then generate a preview." />}</section>
  </div>
}
