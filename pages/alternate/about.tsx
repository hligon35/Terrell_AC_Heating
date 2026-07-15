import { GetServerSideProps } from 'next'
import { getContent } from '../../lib/store'
import Header from '../../components/Header'
import { demoImages, resolveDemoImage } from '../../lib/demoImages'

export default function AlternateAbout({ content }: any){
  const about = content.about || {}
  const aboutImage = resolveDemoImage(about.image, demoImages.team)

  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-b from-gray-900 to-gray-800 p-4 text-white sm:p-8">
      <Header variant="alternate" />
      <main className="mx-auto mt-6 max-w-4xl overflow-hidden rounded-3xl bg-black/30 shadow-2xl">
        <img src={aboutImage} alt={about.imageAlt || 'HVAC service professional'} className="h-64 w-full object-cover sm:h-80" />
        <div className="p-6">
          <h1 className="mb-4 text-3xl font-bold sm:text-4xl">About Terrell AC & Heating</h1>
          <p className="mb-6 text-base leading-8 text-gray-200 sm:text-lg">{about.intro}</p>
          <h2 className="mb-2 text-2xl font-semibold">Our Team</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {(about.team || []).map((m:any,i:number)=>(<div key={i} className="rounded-2xl bg-white/5 p-4">{m.name}<div className="text-sm text-gray-300">{m.role}</div></div>))}
          </div>
        </div>
      </main>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const content = getContent()
  return { props: { content: content.content || content } }
}
