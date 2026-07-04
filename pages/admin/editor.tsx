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

        <hr className="my-4" />
        <h2 className="text-lg font-semibold mb-2">Specials</h2>
        {(content.specials || []).map((s:any,i:number)=>(
          <div key={i} className="mb-2 p-2 border rounded">
            <input className="w-full p-2 mb-1" value={s.title} onChange={e=>{
              const list = [...(content.specials||[])]; list[i] = {...list[i], title: e.target.value}; setContent({...content, specials: list})
            }} />
            <input className="w-full p-2 mb-1" value={s.description} onChange={e=>{
              const list = [...(content.specials||[])]; list[i] = {...list[i], description: e.target.value}; setContent({...content, specials: list})
            }} />
            <div className="flex gap-2">
              <input className="p-2" value={s.expires||''} onChange={e=>{ const list = [...(content.specials||[])]; list[i] = {...list[i], expires: e.target.value}; setContent({...content, specials: list}) }} />
              <button className="px-2 py-1 bg-red-100" onClick={()=>{ const list = (content.specials||[]).filter((_:any,idx:number)=>idx!==i); setContent({...content, specials: list}) }}>Remove</button>
            </div>
          </div>
        ))}
        <button className="px-3 py-2 bg-gray-100 rounded" onClick={()=> setContent({...content, specials: [...(content.specials||[]), { title:'', description:'', expires:'' }]})}>Add Special</button>

        <hr className="my-4" />
        <h2 className="text-lg font-semibold mb-2">Media Manager</h2>
        <div className="grid gap-2">
          {(content.media || []).map((m:any,i:number)=>(
            <div key={i} className="flex items-center gap-3 p-2 border rounded">
              <img src={m.url} alt={m.alt||m.filename} className="w-20 h-12 object-cover rounded" />
              <div className="flex-1">
                <input className="w-full p-1 mb-1" value={m.alt||''} onChange={e=>{ const list = [...(content.media||[])]; list[i] = {...list[i], alt: e.target.value}; setContent({...content, media: list}) }} />
                <div className="text-xs text-gray-500">{m.filename}</div>
              </div>
              <button className="px-2 py-1 bg-red-100" onClick={()=>{ const list = (content.media||[]).filter((_:any,idx:number)=>idx!==i); setContent({...content, media: list}) }}>Remove</button>
            </div>
          ))}
          <div className="pt-2">
            <input type="file" accept="image/*" onChange={async (e:any)=>{
              const file = e.target.files?.[0]
              if (!file) return
              const reader = new FileReader()
              reader.onload = async () => {
                const data = reader.result as string
                // POST to media upload (admin cookie must be present)
                const filename = `${Date.now()}-${file.name.replace(/\s+/g,'-')}`
                const res = await fetch('/api/media/upload', { method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify({ filename, data, alt: file.name }) })
                if (res.ok){
                  const j = await res.json();
                  setContent({...content, media: [...(content.media||[]), { filename, url: j.url, alt: file.name }]})
                } else alert('Upload failed (auth or server)')
              }
              reader.readAsDataURL(file)
            }} />
          </div>
        </div>

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
