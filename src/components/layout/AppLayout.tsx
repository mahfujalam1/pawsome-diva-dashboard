import React, { useState } from 'react'
import type { ReactNode } from 'react'
import Sidebar from './Sidebar'
import Header from './Header'

interface AppLayoutProps {
  children: ReactNode
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [mobileOpen, setMobileOpen] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#FAFAFA' }}>
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          transition: 'margin-left 0.3s ease',
          marginLeft: isSidebarOpen ? '260px' : '0'
        }}
        className="max-md:!ml-0"
      >
        <Header onMenuClick={() => setMobileOpen(true)} onToggleSidebar={toggleSidebar} />
        <main style={{ flex: 1, padding: '28px 28px', overflowX: 'hidden' }}
          className="fade-in"
        >
          {children}
        </main>
      </div>
    </div>
  )
}

export default AppLayout
