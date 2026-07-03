import Header from '../components/Header'
import { GetServerSideProps } from 'next'
import { getContent } from '../lib/store'

export default function Specials({ content }: any){
  const specials = content.specials || []
  return (
    <div>
      <Header />
      <div className="max-w-6xl mx-auto p-6 mt-6">
        <h1 className="text-3xl font-bold mb-4">Specials & Offers</h1>
        <div className="grid md:grid-cols-2 gap-4">
          {specials.length ? specials.map((s:any,i:number)=>(
            <div key={i} className="p-4 bg-white rounded shadow">
              <h3 className="font-semibold">{s.title}</h3>
              <p className="text-sm text-gray-600">{s.description}</p>
              <div className="text-xs text-gray-400 mt-2">Expires: {s.expires || 'N/A'}</div>
            </div>
          )) : <div className="p-4 bg-white rounded shadow">No current specials.</div>}
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const content = getContent()
  return { props: { content } }
}
