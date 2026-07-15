import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { getContent } from '../../lib/store'
import Header from '../../components/Header'
import { demoImages, demoGalleryImages, demoServiceImages, resolveDemoImage } from '../../lib/demoImages'

const fallbackServiceImages = demoServiceImages
const fallbackMedia = demoGalleryImages

export default function Services({ content }: any) {
  const services = content.services || []
  const media = content.media?.length ? content.media : fallbackMedia
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
              <p className="mt-4 text-sm leading-7 text-gray-300 sm:text-base">Browse each service below with real service visuals, clear explanations, and direct options to request help. Terrell AC & Heating helps customers understand the issue, compare the right options, and move forward with clear next steps.</p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link href="/request" className="inline-flex w-full justify-center rounded-xl bg-red-600 px-5 py-3 font-bold text-white sm:w-auto">Request Service</Link>
                <a href="tel:(555) 555-5555" className="inline-flex w-full justify-center rounded-xl border border-white/20 bg-white/10 px-5 py-3 font-bold text-white sm:w-auto">Call Now</a>
              </div>
            </div>
            <img src={heroImage} alt="HVAC system installation service" className="h-64 w-full object-cover sm:h-72 md:h-full" />
          </div>
        </section>

        <section className="mb-8 rounded-3xl border border-gray-100 bg-white p-5 shadow-sm sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-red-500 sm:text-sm">Service Overview</p>
          <h2 className="mt-2 text-2xl font-extrabold leading-tight text-gray-900 sm:text-3xl">Choose the service that matches what is happening with your system.</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-gray-600 sm:text-base">Each card gives customers a quick, plain-language explanation of the service, what problem it solves, and a visual reference for the work.</p>
        </section>

        <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s:any, index:number)=> {
            const galleryFallback = media[index % media.length]
            const fallback = galleryFallback?.url || fallbackServiceImages[index % fallbackServiceImages.length]
            const image = resolveDemoImage(s.image, fallback)
            return (
              <article key={s.slug} className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow">
                <img src={image} alt={s.imageAlt || `${s.title} HVAC service`} className="h-52 w-full object-cover transition duration-500 hover:scale-105 sm:h-56" />
                <div className="p-5 sm:p-6">
                  <h3 className="text-xl font-extrabold text-gray-900">{s.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-gray-600">{s.excerpt}</p>
                  {s.body && <p className="mt-3 text-sm leading-6 text-gray-500">{s.body}</p>}
                  <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
                    <Link href={`/services/${s.slug}`} className="inline-flex w-full justify-center rounded-xl bg-gray-900 px-4 py-3 font-bold text-white sm:w-auto">View Service</Link>
                    <Link href="/request" className="inline-flex w-full justify-center rounded-xl border border-gray-200 px-4 py-3 font-bold text-gray-900 sm:w-auto">Request Help</Link>
                  </div>
                </div>
              </article>
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