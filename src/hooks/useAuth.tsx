import { createContext, useContext, useState, type ReactNode } from 'react'
import type { Admin } from '../types'

interface AuthContextType {
  admin: Admin | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string, password: string) => Promise<boolean> // ✅ added
  logout: () => void
  updateAdmin: (data: Partial<Admin>) => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [admin, setAdmin] = useState<Admin | null>(() => {
    const stored = localStorage.getItem('pawsome_admin')
    return stored ? JSON.parse(stored) : null
  })

  const login = async (email: string, password: string): Promise<boolean> => {
    await new Promise(r => setTimeout(r, 800))

    if (email === 'raquel@pawsomediva.com' && password === 'admin123') {
      const adminData: Admin = { name: 'Raquel', email, role: 'Admin' }
      setAdmin(adminData)
      localStorage.setItem('pawsome_admin', JSON.stringify(adminData))
      return true
    }

    return false
  }

  // ✅ NEW REGISTER FUNCTION
  const register = async (
    name: string,
    email: string,
    _password: string
  ): Promise<boolean> => {
    await new Promise(r => setTimeout(r, 800))

    // fake check: already exists
    if (email === 'raquel@pawsomediva.com') {
      return false
    }

    // create new admin (simulate backend)
    const adminData: Admin = {
      name,
      email,
      role: 'Admin',
    }

    setAdmin(adminData)
    localStorage.setItem('pawsome_admin', JSON.stringify(adminData))

    return true
  }

  const logout = () => {
    setAdmin(null)
    localStorage.removeItem('pawsome_admin')
  }

  const updateAdmin = (data: Partial<Admin>) => {
    if (admin) {
      const updated = { ...admin, ...data }
      setAdmin(updated)
      localStorage.setItem('pawsome_admin', JSON.stringify(updated))
    }
  }

  return (
    <AuthContext.Provider
      value={{
        admin,
        isAuthenticated: !!admin,
        login,
        register, // ✅ added here
        logout,
        updateAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}