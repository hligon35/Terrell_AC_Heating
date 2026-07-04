import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { getContent } from '../../lib/store'
import Header from '../../components/Header'

export default function Services({ content }: any) {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Header variant="alternate" />
      <main className="max-w-7xl mx-auto p-6">
        <section className="py-12">
          <h1 className="text-4xl font-extrabold">Services</h1>
          <p className="text-gray-600 mt-2">Heating, cooling, installations and preventative maintenance.</p>
        </section>

        <section className="mt-6 grid md:grid-cols-3 gap-6">
          {(content.services || []).map((s:any)=> (
            <div key={s.slug} className="p-6 bg-white rounded shadow">
              <img src={`/images/service-ac.svg`} alt="service" className="w-full h-40 object-cover rounded mb-3" />
              <h3 className="font-semibold text-lg">{s.title}</h3>
              <p className="text-sm text-gray-600 mt-2">{s.excerpt}</p>
              <Link href={`/services/${s.slug}`} className="text-brand-500 mt-3 inline-block">View</Link>
            </div>
          ))}
        </section>
      </main>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const content = getContent()
  return { props: { content } }
}
