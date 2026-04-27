import React, { useState, useEffect } from 'react'
import { Form, Input, Button, message } from 'antd'
import { LockOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons'
import { useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import PageHeader from '../components/common/PageHeader'
import AvatarComp from '../components/common/Avatar'
import ReactQuill from 'react-quill-new'
import 'react-quill-new/dist/quill.snow.css'

const SettingsPage: React.FC = () => {
  const { admin, updateAdmin } = useAuth()
  const location = useLocation()
  const [profileForm] = Form.useForm()
  const [pwForm] = Form.useForm()

  const [isEditing, setIsEditing] = useState(false)
  const [content, setContent] = useState('')

  const path = location.pathname

  const pageData: any = {
    '/settings/profile': { title: 'My Profile', type: 'profile' },
    '/settings/about': { title: 'About Us', default: '<h2>About Pawsome Diva</h2><p>Pawsome Diva is the premier grooming and sitting service for your beloved pets. We provide top-notch care with a touch of elegance.</p>' },
    '/settings/privacy': { title: 'Privacy Policy', default: '<h2>Privacy Policy</h2><p>Your privacy is important to us. This policy explains how we handle your data.</p>' },
    '/settings/terms': { title: 'Terms & Conditions', default: '<h2>Terms & Conditions</h2><p>By using our services, you agree to these terms.</p>' },
  }

  useEffect(() => {
    if (pageData[path]) {
      setContent(pageData[path].default)
      setIsEditing(false)
    }
  }, [path])

  const handleProfile = (vals: any) => {
    updateAdmin({ name: vals.name, email: vals.email })
    message.success('Profile updated!')
  }

  const handlePassword = async () => {
    await new Promise(r => setTimeout(r, 600))
    message.success('Password updated successfully!')
    pwForm.resetFields()
  }

  const handleSaveContent = () => {
    setIsEditing(false)
    message.success(`${pageData[path].title} updated successfully!`)
  }

  if (pageData[path] && pageData[path].type !== 'profile') {
    const page = pageData[path]
    return (
      <div>
        <PageHeader title={page.title} subtitle={`Manage ${page.title} content`} />
        
        <div style={{ background: 'white', borderRadius: 16, border: '1px solid #F0F0F0', padding: 28 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>{page.title} Content</h3>
            {!isEditing ? (
              <Button icon={<EditOutlined />} onClick={() => setIsEditing(true)} style={{ background: '#FFF0F5', color: '#FF4D8D', border: 'none', borderRadius: 8 }}>Edit Content</Button>
            ) : (
              <Button icon={<SaveOutlined />} onClick={handleSaveContent} type="primary" style={{ background: 'linear-gradient(180deg, #FF5CA8 0%, #FF8A80 100%)', border: 'none', borderRadius: 8 }}>Save Content</Button>
            )}
          </div>

          {isEditing ? (
            <div className="editor-container">
              <ReactQuill theme="snow" value={content} onChange={setContent} style={{ height: 400, marginBottom: 50 }} />
            </div>
          ) : (
            <div style={{ border: '1px solid #F0F0F0', borderRadius: 12, padding: 20, minHeight: 300, color: '#4B5563' }} dangerouslySetInnerHTML={{ __html: content }} />
          )}
        </div>
      </div>
    )
  }

  return (
    <div>
      <PageHeader title="Settings" subtitle="Manage your admin account" />

      {/* Profile */}
      <div style={{ background: 'white', borderRadius: 16, border: '1px solid #F0F0F0', padding: 28, marginBottom: 20, maxWidth: 600 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28 }}>
          <AvatarComp name={admin?.name || 'A'} size={64} color="#FF4D8D" fontSize={24} />
          <div>
            <div style={{ fontWeight: 700, fontSize: 20, color: '#1A1A2E' }}>{admin?.name}</div>
            <div style={{ color: '#6B7280', fontSize: 13 }}>{admin?.email}</div>
            <span style={{ background: '#FFF0F5', color: '#FF4D8D', borderRadius: 20, padding: '2px 10px', fontSize: 12, fontWeight: 600 }}>⭐ {admin?.role}</span>
          </div>
        </div>

        <Form form={profileForm} layout="vertical" onFinish={handleProfile} requiredMark={false}
          initialValues={{ name: admin?.name, email: admin?.email }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <Form.Item name="name" label={<span style={{ fontWeight: 600, fontSize: 13 }}>Full Name</span>} rules={[{ required: true }]}>
              <Input style={{ borderRadius: 10, height: 44 }} />
            </Form.Item>
            <Form.Item name="email" label={<span style={{ fontWeight: 600, fontSize: 13 }}>Email Address</span>} rules={[{ required: true }, { type: 'email' }]}>
              <Input style={{ borderRadius: 10, height: 44 }} />
            </Form.Item>
          </div>
          <Button type="primary" htmlType="submit" style={{
            height: 44, borderRadius: 10, background: 'linear-gradient(180deg, #FF5CA8 0%, #FF8A80 100%)',
            border: 'none', fontWeight: 600, paddingInline: 28,
          }}>Save Changes</Button>
        </Form>
      </div>

      {/* Change Password */}
      <div style={{ background: 'white', borderRadius: 16, border: '1px solid #F0F0F0', padding: 28, maxWidth: 600 }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1A1A2E', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
          🔒 Change Password
        </h3>
        <Form form={pwForm} layout="vertical" onFinish={handlePassword} requiredMark={false}>
          <Form.Item name="current" label={<span style={{ fontWeight: 600, fontSize: 13 }}>Current Password</span>} rules={[{ required: true }]}>
            <Input.Password prefix={<LockOutlined style={{ color: '#9CA3AF' }} />} placeholder="Enter current password" style={{ borderRadius: 10, height: 44 }} />
          </Form.Item>
          <Form.Item name="new" label={<span style={{ fontWeight: 600, fontSize: 13 }}>New Password</span>} rules={[{ required: true }, { min: 8 }]}>
            <Input.Password prefix={<LockOutlined style={{ color: '#9CA3AF' }} />} placeholder="Enter new password" style={{ borderRadius: 10, height: 44 }} />
          </Form.Item>
          <Form.Item name="confirm" label={<span style={{ fontWeight: 600, fontSize: 13 }}>Confirm New Password</span>}
            dependencies={['new']}
            rules={[{ required: true }, ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('new') === value) return Promise.resolve()
                return Promise.reject('Passwords do not match')
              }
            })]}>
            <Input.Password prefix={<LockOutlined style={{ color: '#9CA3AF' }} />} placeholder="Confirm new password" style={{ borderRadius: 10, height: 44 }} />
          </Form.Item>
          <Button type="primary" htmlType="submit" style={{
            height: 44, borderRadius: 10, background: 'linear-gradient(180deg, #FF5CA8 0%, #FF8A80 100%)',
            border: 'none', fontWeight: 600, paddingInline: 28,
          }}>Update Password</Button>
        </Form>
      </div>
    </div>
  )
}

export default SettingsPage
