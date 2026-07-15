import { GetServerSideProps } from 'next'
import { getContent } from '../lib/store'
import Header from '../components/Header'

export default function About({ content }: any) {
  const about = content.about || {}
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-5xl mx-auto p-6">
        <section className="mt-6 overflow-hidden rounded-3xl bg-white shadow-xl border border-gray-100">
          <img src={about.image || 'https://source.unsplash.com/1400x950/?hvac,team,technician'} alt={about.imageAlt || 'HVAC service team and equipment'} className="h-72 w-full object-cover" />
          <div className="p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-red-500">About Terrell AC & Heating</p>
            <p className="mt-3 text-lg leading-8 text-gray-700">{about.intro || 'Terrell AC and Heating provides dependable AC, heating, installation, and maintenance service with clean workmanship and honest recommendations.'}</p>
            <h2 className="mt-8 text-xl font-semibold text-gray-900">Our Team</h2>
            <ul className="mt-3 grid gap-3 sm:grid-cols-2">
              {(about.team || []).map((m:any,i:number)=>(<li key={i} className="p-4 bg-gray-50 rounded-2xl border border-gray-100"><span className="font-semibold">{m.name}</span><div className="text-sm text-gray-600">{m.role}</div></li>))}
            </ul>

            <h3 className="mt-8 text-lg font-semibold text-gray-900">Values</h3>
            <ul className="mt-3 flex gap-3 flex-wrap">
              {(about.values || ['Honest diagnostics', 'Clean workmanship', 'Fast response', 'Comfort-first service']).map((v:any,i:number)=>(<li key={i} className="px-4 py-2 bg-gray-100 rounded-full text-sm font-semibold text-gray-700">{v}</li>))}
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
