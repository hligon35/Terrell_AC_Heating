import Header from '../components/Header'
import { GetServerSideProps } from 'next'
import { getContent } from '../lib/store'

export default function Specials({ content }: any){
  const specials = content.specials || []
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Header variant="alternate" />
      <main className="max-w-7xl mx-auto p-6">
        <section className="py-12">
          <h1 className="text-4xl font-extrabold">Specials & Offers</h1>
          <p className="text-gray-600 mt-2">Limited-time financing offers and service discounts.</p>
        </section>

        <section className="mt-6 grid md:grid-cols-2 gap-4">
          {specials.length ? specials.map((s:any,i:number)=>(
            <div key={i} className="p-6 bg-white rounded shadow">
              <h3 className="font-semibold text-lg">{s.title}</h3>
              <p className="text-sm text-gray-600 mt-2">{s.description}</p>
              <div className="text-xs text-gray-400 mt-3">Expires: {s.expires || 'N/A'}</div>
            </div>
          )) : <div className="p-4 bg-white rounded shadow">No current specials.</div>}
        </section>
      </main>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const content = getContent()
  return { props: { content } }
}
