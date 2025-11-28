import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom'
import { Sun, Moon, LayoutDashboard, Building2, Cpu, Truck, BookOpen, Film, Menu, X, ChevronDown, BarChart2 } from 'lucide-react'

// Import pages
import ExecutiveSummary from './components/dashboard/ExecutiveSummary'
import BusinessUnitView from './components/business-units/BusinessUnitView'
import FrameworkExplorer from './components/frameworks/FrameworkExplorer'
import StoryTimeline from './components/narrative/StoryTimeline'

function Navigation({ darkMode, setDarkMode }) {
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [biDropdownOpen, setBiDropdownOpen] = useState(false)

  const navItems = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/blue', label: 'Ford Blue', icon: Building2, color: 'text-[#003478]' },
    { path: '/model-e', label: 'Model e', icon: Cpu, color: 'text-[#FF6B00]' },
    { path: '/pro', label: 'Ford Pro', icon: Truck, color: 'text-[#00A550]' },
    { path: '/frameworks', label: 'Frameworks', icon: BookOpen },
    { path: '/story', label: 'Story', icon: Film },
  ]

  const biLinks = [
    { url: 'https://kh0pper.github.io/DSCI-5330-Assignment-02/', label: 'Finance & Accounting', assignment: '02' },
    { url: 'https://kh0pper.github.io/dsci-5330-assignment-3/', label: 'Marketing Intelligence', assignment: '03' },
    { url: 'https://kh0pper.github.io/dsci-5330-assignment-4/', label: 'Management Strategy', assignment: '04' },
    { url: 'https://kh0pper.github.io/dsci-5330-assignment-05/', label: 'Operations Strategy', assignment: '05' },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <header className={`sticky top-0 z-50 border-b ${darkMode ? 'bg-[#0F172A] border-slate-700' : 'bg-white border-slate-200'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white bg-gradient-to-br from-[#003478] to-[#0076CE]">
              F
            </div>
            <div>
              <span className={`font-semibold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                Ford Business Intelligence
              </span>
              <span className="hidden sm:inline text-xs text-slate-500 ml-2">DSCI-5330</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map(({ path, label, icon: Icon, color }) => (
              <Link
                key={path}
                to={path}
                className={`px-3 py-2 rounded-lg text-sm font-medium flex items-center space-x-2 transition-colors
                  ${isActive(path)
                    ? 'bg-[#003478] text-white'
                    : darkMode
                      ? 'text-slate-300 hover:text-white hover:bg-slate-700'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
              >
                <Icon className={`w-4 h-4 ${!isActive(path) && color ? color : ''}`} />
                <span>{label}</span>
              </Link>
            ))}

            {/* B.I. Dropdown */}
            <div className="relative">
              <button
                onClick={() => setBiDropdownOpen(!biDropdownOpen)}
                onBlur={() => setTimeout(() => setBiDropdownOpen(false), 150)}
                className={`px-3 py-2 rounded-lg text-sm font-medium flex items-center space-x-2 transition-colors
                  ${darkMode
                    ? 'text-slate-300 hover:text-white hover:bg-slate-700'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
              >
                <BarChart2 className="w-4 h-4" />
                <span>B.I.</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${biDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {biDropdownOpen && (
                <div className={`absolute right-0 mt-2 w-56 rounded-lg shadow-lg border ${darkMode ? 'bg-[#1E293B] border-slate-700' : 'bg-white border-slate-200'}`}>
                  <div className={`px-3 py-2 text-xs font-semibold ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                    Previous Assignments
                  </div>
                  {biLinks.map(({ url, label, assignment }) => (
                    <a
                      key={url}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center px-3 py-2 text-sm transition-colors ${darkMode ? 'text-slate-300 hover:bg-slate-700' : 'text-slate-700 hover:bg-slate-100'}`}
                    >
                      <span className={`w-6 h-6 rounded text-xs font-bold flex items-center justify-center mr-3 ${darkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-600'}`}>
                        {assignment}
                      </span>
                      {label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Right side */}
          <div className="flex items-center space-x-2">
            {/* Dark mode toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-lg transition-colors ${darkMode ? 'text-yellow-400 hover:bg-slate-700' : 'text-slate-600 hover:bg-slate-100'}`}
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-2 rounded-lg transition-colors ${darkMode ? 'text-white hover:bg-slate-700' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className={`md:hidden py-4 border-t ${darkMode ? 'border-slate-700' : 'border-slate-200'}`}>
            {navItems.map(({ path, label, icon: Icon, color }) => (
              <Link
                key={path}
                to={path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors
                  ${isActive(path)
                    ? 'bg-[#003478] text-white'
                    : darkMode
                      ? 'text-slate-300 hover:bg-slate-700'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
              >
                <Icon className={`w-5 h-5 ${!isActive(path) && color ? color : ''}`} />
                <span>{label}</span>
              </Link>
            ))}

            {/* B.I. Links in Mobile */}
            <div className={`mt-4 pt-4 border-t ${darkMode ? 'border-slate-700' : 'border-slate-200'}`}>
              <div className={`px-4 py-2 text-xs font-semibold ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                Previous B.I. Assignments
              </div>
              {biLinks.map(({ url, label, assignment }) => (
                <a
                  key={url}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${darkMode ? 'text-slate-300 hover:bg-slate-700' : 'text-slate-600 hover:bg-slate-100'}`}
                >
                  <span className={`w-6 h-6 rounded text-xs font-bold flex items-center justify-center ${darkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-600'}`}>
                    {assignment}
                  </span>
                  <span>{label}</span>
                </a>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}

function Footer({ darkMode }) {
  return (
    <footer className={`mt-auto py-6 border-t ${darkMode ? 'bg-[#1E293B] border-slate-700 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-600'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm">
            <span className="font-semibold">Ford Motor Company Business Intelligence</span>
            <span className="mx-2">•</span>
            <span>DSCI-5330 Business Analytics & Intelligence</span>
          </div>
          <div className="text-sm">
            <span>Group 3</span>
            <span className="mx-2">•</span>
            <span>University of North Texas</span>
            <span className="mx-2">•</span>
            <span>Fall 2025</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

function AppContent() {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
      document.documentElement.classList.remove('light')
    } else {
      document.documentElement.classList.add('light')
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'bg-[#0F172A] text-white' : 'bg-slate-50 text-slate-900'}`}>
      <Navigation darkMode={darkMode} setDarkMode={setDarkMode} />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<ExecutiveSummary darkMode={darkMode} />} />
          <Route path="/blue" element={<BusinessUnitView unit="blue" darkMode={darkMode} />} />
          <Route path="/model-e" element={<BusinessUnitView unit="model_e" darkMode={darkMode} />} />
          <Route path="/pro" element={<BusinessUnitView unit="pro" darkMode={darkMode} />} />
          <Route path="/frameworks" element={<FrameworkExplorer darkMode={darkMode} />} />
          <Route path="/story" element={<StoryTimeline darkMode={darkMode} />} />
        </Routes>
      </main>

      <Footer darkMode={darkMode} />
    </div>
  )
}

function App() {
  return (
    <BrowserRouter basename="/ford-strategy-dashboard">
      <AppContent />
    </BrowserRouter>
  )
}

export default App
