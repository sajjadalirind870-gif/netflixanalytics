import { useState } from 'react'
import { Bell, MonitorCog, RotateCcw, Save, ShieldCheck, UserRound } from 'lucide-react'
import PageHeader from '../components/common/PageHeader'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import Modal from '../components/ui/Modal'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import { useToast } from '../context/ToastContext'
import { useLocalStorage } from '../hooks/useLocalStorage'

function SettingsSection({ icon: Icon, title, description, children }) { return <section className="rounded-xl border border-[#2F2F2F] bg-[#181818] p-5 md:p-6"><div className="mb-5 flex items-start gap-3"><div className="rounded-lg bg-[#E50914]/10 p-2 text-[#E50914]"><Icon size={18} /></div><div><h2 className="font-semibold text-white">{title}</h2><p className="mt-1 text-sm text-gray-500">{description}</p></div></div>{children}</section> }
export default function Settings() {
  const { user, setUser } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const { showToast } = useToast()
  const [form, setForm] = useState({ name: user?.name || '', email: user?.email || '' })
  const [notifications, setNotifications] = useLocalStorage('netflix-notifications', { email: true, sms: false, push: true })
  const [confirmReset, setConfirmReset] = useState(false)
  const saveProfile = (event) => { event.preventDefault(); if (!form.name.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) { showToast('Enter a name and valid email address.', 'error'); return }; setUser({ ...user, ...form }); showToast('Profile settings saved.') }
  const resetData = () => { window.localStorage.clear(); window.location.reload() }
  const toggleNotification = (key) => setNotifications((value) => ({ ...value, [key]: !value[key] }))
  return <div className="mx-auto max-w-4xl"><PageHeader title="Settings" description="Manage your administrator profile and dashboard preferences." eyebrow="WORKSPACE PREFERENCES" />
    <div className="space-y-5"><SettingsSection icon={UserRound} title="Profile" description="Update the details associated with your dashboard account."><form onSubmit={saveProfile} className="grid grid-cols-1 gap-4 md:grid-cols-2"><Input label="Full name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="Your name" /><Input label="Email address" type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} placeholder="name@example.com" /><div className="md:col-span-2"><Button type="submit" variant="primary"><Save size={15} />Save profile</Button></div></form></SettingsSection>
      <SettingsSection icon={MonitorCog} title="Appearance" description="Personalize the dashboard display."><div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-[#2F2F2F] bg-[#141414] p-4"><div><p className="text-sm font-medium text-white">Color theme</p><p className="mt-1 text-xs text-gray-500">Current theme: {theme === 'dark' ? 'Dark' : 'Light'}</p></div><Button onClick={toggleTheme}>{theme === 'dark' ? 'Switch to light' : 'Switch to dark'}</Button></div></SettingsSection>
      <SettingsSection icon={Bell} title="Notifications" description="Choose which product updates you want to receive."><div className="space-y-3">{[{ key: 'email', label: 'Email notifications', detail: 'Product updates and account activity' }, { key: 'sms', label: 'SMS notifications', detail: 'Important account alerts by text' }, { key: 'push', label: 'Push notifications', detail: 'In-app activity and dashboard alerts' }].map((option) => <label key={option.key} className="flex cursor-pointer items-center justify-between gap-4 rounded-lg border border-[#2F2F2F] bg-[#141414] p-4"><span><span className="block text-sm font-medium text-white">{option.label}</span><span className="mt-1 block text-xs text-gray-500">{option.detail}</span></span><input type="checkbox" checked={Boolean(notifications?.[option.key])} onChange={() => toggleNotification(option.key)} className="h-4 w-4 accent-[#E50914]" /></label>)}</div></SettingsSection>
      <SettingsSection icon={ShieldCheck} title="Demo data" description="Restore the dashboard to its original sample data and preferences."><div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center"><p className="max-w-xl text-sm leading-6 text-gray-400">This will remove saved subscriber edits, profile preferences, and theme settings from this browser.</p><Button variant="danger" onClick={() => setConfirmReset(true)}><RotateCcw size={15} />Reset demo data</Button></div></SettingsSection></div>
    <Modal isOpen={confirmReset} onClose={() => setConfirmReset(false)} title="Reset demo data"><p className="text-sm leading-6 text-gray-400">This permanently clears all dashboard data saved in this browser and reloads the app. Continue?</p><div className="mt-6 flex justify-end gap-2"><Button onClick={() => setConfirmReset(false)}>Cancel</Button><Button variant="danger" onClick={resetData}>Reset and reload</Button></div></Modal>
  </div>
}
