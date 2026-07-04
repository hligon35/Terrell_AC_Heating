import { GetServerSideProps } from 'next'
import { getContent } from '../lib/store'
import Link from 'next/link'
import Header from '../components/Header'

export default function Alternate({ content }: any) {
  const hero = content.home?.heroAlt || {
    headline: 'Premium HVAC Care for Your Home',
    subheadline: 'Cinematic comfort, expert technicians.',
    cta: 'Schedule Premium Service'
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <Header variant="alternate" />

      <main className="max-w-6xl mx-auto p-6">
        <section className="grid md:grid-cols-2 gap-8 items-center py-16">
          <div>
            <h1 className="text-5xl font-extrabold mb-4">{hero.headline}</h1>
            <p className="text-xl text-gray-300 mb-6">{hero.subheadline}</p>
            <Link href="/request" className="inline-block bg-brand-500 text-white px-6 py-3 rounded">{hero.cta}</Link>
          </div>
          <div className="h-80 bg-black bg-opacity-20 rounded flex items-center justify-center overflow-hidden">
            <img src="/images/hero-alt.svg" alt="Premium HVAC" className="w-full h-full object-cover" />
          </div>
        </section>

        <section className="py-8">
          <h2 className="text-3xl font-semibold">Our Services</h2>
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            {(content.services || []).map((s:any)=> (
              <div key={s.slug} className="p-6 bg-white/10 rounded-lg backdrop-blur"> 
                <h3 className="font-bold text-xl">{s.title}</h3>
                <p className="mt-2 text-gray-300">{s.excerpt}</p>
                <Link href={`/services/${s.slug}`} className="mt-4 inline-block text-red-400">Explore</Link>
              </div>
            ))}
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
