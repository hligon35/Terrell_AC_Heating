import Link from 'next/link'

export default function Footer() {
  const phone = '(555) 555-5555'
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-gray-200 bg-gray-950 text-white">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1.4fr_0.8fr_0.8fr] lg:px-8">
        <div>
          <p className="text-xl font-extrabold">Terrell AC & Heating</p>
          <p className="mt-3 max-w-md text-sm leading-7 text-gray-300">
            Heating, cooling, replacement, maintenance, duct, and thermostat service with clear communication and comfort-first support.
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a href={`tel:${phone}`} className="inline-flex justify-center rounded-xl bg-red-600 px-5 py-3 text-sm font-extrabold text-white">Call {phone}</a>
            <Link href="/request" className="inline-flex justify-center rounded-xl border border-white/15 px-5 py-3 text-sm font-extrabold text-white">Request Service</Link>
          </div>
        </div>

        <div>
          <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-red-300">Services</p>
          <div className="mt-4 grid gap-2 text-sm text-gray-300">
            <Link href="/services/system-installation" className="hover:text-white">System Installation</Link>
            <Link href="/services/system-replacement" className="hover:text-white">System Replacement</Link>
            <Link href="/services/emergency-repair" className="hover:text-white">Emergency Repair</Link>
            <Link href="/services/preventative-maintenance" className="hover:text-white">Preventative Maintenance</Link>
            <Link href="/services/duct-cleaning-sealing" className="hover:text-white">Duct Cleaning & Sealing</Link>
            <Link href="/services/thermostat-services" className="hover:text-white">Thermostat Services</Link>
          </div>
        </div>

        <div>
          <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-red-300">Company</p>
          <div className="mt-4 grid gap-2 text-sm text-gray-300">
            <Link href="/" className="hover:text-white">Home</Link>
            <Link href="/services" className="hover:text-white">Services</Link>
            <Link href="/about" className="hover:text-white">About</Link>
            <Link href="/specials" className="hover:text-white">Specials</Link>
            <Link href="/contact" className="hover:text-white">Contact</Link>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-5 text-center text-xs text-gray-400 sm:px-6">
        © {year} Terrell AC & Heating. All rights reserved.
      </div>
    </footer>
  )
}
