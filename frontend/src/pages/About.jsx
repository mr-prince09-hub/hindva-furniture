import { motion } from 'framer-motion'
import decorPlastLogo from '../assets/images/partners/Decor_Plast.png'
import kakaPvcLogo from '../assets/images/partners/Kaka_PVC.jpg'
import nicePlastLogo from '../assets/images/partners/Nice_Plast.png'
import polytectPvcLogo from '../assets/images/partners/polytect_pvc.png'
import polywoodPvcLogo from '../assets/images/partners/Polywood pvc.png'
import realPlastLogo from '../assets/images/partners/Real_Plast.png'
import tasaPvcLogo from '../assets/images/partners/Tasa_pvc.png'
import woodwinPvcLogo from '../assets/images/partners/Woodwin_pvc.png'

const partner = [
  {
    name: 'Real Plast',
    image: realPlastLogo,
  },
  {
    name: 'Kaka PVC',
    image: kakaPvcLogo,
  },
  {
    name: 'Decor Plast',
    image: decorPlastLogo,
  },
  {
    name: 'Polywood PVC',
    image: polywoodPvcLogo,
  },
  {
    name: 'Polytech PVC',
    image: polytectPvcLogo,
  },
  {
    name: 'Woodwin PVC',
    image: woodwinPvcLogo,
  },
  {
    name: 'Tasa PVC',
    image: tasaPvcLogo,
  },
  {
    name: 'Nice Plast',
    image: nicePlastLogo,
  },
]

const values = [
  { title: 'Precision', desc: 'Every millimeter matters. Our craftsmen work with surgical precision to deliver furniture that fits perfectly.' },
  { title: 'Premium Materials', desc: 'We source only the finest materials — from marine-grade plywood to Italian leather and solid hardwoods.' },
  { title: 'Bespoke Design', desc: 'No two homes are alike. Every project is designed from scratch to reflect your unique vision.' },
  { title: 'Lifetime Support', desc: 'Our relationship doesn\'t end at installation. We stand behind our work with lasting support.' },
]

