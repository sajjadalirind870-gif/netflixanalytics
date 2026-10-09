import { createContext, useContext } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

const AuthContext = createContext(null)
const defaultUser = { id: 1, name: 'Admin', email: 'admin@netflix.com', role: 'Admin' }
export function AuthProvider({ children }) {
  const [user, setUser] = useLocalStorage('netflix-profile', defaultUser)
  return <AuthContext.Provider value={{ user: user || defaultUser, setUser }}>{children}</AuthContext.Provider>
}
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
