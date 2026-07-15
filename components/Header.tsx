import Link from 'next/link'
import { useState } from 'react'
import BookNowModal from './BookNowModal'

export default function Header({ variant = 'primary' }: { variant?: 'primary' | 'alternate' }){
  const [open, setOpen] = useState(false)
  const [showBook, setShowBook] = useState(false)
  const phone = '(555) 555-5555'
  const brand = variant === 'alternate' ? 'Terrell AC — Premium' : 'Terrell AC & Heating'

  return (
    <header className={`sticky top-0 z-40 w-full ${variant==='alternate' ? 'bg-gray-950/80 text-white backdrop-blur' : 'bg-white text-gray-900 shadow-sm'}`}>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link href="/" className="min-w-0 flex-1 text-lg font-bold leading-tight sm:flex-none sm:text-xl">
          <span className="block truncate">{brand}</span>
        </Link>

        <nav className="hidden items-center gap-4 text-sm font-medium md:flex lg:text-base">
          <Link href="/" className="hover:underline">Home</Link>
          <Link href="/services" className="hover:underline">Services</Link>
          <Link href="/about" className="hover:underline">About</Link>
          <Link href="/specials" className="hover:underline">Specials</Link>
          <Link href="/gallery" className="hover:underline">Gallery</Link>
          <Link href="/contact" className="hover:underline">Contact</Link>
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <a href={`tel:${phone}`} className={`hidden font-semibold lg:inline-block ${variant==='alternate' ? 'text-white' : 'text-brand-700'}`}>{phone}</a>
          <button onClick={()=>setShowBook(true)} className={`rounded px-3 py-2 text-sm font-semibold sm:text-base ${variant==='alternate' ? 'bg-red-600 text-white' : 'bg-red-500 text-white'}`}>Book Now</button>
          <button className={`rounded px-3 py-2 text-sm font-semibold md:hidden ${variant==='alternate' ? 'bg-white/10 text-white' : 'bg-gray-100 text-gray-900'}`} onClick={()=>setOpen(!open)} aria-label="Open menu">{open? 'Close':'Menu'}</button>
        </div>
      </div>

      {open && (
        <div className={`${variant==='alternate' ? 'border-white/10 bg-gray-950 text-white' : 'border-gray-100 bg-white'} border-t md:hidden`}>
          <div className="flex flex-col gap-3 px-4 py-4 text-base">
            <Link href="/" onClick={()=>setOpen(false)}>Home</Link>
            <Link href="/services" onClick={()=>setOpen(false)}>Services</Link>
            <Link href="/about" onClick={()=>setOpen(false)}>About</Link>
            <Link href="/specials" onClick={()=>setOpen(false)}>Specials</Link>
            <Link href="/gallery" onClick={()=>setOpen(false)}>Gallery</Link>
            <Link href="/contact" onClick={()=>setOpen(false)}>Contact</Link>
            <a href={`tel:${phone}`} className="rounded-xl bg-gray-100 px-4 py-3 text-center font-bold text-gray-900">{phone}</a>
            <button onClick={()=>{ setShowBook(true); setOpen(false) }} className="rounded-xl bg-red-500 px-4 py-3 font-bold text-white">Book Now</button>
          </div>
        </div>
      )}

      <BookNowModal open={showBook} onClose={()=>setShowBook(false)} />
    </header>
  )
}
