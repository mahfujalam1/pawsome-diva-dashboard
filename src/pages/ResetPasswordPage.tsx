import { Link, useLocation } from "react-router-dom";
import { FiCheckCircle } from "react-icons/fi";

export default function ResetSentPage() {
  const location = useLocation();
  const email = (location.state as { email?: string })?.email || "your email";

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'linear-gradient(135deg, #FCE4EC 0%, #FFF0F5 50%, #FFE4E1 100%)',
    }}>
      <div style={{
        background: 'white', borderRadius: 20, boxShadow: '0 2px 12px rgba(255,77,141,0.08)',
        border: '1px solid #FFD6E7', padding: 36, width: '100%', maxWidth: 420, margin: '0 16px',
      }}>

        {/* Logo */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 24 }}>
          <img src="/logo.png" alt="Logo" style={{ width: 56, height: 56, objectFit: 'contain', marginBottom: 12 }} />
          <h1 style={{ fontSize: 20, fontWeight: 600, color: '#1F2937', letterSpacing: -0.3 }}>Reset Password</h1>
          <p style={{ fontSize: 13, color: '#9CA3AF', marginTop: 4, textAlign: 'center' }}>
            We'll send you instructions to reset your password
          </p>
        </div>

        {/* Success Icon */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
          <div style={{
            width: 56, height: 56, borderRadius: '50%', border: '2px solid #F9A8D4',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <FiCheckCircle style={{ width: 28, height: 28, color: '#F472B6' }} />
          </div>
        </div>

        {/* Message */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, color: '#374151', marginBottom: 8 }}>Check your email</h2>
          <p style={{ fontSize: 12, color: '#9CA3AF', lineHeight: 1.5 }}>
            We've sent a password reset link to{" "}
            <span style={{ color: '#4B5563', fontWeight: 500 }}>{email}</span>
          </p>
        </div>

        {/* Back */}
        <div style={{ textAlign: 'center' }}>
          <Link to="/" style={{ fontSize: 12, color: '#FF4D8D', textDecoration: 'none' }}>Back to Sign In</Link>
        </div>
      </div>
    </div>
  );
}