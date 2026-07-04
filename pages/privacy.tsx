import Header from '../components/Header'

export default function Privacy(){
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Header variant="alternate" />
      <main className="max-w-4xl mx-auto p-6">
        <section className="py-12">
          <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-sm text-gray-700">We respect your privacy. This is a placeholder privacy policy. Replace with your legal text before publishing.</p>
        </section>
      </main>
    </div>
  )
}
