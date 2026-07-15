import { GetServerSideProps } from 'next'
import { getContent } from '../lib/store'
import Header from '../components/Header'
import Link from 'next/link'
import { demoImages, resolveDemoImage } from '../lib/demoImages'

export default function About({ content }: any) {
  const about = content.about || {}
  const aboutImage = resolveDemoImage(about.image, demoImages.team)

  return (
    <div className="min-h-screen overflow-x-hidden bg-gray-50">
      <Header />

      <main className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
        <section className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-xl">
          <img src={aboutImage} alt={about.imageAlt || 'HVAC service team and equipment'} className="h-64 w-full object-cover sm:h-80" />
          <div className="p-5 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-red-500 sm:text-sm">About Terrell AC & Heating</p>
            <h1 className="mt-2 text-3xl font-extrabold leading-tight text-gray-900 sm:text-4xl">Comfort service built around clear communication and dependable work.</h1>
            <p className="mt-4 text-base leading-8 text-gray-700 sm:text-lg">{about.intro || 'Terrell AC and Heating provides dependable AC, heating, installation, and maintenance service with clean workmanship and honest recommendations.'}</p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {['Honest diagnostics', 'Clean workmanship', 'Fast follow-up'].map((item) => (
                <div key={item} className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                  <p className="font-bold text-gray-900">{item}</p>
                  <p className="mt-1 text-sm leading-6 text-gray-600">Service that helps customers understand the problem and feel confident about the next step.</p>
                </div>
              ))}
            </div>

            <h2 className="mt-8 text-xl font-bold text-gray-900">Who we help</h2>
            <ul className="mt-3 grid gap-3 sm:grid-cols-2">
              {(about.team || []).map((m:any,i:number)=>(<li key={i} className="rounded-2xl border border-gray-100 bg-gray-50 p-4"><span className="font-semibold">{m.name}</span><div className="text-sm leading-6 text-gray-600">{m.role}</div></li>))}
            </ul>

            <h3 className="mt-8 text-lg font-bold text-gray-900">What customers can expect</h3>
            <ul className="mt-3 flex flex-wrap gap-3">
              {(about.values || ['Honest diagnostics', 'Clean workmanship', 'Fast response', 'Comfort-first service']).map((v:any,i:number)=>(<li key={i} className="rounded-full bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700">{v}</li>))}
            </ul>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/request" className="inline-flex justify-center rounded-xl bg-red-600 px-5 py-3 font-bold text-white">Request Service</Link>
              <Link href="/services" className="inline-flex justify-center rounded-xl border border-gray-200 px-5 py-3 font-bold text-gray-900">View Services</Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const content = getContent()
  return { props: { content: content.content || content } }
}
