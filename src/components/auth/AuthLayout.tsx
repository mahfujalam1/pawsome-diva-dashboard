import React from 'react'
import type { ReactNode } from 'react'

interface AuthLayoutProps {
  children: ReactNode
  title: string
  subtitle: string
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle }) => {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #FFF0F5 0%, #FAFAFA 50%, #FFF0F8 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '20px',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Decorative blobs */}
      <div style={{
        position: 'absolute', top: -100, right: -100, width: 400, height: 400,
        background: 'radial-gradient(circle, rgba(255,77,141,0.12) 0%, transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: -100, left: -100, width: 350, height: 350,
        background: 'radial-gradient(circle, rgba(255,128,171,0.1) 0%, transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none',
      }} />

      <div className="fade-in" style={{
        width: '100%', maxWidth: 440,
        background: 'white', borderRadius: 24,
        boxShadow: '0 20px 60px rgba(255,77,141,0.15)',
        padding: '40px',
        position: 'relative', zIndex: 1,
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{
            width: 64, height: 64, margin: '0 auto 12px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <img src="/logo.png" alt="logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
          <div style={{ fontWeight: 800, fontSize: 20, color: '#1A1A2E' }}>Pawsome Diva</div>
          <div style={{ fontSize: 12, color: '#9CA3AF', marginTop: 2 }}>Admin Portal</div>
        </div>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#1A1A2E', textAlign: 'center', marginBottom: 6 }}>{title}</h2>
        <p style={{ color: '#6B7280', textAlign: 'center', fontSize: 14, marginBottom: 28 }}>{subtitle}</p>

        {children}
      </div>
    </div>
  )
}

export default AuthLayout
