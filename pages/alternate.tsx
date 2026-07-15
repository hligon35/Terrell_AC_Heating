import { GetServerSideProps } from 'next'
import { getContent } from '../lib/store'
import Link from 'next/link'
import Header from '../components/Header'
import { demoImages, demoServiceImages, resolveDemoImage } from '../lib/demoImages'

export default function Alternate({ content }: any) {
  const hero = content.home?.heroAlt || {
    headline: 'Premium HVAC Care for Your Home',
    subheadline: 'Reliable comfort service with clean communication and professional follow-through.',
    cta: 'Request Service',
    image: demoImages.heroAlt
  }
  const heroImage = resolveDemoImage(hero.image, demoImages.heroAlt)

  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <Header variant="alternate" />

      <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <section className="grid gap-8 py-8 sm:py-12 md:grid-cols-2 md:items-center lg:py-16">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-red-300 sm:text-sm">Comfort service, made simple</p>
            <h1 className="mb-4 text-4xl font-extrabold leading-tight sm:text-5xl">{hero.headline}</h1>
            <p className="mb-6 text-base leading-7 text-gray-300 sm:text-xl">{hero.subheadline}</p>
            <Link href="/request" className="inline-flex w-full justify-center rounded-xl bg-red-600 px-6 py-3 font-bold text-white sm:w-auto">{hero.cta || 'Request Service'}</Link>
          </div>
          <div className="h-72 overflow-hidden rounded-3xl bg-black bg-opacity-20 shadow-2xl sm:h-80 md:h-96">
            <img src={heroImage} alt="HVAC equipment and comfort service" className="h-full w-full object-cover" />
          </div>
        </section>

        <section className="py-8">
          <h2 className="text-2xl font-bold sm:text-3xl">Services for the problems customers actually feel</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {(content.services || []).map((s:any, index:number)=> {
              const image = resolveDemoImage(s.image, demoServiceImages[index % demoServiceImages.length])
              return (
                <div key={s.slug} className="overflow-hidden rounded-2xl bg-white/10 backdrop-blur"> 
                  <img src={image} alt={s.imageAlt || s.title} className="h-44 w-full object-cover" />
                  <div className="p-5 sm:p-6">
                    <h3 className="text-xl font-bold">{s.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-gray-300">{s.excerpt}</p>
                    <Link href={`/services/${s.slug}`} className="mt-4 inline-flex w-full justify-center rounded-xl bg-white/10 px-4 py-3 font-bold text-red-300 sm:w-auto">Learn more</Link>
                  </div>
                </div>
              )
            })}
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
