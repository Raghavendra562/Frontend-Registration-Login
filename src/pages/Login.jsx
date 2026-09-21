import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { login } from '../api.js'

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const [form, setForm] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const [info, setInfo] = useState(location.state?.message || '')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    document.title = 'Login | Registration'
  }, [])

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setInfo('')
    setLoading(true)
    try {
      const data = await login({
        username: form.username,
        password: form.password
      })
      localStorage.setItem('username', data.username)
      navigate('/home', { replace: true })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <div className="auth">
        <section className="auth-hero">
          <span className="eyebrow">Member Area</span>
          <h1>Sign in to your account</h1>
          <p className="hero-text">
            Welcome back. Enter your credentials to continue to your private
            dashboard.
          </p>
          <ul className="feature-list">
            <li>Encrypted password storage via BCrypt</li>
            <li>Secure token-based sessions (JWT)</li>
            <li>Private and personalized dashboard</li>
          </ul>
        </section>
        <section className="auth-panel">
          <div className="card">
            <h2>Login</h2>
            {info && <p className="success">{info}</p>}
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
              <label>
                Username
                <input
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  placeholder="Enter your username"
                  autoComplete="username"
                  required
                />
              </label>
              <label>
                Password
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                />
              </label>
              <button type="submit" disabled={loading}>
                {loading ? 'Signing in…' : 'Sign In'}
              </button>
            </form>
            <p className="bottom-link">
              New user? <Link to="/signup">Signup</Link>
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}