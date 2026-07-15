import Header from '../components/Header'
import { GetServerSideProps } from 'next'
import { getContent } from '../lib/store'
import { demoImages, resolveDemoImage } from '../lib/demoImages'

const fallbackMedia = [
  { name: 'AC service procedure', url: demoImages.acRepair, alt: 'Technician servicing electrical and AC-related components' },
  { name: 'Heating repair visit', url: demoImages.heatingRepair, alt: 'Heating and home repair service procedure' },
  { name: 'System installation work', url: demoImages.installation, alt: 'Professional installation work on a job site' },
  { name: 'Preventive maintenance', url: demoImages.maintenance, alt: 'Technician performing preventive maintenance work' },
  { name: 'Indoor comfort improvements', url: demoImages.indoorAir, alt: 'Modern home interior representing indoor comfort' },
  { name: 'Airflow and service diagnostics', url: demoImages.ductwork, alt: 'Technician service work for home comfort systems' }
]

export default function Gallery({ content }: any){
  const media = content.media?.length ? content.media : fallbackMedia
  return (
    <div className="min-h-screen overflow-x-hidden bg-gray-50">
      <Header />
      <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <section className="mb-8 rounded-3xl border border-gray-100 bg-white p-6 shadow sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-red-500 sm:text-sm">Photo Gallery</p>
          <h1 className="mt-2 text-3xl font-extrabold leading-tight text-gray-900 sm:text-4xl">AC, heat, maintenance, and installation visuals</h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-gray-600 sm:text-base">These real-life demo photos help Terrell AC and Heating feel complete while the admin can still replace them later with real job-site photos and flyers.</p>
        </section>
        <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {media.map((m:any,i:number)=>{
            const fallback = fallbackMedia[i % fallbackMedia.length].url
            const image = resolveDemoImage(m.url, fallback)
            return (
              <div key={`${m.url}-${i}`} className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow">
                <img src={image} alt={m.alt || m.name || 'HVAC media'} className="h-52 w-full object-cover transition duration-500 hover:scale-105 sm:h-56" />
                <div className="p-4">
                  <div className="font-semibold text-gray-900">{m.name || m.alt}</div>
                  {m.alt && <p className="mt-1 text-sm leading-6 text-gray-500">{m.alt}</p>}
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
