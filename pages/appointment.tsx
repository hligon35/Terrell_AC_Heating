import { useState } from 'react'
import { GetServerSideProps } from 'next'
import { getContent } from '../lib/store'
import Header from '../components/Header'

export default function Appointment({ content }: any){
  const services = content.services || []
  const [form, setForm] = useState({ name:'', phone:'', email:'', service: services[0]?.title || '', date:'', notes:'' })
  const [status, setStatus] = useState('')

  async function submit(e:any){
    e.preventDefault()
    const res = await fetch('/api/leads', { method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify({ ...form, type:'appointment' }) })
    if (res.ok) setStatus('Appointment request submitted — we will call to confirm')
    else setStatus('Error submitting')
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Header variant="alternate" />
      <main className="max-w-3xl mx-auto p-6">
        <section className="py-12">
          <h1 className="text-4xl font-extrabold">Make an Appointment</h1>
          <p className="text-gray-600 mt-2">Request a time and we'll confirm with you.</p>
        </section>

        <section className="mt-6 bg-white p-6 rounded shadow">
      <form onSubmit={submit} className="space-y-3">
        <label className="sr-only">Full name</label>
        <input required placeholder="Full name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} className="w-full p-2 border rounded" />
        <label className="sr-only">Phone</label>
        <input required placeholder="Phone" value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})} className="w-full p-2 border rounded" />
        <label className="sr-only">Email</label>
        <input placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} className="w-full p-2 border rounded" />

        <label className="sr-only">Service</label>
        <select aria-label="Service" value={form.service} onChange={e=>setForm({...form, service:e.target.value})} className="w-full p-2 border rounded">
          {services.map((s:any)=>(<option key={s.slug} value={s.title}>{s.title}</option>))}
        </select>

        <label className="sr-only">Preferred date</label>
        <input type="date" value={form.date} onChange={e=>setForm({...form, date:e.target.value})} className="w-full p-2 border rounded" />
        <textarea placeholder="Notes / details" value={form.notes} onChange={e=>setForm({...form, notes:e.target.value})} className="w-full p-2 border rounded" />
        <button className="px-4 py-2 bg-brand-500 text-white rounded">Request Appointment</button>
      </form>
      {status && <div className="mt-4 p-3 bg-green-50 text-green-800 rounded">{status}</div>}
        </section>
      </main>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const content = getContent()
  return { props: { content: content.content || content } }
}
