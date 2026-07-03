import fs from 'fs'
import path from 'path'

const DB_PATH = path.join(process.cwd(), 'data', 'db.json')

function ensureDb() {
  const dir = path.dirname(DB_PATH)
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
  if (!fs.existsSync(DB_PATH)) fs.writeFileSync(DB_PATH, JSON.stringify({}), 'utf8')
}

export function readDB(): any {
  ensureDb()
  const raw = fs.readFileSync(DB_PATH, 'utf8')
  try { return JSON.parse(raw || '{}') } catch { return {} }
}

export function writeDB(data: any) {
  ensureDb()
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf8')
}

export function getContent() {
  const db = readDB()
  return db.content || {}
}

export function setContent(content: any) {
  const db = readDB()
  db.content = content
  writeDB(db)
}

export function getLeads() {
  const db = readDB()
  return db.leads || []
}

export function addLead(lead: any) {
  const db = readDB()
  db.leads = db.leads || []
  db.leads.unshift(lead)
  writeDB(db)
}

export function getSubscribers() {
  const db = readDB()
  return db.subscribers || []
}

export function addSubscriber(s: any) {
  const db = readDB()
  db.subscribers = db.subscribers || []
  db.subscribers.push(s)
  writeDB(db)
}

export function getMedia() {
  const db = readDB()
  return db.media || []
}

export function addMedia(item: any) {
  const db = readDB()
  db.media = db.media || []
  db.media.push(item)
  writeDB(db)
}
