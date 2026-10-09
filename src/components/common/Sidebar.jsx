import { Activity, BarChart3, DollarSign, FileText, Film, Globe, LayoutDashboard, Settings, Users } from 'lucide-react'
import { NavLink } from 'react-router'
import { useAuth } from '../../context/AuthContext'

const links = [
  { to: '/', label: 'Overview', icon: LayoutDashboard }, { to: '/subscribers', label: 'Subscribers', icon: Users },
  { to: '/content', label: 'Content', icon: Film }, { to: '/revenue', label: 'Revenue', icon: DollarSign },
  { to: '/analytics', label: 'Analytics', icon: BarChart3 }, { to: '/regions', label: 'Regions', icon: Globe },
  { to: '/engagement', label: 'Engagement', icon: Activity }, { to: '/reports', label: 'Reports', icon: FileText }, { to: '/settings', label: 'Settings', icon: Settings },
]
export default function Sidebar() {
  const { user } = useAuth()
  return <aside className="hidden h-screen w-64 shrink-0 flex-col overflow-y-auto border-r border-[#2F2F2F] bg-[#141414] md:flex">
    <div className="border-b border-[#2F2F2F] p-6"><h1 className="text-2xl font-black tracking-wider text-[#E50914]">NETFLIX</h1><p className="mt-1 text-xs text-gray-500">Analytics Dashboard</p></div>
    <nav className="flex-1 space-y-1 p-4" aria-label="Main navigation">{links.map(({ to, label, icon: Icon }) => <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => `flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors ${isActive ? 'bg-[#E50914] text-white shadow-lg shadow-red-950/20' : 'text-gray-400 hover:bg-[#232323] hover:text-white'}`}><Icon size={18} /><span className="text-sm font-medium">{label}</span></NavLink>)}</nav>
    <div className="flex items-center gap-3 border-t border-[#2F2F2F] p-4"><div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E50914] font-bold text-white">{user?.name?.charAt(0) || 'A'}</div><div className="min-w-0 flex-1"><p className="truncate text-sm font-medium text-white">{user?.name || 'Admin'}</p><p className="truncate text-xs text-gray-500">{user?.email || 'admin@netflix.com'}</p></div></div>
  </aside>
}
