import { useState } from 'react'
import { GetServerSideProps } from 'next'
import { getContent } from '../../lib/store'

export default function AlternateAppointment({ content }: any){
  const services = content.services || []
  const [form, setForm] = useState({ name:'', phone:'', email:'', service: services[0]?.title || '', datetime:'', notes:'' })
  const [status, setStatus] = useState('')

  async function submit(e:any){
    e.preventDefault()
    const res = await fetch('/api/leads', { method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify({ ...form, type:'appointment' }) })
    if (res.ok) setStatus('Appointment request submitted — we will call to confirm')
    else setStatus('Error submitting')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-8">
      <div className="max-w-3xl mx-auto bg-black bg-opacity-40 p-6 rounded-lg">
        <h1 className="text-3xl font-bold mb-4">Schedule a Premium Appointment</h1>
        <form onSubmit={submit} className="space-y-3">
          <input required placeholder="Full name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} className="w-full p-2 border border-gray-700 bg-black/20 rounded" />
          <input required placeholder="Phone" value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})} className="w-full p-2 border border-gray-700 bg-black/20 rounded" />
          <input placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} className="w-full p-2 border border-gray-700 bg-black/20 rounded" />
          <select value={form.service} onChange={e=>setForm({...form, service:e.target.value})} className="w-full p-2 border border-gray-700 bg-black/20 rounded">
            {services.map((s:any)=>(<option key={s.slug} value={s.title}>{s.title}</option>))}
          </select>
          <input type="datetime-local" value={form.datetime} onChange={e=>setForm({...form, datetime:e.target.value})} className="w-full p-2 border border-gray-700 bg-black/20 rounded" />
          <textarea placeholder="Notes" value={form.notes} onChange={e=>setForm({...form, notes:e.target.value})} className="w-full p-2 border border-gray-700 bg-black/20 rounded" />
          <button className="px-4 py-2 bg-red-500 rounded">Request Appointment</button>
        </form>
        {status && <div className="mt-4 p-3 bg-green-800 text-white rounded">{status}</div>}
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const content = getContent()
  return { props: { content: content.content || content } }
}
