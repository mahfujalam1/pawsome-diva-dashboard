import React from 'react'
import type { ReactNode } from 'react'
import { ArrowUpOutlined } from '@ant-design/icons'

interface StatCardProps {
  icon: ReactNode
  label: string
  value: string | number
  change?: string
  iconBg?: string
  positive?: boolean
}

const StatCard: React.FC<StatCardProps> = ({ icon, label, value, change, iconBg = '#FFF0F5', positive = true }) => {
  return (
    <div className="stat-card" style={{
      background: 'white',
      borderRadius: 16,
      border: '1px solid #F0F0F0',
      padding: '20px',
      transition: 'box-shadow 0.2s, transform 0.2s',
      flex: 1,
      minWidth: 0,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
        <div style={{
          width: 44, height: 44, borderRadius: 12,
          background: iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 20,
        }}>
          {icon}
        </div>
        {change && (
          <span style={{
            color: positive ? '#10B981' : '#EF4444',
            fontSize: 12, fontWeight: 600,
            background: positive ? '#D1FAE5' : '#FEE2E2',
            padding: '2px 8px', borderRadius: 20,
          }}>
            <ArrowUpOutlined style={{ fontSize: 10 }} /> {change}
          </span>
        )}
      </div>
      <div style={{ fontSize: 26, fontWeight: 700, color: '#1A1A2E', lineHeight: 1.2 }}>{value}</div>
      <div style={{ fontSize: 13, color: '#6B7280', marginTop: 4 }}>{label}</div>
    </div>
  )
}

export default StatCard
