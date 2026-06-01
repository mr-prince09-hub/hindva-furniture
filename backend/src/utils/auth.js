import { createHmac, scryptSync, timingSafeEqual } from 'node:crypto'

function base64url(input) {
  return Buffer.from(input).toString('base64url')
}

export function hashPassword(password) {
  const salt = process.env.ADMIN_PASSWORD_SALT || 'hindiva-admin-salt'
  return scryptSync(password, salt, 64).toString('hex')
}

export function checkPassword(password, passwordHash) {
  const actual = Buffer.from(hashPassword(password), 'hex')
  const expected = Buffer.from(passwordHash, 'hex')
  return actual.length === expected.length && timingSafeEqual(actual, expected)
}

export function signToken(payload, jwtSecret) {
  const header = base64url(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
  const body = base64url(JSON.stringify({ ...payload, exp: Math.floor(Date.now() / 1000) + 60 * 60 * 8 }))
  const signature = createHmac('sha256', jwtSecret).update(`${header}.${body}`).digest('base64url')

  return `${header}.${body}.${signature}`
}

export function verifyToken(token, jwtSecret) {
  const parts = token?.split('.')
  if (!parts || parts.length !== 3) return null

  const [header, body, signature] = parts
  const expected = createHmac('sha256', jwtSecret).update(`${header}.${body}`).digest('base64url')
  if (signature.length !== expected.length || !timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return null

  const payload = JSON.parse(Buffer.from(body, 'base64url').toString('utf8'))
  if (payload.exp < Math.floor(Date.now() / 1000)) return null

  return payload
}
