import { GetServerSideProps } from 'next'
import { getContent } from '../../lib/store'
import Header from '../../components/Header'

export default function ServiceDetail({ service }: any) {
  if (!service) return <div className="p-6">Service not found</div>
  return (
    <div>
      <Header />
      <div className="max-w-4xl mx-auto p-6 mt-6">
        <h1 className="text-3xl font-bold">{service.title}</h1>
        <img src="/images/service-ac.svg" alt="service" className="w-full h-56 object-cover rounded mt-4 mb-4" />
        <p className="mt-4 text-gray-700">{service.body || service.excerpt}</p>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const slug = ctx.params?.slug as string
  const content = getContent()
  const service = (content.services || []).find((s:any)=>s.slug===slug) || null
  return { props: { service } }
}
