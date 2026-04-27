import type { ThemeConfig } from 'antd'

export const antTheme: ThemeConfig = {
  token: {
    colorPrimary: '#FF4D8D',
    colorPrimaryHover: '#FF80AB',
    colorPrimaryActive: '#E91E63',
    colorLink: '#FF4D8D',
    colorLinkHover: '#E91E63',
    borderRadius: 10,
    borderRadiusLG: 14,
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    colorBgContainer: '#FFFFFF',
    colorBorder: '#F0F0F0',
    colorText: '#1A1A2E',
    colorTextSecondary: '#6B7280',
    colorBgLayout: '#FAFAFA',
    boxShadow: '0 4px 16px rgba(255,77,141,0.12)',
    colorSuccess: '#10B981',
    colorWarning: '#F59E0B',
    colorError: '#EF4444',
    colorInfo: '#3B82F6',
  },
  components: {
    Button: {
      primaryColor: '#FFFFFF',
      borderRadiusLG: 10,
    },
    Input: {
      borderRadius: 10,
      paddingInline: 14,
      paddingBlock: 10,
    },
    Table: {
      headerBg: '#FFF0F5',
      headerColor: '#6B7280',
      borderColor: '#F0F0F0',
      rowHoverBg: '#FFF0F5',
    },
    Modal: {
      borderRadiusLG: 16,
    },
    Menu: {
      itemSelectedBg: '#FFF0F5',
      itemSelectedColor: '#FF4D8D',
      itemHoverColor: '#FF4D8D',
      itemHoverBg: '#FFF0F5',
    },
    Tag: {
      borderRadiusSM: 20,
    },
    Card: {
      borderRadiusLG: 16,
    },
  },
}

export const colors = {
  primary: '#FF4D8D',
  primaryLight: '#FF80AB',
  primaryDark: '#E91E63',
  primary50: '#FFF0F5',
  primary100: '#FFD6E7',
  bg: '#FAFAFA',
  cardBg: '#FFFFFF',
  textPrimary: '#1A1A2E',
  textSecondary: '#6B7280',
  textMuted: '#9CA3AF',
  border: '#F0F0F0',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',
}
