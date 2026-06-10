export const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api,https://hindva-furniture.onrender.com/api'
const TOKEN_KEY = 'hindiva_admin_token'

export function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token)
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY)
}

export async function api(path, options = {}) {
  const token = getToken()
  const isFormData = options.body instanceof FormData
  const headers = {
    ...(!isFormData ? { 'Content-Type': 'application/json' } : {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  }

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 15000)

  try {
    const response = await fetch(`${API_BASE}${path}`, {
      ...options,
      headers,
      signal: controller.signal,
    })
    clearTimeout(timeout)
    const data = await response.json().catch(() => null)
    if (!response.ok) throw new Error(data?.message || `Request failed (${response.status})`)
    return data
  } catch (err) {
    clearTimeout(timeout)
    if (err.name === 'AbortError') throw new Error('Request timed out. Please try again.')
    throw err
  }
}

export async function uploadToImageKit(file, categorySlug) {
  const auth = await api('/admin/imagekit/auth', { method: 'POST', body: JSON.stringify({}) })
  const formData = new FormData()
  formData.append('file', file)
  formData.append('fileName', `${categorySlug}-${Date.now()}-${file.name}`)
  formData.append('folder', `/hindiva/${categorySlug}`)
  formData.append('publicKey', auth.publicKey)
  formData.append('signature', auth.signature)
  formData.append('expire', auth.expire)
  formData.append('token', auth.token)

  const response = await fetch('https://upload.imagekit.io/api/v1/files/upload', {
    method: 'POST',
    body: formData,
  })
  const data = await response.json().catch(() => null)
  if (!response.ok) throw new Error(data?.message || 'ImageKit upload failed')
  return data
}
