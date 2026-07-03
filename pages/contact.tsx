import { useState } from 'react'

export default function Contact(){
  const [form, setForm] = useState({ name:'', phone:'', email:'', message:'' })
  const [status, setStatus] = useState('')

  async function submit(e:any){
    e.preventDefault()
    const res = await fetch('/api/leads', { method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify({ ...form, type:'contact' }) })
    if (res.ok) setStatus('Message received — thanks!')
    else setStatus('Error')
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Contact Us</h1>
      <form onSubmit={submit} className="space-y-3">
        <input required placeholder="Full name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} className="w-full p-2 border rounded" />
        <input placeholder="Phone" value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})} className="w-full p-2 border rounded" />
        <input placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} className="w-full p-2 border rounded" />
        <textarea placeholder="Message" value={form.message} onChange={e=>setForm({...form, message:e.target.value})} className="w-full p-2 border rounded" />
        <button className="px-4 py-2 bg-brand-500 text-white rounded">Send Message</button>
      </form>
      {status && <div className="mt-4 p-3 bg-green-50 text-green-800 rounded">{status}</div>}
    </div>
  )
}
