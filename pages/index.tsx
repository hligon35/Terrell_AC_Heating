import { GetServerSideProps } from 'next'
import { getContent } from '../lib/store'
import Link from 'next/link'
import Header from '../components/Header'

function FAQItem({ q, a }: { q: string, a: string }){
  const [open, setOpen] = React.useState(false)
  return (
    <div className="border-b py-3">
      <button className="w-full text-left flex justify-between items-center" onClick={()=>setOpen(!open)}>
        <span className="font-medium">{q}</span>
        <span>{open? '-' : '+'}</span>
      </button>
      {open && <div className="mt-2 text-sm text-gray-300">{a}</div>}
    </div>
  )
}

export default function FinanceHome({ content }: any) {
  const hero = content.home?.heroAlt || { headline:'Flexible Financing For Your New System', subheadline:'Affordable monthly payments — fast approvals', cta:'Get Prequalified' }
  const financing = content.financing || [
    { title: 'Low Monthly Payments', desc: 'Custom plans tailored to your budget.' },
    { title: 'Fast Approvals', desc: 'Quick decisions so you can schedule sooner.' },
    { title: 'Flexible Terms', desc: 'Multiple term lengths to choose from.' }
  ]
  const faqs = content.faqs || [{q:'How do I apply?', a:'Fill the form and our team will follow up.'}]

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Header variant="alternate" />

      <main className="max-w-7xl mx-auto p-6">
        <section className="grid md:grid-cols-2 gap-8 items-center py-12">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-extrabold">{hero.headline}</h1>
            <p className="text-lg text-gray-600">{hero.subheadline}</p>
            <div className="flex gap-4">
              <Link href="#apply" className="px-6 py-3 bg-brand-600 text-white rounded shadow">{hero.cta}</Link>
              <a href="tel:555-555-5555" className="px-6 py-3 border rounded">Call Now</a>
            </div>
            <div className="flex gap-4 mt-6">
              <div className="p-4 bg-white rounded shadow">
                <div className="text-sm text-gray-500">Estimated monthly</div>
                <div className="text-2xl font-bold">$89/mo</div>
              </div>
              <div className="p-4 bg-white rounded shadow">
                <div className="text-sm text-gray-500">Typical approval</div>
                <div className="text-2xl font-bold">Minutes</div>
              </div>
            </div>
          </div>

          <div id="apply" className="bg-white p-6 rounded shadow">
            <h3 className="text-xl font-semibold mb-4">Get prequalified</h3>
            <form onSubmit={async (e)=>{ e.preventDefault(); const fd = Object.fromEntries(new FormData(e.currentTarget as HTMLFormElement) as any); await fetch('/api/leads',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(fd)}); alert('Submitted — our team will contact you') }}>
              <div className="grid gap-3">
                <input name="name" placeholder="Full name" className="p-2 border rounded" required />
                <input name="email" type="email" placeholder="Email" className="p-2 border rounded" required />
                <input name="phone" placeholder="Phone" className="p-2 border rounded" required />
                <select name="amount" className="p-2 border rounded">
                  <option value="">Select estimate</option>
                  <option>$2,000</option>
                  <option>$5,000</option>
                  <option>$10,000</option>
                </select>
                <button className="px-4 py-2 bg-brand-600 text-white rounded">Get Prequalified</button>
              </div>
            </form>
            <div className="text-xs text-gray-500 mt-3">No hard credit check. Subject to terms.</div>
          </div>
        </section>

        <section className="py-12">
          <h2 className="text-2xl font-bold mb-6">Why choose our financing</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {financing.map((f:any,i:number)=> (
              <div key={i} className="p-6 bg-white rounded shadow">
                <h3 className="font-semibold text-lg">{f.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-12">
          <h2 className="text-2xl font-bold mb-4">Frequently asked questions</h2>
          <div className="bg-white rounded shadow divide-y">
            {faqs.map((q:any,i:number)=>(<div key={i} className="p-4"><FAQItem q={q.q} a={q.a} /></div>))}
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between">
            <div>
              <div className="font-bold">Terrell AC & Heating</div>
              <div className="text-sm">Serving the local area</div>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="text-sm">Contact</div>
              <div className="text-sm">(555) 555-5555</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

import React from 'react'
export const getServerSideProps: GetServerSideProps = async () => {
  const content = getContent()
  return { props: { content } }
}
