import { useEffect } from 'react'
import { X } from 'lucide-react'
export default function Modal({ isOpen, onClose, title, children, wide = false }) {
  useEffect(() => {
    if (!isOpen) return undefined
    const closeOnEscape = (event) => { if (event.key === 'Escape') onClose?.() }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [isOpen, onClose])
  if (!isOpen) return null
  return <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/75 p-4" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose?.() }}><section role="dialog" aria-modal="true" aria-label={title} className={`my-auto w-full rounded-2xl border border-[#2F2F2F] bg-[#181818] p-6 shadow-2xl ${wide ? 'max-w-2xl' : 'max-w-lg'}`}><div className="mb-5 flex items-center justify-between"><h2 className="text-lg font-bold text-white">{title}</h2><button onClick={onClose} aria-label="Close dialog" className="rounded-lg p-1.5 text-gray-400 hover:bg-[#2F2F2F] hover:text-white"><X size={18} /></button></div>{children}</section></div>
}
