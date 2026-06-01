import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function CategoryCard({ category, index }) {
  const [hovered, setHovered] = useState(false)
  const navigate = useNavigate()

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => navigate(`/gallery/${category.slug}`)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative overflow-hidden rounded-2xl cursor-pointer group aspect-[3/4]"
      style={{
        background: 'var(--card)',
        border: `1px solid ${hovered ? 'var(--gold)' : 'var(--border-light)'}`,
        boxShadow: hovered ? 'var(--shadow-lg)' : 'var(--shadow)',
        transform: hovered ? 'translateY(-8px)' : 'translateY(0)',
        transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
      }}
    >
      {/* Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${category.image})`,
          filter: hovered ? 'brightness(0.45)' : 'brightness(0.55)',
          transform: hovered ? 'scale(1.08)' : 'scale(1)',
          transition: 'all 0.6s cubic-bezier(0.16,1,0.3,1)',
        }}
      />

      {/* Warm overlay for premium light feel */}
      <div
        className="absolute inset-0"
        style={{
          background: hovered
            ? 'linear-gradient(to top, rgba(26,23,20,0.85) 0%, rgba(26,23,20,0.2) 50%, transparent 100%)'
            : 'linear-gradient(to top, rgba(26,23,20,0.75) 0%, rgba(26,23,20,0.1) 60%, transparent 100%)',
          transition: 'all 0.4s ease',
        }}
      />

      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 h-0.5"
        style={{
          background: 'linear-gradient(to right, var(--gold), var(--gold-light))',
          width: hovered ? '100%' : '0%',
          transition: 'width 0.5s ease',
        }}
      />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <p
          className="text-xs font-semibold tracking-widest uppercase mb-2"
          style={{
            color: 'var(--gold-light)',
            opacity: hovered ? 1 : 0,
            transform: hovered ? 'translateY(0)' : 'translateY(8px)',
            transition: 'all 0.4s ease',
            fontFamily: 'DM Sans, sans-serif',
          }}
        >
          {category.tagline}
        </p>
        <h3
          className="font-serif text-2xl md:text-3xl leading-tight"
          style={{ color: 'white', fontWeight: 400 }}
        >
          {category.title}
        </h3>
        <div
          className="flex items-center gap-2 mt-3"
          style={{
            color: 'var(--gold-light)',
            opacity: hovered ? 1 : 0,
            transform: hovered ? 'translateY(0)' : 'translateY(8px)',
            transition: 'all 0.4s ease 0.05s',
          }}
        >
          <span className="text-xs font-semibold tracking-widest uppercase" style={{ fontFamily: 'DM Sans, sans-serif' }}>
            View Collection
          </span>
          <span className="text-base">→</span>
        </div>
      </div>
    </motion.div>
  )
}
