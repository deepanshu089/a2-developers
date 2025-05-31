import { Link } from 'react-router-dom'
import { useState } from 'react'

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/30 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 gap-8">
          <div className="flex-shrink-0">
            <span className="text-white text-xl font-bold">A2 Developers</span>
          </div>
          
          <div className="flex items-center flex-shrink-0">
            <img className="h-12 w-auto" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKXzNwY1e7GZYkoP5YgxJzA6lH-4XbosIugQ&s" alt="A2 Developers Logo" />
          </div>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-white focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <nav className={`absolute top-20 left-0 w-full bg-black/90 md:bg-transparent md:static md:w-auto md:flex md:items-center transition-all duration-200 ${isMenuOpen ? 'block' : 'hidden'} md:block`}>
            <div className="flex flex-col md:flex-row md:space-x-10 items-center py-4 md:py-0">
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-white font-bold px-3 py-2 text-lg hover:text-blue-400">Home</Link>
              <Link to="/about" onClick={() => setIsMenuOpen(false)} className="text-white font-bold px-3 py-2 text-lg hover:text-blue-400">About</Link>
              <Link to="/product" onClick={() => setIsMenuOpen(false)} className="text-white font-bold px-3 py-2 text-lg hover:text-blue-400">Product</Link>
              <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="text-white font-bold px-3 py-2 text-lg hover:text-blue-400">Contact</Link>
            </div>
          </nav>

          <div className="hidden md:flex items-center space-x-8 text-white text-base font-medium">
            <span className="flex items-center gap-2"><span role="img" aria-label="phone">📞</span> +91 80816 38914</span>
            <span className="flex items-center gap-2"><span role="img" aria-label="email">✉️</span> contactus@a2developers.org</span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar 