import fs from 'fs'
import path from 'path'
import { demoImages } from '../lib/demoImages'

const hvacImages = {
  hero: demoImages.hero,
  acRepair: demoImages.acRepair,
  heatingRepair: demoImages.heatingRepair,
  installation: demoImages.installation,
  maintenance: demoImages.maintenance,
  indoorAir: demoImages.indoorAir,
  ductwork: demoImages.ductwork,
  thermostat: demoImages.techTablet,
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
          subheadline: 'Comfort restored. Experts on call 24/7.',
          cta: 'Request Service',
          image: hvacImages.hero,
          imageAlt: 'HVAC technician servicing a wall-mounted air conditioning unit'
        },
        heroAlt: {
          headline: 'Premium HVAC Care for Your Home',
          subheadline: 'Cinematic comfort, expert technicians.',
          cta: 'Schedule Premium Service',
          image: demoImages.heroAlt,
          imageAlt: 'Outdoor condenser units lined up against a bright sky'
        }
      },
      services: [
        {
          slug: 'ac-repair',
          title: 'AC Repair',
          excerpt: 'Fast AC repairs to get your home cool again.',
          body: 'When the air stops blowing cold, Terrell AC and Heating can inspect the system, diagnose the issue, and restore comfort with clean, professional repair work.',
          image: hvacImages.acRepair,
          imageAlt: 'AC gauges connected to an open air conditioning unit during repair'
        },
        {
          slug: 'heating-repair',
          title: 'Heating Repair',
          excerpt: 'Heating specialists to restore warmth quickly.',
          body: 'From furnace issues to uneven heating, our team checks the source of the problem and gets your heat working safely and reliably.',
          image: hvacImages.heatingRepair,
          imageAlt: 'Residential outdoor condenser beside a home exterior'
        },
        {
          slug: 'installation',
          title: 'HVAC Installation',
          excerpt: 'High-efficiency systems installed by pros.',
          body: 'Upgrade your comfort with correctly sized, professionally installed HVAC equipment built for long-term performance.',
          image: hvacImages.installation,
          imageAlt: 'Technician running diagnostics on rooftop HVAC equipment'
        },
        {
          slug: 'maintenance',
          title: 'HVAC Maintenance',
          excerpt: 'Seasonal tune-ups that help prevent surprise breakdowns.',
          body: 'Routine maintenance helps extend equipment life, improve airflow, and catch small issues before they become expensive repairs.',
          image: hvacImages.maintenance,
          imageAlt: 'Technician servicing an indoor ceiling cassette HVAC unit'
        },
        {
          slug: 'indoor-air-quality',
          title: 'Indoor Air Quality',
          excerpt: 'Cleaner air solutions for a healthier home.',
          body: 'Improve indoor comfort with filter, ventilation, humidity, and air-quality solutions designed around your home.',
          image: hvacImages.indoorAir,
          imageAlt: 'Clean modern home interior representing indoor air comfort'
        },
        {
          slug: 'ductwork',
          title: 'Ductwork',
          excerpt: 'Duct repairs and airflow improvements for better comfort.',
          body: 'Leaky or poorly designed ductwork can waste energy. We inspect, repair, and improve duct systems for stronger airflow.',
          image: hvacImages.ductwork,
          imageAlt: 'Commercial HVAC technician inspecting equipment with a tablet'
        }
      ],
      specials: [
        {
          title: 'Seasonal HVAC Tune-Up',
          description: 'Get ahead of the weather with a professional inspection, cleaning, and comfort check.',
          expires: 'Limited-time offer',
          image: hvacImages.tuneup,
          imageAlt: 'Technician completing seasonal maintenance work'
        },
        {
          title: 'Commercial System Consultation',
          description: 'Explore replacement, service, and maintenance options for larger HVAC systems.',
          expires: 'Call for availability',
          image: hvacImages.commercial,
          imageAlt: 'Commercial rooftop HVAC system with multiple units'
        }
      ],
      media: [
        { name: 'Commercial rooftop HVAC system', url: demoImages.commercial, alt: 'Multiple commercial HVAC units on a rooftop' },
        { name: 'Outdoor condenser lineup', url: demoImages.heroAlt, alt: 'Outdoor condenser units lined up under a bright sky' },
        { name: 'Wall unit service visit', url: demoImages.hero, alt: 'Technician servicing a wall-mounted AC unit' },
        { name: 'AC gauge diagnostics', url: demoImages.acRepair, alt: 'Gauge set connected to an air conditioning unit' },
        { name: 'Indoor cassette maintenance', url: demoImages.maintenance, alt: 'Technician servicing an indoor ceiling cassette unit' },
        { name: 'Rooftop system diagnostics', url: demoImages.installation, alt: 'Technician inspecting rooftop HVAC equipment' }
      ],
      about: {
        intro: 'Terrell AC and Heating helps families and businesses stay comfortable with responsive service, honest recommendations, and clean HVAC workmanship.',
        image: hvacImages.team,
        imageAlt: 'HVAC service professional prepared for the day',
        team: [
          { name: 'William Terrell', role: 'Owner / Lead Technician' },
          { name: 'Service Team', role: 'Repair, installation, and maintenance specialists' }
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
