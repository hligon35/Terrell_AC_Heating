export default {
  async fetch(request, env) {
    const url = new URL(request.url)
    const pathname = url.pathname

    // Ensure D1 table exists
    try {
      await env.TERRELL_D1.prepare(`CREATE TABLE IF NOT EXISTS store (k TEXT PRIMARY KEY, v JSON)`).run()
    } catch (e) {
      // ignore
    }

    // helpers
    async function getKey(k){
      const res = await env.TERRELL_D1.prepare('SELECT v FROM store WHERE k = ?').bind(k).first()
      return res?.v || null
    }
    async function setKey(k, v){
      const s = JSON.stringify(v)
      await env.TERRELL_D1.prepare('INSERT INTO store (k, v) VALUES (?, ?) ON CONFLICT(k) DO UPDATE SET v=excluded.v').bind(k, s).run()
    }

    if (pathname === '/api/worker/getContent' && request.method === 'GET'){
      const v = await getKey('content')
      return new Response(JSON.stringify({ content: v || {} }), { status:200, headers:{'content-type':'application/json'} })
    }

    if (pathname === '/api/worker/setContent' && request.method === 'POST'){
      const body = await request.json()
      await setKey('content', body)
      return new Response(JSON.stringify({ ok: true }), { status:200, headers:{'content-type':'application/json'} })
    }

    if (pathname === '/api/worker/getLeads' && request.method === 'GET'){
      const v = await getKey('leads')
      return new Response(JSON.stringify({ leads: v || [] }), { status:200, headers:{'content-type':'application/json'} })
    }

    if (pathname === '/api/worker/addLead' && request.method === 'POST'){
      const lead = await request.json()
      const cur = await getKey('leads') || []
      cur.unshift(lead)
      await setKey('leads', cur)
      return new Response(JSON.stringify({ ok: true }), { status:201, headers:{'content-type':'application/json'} })
    }

    if (pathname === '/api/worker/getSubscribers' && request.method === 'GET'){
      const v = await getKey('subscribers')
      return new Response(JSON.stringify({ subscribers: v || [] }), { status:200, headers:{'content-type':'application/json'} })
    }

    if (pathname === '/api/worker/addSubscriber' && request.method === 'POST'){
      const sub = await request.json()
      const cur = await getKey('subscribers') || []
      cur.push(sub)
      await setKey('subscribers', cur)
      return new Response(JSON.stringify({ ok: true }), { status:201, headers:{'content-type':'application/json'} })
    }

    if (pathname === '/api/worker/getMedia' && request.method === 'GET'){
      const v = await getKey('media')
      return new Response(JSON.stringify({ media: v || [] }), { status:200, headers:{'content-type':'application/json'} })
    }

    if (pathname === '/api/worker/uploadMedia' && request.method === 'POST'){
      const { filename, data, alt } = await request.json()
      if (!filename || !data) return new Response(JSON.stringify({ ok:false, error:'missing' }), { status:400, headers:{'content-type':'application/json'} })
      // strip data url
      const matches = data.match(/^data:(.*);base64,(.*)$/)
      const contentType = matches ? matches[1] : 'application/octet-stream'
      const b64 = matches ? matches[2] : data
      const buf = Uint8Array.from(atob(b64), c=>c.charCodeAt(0))
      // put to R2
      await env.TERRELL_MEDIA.put(filename, buf, { httpMetadata: { contentType } })
      const urlOut = `https://${env.TERRELL_MEDIA.account_id}.r2.cloudflarestorage.com/${env.TERRELL_MEDIA.bucket}/${filename}`
      const cur = await getKey('media') || []
      const item = { filename, url: `/uploads/${filename}`, alt, uploadedAt: new Date().toISOString() }
      cur.push(item)
      await setKey('media', cur)
      return new Response(JSON.stringify({ ok:true, url: item.url }), { status:201, headers:{'content-type':'application/json'} })
    }

    return new Response('Not found', { status:404 })
  }
}
