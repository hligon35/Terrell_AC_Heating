import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { getContent } from '../../lib/store'
import Header from '../../components/Header'

const fallbackServiceImage = 'https://source.unsplash.com/1600x1000/?hvac,technician,air-conditioner'

export default function ServiceDetail({ service }: any) {
  if (!service) return <div className="p-6">Service not found</div>
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-5xl mx-auto p-6 mt-6">
        <Link href="/services" className="text-sm font-semibold text-brand-600">← Back to Services</Link>
        <article className="mt-4 overflow-hidden rounded-3xl bg-white shadow-xl border border-gray-100">
          <img src={service.image || fallbackServiceImage} alt={service.imageAlt || `${service.title} HVAC procedure`} className="h-80 w-full object-cover" />
          <div className="p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-red-500">Terrell AC & Heating</p>
            <h1 className="mt-2 text-4xl font-extrabold text-gray-900">{service.title}</h1>
            <p className="mt-4 text-lg leading-8 text-gray-700">{service.body || service.excerpt}</p>
            <div className="mt-8 rounded-2xl bg-gray-900 p-6 text-white">
              <h2 className="text-xl font-bold">Need help with this service?</h2>
              <p className="mt-2 text-gray-300">Schedule a visit and Terrell AC and Heating can inspect the equipment, explain the issue, and recommend the best next step.</p>
              <Link href="/request" className="mt-4 inline-block rounded bg-red-500 px-5 py-3 font-semibold text-white">Request Service</Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const slug = ctx.params?.slug as string
  const content = getContent()
  const service = (content.services || []).find((s:any)=>s.slug===slug) || null
  return { props: { service } }
}
