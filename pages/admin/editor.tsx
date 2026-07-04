import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function Editor(){
  const [content, setContent] = useState<any>(null)
  const [status, setStatus] = useState('')
  const router = useRouter()

  useEffect(()=>{ fetch('/api/content').then(r=>r.json()).then(d=> setContent(d.content || {})) }, [])

  async function save(publish=false){
    setStatus('Saving...')
    const res = await fetch('/api/content', { method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify({ ...content, publish }) })
    if (res.ok) setStatus(publish? 'Published' : 'Saved draft')
    else setStatus('Error saving')
  }

  if (!content) return <div className="p-6">Loading editor…</div>

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-xl font-bold mb-4">Site Editor</h1>
        <label className="block text-sm font-medium">Hero Headline</label>
        <input aria-label="Hero headline" placeholder="Hero headline" className="w-full p-2 border mb-3" value={content.home?.hero?.headline || ''} onChange={e=> setContent({...content, home:{ ...(content.home||{}), hero:{ ...(content.home?.hero||{}), headline: e.target.value } } })} />
        <label className="block text-sm font-medium">Hero Subheadline</label>
        <input aria-label="Hero subheadline" placeholder="Hero subheadline" className="w-full p-2 border mb-3" value={content.home?.hero?.subheadline || ''} onChange={e=> setContent({...content, home:{ ...(content.home||{}), hero:{ ...(content.home?.hero||{}), subheadline: e.target.value } } })} />

        <div className="flex gap-3 mt-4">
          <button onClick={()=>save(false)} className="px-4 py-2 bg-gray-200 rounded">Save Draft</button>
          <button onClick={()=>save(true)} className="px-4 py-2 bg-brand-500 text-white rounded">Publish</button>
          <button onClick={()=>router.push('/admin/dashboard')} className="px-4 py-2 border rounded">Back</button>
        </div>
        <div className="mt-3 text-sm text-gray-600">{status}</div>
      </div>
    </div>
  )
}
