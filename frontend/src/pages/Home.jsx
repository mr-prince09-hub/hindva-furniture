import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import heroImage from '../assets/hero.png'
// import AboutScrollSection from '../components/AboutScrollSection'

export default function Home() {
  const canvasRef = useRef(null)
  const navigate = useNavigate()

  // Floating particles
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')

    let W = (canvas.width = window.innerWidth)
    let H = (canvas.height = window.innerHeight)

    const particles = []

    const resize = () => {
      W = canvas.width = window.innerWidth
      H = canvas.height = window.innerHeight
    }

    window.addEventListener('resize', resize)

    for (let i = 0; i < 45; i++) {
      particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 1.8 + 0.3,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        o: Math.random() * 0.25 + 0.05,
      })
    }

    let raf

    const draw = () => {
      ctx.clearRect(0, 0, W, H)

      particles.forEach((p) => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(184,146,42,${p.o})`
        ctx.fill()

        p.x += p.vx
        p.y += p.vy

        if (p.x < 0) p.x = W
        if (p.x > W) p.x = 0
        if (p.y < 0) p.y = H
        if (p.y > H) p.y = 0
      })

      raf = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(90deg, rgba(250,248,243,0.94) 0%, rgba(250,248,243,0.82) 48%, rgba(250,248,243,0.5) 100%)',
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, rgba(250,248,243,0.16), rgba(250,248,243,0.78))',
        }}
      />

      {/* Grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(184,146,42,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(184,146,42,0.04) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* Top Glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '-10%',
          right: '-5%',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(184,146,42,0.07) 0%, transparent 70%)',
        }}
      />

      {/* Bottom Glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: '-15%',
          left: '-8%',
          width: 600,
          height: 600,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(184,146,42,0.05) 0%, transparent 70%)',
        }}
      />

      {/* Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
      />

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        
        {/* Small Title */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            letterSpacing: '4px',
            textTransform: 'uppercase',
            color: '#B8922A',
            marginBottom: '20px',
            fontSize: '12px',
            fontWeight: '600',
          }}
        >
          Premium Furniture & Interiors
        </motion.p>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          style={{
            fontSize: 'clamp(3rem, 7vw, 5.5rem)',
            fontWeight: 300,
            lineHeight: 1.1,
            color: '#111',
            fontFamily: 'serif',
          }}
        >
          Design Your
          <br />
          <span style={{ color: '#B8922A' }}>Dream Space</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          style={{
            marginTop: '24px',
            color: '#666',
            fontSize: '18px',
            lineHeight: 1.7,
            maxWidth: '700px',
            marginInline: 'auto',
          }}
        >
          Handcrafted furniture that transforms spaces into experiences.
          Where precision meets artistry.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          style={{
            display: 'flex',
            gap: '16px',
            justifyContent: 'center',
            marginTop: '40px',
            flexWrap: 'wrap',
          }}
        >
          <button
            onClick={() => navigate('/gallery')}
            style={{
              background: '#B8922A',
              color: '#fff',
              padding: '14px 32px',
              borderRadius: '10px',
              border: 'none',
              fontWeight: '600',
              letterSpacing: '2px',
              cursor: 'pointer',
              transition: '0.3s',
            }}
          >
            Explore Gallery
          </button>

          <button
            onClick={() => navigate('/contact')}
            style={{
              background: 'transparent',
              color: '#B8922A',
              padding: '14px 32px',
              borderRadius: '10px',
              border: '1.5px solid #B8922A',
              fontWeight: '600',
              letterSpacing: '2px',
              cursor: 'pointer',
              transition: '0.3s',
            }}
          >
            Get Inquiry
          </button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span
          style={{
            fontSize: '12px',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            color: '#999',
          }}
        >
          Scroll
        </span>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.6 }}
          style={{
            width: '2px',
            height: '32px',
            borderRadius: '20px',
            background:
              'linear-gradient(to bottom, #B8922A, transparent)',
          }}
        />
      </motion.div>
     
    </section>

  )
}
