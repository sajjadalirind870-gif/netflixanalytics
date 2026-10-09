import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router'
import { Pencil, Plus, Search, Trash2, Users } from 'lucide-react'
import PageHeader from '../components/common/PageHeader'
import Table from '../components/common/Table'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import Select from '../components/ui/Select'
import Modal from '../components/ui/Modal'
import Pagination from '../components/ui/Pagination'
import EmptyState from '../components/ui/EmptyState'
import { useData } from '../context/DataContext'
import { useToast } from '../context/ToastContext'
import { formatCurrency, formatDate } from '../utils/format'

const blankForm = { email: '', plan: 'Standard', country: 'US' }
export default function Subscribers() {
  const { subscribers, addSubscriber, updateSubscriber, deleteSubscriber } = useData()
  const { showToast } = useToast()
  const [searchParams] = useSearchParams()
  const [search, setSearch] = useState(searchParams.get('search') || '')
  const [plan, setPlan] = useState('All plans')
  const [status, setStatus] = useState('All statuses')
  const [sort, setSort] = useState('newest')
  const [page, setPage] = useState(1)
  const [dialog, setDialog] = useState(false)
  const [editing, setEditing] = useState(null)
  const [deleting, setDeleting] = useState(null)
  const [form, setForm] = useState(blankForm)
  const [error, setError] = useState('')
  const pageSize = 10
  const filtered = useMemo(() => subscribers.filter((subscriber) => `${subscriber.email} ${subscriber.country}`.toLowerCase().includes(search.toLowerCase()) && (plan === 'All plans' || subscriber.plan === plan) && (status === 'All statuses' || subscriber.status === status)).sort((a, b) => sort === 'email' ? a.email.localeCompare(b.email) : sort === 'spend' ? b.monthlySpend - a.monthlySpend : new Date(b.joinDate) - new Date(a.joinDate)), [subscribers, search, plan, status, sort])
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const visible = filtered.slice((Math.min(page, totalPages) - 1) * pageSize, Math.min(page, totalPages) * pageSize)
  const openAdd = () => { setEditing(null); setForm(blankForm); setError(''); setDialog(true) }
  const openEdit = (subscriber) => { setEditing(subscriber); setForm({ email: subscriber.email, plan: subscriber.plan, country: subscriber.country }); setError(''); setDialog(true) }
  const save = (event) => {
    event.preventDefault()
    if (!/^\S+@\S+\.\S+$/.test(form.email)) { setError('Enter a valid email address.'); return }
    if (editing) { updateSubscriber(editing.id, form); showToast('Subscriber updated successfully.') } else { addSubscriber(form); showToast('Subscriber added successfully.') }
    setDialog(false)
  }
  const removeSubscriber = () => { deleteSubscriber(deleting.id); showToast('Subscriber deleted.'); setDeleting(null) }
  const columns = [
    { key: 'email', label: 'Subscriber', render: (value) => <span className="font-medium text-white">{value}</span> },
    { key: 'plan', label: 'Plan', render: (value) => <Badge variant={value === 'Premium' ? 'warning' : value === 'Standard' ? 'info' : 'default'}>{value}</Badge> },
    { key: 'country', label: 'Country' }, { key: 'status', label: 'Status', render: (value) => <Badge variant={value === 'Active' ? 'success' : 'danger'}>{value}</Badge> },
    { key: 'joinDate', label: 'Join date', render: (value) => formatDate(value) }, { key: 'monthlySpend', label: 'Monthly spend', render: (value) => formatCurrency(value) },
    { key: 'actions', label: 'Actions', render: (_, subscriber) => <div className="flex gap-1"><button aria-label={`Edit ${subscriber.email}`} onClick={(event) => { event.stopPropagation(); openEdit(subscriber) }} className="rounded p-2 text-gray-500 hover:bg-[#2F2F2F] hover:text-white"><Pencil size={15} /></button><button aria-label={`Delete ${subscriber.email}`} onClick={(event) => { event.stopPropagation(); setDeleting(subscriber) }} className="rounded p-2 text-gray-500 hover:bg-red-500/10 hover:text-red-400"><Trash2 size={15} /></button></div> },
  ]
  return <div className="mx-auto max-w-[1600px]"><PageHeader title="Subscribers" description="Manage paid memberships and review subscriber details." eyebrow="AUDIENCE MANAGEMENT" action={<Button variant="primary" onClick={openAdd}><Plus size={16} />Add subscriber</Button>} />
    <div className="mb-5 grid grid-cols-1 gap-3 rounded-xl border border-[#2F2F2F] bg-[#181818] p-4 md:grid-cols-[minmax(220px,1fr)_180px_180px_180px]"><div className="relative"><Search size={16} className="absolute left-3 top-3 text-gray-500" /><input value={search} onChange={(event) => { setSearch(event.target.value); setPage(1) }} placeholder="Search email or country..." className="w-full rounded-lg border border-[#2F2F2F] bg-[#141414] py-2.5 pl-9 pr-3 text-sm text-white outline-none focus:border-[#E50914]" /></div><Select label="Plan" value={plan} onChange={(event) => { setPlan(event.target.value); setPage(1) }} options={['All plans', 'Basic', 'Standard', 'Premium']} /><Select label="Status" value={status} onChange={(event) => { setStatus(event.target.value); setPage(1) }} options={['All statuses', 'Active', 'Cancelled']} /><Select label="Sort by" value={sort} onChange={(event) => setSort(event.target.value)} options={[{ value: 'newest', label: 'Newest first' }, { value: 'email', label: 'Email A–Z' }, { value: 'spend', label: 'Highest spend' }]} /></div>
    <section className="overflow-hidden rounded-xl border border-[#2F2F2F] bg-[#181818]"><div className="flex items-center justify-between border-b border-[#2F2F2F] px-5 py-4"><h2 className="font-semibold text-white">All subscribers</h2><span className="text-xs text-gray-500">{filtered.length.toLocaleString()} results</span></div><Table columns={columns} rows={visible} empty={<EmptyState icon={Users} title="No subscribers found" description="Try different filters or add a new subscriber." />} /><Pagination current={Math.min(page, totalPages)} total={totalPages} onChange={setPage} /></section>
    <Modal isOpen={dialog} onClose={() => setDialog(false)} title={editing ? 'Edit subscriber' : 'Add subscriber'}><form onSubmit={save} className="space-y-4"><Input label="Email address" type="email" value={form.email} onChange={(event) => { setForm({ ...form, email: event.target.value }); setError('') }} error={error} placeholder="name@example.com" /><Select label="Subscription plan" value={form.plan} onChange={(event) => setForm({ ...form, plan: event.target.value })} options={['Basic', 'Standard', 'Premium']} /><Select label="Country" value={form.country} onChange={(event) => setForm({ ...form, country: event.target.value })} options={['US', 'UK', 'IN', 'DE', 'BR', 'JP', 'CA', 'AU']} /><div className="flex justify-end gap-2 pt-2"><Button onClick={() => setDialog(false)}>Cancel</Button><Button type="submit" variant="primary">{editing ? 'Save changes' : 'Add subscriber'}</Button></div></form></Modal>
    <Modal isOpen={Boolean(deleting)} onClose={() => setDeleting(null)} title="Delete subscriber"><p className="text-sm leading-6 text-gray-400">Are you sure you want to delete <span className="font-medium text-white">{deleting?.email}</span>? This action cannot be undone.</p><div className="mt-6 flex justify-end gap-2"><Button onClick={() => setDeleting(null)}>Cancel</Button><Button variant="danger" onClick={removeSubscriber}>Delete subscriber</Button></div></Modal>
  </div>
}
