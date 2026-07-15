import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { getContent } from '../../lib/store'
import Header from '../../components/Header'
import { demoImages, resolveDemoImage } from '../../lib/demoImages'

const fallbackServiceImage = demoImages.hero

export default function ServiceDetail({ service }: any) {
  if (!service) return <div className="p-6">Service not found</div>
  const image = resolveDemoImage(service.image, fallbackServiceImage)

  return (
    <div className="min-h-screen overflow-x-hidden bg-gray-50">
      <Header />
      <main className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
        <Link href="/services" className="text-sm font-semibold text-brand-600">← Back to Services</Link>
        <article className="mt-4 overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-xl">
          <img src={image} alt={service.imageAlt || `${service.title} HVAC procedure`} className="h-64 w-full object-cover sm:h-80" />
          <div className="p-5 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-red-500 sm:text-sm">Terrell AC & Heating</p>
            <h1 className="mt-2 text-3xl font-extrabold leading-tight text-gray-900 sm:text-4xl">{service.title}</h1>
            <p className="mt-4 text-base leading-8 text-gray-700 sm:text-lg">{service.body || service.excerpt}</p>
            <div className="mt-8 rounded-2xl bg-gray-900 p-5 text-white sm:p-6">
              <h2 className="text-xl font-bold">Need help with this service?</h2>
              <p className="mt-2 text-sm leading-6 text-gray-300 sm:text-base">Schedule a visit and Terrell AC and Heating can inspect the equipment, explain the issue, and recommend the best next step.</p>
              <Link href="/request" className="mt-4 inline-flex w-full justify-center rounded bg-red-500 px-5 py-3 font-semibold text-white sm:w-auto">Request Service</Link>
            </div>
          </div>
        </article>
      </main>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const slug = ctx.params?.slug as string
  const content = getContent()
  const service = (content.services || []).find((s:any)=>s.slug===slug) || null
  return { props: { service } }
}
