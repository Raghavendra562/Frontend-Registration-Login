import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signup } from '../api.js'

export default function Signup() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    phone: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    document.title = 'Signup | Registration'
  }, [])

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (form.password !== form.confirmPassword) {
      setError('Password and confirm password do not match')
      return
    }

    setLoading(true)
    try {
      await signup({
        username: form.username,
        password: form.password,
        confirmPassword: form.confirmPassword,
        email: form.email,
        phone: form.phone
      })
      navigate('/login', { state: { message: 'Signup successful! Please login.' } })
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
          <h1>Create your account</h1>
          <p className="hero-text">
            Join in seconds. Your details are stored securely and protected with
            industry-standard encryption.
          </p>
          <ul className="feature-list">
            <li>Encrypted password storage via BCrypt</li>
            <li>Secure token-based sessions (JWT)</li>
            <li>Private and personalized dashboard</li>
          </ul>
        </section>
        <section className="auth-panel">
          <div className="card">
            <h2>Signup</h2>
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
                  minLength={3}
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
                  autoComplete="new-password"
                  required
                  minLength={6}
                />
                <small className="hint">Must be at least 6 characters</small>
              </label>
              <label>
                Confirm Password
                <input
                  type="password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  autoComplete="new-password"
                  required
                />
              </label>
              <label>
                Email
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  autoComplete="email"
                  required
                />
              </label>
              <label>
                Phone Number
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  autoComplete="tel"
                  required
                />
              </label>
              <button type="submit" disabled={loading}>
                {loading ? 'Creating account…' : 'Create Account'}
              </button>
            </form>
            <p className="bottom-link">
              Already a user? <Link to="/login">Login</Link>
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}