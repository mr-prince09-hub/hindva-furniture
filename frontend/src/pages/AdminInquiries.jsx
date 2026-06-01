import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { API_BASE, api, clearToken, getToken } from '../services/api'
import Notice from '../components/Notice'

export default function AdminInquiries() {
  const navigate = useNavigate()
  const [inquiries, setInquiries] = useState([])
  const [notice, setNotice] = useState(null)
  const [loading, setLoading] = useState(true)
  const noticeTimer = useRef(null)

  const notify = useCallback((message, type = 'success') => {
    setNotice({ message, type })
    clearTimeout(noticeTimer.current)
    noticeTimer.current = setTimeout(() => setNotice(null), 3500)
  }, [])

  useEffect(() => {
    if (!getToken()) { navigate('/admin/login', { replace: true }); return }

    api('/admin/inquiries')
      .then(setInquiries)
      .catch(() => { clearToken(); navigate('/admin/login', { replace: true }) })
      .finally(() => setLoading(false))
  }, [navigate])

  useEffect(() => {
    const token = getToken()
    if (!token) return

    const stream = new EventSource(`${API_BASE}/admin/inquiries/stream?token=${encodeURIComponent(token)}`)
    stream.addEventListener('inquiry', event => {
      try {
        const inquiry = JSON.parse(event.data)
        setInquiries(curr => {
          if (curr.some(i => i.id === inquiry.id)) return curr
          notify('New inquiry received.', 'info')
          return [inquiry, ...curr]
        })
      } catch { /* malformed event */ }
    })
    stream.onerror = () => stream.close()

    return () => stream.close()
  }, [notify])

  const markRead = async id => {
    try {
      const updated = await api(`/admin/inquiries/${id}/status`, {
        method: 'POST',
        body: JSON.stringify({ status: 'read' }),
      })
      setInquiries(curr => curr.map(i => i.id === id ? updated : i))
      notify('Marked as read.')
    } catch (err) {
      notify(err.message, 'error')
    }
  }

  const remove = async id => {
    if (!window.confirm('Delete this inquiry permanently?')) return
    try {
      await api(`/admin/inquiries/${id}`, { method: 'DELETE' })
      setInquiries(curr => curr.filter(i => i.id !== id))
      notify('Inquiry deleted.')
    } catch (err) {
      notify(err.message, 'error')
    }
  }

  if (loading) return <div className="text-center py-20" style={{ color: 'var(--text-muted)' }}>Loading inquiries...</div>

  const unread = inquiries.filter(i => i.status !== 'read').length

  return (
    <>
      {notice && <Notice notice={notice} />}

      <section className="card">
        <div className="flex items-center justify-between gap-4 mb-4">
          <p className="label">Inquiries</p>
          <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ background: unread ? 'var(--gold)' : 'var(--gold-pale)', color: unread ? '#fff' : 'var(--gold-dark)' }}>
            {unread} new
          </span>
        </div>

        <div className="space-y-4">
          {inquiries.length === 0 && <p style={{ color: 'var(--text-muted)' }}>No inquiries yet.</p>}
          {inquiries.map(item => (
            <article
              key={item.id}
              className="p-4 rounded-lg"
              style={{ border: item.status === 'read' ? '1px solid var(--border-light)' : '1.5px solid var(--gold)', background: item.status === 'read' ? 'var(--card-warm)' : '#fffaf0' }}
            >
              <div className="flex flex-wrap justify-between gap-4">
                <div className="flex items-center gap-2">
                  <strong>{item.name}</strong>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase" style={{ background: item.status === 'read' ? '#e8e8e8' : 'var(--gold)', color: item.status === 'read' ? 'var(--text-soft)' : '#fff' }}>
                    {item.status === 'read' ? 'Read' : 'New'}
                  </span>
                </div>
                <time className="text-xs" style={{ color: 'var(--text-muted)' }} dateTime={item.createdAt}>
                  {new Date(item.createdAt).toLocaleString('en-IN')}
                </time>
              </div>
              <p className="mt-1 text-sm" style={{ color: 'var(--gold-dark)' }}>{item.phone}</p>
              {item.message && <p className="mt-3 text-sm leading-relaxed" style={{ color: 'var(--text-soft)' }}>{item.message}</p>}

              <div className="mt-4 flex flex-wrap items-center gap-2">
                {item.status !== 'read' && (
                  <button
                    onClick={() => markRead(item.id)}
                    className="px-4 py-2 rounded-lg text-xs font-semibold uppercase"
                    style={{ border: '1px solid var(--gold)', color: 'var(--gold)', background: 'transparent', cursor: 'pointer' }}
                  >
                    Mark as read
                  </button>
                )}
                <button
                  onClick={() => remove(item.id)}
                  className="px-4 py-2 rounded-lg text-xs font-semibold uppercase"
                  style={{ border: '1px solid #d44', color: '#9f1d1d', background: 'transparent', cursor: 'pointer' }}
                >
                  Delete
                </button>
                {item.status === 'read' && item.readAt && (
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                    Read {new Date(item.readAt).toLocaleString('en-IN')}
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
