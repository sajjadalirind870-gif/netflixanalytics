import { useEffect, useRef, useState } from 'react'
import { Bell, ChevronDown, LogOut, Menu, Moon, Search, Settings, Sun, UserRound } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router'
import { useTheme } from '../../context/ThemeContext'
import { useAuth } from '../../context/AuthContext'

const pageNames = { '/': 'Overview', '/subscribers': 'Subscribers', '/content': 'Content', '/revenue': 'Revenue', '/analytics': 'Analytics', '/regions': 'Regions', '/engagement': 'Engagement', '/reports': 'Reports', '/settings': 'Settings' }
export default function Navbar({ onMenuClick }) {
  const location = useLocation()
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const { user } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [search, setSearch] = useState('')
  const menuRef = useRef(null)
  useEffect(() => {
    const close = (event) => { if (!menuRef.current?.contains(event.target)) setMenuOpen(false) }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [])
  const submitSearch = (event) => { event.preventDefault(); if (search.trim()) navigate(`/subscribers?search=${encodeURIComponent(search.trim())}`) }
  return <header className="relative z-20 flex h-16 shrink-0 items-center justify-between gap-4 border-b border-[#2F2F2F] bg-[#141414] px-4 md:px-6">
    <div className="flex min-w-0 items-center gap-3"><button onClick={onMenuClick} className="rounded p-1 text-gray-400 hover:text-white md:hidden" aria-label="Open navigation"><Menu size={20} /></button><div className="truncate text-sm"><span className="text-gray-500">Netflix</span><span className="px-2 text-gray-700">/</span><span className="font-medium text-white">{pageNames[location.pathname] || 'Dashboard'}</span></div></div>
    <div className="flex items-center gap-2 md:gap-3"><form onSubmit={submitSearch} className="hidden items-center gap-2 rounded-lg border border-[#2F2F2F] bg-[#181818] px-3 py-1.5 sm:flex"><Search size={15} className="text-gray-500" /><input aria-label="Search subscribers" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search subscribers..." className="w-36 bg-transparent text-sm text-white outline-none placeholder:text-gray-600 md:w-48" /></form>
      <button onClick={toggleTheme} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`} className="rounded-lg p-2 text-gray-400 transition hover:bg-[#232323] hover:text-white">{theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}</button>
      <div className="relative"><button onClick={() => setNotificationsOpen((open) => !open)} aria-label="Notifications" className="relative rounded-lg p-2 text-gray-400 hover:bg-[#232323] hover:text-white"><Bell size={18} /><span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-[#E50914] ring-2 ring-[#141414]" /></button>{notificationsOpen && <div className="absolute right-0 top-12 w-72 rounded-xl border border-[#2F2F2F] bg-[#181818] p-4 shadow-2xl"><p className="text-sm font-semibold text-white">Notifications</p><p className="mt-3 text-xs leading-5 text-gray-400">All systems are operational. Your dashboard data is up to date.</p><button onClick={() => setNotificationsOpen(false)} className="mt-3 text-xs font-semibold text-[#E50914]">Dismiss</button></div>}</div>
      <div className="relative" ref={menuRef}><button onClick={() => setMenuOpen((open) => !open)} className="flex items-center gap-2 rounded-lg p-1.5 hover:bg-[#232323]" aria-expanded={menuOpen}><span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E50914] text-xs font-bold text-white">{user?.name?.charAt(0) || 'A'}</span><ChevronDown size={14} className="text-gray-500" /></button>{menuOpen && <div className="absolute right-0 top-12 w-48 rounded-xl border border-[#2F2F2F] bg-[#181818] p-1.5 shadow-2xl"><div className="border-b border-[#2F2F2F] px-3 py-2"><p className="truncate text-sm font-medium text-white">{user?.name || 'Admin'}</p><p className="truncate text-xs text-gray-500">{user?.email}</p></div><Link to="/settings" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-300 hover:bg-[#232323]"><UserRound size={15} />Profile</Link><Link to="/settings" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-300 hover:bg-[#232323]"><Settings size={15} />Settings</Link><button onClick={() => { setMenuOpen(false); navigate('/'); }} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-300 hover:bg-[#232323]"><LogOut size={15} />Logout</button></div>}</div>
    </div>
  </header>
}
