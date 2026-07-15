import { GetServerSideProps } from 'next'
import { getContent } from '../lib/store'
import Link from 'next/link'
import Header from '../components/Header'
import { demoImages, resolveDemoImage } from '../lib/demoImages'

const fallbackHero = demoImages.hero

export default function Home({ content }: any) {
  const hero = content.home?.hero || {
    headline: 'Fast, Reliable HVAC Service',
    subheadline: 'Need a new system, urgent repair, seasonal maintenance, duct help, or thermostat service? Get clear answers and dependable HVAC support.',
    cta: 'Request Service',
    image: fallbackHero,
    imageAlt: 'Terrell AC and Heating service vehicle ready for HVAC calls'
  }
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
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href="/request" className="inline-flex justify-center rounded-xl bg-red-600 px-6 py-3 text-center font-bold text-white shadow-lg shadow-red-600/20">Request Service</Link>
              <Link href="/services" className="inline-flex justify-center rounded-xl border border-white/20 bg-white/10 px-6 py-3 text-center font-bold text-white backdrop-blur">View Services</Link>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/20 shadow-2xl shadow-black/40">
            <img src={heroImage} alt={hero.imageAlt || 'Terrell AC and Heating service vehicle'} className="h-72 w-full object-cover sm:h-96 md:h-[28rem]" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-red-200 sm:text-sm">Fast response • Clear options • Comfort first</p>
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
