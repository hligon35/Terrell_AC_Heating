import { GetServerSideProps } from 'next'
import { getContent } from '../lib/store'
import Link from 'next/link'
import Header from '../components/Header'

const fallbackHero = 'https://source.unsplash.com/1800x1200/?hvac,technician,air-conditioner'
const fallbackServiceImages = [
  'https://source.unsplash.com/1400x950/?air-conditioner,repair,technician',
  'https://source.unsplash.com/1400x950/?furnace,heating,technician',
  'https://source.unsplash.com/1400x950/?hvac,installation,ductwork',
  'https://source.unsplash.com/1400x950/?hvac,maintenance,tools',
  'https://source.unsplash.com/1400x950/?air-filter,ventilation,home',
  'https://source.unsplash.com/1400x950/?ductwork,ventilation,construction'
]

export default function Alternate({ content }: any) {
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
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-800 text-white">
      <Header variant="alternate" />

      <main className="max-w-6xl mx-auto p-6">
        <section className="grid md:grid-cols-2 gap-8 items-center py-16">
          <div>
            <div className="mb-4 inline-flex rounded-full border border-red-400/40 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-100">24/7 comfort help for AC, heat, and airflow</div>
            <h1 className="text-5xl font-extrabold mb-4 leading-tight">{hero.headline}</h1>
            <p className="text-xl text-gray-300 mb-6">{hero.subheadline}</p>
            <div className="flex flex-wrap gap-3">
              <Link href="/request" className="inline-block bg-brand-500 text-white px-6 py-3 rounded font-semibold shadow-lg shadow-brand-500/20">{hero.cta}</Link>
              <Link href="/gallery" className="inline-block border border-white/20 bg-white/10 px-6 py-3 rounded font-semibold text-white backdrop-blur">View Our Work</Link>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/20 shadow-2xl shadow-black/40">
            <img src={hero.image || fallbackHero} alt={hero.imageAlt || 'HVAC technician servicing equipment'} className="h-[28rem] w-full object-cover" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-200">Repair • Installation • Maintenance</p>
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

        <section className="py-12">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-red-300">HVAC Services</p>
              <h2 className="text-3xl font-semibold">Real equipment. Real service visuals.</h2>
            </div>
            <Link href="/services" className="text-red-300 font-semibold">See all services</Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            {services.map((s:any, index:number)=> (
              <div key={s.slug} className="overflow-hidden rounded-2xl border border-white/10 bg-white/10 backdrop-blur shadow-xl shadow-black/20"> 
                <img src={s.image || fallbackServiceImages[index % fallbackServiceImages.length]} alt={s.imageAlt || s.title} className="h-48 w-full object-cover" />
                <div className="p-6">
                  <h3 className="font-bold text-xl">{s.title}</h3>
                  <p className="mt-2 text-gray-300">{s.excerpt}</p>
                  <Link href={`/services/${s.slug}`} className="mt-4 inline-block text-red-400 font-semibold">Explore</Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="py-12">
          <div className="rounded-3xl border border-white/10 bg-white/[0.07] p-6 backdrop-blur">
            <div className="mb-6 flex items-end justify-between gap-3">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-red-300">Gallery Preview</p>
                <h2 className="text-3xl font-semibold">Photos that make the website feel finished</h2>
              </div>
              <Link href="/gallery" className="hidden sm:inline-block text-red-300 font-semibold">Open gallery</Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {(gallery.length ? gallery : fallbackServiceImages.map((url, i) => ({ url, alt: 'HVAC service photo', name: `HVAC Work ${i + 1}` }))).slice(0, 6).map((m:any, i:number)=>(
                <div key={`${m.url}-${i}`} className="overflow-hidden rounded-2xl bg-black/30">
                  <img src={m.url} alt={m.alt || m.name || 'HVAC work photo'} className="h-44 w-full object-cover transition duration-500 hover:scale-105" />
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
