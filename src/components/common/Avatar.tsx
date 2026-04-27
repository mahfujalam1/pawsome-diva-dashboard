import React from 'react'

interface AvatarProps {
  name: string
  size?: number
  color?: string
  fontSize?: number
}

const colors = [
  '#FF4D8D', '#FF80AB', '#9B59B6', '#3B82F6', '#10B981',
  '#F59E0B', '#EF4444', '#6366F1', '#EC4899', '#14B8A6'
]

function getColor(name: string): string {
  let hash = 0
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash)
  return colors[Math.abs(hash) % colors.length]
}

const AvatarComp: React.FC<AvatarProps> = ({ name, size = 36, color, fontSize }) => {
  const bg = color || getColor(name)
  const initial = name.charAt(0).toUpperCase()
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: 'white', fontWeight: 700, fontSize: fontSize || size * 0.4, flexShrink: 0,
    }}>
      {initial}
    </div>
  )
}

export default AvatarComp
