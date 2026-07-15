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
  thermostat: demoImages.ductwork,
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
          subheadline: 'AC not cooling? Heat not keeping up? Get straightforward service for repairs, maintenance, and comfort upgrades.',
          cta: 'Request Service',
          image: hvacImages.hero,
          imageAlt: 'HVAC technician servicing a wall-mounted air conditioning unit'
        },
        heroAlt: {
          headline: 'Comfort You Can Feel Again',
          subheadline: 'Residential and commercial HVAC help for cooling, heating, airflow, and system performance.',
          cta: 'Schedule Service',
          image: demoImages.heroAlt,
          imageAlt: 'Outdoor condenser units lined up against a bright sky'
        }
      },
      services: [
        {
          slug: 'ac-repair',
          title: 'AC Repair',
          excerpt: 'Help when your AC is blowing warm air, running nonstop, leaking, or not turning on.',
          body: 'When your air conditioner is not keeping up, Terrell AC and Heating can inspect the system, explain what is happening, and recommend the best repair path for your home or business.',
          image: hvacImages.acRepair,
          imageAlt: 'AC gauges connected to an open air conditioning unit during repair'
        },
        {
          slug: 'heating-repair',
          title: 'Heating Repair',
          excerpt: 'Service for uneven heat, strange smells, noisy equipment, or a system that will not start.',
          body: 'Heating problems can make a home uncomfortable fast. We help identify the issue, check for safe operation, and get your system moving toward reliable warmth again.',
          image: hvacImages.heatingRepair,
          imageAlt: 'Residential outdoor condenser beside a home exterior'
        },
        {
          slug: 'installation',
          title: 'HVAC Installation',
          excerpt: 'Replacement and installation options when your current system is outdated or unreliable.',
          body: 'A new HVAC system should be sized correctly and installed with long-term comfort in mind. We help customers understand their options and prepare for a cleaner installation experience.',
          image: hvacImages.installation,
          imageAlt: 'Technician running diagnostics on rooftop HVAC equipment'
        },
        {
          slug: 'maintenance',
          title: 'HVAC Maintenance',
          excerpt: 'Seasonal tune-ups that help reduce surprise breakdowns and keep air moving properly.',
          body: 'Maintenance helps catch small issues early, improve airflow, and support longer equipment life. Schedule service before the weather puts your system under pressure.',
          image: hvacImages.maintenance,
          imageAlt: 'Technician servicing an indoor ceiling cassette HVAC unit'
        },
        {
          slug: 'indoor-air-quality',
          title: 'Indoor Air Quality',
          excerpt: 'Comfort solutions for cleaner air, better filtration, humidity, and airflow concerns.',
          body: 'If your home feels stuffy, dusty, humid, or uneven from room to room, indoor air quality improvements can help support a more comfortable living environment.',
          image: hvacImages.indoorAir,
          imageAlt: 'Clean modern home interior representing indoor air comfort'
        },
        {
          slug: 'ductwork',
          title: 'Ductwork',
          excerpt: 'Airflow checks and ductwork support for rooms that never seem to feel right.',
          body: 'Poor ductwork can waste energy and leave certain spaces uncomfortable. We help evaluate airflow issues and recommend practical next steps.',
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
          description: 'Explore service, maintenance, and replacement options for larger HVAC systems.',
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
        intro: 'Terrell AC and Heating helps families and businesses stay comfortable with responsive service, clear communication, and clean HVAC workmanship.',
        image: hvacImages.team,
        imageAlt: 'HVAC service professional prepared for the day',
        team: [
          { name: 'William Terrell', role: 'Owner / Lead Technician' },
          { name: 'Service Team', role: 'Repair, installation, and maintenance support' }
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
