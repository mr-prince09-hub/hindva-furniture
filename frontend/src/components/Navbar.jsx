import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { to: '/', label: 'Home' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 px-4 md:px-8 transition-all duration-400 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-xl shadow-sm border-b border-black/5'
          : 'bg-transparent'
      }`}
    >
      <div className="container flex items-center justify-between h-20">
        {/* Logo */}
        <Link to="/" onClick={() => setOpen(false)} className="no-underline group">
          <div>
            <span className="font-serif text-xl md:text-2xl font-semibold tracking-widest" style={{ color: 'var(--gold)' }}>
              HINDIVA
            </span>
            <span className="block text-xs tracking-[0.35em] -mt-1" style={{ color: 'var(--text-muted)' }}>
              FURNITURE
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 items-center">
          {links.map(l => (
            <Link
              key={l.to}
              to={l.to}
              className={`text-xs font-semibold tracking-widest uppercase transition-colors duration-300 relative pb-0.5 ${
                location.pathname === l.to
                  ? 'text-gold'
                  : 'hover:text-gold'
              }`}
              style={{ color: location.pathname === l.to ? 'var(--gold)' : 'var(--text-soft)' }}
            >
              {l.label}
              {location.pathname === l.to && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full"
                  style={{ background: 'var(--gold)' }}
                />
              )}
            </Link>
          ))}
          <Link to="/contact" className="btn-gold-outline">
            Get Inquiry
          </Link>
        </div>

        {/* Mobile Burger */}
        <button
          className="md:hidden w-8 h-8 flex flex-col justify-center items-center gap-1.5"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <div className={`w-6 h-0.5 rounded-full transition-all duration-300 ${open ? 'rotate-45 translate-y-2' : ''}`} style={{ background: 'var(--gold)' }} />
          <div className={`w-6 h-0.5 rounded-full transition-all duration-300 ${open ? 'opacity-0' : ''}`} style={{ background: 'var(--gold)' }} />
          <div className={`w-6 h-0.5 rounded-full transition-all duration-300 ${open ? '-rotate-45 -translate-y-2' : ''}`} style={{ background: 'var(--gold)' }} />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="glass-sm border-t md:hidden"
            style={{ borderColor: 'var(--border-light)' }}
          >
            <div className="px-4 py-4 space-y-1">
              {links.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <Link
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className={`block px-4 py-3 text-xs font-semibold tracking-widest uppercase border-b transition-colors ${
                      location.pathname === l.to ? 'text-gold' : 'hover:text-gold'
                    }`}
                    style={{
                      color: location.pathname === l.to ? 'var(--gold)' : 'var(--text-soft)',
                      borderColor: 'var(--border-light)',
                    }}
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
              <Link to="/contact" onClick={() => setOpen(false)} className="block w-full mt-3 btn-gold-outline text-center">
                Get Inquiry
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
