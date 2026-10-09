import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react'
import Button from './Button'
export default function Pagination({ current, total, onChange }) {
  if (!total || total < 1) return null
  const pages = Array.from({ length: total }, (_, index) => index + 1).filter((page) => page === 1 || page === total || Math.abs(page - current) <= 1)
  const visible = pages.flatMap((page, index) => index && page - pages[index - 1] > 1 ? [null, page] : [page])
  return <div className="flex items-center justify-between border-t border-[#2F2F2F] px-4 py-3"><p className="text-xs text-gray-500">Page <span className="text-gray-300">{current}</span> of <span className="text-gray-300">{total}</span></p><div className="flex items-center gap-1"><Button size="sm" variant="ghost" disabled={current <= 1} onClick={() => onChange(current - 1)} aria-label="Previous page"><ChevronLeft size={16} /></Button>{visible.map((page, index) => page ? <button key={page} onClick={() => onChange(page)} className={`h-8 min-w-8 rounded-md px-2 text-xs ${page === current ? 'bg-[#E50914] text-white' : 'text-gray-400 hover:bg-[#232323] hover:text-white'}`}>{page}</button> : <MoreHorizontal key={`gap-${index}`} size={16} className="text-gray-600" />)}<Button size="sm" variant="ghost" disabled={current >= total} onClick={() => onChange(current + 1)} aria-label="Next page"><ChevronRight size={16} /></Button></div></div>
}
