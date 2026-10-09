import { useId } from 'react'
export default function Input({ label, value, onChange, error, type = 'text', placeholder, className = '', ...props }) {
  const id = useId()
  return <div className="w-full"><label htmlFor={id} className="mb-1.5 block text-sm font-medium text-gray-300">{label}</label><input id={id} type={type} value={value ?? ''} onChange={onChange} placeholder={placeholder} aria-invalid={Boolean(error)} className={`w-full rounded-lg border bg-[#181818] px-3 py-2.5 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-[#E50914] ${error ? 'border-red-500' : 'border-[#2F2F2F]'} ${className}`} {...props} />{error && <p className="mt-1 text-sm text-red-400">{error}</p>}</div>
}
