import { GetServerSideProps } from 'next'
import { getContent } from '../lib/store'
import Header from '../components/Header'
import { demoImages, resolveDemoImage } from '../lib/demoImages'

export default function About({ content }: any) {
  const about = content.about || {}
  const aboutImage = resolveDemoImage(about.image, demoImages.team)

  return (
    <div className="min-h-screen overflow-x-hidden bg-gray-50">
      <Header />

      <main className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
        <section className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-xl">
          <img src={aboutImage} alt={about.imageAlt || 'HVAC service team and equipment'} className="h-64 w-full object-cover sm:h-72" />
          <div className="p-5 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-red-500 sm:text-sm">About Terrell AC & Heating</p>
            <p className="mt-3 text-base leading-8 text-gray-700 sm:text-lg">{about.intro || 'Terrell AC and Heating provides dependable AC, heating, installation, and maintenance service with clean workmanship and honest recommendations.'}</p>
            <h2 className="mt-8 text-xl font-semibold text-gray-900">Our Team</h2>
            <ul className="mt-3 grid gap-3 sm:grid-cols-2">
              {(about.team || []).map((m:any,i:number)=>(<li key={i} className="rounded-2xl border border-gray-100 bg-gray-50 p-4"><span className="font-semibold">{m.name}</span><div className="text-sm text-gray-600">{m.role}</div></li>))}
            </ul>

            <h3 className="mt-8 text-lg font-semibold text-gray-900">Values</h3>
            <ul className="mt-3 flex flex-wrap gap-3">
              {(about.values || ['Honest diagnostics', 'Clean workmanship', 'Fast response', 'Comfort-first service']).map((v:any,i:number)=>(<li key={i} className="rounded-full bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700">{v}</li>))}
            </ul>
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
