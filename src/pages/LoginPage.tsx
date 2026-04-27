import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";

const inputWrapStyle: React.CSSProperties = { position: 'relative' }
const iconStyle: React.CSSProperties = { position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#D1D5DB', fontSize: 14 }
const inputStyle: React.CSSProperties = {
  width: '100%', paddingLeft: 40, paddingRight: 16, paddingTop: 12, paddingBottom: 12,
  border: '1px solid #E5E7EB', borderRadius: 12, fontSize: 14, color: '#374151',
  outline: 'none', background: 'white',
}

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("raquel@pawsomediva.com");
  const [password, setPassword] = useState("admin123");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { alert("Please enter email and password"); return; }
    setLoading(true);
    const ok = await login(email, password);
    setLoading(false);
    if (ok) { alert("Welcome back, Raquel! 🐾"); navigate("/dashboard"); }
    else { alert("Invalid credentials. Try: raquel@pawsomediva.com / admin123"); }
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
          <img src="/logo.png" alt="Logo" style={{ width: 96, height: 96, objectFit: 'contain', marginBottom: 12 }} />
          <h1 style={{ fontSize: 20, fontWeight: 600, color: '#1F2937', letterSpacing: -0.3 }}>Admin Portal</h1>
          <p style={{ fontSize: 13, color: '#9CA3AF', marginTop: 4 }}>Sign in to manage Pawsome Diva</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* Email */}
          <div style={inputWrapStyle}>
            <FiMail style={iconStyle} />
            <input type="email" placeholder="Email Address" value={email}
              onChange={(e) => setEmail(e.target.value)} style={inputStyle}
            />
          </div>

          {/* Password */}
          <div style={inputWrapStyle}>
            <FiLock style={iconStyle} />
            <input type={showPassword ? "text" : "password"} placeholder="Password" value={password}
              onChange={(e) => setPassword(e.target.value)} style={{ ...inputStyle, paddingRight: 40 }}
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)}
              style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#D1D5DB', cursor: 'pointer' }}
            >
              {showPassword ? <FiEyeOff style={{ fontSize: 14 }} /> : <FiEye style={{ fontSize: 14 }} />}
            </button>
          </div>

          {/* Forgot Password */}
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Link to="/forgot-password" style={{ fontSize: 12, color: '#FF4D8D', textDecoration: 'none' }}>Forgot Password?</Link>
          </div>

          {/* Button */}
          <button type="submit" disabled={loading} style={{
            width: '100%', padding: '12px 0', background: 'linear-gradient(180deg, #FF5CA8 0%, #FF8A80 100%)',
            color: 'white', fontSize: 14, fontWeight: 600, borderRadius: 12, border: 'none', cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(255,77,141,0.2)', opacity: loading ? 0.7 : 1, transition: 'all 0.2s',
          }}>
            {loading ? "Signing in..." : "Login to Dashboard"}
          </button>
        </form>

        {/* Demo */}
        <div style={{ textAlign: 'center', marginTop: 16, fontSize: 12, color: '#9CA3AF' }}>
          Demo: <span style={{ color: '#FF4D8D' }}>raquel@pawsomediva.com</span> / <span style={{ color: '#FF4D8D' }}>admin123</span>
        </div>

        {/* Create Account */}
        <p style={{ textAlign: 'center', fontSize: 12, color: '#9CA3AF', marginTop: 24 }}>
          Don't have an account?{" "}
          <Link to="/register" style={{ color: '#FF4D8D', textDecoration: 'none', fontWeight: 500 }}>Create Account</Link>
        </p>
      </div>
    </div>
  );
}