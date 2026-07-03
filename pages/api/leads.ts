import { NextApiRequest, NextApiResponse } from 'next'
import { addLead, getLeads } from '../../lib/store'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST'){
    const payload = req.body
    const lead = { id: Date.now(), createdAt: new Date().toISOString(), ...payload }
    addLead(lead)
    return res.status(201).json({ ok: true })
  }
  // GET
  const auth = req.cookies['admin_token']
  if (!auth) return res.status(401).json({ ok: false })
  const leads = getLeads()
  return res.status(200).json({ ok: true, leads })
}
