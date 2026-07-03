import fs from 'fs'
import path from 'path'

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
          cta: 'Request Service'
        }
      },
      services: [
        { slug: 'ac-repair', title: 'AC Repair', excerpt: 'Fast AC repairs to get your home cool again.' },
        { slug: 'heating-repair', title: 'Heating Repair', excerpt: 'Heating specialists to restore warmth quickly.' },
        { slug: 'installation', title: 'HVAC Installation', excerpt: 'High-efficiency systems installed by pros.' }
      ],
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
