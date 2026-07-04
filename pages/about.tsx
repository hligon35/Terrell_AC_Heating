import { GetServerSideProps } from 'next'
import { getContent } from '../lib/store'
import Header from '../components/Header'

export default function About({ content }: any) {
  const about = content.about || {}
  const hero = { title: about.title || 'About Us', subtitle: about.intro || 'Local HVAC specialists' }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Header variant="alternate" />
      <main className="max-w-7xl mx-auto p-6">
        <section className="py-12">
          <h1 className="text-4xl font-extrabold">{hero.title}</h1>
          <p className="text-lg text-gray-600 mt-2">{hero.subtitle}</p>
        </section>

        <section className="bg-white p-6 rounded shadow mt-6">
          <h2 className="text-xl font-semibold">Our Team</h2>
          <ul className="mt-3 space-y-2">
            {(about.team || []).map((m:any,i:number)=>(<li key={i} className="p-3 bg-gray-50 rounded">{m.name} — {m.role}</li>))}
          </ul>

          <h3 className="mt-6 text-lg font-semibold">Values</h3>
          <ul className="mt-2 flex gap-3 flex-wrap">
            {(about.values || []).map((v:any,i:number)=>(<li key={i} className="px-3 py-1 bg-gray-100 rounded">{v}</li>))}
          </ul>
        </section>
      </main>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const content = getContent()
  return { props: { content } }
}
