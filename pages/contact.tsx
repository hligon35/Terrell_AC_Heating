import { useState } from 'react'
import Header from '../components/Header'

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
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Header variant="alternate" />
      <main className="max-w-3xl mx-auto p-6">
        <section className="py-12">
          <h1 className="text-4xl font-extrabold">Contact Us</h1>
          <p className="text-gray-600 mt-2">Questions? Reach out and we'll respond quickly.</p>
        </section>

        <section className="mt-6 bg-white p-6 rounded shadow">
          <form onSubmit={submit} className="space-y-3">
            <input required placeholder="Full name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} className="w-full p-2 border rounded" />
            <input placeholder="Phone" value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})} className="w-full p-2 border rounded" />
            <input placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} className="w-full p-2 border rounded" />
            <textarea placeholder="Message" value={form.message} onChange={e=>setForm({...form, message:e.target.value})} className="w-full p-2 border rounded" />
            <button className="px-4 py-2 bg-brand-600 text-white rounded">Send Message</button>
          </form>
          {status && <div className="mt-4 p-3 bg-green-50 text-green-800 rounded">{status}</div>}
        </section>
      </main>
    </div>
  )
}
