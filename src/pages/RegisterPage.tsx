import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff, FiMail, FiLock, FiUser } from "react-icons/fi";
import { useAuth } from "../hooks/useAuth";

const inputWrapStyle: React.CSSProperties = { position: 'relative' }
const iconStyle: React.CSSProperties = { position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#D1D5DB', fontSize: 14 }
const inputStyle: React.CSSProperties = {
  width: '100%', paddingLeft: 40, paddingRight: 16, paddingTop: 12, paddingBottom: 12,
  border: '1px solid #E5E7EB', borderRadius: 12, fontSize: 14, color: '#374151',
  outline: 'none', background: 'white',
}

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    fullName: "", email: "", password: "", confirmPassword: "",
  });

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName || !form.email || !form.password) { alert("Please fill all fields"); return; }
    if (form.password !== form.confirmPassword) { alert("Passwords do not match"); return; }
    setLoading(true);
    const ok = await register(form.fullName, form.email, form.password);
    setLoading(false);
    if (ok) { alert("Account created successfully 🎉"); navigate("/dashboard"); }
    else { alert("Registration failed. Try again."); }
  };

  const eyeBtnStyle: React.CSSProperties = {
    position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
    background: 'none', border: 'none', color: '#D1D5DB', cursor: 'pointer',
  }

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
          <h1 style={{ fontSize: 20, fontWeight: 600, color: '#1F2937', letterSpacing: -0.3 }}>Create Account</h1>
          <p style={{ fontSize: 13, color: '#9CA3AF', marginTop: 4 }}>Join the Pawsome Diva admin team</p>
        </div>

        {/* Form */}
        <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* Full Name */}
          <div style={inputWrapStyle}>
            <FiUser style={iconStyle} />
            <input type="text" name="fullName" placeholder="Full Name" value={form.fullName}
              onChange={handleChange} style={inputStyle}
            />
          </div>

          {/* Email */}
          <div style={inputWrapStyle}>
            <FiMail style={iconStyle} />
            <input type="email" name="email" placeholder="Email Address" value={form.email}
              onChange={handleChange} style={inputStyle}
            />
          </div>

          {/* Password */}
          <div style={inputWrapStyle}>
            <FiLock style={iconStyle} />
            <input type={showPassword ? "text" : "password"} name="password" placeholder="Password"
              value={form.password} onChange={handleChange} style={{ ...inputStyle, paddingRight: 40 }}
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} style={eyeBtnStyle}>
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>

          {/* Confirm Password */}
          <div style={inputWrapStyle}>
            <FiLock style={iconStyle} />
            <input type={showConfirm ? "text" : "password"} name="confirmPassword" placeholder="Confirm Password"
              value={form.confirmPassword} onChange={handleChange} style={{ ...inputStyle, paddingRight: 40 }}
            />
            <button type="button" onClick={() => setShowConfirm(!showConfirm)} style={eyeBtnStyle}>
              {showConfirm ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>

          {/* Button */}
          <button type="submit" disabled={loading} style={{
            width: '100%', padding: '12px 0', background: 'linear-gradient(180deg, #FF5CA8 0%, #FF8A80 100%)',
            color: 'white', fontSize: 14, fontWeight: 600, borderRadius: 12, border: 'none', cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(255,77,141,0.2)', opacity: loading ? 0.7 : 1, transition: 'all 0.2s',
          }}>
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>

        {/* Login */}
        <p style={{ textAlign: 'center', fontSize: 12, color: '#9CA3AF', marginTop: 24 }}>
          Already have an account?{" "}
          <Link to="/" style={{ color: '#FF4D8D', textDecoration: 'none', fontWeight: 500 }}>Sign In</Link>
        </p>
      </div>
    </div>
  );
}