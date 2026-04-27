import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMail } from "react-icons/fi";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (email.trim()) {
      navigate("/reset-sent", { state: { email } });
    } else {
      alert("Please enter your email");
    }
  };

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
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 32 }}>
          <img src="/logo.png" alt="Logo" style={{ width: 56, height: 56, objectFit: 'contain', marginBottom: 12 }} />
          <h1 style={{ fontSize: 20, fontWeight: 600, color: '#1F2937', letterSpacing: -0.3 }}>Reset Password</h1>
          <p style={{ fontSize: 13, color: '#9CA3AF', marginTop: 8, textAlign: 'center', lineHeight: 1.5 }}>
            We'll send you instructions to reset your password
          </p>
        </div>

        <p style={{ fontSize: 12, color: '#9CA3AF', textAlign: 'center', marginBottom: 20, lineHeight: 1.5 }}>
          Enter the email address associated with your admin account.
        </p>

        {/* Form */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ position: 'relative' }}>
            <FiMail style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#D1D5DB', fontSize: 14 }} />
            <input type="email" placeholder="Email Address" value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: '100%', paddingLeft: 40, paddingRight: 16, paddingTop: 12, paddingBottom: 12,
                border: '1px solid #E5E7EB', borderRadius: 12, fontSize: 14, color: '#374151',
                outline: 'none', background: 'white',
              }}
            />
          </div>

          <button onClick={handleSubmit} style={{
            width: '100%', padding: '12px 0', background: 'linear-gradient(180deg, #FF5CA8 0%, #FF8A80 100%)',
            color: 'white', fontSize: 14, fontWeight: 600, borderRadius: 12, border: 'none', cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(255,77,141,0.2)', transition: 'all 0.2s',
          }}>
            Send Reset Link
          </button>
        </div>

        {/* Back to Sign In */}
        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <Link to="/" style={{ fontSize: 12, color: '#FF4D8D', textDecoration: 'none' }}>Back to Sign In</Link>
        </div>
      </div>
    </div>
  );
}