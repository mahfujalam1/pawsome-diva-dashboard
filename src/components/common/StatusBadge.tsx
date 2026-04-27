import React from 'react'
import { Tag } from 'antd'
import type { BookingStatus, PaymentStatus } from '../../types'

interface StatusBadgeProps {
  status: BookingStatus | PaymentStatus | string
}

const statusConfig: Record<string, { color: string; bg: string; label: string }> = {
  'Pending': { color: '#D97706', bg: '#FFF3CD', label: 'Pending' },
  'pending': { color: '#D97706', bg: '#FFF3CD', label: 'Pending' },
  'Approved': { color: '#059669', bg: '#D1FAE5', label: 'Approved' },
  'approved': { color: '#059669', bg: '#D1FAE5', label: 'Approved' },
  'In Progress': { color: '#2563EB', bg: '#DBEAFE', label: 'In Progress' },
  'Completed': { color: '#7C3AED', bg: '#EDE9FE', label: 'Completed' },
  'completed': { color: '#7C3AED', bg: '#EDE9FE', label: 'Completed' },
  'Cancelled': { color: '#DC2626', bg: '#FEE2E2', label: 'Cancelled' },
  'cancelled': { color: '#DC2626', bg: '#FEE2E2', label: 'Cancelled' },
  'failed': { color: '#DC2626', bg: '#FEE2E2', label: 'Failed' },
  'active': { color: '#059669', bg: '#D1FAE5', label: 'Active' },
  'inactive': { color: '#6B7280', bg: '#F3F4F6', label: 'Inactive' },
  'online': { color: '#059669', bg: '#D1FAE5', label: 'Online' },
  'offline': { color: '#6B7280', bg: '#F3F4F6', label: 'Offline' },
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const config = statusConfig[status] || { color: '#6B7280', bg: '#F3F4F6', label: status }
  return (
    <Tag
      style={{
        color: config.color,
        backgroundColor: config.bg,
        border: 'none',
        borderRadius: 20,
        padding: '2px 12px',
        fontWeight: 600,
        fontSize: 12,
      }}
    >
      {config.label}
    </Tag>
  )
}

export default StatusBadge
