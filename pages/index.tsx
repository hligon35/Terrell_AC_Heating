import { GetServerSideProps } from 'next'
import { getContent } from '../lib/store'
import Link from 'next/link'
import Header from '../components/Header'

const fallbackHero = '/images/hvac-hero.svg'
const fallbackServiceImages = [
  '/images/hvac-ac-repair.svg',
  '/images/hvac-heating-repair.svg',
  '/images/hvac-installation.svg',
  '/images/hvac-maintenance.svg',
  '/images/hvac-indoor-air.svg',
  '/images/hvac-ductwork.svg'
]

export default function Home({ content }: any) {
  const hero = content.home?.heroAlt || content.home?.hero || {
    headline: 'Premium HVAC Care for Your Home',
    subheadline: 'Cinematic comfort, expert technicians.',
    cta: 'Schedule Premium Service',
    image: fallbackHero,
    imageAlt: 'HVAC technician servicing residential AC equipment'
  }
  const services = content.services || []
  const gallery = content.media || []

  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-b from-gray-950 via-gray-900 to-gray-800 text-white">
      <Header variant="alternate" />

      <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <section className="grid gap-8 py-10 sm:py-14 md:grid-cols-2 md:items-center lg:py-16">
          <div>
            <div className="mb-4 inline-flex rounded-full border border-red-400/40 bg-red-500/10 px-4 py-2 text-xs font-semibold text-red-100 sm:text-sm">24/7 comfort help for AC, heat, and airflow</div>
            <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">{hero.headline}</h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-gray-300 sm:text-xl">{hero.subheadline}</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href="/request" className="inline-flex justify-center rounded bg-brand-500 px-6 py-3 text-center font-semibold text-white shadow-lg shadow-brand-500/20">{hero.cta}</Link>
              <Link href="/gallery" className="inline-flex justify-center rounded border border-white/20 bg-white/10 px-6 py-3 text-center font-semibold text-white backdrop-blur">View Our Work</Link>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/20 shadow-2xl shadow-black/40">
            <img src={hero.image || fallbackHero} alt={hero.imageAlt || 'HVAC technician servicing equipment'} className="h-72 w-full object-cover sm:h-96 md:h-[28rem]" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-red-200 sm:text-sm">Repair • Installation • Maintenance</p>
            </div>
          </div>
        </section>

        <section className="grid gap-4 py-4 sm:grid-cols-3">
          {['Emergency Repairs', 'System Installations', 'Seasonal Tune-Ups'].map((item) => (
            <div key={item} className="rounded-2xl border border-white/10 bg-white/10 p-5 text-center backdrop-blur">
              <p className="text-lg font-bold">{item}</p>
              <p className="mt-1 text-sm text-gray-300">Professional HVAC service that helps the site feel real and complete.</p>
            </div>
          ))}
        </section>

        <section className="py-10 sm:py-12">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-red-300 sm:text-sm">HVAC Services</p>
              <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">Real equipment. Real service visuals.</h2>
            </div>
            <Link href="/services" className="font-semibold text-red-300">See all services</Link>
          </div>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s:any, index:number)=> (
              <div key={s.slug} className="overflow-hidden rounded-2xl border border-white/10 bg-white/10 shadow-xl shadow-black/20 backdrop-blur"> 
                <img src={s.image || fallbackServiceImages[index % fallbackServiceImages.length]} alt={s.imageAlt || s.title} className="h-48 w-full object-cover" />
                <div className="p-5 sm:p-6">
                  <h3 className="text-xl font-bold">{s.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-gray-300">{s.excerpt}</p>
                  <Link href={`/services/${s.slug}`} className="mt-4 inline-block font-semibold text-red-400">Explore</Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="py-10 sm:py-12">
          <div className="rounded-3xl border border-white/10 bg-white/[0.07] p-4 backdrop-blur sm:p-6">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-red-300 sm:text-sm">Gallery Preview</p>
                <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">Photos that make the website feel finished</h2>
              </div>
              <Link href="/gallery" className="font-semibold text-red-300">Open gallery</Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {(gallery.length ? gallery : fallbackServiceImages.map((url, i) => ({ url, alt: 'HVAC service visual', name: `HVAC Work ${i + 1}` }))).slice(0, 6).map((m:any, i:number)=>(
                <div key={`${m.url}-${i}`} className="overflow-hidden rounded-2xl bg-black/30">
                  <img src={m.url} alt={m.alt || m.name || 'HVAC work visual'} className="h-44 w-full object-cover transition duration-500 hover:scale-105" />
                  <div className="p-3 text-sm text-gray-200">{m.name || m.alt}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const content = getContent()
  return { props: { content } }
}
