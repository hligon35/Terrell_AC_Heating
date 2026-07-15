import Link from 'next/link'
import { useState } from 'react'
import BookNowModal from './BookNowModal'

export default function Header({ variant = 'primary' }: { variant?: 'primary' | 'alternate' }){
  const [open, setOpen] = useState(false)
  const [showBook, setShowBook] = useState(false)
  const phone = '(555) 555-5555'
  const brand = 'Terrell AC & Heating'
  const headerTheme = variant==='alternate' ? 'bg-gray-950/90 text-white backdrop-blur' : 'bg-white text-gray-900 shadow-sm'
  const mobilePanelTheme = variant==='alternate' ? 'border-white/10 bg-gray-950 text-white' : 'border-gray-100 bg-white text-gray-900'

  const navLinks = [
    ['Home', '/'],
    ['Services', '/services'],
    ['About', '/about'],
    ['Specials', '/specials'],
    ['Gallery', '/gallery'],
    ['Contact', '/contact']
  ]

  return (
    <header className={`sticky top-0 z-40 w-full ${headerTheme}`}>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-3 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="min-w-0 flex-1 text-base font-extrabold leading-tight sm:flex-none sm:text-xl">
          <span className="block truncate">{brand}</span>
          <span className={`hidden text-xs font-semibold sm:block ${variant==='alternate' ? 'text-red-200' : 'text-brand-700'}`}>AC • Heating • Maintenance</span>
        </Link>

        <nav className="hidden items-center gap-4 text-sm font-semibold md:flex lg:text-base">
          {navLinks.map(([label, href]) => (
            <Link key={href} href={href} className="rounded-lg px-1 py-2 hover:underline">{label}</Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <a href={`tel:${phone}`} className={`hidden rounded-full px-3 py-2 text-sm font-bold lg:inline-block ${variant==='alternate' ? 'bg-white/10 text-white' : 'bg-brand-50 text-brand-700'}`}>{phone}</a>
          <button onClick={()=>setShowBook(true)} className={`rounded-xl px-3 py-2 text-sm font-bold shadow-sm sm:px-4 ${variant==='alternate' ? 'bg-red-600 text-white' : 'bg-red-500 text-white'}`}>Book Now</button>
          <button className={`rounded-xl px-3 py-2 text-sm font-bold md:hidden ${variant==='alternate' ? 'bg-white/10 text-white' : 'bg-gray-100 text-gray-900'}`} onClick={()=>setOpen(!open)} aria-label="Open menu" aria-expanded={open}>{open? 'Close':'Menu'}</button>
        </div>
      </div>

      {open && (
        <div className={`${mobilePanelTheme} border-t shadow-2xl md:hidden`}>
          <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-4 text-base font-semibold">
            {navLinks.map(([label, href]) => (
              <Link key={href} href={href} onClick={()=>setOpen(false)} className="rounded-xl px-4 py-3 hover:bg-black/5">{label}</Link>
            ))}
            <div className="mt-2 grid gap-3 sm:grid-cols-2">
              <a href={`tel:${phone}`} className="rounded-xl bg-gray-100 px-4 py-3 text-center font-extrabold text-gray-900">Call {phone}</a>
              <button onClick={()=>{ setShowBook(true); setOpen(false) }} className="rounded-xl bg-red-600 px-4 py-3 font-extrabold text-white">Book Now</button>
            </div>
          </div>
        </div>
      )}

      <BookNowModal open={showBook} onClose={()=>setShowBook(false)} />
    </header>
  )
}
