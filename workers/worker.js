// Cloudflare Worker: D1 + R2-backed content store
// Expected bindings in wrangler.toml:
// [[d1_databases]] binding = "D1_DATABASE"
// [[r2_buckets]] binding = "MEDIA_BUCKET"
// Optional var: R2_PUBLIC_URL to build public media URLs

export default {
  async fetch(request, env) {
    const url = new URL(request.url)
    const pathname = url.pathname

    // Ensure store table exists (key-value JSON)
    await env.D1_DATABASE.prepare(`CREATE TABLE IF NOT EXISTS store (k TEXT PRIMARY KEY, v TEXT)`).run()

    // helpers
    async function getKey(k) {
      const row = await env.D1_DATABASE.prepare('SELECT v FROM store WHERE k = ?').bind(k).first()
      if (!row || !row.v) return null
      try { return JSON.parse(row.v) } catch { return row.v }
    }

    async function setKey(k, v) {
      const s = JSON.stringify(v)
      await env.D1_DATABASE.prepare('INSERT INTO store (k, v) VALUES (?, ?) ON CONFLICT(k) DO UPDATE SET v=excluded.v').bind(k, s).run()
    }

    // Routes
    if (pathname === '/api/worker/getContent' && request.method === 'GET') {
      const v = await getKey('content')
      return new Response(JSON.stringify({ content: v || {} }), { status: 200, headers: { 'content-type': 'application/json' } })
    }

    if (pathname === '/api/worker/setContent' && request.method === 'POST') {
      const body = await request.json()
      await setKey('content', body)
      return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { 'content-type': 'application/json' } })
    }

    if (pathname === '/api/worker/getLeads' && request.method === 'GET') {
      const v = await getKey('leads')
      return new Response(JSON.stringify({ leads: v || [] }), { status: 200, headers: { 'content-type': 'application/json' } })
    }

    if (pathname === '/api/worker/addLead' && request.method === 'POST') {
      const lead = await request.json()
      const cur = (await getKey('leads')) || []
      cur.push({ ...lead, createdAt: new Date().toISOString() })
      await setKey('leads', cur)
      return new Response(JSON.stringify({ ok: true }), { status: 201, headers: { 'content-type': 'application/json' } })
    }

    if (pathname === '/api/worker/getSubscribers' && request.method === 'GET') {
      const v = await getKey('subscribers')
      return new Response(JSON.stringify({ subscribers: v || [] }), { status: 200, headers: { 'content-type': 'application/json' } })
    }

    if (pathname === '/api/worker/addSubscriber' && request.method === 'POST') {
      const sub = await request.json()
      const cur = (await getKey('subscribers')) || []
      cur.push({ ...sub, createdAt: new Date().toISOString() })
      await setKey('subscribers', cur)
      return new Response(JSON.stringify({ ok: true }), { status: 201, headers: { 'content-type': 'application/json' } })
    }

    if (pathname === '/api/worker/getMedia' && request.method === 'GET') {
      const v = await getKey('media')
      return new Response(JSON.stringify({ media: v || [] }), { status: 200, headers: { 'content-type': 'application/json' } })
    }

    if (pathname === '/api/worker/uploadMedia' && request.method === 'POST') {
      // Accepts JSON: { filename, data } where data is base64 or data URL
      const { filename, data, contentType } = await request.json()
      if (!filename || !data) return new Response(JSON.stringify({ ok: false, error: 'missing' }), { status: 400, headers: { 'content-type': 'application/json' } })

      const matches = typeof data === 'string' ? data.match(/^data:(.*);base64,(.*)$/) : null
      const b64 = matches ? matches[2] : data
      const type = matches ? matches[1] : (contentType || 'application/octet-stream')
      const buf = Uint8Array.from(atob(b64), c => c.charCodeAt(0))

      const key = `media/${Date.now()}-${filename.replace(/[^a-zA-Z0-9._-]/g, '_')}`
      await env.MEDIA_BUCKET.put(key, buf, { httpMetadata: { contentType: type } })
      const publicUrl = env.R2_PUBLIC_URL ? `${env.R2_PUBLIC_URL.replace(/\/$/, '')}/${key}` : null

      const cur = (await getKey('media')) || []
      const item = { filename, key, url: publicUrl, uploadedAt: new Date().toISOString() }
      cur.push(item)
      await setKey('media', cur)

      return new Response(JSON.stringify({ ok: true, media: item }), { status: 201, headers: { 'content-type': 'application/json' } })
    }

    return new Response('Not found', { status: 404 })
  }
}
