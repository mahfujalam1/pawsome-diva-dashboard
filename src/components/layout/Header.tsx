import React from 'react'
import { Badge, Dropdown } from 'antd'
import { RiBellLine, RiMenuLine, RiSettings3Line, RiLogoutBoxLine } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import AvatarComp from '../common/Avatar'

interface HeaderProps {
  onMenuClick: () => void
  onToggleSidebar: () => void
}

const Header: React.FC<HeaderProps> = ({ onMenuClick, onToggleSidebar }) => {
  const { admin, logout } = useAuth()
  const navigate = useNavigate()

  const items = [
    { key: 'settings', label: 'Settings', icon: <RiSettings3Line />, onClick: () => navigate('/settings') },
    { key: 'logout', label: 'Logout', icon: <RiLogoutBoxLine />, danger: true, onClick: () => { logout(); navigate('/login') } },
  ]

  const [notifs, setNotifs] = React.useState([
    { id: 1, title: 'New Booking', message: 'John Doe booked a session', time: '5m ago', read: false },
    { id: 2, title: 'Payment Received', message: 'Received $120 from Sarah', time: '1h ago', read: false },
    { id: 3, title: 'Sitter Application', message: 'Mike Ross applied', time: '3h ago', read: true },
  ])

  const markAllRead = () => {
    setNotifs(notifs.map(n => ({ ...n, read: true })))
  }

  const notificationMenu = (
    <div style={{ background: 'white', borderRadius: 16, boxShadow: '0 10px 40px rgba(0,0,0,0.1)', width: 320, padding: '16px 0', border: '1px solid #F0F0F0' }}>
      <div style={{ padding: '0 20px 12px', borderBottom: '1px solid #F9F9F9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>Notifications</h3>
        <button onClick={markAllRead} style={{ background: 'none', border: 'none', color: '#FF4D8D', fontSize: 12, cursor: 'pointer', fontWeight: 600 }}>Mark all as read</button>
      </div>
      <div style={{ maxHeight: 300, overflowY: 'auto' }}>
        {notifs.map(n => (
          <div key={n.id} style={{ padding: '12px 20px', borderBottom: '1px solid #F9F9F9', background: n.read ? 'transparent' : '#FFF9FC', transition: 'background 0.2s' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
              <span style={{ fontWeight: 700, fontSize: 13, color: '#1A1A2E' }}>{n.title}</span>
              <span style={{ fontSize: 11, color: '#9CA3AF' }}>{n.time}</span>
            </div>
            <div style={{ fontSize: 12, color: '#6B7280', lineHeight: 1.4 }}>{n.message}</div>
          </div>
        ))}
      </div>
      <div style={{ padding: '12px 20px 0', textAlign: 'center' }}>
        <button style={{ background: 'none', border: 'none', color: '#9CA3AF', fontSize: 12, cursor: 'pointer' }}>View all notifications</button>
      </div>
    </div>
  )

  const unreadCount = notifs.filter(n => !n.read).length

  return (
    <header style={{
      height: 64, background: 'white', borderBottom: '1px solid #F0F0F0',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 24px', position: 'sticky', top: 0, zIndex: 50, flexShrink: 0,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <button
          onClick={onMenuClick}
          className="md:hidden"
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}
        >
          <RiMenuLine size={22} color="#6B7280" />
        </button>
        <button
          onClick={onToggleSidebar}
          className="hidden md:block"
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}
        >
          <RiMenuLine size={22} color="#6B7280" />
        </button>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <Dropdown dropdownRender={() => notificationMenu} trigger={['click']} placement="bottomRight">
          <Badge count={unreadCount} size="small" offset={[-2, 2]}>
            <button style={{
              background: '#FFF0F5', border: 'none', borderRadius: 10,
              width: 38, height: 38, cursor: 'pointer', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
            }}>
              <RiBellLine size={18} color="#FF4D8D" />
            </button>
          </Badge>
        </Dropdown>

        <Dropdown menu={{ items }} placement="bottomRight" trigger={['click']}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', padding: '4px 8px', borderRadius: 10, transition: 'background 0.15s' }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#FFF0F5'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
          >
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#1A1A2E' }}>{admin?.name}</div>
              <div style={{ fontSize: 11, color: '#9CA3AF' }}>{admin?.role}</div>
            </div>
            <AvatarComp name={admin?.name || 'A'} size={36} color="#FF4D8D" />
          </div>
        </Dropdown>
      </div>
    </header>
  )
}

export default Header
