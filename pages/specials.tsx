import Header from '../components/Header'
import { GetServerSideProps } from 'next'
import { getContent } from '../lib/store'
import { demoImages, resolveDemoImage } from '../lib/demoImages'

const fallbackSpecials = [
  {
    title: 'Seasonal HVAC Tune-Up',
    description: 'Get ahead of the weather with a professional inspection, cleaning, and comfort check.',
    expires: 'Limited-time offer',
    image: demoImages.tuneup,
    imageAlt: 'Technician completing a seasonal maintenance visit'
  },
  {
    title: 'New System Installation Consultation',
    description: 'Explore replacement options for aging AC and heating equipment with a no-pressure consultation.',
    expires: 'Call for availability',
    image: demoImages.installation,
    imageAlt: 'Professional installation and home improvement work'
  }
]

export default function Specials({ content }: any){
  const specials = content.specials?.length ? content.specials : fallbackSpecials
  return (
    <div className="min-h-screen overflow-x-hidden bg-gray-50">
      <Header />
      <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <section className="mb-8 rounded-3xl bg-gray-900 p-6 text-white shadow-xl sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-red-300 sm:text-sm">Specials & Flyers</p>
          <h1 className="mt-2 text-3xl font-extrabold leading-tight sm:text-4xl">HVAC offers with stronger visuals</h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-gray-300 sm:text-base">Use this area for tune-up promotions, installation offers, flyers, and seasonal service campaigns.</p>
        </section>
        <section className="grid gap-6 md:grid-cols-2">
          {specials.map((s:any,i:number)=>{
            const fallback = fallbackSpecials[i % fallbackSpecials.length].image
            const image = resolveDemoImage(s.image, fallback)
            return (
              <div key={`${s.title}-${i}`} className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow">
                <img src={image} alt={s.imageAlt || s.title} className="h-52 w-full object-cover sm:h-56" />
                <div className="p-5 sm:p-6">
                  <h3 className="text-xl font-semibold text-gray-900">{s.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-gray-600">{s.description}</p>
                  <div className="mt-4 inline-flex rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600">Expires: {s.expires || 'N/A'}</div>
                </div>
              </div>
            )
          })}
        </section>
      </main>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const content = getContent()
  return { props: { content } }
}
