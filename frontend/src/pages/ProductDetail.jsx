import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { useCategories } from '../hooks/useCategories'

export default function ProductDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [lightbox, setLightbox] = useState(null)
  const { categories, error, loading } = useCategories()

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') setLightbox(null) }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])
  const cat = categories.find(c => c.slug === slug)

  if (loading) return (
    <div style={{ paddingTop: '12rem', textAlign: 'center', minHeight: '60vh' }}>
      <p style={{ color: 'var(--text-muted)' }}>Loading collection...</p>
    </div>
  )

  if (error) return (
    <div style={{ paddingTop: '12rem', textAlign: 'center', minHeight: '60vh' }}>
      <h2 style={{ color: 'var(--gold)', fontFamily: '"Cormorant Garamond", serif', fontSize: '2rem' }}>Collection unavailable</h2>
      <p style={{ color: 'var(--text-muted)', marginTop: '1rem' }}>Please check the backend connection.</p>
      <button onClick={() => navigate('/gallery')} style={{ marginTop: '2rem', color: 'var(--text-soft)', background: 'none', border: '1px solid var(--border-light)', padding: '0.7rem 2rem', cursor: 'pointer', borderRadius: 8 }}>Back to Gallery</button>
    </div>
  )

  if (!cat) return (
    <div style={{ paddingTop: '12rem', textAlign: 'center' }}>
      <h2 style={{ color: 'var(--gold)', fontFamily: '"Cormorant Garamond", serif', fontSize: '2rem' }}>Collection not found</h2>
      <button onClick={() => navigate('/gallery')} style={{ marginTop: '2rem', color: 'var(--text-soft)', background: 'none', border: '1px solid var(--border-light)', padding: '0.7rem 2rem', cursor: 'pointer', borderRadius: 8 }}>Back to Gallery</button>
    </div>
  )

  return (
    <div style={{ paddingTop: 72, minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Hero Image */}
      <div style={{ position: 'relative', height: '65vh', overflow: 'hidden' }}>
        <motion.div
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'absolute', inset: 0,
            backgroundImage: `url(${cat.images[0]})`,
            backgroundSize: 'cover', backgroundPosition: 'center',
            filter: 'brightness(0.5)',
          }}
        />
        {/* Warm overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(26,23,20,0.8) 0%, rgba(26,23,20,0.2) 50%, transparent 100%)',
        }} />

        {/* Back button */}
        <button
          onClick={() => navigate('/gallery')}
          style={{
            position: 'absolute', top: '2rem', left: '2rem',
            background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)',
            color: 'rgba(255,255,255,0.85)', cursor: 'pointer', padding: '0.5rem 1.2rem',
            fontFamily: '"DM Sans", sans-serif', fontSize: '0.72rem', letterSpacing: '0.15em',
            backdropFilter: 'blur(12px)', borderRadius: 8, transition: 'all 0.3s',
          }}
        >← Gallery</button>

        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '3rem 4rem' }}>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.7rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'var(--gold-light)', marginBottom: '0.8rem' }}
          >{cat.tagline}</motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(2.5rem, 7vw, 6rem)', fontWeight: 300, color: 'white', margin: 0, lineHeight: 1 }}
          >{cat.title}</motion.h1>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '5rem 2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '5rem', marginBottom: '5rem' }}>

          {/* Description */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <p className="label" style={{ marginBottom: '1.5rem' }}>About this Collection</p>
            <p style={{ color: 'var(--text-soft)', fontSize: '1rem', lineHeight: 1.9, marginBottom: '2.5rem' }}>{cat.description}</p>

            <div style={{ marginBottom: '2.5rem' }}>
              <p className="label" style={{ marginBottom: '1rem' }}>Key Features</p>
              {cat.features.map((f, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.7rem' }}>
                  <div style={{ width: 5, height: 5, background: 'var(--gold)', borderRadius: '50%', flexShrink: 0 }} />
                  <span style={{ color: 'var(--text-soft)', fontSize: '0.88rem' }}>{f}</span>
                </div>
              ))}
            </div>

            <div>
              <p className="label" style={{ marginBottom: '1rem' }}>Materials Used</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                {cat.materials.map((m, i) => (
                  <span key={i} style={{
                    padding: '0.35rem 1rem', border: '1px solid var(--border)',
                    color: 'var(--text-soft)', fontSize: '0.75rem', fontFamily: '"DM Sans", sans-serif',
                    letterSpacing: '0.06em', borderRadius: 999, background: 'var(--gold-pale)',
                  }}>{m}</span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* CTA Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            style={{
              padding: '2.5rem',
              background: 'var(--card)',
              border: '1px solid var(--border-light)',
              borderRadius: 16,
              boxShadow: 'var(--shadow-lg)',
              alignSelf: 'flex-start',
            }}
          >
            <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.8rem', fontWeight: 400, color: 'var(--text)', marginBottom: '1rem', lineHeight: 1.3 }}>
              Interested in <em style={{ color: 'var(--gold)', fontStyle: 'normal' }}>{cat.title}</em>?
            </p>
            <p style={{ color: 'var(--text-soft)', fontSize: '0.85rem', lineHeight: 1.8, marginBottom: '2rem' }}>
              Get a personalized quote and free design consultation. Our experts will guide you through the entire process.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <motion.a
                whileHover={{ scale: 1.02 }}
                href={`https://wa.me/919601172832?text=Hi%2C%20I%27m%20interested%20in%20${encodeURIComponent(cat.title)}%20furniture.`}
                target="_blank" rel="noopener noreferrer"
                style={{
                  display: 'block', textAlign: 'center',
                  padding: '0.9rem 2rem', background: '#25D366', color: 'white',
                  textDecoration: 'none', fontFamily: '"DM Sans", sans-serif',
                  fontSize: '0.78rem', letterSpacing: '0.12em', borderRadius: 10,
                  fontWeight: 600,
                }}
              >
                💬 WhatsApp Inquiry
              </motion.a>
              <motion.button
                whileHover={{ scale: 1.02 }}
                onClick={() => navigate('/contact')}
                style={{
                  padding: '0.9rem 2rem', background: 'var(--gold)', color: 'white',
                  border: 'none', cursor: 'pointer', fontFamily: '"DM Sans", sans-serif',
                  fontSize: '0.78rem', letterSpacing: '0.12em', textTransform: 'uppercase',
                  borderRadius: 10, fontWeight: 600,
                }}
              >
                Get Inquiry
              </motion.button>
              {/* <button
                onClick={() => navigate('/contact')}
                style={{
                  padding: '0.9rem 2rem', background: 'transparent', color: 'var(--text-soft)',
                  border: '1.5px solid var(--border-light)', cursor: 'pointer',
                  fontFamily: '"DM Sans", sans-serif', fontSize: '0.78rem',
                  letterSpacing: '0.12em', textTransform: 'uppercase', borderRadius: 10,
                  transition: 'all 0.3s',
                }}
              >
                Schedule Visit
              </button> */}
            </div>
          </motion.div>
        </div>

        {/* Image Slider */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="label" style={{ marginBottom: '2rem' }}>Gallery</p>
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3500 }}
            breakpoints={{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
            style={{ paddingBottom: '3rem' }}
          >
            {cat.images.map((img, i) => (
              <SwiperSlide key={i}>
                <div
                  onClick={() => setLightbox(img)}
                  style={{
                    height: 320, borderRadius: 12, overflow: 'hidden',
                    backgroundImage: `url(${img})`,
                    backgroundSize: 'cover', backgroundPosition: 'center',
                    border: '1px solid var(--border-light)',
                    boxShadow: 'var(--shadow)',
                    cursor: 'zoom-in',
                  }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        {/* Related */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginTop: '4rem' }}>
          <p className="label" style={{ marginBottom: '2rem' }}>Explore More</p>
          <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
            {categories.filter(c => c.slug !== slug).slice(0, 4).map(c => (
              <button
                key={c.slug}
                onClick={() => navigate(`/gallery/${c.slug}`)}
                style={{
                  padding: '0.5rem 1.4rem', background: 'var(--card)', color: 'var(--text-soft)',
                  border: '1.5px solid var(--border-light)', cursor: 'pointer',
                  fontFamily: '"DM Sans", sans-serif', fontSize: '0.75rem',
                  borderRadius: 999, transition: 'all 0.3s',
                }}
                onMouseEnter={e => { e.target.style.borderColor = 'var(--gold)'; e.target.style.color = 'var(--gold)' }}
                onMouseLeave={e => { e.target.style.borderColor = 'var(--border-light)'; e.target.style.color = 'var(--text-soft)' }}
              >{c.title}</button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'rgba(0,0,0,0.92)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'zoom-out',
          }}
        >
          <img
            src={lightbox}
            alt="Full view"
            style={{
              maxWidth: '95vw', maxHeight: '95vh',
              borderRadius: 8, objectFit: 'contain',
              boxShadow: '0 0 60px rgba(0,0,0,0.8)',
            }}
          />
          <button
            onClick={() => setLightbox(null)}
            style={{
              position: 'absolute', top: 20, right: 28,
              background: 'none', border: 'none',
              color: '#fff', fontSize: '2rem',
              cursor: 'pointer', lineHeight: 1,
            }}
          >×</button>
        </div>
      )}
    </div>
  )
}
