import type { Booking, User, Sitter, Service, Payment } from '../types'

export const mockBookings: Booking[] = [
  {
    id: 'BK-1042', customer: 'Sarah Jenkins', customerEmail: 'sarah.j@example.com',
    pet: 'Bella', service: 'Dog Walking', date: '15/01/2024', time: '10:00 AM',
    duration: '1 hour', price: 25, status: 'Pending', sitter: null,
    address: '123 Park Avenue, Apt 4B, New York, NY 10001', createdAt: '14/01/2024, 15:30:00'
  },
  {
    id: 'BK-1041', customer: 'David Chen', customerEmail: 'david.c@example.com',
    pet: 'Max', service: 'Pet Sitting', date: '16/01/2024', time: '09:00 AM',
    duration: '8 hours', price: 80, status: 'Approved', sitter: 'Brother', assignedBy: 'Raquel',
    address: '456 Broadway, Floor 12, New York, NY 10013', createdAt: '13/01/2024, 20:20:00'
  },
  {
    id: 'BK-1040', customer: 'Sarah Jenkins', customerEmail: 'sarah.j@example.com',
    pet: 'Bella', service: 'Dog Walking', date: '14/01/2024', time: '10:00 AM',
    duration: '1 hour', price: 25, status: 'In Progress', sitter: 'Raquel', assignedBy: 'Raquel',
    address: '123 Park Avenue, Apt 4B, New York, NY 10001', createdAt: '14/01/2024, 14:00:00'
  },
  {
    id: 'BK-1039', customer: 'Emily White', customerEmail: 'emily.w@example.com',
    pet: 'Luna', service: 'Grooming', date: '13/01/2024', time: '02:00 PM',
    duration: '2 hours', price: 60, status: 'Completed', sitter: 'Brother', assignedBy: 'Brother',
    address: '789 5th Avenue, New York, NY 10022', createdAt: '12/01/2024, 16:00:00'
  },
  {
    id: 'BK-1038', customer: 'Michael Brown', customerEmail: 'michael.b@example.com',
    pet: 'Charlie', service: 'Daycare', date: '12/01/2024', time: '08:00 AM',
    duration: '8 hours', price: 75, status: 'Completed', sitter: 'Raquel', assignedBy: 'Raquel',
    address: '321 Oak Street, New York, NY 10004', createdAt: '11/01/2024, 10:00:00'
  },
  {
    id: 'BK-1037', customer: 'Jessica Martinez', customerEmail: 'jessica.m@example.com',
    pet: 'Rocky', service: 'Dog Walking', date: '11/01/2024', time: '04:00 PM',
    duration: '1 hour', price: 25, status: 'Cancelled', sitter: null,
    address: '555 Park Place, Brooklyn, NY 11217', createdAt: '10/01/2024, 16:00:00'
  },
  {
    id: 'BK-1036', customer: 'David Chen', customerEmail: 'david.c@example.com',
    pet: 'Max', service: 'Pet Sitting', date: '17/01/2024', time: '09:00 AM',
    duration: '8 hours', price: 80, status: 'Pending', sitter: null,
    address: '456 Broadway, Floor 12, New York, NY 10013', createdAt: '14/01/2024'
  },
  {
    id: 'BK-1035', customer: 'Amanda Lee', customerEmail: 'amanda.l@example.com',
    pet: 'Milo', service: 'Grooming', date: '18/01/2024', time: '11:00 AM',
    duration: '2 hours', price: 60, status: 'Pending', sitter: null,
    address: '888 Riverside Drive, New York, NY 10024', createdAt: '14/01/2024'
  },
]

export const mockUsers: User[] = [
  { id: 'U001', name: 'Sarah Jenkins', email: 'sarah.j@example.com', pets: 2, totalBookings: 12, joinedDate: '15/08/2023' },
  { id: 'U002', name: 'David Chen', email: 'david.c@example.com', pets: 1, totalBookings: 8, joinedDate: '22/09/2023' },
  { id: 'U003', name: 'Emily White', email: 'emily.w@example.com', pets: 1, totalBookings: 15, joinedDate: '10/07/2023' },
  { id: 'U004', name: 'Michael Brown', email: 'michael.b@example.com', pets: 1, totalBookings: 6, joinedDate: '05/10/2023' },
  { id: 'U005', name: 'Jessica Martinez', email: 'jessica.m@example.com', pets: 1, totalBookings: 10, joinedDate: '18/06/2023' },
  { id: 'U006', name: 'Amanda Lee', email: 'amanda.l@example.com', pets: 1, totalBookings: 4, joinedDate: '30/11/2023' },
]

export const mockSitters: Sitter[] = [
  { id: 'S001', name: 'Raquel', email: 'raquel@pawsomediva.com', rating: 4.9, reviewCount: 98, activeJobs: 3, completed: 124, status: 'online' },
  { id: 'S002', name: 'Brother', email: 'brother@pawsomediva.com', rating: 4.8, reviewCount: 72, activeJobs: 2, completed: 87, status: 'online' },
]

export const mockServices: Service[] = [
  { id: 'SV001', name: 'Dog Walking', description: 'Professional dog walking service in your neighborhood', price: 25, duration: '1 hour', icon: '🐕', status: 'active' },
  { id: 'SV002', name: 'Pet Sitting', description: 'In-home pet care while you are away', price: 80, duration: '8 hours', icon: '🏠', status: 'active' },
]

export const mockPayments: Payment[] = [
  { id: 'TXN-5421', customer: 'Emily White', bookingId: 'BK-1039', amount: 65, status: 'completed', date: '13/01/2024' },
  { id: 'TXN-5420', customer: 'Michael Brown', bookingId: 'BK-1039', amount: 75, status: 'completed', date: '12/01/2024' },
  { id: 'TXN-5419', customer: 'Sarah Jenkins', bookingId: 'BK-1040', amount: 27.50, status: 'pending', date: '14/01/2024' },
  { id: 'TXN-5418', customer: 'David Chen', bookingId: 'BK-1041', amount: 85, status: 'completed', date: '13/01/2024' },
  { id: 'TXN-5417', customer: 'Amanda Lee', bookingId: 'BK-1035', amount: 65, status: 'pending', date: '14/01/2024' },
  { id: 'TXN-5416', customer: 'David Chen', bookingId: 'BK-1036', amount: 85, status: 'pending', date: '14/01/2024' },
]

export const bookingTrends = [
  { month: 'Aug', bookings: 28, revenue: 2100 },
  { month: 'Sep', bookings: 35, revenue: 2800 },
  { month: 'Oct', bookings: 42, revenue: 3400 },
  { month: 'Nov', bookings: 38, revenue: 3100 },
  { month: 'Dec', bookings: 55, revenue: 4500 },
  { month: 'Jan', bookings: 72, revenue: 5800 },
]

export const serviceDistribution = [
  { name: 'Dog Walking', value: 45, color: '#FF4D8D' },
  { name: 'Pet Sitting', value: 30, color: '#FF80AB' },
  { name: 'Grooming', value: 15, color: '#FFB3CC' },
  { name: 'Daycare', value: 10, color: '#FFD6E7' },
]

export const userGrowth = [
  { month: 'Aug', users: 12 },
  { month: 'Sep', users: 18 },
  { month: 'Oct', users: 25 },
  { month: 'Nov', users: 32 },
  { month: 'Dec', users: 38 },
  { month: 'Jan', users: 42 },
]
