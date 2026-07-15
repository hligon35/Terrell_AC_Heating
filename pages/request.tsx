import { useState } from 'react'
import Header from '../components/Header'

export default function Request() {
  const [form, setForm] = useState({ name:'', phone:'', email:'', service:'', urgency:'Routine', datetime:'', address:'', message:'' })
  const [status, setStatus] = useState('')

  async function submit(e:any){
    e.preventDefault()
    setStatus('Sending your service request...')
    const res = await fetch('/api/leads', { method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify(form) })
    if (res.ok) setStatus('Thanks — your service request was sent. We will call to confirm the appointment window.')
    else setStatus('Something went wrong. Please call us directly so we can help right away.')
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-gray-50">
      <Header />
      <main className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
        <section className="overflow-hidden rounded-3xl bg-white shadow-xl">
          <div className="bg-gray-950 p-5 text-white sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-red-300 sm:text-sm">Request Service</p>
            <h1 className="mt-2 text-3xl font-extrabold leading-tight sm:text-4xl">Schedule HVAC service for your home or business.</h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-gray-300 sm:text-base">Share the issue, preferred timing, and service address. We will follow up to confirm availability and make sure the right technician is prepared.</p>
          </div>

          <form onSubmit={submit} className="grid gap-4 p-5 sm:grid-cols-2 sm:p-8">
            <input required placeholder="Full name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} className="w-full rounded-xl border border-gray-200 px-4 py-3 text-base outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100" />
            <input required placeholder="Phone number" inputMode="tel" value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})} className="w-full rounded-xl border border-gray-200 px-4 py-3 text-base outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100" />
            <input placeholder="Email address" type="email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} className="w-full rounded-xl border border-gray-200 px-4 py-3 text-base outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100" />

            <select aria-label="Service type" value={form.service} onChange={e=>setForm({...form, service:e.target.value})} className="w-full rounded-xl border border-gray-200 px-4 py-3 text-base outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100">
              <option value="">Select service needed</option>
              <option>AC repair</option>
              <option>Heating repair</option>
              <option>System installation</option>
              <option>Seasonal maintenance</option>
              <option>Indoor air quality</option>
              <option>Commercial HVAC</option>
            </select>

            <select aria-label="Urgency" value={form.urgency} onChange={e=>setForm({...form, urgency:e.target.value})} className="w-full rounded-xl border border-gray-200 px-4 py-3 text-base outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100">
              <option>Routine</option>
              <option>Urgent</option>
              <option>Emergency</option>
            </select>

            <input aria-label="Preferred date and time" type="datetime-local" value={form.datetime} onChange={e=>setForm({...form, datetime:e.target.value})} className="w-full rounded-xl border border-gray-200 px-4 py-3 text-base outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100" />
            <input placeholder="Service address" value={form.address} onChange={e=>setForm({...form, address:e.target.value})} className="w-full rounded-xl border border-gray-200 px-4 py-3 text-base outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100 sm:col-span-2" />
            <textarea rows={5} placeholder="Tell us what is happening with your system" value={form.message} onChange={e=>setForm({...form, message:e.target.value})} className="w-full rounded-xl border border-gray-200 px-4 py-3 text-base outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100 sm:col-span-2" />
            <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center">
              <button className="w-full rounded-xl bg-red-600 px-5 py-3 font-bold text-white sm:w-auto">Submit Request</button>
              <a href="tel:(555) 555-5555" className="w-full rounded-xl border border-gray-200 px-5 py-3 text-center font-bold text-gray-900 sm:w-auto">Call Instead</a>
            </div>
            {status && <div className="rounded-xl bg-green-50 p-4 text-sm font-semibold leading-6 text-green-800 sm:col-span-2">{status}</div>}
          </form>
        </section>
      </main>
    </div>
  )
}
