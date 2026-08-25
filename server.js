import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import requestQuoteHandler from './api/request-quote.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:3000', 'http://127.0.0.1:5173', 'http://127.0.0.1:5174'],
  credentials: true,
}))

app.use(express.json())

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.post('/api/request-quote', (req, res) => {
  return requestQuoteHandler(req, res)
})

app.listen(PORT, () => {
  console.log(`[VCC Backend] Server running on http://localhost:${PORT}`)
})
