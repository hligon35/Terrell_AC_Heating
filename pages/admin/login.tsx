import { useState } from 'react'
import { useRouter } from 'next/router'

export default function AdminLogin(){
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const [err, setErr] = useState('')
  const router = useRouter()

  async function submit(e:any){
    e.preventDefault()
    const res = await fetch('/api/auth/login', { method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify({ user, pass }) })
    if (res.ok) router.push('/admin/dashboard')
    else setErr('Invalid credentials')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={submit} className="bg-white p-8 rounded shadow w-full max-w-md">
        <h1 className="text-xl font-bold mb-4">Admin Login</h1>
        <input value={user} onChange={e=>setUser(e.target.value)} placeholder="username" className="w-full p-2 border mb-2" />
        <input value={pass} onChange={e=>setPass(e.target.value)} placeholder="password" type="password" className="w-full p-2 border mb-2" />
        <button className="w-full py-2 bg-brand-500 text-white rounded">Sign in</button>
        {err && <div className="mt-2 text-red-600">{err}</div>}
      </form>
    </div>
  )
}
