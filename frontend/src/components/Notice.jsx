export default function Notice({ notice }) {
  const styles = {
    error:   { bg: '#fff0f0', color: '#9f1d1d', border: '1px solid #ffd0d0' },
    info:    { bg: 'var(--gold-pale)', color: 'var(--gold-dark)', border: '1px solid var(--border)' },
    success: { bg: '#f0fff4', color: '#1f7a3a', border: '1px solid #bfe8c9' },
  }
  const s = styles[notice.type] || styles.success

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed top-5 right-5 z-[9999] max-w-sm p-4 rounded-lg shadow-lg text-sm"
      style={{ background: s.bg, color: s.color, border: s.border }}
    >
      {notice.message}
    </div>
  )
}
