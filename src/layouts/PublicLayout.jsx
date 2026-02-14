import { Outlet, Link } from "react-router-dom"

function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-background">

      {/* NAVBAR */}
      <header className="sticky top-0 z-50 bg-primary text-white shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

          {/* Logo Section */}
          <div className="flex items-center space-x-3">
            <div className="bg-white text-primary font-bold w-10 h-10 flex items-center justify-center rounded-full">
              GN
            </div>
            <h1 className="text-lg font-semibold tracking-wide">
              Smart GN System
            </h1>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="hover:text-gray-200 transition">
              Home
            </Link>
            <Link to="/about" className="hover:text-gray-200 transition">
              About
            </Link>
            <Link to="/services" className="hover:text-gray-200 transition">
              Services
            </Link>
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-3">
            <Link
              to="/login"
              className="border border-white px-4 py-2 rounded-md hover:bg-white hover:text-primary transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-white text-primary px-4 py-2 rounded-md font-medium hover:bg-gray-100 transition"
            >
              Register
            </Link>
          </div>

        </div>
      </header>

      {/* Page Content */}
      <main className="grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-secondary text-white text-center py-4">
        © 2026 Smart GN System. All Rights Reserved.
      </footer>

    </div>
  )
}

export default PublicLayout
