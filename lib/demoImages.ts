export const uploadedHvacImages = {
  commercialRooftop: '/images/hvac-demo/commercial-rooftop.jpg',
  wallUnitService: '/images/hvac-demo/wall-unit-service.jpg',
  rooftopDiagnostics: '/images/hvac-demo/rooftop-diagnostics.jpg',
  indoorMaintenance: '/images/hvac-demo/indoor-maintenance.jpg',
  outdoorCondensers: '/images/hvac-demo/outdoor-condensers.jpg',
  techTablet: '/images/hvac-demo/tech-tablet.jpg',
  residentialCondenser: '/images/hvac-demo/residential-condenser.jpg',
  gaugeRepair: '/images/hvac-demo/gauge-repair.jpg',
  workVan: '/images/hvac-demo/workvan.jpg',
  systemInstallation: '/images/hvac-demo/installation.jpg',
  systemReplacement: '/images/hvac-demo/replacement.jpg',
  emergencyRepair: '/images/hvac-demo/emergency.jpg',
  preventativeMaintenance: '/images/hvac-demo/preventative.jpg',
  ductCleaningSealing: '/images/hvac-demo/hvacclean.jpg',
  thermostatServices: '/images/hvac-demo/thermostat.jpg',
  tuneUp: '/images/hvac-demo/tune-up.jpg'
}

export const stockHvacImages = {
  comfortInterior: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1800&q=80',
  cleanInterior: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1400&q=80',
  technicianGeneral: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1400&q=80',
  constructionWork: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1400&q=80',
  maintenanceWork: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1400&q=80'
}

export const demoImages = {
  hero: uploadedHvacImages.workVan,
  heroAlt: uploadedHvacImages.outdoorCondensers,
  systemInstallation: uploadedHvacImages.systemInstallation,
  systemReplacement: uploadedHvacImages.systemReplacement,
  emergencyRepair: uploadedHvacImages.emergencyRepair,
  preventativeMaintenance: uploadedHvacImages.preventativeMaintenance,
  ductCleaningSealing: uploadedHvacImages.ductCleaningSealing,
  thermostatServices: uploadedHvacImages.thermostatServices,
  tuneup: uploadedHvacImages.tuneUp,
  team: stockHvacImages.technicianGeneral,
  comfortInterior: stockHvacImages.comfortInterior,
  constructionWork: stockHvacImages.constructionWork,
  commercial: uploadedHvacImages.commercialRooftop,
  acRepair: uploadedHvacImages.emergencyRepair,
  heatingRepair: uploadedHvacImages.residentialCondenser,
  installation: uploadedHvacImages.systemInstallation,
  maintenance: uploadedHvacImages.preventativeMaintenance,
  indoorAir: stockHvacImages.cleanInterior,
  ductwork: uploadedHvacImages.ductCleaningSealing,
  techTablet: uploadedHvacImages.techTablet,
  residentialCondenser: uploadedHvacImages.residentialCondenser,
  outdoorCondensers: uploadedHvacImages.outdoorCondensers,
  wallUnitService: uploadedHvacImages.wallUnitService,
  gaugeRepair: uploadedHvacImages.gaugeRepair,
  commercialRooftop: uploadedHvacImages.commercialRooftop,
  rooftopDiagnostics: uploadedHvacImages.rooftopDiagnostics,
  indoorMaintenance: uploadedHvacImages.indoorMaintenance
}

export const demoServiceImages = [
  demoImages.systemInstallation,
  demoImages.systemReplacement,
  demoImages.emergencyRepair,
  demoImages.preventativeMaintenance,
  demoImages.ductCleaningSealing,
  demoImages.thermostatServices
]

export const demoGalleryImages = [
  { name: 'System installation work', url: demoImages.systemInstallation, alt: 'HVAC system installation work' },
  { name: 'System replacement options', url: demoImages.systemReplacement, alt: 'HVAC system replacement equipment' },
  { name: 'Emergency repair response', url: demoImages.emergencyRepair, alt: 'Emergency HVAC repair service' },
  { name: 'Preventative maintenance visit', url: demoImages.preventativeMaintenance, alt: 'Preventative HVAC maintenance service' },
  { name: 'Duct cleaning and sealing', url: demoImages.ductCleaningSealing, alt: 'Duct cleaning and sealing service' },
  { name: 'Thermostat services', url: demoImages.thermostatServices, alt: 'Thermostat service and setup' }
]

export function resolveDemoImage(src: string | undefined | null, fallback: string) {
  if (!src) return fallback
  const isOldSvgDemo = src.includes('/images/hvac-') && src.endsWith('.svg')
  const isOldRandomDemo = src.includes('source.unsplash.com')
  return isOldSvgDemo || isOldRandomDemo ? fallback : src
}
