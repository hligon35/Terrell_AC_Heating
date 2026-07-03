import Link from 'next/link'
import { useState } from 'react'
import BookNowModal from './BookNowModal'

export default function Header({ variant = 'primary' }: { variant?: 'primary' | 'alternate' }){
  const [open, setOpen] = useState(false)
  const [showBook, setShowBook] = useState(false)
  const phone = '(555) 555-5555'
  const brand = variant === 'alternate' ? 'Terrell AC — Premium' : 'Terrell AC & Heating'

  return (
    <header className={`w-full ${variant==='alternate' ? 'bg-transparent text-white' : 'bg-white text-gray-900'} sticky top-0 z-40`}>
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="text-xl font-bold">{brand}</div>
        </div>

        <nav className="hidden md:flex items-center gap-4">
          <Link href="/" className="hover:underline">Home</Link>
          <Link href="/services" className="hover:underline">Services</Link>
          <Link href="/about" className="hover:underline">About</Link>
          <Link href="/specials" className="hover:underline">Specials</Link>
          <Link href="/gallery" className="hover:underline">Gallery</Link>
          <Link href="/contact" className="hover:underline">Contact</Link>
        </nav>

        <div className="flex items-center gap-3">
          <a href={`tel:${phone}`} className={`hidden sm:inline-block font-semibold ${variant==='alternate' ? 'text-white' : 'text-brand-700'}`}>{phone}</a>
          <button onClick={()=>setShowBook(true)} className={`px-3 py-2 rounded ${variant==='alternate' ? 'bg-red-600 text-white' : 'bg-red-500 text-white'}`}>Book Now</button>
          <button className="md:hidden p-2" onClick={()=>setOpen(!open)} aria-label="Open menu">{open? 'Close':'Menu'}</button>
        </div>
      </div>

      {open && (
        <div className={`${variant==='alternate' ? 'bg-gray-900 text-white' : 'bg-white'} md:hidden border-t`}>
          <div className="px-4 py-3 flex flex-col gap-2">
            <Link href="/">Home</Link>
            <Link href="/services">Services</Link>
            <Link href="/about">About</Link>
            <Link href="/specials">Specials</Link>
            <Link href="/gallery">Gallery</Link>
            <Link href="/contact">Contact</Link>
            <a href={`tel:${phone}`} className="font-bold">{phone}</a>
            <button onClick={()=>setShowBook(true)} className="px-3 py-2 bg-red-500 text-white rounded">Book Now</button>
          </div>
        </div>
      )}

      <BookNowModal open={showBook} onClose={()=>setShowBook(false)} />
    </header>
  )
}
