import { NextApiRequest, NextApiResponse } from 'next'
import { addMedia } from '../../../lib/store'
import fs from 'fs'
import path from 'path'

export const config = { api: { bodyParser: { sizeLimit: '10mb' } } }

export default async function handler(req: NextApiRequest, res: NextApiResponse){
  if (req.method !== 'POST') return res.status(405).end()
  if (!req.cookies['admin_token']) return res.status(401).json({ ok: false })
  const { filename, data, alt } = req.body || {}
  if (!filename || !data) return res.status(400).json({ ok: false })
  const uploads = path.join(process.cwd(), 'public', 'uploads')
  if (!fs.existsSync(uploads)) fs.mkdirSync(uploads, { recursive: true })
  const filePath = path.join(uploads, filename)
  const matches = data.match(/^data:.+;base64,(.*)$/)
  const buffer = matches ? Buffer.from(matches[1], 'base64') : Buffer.from(data, 'base64')
  fs.writeFileSync(filePath, buffer)
  const url = `/uploads/${filename}`
  addMedia({ filename, url, alt, uploadedAt: new Date().toISOString() })
  res.status(201).json({ ok: true, url })
}
