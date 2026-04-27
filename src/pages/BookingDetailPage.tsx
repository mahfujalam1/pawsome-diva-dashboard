import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Button, Modal, message } from 'antd'
import { ArrowLeftOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'
import { useApp } from '../hooks/useApp'
import StatusBadge from '../components/common/StatusBadge'
import AvatarComp from '../components/common/Avatar'

const BookingDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const { bookings, sitters, updateBookingStatus } = useApp()
  const navigate = useNavigate()
  const [assignModal, setAssignModal] = useState(false)
  const [selectedSitter, setSelectedSitter] = useState('')

  const booking = bookings.find(b => b.id === id)
  if (!booking) return (
    <div style={{ textAlign: 'center', padding: 60 }}>
      <div style={{ fontSize: 48 }}>📋</div>
      <h2 style={{ color: '#1A1A2E' }}>Booking not found</h2>
      <Button type="primary" onClick={() => navigate('/bookings')} style={{ background: '#FF4D8D', border: 'none', marginTop: 16 }}>Back to Bookings</Button>
    </div>
  )

  const handleAssign = () => {
    if (!selectedSitter) { message.error('Please select a sitter'); return }
    updateBookingStatus(booking.id, 'Approved', selectedSitter)
    message.success(`Assigned to ${selectedSitter}!`)
    setAssignModal(false)
    setSelectedSitter('')
  }

  const handleReject = () => {
    Modal.confirm({
      title: 'Reject Booking?',
      content: 'This action cannot be undone.',
      okText: 'Reject',
      okButtonProps: { danger: true },
      onOk: () => {
        updateBookingStatus(booking.id, 'Cancelled')
        message.success('Booking rejected')
      }
    })
  }

  const infoBlock = (label: string, value: string) => (
    <div>
      <div style={{ fontSize: 12, color: '#9CA3AF', marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 14, fontWeight: 600, color: '#1A1A2E' }}>{value}</div>
    </div>
  )

  return (
    <div>
      <button onClick={() => navigate('/bookings')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6B7280', fontSize: 14, display: 'flex', alignItems: 'center', gap: 6, marginBottom: 16 }}>
        <ArrowLeftOutlined /> Back to Bookings
      </button>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 700, color: '#1A1A2E', margin: 0 }}>Booking Details</h1>
          <p style={{ color: '#6B7280', fontSize: 13, marginTop: 4 }}>Booking ID: {booking.id}</p>
        </div>
        <StatusBadge status={booking.status} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 24 }} className="lg:grid-cols-[1fr_280px] grid-cols-1">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Booking Info */}
          <div style={{ background: 'white', borderRadius: 16, border: '1px solid #F0F0F0', padding: 24 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1A1A2E', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
              📅 Booking Information
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              {infoBlock('Service', booking.service)}
              {infoBlock('Duration', booking.duration)}
              {infoBlock('Date', booking.date)}
              {infoBlock('Time', booking.time)}
              {infoBlock('Price', `$${booking.price.toFixed(2)}`)}
              {infoBlock('Created', booking.createdAt)}
            </div>
            {booking.address && (
              <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid #F0F0F0' }}>
                <div style={{ fontSize: 12, color: '#9CA3AF', marginBottom: 4 }}>Service Address</div>
                <div style={{ fontSize: 14, color: '#1A1A2E' }}>📍 {booking.address}</div>
              </div>
            )}
          </div>

          {/* Customer Info */}
          <div style={{ background: 'white', borderRadius: 16, border: '1px solid #F0F0F0', padding: 24 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1A1A2E', marginBottom: 20 }}>👤 Customer Information</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <AvatarComp name={booking.customer} size={28} />
                <span style={{ fontWeight: 600, fontSize: 14, color: '#1A1A2E' }}>{booking.customer}</span>
              </div>
              <div style={{ fontSize: 13, color: '#6B7280' }}>✉️ {booking.customerEmail}</div>
            </div>
          </div>

          {/* Pet Info */}
          <div style={{ background: 'white', borderRadius: 16, border: '1px solid #F0F0F0', padding: 24 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1A1A2E', marginBottom: 20 }}>🐾 Pet Information</h3>
            <div style={{ background: '#FFF0F5', borderRadius: 12, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
              <AvatarComp name={booking.pet} size={32} color="#FF4D8D" />
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, color: '#1A1A2E' }}>{booking.pet}</div>
                <div style={{ fontSize: 12, color: '#9CA3AF' }}>View full pet profile in Users section</div>
              </div>
            </div>
          </div>

          {/* Assignment Details */}
          {booking.sitter && (
            <div style={{ background: '#F0F4FF', borderRadius: 16, border: '1px solid #E0E7FF', padding: 24 }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1A1A2E', marginBottom: 20 }}>📋 Assignment Details</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                {infoBlock('Assigned To', booking.sitter)}
                {infoBlock('Assigned By', booking.assignedBy || '-')}
              </div>
            </div>
          )}
        </div>

        {/* Right side */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Actions */}
          {booking.status === 'Pending' && (
            <div style={{ background: 'white', borderRadius: 16, border: '1px solid #F0F0F0', padding: 20 }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: '#1A1A2E', marginBottom: 16 }}>Actions</h3>
              <Button type="primary" block onClick={() => setAssignModal(true)} icon={<CheckCircleOutlined />} style={{
                height: 44, borderRadius: 10, background: 'linear-gradient(180deg, #FF5CA8 0%, #FF8A80 100%)', border: 'none',
                fontWeight: 600, marginBottom: 10,
              }}>
                Approve & Assign
              </Button>
              <Button danger block onClick={handleReject} icon={<CloseCircleOutlined />} style={{ height: 44, borderRadius: 10 }}>
                Reject Booking
              </Button>
            </div>
          )}

          {/* Status Timeline */}
          <div style={{ background: 'white', borderRadius: 16, border: '1px solid #F0F0F0', padding: 20 }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: '#1A1A2E', marginBottom: 16 }}>Status Timeline</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'flex', gap: 12 }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#FF4D8D', flexShrink: 0, marginTop: 3 }} />
                  <div style={{ width: 1, flex: 1, background: '#F0F0F0', margin: '4px 0' }} />
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#1A1A2E' }}>{booking.status}</div>
                  <div style={{ fontSize: 12, color: '#9CA3AF' }}>Current status</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#E5E7EB', flexShrink: 0, marginTop: 3 }} />
                <div>
                  <div style={{ fontSize: 14, color: '#6B7280' }}>Created</div>
                  <div style={{ fontSize: 12, color: '#9CA3AF' }}>{booking.createdAt}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Assign Modal */}
      <Modal title="Approve & Assign Booking" open={assignModal} onCancel={() => { setAssignModal(false); setSelectedSitter('') }} footer={null} width={440}>
        <p style={{ color: '#6B7280', marginBottom: 20, fontSize: 14 }}>Select a sitter to assign this booking to.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
          {sitters.map(s => (
            <div key={s.id} onClick={() => setSelectedSitter(s.name)} style={{
              border: `2px solid ${selectedSitter === s.name ? '#FF4D8D' : '#F0F0F0'}`,
              borderRadius: 12, padding: 14, cursor: 'pointer',
              background: selectedSitter === s.name ? '#FFF0F5' : 'white', transition: 'all 0.15s',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 700, color: '#1A1A2E' }}>{s.name}</div>
                  <div style={{ fontSize: 13, color: '#6B7280' }}>{s.activeJobs} active jobs • Rating: {s.rating}/5</div>
                </div>
                <span style={{ background: '#D1FAE5', color: '#059669', borderRadius: 20, padding: '2px 10px', fontSize: 12, fontWeight: 600 }}>{s.status}</span>
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <Button onClick={() => { setAssignModal(false); setSelectedSitter('') }} block style={{ height: 44, borderRadius: 10, borderColor: '#FF4D8D', color: '#FF4D8D' }}>Cancel</Button>
          <Button type="primary" onClick={handleAssign} block style={{ height: 44, borderRadius: 10, background: 'linear-gradient(180deg, #FF5CA8 0%, #FF8A80 100%)', border: 'none', fontWeight: 700 }}>Confirm Assignment</Button>
        </div>
      </Modal>
    </div>
  )
}

export default BookingDetailPage
