import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { RiDashboardLine, RiCalendarCheckLine, RiScissorsLine, RiUserLine, RiUserHeartLine, RiBankCardLine, RiBarChartLine, RiSettings3Line, RiLogoutBoxLine, RiCloseLine } from 'react-icons/ri'
import { useAuth } from '../../hooks/useAuth'

const navItems = [
  { key: '/dashboard', label: 'Dashboard', icon: RiDashboardLine },
  { key: '/bookings', label: 'Bookings', icon: RiCalendarCheckLine },
  { key: '/services', label: 'Services', icon: RiScissorsLine },
  { key: '/users', label: 'Users', icon: RiUserLine },
  { key: '/sitters', label: 'Sitters', icon: RiUserHeartLine },
  { key: '/payments', label: 'Payments', icon: RiBankCardLine },
  { key: '/analytics', label: 'Analytics', icon: RiBarChartLine },
  { key: '/settings', label: 'Settings', icon: RiSettings3Line },
]

interface SidebarProps {
  isSidebarOpen: boolean
  mobileOpen: boolean
  onMobileClose: () => void
}

const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen, mobileOpen, onMobileClose }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const { logout } = useAuth()

  const handleNav = (key: string) => {
    navigate(key)
    onMobileClose()
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const [settingsOpen, setSettingsOpen] = React.useState(false)

  const renderContent = (isMobile: boolean = false) => (
    <div style={{
      width: 260, height: '100%', background: 'white',
      borderRight: '1px solid #F0F0F0', display: 'flex', flexDirection: 'column',
      position: 'fixed', top: 0,
      left: isMobile ? 0 : (isSidebarOpen ? 0 : -260),
      zIndex: isMobile ? 210 : 100,
      transition: 'left 0.3s ease',
    }}>
      <div style={{ padding: '20px 20px 16px', borderBottom: '1px solid #F9F9F9' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 42, height: 42,
            borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 18, flexShrink: 0,
          }}><img src="/logo.png" alt="logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} /></div>
          <div>
            <div style={{ fontWeight: 800, fontSize: 15, color: '#1A1A2E', lineHeight: 1.2 }}>Pawsome Diva</div>
            <div style={{ fontSize: 11, color: '#9CA3AF' }}>Admin Portal</div>
          </div>
        </div>
      </div>

      <nav style={{ flex: 1, padding: '12px 12px', overflowY: 'auto' }}>
        {navItems.map(({ key, label, icon: Icon }) => {
          if (key === '/settings') {
            const active = location.pathname.startsWith('/settings')
            return (
              <div key={key}>
                <button
                  onClick={() => setSettingsOpen(!settingsOpen)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    width: '100%', padding: '10px 12px', marginBottom: 4,
                    borderRadius: 10, border: 'none', cursor: 'pointer',
                    background: active ? '#FFF0F5' : 'transparent',
                    color: active ? '#FF4D8D' : '#6B7280',
                    fontWeight: active ? 600 : 400, fontSize: 14,
                    transition: 'all 0.15s ease',
                  }}
                >
                  <Icon size={18} />
                  {label}
                  <div style={{ marginLeft: 'auto', transition: 'transform 0.2s', transform: settingsOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}>›</div>
                </button>
                {settingsOpen && (
                  <div style={{ paddingLeft: 28, marginBottom: 8 }}>
                    {[
                      { key: '/settings/profile', label: 'My Profile' },
                      { key: '/settings/about', label: 'About Us' },
                      { key: '/settings/privacy', label: 'Privacy Policy' },
                      { key: '/settings/terms', label: 'Terms & Conditions' },
                    ].map(sub => (
                      <button
                        key={sub.key}
                        onClick={() => handleNav(sub.key)}
                        style={{
                          display: 'flex', alignItems: 'center', gap: 10,
                          width: '100%', padding: '8px 12px', marginBottom: 2,
                          borderRadius: 8, border: 'none', cursor: 'pointer',
                          background: location.pathname === sub.key ? '#FFF9FC' : 'transparent',
                          color: location.pathname === sub.key ? '#FF4D8D' : '#6B7280',
                          fontSize: 13, fontWeight: location.pathname === sub.key ? 600 : 400,
                          transition: 'all 0.15s ease',
                        }}
                      >
                        {sub.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )
          }

          const active = location.pathname === key
          return (
            <button
              key={key}
              onClick={() => handleNav(key)}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                width: '100%', padding: '10px 12px', marginBottom: 4,
                borderRadius: 10, border: 'none', cursor: 'pointer',
                background: active ? '#FFF0F5' : 'transparent',
                color: active ? '#FF4D8D' : '#6B7280',
                fontWeight: active ? 600 : 400, fontSize: 14,
                transition: 'all 0.15s ease',
              }}
              onMouseEnter={e => { if (!active) { (e.currentTarget as HTMLElement).style.background = '#FFF9FC'; (e.currentTarget as HTMLElement).style.color = '#FF4D8D' } }}
              onMouseLeave={e => { if (!active) { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = '#6B7280' } }}
            >
              <Icon size={18} />
              {label}
              {active && <div style={{ marginLeft: 'auto', width: 6, height: 6, borderRadius: '50%', background: '#FF4D8D' }} />}
            </button>
          )
        })}
      </nav>

      <div style={{ padding: '12px', borderTop: '1px solid #F9F9F9' }}>
        <button
          onClick={handleLogout}
          style={{
            display: 'flex', alignItems: 'center', gap: 10,
            width: '100%', padding: '10px 12px', borderRadius: 10,
            border: 'none', cursor: 'pointer', background: 'transparent',
            color: '#EF4444', fontSize: 14, fontWeight: 500,
            transition: 'background 0.15s',
          }}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#FEE2E2'}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
        >
          <RiLogoutBoxLine size={18} />
          Logout
        </button>
      </div>
    </div>
  )

  return (
    <>
      <div className="max-md:hidden">{renderContent(false)}</div>
      {mobileOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 200 }}>
          <div onClick={onMobileClose} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)' }} />
          {renderContent(true)}
          <button onClick={onMobileClose} style={{
            position: 'fixed', top: 16, left: 230, background: 'white',
            border: 'none', borderRadius: 8, padding: 8, cursor: 'pointer', zIndex: 220,
          }}>
            <RiCloseLine size={20} />
          </button>
        </div>
      )}
    </>
  )
}

export default Sidebar
