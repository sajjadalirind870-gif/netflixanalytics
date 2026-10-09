import { createContext, useCallback, useContext, useState } from 'react'
import { CheckCircle2, CircleAlert, Info, X } from 'lucide-react'

const ToastContext = createContext(null)
const icons = { success: CheckCircle2, error: CircleAlert, info: Info }
function ToastViewport({ toasts, removeToast }) {
  return <div className="fixed right-5 top-5 z-100 flex w-[min(380px,calc(100vw-2rem))] flex-col gap-2" aria-live="polite">{toasts.map((toast) => {
    const Icon = icons[toast.type] || Info
    return <div key={toast.id} className="flex items-center gap-3 rounded-xl border border-[#2F2F2F] bg-[#202020] p-4 shadow-2xl animate-in slide-in-from-right-4">
      <Icon size={18} className={toast.type === 'error' ? 'text-[#E50914]' : 'text-[#46D369]'} /><p className="flex-1 text-sm text-white">{toast.message}</p>
      <button aria-label="Dismiss notification" onClick={() => removeToast(toast.id)} className="text-gray-500 hover:text-white"><X size={16} /></button>
    </div>
  })}</div>
}
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const removeToast = useCallback((id) => setToasts((items) => items.filter((toast) => toast.id !== id)), [])
  const showToast = useCallback((message, type = 'success') => {
    const id = `${Date.now()}-${Math.random()}`
    setToasts((items) => [...items, { id, message, type }])
    window.setTimeout(() => removeToast(id), 3000)
  }, [removeToast])
  return <ToastContext.Provider value={{ showToast, removeToast }}><>{children}<ToastViewport toasts={toasts} removeToast={removeToast} /></></ToastContext.Provider>
}
export function useToast() {
  const context = useContext(ToastContext)
  if (!context) throw new Error('useToast must be used within ToastProvider')
  return context
}
