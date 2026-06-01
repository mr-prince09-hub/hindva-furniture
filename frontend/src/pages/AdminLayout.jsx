import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { clearToken } from '../services/api'

const adminLinks = [
  { to: '/admin/inquiries', label: 'Inquiries' },
  { to: '/admin/categories', label: 'Categories' },
]

export default function AdminLayout() {
  const navigate = useNavigate()
  const location = useLocation()

  const logout = () => {
    clearToken()
    navigate('/admin/login')
  }

  return (
    <div className="min-h-screen px-4 pb-16" style={{ background: 'var(--bg)' }}>
      <div className="container pt-10">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <p className="label mb-2">Hindiva Admin</p>
            <h1 className="text-4xl">Admin Portal</h1>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/" className="btn btn-gold">
              Main Website
            </Link>
            <button onClick={logout} className="btn btn-outline">Logout</button>
          </div>
        </div>

        <nav className="flex flex-wrap gap-3 mb-8">
          {adminLinks.map(link => {
            const active = location.pathname === link.to
            return (
              <Link
                key={link.to}
                to={link.to}
                className="px-5 py-3 rounded-lg text-xs font-semibold uppercase tracking-widest"
                style={{
                  background: active ? 'var(--gold)' : 'var(--card)',
                  color: active ? '#fff' : 'var(--text-soft)',
                  border: active ? '1px solid var(--gold)' : '1px solid var(--border-light)',
                }}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        <Outlet />
      </div>
    </div>
  )
}
