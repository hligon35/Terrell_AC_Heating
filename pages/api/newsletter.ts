import { NextApiRequest, NextApiResponse } from 'next'
import { addSubscriber, readDB } from '../../lib/store'

export default function handler(req: NextApiRequest, res: NextApiResponse){
  if (req.method === 'POST'){
    const { email, name } = req.body || {}
    if (!email) return res.status(400).json({ ok: false })
    addSubscriber({ email, name, createdAt: new Date().toISOString() })
    return res.status(201).json({ ok: true })
  }
  // admin GET
  if (!req.cookies['admin_token']) return res.status(401).json({ ok: false })
  const db = readDB()
  return res.status(200).json({ ok: true, subscribers: db.subscribers || [] })
}
