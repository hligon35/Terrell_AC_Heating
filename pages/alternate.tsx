import { GetServerSideProps } from 'next'
import { getContent } from '../lib/store'
import Link from 'next/link'
import Header from '../components/Header'
import { demoImages, demoServiceImages, resolveDemoImage } from '../lib/demoImages'

export default function Alternate({ content }: any) {
  const hero = content.home?.heroAlt || {
    headline: 'Premium HVAC Care for Your Home',
    subheadline: 'Cinematic comfort, expert technicians.',
    cta: 'Schedule Premium Service',
    image: demoImages.heroAlt
  }
  const heroImage = resolveDemoImage(hero.image, demoImages.heroAlt)

  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <Header variant="alternate" />

      <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <section className="grid gap-8 py-10 sm:py-14 md:grid-cols-2 md:items-center lg:py-16">
          <div>
            <h1 className="mb-4 text-4xl font-extrabold leading-tight sm:text-5xl">{hero.headline}</h1>
            <p className="mb-6 text-base leading-7 text-gray-300 sm:text-xl">{hero.subheadline}</p>
            <Link href="/request" className="inline-flex w-full justify-center rounded bg-brand-500 px-6 py-3 text-white sm:w-auto">{hero.cta}</Link>
          </div>
          <div className="h-72 overflow-hidden rounded-3xl bg-black bg-opacity-20 shadow-2xl sm:h-80 md:h-96">
            <img src={heroImage} alt="Premium HVAC" className="h-full w-full object-cover" />
          </div>
        </section>

        <section className="py-8">
          <h2 className="text-3xl font-semibold">Our Services</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {(content.services || []).map((s:any, index:number)=> {
              const image = resolveDemoImage(s.image, demoServiceImages[index % demoServiceImages.length])
              return (
                <div key={s.slug} className="overflow-hidden rounded-2xl bg-white/10 backdrop-blur"> 
                  <img src={image} alt={s.imageAlt || s.title} className="h-44 w-full object-cover" />
                  <div className="p-6">
                    <h3 className="text-xl font-bold">{s.title}</h3>
                    <p className="mt-2 text-gray-300">{s.excerpt}</p>
                    <Link href={`/services/${s.slug}`} className="mt-4 inline-block text-red-400">Explore</Link>
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
