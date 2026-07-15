import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { getContent } from '../../lib/store'
import Header from '../../components/Header'
import { demoImages, demoServiceImages, resolveDemoImage } from '../../lib/demoImages'

const fallbackServiceImages = demoServiceImages

export default function Services({ content }: any) {
  const services = content.services || []
  const heroImage = resolveDemoImage(demoImages.systemInstallation, demoImages.systemInstallation)

  return (
    <div className="min-h-screen overflow-x-hidden bg-gray-50">
      <Header />
      <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <section className="mb-8 overflow-hidden rounded-3xl bg-gray-900 text-white shadow-xl">
          <div className="grid gap-0 md:grid-cols-[1.1fr_0.9fr] md:items-center">
            <div className="p-6 sm:p-8 lg:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-red-300 sm:text-sm">AC & Heating Services</p>
              <h1 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">HVAC help for installations, replacements, emergency repairs, maintenance, ducts, and thermostats.</h1>
              <p className="mt-4 text-sm leading-7 text-gray-300 sm:text-base">Choose the service that matches what you need. Terrell AC & Heating helps customers understand the issue, compare the right options, and move forward with clear next steps.</p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link href="/request" className="inline-flex w-full justify-center rounded-xl bg-red-600 px-5 py-3 font-bold text-white sm:w-auto">Request Service</Link>
                <a href="tel:(555) 555-5555" className="inline-flex w-full justify-center rounded-xl border border-white/20 bg-white/10 px-5 py-3 font-bold text-white sm:w-auto">Call Now</a>
              </div>
            </div>
            <img src={heroImage} alt="HVAC system installation service" className="h-64 w-full object-cover sm:h-72 md:h-full" />
          </div>
        </section>

        <section className="mb-8 grid gap-4 sm:grid-cols-3">
          {[
            ['Fast Help', 'Tell us what is happening and we will help you choose the right next step.'],
            ['Clear Options', 'Get practical repair, maintenance, or replacement guidance without confusion.'],
            ['Comfort First', 'Service focused on restoring airflow, temperature control, and peace of mind.']
          ].map(([title, copy]) => (
            <div key={title} className="rounded-2xl border border-gray-100 bg-white p-5 text-center shadow-sm">
              <p className="text-lg font-bold text-gray-900">{title}</p>
              <p className="mt-1 text-sm leading-6 text-gray-600">{copy}</p>
            </div>
          ))}
        </section>

        <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s:any, index:number)=> {
            const image = resolveDemoImage(s.image, fallbackServiceImages[index % fallbackServiceImages.length])
            return (
              <div key={s.slug} className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow">
                <img src={image} alt={s.imageAlt || `${s.title} HVAC service`} className="h-48 w-full object-cover sm:h-52" />
                <div className="p-5 sm:p-6">
                  <h3 className="text-xl font-bold text-gray-900">{s.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-gray-600">{s.excerpt}</p>
                  <Link href={`/services/${s.slug}`} className="mt-4 inline-flex w-full justify-center rounded-xl bg-gray-900 px-4 py-3 font-bold text-white sm:w-auto">View Service</Link>
                </div>
              </div>
            )
          })}
        </section>
      </main>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const content = getContent()
  return { props: { content } }
}
