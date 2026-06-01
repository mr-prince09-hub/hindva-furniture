import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer style={{ background: 'var(--bg-warm)', borderTop: '1px solid var(--border-light)' }}>
      <div className="container section">
        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <h3 className="font-serif text-2xl font-semibold tracking-widest mb-1" style={{ color: 'var(--gold)' }}>
              HINDIVA
            </h3>
            <p className="text-xs tracking-[0.35em] uppercase mb-5" style={{ color: 'var(--text-muted)' }}>
              Furniture
            </p>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-soft)' }}>
              Crafting premium spaces that reflect your unique identity. Where design meets devotion.
            </p>
            {/* Social links placeholder */}
            <div className="flex gap-3 mt-6">
              {['in', 'ig', 'fb'].map(s => (
                <div
                  key={s}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold cursor-pointer transition-all duration-300 hover:-translate-y-1"
                  style={{
                    border: '1px solid var(--border)',
                    color: 'var(--gold)',
                    background: 'white',
                  }}
                >
                  {s}
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-semibold tracking-widest uppercase mb-5 label">
              Navigation
            </h4>
            <nav className="space-y-3">
              {[
                { to: '/', label: 'Home' },
                { to: '/gallery', label: 'Gallery' },
                { to: '/about', label: 'About Us' },
                { to: '/contact', label: 'Contact' }
              ].map(({ to, label }) => (
                <Link key={to} to={to} className="link-premium block">
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-xs font-semibold tracking-widest uppercase mb-5 label">
              Products
            </h4>
            <nav className="space-y-3">
              {['Modular Kitchen', 'Wardrobe', 'Sofa', 'TV Unit', 'Bed'].map(p => (
                <Link
                  key={p}
                  to={`/gallery/${p.toLowerCase().replace(/\s+/g, '-')}`}
                  className="link-premium block"
                >
                  {p}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-semibold tracking-widest uppercase mb-5 label">
              Contact
            </h4>
            <div className="space-y-3 text-sm leading-relaxed" style={{ color: 'var(--text-soft)' }}>
              <p>Shop No. 22,Devkrupa-4 Amar javan circle,Nikol Ahmedabad - 382350, Gujarat</p>
              <p>+91 96011 72832 , +91 84909 14230</p>
              <p>hindvafurniture0@gmail.com</p>
            </div>
            <Link
              to="/contact"
              className="inline-block mt-6 btn-gold text-xs tracking-widest uppercase px-5 py-2 rounded-lg"
              style={{ background: 'var(--gold)', color: 'white', fontFamily: 'DM Sans, sans-serif' }}
            >
              Book Consultation
            </Link>
          </div>
        </div>

        {/* Divider */}
        <div className="gold-divider my-8" />

        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p style={{ color: 'var(--text-muted)' }}>
            © {new Date().getFullYear()} Hindiva Furniture. All rights reserved.
          </p>
          <p style={{ color: 'var(--gold)', opacity: 0.7 }}>
            Crafted with precision in Ahmedabad
          </p>
          <Link to="/admin" className="text-xs" style={{ color: 'var(--text-muted)' }}>
            Admin Login
            </Link>
        </div>
      </div>
    </footer>
  )
}
