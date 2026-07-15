import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Footer from '../components/Footer'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1">
        <Component {...pageProps} />
      </div>
      <Footer />
    </div>
  )
}
