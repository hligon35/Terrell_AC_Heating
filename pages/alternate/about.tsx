import { GetServerSideProps } from 'next'
import { getContent } from '../../lib/store'
import Header from '../../components/Header'

export default function AlternateAbout({ content }: any){
  const about = content.about || {}
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-8">
      <Header variant="alternate" />
      <div className="max-w-4xl mx-auto bg-black bg-opacity-30 p-6 rounded-lg mt-6">
        <h1 className="text-4xl font-bold mb-4">About Terrell AC & Heating</h1>
        <p className="text-lg mb-6">{about.intro}</p>
        <h2 className="text-2xl font-semibold mb-2">Our Team</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {(about.team || []).map((m:any,i:number)=>(<div key={i} className="p-4 bg-white/5 rounded">{m.name}<div className="text-sm text-gray-300">{m.role}</div></div>))}
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const content = getContent()
  return { props: { content: content.content || content } }
}
