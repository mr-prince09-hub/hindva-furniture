import { useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import CategoryCard from '../components/CategoryCard'
import { useCategories } from '../hooks/useCategories'

const filters = [
  'All',
  'Modular Kitchen',
  'Wardrobe',
  'Sofa',
  'TV Unit',
  'Wall Paneling',
  'Bed',
  'Door',
  'Temple',
  'Wall & Ceiling',
  'Office Furniture',
  'Dressing Table',
]

export default function Gallery() {
  const navigate = useNavigate()
  const location = useLocation()
  const { categories, error, loading } = useCategories()

  const getFilterSlug = filter => (
    filter
      .toLowerCase()
      .replace(/ & /g, '-')
      .replace(/\s+/g, '-')
  )

  const isActiveFilter = filter => {
    if (filter === 'All') return location.pathname === '/gallery'
    return location.pathname.includes(getFilterSlug(filter))
  }

  return (
    <div
      className="pt-20"
      style={{ background: 'var(--bg)' }}
    >

      {/* Header */}
      <section
        className="py-20 px-4 md:px-8 text-center relative overflow-hidden"
        style={{
          background:
            'linear-gradient(135deg, #FAF8F3, #F2EBD9)',
          borderBottom: '1px solid var(--border-light)',
        }}
      >

        {/* Background Pattern */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(184,146,42,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(184,146,42,0.04) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />

        <div className="container relative z-10">

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="label mb-4"
          >
            Our Collections
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-serif font-light tracking-tight"
            style={{
              fontSize: 'clamp(2.2rem, 5vw, 4rem)',
              color: 'var(--text)',
            }}
          >
            Premium Furniture
            <br />

            <em
              className="font-serif not-italic"
              style={{ color: 'var(--gold)' }}
            >
              Gallery
            </em>

          </motion.h1>

        </div>

      </section>

      {/* Filter Bar */}
      <section
        className="py-6 px-4 md:px-8 overflow-x-auto"
        style={{
          background: 'var(--card)',
          borderBottom: '1px solid var(--border-light)',
        }}
      >

        <div className="container flex justify-center flex-wrap gap-2">

          {filters.map((f) => (

            <button
              key={f}
              onClick={() => {
                if (f === 'All') {
                  navigate('/gallery')
                } else {
                  navigate(`/gallery/${getFilterSlug(f)}`)
                }
              }}
              className="px-4 py-2 text-xs font-semibold tracking-widest uppercase rounded-lg transition-all duration-300 whitespace-nowrap"
              style={{
                fontFamily: 'DM Sans, sans-serif',
                background: isActiveFilter(f) ? 'var(--gold)' : 'transparent',
                color: isActiveFilter(f) ? 'white' : 'var(--text-soft)',
                border: isActiveFilter(f) ? '1.5px solid var(--gold)' : '1.5px solid var(--border-light)',
                boxShadow: isActiveFilter(f) ? '0 4px 14px rgba(184,146,42,0.25)' : 'none',
              }}
            >
              {f}
            </button>

          ))}

        </div>

      </section>

      {/* Gallery Grid */}
      <section className="section px-4 md:px-8">

        <div className="container">

          {loading && (
            <p className="text-center mb-8" style={{ color: 'var(--text-muted)' }}>
              Loading latest gallery...
            </p>
          )}

          {!loading && error && (
            <p className="text-center mb-8" style={{ color: '#9f1d1d' }}>
              Gallery is unavailable. Please check the backend connection.
            </p>
          )}

          {!loading && !error && categories.length === 0 && (
            <p className="text-center mb-8" style={{ color: 'var(--text-muted)' }}>
              No categories found.
            </p>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >

            {categories.map((cat, i) => (

              <CategoryCard
                key={cat.slug}
                category={cat}
                index={i}
              />

            ))}

          </motion.div>

        </div>

      </section>

    </div>
  )
}
