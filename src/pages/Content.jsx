import { useMemo, useState } from 'react'
import { Film, Search } from 'lucide-react'
import PageHeader from '../components/common/PageHeader'
import Table from '../components/common/Table'
import Badge from '../components/ui/Badge'
import Select from '../components/ui/Select'
import Modal from '../components/ui/Modal'
import EmptyState from '../components/ui/EmptyState'
import Pagination from '../components/ui/Pagination'
import { topContent } from '../data/netflixData'

const genreVariant = { Drama: 'info', Comedy: 'warning', Action: 'danger', Thriller: 'default', 'Sci-Fi': 'success' }
export default function Content() {
  const [query, setQuery] = useState('')
  const [genre, setGenre] = useState('All genres')
  const [sort, setSort] = useState('rank')
  const [page, setPage] = useState(1)
  const [selected, setSelected] = useState(null)
  const pageSize = 6
  const filtered = useMemo(() => topContent.filter((item) => item.title.toLowerCase().includes(query.toLowerCase()) && (genre === 'All genres' || item.genre === genre)).sort((a, b) => sort === 'completion' ? b.completion - a.completion : sort === 'title' ? a.title.localeCompare(b.title) : a.rank - b.rank), [query, genre, sort])
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const rows = filtered.slice((Math.min(page, totalPages) - 1) * pageSize, Math.min(page, totalPages) * pageSize)
  const columns = [{ key: 'rank', label: 'Rank', render: (value) => <span className="font-bold text-gray-500">#{value.toString().padStart(2, '0')}</span> }, { key: 'title', label: 'Title', render: (value) => <span className="font-semibold text-white">{value}</span> }, { key: 'genre', label: 'Genre', render: (value) => <Badge variant={genreVariant[value] || 'default'}>{value}</Badge> }, { key: 'views', label: 'Views' }, { key: 'hours', label: 'Hours watched' }, { key: 'completion', label: 'Completion', render: (value) => <div className="flex items-center gap-2"><div className="h-1.5 w-14 rounded-full bg-[#2F2F2F]"><div className="h-1.5 rounded-full bg-[#E50914]" style={{ width: `${value}%` }} /></div><span>{value}%</span></div> }]
  return <div className="mx-auto max-w-375"><PageHeader title="Content performance" description="Discover the titles keeping members watching." eyebrow="CONTENT INTELLIGENCE" /><div className="mb-5 flex flex-col gap-3 rounded-xl border border-[#2F2F2F] bg-[#181818] p-4 md:flex-row"><div className="relative flex-1"><Search size={16} className="absolute left-3 top-3 text-gray-500" /><input value={query} onChange={(event) => { setQuery(event.target.value); setPage(1) }} placeholder="Search titles..." className="w-full rounded-lg border border-[#2F2F2F] bg-[#141414] py-2.5 pl-9 pr-3 text-sm text-white outline-none focus:border-[#E50914]" /></div><div className="grid grid-cols-2 gap-3 md:w-100"><Select label="Genre" value={genre} onChange={(event) => { setGenre(event.target.value); setPage(1) }} options={['All genres', 'Drama', 'Comedy', 'Action', 'Thriller', 'Sci-Fi']} /><Select label="Sort" value={sort} onChange={(event) => setSort(event.target.value)} options={[{ value: 'rank', label: 'Top ranked' }, { value: 'completion', label: 'Completion rate' }, { value: 'title', label: 'Title A–Z' }]} /></div></div><section className="overflow-hidden rounded-xl border border-[#2F2F2F] bg-[#181818]"><div className="flex items-center justify-between border-b border-[#2F2F2F] px-5 py-4"><h2 className="font-semibold text-white">Top titles</h2><span className="text-xs text-gray-500">{filtered.length} titles</span></div><Table columns={columns} rows={rows} empty={<EmptyState icon={Film} title="No titles found" description="Try another title or genre." />} onRowClick={setSelected} /><Pagination current={Math.min(page, totalPages)} total={totalPages} onChange={setPage} /></section>
    <Modal isOpen={Boolean(selected)} onClose={() => setSelected(null)} title={selected?.title || 'Content details'}><div className="mb-5 flex h-36 items-end rounded-xl bg-linear-to-br from-[#3a1218] via-[#231318] to-[#141414] p-5"><div><Badge variant={genreVariant[selected?.genre] || 'default'}>{selected?.genre}</Badge><p className="mt-3 text-xl font-bold text-white">{selected?.title}</p></div></div><div className="grid grid-cols-3 gap-3">{[['Views', selected?.views], ['Hours watched', selected?.hours], ['Completion', `${selected?.completion ?? '—'}%`]].map(([label, value]) => <div key={label} className="rounded-lg bg-[#232323] p-3"><p className="text-xs text-gray-500">{label}</p><p className="mt-1 font-semibold text-white">{value || '—'}</p></div>)}</div><p className="mt-4 text-sm text-gray-400">This title is among the most watched in the catalog, with strong global engagement.</p></Modal>
  </div>
}
