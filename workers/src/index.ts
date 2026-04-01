import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { appointmentsRouter } from './routes/appointments'
import { webhooksRouter } from './routes/webhooks'
import { contactRouter } from './routes/contact'
import { adminRouter } from './routes/admin'

export interface Env {
  DB: D1Database
  RATE_LIMIT_KV?: KVNamespace
  CAL_WEBHOOK_SECRET: string
  ADMIN_SESSION_SECRET: string
  ENVIRONMENT: string
  SITE_BASE_URL: string
}

const app = new Hono<{ Bindings: Env }>()

// CORS configuration
app.use('/*', cors({
  origin: (origin) => {
    // Allow requests from your domain and localhost for development
    const allowedOrigins = [
      'https://amermed.com',
      'https://www.amermed.com',
      'http://localhost:3000',
      'http://localhost:8788', // Wrangler dev
    ]
    return allowedOrigins.includes(origin) ? origin : allowedOrigins[0]
  },
  credentials: true,
}))

// Health check
app.get('/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Mount routers
app.route('/api/appointments', appointmentsRouter)
app.route('/api/webhooks', webhooksRouter)
app.route('/api/contact', contactRouter)
app.route('/api/admin', adminRouter)

// 404 handler
app.notFound((c) => {
  return c.json({ error: 'Not found' }, 404)
})

// Error handler
app.onError((err, c) => {
  console.error('Worker error:', err)
  return c.json({ error: 'Internal server error' }, 500)
})

export default app
