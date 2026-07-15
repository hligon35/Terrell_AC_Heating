export const uploadedHvacImages = {
  commercialRooftop: '/images/hvac-demo/commercial-rooftop.jpg',
  wallUnitService: '/images/hvac-demo/wall-unit-service.jpg',
  rooftopDiagnostics: '/images/hvac-demo/rooftop-diagnostics.jpg',
  indoorMaintenance: '/images/hvac-demo/indoor-maintenance.jpg',
  outdoorCondensers: '/images/hvac-demo/outdoor-condensers.jpg',
  techTablet: '/images/hvac-demo/tech-tablet.jpg',
  residentialCondenser: '/images/hvac-demo/residential-condenser.jpg',
  gaugeRepair: '/images/hvac-demo/gauge-repair.jpg'
}

export const stockHvacImages = {
  comfortInterior: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1800&q=80',
  cleanInterior: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1400&q=80',
  technicianGeneral: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1400&q=80',
  constructionWork: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1400&q=80',
  maintenanceWork: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1400&q=80'
}

export const demoImages = {
  // Primary public-site placements. Each key intentionally points to a unique image.
  hero: uploadedHvacImages.wallUnitService,
  heroAlt: uploadedHvacImages.outdoorCondensers,
  acRepair: uploadedHvacImages.gaugeRepair,
  heatingRepair: uploadedHvacImages.residentialCondenser,
  installation: uploadedHvacImages.rooftopDiagnostics,
  maintenance: uploadedHvacImages.indoorMaintenance,
  indoorAir: stockHvacImages.cleanInterior,
  ductwork: uploadedHvacImages.techTablet,
  commercial: uploadedHvacImages.commercialRooftop,
  tuneup: stockHvacImages.maintenanceWork,
  team: stockHvacImages.technicianGeneral,
  comfortInterior: stockHvacImages.comfortInterior,
  constructionWork: stockHvacImages.constructionWork
}

export const demoServiceImages = [
  demoImages.acRepair,
  demoImages.heatingRepair,
  demoImages.installation,
  demoImages.maintenance,
  demoImages.indoorAir,
  demoImages.ductwork
]

export const demoGalleryImages = [
  { name: 'Commercial rooftop HVAC equipment', url: demoImages.commercial, alt: 'Commercial rooftop HVAC units and piping systems' },
  { name: 'Outdoor condenser lineup', url: demoImages.heroAlt, alt: 'Multiple outdoor condenser units lined up outside' },
  { name: 'Comfort-focused interior', url: demoImages.comfortInterior, alt: 'Modern home interior representing comfort and airflow' },
  { name: 'General service readiness', url: demoImages.team, alt: 'HVAC service professional prepared for the day' },
  { name: 'Installation job site', url: demoImages.constructionWork, alt: 'Professional construction and equipment installation work' },
  { name: 'Seasonal tune-up detail', url: demoImages.tuneup, alt: 'Technician performing maintenance and cleaning work' }
]

export function resolveDemoImage(src: string | undefined | null, fallback: string) {
  if (!src) return fallback
  const isOldDemo = src.includes('/images/hvac-') || src.endsWith('.svg') || src.includes('source.unsplash.com')
  return isOldDemo ? fallback : src
}
