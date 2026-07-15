import fs from 'fs'
import path from 'path'

const hvacImages = {
  hero: 'https://source.unsplash.com/1800x1200/?hvac,technician,air-conditioner',
  acRepair: 'https://source.unsplash.com/1400x950/?air-conditioner,repair,technician',
  heatingRepair: 'https://source.unsplash.com/1400x950/?furnace,heating,technician',
  installation: 'https://source.unsplash.com/1400x950/?hvac,installation,ductwork',
  maintenance: 'https://source.unsplash.com/1400x950/?hvac,maintenance,tools',
  indoorAir: 'https://source.unsplash.com/1400x950/?air-filter,ventilation,home',
  ductwork: 'https://source.unsplash.com/1400x950/?ductwork,ventilation,construction',
  thermostat: 'https://source.unsplash.com/1400x950/?thermostat,smart-home,hvac',
  commercial: 'https://source.unsplash.com/1400x950/?commercial,hvac,rooftop',
  tuneup: 'https://source.unsplash.com/1400x950/?hvac,inspection,technician'
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
          imageAlt: 'HVAC technician servicing residential AC equipment'
        },
        heroAlt: {
          headline: 'Premium HVAC Care for Your Home',
          subheadline: 'Cinematic comfort, expert technicians.',
          cta: 'Schedule Premium Service',
          image: 'https://source.unsplash.com/1800x1200/?luxury,home,hvac,comfort',
          imageAlt: 'Premium indoor comfort and HVAC service'
        }
      },
      services: [
        {
          slug: 'ac-repair',
          title: 'AC Repair',
          excerpt: 'Fast AC repairs to get your home cool again.',
          body: 'When the air stops blowing cold, Terrell AC and Heating can inspect the system, diagnose the issue, and restore comfort with clean, professional repair work.',
          image: hvacImages.acRepair,
          imageAlt: 'Technician repairing an outdoor air conditioning unit'
        },
        {
          slug: 'heating-repair',
          title: 'Heating Repair',
          excerpt: 'Heating specialists to restore warmth quickly.',
          body: 'From furnace issues to uneven heating, our team checks the source of the problem and gets your heat working safely and reliably.',
          image: hvacImages.heatingRepair,
          imageAlt: 'Heating system service and furnace repair procedure'
        },
        {
          slug: 'installation',
          title: 'HVAC Installation',
          excerpt: 'High-efficiency systems installed by pros.',
          body: 'Upgrade your comfort with correctly sized, professionally installed HVAC equipment built for long-term performance.',
          image: hvacImages.installation,
          imageAlt: 'New HVAC equipment installation and ductwork'
        },
        {
          slug: 'maintenance',
          title: 'HVAC Maintenance',
          excerpt: 'Seasonal tune-ups that help prevent surprise breakdowns.',
          body: 'Routine maintenance helps extend equipment life, improve airflow, and catch small issues before they become expensive repairs.',
          image: hvacImages.maintenance,
          imageAlt: 'HVAC technician performing maintenance with tools'
        },
        {
          slug: 'indoor-air-quality',
          title: 'Indoor Air Quality',
          excerpt: 'Cleaner air solutions for a healthier home.',
          body: 'Improve indoor comfort with filter, ventilation, humidity, and air-quality solutions designed around your home.',
          image: hvacImages.indoorAir,
          imageAlt: 'Air filter and ventilation system for indoor air quality'
        },
        {
          slug: 'ductwork',
          title: 'Ductwork',
          excerpt: 'Duct repairs and airflow improvements for better comfort.',
          body: 'Leaky or poorly designed ductwork can waste energy. We inspect, repair, and improve duct systems for stronger airflow.',
          image: hvacImages.ductwork,
          imageAlt: 'Residential ductwork and ventilation procedure'
        }
      ],
      specials: [
        {
          title: 'Seasonal HVAC Tune-Up',
          description: 'Get ahead of the weather with a professional inspection, cleaning, and comfort check.',
          expires: 'Limited-time offer',
          image: hvacImages.tuneup,
          imageAlt: 'Technician completing a seasonal HVAC tune-up'
        },
        {
          title: 'New System Installation Consultation',
          description: 'Explore replacement options for aging AC and heating equipment with a no-pressure consultation.',
          expires: 'Call for availability',
          image: hvacImages.commercial,
          imageAlt: 'HVAC equipment prepared for installation'
        }
      ],
      media: [
        { name: 'Outdoor AC condenser service', url: hvacImages.acRepair, alt: 'Technician servicing an outdoor AC condenser' },
        { name: 'Heating system repair', url: hvacImages.heatingRepair, alt: 'Heating repair procedure on furnace equipment' },
        { name: 'New HVAC installation', url: hvacImages.installation, alt: 'HVAC equipment installation work' },
        { name: 'Preventive maintenance', url: hvacImages.maintenance, alt: 'Technician performing preventive HVAC maintenance' },
        { name: 'Indoor air quality upgrades', url: hvacImages.indoorAir, alt: 'Indoor air quality and filtration equipment' },
        { name: 'Ductwork and ventilation', url: hvacImages.ductwork, alt: 'Ductwork and ventilation improvements' }
      ],
      about: {
        intro: 'Terrell AC and Heating helps families and businesses stay comfortable with responsive service, honest recommendations, and clean HVAC workmanship.',
        image: 'https://source.unsplash.com/1400x950/?hvac,team,technician',
        imageAlt: 'HVAC service team prepared for the day',
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
