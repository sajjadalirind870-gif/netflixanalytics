import { useId } from 'react'
export default function Select({ label, value, onChange, options = [], className = '' }) {
  const id = useId()
  return <div className="w-full"><label htmlFor={id} className="mb-1.5 block text-sm font-medium text-gray-300">{label}</label><select id={id} value={value ?? ''} onChange={onChange} className={`w-full rounded-lg border border-[#2F2F2F] bg-[#181818] px-3 py-2.5 text-sm text-white outline-none focus:border-[#E50914] ${className}`}>{options.map((option) => typeof option === 'string' ? <option key={option} value={option}>{option}</option> : <option key={option.value} value={option.value}>{option.label}</option>)}</select></div>
}
