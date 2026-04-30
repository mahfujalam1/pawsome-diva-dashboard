import React, { useState } from 'react'
import { Input, Modal, Button } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { useApp } from '../hooks/useApp'
import PageHeader from '../components/common/PageHeader'
import AvatarComp from '../components/common/Avatar'

const UsersPage: React.FC = () => {
  const { users } = useApp()
  const [search, setSearch] = useState('')

  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  )

  const [viewModal, setViewModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState<any>(null)

  const openView = (u: any) => {
    setSelectedUser(u)
    setViewModal(true)
  }

  return (
    <div>
      <PageHeader title="Users" subtitle="Manage customer accounts" />

      <Input prefix={<SearchOutlined style={{ color: '#9CA3AF' }} />}
        placeholder="Search users..." value={search} onChange={e => setSearch(e.target.value)}
        style={{ maxWidth: 300, borderRadius: 10, height: 40, marginBottom: 20 }}
      />

      <div style={{ background: 'white', borderRadius: 16, border: '1px solid #F0F0F0', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#FFF0F5' }}>
              {['Name', 'Email', 'Pets', 'Total Bookings', 'Joined Date', 'Action'].map(h => (
                <th key={h} style={{ padding: '12px 20px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: '#6B7280', whiteSpace: 'nowrap' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(u => (
              <tr key={u.id} style={{ borderBottom: '1px solid #F9F9F9', transition: 'background 0.1s' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#FFF9FC'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
              >
                <td style={{ padding: '16px 20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <AvatarComp name={u.name} size={34} />
                    <span style={{ fontWeight: 600, fontSize: 14, color: '#1A1A2E' }}>{u.name}</span>
                  </div>
                </td>
                <td style={{ padding: '16px 20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#6B7280' }}>
                    ✉️ {u.email}
                  </div>
                </td>
                <td style={{ padding: '16px 20px', fontSize: 13, color: '#1A1A2E', fontWeight: 600 }}>{u.pets}</td>
                <td style={{ padding: '16px 20px', fontSize: 13, color: '#1A1A2E', fontWeight: 600 }}>{u.totalBookings}</td>
                <td style={{ padding: '16px 20px', fontSize: 13, color: '#6B7280' }}>📅 {u.joinedDate}</td>
                <td style={{ padding: '16px 20px' }}>
                  <button onClick={() => openView(u)} style={{ background: 'none', border: 'none', color: '#FF4D8D', cursor: 'pointer', fontWeight: 700, fontSize: 13 }}>View →</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: 40, color: '#9CA3AF' }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>👥</div>
            <div>No users found</div>
          </div>
        )}
      </div>

      <Modal
        title={<div style={{ fontSize: 18, fontWeight: 700 }}>User Profile</div>}
        open={viewModal}
        onCancel={() => setViewModal(false)}
        footer={[
          <Button key="close" onClick={() => setViewModal(false)} style={{ borderRadius: 8 }}>Close</Button>
        ]}
        width={400}
      >
        {selectedUser && (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <AvatarComp name={selectedUser.name} size={80} fontSize={32} />
            <h2 style={{ marginTop: 16, marginBottom: 4, fontSize: 22, fontWeight: 700 }}>{selectedUser.name}</h2>
            <p style={{ color: '#6B7280', fontSize: 14 }}>{selectedUser.email}</p>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 24, textAlign: 'left' }}>
              <div style={{ background: '#F9FAFB', padding: 12, borderRadius: 12 }}>
                <div style={{ fontSize: 11, color: '#9CA3AF', textTransform: 'uppercase', fontWeight: 600 }}>Total Pets</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: '#1A1A2E' }}>{selectedUser.pets}</div>
              </div>
              <div style={{ background: '#F9FAFB', padding: 12, borderRadius: 12 }}>
                <div style={{ fontSize: 11, color: '#9CA3AF', textTransform: 'uppercase', fontWeight: 600 }}>Bookings</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: '#1A1A2E' }}>{selectedUser.totalBookings}</div>
              </div>
              <div style={{ background: '#F9FAFB', padding: 12, borderRadius: 12, gridColumn: 'span 2' }}>
                <div style={{ fontSize: 11, color: '#9CA3AF', textTransform: 'uppercase', fontWeight: 600 }}>Member Since</div>
                <div style={{ fontSize: 15, fontWeight: 600, color: '#1A1A2E' }}>{selectedUser.joinedDate}</div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default UsersPage
