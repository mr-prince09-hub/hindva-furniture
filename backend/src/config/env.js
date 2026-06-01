import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'

export function loadEnv(baseDir) {
  const envFile = path.join(baseDir, '.env')
  if (!existsSync(envFile)) return

  const lines = readFileSync(envFile, 'utf8').split(/\r?\n/)
  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#') || !trimmed.includes('=')) continue

    const [key, ...valueParts] = trimmed.split('=')
    const value = valueParts.join('=').trim().replace(/^['"]|['"]$/g, '')
    if (!process.env[key]) process.env[key] = value
  }
}
