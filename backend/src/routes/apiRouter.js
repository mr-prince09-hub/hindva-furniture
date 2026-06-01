import { checkPassword, signToken, verifyToken } from '../utils/auth.js'
import { getCorsOrigin, readBody } from '../utils/http.js'
import { getCategories, getCategory, updateCategoryHeroImage, updateCategoryImages } from '../services/categoryService.js'
import { createInquiry, deleteInquiry, getInquiries, updateInquiryStatus } from '../services/inquiryService.js'
import { sendInquiryEmail } from '../services/emailService.js'
import { createImageKitAuth, deleteImageKitFile } from '../services/imageKitService.js'

const inquiryClients = new Set()

// Simple in-memory rate limiter for public inquiry endpoint
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute
const RATE_LIMIT_MAX = 5
const rateLimitMap = new Map()

function isRateLimited(ip) {
  const now = Date.now()
  const entry = rateLimitMap.get(ip) || { count: 0, start: now }

  if (now - entry.start > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(ip, { count: 1, start: now })
    return false
  }

  if (entry.count >= RATE_LIMIT_MAX) return true

  entry.count++
  rateLimitMap.set(ip, entry)
  return false
}

// Clean up rate limit map every 5 minutes to prevent memory leak
setInterval(() => {
  const cutoff = Date.now() - RATE_LIMIT_WINDOW * 2
  for (const [ip, entry] of rateLimitMap) {
    if (entry.start < cutoff) rateLimitMap.delete(ip)
  }
}, 5 * 60 * 1000)

function broadcastInquiry(inquiry) {
  const payload = `event: inquiry\nid: ${inquiry.id}\ndata: ${JSON.stringify(inquiry)}\n\n`
  for (const client of inquiryClients) {
    try { client.write(payload) } catch { inquiryClients.delete(client) }
  }
}

