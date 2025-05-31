import { Link } from 'react-router-dom'
import BookDemo from './BookDemo'
import Navbar from '../src/Navbar'

function About() {
  return (
    <div className="min-h-screen bg-white w-full overflow-x-hidden">
      <Navbar />
      {/* About Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-50 to-white pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-extrabold text-gray-900 sm:text-6xl">
              About A2 Developers
            </h1>
            <p className="mt-6 text-2xl text-gray-600 max-w-3xl mx-auto">
              We are a team of passionate developers dedicated to creating innovative solutions.
            </p>
          </div>
        </div>
      </div>

      {/* Company Info Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="transform hover:scale-105 transition-transform duration-200">
                <h2 className="text-4xl font-bold text-gray-900">Our Mission</h2>
                <p className="mt-4 text-xl text-gray-600 leading-relaxed">
                  To provide cutting-edge software solutions that empower businesses to achieve their goals through innovative technology.
                </p>
              </div>
              <div className="transform hover:scale-105 transition-transform duration-200">
                <h2 className="text-4xl font-bold text-gray-900">Our Vision</h2>
                <p className="mt-4 text-xl text-gray-600 leading-relaxed">
                  To be the leading software development company known for delivering exceptional quality and customer satisfaction.
                </p>
              </div>
            </div>
            <div className="relative h-[600px] rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-200">
              <img
                className="absolute inset-0 w-full h-full object-cover"
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80"
                alt="Our Office"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-gradient-to-br from-gray-50 to-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-900">Our Team</h2>
            <p className="mt-4 text-xl text-gray-600">
              Meet the talented people behind our success
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {/* Team Member 1 */}
            <div className="text-center transform hover:scale-105 transition-transform duration-200">
              <div className="relative h-64 w-64 mx-auto rounded-full overflow-hidden shadow-xl">
                <img
                  className="absolute inset-0 w-full h-full object-cover"
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
                  alt="Team Member"
                />
              </div>
              <h3 className="mt-8 text-2xl font-semibold text-gray-900">John Doe</h3>
              <p className="text-lg text-blue-600">CEO & Founder</p>
            </div>

            {/* Team Member 2 */}
            <div className="text-center transform hover:scale-105 transition-transform duration-200">
              <div className="relative h-64 w-64 mx-auto rounded-full overflow-hidden shadow-xl">
                <img
                  className="absolute inset-0 w-full h-full object-cover"
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80"
                  alt="Team Member"
                />
              </div>
              <h3 className="mt-8 text-2xl font-semibold text-gray-900">Jane Smith</h3>
              <p className="text-lg text-blue-600">CTO</p>
            </div>

            {/* Team Member 3 */}
            <div className="text-center transform hover:scale-105 transition-transform duration-200">
              <div className="relative h-64 w-64 mx-auto rounded-full overflow-hidden shadow-xl">
                <img
                  className="absolute inset-0 w-full h-full object-cover"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                  alt="Team Member"
                />
              </div>
              <h3 className="mt-8 text-2xl font-semibold text-gray-900">Mike Johnson</h3>
              <p className="text-lg text-blue-600">Lead Developer</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About 