import Header from '../components/Header'
import { GetServerSideProps } from 'next'
import { getContent } from '../lib/store'

const fallbackMedia = [
  { name: 'Outdoor AC condenser service', url: '/images/hvac-ac-repair.svg', alt: 'Technician servicing an outdoor AC condenser' },
  { name: 'Heating system repair', url: '/images/hvac-heating-repair.svg', alt: 'Heating repair procedure on furnace equipment' },
  { name: 'New HVAC installation', url: '/images/hvac-installation.svg', alt: 'HVAC equipment installation work' },
  { name: 'Preventive maintenance', url: '/images/hvac-maintenance.svg', alt: 'Technician performing preventive HVAC maintenance' },
  { name: 'Indoor air quality upgrades', url: '/images/hvac-indoor-air.svg', alt: 'Indoor air quality and filtration equipment' },
  { name: 'Ductwork and ventilation', url: '/images/hvac-ductwork.svg', alt: 'Ductwork and ventilation improvements' }
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
          <p className="mt-3 max-w-3xl text-sm leading-7 text-gray-600 sm:text-base">These visuals help Terrell AC and Heating feel complete while the admin can still replace them later with real job-site photos and flyers.</p>
        </section>
        <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {media.map((m:any,i:number)=>(
            <div key={`${m.url}-${i}`} className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow">
              <img src={m.url} alt={m.alt || m.name || 'HVAC media'} className="h-52 w-full object-cover transition duration-500 hover:scale-105 sm:h-56" />
              <div className="p-4">
                <div className="font-semibold text-gray-900">{m.name || m.alt}</div>
                {m.alt && <p className="mt-1 text-sm leading-6 text-gray-500">{m.alt}</p>}
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const content = getContent()
  return { props: { content } }
}
