import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
export default function Card({ title, value, change, icon: Icon, subtitle, children, className = '', changeIsGoodWhenNegative = false, action }) {
  const hasChange = change !== undefined && change !== null
  const positive = changeIsGoodWhenNegative ? Number(change) <= 0 : Number(change) >= 0
  return <section className={`rounded-xl border border-[#2F2F2F] bg-[#181818] p-5 transition-colors hover:border-[#424242] ${className}`}>
    {(title || action || Icon) && <div className="mb-4 flex items-center justify-between gap-3"><h2 className="text-sm font-semibold text-gray-300">{title}</h2><div className="flex items-center gap-2">{action}{Icon && <Icon size={18} className="text-gray-500" />}</div></div>}
    {value !== undefined && <div className="flex items-end justify-between gap-3"><div><div className="text-2xl font-bold tracking-tight text-white">{value}</div>{subtitle && <p className="mt-1 text-xs text-gray-500">{subtitle}</p>}</div>{hasChange && <span className={`mb-1 inline-flex items-center gap-1 text-xs font-semibold ${positive ? 'text-[#46D369]' : 'text-[#E50914]'}`}>{positive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}{Math.abs(Number(change)).toFixed(1)}%</span>}</div>}
    {children}
  </section>
}
