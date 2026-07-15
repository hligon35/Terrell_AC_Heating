import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { getContent } from '../../lib/store'
import Header from '../../components/Header'
import { demoImages, demoServiceImages, resolveDemoImage } from '../../lib/demoImages'

const fallbackServiceImages = demoServiceImages

export default function Services({ content }: any) {
  return (
    <div className="min-h-screen overflow-x-hidden bg-gray-50">
      <Header />
      <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <section className="mb-8 overflow-hidden rounded-3xl bg-gray-900 text-white shadow-xl">
          <div className="grid gap-0 md:grid-cols-[1.1fr_0.9fr] md:items-center">
            <div className="p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-red-300 sm:text-sm">AC & Heating Services</p>
              <h1 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">Reliable comfort work backed by real equipment experience.</h1>
              <p className="mt-4 text-sm leading-7 text-gray-300 sm:text-base">Explore HVAC repairs, installations, maintenance, ductwork, and air-quality services with visuals that show the kind of work customers can expect.</p>
            </div>
            <img src={demoImages.hero} alt="HVAC tools and service equipment" className="h-64 w-full object-cover sm:h-72 md:h-full" />
          </div>
        </section>

        <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {(content.services || []).map((s:any, index:number)=> {
            const image = resolveDemoImage(s.image, fallbackServiceImages[index % fallbackServiceImages.length])
            return (
              <div key={s.slug} className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow">
                <img src={image} alt={s.imageAlt || `${s.title} HVAC service`} className="h-44 w-full object-cover sm:h-48" />
                <div className="p-5">
                  <h3 className="text-xl font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-gray-600">{s.excerpt}</p>
                  <Link href={`/services/${s.slug}`} className="mt-4 inline-block font-semibold text-brand-500">View Service</Link>
                </div>
              </div>
            )
          })}
        </section>
      </main>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const content = getContent()
  return { props: { content } }
}
