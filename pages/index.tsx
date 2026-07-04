import Link from 'next/link'
import { GetServerSideProps } from 'next'
import { getContent } from '../lib/store'
import Header from '../components/Header'

type Props = { content: any }

export default function Home({ content }: Props) {
  const site = { ...(content.site || {}) }
  const hero = content.home?.hero || {
    headline: 'Fast, Reliable HVAC Service',
    subheadline: 'Terrell AC and Heating — Comfort restored, fast.',
    cta: 'Request Service'
  }

  return (
    <div>
      <Header variant="primary" />

      <main className="max-w-6xl mx-auto p-6">
        <section className="grid md:grid-cols-2 gap-8 items-center py-12">
          <div>
            <h1 className="text-4xl font-extrabold mb-4">{hero.headline}</h1>
            <p className="text-lg text-gray-700 mb-6">{hero.subheadline}</p>
            <div className="flex gap-4">
              <Link href="/request" className="px-6 py-3 bg-brand-500 text-white rounded shadow">{hero.cta}</Link>
              <a href="tel:555-555-5555" className="px-6 py-3 border rounded">Call Now</a>
            </div>
          </div>
          <div className="rounded-lg h-56 flex items-center justify-center overflow-hidden">
            <img src="/images/hero-primary.svg" alt="Terrell AC hero" className="w-full h-full object-cover" />
          </div>
        </section>

        <section className="py-8">
          <div className="bg-gray-100 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Our Services</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {(content.services || []).map((s: any) => (
                <div key={s.slug} className="p-4 bg-white rounded shadow">
                  <h3 className="font-bold">{s.title}</h3>
                  <p className="text-sm text-gray-600">{s.excerpt}</p>
                  <Link href={`/services/${s.slug}`} className="mt-2 inline-block text-brand-500">Learn more</Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-8">
          <h2 className="text-2xl font-semibold mb-4">Testimonials</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {(content.testimonials || []).slice(0,3).map((t:any, i:number)=>(
              <div key={i} className="p-4 bg-white rounded shadow">"{t.quote}" — <strong>{t.author}</strong></div>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-between">
            <div>
              <div className="font-bold">Terrell AC & Heating</div>
              <div className="text-sm">Serving the local area — placeholder service area</div>
            </div>
            <div>
              <div className="font-semibold">Contact</div>
              <div className="text-sm">(555) 555-5555</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const content = getContent()
  return { props: { content } }
}
