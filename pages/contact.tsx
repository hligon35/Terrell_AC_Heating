import { useState } from 'react'
import Header from '../components/Header'

export default function Contact(){
  const [form, setForm] = useState({ name:'', phone:'', email:'', message:'' })
  const [status, setStatus] = useState('')

  async function submit(e:any){
    e.preventDefault()
    setStatus('Sending...')
    const res = await fetch('/api/leads', { method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify({ ...form, type:'contact' }) })
    if (res.ok) setStatus('Thanks — your message was sent. We will follow up soon.')
    else setStatus('Something went wrong. Please call us directly so we can help.')
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-gray-50">
      <Header />
      <main className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
        <section className="grid gap-6 rounded-3xl bg-white p-5 shadow-xl sm:p-8 md:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-red-500 sm:text-sm">Contact Terrell AC & Heating</p>
            <h1 className="mt-2 text-3xl font-extrabold leading-tight text-gray-900 sm:text-4xl">Need help with your AC or heat?</h1>
            <p className="mt-3 text-sm leading-7 text-gray-600 sm:text-base">Send a message about the issue, the equipment, or the service you need. For urgent problems, calling is the fastest option.</p>
            <a href="tel:(555) 555-5555" className="mt-5 inline-flex w-full justify-center rounded-xl bg-gray-900 px-5 py-3 font-bold text-white sm:w-auto">Call (555) 555-5555</a>
          </div>

          <form onSubmit={submit} className="grid gap-4">
            <input required placeholder="Full name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} className="w-full rounded-xl border border-gray-200 px-4 py-3 text-base outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100" />
            <input placeholder="Phone number" inputMode="tel" value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})} className="w-full rounded-xl border border-gray-200 px-4 py-3 text-base outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100" />
            <input placeholder="Email address" type="email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} className="w-full rounded-xl border border-gray-200 px-4 py-3 text-base outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100" />
            <textarea rows={5} placeholder="Tell us what is going on with your system" value={form.message} onChange={e=>setForm({...form, message:e.target.value})} className="w-full rounded-xl border border-gray-200 px-4 py-3 text-base outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100" />
            <button className="w-full rounded-xl bg-red-600 px-5 py-3 font-bold text-white sm:w-auto">Send Message</button>
            {status && <div className="rounded-xl bg-green-50 p-4 text-sm font-semibold leading-6 text-green-800">{status}</div>}
          </form>
        </section>
      </main>
    </div>
  )
}
