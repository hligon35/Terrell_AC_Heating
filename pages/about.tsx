import { GetServerSideProps } from 'next'
import { getContent } from '../lib/store'

export default function About({ content }: any) {
  const about = content.about || {}
  const site = content.site || {}
  return (
    <div className="max-w-5xl mx-auto p-6">
      <header className="flex justify-between items-center py-6">
        <h1 className="text-3xl font-bold">About {site.name || 'Terrell AC and Heating'}</h1>
      </header>

      <section className="bg-white p-6 rounded shadow">
        <p className="text-lg mb-4">{about.intro}</p>
        <h2 className="text-xl font-semibold">Our Team</h2>
        <ul className="mt-3 space-y-2">
          {(about.team || []).map((m:any,i:number)=>(<li key={i} className="p-3 bg-gray-50 rounded">{m.name} — {m.role}</li>))}
        </ul>

        <h3 className="mt-6 text-lg font-semibold">Values</h3>
        <ul className="mt-2 flex gap-3 flex-wrap">
          {(about.values || []).map((v:any,i:number)=>(<li key={i} className="px-3 py-1 bg-gray-100 rounded">{v}</li>))}
        </ul>
      </section>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const content = getContent()
  return { props: { content: content.content || content } }
}
