import { createContext, useContext } from 'react'
import { mockSubscribers } from '../data/netflixData'
import { useLocalStorage } from '../hooks/useLocalStorage'

const DataContext = createContext(null)
export function DataProvider({ children }) {
  const [subscribers, setSubscribers] = useLocalStorage('netflix-subscribers', mockSubscribers)
  const addSubscriber = (subscriber) => setSubscribers((items) => [{ ...subscriber, id: Date.now(), status: 'Active', joinDate: new Date().toISOString().slice(0, 10), monthlySpend: Number(subscriber.monthlySpend) || ({ Basic: 6.99, Standard: 15.49, Premium: 22.99 }[subscriber.plan] || 0) }, ...items])
  const updateSubscriber = (id, changes) => setSubscribers((items) => items.map((item) => item.id === id ? { ...item, ...changes, monthlySpend: Number(changes.monthlySpend ?? item.monthlySpend) } : item))
  const deleteSubscriber = (id) => setSubscribers((items) => items.filter((item) => item.id !== id))
  return <DataContext.Provider value={{ subscribers: Array.isArray(subscribers) ? subscribers : [], addSubscriber, updateSubscriber, deleteSubscriber }}>{children}</DataContext.Provider>
}
export function useData() {
  const context = useContext(DataContext)
  if (!context) throw new Error('useData must be used within DataProvider')
  return context
}
