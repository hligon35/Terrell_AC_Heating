import Header from '../components/Header'
import { GetServerSideProps } from 'next'
import { getContent } from '../lib/store'

export default function Gallery({ content }: any){
  const media = content.media || []
  return (
    <div>
      <Header />
      <div className="max-w-6xl mx-auto p-6 mt-6">
        <h1 className="text-3xl font-bold mb-4">Gallery</h1>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {media.length ? media.map((m:any,i:number)=>(
            <div key={i} className="bg-white rounded overflow-hidden">
              <img src={m.url} alt={m.alt || m.name || 'Media'} className="w-full h-48 object-cover" />
              <div className="p-2 text-sm">{m.name || m.alt}</div>
            </div>
          )) : <div className="p-4 bg-white rounded shadow">No media yet.</div>}
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const content = getContent()
  return { props: { content } }
}
