const MAX_BODY_SIZE = 64 * 1024 // 64 KB

export function getCorsOrigin(req, clientOrigins) {
  const origin = req.headers.origin
  const allowedOrigins = clientOrigins.split(',').map(o => o.trim())
  if (!origin) return allowedOrigins[0]
  return allowedOrigins.includes(origin) ? origin : ''
}

export function sendJson(req, res, status, data, clientOrigins) {
  const corsOrigin = getCorsOrigin(req, clientOrigins)
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET,POST,DELETE,OPTIONS',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
  }
  if (corsOrigin) headers['Access-Control-Allow-Origin'] = corsOrigin
  res.writeHead(status, headers)
  res.end(JSON.stringify(data))
}

export async function readBody(req) {
  const chunks = []
  let totalSize = 0

  for await (const chunk of req) {
    totalSize += chunk.length
    if (totalSize > MAX_BODY_SIZE) {
      throw Object.assign(new Error('Request body too large'), { status: 413 })
    }
    chunks.push(chunk)
  }

  if (!chunks.length) return {}

  try {
    return JSON.parse(Buffer.concat(chunks).toString('utf8'))
  } catch {
    throw Object.assign(new Error('Invalid JSON body'), { status: 400 })
  }
}
