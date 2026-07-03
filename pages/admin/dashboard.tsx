import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { readDB } from '../../lib/store'

export default function Dashboard({ db }: any){
  const leads = db.leads || []
  const subs = db.subscribers || []
  const media = db.media || []
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-6">
        <header className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <div className="flex items-center gap-3">
            <Link href="/admin/editor" className="px-3 py-2 bg-white rounded shadow">Site Editor</Link>
            <a href="/api/auth/logout" className="px-3 py-2 bg-red-500 text-white rounded">Logout</a>
          </div>
        </header>

        <div className="grid md:grid-cols-3 gap-6 mt-6">
          <div className="p-4 bg-white rounded shadow">
            <div className="text-sm">Leads</div>
            <div className="text-2xl font-bold">{leads.length}</div>
          </div>
          <div className="p-4 bg-white rounded shadow">
            <div className="text-sm">Subscribers</div>
            <div className="text-2xl font-bold">{subs.length}</div>
          </div>
          <div className="p-4 bg-white rounded shadow">
            <div className="text-sm">Media</div>
            <div className="text-2xl font-bold">{media.length}</div>
          </div>
        </div>

      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  if (!req.cookies['admin_token']) return { redirect: { destination: '/admin/login', permanent: false } }
  const db = readDB()
  return { props: { db } }
}
