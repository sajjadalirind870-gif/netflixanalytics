import { useState } from 'react'
import { Outlet } from 'react-router'
import Navbar from '../components/common/Navbar'
import Sidebar from '../components/common/Sidebar'
import { NavLink } from 'react-router'
import { Activity, BarChart3, DollarSign, FileText, Film, Globe, LayoutDashboard, Settings, Users, X } from 'lucide-react'

const mobileLinks = [{ to: '/', label: 'Overview', icon: LayoutDashboard }, { to: '/subscribers', label: 'Subscribers', icon: Users }, { to: '/content', label: 'Content', icon: Film }, { to: '/revenue', label: 'Revenue', icon: DollarSign }, { to: '/analytics', label: 'Analytics', icon: BarChart3 }, { to: '/regions', label: 'Regions', icon: Globe }, { to: '/engagement', label: 'Engagement', icon: Activity }, { to: '/reports', label: 'Reports', icon: FileText }, { to: '/settings', label: 'Settings', icon: Settings }]
export default function DashboardLayout() {
  const [mobileOpen, setMobileOpen] = useState(false)
  return <div className="flex h-screen overflow-hidden bg-[#141414]"><Sidebar /><div className="flex h-screen min-w-0 flex-1 flex-col overflow-hidden"><Navbar onMenuClick={() => setMobileOpen(true)} /><main className="flex-1 overflow-y-auto p-4 md:p-6"><Outlet /></main></div>
    {mobileOpen && <div className="fixed inset-0 z-40 bg-black/70 md:hidden" onMouseDown={(event) => { if (event.target === event.currentTarget) setMobileOpen(false) }}><aside className="h-full w-72 overflow-y-auto border-r border-[#2F2F2F] bg-[#141414] p-4"><div className="mb-5 flex items-center justify-between border-b border-[#2F2F2F] pb-4"><div><h1 className="text-2xl font-black tracking-wider text-[#E50914]">NETFLIX</h1><p className="mt-1 text-xs text-gray-500">Analytics Dashboard</p></div><button onClick={() => setMobileOpen(false)} aria-label="Close navigation" className="text-gray-400"><X size={18} /></button></div>{mobileLinks.map(({ to, label, icon: Icon }) => <NavLink onClick={() => setMobileOpen(false)} key={to} to={to} end={to === '/'} className={({ isActive }) => `mb-1 flex items-center gap-3 rounded-lg px-3 py-2.5 ${isActive ? 'bg-[#E50914] text-white' : 'text-gray-400 hover:bg-[#232323]'}`}><Icon size={18} /><span className="text-sm">{label}</span></NavLink>)}</aside></div>}
  </div>
}
