import React, { useState } from 'react'
import { Modal, Button, message } from 'antd'
import { RiCalendarLine, RiMoneyDollarCircleLine, RiUserLine, RiCheckboxCircleLine, RiAddLine, RiEyeLine, RiUserHeartLine } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useApp } from '../hooks/useApp'
import StatCard from '../components/common/StatCard'
import StatusBadge from '../components/common/StatusBadge'
import type { Booking } from '../types'

const DashboardPage: React.FC = () => {
  const { admin } = useAuth()
  const { bookings, sitters, updateBookingStatus } = useApp()
  const navigate = useNavigate()
  const [assignModal, setAssignModal] = useState(false)
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
  const [selectedSitter, setSelectedSitter] = useState<string>('')

  const pending = bookings.filter(b => b.status === 'Pending')
  const totalRevenue = bookings.filter(b => b.status === 'Completed').reduce((s, b) => s + b.price, 0)
  const activeUsers = [...new Set(bookings.map(b => b.customer))].length
  const completed = bookings.filter(b => b.status === 'Completed').length

  const handleAssign = () => {
    if (!selectedBooking || !selectedSitter) { message.error('Please select a sitter'); return }
    updateBookingStatus(selectedBooking.id, 'Approved', selectedSitter)
    message.success(`Booking assigned to ${selectedSitter}!`)
    setAssignModal(false)
    setSelectedSitter('')
    setSelectedBooking(null)
  }

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 26, fontWeight: 700, color: '#1A1A2E', margin: 0 }}>Dashboard</h1>
        <p style={{ color: '#6B7280', fontSize: 14, marginTop: 4 }}>Welcome back, {admin?.name}! Here's what's happening today.</p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16, marginBottom: 28 }}>
        <StatCard icon={<RiCalendarLine color="#FF4D8D" />} label="Total Bookings" value={bookings.length} change="+12%" iconBg="#FFF0F5" />
        <StatCard icon={<RiMoneyDollarCircleLine color="#10B981" />} label="Revenue" value={`$${(totalRevenue + 8000).toLocaleString()}`} change="+18%" iconBg="#D1FAE5" />
        <StatCard icon={<RiUserLine color="#3B82F6" />} label="Active Users" value={activeUsers} change="+5%" iconBg="#DBEAFE" />
        <StatCard icon={<RiCheckboxCircleLine color="#7C3AED" />} label="Completed Services" value={completed + 120} change="+22%" iconBg="#EDE9FE" />
      </div>

      {/* Pending Approvals */}
      {pending.length > 0 && (
        <div style={{ marginBottom: 28 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 16, fontWeight: 700, color: '#1A1A2E' }}>Pending Approvals</span>
              <span style={{ background: '#FF4D8D', color: 'white', borderRadius: 20, padding: '1px 8px', fontSize: 12, fontWeight: 700 }}>{pending.length}</span>
            </div>
            <button onClick={() => navigate('/bookings')} style={{ background: 'none', border: 'none', color: '#FF4D8D', cursor: 'pointer', fontWeight: 600, fontSize: 13 }}>View All →</button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
            {pending.slice(0, 2).map(b => (
              <div key={b.id} style={{ background: '#FFF9FC', border: '1px solid #FFD6E7', borderRadius: 16, padding: 18 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15, color: '#1A1A2E' }}>{b.service}</div>
                    <div style={{ color: '#6B7280', fontSize: 13 }}>{b.customer}</div>
                  </div>
                  <StatusBadge status={b.status} />
                </div>
                <div style={{ display: 'flex', gap: 16, marginBottom: 14, fontSize: 13, color: '#6B7280' }}>
                  <span>📅 {b.date}</span>
                  <span>⏰ {b.time}</span>
                </div>
                <button onClick={() => { setSelectedBooking(b); setAssignModal(true) }} style={{
                  width: '100%', padding: '10px', borderRadius: 10, border: 'none', cursor: 'pointer',
                  background: 'linear-gradient(180deg, #FF5CA8 0%, #FF8A80 100%)', color: 'white',
                  fontWeight: 600, fontSize: 14,
                }}>Review & Assign</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Bookings */}
      <div style={{ background: 'white', borderRadius: 16, border: '1px solid #F0F0F0', marginBottom: 28, overflow: 'hidden' }}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid #F0F0F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 16, fontWeight: 700, color: '#1A1A2E' }}>Recent Bookings</span>
          <button onClick={() => navigate('/bookings')} style={{ background: 'none', border: 'none', color: '#FF4D8D', cursor: 'pointer', fontWeight: 600, fontSize: 13 }}>View All →</button>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#FFF0F5' }}>
                {['Booking ID', 'Customer', 'Service', 'Date', 'Status', 'Sitter'].map(h => (
                  <th key={h} style={{ padding: '12px 20px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: '#6B7280', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bookings.slice(0, 5).map((b) => (
                <tr key={b.id} style={{ borderBottom: '1px solid #F9F9F9', cursor: 'pointer', transition: 'background 0.1s' }}
                  onClick={() => navigate(`/bookings/${b.id}`)}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#FFF9FC'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
                >
                  <td style={{ padding: '14px 20px', fontWeight: 700, fontSize: 13, color: '#1A1A2E' }}>{b.id}</td>
                  <td style={{ padding: '14px 20px', fontSize: 13, color: '#1A1A2E' }}>{b.customer}</td>
                  <td style={{ padding: '14px 20px', fontSize: 13, color: '#6B7280' }}>{b.service}</td>
                  <td style={{ padding: '14px 20px', fontSize: 13, color: '#6B7280' }}>{b.date}</td>
                  <td style={{ padding: '14px 20px' }}><StatusBadge status={b.status} /></td>
                  <td style={{ padding: '14px 20px', fontSize: 13, color: '#6B7280' }}>{b.sitter || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 style={{ fontSize: 16, fontWeight: 700, color: '#1A1A2E', marginBottom: 16 }}>Quick Actions</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 16 }}>
          {[
            { icon: <RiAddLine size={22} color="#FF4D8D" />, label: 'Add Service', sub: 'Create a new service offering', onClick: () => navigate('/services') },
            { icon: <RiEyeLine size={22} color="#3B82F6" />, label: 'View Bookings', sub: 'Manage all service bookings', onClick: () => navigate('/bookings') },
            { icon: <RiUserHeartLine size={22} color="#7C3AED" />, label: 'Manage Sitters', sub: 'View and assign sitters', onClick: () => navigate('/sitters') },
          ].map(a => (
            <button key={a.label} onClick={a.onClick} style={{
              background: 'white', border: '1px solid #F0F0F0', borderRadius: 16, padding: 20,
              cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 16px rgba(255,77,141,0.12)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; (e.currentTarget as HTMLElement).style.transform = 'none' }}
            >
              <div style={{ width: 44, height: 44, background: '#FFF0F5', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>{a.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 14, color: '#1A1A2E', marginBottom: 4 }}>{a.label}</div>
              <div style={{ fontSize: 12, color: '#9CA3AF' }}>{a.sub}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Assign Modal */}
      <Modal
        title={<span style={{ fontWeight: 700, fontSize: 18 }}>Approve & Assign Booking</span>}
        open={assignModal}
        onCancel={() => { setAssignModal(false); setSelectedSitter('') }}
        footer={null}
        width={440}
      >
        {selectedBooking && (
          <div style={{ padding: '8px 0' }}>
            <p style={{ color: '#6B7280', marginBottom: 20, fontSize: 14 }}>Select a sitter to assign this booking to. The customer and sitter will be notified.</p>
            <div style={{ marginBottom: 20 }}>
              <label style={{ fontWeight: 600, fontSize: 13, color: '#1A1A2E', display: 'block', marginBottom: 10 }}>Assign to Sitter</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {sitters.map(s => (
                  <div key={s.id} onClick={() => setSelectedSitter(s.name)} style={{
                    border: `2px solid ${selectedSitter === s.name ? '#FF4D8D' : '#F0F0F0'}`,
                    borderRadius: 12, padding: 14, cursor: 'pointer',
                    background: selectedSitter === s.name ? '#FFF0F5' : 'white', transition: 'all 0.15s',
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 15, color: '#1A1A2E' }}>{s.name}</div>
                        <div style={{ fontSize: 13, color: '#6B7280' }}>{s.activeJobs} active jobs • Rating: {s.rating}/5</div>
                      </div>
                      <span style={{ background: '#D1FAE5', color: '#059669', borderRadius: 20, padding: '2px 10px', fontSize: 12, fontWeight: 600 }}>{s.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background: '#F0F4FF', borderRadius: 10, padding: 12, marginBottom: 20 }}>
              <div style={{ fontSize: 12, color: '#6B7280' }}>Assigned By</div>
              <div style={{ fontWeight: 700, color: '#1A1A2E' }}>{admin?.name} (Current Admin)</div>
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <Button onClick={() => { setAssignModal(false); setSelectedSitter('') }} block style={{ height: 44, borderRadius: 10, borderColor: '#FF4D8D', color: '#FF4D8D' }}>Cancel</Button>
              <Button type="primary" onClick={handleAssign} block style={{
                height: 44, borderRadius: 10, background: 'linear-gradient(180deg, #FF5CA8 0%, #FF8A80 100%)', border: 'none', fontWeight: 700,
              }}>Confirm Assignment</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default DashboardPage
