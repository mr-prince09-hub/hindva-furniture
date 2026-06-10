import { hashPassword } from '../utils/auth.js'

const LOCAL_CLIENT_ORIGINS =
  'http://localhost:5173,http://localhost:5174,http://127.0.0.1:5173,http://127.0.0.1:5174,https://hindva-furniture.vercel.app'
  
function requireProductionEnv(name) {
  const value = process.env[name]
  if (!value) throw new Error(`${name} is required when NODE_ENV=production`)

  return value
}

export function getSettings() {
  const isProduction = process.env.NODE_ENV === 'production'
  const adminPassword = process.env.ADMIN_PASSWORD || ''

  if (isProduction) {
    requireProductionEnv('JWT_SECRET')
    requireProductionEnv('ADMIN_EMAIL')
    requireProductionEnv('MONGODB_URI')
    requireProductionEnv('CLIENT_ORIGIN')
  }

  if (!process.env.ADMIN_PASSWORD_HASH && !process.env.ADMIN_PASSWORD) {
    throw new Error('ADMIN_PASSWORD_HASH or ADMIN_PASSWORD is required')
  }

  return {
    port: Number(process.env.API_PORT || 5000),
    isProduction,
    jwtSecret: process.env.JWT_SECRET || 'local-development-secret',
    adminEmail: process.env.ADMIN_EMAIL || 'admin@hindiva.local',
    adminPasswordHash: process.env.ADMIN_PASSWORD_HASH || hashPassword(adminPassword),
    mongodbUri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017',
    mongodbDb: process.env.MONGODB_DB || 'hindiva_furniture',
    clientOrigins: process.env.CLIENT_ORIGIN || LOCAL_CLIENT_ORIGINS,
    emailjs: {
      serviceId: process.env.EMAILJS_SERVICE_ID || '',
      templateId: process.env.EMAILJS_TEMPLATE_ID || '',
      publicKey: process.env.EMAILJS_PUBLIC_KEY || '',
      privateKey: process.env.EMAILJS_PRIVATE_KEY || '',
    },
    imagekit: {
      publicKey: process.env.IMAGEKIT_PUBLIC_KEY || '',
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY || '',
    },
  }
}
