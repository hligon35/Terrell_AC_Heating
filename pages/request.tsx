import { useState } from 'react'
import Header from '../components/Header'

export default function Request() {
  const [form, setForm] = useState({ name:'', phone:'', email:'', service:'', urgency:'Routine', datetime:'', address:'', message:'' })
  const [status, setStatus] = useState('')

  async function submit(e:any){
    e.preventDefault()
    const res = await fetch('/api/leads', { method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify(form) })
    if (res.ok) setStatus('Request submitted — we will call you shortly')
    else setStatus('Error submitting')
  }

  return (
    <div>
      <Header />
      <div className="max-w-3xl mx-auto p-6 mt-6">
        <h1 className="text-2xl font-bold mb-4">Request Service</h1>
      <form onSubmit={submit} className="space-y-3">
        <input required placeholder="Full name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} className="w-full p-2 border rounded" />
        <input required placeholder="Phone" value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})} className="w-full p-2 border rounded" />
        <input placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} className="w-full p-2 border rounded" />
        <label className="sr-only">Service type</label>
        <select aria-label="Service type" value={form.service} onChange={e=>setForm({...form, service:e.target.value})} className="w-full p-2 border rounded">
          <option value="">Select Service</option>
          <option>AC repair</option>
          <option>Heating repair</option>
          <option>Installation</option>
          <option>Maintenance</option>
        </select>

        <label className="sr-only">Urgency</label>
        <select aria-label="Urgency" value={form.urgency} onChange={e=>setForm({...form, urgency:e.target.value})} className="w-full p-2 border rounded">
          <option>Routine</option>
          <option>Urgent</option>
          <option>Emergency</option>
        </select>

        <label className="sr-only">Preferred date and time</label>
        <input aria-label="Preferred date and time" type="datetime-local" value={form.datetime} onChange={e=>setForm({...form, datetime:e.target.value})} className="w-full p-2 border rounded" />
        <input placeholder="Service address" value={form.address} onChange={e=>setForm({...form, address:e.target.value})} className="w-full p-2 border rounded" />
        <textarea placeholder="Message" value={form.message} onChange={e=>setForm({...form, message:e.target.value})} className="w-full p-2 border rounded" />
        <button className="px-4 py-2 bg-brand-500 text-white rounded">Submit Request</button>
      </form>
      {status && <div className="mt-4 p-3 bg-green-50 text-green-800 rounded">{status}</div>}
      </div>
    </div>
  )
}
