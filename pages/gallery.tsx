import Header from '../components/Header'
import { GetServerSideProps } from 'next'
import { getContent } from '../lib/store'

const fallbackMedia = [
  { name: 'Outdoor AC condenser service', url: 'https://source.unsplash.com/1400x950/?air-conditioner,repair,technician', alt: 'Technician servicing an outdoor AC condenser' },
  { name: 'Heating system repair', url: 'https://source.unsplash.com/1400x950/?furnace,heating,technician', alt: 'Heating repair procedure on furnace equipment' },
  { name: 'New HVAC installation', url: 'https://source.unsplash.com/1400x950/?hvac,installation,ductwork', alt: 'HVAC equipment installation work' },
  { name: 'Preventive maintenance', url: 'https://source.unsplash.com/1400x950/?hvac,maintenance,tools', alt: 'Technician performing preventive HVAC maintenance' },
  { name: 'Indoor air quality upgrades', url: 'https://source.unsplash.com/1400x950/?air-filter,ventilation,home', alt: 'Indoor air quality and filtration equipment' },
  { name: 'Ductwork and ventilation', url: 'https://source.unsplash.com/1400x950/?ductwork,ventilation,construction', alt: 'Ductwork and ventilation improvements' }
]

export default function Gallery({ content }: any){
  const media = content.media?.length ? content.media : fallbackMedia
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-6xl mx-auto p-6 mt-6">
        <div className="mb-8 rounded-3xl bg-white p-8 shadow border border-gray-100">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-red-500">Photo Gallery</p>
          <h1 className="mt-2 text-4xl font-extrabold text-gray-900">AC, heat, maintenance, and installation visuals</h1>
          <p className="mt-3 max-w-3xl text-gray-600">These images help Terrell AC and Heating feel complete while the admin can still replace them later with real job-site photos and flyers.</p>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
          {media.map((m:any,i:number)=>(
            <div key={`${m.url}-${i}`} className="overflow-hidden bg-white rounded-2xl shadow border border-gray-100">
              <img src={m.url} alt={m.alt || m.name || 'HVAC media'} className="w-full h-56 object-cover transition duration-500 hover:scale-105" />
              <div className="p-4">
                <div className="font-semibold text-gray-900">{m.name || m.alt}</div>
                {m.alt && <p className="mt-1 text-sm text-gray-500">{m.alt}</p>}
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
