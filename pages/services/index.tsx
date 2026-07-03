import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { getContent } from '../../lib/store'
import Header from '../../components/Header'

export default function Services({ content }: any) {
  return (
    <div>
      <Header />
      <div className="max-w-6xl mx-auto p-6 mt-6">
        <h1 className="text-3xl font-bold mb-4">Services</h1>
        <div className="grid md:grid-cols-3 gap-6">
          {(content.services || []).map((s:any)=> (
            <div key={s.slug} className="p-4 bg-white rounded shadow">
              <img src={`/images/service-ac.svg`} alt="service" className="w-full h-32 object-cover rounded mb-3" />
              <h3 className="font-semibold">{s.title}</h3>
              <p className="text-sm text-gray-600">{s.excerpt}</p>
              <Link href={`/services/${s.slug}`} className="text-brand-500">View</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const content = getContent()
  return { props: { content } }
}
