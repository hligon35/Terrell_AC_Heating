import Link from 'next/link'
import Header from '../../components/Header'
import { demoImages } from '../../lib/demoImages'

const serviceCards = [
  {
    slug: 'system-installation',
    title: 'System Installation',
    eyebrow: 'New HVAC Systems',
    excerpt: 'New heating and cooling systems installed with comfort, efficiency, and long-term reliability in mind.',
    body: 'Get help choosing and installing the right HVAC system for your home or business, with clear next steps from start to finish.',
    image: demoImages.systemInstallation,
    alt: 'HVAC system installation work'
  },
  {
    slug: 'system-replacement',
    title: 'System Replacement',
    eyebrow: 'Replace Old Equipment',
    excerpt: 'Upgrade aging, inefficient, or unreliable equipment before it leaves you uncomfortable.',
    body: 'If your system keeps breaking down or struggles to keep up, replacement may be the smarter long-term comfort solution.',
    image: demoImages.systemReplacement,
    alt: 'HVAC system replacement equipment'
  },
  {
    slug: 'emergency-repair',
    title: 'Emergency Repair',
    eyebrow: 'Urgent HVAC Help',
    excerpt: 'Fast help when your AC, heat, or airflow problem cannot wait.',
    body: 'For sudden breakdowns, warm air, no heat, leaks, or system failure, request urgent service and get a clear repair path.',
    image: demoImages.emergencyRepair,
    alt: 'Emergency HVAC repair service'
  },
  {
    slug: 'preventative-maintenance',
    title: 'Preventative Maintenance',
    eyebrow: 'Seasonal Tune-Ups',
    excerpt: 'Routine maintenance that helps reduce breakdowns, improve airflow, and extend system life.',
    body: 'A seasonal tune-up helps catch small issues early and keeps your heating and cooling equipment ready for heavy use.',
    image: demoImages.preventativeMaintenance,
    alt: 'Preventative HVAC maintenance service'
  },
  {
    slug: 'duct-cleaning-sealing',
    title: 'Duct Cleaning & Sealing',
    eyebrow: 'Airflow Support',
    excerpt: 'Improve airflow, reduce dust concerns, and help conditioned air reach the rooms that need it.',
    body: 'Leaky or dirty ducts can affect comfort and efficiency. Duct cleaning and sealing helps your system move air better.',
    image: demoImages.ductCleaningSealing,
    alt: 'Duct cleaning and sealing service'
  },
  {
    slug: 'thermostat-services',
    title: 'Thermostat Services',
    eyebrow: 'Controls & Setup',
    excerpt: 'Thermostat troubleshooting, replacement, setup, and smart-control support.',
    body: 'If the thermostat is not responding, reading wrong, or controlling the system poorly, we can help get it working correctly.',
    image: demoImages.thermostatServices,
    alt: 'Thermostat services and setup'
  }
]

export default function Services() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-gray-50">
      <Header />
      <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <section className="mb-8 overflow-hidden rounded-3xl bg-gray-900 text-white shadow-xl">
          <div className="grid gap-0 md:grid-cols-[1.1fr_0.9fr] md:items-center">
            <div className="p-6 sm:p-8 lg:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-red-300 sm:text-sm">AC & Heating Services</p>
              <h1 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">HVAC help for installs, replacements, repairs, maintenance, ducts, and thermostats.</h1>
              <p className="mt-4 text-sm leading-7 text-gray-300 sm:text-base">Choose the service that matches what is happening with your system. Each card below gives customers a clear explanation, a service image, and a direct way to request help.</p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link href="/request" className="inline-flex w-full justify-center rounded-xl bg-red-600 px-5 py-3 font-bold text-white sm:w-auto">Request Service</Link>
                <a href="tel:(555) 555-5555" className="inline-flex w-full justify-center rounded-xl border border-white/20 bg-white/10 px-5 py-3 font-bold text-white sm:w-auto">Call Now</a>
              </div>
            </div>
            <img src={demoImages.systemInstallation} alt="HVAC system installation service" className="h-64 w-full object-cover sm:h-72 md:h-full" />
          </div>
        </section>

        <section className="mb-8 grid gap-4 sm:grid-cols-3">
          {[
            ['Fast Help', 'Tell us what is happening and we will help you choose the right next step.'],
            ['Clear Options', 'Get practical repair, maintenance, or replacement guidance without confusion.'],
            ['Comfort First', 'Service focused on restoring airflow, temperature control, and peace of mind.']
          ].map(([title, copy]) => (
            <div key={title} className="rounded-2xl border border-gray-100 bg-white p-5 text-center shadow-sm">
              <p className="text-lg font-bold text-gray-900">{title}</p>
              <p className="mt-1 text-sm leading-6 text-gray-600">{copy}</p>
            </div>
          ))}
        </section>

        <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {serviceCards.map((service) => (
            <article key={service.slug} className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow">
              <img src={service.image} alt={service.alt} className="h-52 w-full object-cover transition duration-500 hover:scale-105 sm:h-56" />
              <div className="p-5 sm:p-6">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-red-500">{service.eyebrow}</p>
                <h2 className="mt-2 text-xl font-extrabold text-gray-900">{service.title}</h2>
                <p className="mt-2 text-sm leading-6 text-gray-600">{service.excerpt}</p>
                <p className="mt-3 text-sm leading-6 text-gray-500">{service.body}</p>
                <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Link href={`/services/${service.slug}`} className="inline-flex w-full justify-center rounded-xl bg-gray-900 px-4 py-3 font-bold text-white sm:w-auto">View Service</Link>
                  <Link href="/request" className="inline-flex w-full justify-center rounded-xl border border-gray-200 px-4 py-3 font-bold text-gray-900 sm:w-auto">Request Help</Link>
                </div>
              </div>
            </article>
          ))}
        </section>
      </main>
    </div>
  )
}