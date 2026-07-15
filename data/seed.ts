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
  thermostat: demoImages.maintenance,
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
          imageAlt: 'HVAC technician completing real-life service work'
        },
        heroAlt: {
          headline: 'Premium HVAC Care for Your Home',
          subheadline: 'Cinematic comfort, expert technicians.',
          cta: 'Schedule Premium Service',
          image: demoImages.heroAlt,
          imageAlt: 'Modern home comfort interior for premium HVAC service'
        }
      },
      services: [
        {
          slug: 'ac-repair',
          title: 'AC Repair',
          excerpt: 'Fast AC repairs to get your home cool again.',
          body: 'When the air stops blowing cold, Terrell AC and Heating can inspect the system, diagnose the issue, and restore comfort with clean, professional repair work.',
          image: hvacImages.acRepair,
          imageAlt: 'Technician working on AC service and electrical components'
        },
        {
          slug: 'heating-repair',
          title: 'Heating Repair',
          excerpt: 'Heating specialists to restore warmth quickly.',
          body: 'From furnace issues to uneven heating, our team checks the source of the problem and gets your heat working safely and reliably.',
          image: hvacImages.heatingRepair,
          imageAlt: 'Heating and home service procedure with repair tools'
        },
        {
          slug: 'installation',
          title: 'HVAC Installation',
          excerpt: 'High-efficiency systems installed by pros.',
          body: 'Upgrade your comfort with correctly sized, professionally installed HVAC equipment built for long-term performance.',
          image: hvacImages.installation,
          imageAlt: 'Professional installation and construction service work'
        },
        {
          slug: 'maintenance',
          title: 'HVAC Maintenance',
          excerpt: 'Seasonal tune-ups that help prevent surprise breakdowns.',
          body: 'Routine maintenance helps extend equipment life, improve airflow, and catch small issues before they become expensive repairs.',
          image: hvacImages.maintenance,
          imageAlt: 'Technician performing maintenance and cleaning work'
        },
        {
          slug: 'indoor-air-quality',
          title: 'Indoor Air Quality',
          excerpt: 'Cleaner air solutions for a healthier home.',
          body: 'Improve indoor comfort with filter, ventilation, humidity, and air-quality solutions designed around your home.',
          image: hvacImages.indoorAir,
          imageAlt: 'Clean modern home interior representing indoor comfort'
        },
        {
          slug: 'ductwork',
          title: 'Ductwork',
          excerpt: 'Duct repairs and airflow improvements for better comfort.',
          body: 'Leaky or poorly designed ductwork can waste energy. We inspect, repair, and improve duct systems for stronger airflow.',
          image: hvacImages.ductwork,
          imageAlt: 'Technician service work for ventilation and airflow systems'
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
          title: 'New System Installation Consultation',
          description: 'Explore replacement options for aging AC and heating equipment with a no-pressure consultation.',
          expires: 'Call for availability',
          image: hvacImages.installation,
          imageAlt: 'Installation and home improvement service work'
        }
      ],
      media: [
        { name: 'AC service procedure', url: hvacImages.acRepair, alt: 'Technician servicing electrical and AC-related components' },
        { name: 'Heating repair visit', url: hvacImages.heatingRepair, alt: 'Heating and home repair service procedure' },
        { name: 'System installation work', url: hvacImages.installation, alt: 'Professional installation work on a job site' },
        { name: 'Preventive maintenance', url: hvacImages.maintenance, alt: 'Technician performing preventive maintenance work' },
        { name: 'Indoor comfort improvements', url: hvacImages.indoorAir, alt: 'Modern home interior representing indoor comfort' },
        { name: 'Airflow and service diagnostics', url: hvacImages.ductwork, alt: 'Technician service work for home comfort systems' }
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
