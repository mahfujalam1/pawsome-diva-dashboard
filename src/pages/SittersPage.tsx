import React, { useState } from 'react'
import { Button, Modal, Form, Input, message } from 'antd'
import { PlusOutlined, StarFilled } from '@ant-design/icons'
import { useApp } from '../hooks/useApp'
import PageHeader from '../components/common/PageHeader'
import StatusBadge from '../components/common/StatusBadge'
import AvatarComp from '../components/common/Avatar'

const SittersPage: React.FC = () => {
  const { sitters, addSitter } = useApp()
  const [modal, setModal] = useState(false)
  const [form] = Form.useForm()

  const handleCreate = (vals: any) => {
    addSitter({ name: vals.name, email: vals.email, address: vals.address })
    message.success('Sitter account created! Credentials sent to their email.')
    setModal(false)
    form.resetFields()
  }

  return (
    <div>
      <PageHeader
        title="Sitters"
        subtitle="Manage sitter accounts"
        action={
          <Button type="primary" icon={<PlusOutlined />} onClick={() => setModal(true)} style={{
            height: 42, borderRadius: 10, background: 'linear-gradient(180deg, #FF5CA8 0%, #FF8A80 100%)', border: 'none', fontWeight: 600,
          }}>Create Sitter</Button>
        }
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
        {sitters.map(s => (
          <div key={s.id} style={{ background: 'white', borderRadius: 16, border: '1px solid #F0F0F0', padding: 24, transition: 'box-shadow 0.2s' }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 16px rgba(255,77,141,0.1)'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.boxShadow = 'none'}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <AvatarComp name={s.name} size={52} color="#FF4D8D" fontSize={20} />
              <div>
                <div style={{ fontWeight: 700, fontSize: 17, color: '#1A1A2E' }}>{s.name}</div>
                <div style={{ fontSize: 12, color: '#6B7280' }}>{s.email}</div>
                <StatusBadge status={s.status} />
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 20 }}>
              <StarFilled style={{ color: '#F59E0B', fontSize: 14 }} />
              <span style={{ fontWeight: 700, fontSize: 14, color: '#1A1A2E' }}>{s.rating}</span>
              <span style={{ fontSize: 13, color: '#9CA3AF' }}>({s.reviewCount} reviews)</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {[
                { value: s.activeJobs, label: 'Active Jobs' },
                { value: s.completed, label: 'Completed' },
              ].map(stat => (
                <div key={stat.label} style={{ background: '#FFF0F5', borderRadius: 10, padding: '12px', textAlign: 'center' }}>
                  <div style={{ fontSize: 22, fontWeight: 800, color: '#FF4D8D' }}>{stat.value}</div>
                  <div style={{ fontSize: 12, color: '#6B7280' }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <Modal title="Create Sitter Account" open={modal} onCancel={() => { setModal(false); form.resetFields() }} footer={null} width={440}>
        <p style={{ color: '#6B7280', marginBottom: 20, fontSize: 14 }}>Create a new sitter account. Login credentials will be sent to the provided email.</p>
        <Form form={form} layout="vertical" onFinish={handleCreate} requiredMark={false}>
          <Form.Item name="name" label={<span style={{ fontWeight: 600, fontSize: 13 }}>Full Name</span>} rules={[{ required: true }]}>
            <Input placeholder="John Doe" style={{ borderRadius: 10, height: 44 }} />
          </Form.Item>
          <Form.Item name="email" label={<span style={{ fontWeight: 600, fontSize: 13 }}>Email Address</span>} rules={[{ required: true }, { type: 'email' }]}>
            <Input placeholder="john@example.com" style={{ borderRadius: 10, height: 44 }} />
          </Form.Item>
          <Form.Item name="address" label={<span style={{ fontWeight: 600, fontSize: 13 }}>Address</span>}>
            <Input placeholder="New York" style={{ borderRadius: 10, height: 44 }} />
          </Form.Item>
          <Form.Item name="password" label={<span style={{ fontWeight: 600, fontSize: 13 }}>Temporary Password</span>} rules={[{ required: true }, { min: 8, message: 'Min. 8 characters' }]}>
            <Input.Password placeholder="Min. 8 characters" style={{ borderRadius: 10, height: 44 }} />
          </Form.Item>
          <div style={{ display: 'flex', gap: 12 }}>
            <Button onClick={() => { setModal(false); form.resetFields() }} block style={{ height: 44, borderRadius: 10, borderColor: '#FF4D8D', color: '#FF4D8D' }}>Cancel</Button>
            <Button type="primary" htmlType="submit" block style={{ height: 44, borderRadius: 10, background: 'linear-gradient(180deg, #FF5CA8 0%, #FF8A80 100%)', border: 'none', fontWeight: 700 }}>Create Account</Button>
          </div>
        </Form>
      </Modal>
    </div>
  )
}

export default SittersPage
