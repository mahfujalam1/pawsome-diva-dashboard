import { createContext, useContext, useState, type ReactNode } from 'react'
import type { Booking, User, Sitter, Service, Payment } from '../types'
import { mockBookings, mockUsers, mockSitters, mockServices, mockPayments } from '../data/mockData'

interface AppContextType {
  bookings: Booking[]
  users: User[]
  sitters: Sitter[]
  services: Service[]
  payments: Payment[]
  updateBookingStatus: (id: string, status: Booking['status'], sitter?: string) => void
  addService: (service: Omit<Service, 'id'>) => void
  updateService: (id: string, service: Partial<Service>) => void
  deleteService: (id: string) => void
  addSitter: (sitter: Omit<Sitter, 'id' | 'rating' | 'reviewCount' | 'activeJobs' | 'completed' | 'status'>) => void
}

const AppContext = createContext<AppContextType | null>(null)

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [bookings, setBookings] = useState<Booking[]>(mockBookings)
  const [users] = useState<User[]>(mockUsers)
  const [sitters, setSitters] = useState<Sitter[]>(mockSitters)
  const [services, setServices] = useState<Service[]>(mockServices)
  const [payments] = useState<Payment[]>(mockPayments)

  const updateBookingStatus = (id: string, status: Booking['status'], sitter?: string) => {
    setBookings(prev => prev.map(b =>
      b.id === id ? { ...b, status, sitter: sitter || b.sitter, assignedBy: sitter ? 'Raquel' : b.assignedBy } : b
    ))
  }

  const addService = (service: Omit<Service, 'id'>) => {
    const newService: Service = { ...service, id: `SV${Date.now()}` }
    setServices(prev => [...prev, newService])
  }

  const updateService = (id: string, data: Partial<Service>) => {
    setServices(prev => prev.map(s => s.id === id ? { ...s, ...data } : s))
  }

  const deleteService = (id: string) => {
    setServices(prev => prev.filter(s => s.id !== id))
  }

  const addSitter = (data: Omit<Sitter, 'id' | 'rating' | 'reviewCount' | 'activeJobs' | 'completed' | 'status'>) => {
    const newSitter: Sitter = {
      ...data, id: `S${Date.now()}`, rating: 0, reviewCount: 0,
      activeJobs: 0, completed: 0, status: 'online'
    }
    setSitters(prev => [...prev, newSitter])
  }

  return (
    <AppContext.Provider value={{ bookings, users, sitters, services, payments, updateBookingStatus, addService, updateService, deleteService, addSitter }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
