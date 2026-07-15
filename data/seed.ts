import fs from 'fs'
import path from 'path'
import { demoImages } from '../lib/demoImages'

const hvacImages = {
  hero: demoImages.hero,
  systemInstallation: demoImages.systemInstallation,
  systemReplacement: demoImages.systemReplacement,
  emergencyRepair: demoImages.emergencyRepair,
  preventativeMaintenance: demoImages.preventativeMaintenance,
  ductCleaningSealing: demoImages.ductCleaningSealing,
  thermostatServices: demoImages.thermostatServices,
  commercial: demoImages.commercial,
  tuneup: demoImages.tuneup,
  team: demoImages.team
}

const seed = () => {
  const initial = {
    content: {
      site: {
        name: 'Terrell AC and Heating',
        phone: '(555) 555-5555',
        email: 'info@terrellac.com',
        address: '123 Main St, Anytown'
      },
      home: {
        hero: {
          headline: 'Fast, Reliable HVAC Service',
          subheadline: 'Need a new system, urgent repair, seasonal maintenance, duct help, or thermostat service? Get clear answers and dependable HVAC support.',
          cta: 'Request Service',
          image: hvacImages.hero,
          imageAlt: 'Terrell AC and Heating service vehicle ready for HVAC calls'
        },
        heroAlt: {
          headline: 'Comfort You Can Count On',
          subheadline: 'Heating, cooling, replacement, maintenance, and air-flow solutions for homes and businesses.',
          cta: 'Schedule Service',
          image: demoImages.heroAlt,
          imageAlt: 'Outdoor condenser units lined up against a bright sky'
        }
      },
      services: [
        {
          slug: 'system-installation',
          title: 'System Installation',
          excerpt: 'New HVAC systems installed with comfort, efficiency, and long-term reliability in mind.',
          body: 'When it is time for a new heating or cooling system, Terrell AC and Heating helps you understand your options, choose the right fit for your space, and prepare for a clean professional installation.',
          image: hvacImages.systemInstallation,
          imageAlt: 'New HVAC system installation work'
        },
        {
          slug: 'system-replacement',
          title: 'System Replacement',
          excerpt: 'Replace aging, inefficient, or unreliable equipment before it leaves you uncomfortable.',
          body: 'If your current system keeps breaking down, struggles to heat or cool evenly, or costs too much to run, we can evaluate replacement options and help you plan the next step with confidence.',
          image: hvacImages.systemReplacement,
          imageAlt: 'HVAC system replacement equipment and service work'
        },
        {
          slug: 'emergency-repair',
          title: 'Emergency Repair',
          excerpt: 'Urgent HVAC help when your AC, heat, or airflow problem cannot wait.',
          body: 'Breakdowns do not always happen at convenient times. For urgent comfort issues, Terrell AC and Heating can inspect the system, identify the problem, and work toward restoring service as quickly as possible.',
          image: hvacImages.emergencyRepair,
          imageAlt: 'Emergency HVAC repair service visit'
        },
        {
          slug: 'preventative-maintenance',
          title: 'Preventative Maintenance',
          excerpt: 'Seasonal tune-ups that help reduce breakdowns, improve airflow, and extend system life.',
          body: 'Preventative maintenance helps catch small problems before they become expensive repairs. Schedule a tune-up before peak heating or cooling season to keep your system ready.',
          image: hvacImages.preventativeMaintenance,
          imageAlt: 'Preventative HVAC maintenance and tune-up service'
        },
        {
          slug: 'duct-cleaning-sealing',
          title: 'Duct Cleaning & Sealing',
          excerpt: 'Improve airflow, reduce dust concerns, and help conditioned air reach the rooms that need it.',
          body: 'Leaky or dirty ductwork can affect comfort, efficiency, and indoor air quality. We help customers address airflow concerns with duct cleaning, sealing, and practical comfort recommendations.',
          image: hvacImages.ductCleaningSealing,
          imageAlt: 'Duct cleaning and sealing HVAC service'
        },
        {
          slug: 'thermostat-services',
          title: 'Thermostat Services',
          excerpt: 'Thermostat troubleshooting, replacement, setup, and smart-control support.',
          body: 'A thermostat issue can make the whole system feel unreliable. We can help diagnose thermostat problems, replace outdated controls, and make sure your system responds the way it should.',
          image: hvacImages.thermostatServices,
          imageAlt: 'Thermostat service and smart control setup'
        }
      ],
      specials: [
        {
          title: 'Seasonal HVAC Tune-Up',
          description: 'Get ahead of the weather with a professional inspection, cleaning, and comfort check.',
          expires: 'Limited-time offer',
          image: hvacImages.tuneup,
          imageAlt: 'HVAC tune-up service image'
        },
        {
          title: 'Commercial System Consultation',
          description: 'Explore service, maintenance, and replacement options for larger HVAC systems.',
          expires: 'Call for availability',
          image: hvacImages.commercial,
          imageAlt: 'Commercial rooftop HVAC system with multiple units'
        }
      ],
      media: [
        { name: 'System installation', url: demoImages.systemInstallation, alt: 'New HVAC system installation work' },
        { name: 'System replacement', url: demoImages.systemReplacement, alt: 'HVAC system replacement service' },
        { name: 'Emergency repair', url: demoImages.emergencyRepair, alt: 'Emergency HVAC repair service' },
        { name: 'Preventative maintenance', url: demoImages.preventativeMaintenance, alt: 'Preventative maintenance and tune-up work' },
        { name: 'Duct cleaning and sealing', url: demoImages.ductCleaningSealing, alt: 'Duct cleaning and sealing service' },
        { name: 'Thermostat services', url: demoImages.thermostatServices, alt: 'Thermostat service and setup' }
      ],
      about: {
        intro: 'Terrell AC and Heating helps families and businesses stay comfortable with responsive service, clear communication, and clean HVAC workmanship.',
        image: hvacImages.team,
        imageAlt: 'HVAC service professional prepared for the day',
        team: [
          { name: 'William Terrell', role: 'Owner / Lead Technician' },
          { name: 'Service Team', role: 'Repair, installation, maintenance, and replacement support' }
        ],
        values: ['Honest diagnostics', 'Clean workmanship', 'Fast response', 'Comfort-first service']
      },
      testimonials: [
        { author: 'Jane D.', quote: 'Quick service and fair price — highly recommend.' },
        { author: 'Mark R.', quote: 'Technician was professional and fixed our unit same-day.' }
      ]
    },
    leads: [],
    subscribers: [],
    media: []
  }
  const dir = path.join(process.cwd(), 'data')
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(path.join(dir, 'db.json'), JSON.stringify(initial, null, 2), 'utf8')
  console.log('Seed complete')
}

seed()
