import fs from 'fs'
import path from 'path'

const DB_PATH = path.join(process.cwd(), 'data', 'db.json')

function ensureDb() {
  const dir = path.dirname(DB_PATH)
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
  if (!fs.existsSync(DB_PATH)) fs.writeFileSync(DB_PATH, JSON.stringify({}), 'utf8')
}

export function readDB(): any {
  // local file store
  ensureDb()
  const raw = fs.readFileSync(DB_PATH, 'utf8')
  try { return JSON.parse(raw || '{}') } catch { return {} }
}

export function writeDB(data: any) {
  ensureDb()
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf8')
}

export function getContent() {
  // If running in Cloudflare mode, proxy to Worker API
  if (process.env.USE_CLOUDFLARE === '1' && process.env.WORKER_API_BASE) {
    try {
      const res = require('sync-request')('GET', `${process.env.WORKER_API_BASE}/api/worker/getContent`)
      const j = JSON.parse(res.getBody('utf8'))
      return j.content || {}
    } catch (e) {
      console.error('Cloudflare store getContent error', e)
      return {}
    }
  }
  const db = readDB()
  return db.content || {}
}

export function setContent(content: any) {
  if (process.env.USE_CLOUDFLARE === '1' && process.env.WORKER_API_BASE) {
    try {
      const res = require('sync-request')('POST', `${process.env.WORKER_API_BASE}/api/worker/setContent`, { json: content })
      return
    } catch (e) {
      console.error('Cloudflare store setContent error', e)
      return
    }
  }
  const db = readDB()
  db.content = content
  writeDB(db)
}

export function getLeads() {
  if (process.env.USE_CLOUDFLARE === '1' && process.env.WORKER_API_BASE) {
    try {
      const res = require('sync-request')('GET', `${process.env.WORKER_API_BASE}/api/worker/getLeads`)
      const j = JSON.parse(res.getBody('utf8'))
      return j.leads || []
    } catch (e) { return [] }
  }
  const db = readDB()
  return db.leads || []
}

export function addLead(lead: any) {
  if (process.env.USE_CLOUDFLARE === '1' && process.env.WORKER_API_BASE) {
    try { require('sync-request')('POST', `${process.env.WORKER_API_BASE}/api/worker/addLead`, { json: lead }) } catch (e) { console.error(e) }
    return
  }
  const db = readDB()
  db.leads = db.leads || []
  db.leads.unshift(lead)
  writeDB(db)
}

export function getSubscribers() {
  if (process.env.USE_CLOUDFLARE === '1' && process.env.WORKER_API_BASE) {
    try { const res = require('sync-request')('GET', `${process.env.WORKER_API_BASE}/api/worker/getSubscribers`); const j = JSON.parse(res.getBody('utf8')); return j.subscribers || [] } catch (e) { return [] }
  }
  const db = readDB()
  return db.subscribers || []
}

export function addSubscriber(s: any) {
  if (process.env.USE_CLOUDFLARE === '1' && process.env.WORKER_API_BASE) {
    try { require('sync-request')('POST', `${process.env.WORKER_API_BASE}/api/worker/addSubscriber`, { json: s }) } catch (e) { console.error(e) }
    return
  }
  const db = readDB()
  db.subscribers = db.subscribers || []
  db.subscribers.push(s)
  writeDB(db)
}

export function getMedia() {
  if (process.env.USE_CLOUDFLARE === '1' && process.env.WORKER_API_BASE) {
    try { const res = require('sync-request')('GET', `${process.env.WORKER_API_BASE}/api/worker/getMedia`); const j = JSON.parse(res.getBody('utf8')); return j.media || [] } catch (e) { return [] }
  }
  const db = readDB()
  return db.media || []
}

export function addMedia(item: any) {
  if (process.env.USE_CLOUDFLARE === '1' && process.env.WORKER_API_BASE) {
    try { require('sync-request')('POST', `${process.env.WORKER_API_BASE}/api/worker/uploadMedia`, { json: item }) } catch (e) { console.error(e) }
    return
  }
  const db = readDB()
  db.media = db.media || []
  db.media.push(item)
  writeDB(db)
}
