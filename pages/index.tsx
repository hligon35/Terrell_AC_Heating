import { GetServerSideProps } from 'next'
import { getContent } from '../lib/store'
import Link from 'next/link'
import Header from '../components/Header'
import { demoImages, demoServiceImages, demoGalleryImages, resolveDemoImage } from '../lib/demoImages'

const fallbackHero = demoImages.hero
const fallbackServiceImages = demoServiceImages
const fallbackGallery = demoGalleryImages

export default function Home({ content }: any) {
  const hero = content.home?.hero || content.home?.heroAlt || {
    headline: 'Fast, Reliable HVAC Service',
    subheadline: 'Comfort restored. Experts on call 24/7.',
    cta: 'Request Service',
    image: fallbackHero,
    imageAlt: 'HVAC technician servicing residential AC equipment'
  }
  const services = content.services || []
  const gallery = content.media?.length ? content.media : fallbackGallery
  const heroImage = resolveDemoImage(hero.image, fallbackHero)

  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-b from-gray-950 via-gray-900 to-gray-800 text-white">
      <Header variant="alternate" />

      <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <section className="grid gap-8 py-8 sm:py-12 md:grid-cols-2 md:items-center lg:py-16">
          <div>
            <div className="mb-4 inline-flex rounded-full border border-red-400/40 bg-red-500/10 px-4 py-2 text-xs font-semibold text-red-100 sm:text-sm">Residential & commercial HVAC service</div>
            <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">{hero.headline}</h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-gray-300 sm:text-xl">{hero.subheadline}</p>
            <p className="mt-3 max-w-xl text-sm leading-7 text-gray-400 sm:text-base">From warm air and noisy units to seasonal tune-ups and system replacements, Terrell AC & Heating helps you get comfortable again with straightforward service and clear next steps.</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href="/request" className="inline-flex justify-center rounded-xl bg-red-600 px-6 py-3 text-center font-bold text-white shadow-lg shadow-red-600/20">Request Service</Link>
              <Link href="/services" className="inline-flex justify-center rounded-xl border border-white/20 bg-white/10 px-6 py-3 text-center font-bold text-white backdrop-blur">View Services</Link>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/20 shadow-2xl shadow-black/40">
            <img src={heroImage} alt={hero.imageAlt || 'HVAC technician servicing equipment'} className="h-72 w-full object-cover sm:h-96 md:h-[28rem]" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-red-200 sm:text-sm">AC Repair • Heating • Installation • Maintenance</p>
            </div>
          </div>
        </section>

        <section className="grid gap-4 py-4 sm:grid-cols-3">
          {[
            ['Fast Help', 'Tell us what is happening and we will help you choose the right next step.'],
            ['Clear Options', 'Get practical repair, maintenance, or replacement guidance without the confusion.'],
            ['Comfort First', 'Service focused on restoring airflow, temperature control, and peace of mind.']
          ].map(([title, copy]) => (
            <div key={title} className="rounded-2xl border border-white/10 bg-white/10 p-5 text-center backdrop-blur">
              <p className="text-lg font-bold">{title}</p>
              <p className="mt-1 text-sm leading-6 text-gray-300">{copy}</p>
            </div>
          ))}
        </section>

        <section className="py-10 sm:py-12">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-red-300 sm:text-sm">HVAC Services</p>
              <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">Help for the systems that keep your home comfortable.</h2>
            </div>
            <Link href="/services" className="font-semibold text-red-300">See all services</Link>
          </div>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s:any, index:number)=> {
              const image = resolveDemoImage(s.image, fallbackServiceImages[index % fallbackServiceImages.length])
              return (
                <div key={s.slug} className="overflow-hidden rounded-2xl border border-white/10 bg-white/10 shadow-xl shadow-black/20 backdrop-blur"> 
                  <img src={image} alt={s.imageAlt || s.title} className="h-48 w-full object-cover" />
                  <div className="p-5 sm:p-6">
                    <h3 className="text-xl font-bold">{s.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-gray-300">{s.excerpt}</p>
                    <Link href={`/services/${s.slug}`} className="mt-4 inline-block font-semibold text-red-400">Learn more</Link>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        <section className="py-10 sm:py-12">
          <div className="rounded-3xl border border-white/10 bg-white/[0.07] p-4 backdrop-blur sm:p-6">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-red-300 sm:text-sm">Recent Work</p>
                <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">Real HVAC equipment, repairs, and service visits.</h2>
              </div>
              <Link href="/gallery" className="font-semibold text-red-300">Open gallery</Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {gallery.slice(0, 6).map((m:any, i:number)=>{
                const fallback = fallbackGallery[i % fallbackGallery.length]?.url || fallbackServiceImages[i % fallbackServiceImages.length]
                const image = resolveDemoImage(m.url, fallback)
                return (
                  <div key={`${m.url}-${i}`} className="overflow-hidden rounded-2xl bg-black/30">
                    <img src={image} alt={m.alt || m.name || 'HVAC work visual'} className="h-44 w-full object-cover transition duration-500 hover:scale-105" />
                    <div className="p-3 text-sm text-gray-200">{m.name || m.alt}</div>
                  </div>
                )
              })}
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
