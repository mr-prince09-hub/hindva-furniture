import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api, getToken, setToken } from '../services/api'

export default function AdminLogin() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // Already logged in — skip to admin
  useEffect(() => {
    if (getToken()) navigate('/admin', { replace: true })
  }, [navigate])

  const submit = async e => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const data = await api('/auth/login', { method: 'POST', body: JSON.stringify(form) })
      setToken(data.token)
      navigate('/admin', { replace: true })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="pt-28 min-h-screen px-4" style={{ background: 'var(--bg)' }}>
      <form onSubmit={submit} className="mx-auto max-w-md card" noValidate>
        <p className="label mb-3">Admin Portal</p>
        <h1 className="text-4xl mb-6">Login</h1>
        {error && (
          <div className="mb-4 p-3 rounded-lg text-sm" style={{ background: '#fff0f0', color: '#9f1d1d', border: '1px solid #ffd0d0' }} role="alert">
            {error}
          </div>
        )}
        <label className="block label mb-2" htmlFor="admin-email">Email</label>
        <input
          id="admin-email"
          type="email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          className="mb-4"
          autoComplete="username"
          required
        />
        <label className="block label mb-2" htmlFor="admin-password">Password</label>
        <input
          id="admin-password"
          type="password"
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
          className="mb-6"
          autoComplete="current-password"
          required
        />
        <button className="btn btn-gold w-full" type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  )
}
