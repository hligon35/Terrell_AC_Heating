import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { getContent } from '../../lib/store'
import Header from '../../components/Header'

const fallbackServiceImages = [
  'https://source.unsplash.com/1400x950/?air-conditioner,repair,technician',
  'https://source.unsplash.com/1400x950/?furnace,heating,technician',
  'https://source.unsplash.com/1400x950/?hvac,installation,ductwork',
  'https://source.unsplash.com/1400x950/?hvac,maintenance,tools',
  'https://source.unsplash.com/1400x950/?air-filter,ventilation,home',
  'https://source.unsplash.com/1400x950/?ductwork,ventilation,construction'
]

export default function Services({ content }: any) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-6xl mx-auto p-6 mt-6">
        <div className="mb-8 overflow-hidden rounded-3xl bg-gray-900 text-white shadow-xl">
          <div className="grid md:grid-cols-[1.1fr_0.9fr] items-center">
            <div className="p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-red-300">AC & Heating Services</p>
              <h1 className="mt-3 text-4xl font-extrabold">Reliable comfort work backed by real equipment experience.</h1>
              <p className="mt-4 text-gray-300">Explore HVAC repairs, installations, maintenance, ductwork, and air-quality services with photos that show the kind of work customers can expect.</p>
            </div>
            <img src="https://source.unsplash.com/1600x1000/?hvac,tools,technician" alt="HVAC tools and service equipment" className="h-72 w-full object-cover" />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {(content.services || []).map((s:any, index:number)=> (
            <div key={s.slug} className="overflow-hidden bg-white rounded-2xl shadow border border-gray-100">
              <img src={s.image || fallbackServiceImages[index % fallbackServiceImages.length]} alt={s.imageAlt || `${s.title} HVAC service`} className="w-full h-44 object-cover" />
              <div className="p-5">
                <h3 className="font-semibold text-xl">{s.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{s.excerpt}</p>
                <Link href={`/services/${s.slug}`} className="mt-4 inline-block font-semibold text-brand-500">View Service</Link>
              </div>
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
