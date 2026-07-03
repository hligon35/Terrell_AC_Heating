import { useState, useEffect } from 'react'

export default function BookNowModal({ open, onClose }: { open:boolean, onClose: ()=>void }){
  const [form, setForm] = useState({ name:'', phone:'', email:'', service:'', datetime:'', notes:'' })
  const [status, setStatus] = useState('')

  useEffect(()=>{ if (!open) { setStatus(''); setForm({ name:'', phone:'', email:'', service:'', datetime:'', notes:'' }) } },[open])

  if (!open) return null

  async function submit(e:any){
    e.preventDefault()
    setStatus('Sending...')
    const res = await fetch('/api/leads', { method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify({ ...form, type:'appointment' }) })
    if (res.ok) setStatus('Request submitted — we will call to confirm')
    else setStatus('Error submitting')
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded shadow max-w-md w-full p-6">
        <button className="absolute top-3 right-3 text-gray-600" onClick={onClose}>Close</button>
        <h2 className="text-xl font-bold mb-3">Book Now</h2>
        <form onSubmit={submit} className="space-y-3">
          <input required placeholder="Full name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} className="w-full p-2 border rounded" />
          <input required placeholder="Phone" value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})} className="w-full p-2 border rounded" />
          <input placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} className="w-full p-2 border rounded" />
          <input type="datetime-local" value={form.datetime} onChange={e=>setForm({...form, datetime:e.target.value})} className="w-full p-2 border rounded" />
          <textarea placeholder="Notes" value={form.notes} onChange={e=>setForm({...form, notes:e.target.value})} className="w-full p-2 border rounded" />
          <div className="flex items-center justify-between">
            <button className="px-4 py-2 bg-brand-500 text-white rounded">Request</button>
            <button type="button" className="px-3 py-2 border rounded" onClick={onClose}>Cancel</button>
          </div>
        </form>
        {status && <div className="mt-3 text-sm text-green-700">{status}</div>}
      </div>
    </div>
  )
}
