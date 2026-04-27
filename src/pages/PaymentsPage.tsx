import React, { useState } from 'react'
import { Input, message } from 'antd'
import { SearchOutlined, DownloadOutlined } from '@ant-design/icons'
import { useApp } from '../hooks/useApp'
import PageHeader from '../components/common/PageHeader'
import StatusBadge from '../components/common/StatusBadge'

const PaymentsPage: React.FC = () => {
  const { payments } = useApp()
  const [search, setSearch] = useState('')

  const filtered = payments.filter(p =>
    p.customer.toLowerCase().includes(search.toLowerCase()) ||
    p.id.toLowerCase().includes(search.toLowerCase()) ||
    p.bookingId.toLowerCase().includes(search.toLowerCase())
  )

  const totalRevenue = payments.filter(p => p.status === 'completed').reduce((s, p) => s + p.amount, 0)
  const pendingAmount = payments.filter(p => p.status === 'pending').reduce((s, p) => s + p.amount, 0)

  return (
    <div>
      <PageHeader title="Payments" subtitle="View all transactions and invoices" />

      {/* Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 16, marginBottom: 24 }}>
        {[
          { label: 'Total Collected', value: `$${totalRevenue.toFixed(2)}`, color: '#10B981', bg: '#D1FAE5' },
          { label: 'Pending Amount', value: `$${pendingAmount.toFixed(2)}`, color: '#D97706', bg: '#FFF3CD' },
          { label: 'Total Transactions', value: payments.length, color: '#3B82F6', bg: '#DBEAFE' },
        ].map(s => (
          <div key={s.label} style={{ background: 'white', borderRadius: 14, border: '1px solid #F0F0F0', padding: 18 }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 13, color: '#6B7280', marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>

      <Input prefix={<SearchOutlined style={{ color: '#9CA3AF' }} />}
        placeholder="Search transactions..." value={search} onChange={e => setSearch(e.target.value)}
        style={{ maxWidth: 300, borderRadius: 10, height: 40, marginBottom: 20 }}
      />

      <div style={{ background: 'white', borderRadius: 16, border: '1px solid #F0F0F0', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#FFF0F5' }}>
                {['Transaction ID', 'Customer', 'Booking ID', 'Amount', 'Status', 'Date', 'Action'].map(h => (
                  <th key={h} style={{ padding: '12px 20px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: '#6B7280', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.id} style={{ borderBottom: '1px solid #F9F9F9', transition: 'background 0.1s' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#FFF9FC'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
                >
                  <td style={{ padding: '16px 20px', fontWeight: 700, fontSize: 13, color: '#1A1A2E' }}>{p.id}</td>
                  <td style={{ padding: '16px 20px', fontSize: 13, color: '#1A1A2E' }}>{p.customer}</td>
                  <td style={{ padding: '16px 20px', fontSize: 13, color: '#6B7280' }}>{p.bookingId}</td>
                  <td style={{ padding: '16px 20px' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <span style={{ color: '#10B981', fontSize: 16 }}>$</span>
                      <span style={{ fontWeight: 700, fontSize: 14, color: '#1A1A2E' }}>{p.amount.toFixed(2)}</span>
                    </span>
                  </td>
                  <td style={{ padding: '16px 20px' }}><StatusBadge status={p.status} /></td>
                  <td style={{ padding: '16px 20px', fontSize: 13, color: '#6B7280' }}>📅 {p.date}</td>
                  <td style={{ padding: '16px 20px' }}>
                    <button onClick={() => message.success(`Invoice for ${p.id} downloading...`)} style={{
                      background: 'none', border: 'none', color: '#FF4D8D', cursor: 'pointer', fontWeight: 600, fontSize: 13,
                      display: 'flex', alignItems: 'center', gap: 4,
                    }}>
                      <DownloadOutlined /> Invoice
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: 40, color: '#9CA3AF' }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>💳</div>
              <div>No transactions found</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PaymentsPage
