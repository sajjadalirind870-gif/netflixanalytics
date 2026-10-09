import { LoaderCircle } from 'lucide-react'

const variants = { primary: 'bg-[#E50914] text-white hover:bg-[#B20710]', secondary: 'bg-[#232323] text-white hover:bg-[#303030]', danger: 'bg-red-600 text-white hover:bg-red-700', ghost: 'bg-transparent text-gray-300 hover:bg-[#232323] hover:text-white' }
const sizes = { sm: 'px-3 py-1.5 text-xs', md: 'px-4 py-2 text-sm', lg: 'px-5 py-2.5 text-sm' }
export default function Button({ variant = 'secondary', size = 'md', children, onClick, disabled = false, className = '', type = 'button', loading = false }) {
  return <button type={type} onClick={onClick} disabled={disabled || loading} className={`inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant] || variants.secondary} ${sizes[size] || sizes.md} ${className}`}>
    {loading && <LoaderCircle size={16} className="animate-spin" />}{children}
  </button>
}
