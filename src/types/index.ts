export type BookingStatus = 'Pending' | 'Approved' | 'In Progress' | 'Completed' | 'Cancelled'
export type PaymentStatus = 'completed' | 'pending' | 'failed'

export interface Booking {
  id: string
  customer: string
  customerEmail: string
  pet: string
  service: string
  date: string
  time: string
  duration: string
  price: number
  status: BookingStatus
  sitter: string | null
  assignedBy?: string
  address: string
  createdAt: string
}

export interface User {
  id: string
  name: string
  email: string
  pets: number
  totalBookings: number
  joinedDate: string
  avatar?: string
}

export interface Sitter {
  id: string
  name: string
  email: string
  rating: number
  reviewCount: number
  activeJobs: number
  completed: number
  status: 'online' | 'offline'
  address?: string
}

export interface Service {
  image?: string
  id: string
  name: string
  description: string
  price: number
  duration: string
  icon: string
  status: 'active' | 'inactive'
}

export interface Payment {
  id: string
  customer: string
  bookingId: string
  amount: number
  status: PaymentStatus
  date: string
}

export interface Admin {
  name: string
  email: string
  role: string
  avatar?: string
}
