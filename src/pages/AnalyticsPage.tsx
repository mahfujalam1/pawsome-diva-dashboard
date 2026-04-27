import React, { useState } from 'react'
//
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
//
import StatCard from '../components/common/StatCard'
import { RiMoneyDollarCircleLine, RiCalendarLine, RiUserLine, RiLineChartLine } from 'react-icons/ri'
import { bookingTrends, serviceDistribution, userGrowth } from '../data/mockData'

const AnalyticsPage: React.FC = () => {
  const [period, setPeriod] = useState<'week' | 'month' | 'year'>('month')

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 700, color: '#1A1A2E', margin: 0 }}>Analytics</h1>
          <p style={{ color: '#6B7280', fontSize: 14, marginTop: 4 }}>Business insights and metrics</p>
        </div>
        <div style={{ display: 'flex', gap: 8, background: '#F3F4F6', borderRadius: 10, padding: 4 }}>
          {(['week', 'month', 'year'] as const).map(p => (
            <button key={p} onClick={() => setPeriod(p)} style={{
              padding: '6px 16px', borderRadius: 8, border: 'none', cursor: 'pointer',
              background: period === p ? 'linear-gradient(180deg, #FF5CA8 0%, #FF8A80 100%)' : 'transparent',
              color: period === p ? 'white' : '#6B7280', fontWeight: period === p ? 700 : 400,
              fontSize: 13, transition: 'all 0.15s',
            }}>{p}</button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 16, marginBottom: 28 }}>
        <StatCard icon={<RiMoneyDollarCircleLine color="#10B981" />} label="Total Revenue" value="$12,340" change="+18%" iconBg="#D1FAE5" />
        <StatCard icon={<RiCalendarLine color="#FF4D8D" />} label="Total Bookings" value="123" change="+12%" iconBg="#FFF0F5" />
        <StatCard icon={<RiUserLine color="#3B82F6" />} label="Active Users" value="42" change="+5%" iconBg="#DBEAFE" />
        <StatCard icon={<RiLineChartLine color="#7C3AED" />} label="Growth Rate" value="22%" change="+3%" iconBg="#EDE9FE" />
      </div>

      {/* Charts */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20, marginBottom: 20 }}>
        <div style={{ background: 'white', borderRadius: 16, border: '1px solid #F0F0F0', padding: 24 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1A1A2E', marginBottom: 20 }}>Booking Trends</h3>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={bookingTrends}>
              <defs>
                <linearGradient id="bookingGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FF4D8D" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#FF4D8D" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 10, border: 'none', boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }} />
              <Area type="monotone" dataKey="bookings" stroke="#FF4D8D" strokeWidth={2.5} fill="url(#bookingGrad)" dot={{ fill: '#FF4D8D', strokeWidth: 0, r: 4 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div style={{ background: 'white', borderRadius: 16, border: '1px solid #F0F0F0', padding: 24 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1A1A2E', marginBottom: 20 }}>Revenue Growth</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={bookingTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 10, border: 'none', boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }}
                formatter={(val) => [`$${val}`, 'Revenue']} />
              <Bar dataKey="revenue" fill="#FF4D8D" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div style={{ background: 'white', borderRadius: 16, border: '1px solid #F0F0F0', padding: 24 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1A1A2E', marginBottom: 20 }}>Service Distribution</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={serviceDistribution} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={4} dataKey="value">
                {serviceDistribution.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 10, border: 'none', boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }}
                formatter={(val) => [`${val}%`, '']} />
              <Legend iconType="circle" iconSize={10} wrapperStyle={{ fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div style={{ background: 'white', borderRadius: 16, border: '1px solid #F0F0F0', padding: 24 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1A1A2E', marginBottom: 20 }}>User Growth</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={userGrowth}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 10, border: 'none', boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }} />
              <Line type="monotone" dataKey="users" stroke="#7C3AED" strokeWidth={2.5} dot={{ fill: '#7C3AED', strokeWidth: 0, r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default AnalyticsPage
