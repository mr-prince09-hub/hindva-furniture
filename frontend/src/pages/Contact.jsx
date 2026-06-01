import { useState } from 'react'
import { motion } from 'framer-motion'
import { api } from '../services/api'

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const handle = e => {
    const { name, value } = e.target
    // Phone: only allow digits, max 10
    if (name === 'phone') {
      const digits = value.replace(/\D/g, '').slice(0, 10)
      setForm(f => ({ ...f, phone: digits }))
      return
    }
    setForm(f => ({ ...f, [name]: value }))
  }

  const submit = async e => {
    e.preventDefault()
    setError('')

    if (form.name.trim().length < 2) {
      setError('Please enter your full name.')
      return
    }
    if (!/^\d{10}$/.test(form.phone)) {
      setError('Please enter a valid 10-digit phone number.')
      return
    }

    setLoading(true)
    try {
      await api('/inquiries', {
        method: 'POST',
        body: JSON.stringify({
          name: form.name.trim(),
          phone: form.phone,
          message: form.message.trim(),
        }),
      })
      setSent(true)
      setForm({ name: '', phone: '', message: '' })
      setTimeout(() => setSent(false), 5000)
    } catch (err) {
      setError(err.message || 'Failed to send inquiry. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const info = [
    { icon: '📍', label: 'Address', value: 'Shop No. 22, Devkrupa-4, Amar Javan Circle, Nikol, Ahmedabad – 382350, Gujarat' },
    { icon: '📞', label: 'Phone', value: '+91 96011 72832 · +91 84909 14230' },
    { icon: '✉️', label: 'Email', value: 'hindvafurniture0@gmail.com' },
    { icon: '🕐', label: 'Hours', value: 'Mon – Sun: 10:00 AM – 7:30 PM' },
  ]

  return (
    <div className="pt-20 min-h-screen" style={{ background: 'var(--bg)' }}>
      {/* Header */}
      <section
        className="py-20 px-4 md:px-8 text-center relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #FAF8F3, #F2EBD9)', borderBottom: '1px solid var(--border-light)' }}
      >
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(184,146,42,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(184,146,42,0.04) 1px, transparent 1px)', backgroundSize: '80px 80px' }} />
        <div className="container max-w-2xl relative z-10">
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="label mb-4">
            Get In Touch
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="font-serif font-light tracking-tight"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', color: 'var(--text)' }}
          >
            Let's Build Something<br />
            <em className="font-serif not-italic" style={{ color: 'var(--gold)' }}>Extraordinary</em>
          </motion.h1>
        </div>
      </section>

      {/* Main */}
      <section className="section px-4 md:px-8">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Info */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div style={{ width: 40, height: 2, background: 'var(--gold)', marginBottom: '2rem' }} />
              <h2 className="font-serif text-4xl font-light mb-8" style={{ color: 'var(--text)' }}>
                Visit Our Showroom
              </h2>

              <div className="space-y-6 mb-8">
                {info.map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <span className="text-xl flex-shrink-0 pt-0.5">{item.icon}</span>
                    <div>
                      <div className="text-xs font-semibold tracking-widest uppercase mb-1 label">{item.label}</div>
                      <div className="text-sm leading-relaxed" style={{ color: 'var(--text-soft)' }}>{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* WhatsApp */}
              <motion.a
                whileHover={{ scale: 1.03, y: -2 }}
                href="https://wa.me/919601172832?text=Hi%20Hindiva%2C%20I%27d%20like%20to%20discuss%20a%20furniture%20project."
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-4 font-semibold text-sm tracking-widest uppercase rounded-lg transition-all duration-300 mb-8"
                style={{ background: 'rgba(37,211,102,0.08)', border: '1.5px solid rgba(37,211,102,0.3)', color: '#1a9d52' }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#1a9d52">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Chat on WhatsApp
              </motion.a>

              {/* Map */}
              <div style={{ height: 260, borderRadius: 12, overflow: 'hidden', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow)' }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.5762817303844!2d72.67305017600825!3d23.03932491570158!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e8799c7eb3af5%3A0x6fecfcac176a9b24!2shindva%20PVC%20Furniture!5e0!3m2!1sen!2sin!4v1779005398831!5m2!1sen!2sin"
                  width="100%" height="100%"
                  style={{ border: 0 }}
                  allowFullScreen loading="lazy"
                  title="Hindiva Furniture Location"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              style={{ background: 'var(--card)', border: '1px solid var(--border-light)', borderRadius: 20, padding: '2.5rem', boxShadow: 'var(--shadow-lg)' }}
            >
              <h2 className="font-serif text-3xl font-light mb-2" style={{ color: 'var(--text)' }}>
                Send an Inquiry
              </h2>
              <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
                We respond within 24 hours.
              </p>

              {sent && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 rounded-lg text-sm"
                  style={{ background: 'rgba(31,122,58,0.08)', border: '1px solid rgba(31,122,58,0.25)', color: '#1f7a3a' }}
                  role="alert"
                >
                  ✓ Inquiry sent! We'll contact you within 24 hours.
                </motion.div>
              )}

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 rounded-lg text-sm"
                  style={{ background: '#fff0f0', border: '1px solid #ffd0d0', color: '#9f1d1d' }}
                  role="alert"
                >
                  {error}
                </motion.div>
              )}

              <form onSubmit={submit} noValidate className="space-y-5">
                <div>
                  <label className="block label mb-2" htmlFor="contact-name">Full Name *</label>
                  <input
                    id="contact-name"
                    name="name"
                    value={form.name}
                    onChange={handle}
                    required
                    placeholder="Your full name"
                    type="text"
                    autoComplete="name"
                    maxLength={100}
                  />
                </div>

                <div>
                  <label className="block label mb-2" htmlFor="contact-phone">Phone Number *</label>
                  <input
                    id="contact-phone"
                    name="phone"
                    value={form.phone}
                    onChange={handle}
                    required
                    placeholder="10-digit mobile number"
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel"
                    maxLength={10}
                  />
                </div>

                <div>
                  <label className="block label mb-2" htmlFor="contact-message">Message</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={form.message}
                    onChange={handle}
                    placeholder="Tell us about your project, requirements, budget..."
                    rows={5}
                    maxLength={2000}
                    style={{ resize: 'none' }}
                  />
                </div>

                <motion.button
                  whileHover={{ scale: loading ? 1 : 1.02 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 mt-2 text-sm font-semibold tracking-widest uppercase rounded-xl transition-all duration-300"
                  style={{
                    background: loading ? '#999' : 'var(--gold)',
                    color: 'white',
                    fontFamily: 'DM Sans, sans-serif',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    opacity: loading ? 0.8 : 1,
                    border: 'none',
                  }}
                >
                  {loading ? 'Sending...' : 'Send Inquiry'}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