function getClientIp(req) {
  return (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || req.socket.remoteAddress || 'unknown'
}

export function createApiRouter({ settings, send }) {
  function requireAdmin(req, res) {
    const token = req.headers.authorization?.replace(/^Bearer\s+/i, '')
    const payload = verifyToken(token, settings.jwtSecret)
    if (!payload?.admin) {
      send(req, res, 401, { message: 'Admin login required' })
      return null
    }
    return payload
  }

  return async function routeApi(req, res) {
    if (req.method === 'OPTIONS') return send(req, res, 204, {})

    const url = new URL(req.url, `http://${req.headers.host}`)
    const pathName = url.pathname

    // Health check
    if (req.method === 'GET' && pathName === '/api/health') {
      return send(req, res, 200, { ok: true, ts: Date.now() })
    }

    // Public: categories
    if (req.method === 'GET' && pathName === '/api/categories') {
      return send(req, res, 200, await getCategories())
    }

    // Public: submit inquiry (rate limited)
    if (req.method === 'POST' && pathName === '/api/inquiries') {
      const ip = getClientIp(req)
      if (isRateLimited(ip)) {
        return send(req, res, 429, { message: 'Too many requests. Please wait a moment and try again.' })
      }

      let body
      try { body = await readBody(req) } catch (err) {
        return send(req, res, err.status || 400, { message: err.message })
      }

      if (!body.name || !body.phone) return send(req, res, 400, { message: 'Name and phone are required' })
      if (String(body.name).trim().length < 2) return send(req, res, 400, { message: 'Name must be at least 2 characters' })
      if (!/^\d{10}$/.test(String(body.phone).trim())) return send(req, res, 400, { message: 'Phone must be 10 digits' })
      if (body.message && String(body.message).length > 2000) return send(req, res, 400, { message: 'Message too long' })

      const inquiry = await createInquiry(body)
      broadcastInquiry(inquiry)
      sendInquiryEmail(inquiry, settings.emailjs).catch(err => console.error('Email failed:', err.message))

      return send(req, res, 201, inquiry)
    }

    // Auth: login
    if (req.method === 'POST' && pathName === '/api/auth/login') {
      let body
      try { body = await readBody(req) } catch (err) {
        return send(req, res, err.status || 400, { message: err.message })
      }

      if (body.email !== settings.adminEmail || !checkPassword(String(body.password || ''), settings.adminPasswordHash)) {
        return send(req, res, 401, { message: 'Invalid email or password' })
      }

      return send(req, res, 200, {
        token: signToken({ admin: true, email: settings.adminEmail }, settings.jwtSecret),
        admin: { email: settings.adminEmail },
      })
    }

    // Admin: SSE inquiry stream (token in query param — only viable option for EventSource)
    if (req.method === 'GET' && pathName === '/api/admin/inquiries/stream') {
      const payload = verifyToken(url.searchParams.get('token'), settings.jwtSecret)
      if (!payload?.admin) return send(req, res, 401, { message: 'Admin login required' })

      res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Access-Control-Allow-Origin': getCorsOrigin(req, settings.clientOrigins),
        'X-Accel-Buffering': 'no', // disable nginx buffering
      })
      res.write('event: connected\ndata: {"ok":true}\n\n')
      inquiryClients.add(res)

      const heartbeat = setInterval(() => {
        try { res.write('event: ping\ndata: {}\n\n') } catch { clearInterval(heartbeat); inquiryClients.delete(res) }
      }, 25000)

      req.on('close', () => { clearInterval(heartbeat); inquiryClients.delete(res) })
      return
    }

    // All /api/admin/* routes require auth
    if (pathName.startsWith('/api/admin/') && !requireAdmin(req, res)) return

    if (req.method === 'GET' && pathName === '/api/admin/inquiries') {
      return send(req, res, 200, await getInquiries())
    }

    const inquiryIdMatch = pathName.match(/^\/api\/admin\/inquiries\/([^/]+)$/)
    if (inquiryIdMatch && req.method === 'DELETE') {
      const id = decodeURIComponent(inquiryIdMatch[1])
      const result = await deleteInquiry(id)
      if (!result.deletedCount) return send(req, res, 404, { message: 'Inquiry not found' })
      return send(req, res, 200, { id })
    }

    const inquiryStatusMatch = pathName.match(/^\/api\/admin\/inquiries\/([^/]+)\/status$/)
    if (inquiryStatusMatch && req.method === 'POST') {
      const id = decodeURIComponent(inquiryStatusMatch[1])
      let body
      try { body = await readBody(req) } catch (err) {
        return send(req, res, err.status || 400, { message: err.message })
      }
      const status = body.status === 'read' ? 'read' : 'new'
      const inquiry = await updateInquiryStatus(id, status)
      if (!inquiry) return send(req, res, 404, { message: 'Inquiry not found' })
      return send(req, res, 200, inquiry)
    }

    if (req.method === 'POST' && pathName === '/api/admin/imagekit/auth') {
      if (!settings.imagekit.publicKey || !settings.imagekit.privateKey) {
        return send(req, res, 400, { message: 'ImageKit keys not configured' })
      }
      return send(req, res, 200, createImageKitAuth(settings.imagekit))
    }

    const imageMatch = pathName.match(/^\/api\/admin\/categories\/([^/]+)\/images$/)
    if (imageMatch && req.method === 'POST') {
      const slug = decodeURIComponent(imageMatch[1])
      let body
      try { body = await readBody(req) } catch (err) {
        return send(req, res, err.status || 400, { message: err.message })
      }
      if (!body.url) return send(req, res, 400, { message: 'Image URL is required' })

      const category = await getCategory(slug)
      if (!category) return send(req, res, 404, { message: 'Category not found' })

      category.images = [body.url, ...(category.images || [])]
      category.image = category.images[0]
      category.imageKitFiles = [
        { url: body.url, fileId: body.fileId || '', name: body.name || '' },
        ...(category.imageKitFiles || []),
      ]
      await updateCategoryImages(slug, category.images, category.image, category.imageKitFiles)
      return send(req, res, 201, category)
    }

    const heroMatch = pathName.match(/^\/api\/admin\/categories\/([^/]+)\/hero-image$/)
    if (heroMatch && req.method === 'POST') {
      const slug = decodeURIComponent(heroMatch[1])
      let body
      try { body = await readBody(req) } catch (err) {
        return send(req, res, err.status || 400, { message: err.message })
      }
      const image = String(body.image || '')
      const category = await getCategory(slug)
      if (!category) return send(req, res, 404, { message: 'Category not found' })
      if (!category.images.includes(image)) return send(req, res, 400, { message: 'Invalid image selection' })

      await updateCategoryHeroImage(slug, image)
      return send(req, res, 200, { ...category, image })
    }

    const deleteMatch = pathName.match(/^\/api\/admin\/categories\/([^/]+)\/images\/(\d+)$/)
    if (deleteMatch && req.method === 'DELETE') {
      const slug = decodeURIComponent(deleteMatch[1])
      const index = Number(deleteMatch[2])
      const category = await getCategory(slug)
      if (!category) return send(req, res, 404, { message: 'Category not found' })
      if (index < 0 || index >= category.images.length) return send(req, res, 400, { message: 'Invalid image index' })

      const removedImage = category.images[index]
      category.images.splice(index, 1)
      const imageKitFile = (category.imageKitFiles || []).find(f => f.url === removedImage)
      if (imageKitFile?.fileId) {
        deleteImageKitFile(imageKitFile.fileId, settings.imagekit).catch(err => console.error('ImageKit delete failed:', err.message))
      }

      category.imageKitFiles = (category.imageKitFiles || []).filter(f => f.url !== removedImage)
      if (category.image === removedImage || !category.images.includes(category.image)) {
        category.image = category.images[0] || ''
      }
      await updateCategoryImages(slug, category.images, category.image, category.imageKitFiles)
      return send(req, res, 200, category)
    }

    send(req, res, 404, { message: 'Not found' })
  }
}
