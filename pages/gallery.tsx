import Header from '../components/Header'
import { GetServerSideProps } from 'next'
import { getContent } from '../lib/store'

export default function Gallery({ content }: any){
  const media = content.media || []
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Header variant="alternate" />
      <main className="max-w-7xl mx-auto p-6">
        <section className="py-12">
          <h1 className="text-4xl font-extrabold">Gallery</h1>
          <p className="text-gray-600 mt-2">Recent work and installations</p>
        </section>

        <section className="mt-6">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {media.length ? media.map((m:any,i:number)=>(
              <div key={i} className="bg-white rounded overflow-hidden">
                <img src={m.url} alt={m.alt || m.name || 'Media'} className="w-full h-48 object-cover" />
                <div className="p-2 text-sm">{m.name || m.alt}</div>
              </div>
            )) : <div className="p-4 bg-white rounded shadow">No media yet.</div>}
          </div>
        </section>
      </main>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const content = getContent()
  return { props: { content } }
}
