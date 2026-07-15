import { useState, useEffect } from 'react'

const emptyForm = {
  name: '',
  phone: '',
  email: '',
  service: '',
  urgency: 'Routine',
  datetime: '',
  address: '',
  notes: ''
}

export default function BookNowModal({ open, onClose }: { open:boolean, onClose: ()=>void }){
  const [form, setForm] = useState(emptyForm)
  const [status, setStatus] = useState('')

  useEffect(()=>{
    if (!open) {
      setStatus('')
      setForm(emptyForm)
      document.body.style.overflow = ''
      return
    }

    document.body.style.overflow = 'hidden'
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  },[open, onClose])

  if (!open) return null

  async function submit(e:any){
    e.preventDefault()
    setStatus('Sending your request...')
    const res = await fetch('/api/leads', {
      method:'POST',
      headers:{'content-type':'application/json'},
      body: JSON.stringify({ ...form, type:'appointment' })
    })
    if (res.ok) setStatus('Thanks — your request was sent. We will call to confirm the appointment window.')
    else setStatus('Something went wrong. Please call us directly so we can help right away.')
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-4 sm:px-6" role="dialog" aria-modal="true" aria-labelledby="book-now-title">
      <button className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} aria-label="Close booking form" />
      <div className="relative flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">
        <div className="flex items-start justify-between gap-4 border-b border-gray-100 bg-gray-950 px-5 py-5 text-white sm:px-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-red-300">Book Service</p>
            <h2 id="book-now-title" className="mt-1 text-2xl font-extrabold sm:text-3xl">Schedule HVAC Help</h2>
            <p className="mt-2 text-sm leading-6 text-gray-300">Tell us what is happening with your AC or heat. We will follow up to confirm timing and next steps.</p>
          </div>
          <button className="rounded-full bg-white/10 px-3 py-2 text-sm font-semibold text-white hover:bg-white/20" onClick={onClose}>Close</button>
        </div>

        <div className="overflow-y-auto px-5 py-5 sm:px-6">
          <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1 block text-sm font-semibold text-gray-700">Full name</span>
              <input required value={form.name} onChange={e=>setForm({...form, name:e.target.value})} className="w-full rounded-xl border border-gray-200 px-4 py-3 text-base outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100" />
            </label>

            <label className="block">
              <span className="mb-1 block text-sm font-semibold text-gray-700">Phone number</span>
              <input required inputMode="tel" value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})} className="w-full rounded-xl border border-gray-200 px-4 py-3 text-base outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100" />
            </label>

            <label className="block">
              <span className="mb-1 block text-sm font-semibold text-gray-700">Email</span>
              <input type="email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} className="w-full rounded-xl border border-gray-200 px-4 py-3 text-base outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100" />
            </label>

            <label className="block">
              <span className="mb-1 block text-sm font-semibold text-gray-700">Service needed</span>
              <select value={form.service} onChange={e=>setForm({...form, service:e.target.value})} className="w-full rounded-xl border border-gray-200 px-4 py-3 text-base outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100">
                <option value="">Select a service</option>
                <option>AC repair</option>
                <option>Heating repair</option>
                <option>System installation</option>
                <option>Seasonal maintenance</option>
                <option>Indoor air quality</option>
                <option>Commercial HVAC</option>
              </select>
            </label>

            <label className="block">
              <span className="mb-1 block text-sm font-semibold text-gray-700">Urgency</span>
              <select value={form.urgency} onChange={e=>setForm({...form, urgency:e.target.value})} className="w-full rounded-xl border border-gray-200 px-4 py-3 text-base outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100">
                <option>Routine</option>
                <option>Urgent</option>
                <option>Emergency</option>
              </select>
            </label>

            <label className="block">
              <span className="mb-1 block text-sm font-semibold text-gray-700">Preferred date and time</span>
              <input type="datetime-local" value={form.datetime} onChange={e=>setForm({...form, datetime:e.target.value})} className="w-full rounded-xl border border-gray-200 px-4 py-3 text-base outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100" />
            </label>

            <label className="block sm:col-span-2">
              <span className="mb-1 block text-sm font-semibold text-gray-700">Service address</span>
              <input value={form.address} onChange={e=>setForm({...form, address:e.target.value})} className="w-full rounded-xl border border-gray-200 px-4 py-3 text-base outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100" />
            </label>

            <label className="block sm:col-span-2">
              <span className="mb-1 block text-sm font-semibold text-gray-700">What is going on?</span>
              <textarea rows={4} value={form.notes} onChange={e=>setForm({...form, notes:e.target.value})} placeholder="Example: AC is blowing warm air, unit is making noise, thermostat is not responding..." className="w-full rounded-xl border border-gray-200 px-4 py-3 text-base outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100" />
            </label>

            <div className="flex flex-col gap-3 pt-2 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
              <button className="w-full rounded-xl bg-red-600 px-5 py-3 font-bold text-white shadow-lg shadow-red-600/20 sm:w-auto">Request Appointment</button>
              <a href="tel:(555) 555-5555" className="w-full rounded-xl border border-gray-200 px-5 py-3 text-center font-bold text-gray-900 sm:w-auto">Call Instead</a>
            </div>
          </form>

          {status && <div className="mt-4 rounded-xl bg-green-50 p-4 text-sm font-semibold leading-6 text-green-800">{status}</div>}
        </div>
      </div>
    </div>
  )
}
