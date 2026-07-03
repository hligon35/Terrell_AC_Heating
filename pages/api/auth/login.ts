import { NextApiRequest, NextApiResponse } from 'next'
import cookie from 'cookie'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()
  const { user, pass } = req.body || {}
  const ADMIN_USER = process.env.ADMIN_USER || 'admin'
  const ADMIN_PASS = process.env.ADMIN_PASS || 'password'
  if (user === ADMIN_USER && pass === ADMIN_PASS) {
    res.setHeader('Set-Cookie', cookie.serialize('admin_token', '1', { httpOnly: true, path: '/' }))
    return res.status(200).json({ ok: true })
  }
  return res.status(401).json({ ok: false })
}
