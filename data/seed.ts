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
  const initial