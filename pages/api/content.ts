import { NextApiRequest, NextApiResponse } from 'next'
import { getContent, setContent } from '../../lib/store'

export default function handler(req: NextApiRequest, res: NextApiResponse){
  if (req.method === 'GET'){
    return res.status(200).json({ content: getContent() })
  }
  // Require admin cookie for writes
  if (!req.cookies['admin_token']) return res.status(401).json({ ok: false })
  if (req.method === 'POST'){
    const body = req.body || {}
    // support draft vs publish
    const publish = !!body.publish
    const content = getContent()
    content.draft = body
    if (publish) content.published = body
    setContent(content)
    return res.status(200).json({ ok: true })
  }
  res.status(405).end()
}