export default function About() {
  return (
    <div style={{ paddingTop: 72, minHeight: '100vh', background: 'var(--bg)' }}>

      {/* Hero */}
      <section style={{
        padding: '6rem 2rem',
        background: 'linear-gradient(135deg, #FAF8F3 0%, #F2EBD9 50%, #FAF8F3 100%)',
        borderBottom: '1px solid var(--border-light)',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Subtle texture */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(184,146,42,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(184,146,42,0.04) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }} />
        {/* Right image accent */}
        <div style={{
          position: 'absolute', top: 0, right: 0, width: '40%', height: '100%',
          backgroundImage: 'url(https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=800&q=80)',
          backgroundSize: 'cover', backgroundPosition: 'center',
          opacity: 0.08,
        }} />
        <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative' }}>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="label"
            style={{ marginBottom: '1.5rem' }}
          >
            Our Story
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              fontWeight: 300,
              color: 'var(--text)',
              lineHeight: 1.1,
              maxWidth: 700,
              margin: '0 0 2rem',
            }}
          >
            Designing Spaces That<br />
            <em style={{ color: 'var(--gold)', fontStyle: 'normal' }}>Tell Your Story</em>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={{ color: 'var(--text-soft)', fontSize: '1rem', lineHeight: 1.9, maxWidth: 600 }}
          >
            Founded with a singular vision — to bring luxury interior furniture within reach of every discerning homeowner in Gujarat and beyond. Hindiva Furniture has spent over a decade mastering the art of crafting spaces that are as functional as they are beautiful.
          </motion.p>
        </div>
      </section>

      {/* Mission & Experience */}
      <section style={{ padding: '6rem 2rem', background: 'var(--bg)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', marginBottom: '6rem' }}>
            {[
              {
                title: 'Our Mission',
                body: [
                  'To create furniture and interiors that outlast trends and endure time. We believe that great design should feel personal — a reflection of who you are, crafted with materials that honor that vision.',
                  'Every project we undertake is a commitment — to quality, to the client, and to the craft that has defined us for over 12 years.',
                ]
              },
              {
                title: 'Our Experience',
                body: [
                  '12+ years in the premium furniture and interior design space. We\'ve completed over 500 projects across residential, commercial, and hospitality sectors throughout Gujarat.',
                  'From a single wardrobe to complete home interiors — our team of 50+ craftsmen and designers bring the same dedication to every project, regardless of scale.',
                ]
              }
            ].map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: idx === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div style={{ width: 40, height: 2, background: 'var(--gold)', marginBottom: '2rem' }} />
                <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '2.2rem', fontWeight: 400, color: 'var(--text)', marginBottom: '1.5rem' }}>{item.title}</h2>
                {item.body.map((p, i) => (
                  <p key={i} style={{ color: 'var(--text-soft)', lineHeight: 1.9, fontSize: '0.95rem', marginBottom: i < item.body.length - 1 ? '1rem' : 0 }}>{p}</p>
                ))}
              </motion.div>
            ))}
          </div>

          {/* Values */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="label" style={{ marginBottom: '3rem' }}>Our Values</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
              {values.map((v, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  style={{
                    padding: '2.5rem',
                    border: '1px solid var(--border-light)',
                    background: 'var(--card)',
                    borderRadius: 12,
                    boxShadow: 'var(--shadow)',
                    transition: 'all 0.3s ease',
                    cursor: 'default',
                  }}
                  whileHover={{ y: -4, boxShadow: 'var(--shadow-lg)', borderColor: 'var(--border)' }}
                >
                  <div style={{
                    fontFamily: '"Cormorant Garamond", serif',
                    fontSize: '0.7rem', letterSpacing: '0.2em',
                    textTransform: 'uppercase', color: 'var(--gold)',
                    marginBottom: '1rem',
                  }}>
                    0{i + 1}
                  </div>
                  <h3 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.4rem', fontWeight: 500, color: 'var(--text)', marginBottom: '1rem' }}>{v.title}</h3>
                  <p style={{ color: 'var(--text-soft)', fontSize: '0.85rem', lineHeight: 1.8 }}>{v.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Partners */}
      <section style={{ padding: '5rem 2rem', background: 'var(--bg-warm)', borderTop: '1px solid var(--border-light)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: '3.5rem' }}
          >
            <p className="label" style={{ marginBottom: '1rem' }}>Our Partners</p>
            <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 300, color: 'var(--text)', margin: 0 }}>
              Trusted Material Partners
            </h2>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem' }}>
            {partner.map((partner, i) => (
             <motion.div
  key={partner.name}
  initial={{ opacity: 0, scale: 0.95 }}
  whileInView={{ opacity: 1, scale: 1 }}
  viewport={{ once: true }}
  transition={{ delay: i * 0.05 }}
  whileHover={{ y: -4, borderColor: 'var(--gold)', boxShadow: 'var(--shadow-lg)' }}
  style={{
    padding: '1.5rem',
    border: '1px solid var(--border-light)',
    background: 'var(--card)',
    borderRadius: 10,
    textAlign: 'center',
    cursor: 'default',
    transition: 'all 0.3s ease',
    boxShadow: 'var(--shadow)',
  }}
>
  <img
    src={partner.image}
    alt={partner.name}
    loading="lazy"
    style={{
      width: '80px',
      height: '80px',
      objectFit: 'contain',
      margin: '0 auto 1rem',
      display: 'block',
    }}
  />

  <div
    style={{
      fontFamily: '"DM Sans", sans-serif',
      fontSize: '0.78rem',
      letterSpacing: '0.06em',
      color: 'var(--text-soft)',
      fontWeight: 500,
    }}
  >
    {partner.name}
  </div>
</motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
