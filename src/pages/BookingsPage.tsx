import React, { useState } from 'react'
import { Input, Select } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../hooks/useApp'
import PageHeader from '../components/common/PageHeader'
import StatusBadge from '../components/common/StatusBadge'

const BookingsPage: React.FC = () => {
  const { bookings } = useApp()
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  const filtered = bookings.filter(b => {
    const matchSearch = b.customer.toLowerCase().includes(search.toLowerCase()) ||
      b.id.toLowerCase().includes(search.toLowerCase()) ||
      b.service.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'all' || b.status === statusFilter
    return matchSearch && matchStatus
  })

  return (
    <div>
      <PageHeader title="Bookings" subtitle="Manage all service bookings" />

      <div style={{ background: 'white', borderRadius: 16, border: '1px solid #F0F0F0', overflow: 'hidden' }}>
        {/* Filters */}
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #F0F0F0', display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Input
            prefix={<SearchOutlined style={{ color: '#9CA3AF' }} />}
            placeholder="Search by customer, booking ID, or service..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ flex: 1, minWidth: 200, borderRadius: 10, height: 40 }}
          />
          <Select
            value={statusFilter}
            onChange={setStatusFilter}
            style={{ width: 160, height: 40 }}
            options={[
              { value: 'all', label: 'All Status' },
              { value: 'Pending', label: 'Pending' },
              { value: 'Approved', label: 'Approved' },
              { value: 'In Progress', label: 'In Progress' },
              { value: 'Completed', label: 'Completed' },
              { value: 'Cancelled', label: 'Cancelled' },
            ]}
          />
        </div>

        <div style={{ padding: '12px 20px', borderBottom: '1px solid #F0F0F0' }}>
          <span style={{ fontSize: 13, color: '#6B7280' }}>Showing {filtered.length} of {bookings.length} bookings</span>
        </div>

        {/* Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#FFF0F5' }}>
                {['Booking ID', 'Customer', 'Pet(s)', 'Service', 'Date & Time', 'Status', 'Assigned Sitter', 'Action'].map(h => (
                  <th key={h} style={{ padding: '12px 20px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: '#6B7280', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(b => (
                <tr key={b.id} style={{ borderBottom: '1px solid #F9F9F9', transition: 'background 0.1s' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#FFF9FC'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
                >
                  <td style={{ padding: '16px 20px', fontWeight: 700, fontSize: 13, color: '#1A1A2E' }}>{b.id}</td>
                  <td style={{ padding: '16px 20px' }}>
                    <div style={{ fontWeight: 600, fontSize: 13, color: '#1A1A2E' }}>{b.customer}</div>
                    <div style={{ fontSize: 12, color: '#9CA3AF' }}>{b.customerEmail}</div>
                  </td>
                  <td style={{ padding: '16px 20px', fontSize: 13, color: '#6B7280' }}>{b.pet}</td>
                  <td style={{ padding: '16px 20px', fontSize: 13, color: '#6B7280' }}>{b.service}</td>
                  <td style={{ padding: '16px 20px' }}>
                    <div style={{ fontSize: 13, color: '#1A1A2E' }}>📅 {b.date}</div>
                    <div style={{ fontSize: 12, color: '#9CA3AF' }}>⏰ {b.time}</div>
                  </td>
                  <td style={{ padding: '16px 20px' }}><StatusBadge status={b.status} /></td>
                  <td style={{ padding: '16px 20px', fontSize: 13, color: b.sitter ? '#1A1A2E' : '#9CA3AF' }}>{b.sitter || 'Not assigned'}</td>
                  <td style={{ padding: '16px 20px' }}>
                    <button onClick={() => navigate(`/bookings/${b.id}`)} style={{
                      background: 'none', border: 'none', color: '#FF4D8D', cursor: 'pointer', fontWeight: 700, fontSize: 13
                    }}>View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: 40, color: '#9CA3AF' }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>📋</div>
              <div>No bookings found</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default BookingsPage
