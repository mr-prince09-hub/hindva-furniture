import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 80 },
  visible: { opacity: 1, y: 0 },
}

export default function AboutScrollSection() {
  return (
    <section
      style={{
        background: '#faf8f3',
        padding: '120px 20px',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        {/* Who We Are */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: '120px' }}
        >
          <p
            style={{
              color: '#B8922A',
              letterSpacing: '4px',
              textTransform: 'uppercase',
              fontWeight: 600,
            }}
          >
            Who We Are
          </p>

          <h2
            style={{
              fontSize: 'clamp(2.5rem,5vw,4rem)',
              fontFamily: 'serif',
              marginTop: '20px',
              marginBottom: '25px',
            }}
          >
            Crafting Spaces That Inspire
          </h2>

          <p
            style={{
              maxWidth: '850px',
              margin: '0 auto',
              color: '#666',
              lineHeight: 1.9,
              fontSize: '18px',
            }}
          >
            Hindiva Furniture specializes in premium furniture and
            interior solutions for homes, offices, showrooms and
            commercial spaces. Every project is built with precision,
            creativity and attention to detail.
          </p>
        </motion.div>

        {/* How We Work */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2
            style={{
              textAlign: 'center',
              fontSize: '3rem',
              fontFamily: 'serif',
              marginBottom: '60px',
            }}
          >
            How We Work
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))',
              gap: '30px',
            }}
          >
            {[
              {
                no: '01',
                title: 'Consultation',
                desc: 'Understanding your space, style preferences and requirements.',
              },
              {
                no: '02',
                title: 'Design & Planning',
                desc: 'Creating customized layouts and furniture concepts.',
              },
              {
                no: '03',
                title: 'Manufacturing',
                desc: 'Crafting furniture using premium materials and expert workmanship.',
              },
              {
                no: '04',
                title: 'Installation',
                desc: 'Professional delivery and installation with perfect finishing.',
              },
            ].map((item) => (
              <div
                key={item.no}
                style={{
                  background: '#fff',
                  padding: '35px',
                  borderRadius: '20px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                }}
              >
                <h3
                  style={{
                    color: '#B8922A',
                    fontSize: '40px',
                    marginBottom: '15px',
                  }}
                >
                  {item.no}
                </h3>

                <h4
                  style={{
                    fontSize: '22px',
                    marginBottom: '10px',
                  }}
                >
                  {item.title}
                </h4>

                <p
                  style={{
                    color: '#666',
                    lineHeight: 1.8,
                  }}
                >
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Why Choose Us */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{
            marginTop: '120px',
            textAlign: 'center',
          }}
        >
          <h2
            style={{
              fontSize: '3rem',
              fontFamily: 'serif',
              marginBottom: '50px',
            }}
          >
            Why Choose Hindiva
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))',
              gap: '30px',
            }}
          >
            {[
              '500+ Projects',
              '100+ Happy Clients',
              'Premium Materials',
              'Custom Designs',
              'Quality Craftsmanship',
              'On-Time Delivery',
            ].map((item) => (
              <div key={item}>
                <h3
                  style={{
                    color: '#B8922A',
                    fontSize: '28px',
                  }}
                >
                  ✓
                </h3>
                <p>{item}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}