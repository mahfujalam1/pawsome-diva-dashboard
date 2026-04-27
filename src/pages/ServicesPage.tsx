import React, { useState } from 'react'
import { Button, Modal, Form, Input, InputNumber, message } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { useApp } from '../hooks/useApp'
import PageHeader from '../components/common/PageHeader'
import StatusBadge from '../components/common/StatusBadge'
import type { Service } from '../types'

const ServicesPage: React.FC = () => {
  const { services, addService, updateService, deleteService } = useApp()
  const [addModal, setAddModal] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const [editTarget, setEditTarget] = useState<Service | null>(null)
  const [search, setSearch] = useState('')
  const [form] = Form.useForm()
  const [editForm] = Form.useForm()

  const filtered = services.filter(s => s.name.toLowerCase().includes(search.toLowerCase()))

  const handleAdd = (vals: any) => {
    addService({ ...vals, status: 'active', image: vals.image || '' })
    message.success('Service added!')
    setAddModal(false)
    form.resetFields()
  }

  const handleEdit = (vals: any) => {
    if (!editTarget) return
    updateService(editTarget.id, vals)
    message.success('Service updated!')
    setEditModal(false)
    setEditTarget(null)
  }

  const openEdit = (s: Service) => {
    setEditTarget(s)
    editForm.setFieldsValue(s)
    setEditModal(true)
  }

  const handleDelete = (s: Service) => {
    Modal.confirm({
      title: `Delete "${s.name}"?`,
      content: 'This cannot be undone.',
      okText: 'Delete', okButtonProps: { danger: true },
      onOk: () => { deleteService(s.id); message.success('Service deleted') }
    })
  }

  const ServiceForm = ({ form, onFinish }: { form: any; onFinish: (v: any) => void }) => {
    const [, setImageUrl] = useState<string | null>(null)

    return (
      <Form form={form} layout="vertical" onFinish={onFinish} requiredMark={false}>
        <Form.Item name="name" label={<span style={{ fontWeight: 600, fontSize: 13 }}>Service Name</span>} rules={[{ required: true }]}>
          <Input placeholder="e.g. Dog Walking" style={{ borderRadius: 10, height: 44 }} />
        </Form.Item>
        <Form.Item name="description" label={<span style={{ fontWeight: 600, fontSize: 13 }}>Description</span>} rules={[{ required: true }]}>
          <Input.TextArea placeholder="Describe the service..." rows={3} style={{ borderRadius: 10 }} />
        </Form.Item>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <Form.Item name="price" label={<span style={{ fontWeight: 600, fontSize: 13 }}>Price ($)</span>} rules={[{ required: true }]}>
            <InputNumber min={0} placeholder="25.00" style={{ width: '100%', borderRadius: 10, height: 44 }} />
          </Form.Item>
          <Form.Item name="duration" label={<span style={{ fontWeight: 600, fontSize: 13 }}>Duration</span>} rules={[{ required: true }]}>
            <Input placeholder="1 hour" style={{ borderRadius: 10, height: 44 }} />
          </Form.Item>
        </div>
        
        <Form.Item name="image" label={<span style={{ fontWeight: 600, fontSize: 13 }}>Service Image</span>}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <div style={{ 
              width: 64, height: 64, borderRadius: 12, border: '2px dashed #FF4D8D', 
              display: 'flex', alignItems: 'center', justifyContent: 'center', 
              overflow: 'hidden', background: '#FFF0F5' 
            }}>
              {form.getFieldValue('image') ? <img src={form.getFieldValue('image')} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <PlusOutlined style={{ color: '#FF4D8D' }} />}
            </div>
            <input type="file" accept="image/*" onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) {
                const url = URL.createObjectURL(file)
                form.setFieldsValue({ image: url })
                setImageUrl(url)
              }
            }} style={{ fontSize: 12 }} />
          </div>
        </Form.Item>

        <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
          <Button onClick={() => { setAddModal(false); setEditModal(false); form.resetFields() }} block style={{ height: 44, borderRadius: 10, borderColor: '#FF4D8D', color: '#FF4D8D' }}>Cancel</Button>
          <Button type="primary" htmlType="submit" block style={{ height: 44, borderRadius: 10, background: 'linear-gradient(180deg, #FF5CA8 0%, #FF8A80 100%)', border: 'none', fontWeight: 700 }}>Save Service</Button>
        </div>
      </Form>
    )
  }

  return (
    <div>
      <PageHeader
        title="Services"
        subtitle="Manage your service offerings"
        action={
          <Button type="primary" icon={<PlusOutlined />} onClick={() => setAddModal(true)} style={{
            height: 42, borderRadius: 10, background: 'linear-gradient(180deg, #FF5CA8 0%, #FF8A80 100%)', border: 'none', fontWeight: 600,
          }}>Add Service</Button>
        }
      />

      <Input placeholder="Search services..." value={search} onChange={e => setSearch(e.target.value)}
        style={{ maxWidth: 320, borderRadius: 10, height: 40, marginBottom: 20 }} />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
        {filtered.map(s => (
          <div key={s.id} style={{ background: 'white', borderRadius: 16, border: '1px solid #F0F0F0', padding: 24, transition: 'box-shadow 0.2s' }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 16px rgba(255,77,141,0.1)'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.boxShadow = 'none'}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
              <div style={{ 
                width: 60, height: 60, borderRadius: 12, overflow: 'hidden', background: '#FFF0F5',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24
              }}>
                {s.image ? <img src={s.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : (s.icon || '🐾')}
              </div>
              <StatusBadge status={s.status} />
            </div>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: '#1A1A2E', marginBottom: 6 }}>{s.name}</h3>
            <p style={{ color: '#6B7280', fontSize: 13, marginBottom: 16, lineHeight: 1.5 }}>{s.description}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
              <div><div style={{ fontSize: 11, color: '#9CA3AF' }}>Price</div><div style={{ fontWeight: 700, color: '#FF4D8D', fontSize: 18 }}>${s.price}</div></div>
              <div style={{ textAlign: 'right' }}><div style={{ fontSize: 11, color: '#9CA3AF' }}>Duration</div><div style={{ fontWeight: 600, color: '#1A1A2E' }}>{s.duration}</div></div>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <Button icon={<EditOutlined />} onClick={() => openEdit(s)} style={{ flex: 1, height: 38, borderRadius: 8, borderColor: '#E5E7EB', color: '#6B7280' }}>Edit</Button>
              <Button icon={<DeleteOutlined />} danger onClick={() => handleDelete(s)} style={{ flex: 1, height: 38, borderRadius: 8 }}>Delete</Button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: 60, color: '#9CA3AF' }}>
            <div style={{ fontSize: 40, marginBottom: 8 }}>✂️</div>
            <div>No services found</div>
          </div>
        )}
      </div>

      <Modal title="Add New Service" open={addModal} onCancel={() => { setAddModal(false); form.resetFields() }} footer={null} width={440}>
        <div style={{ paddingTop: 8 }}><ServiceForm form={form} onFinish={handleAdd} /></div>
      </Modal>

      <Modal title="Edit Service" open={editModal} onCancel={() => { setEditModal(false); setEditTarget(null) }} footer={null} width={440}>
        <div style={{ paddingTop: 8 }}><ServiceForm form={editForm} onFinish={handleEdit} /></div>
      </Modal>
    </div>
  )
}

export default ServicesPage
