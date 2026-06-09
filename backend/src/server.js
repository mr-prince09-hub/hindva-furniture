import http from 'node:http'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { connectDatabase } from './config/database.js'
import { loadEnv } from './config/env.js'
import { getSettings } from './config/settings.js'
import { sendJson } from './utils/http.js'
import { createApiRouter } from './routes/apiRouter.js'
import dns from 'dns'
import dotenv from 'dotenv'

dns.setServers(['1.1.1.1', '8.8.8.8'])

const backendDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

export async function startServer() {
  loadEnv(backendDir)

  const settings = getSettings()

  try {
    await connectDatabase({ uri: settings.mongodbUri, dbName: settings.mongodbDb })
    console.log(`MongoDB connected: ${settings.mongodbDb}`)
  } catch (error) {
    console.error('MongoDB connection failed:', error.message)
    process.exit(1)
  }

  const send = (req, res, status, data) => sendJson(req, res, status, data, settings.clientOrigins)
  const routeApi = createApiRouter({ settings, send })

  const server = http.createServer(async (req, res) => {
    try {
      await routeApi(req, res)
    } catch (error) {
      console.error('Unhandled route error:', error)
      // Don't send if headers already sent (e.g. SSE)
      if (!res.headersSent) {
        send(req, res, 500, { message: 'Internal server error' })
      }
    }
  })

  server.listen(settings.port, () => {
    console.log(`Hindiva API running on port ${settings.port}`)
    console.log(`Environment: ${settings.isProduction ? 'production' : 'development'}`)
  })

  // Graceful shutdown
  const shutdown = signal => {
    console.log(`\n${signal} received — shutting down gracefully`)
    server.close(() => {
      console.log('HTTP server closed')
      process.exit(0)
    })
    // Force exit after 10s if hanging
    setTimeout(() => process.exit(1), 10000).unref()
  }

  process.on('SIGTERM', () => shutdown('SIGTERM'))
  process.on('SIGINT', () => shutdown('SIGINT'))
}
