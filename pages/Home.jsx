import { useState } from 'react'
import Navbar from '../src/Navbar'
import BookDemo from './BookDemo'

function Home() {
  const [isBookDemoOpen, setIsBookDemoOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="relative min-h-screen flex items-center justify-center text-center pt-20">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://i.makeagif.com/media/10-27-2016/V1o5Eg.gif"
            alt="Homepage Background"
            className="absolute min-w-full min-h-full object-cover blur-sm brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 pt-20">
          <h1 className="text-5xl font-extrabold text-white sm:text-6xl lg:text-7xl">
            All Your Information in One Place
          </h1>
          <p className="mt-6 text-2xl text-gray-200 max-w-3xl mx-auto">
            Simplify Management with a Unified Data Platform.
          </p>
          <div className="mt-10">
            <button 
              onClick={() => setIsBookDemoOpen(true)}
              className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700"
            >
              Book a Demo
            </button>
          </div>
        </div>
      </main>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 shadow-lg rounded-lg">
              <div className="mx-auto h-16 w-16 text-blue-600 mb-4">
                <svg className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Fast & Efficient</h3>
              <p className="mt-2 text-gray-600">
                Quick access to all your data in one centralized location.
              </p>
            </div>

            <div className="text-center p-6 shadow-lg rounded-lg">
              <div className="mx-auto h-16 w-16 text-blue-600 mb-4">
                <svg className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Secure & Reliable</h3>
              <p className="mt-2 text-gray-600">
                Your data is protected with enterprise-grade security.
              </p>
            </div>

            <div className="text-center p-6 shadow-lg rounded-lg">
              <div className="mx-auto h-16 w-16 text-blue-600 mb-4">
                <svg className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Easy to Use</h3>
              <p className="mt-2 text-gray-600">
                Intuitive interface designed for the best user experience.
              </p>
            </div>
          </div>
        </div>
      </section>
      <BookDemo isOpen={isBookDemoOpen} onClose={() => setIsBookDemoOpen(false)} buttonOnly={false} />
    </div>
  )
}

export default Home 