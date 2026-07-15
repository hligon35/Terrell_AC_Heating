import Header from '../components/Header'
import { GetServerSideProps } from 'next'
import { getContent } from '../lib/store'

const fallbackSpecials = [
  {
    title: 'Seasonal HVAC Tune-Up',
    description: 'Get ahead of the weather with a professional inspection, cleaning, and comfort check.',
    expires: 'Limited-time offer',
    image: 'https://source.unsplash.com/1400x950/?hvac,inspection,technician',
    imageAlt: 'Technician completing a seasonal HVAC tune-up'
  },
  {
    title: 'New System Installation Consultation',
    description: 'Explore replacement options for aging AC and heating equipment with a no-pressure consultation.',
    expires: 'Call for availability',
    image: 'https://source.unsplash.com/1400x950/?commercial,hvac,rooftop',
    imageAlt: 'HVAC equipment prepared for installation'
  }
]

export default function Specials({ content }: any){
  const specials = content.specials?.length ? content.specials : fallbackSpecials
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-6xl mx-auto p-6 mt-6">
        <div className="mb-8 rounded-3xl bg-gray-900 p-8 text-white shadow-xl">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-red-300">Specials & Flyers</p>
          <h1 className="mt-2 text-4xl font-extrabold">HVAC offers with stronger visuals</h1>
          <p className="mt-3 max-w-3xl text-gray-300">Use this area for tune-up promotions, installation offers, flyers, and seasonal service campaigns.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {specials.map((s:any,i:number)=>(
            <div key={`${s.title}-${i}`} className="overflow-hidden bg-white rounded-2xl shadow border border-gray-100">
              <img src={s.image || fallbackSpecials[i % fallbackSpecials.length].image} alt={s.imageAlt || s.title} className="h-56 w-full object-cover" />
              <div className="p-6">
                <h3 className="font-semibold text-xl text-gray-900">{s.title}</h3>
                <p className="mt-2 text-sm leading-6 text-gray-600">{s.description}</p>
                <div className="mt-4 inline-flex rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600">Expires: {s.expires || 'N/A'}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const content = getContent()
  return { props: { content } }
}
