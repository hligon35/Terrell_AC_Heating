import { GetServerSideProps } from 'next'
import { getContent } from '../lib/store'
import Link from 'next/link'
import Header from '../components/Header'
import { demoImages, resolveDemoImage } from '../lib/demoImages'

const fallbackHero = demoImages.hero

export default function Home({ content }: any) {
  const hero = content.home?.hero || {
    headline: 'Fast, Reliable HVAC Service',
    subheadline: 'Need a new system, urgent repair, seasonal maintenance, duct help, or thermostat service