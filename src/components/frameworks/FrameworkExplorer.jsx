import { useState, useEffect } from 'react'
import { BookOpen, X, Building2, Cpu, Truck, ChevronRight, Search, Filter } from 'lucide-react'

const categoryColors = {
  'Management & Leadership': { bg: 'bg-purple-100', text: 'text-purple-800', border: 'border-purple-300' },
  'Operations Strategy': { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-300' },
  'Marketing Strategy': { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-300' },
  'Marketing Intelligence': { bg: 'bg-teal-100', text: 'text-teal-800', border: 'border-teal-300' },
  'Competitive Strategy': { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-300' },
  'Operations Management': { bg: 'bg-indigo-100', text: 'text-indigo-800', border: 'border-indigo-300' },
  'Strategic Resources': { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-300' },
  'Implementation Effectiveness': { bg: 'bg-orange-100', text: 'text-orange-800', border: 'border-orange-300' },
  'Strategic Intent': { bg: 'bg-pink-100', text: 'text-pink-800', border: 'border-pink-300' },
  'Financial Analysis': { bg: 'bg-cyan-100', text: 'text-cyan-800', border: 'border-cyan-300' },
  'Analytics & Reporting': { bg: 'bg-gray-100', text: 'text-gray-800', border: 'border-gray-300' },
}

function FrameworkCard({ framework, onClick, darkMode }) {
  const categoryStyle = categoryColors[framework.area] || categoryColors['Analytics & Reporting']

  return (
    <button
      onClick={() => onClick(framework)}
      className={`w-full text-left rounded-xl p-5 ${darkMode ? 'bg-[#1E293B] hover:bg-[#2d3f5a]' : 'bg-white hover:bg-slate-50'} shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border ${darkMode ? 'border-slate-700' : 'border-slate-200'}`}
    >
      <div className="flex items-start justify-between mb-3">
        <span className={`px-2 py-1 rounded text-xs font-medium ${categoryStyle.bg} ${categoryStyle.text}`}>
          {framework.area}
        </span>
        <ChevronRight className={`w-4 h-4 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`} />
      </div>

      <h3 className={`font-semibold mb-1 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
        {framework.name}
      </h3>

      <p className={`text-xs mb-3 ${darkMode ? 'text-slate-500' : 'text-slate-500'}`}>
        {framework.source}
      </p>

      <p className={`text-sm line-clamp-2 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
        {framework.assessment}
      </p>
    </button>
  )
}

function FrameworkModal({ framework, onClose, darkMode }) {
  if (!framework) return null

  const categoryStyle = categoryColors[framework.area] || categoryColors['Analytics & Reporting']

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" onClick={onClose}>
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />

        <div
          className={`relative w-full max-w-3xl rounded-2xl ${darkMode ? 'bg-[#1E293B]' : 'bg-white'} shadow-2xl`}
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className={`p-6 border-b ${darkMode ? 'border-slate-700' : 'border-slate-200'}`}>
            <div className="flex items-start justify-between">
              <div>
                <span className={`px-2 py-1 rounded text-xs font-medium ${categoryStyle.bg} ${categoryStyle.text}`}>
                  {framework.area}
                </span>
                <h2 className={`text-xl font-bold mt-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  {framework.name}
                </h2>
                <p className={`text-sm mt-1 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  Source: {framework.source}
                </p>
              </div>
              <button
                onClick={onClose}
                className={`p-2 rounded-lg ${darkMode ? 'hover:bg-slate-700 text-slate-400' : 'hover:bg-slate-100 text-slate-600'}`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Overall Assessment */}
            <div className={`p-4 rounded-lg ${darkMode ? 'bg-[#0F172A]' : 'bg-slate-50'}`}>
              <h4 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                Overall Assessment
              </h4>
              <p className={darkMode ? 'text-slate-300' : 'text-slate-700'}>
                {framework.assessment}
              </p>
            </div>

            {/* Business Unit Applications */}
            <div>
              <h4 className={`font-semibold mb-4 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                Application by Business Unit
              </h4>

              <div className="space-y-4">
                {/* Ford Blue */}
                <div className={`p-4 rounded-lg border-l-4 border-[#003478] ${darkMode ? 'bg-[#0F172A]' : 'bg-blue-50'}`}>
                  <div className="flex items-center space-x-2 mb-2">
                    <Building2 className="w-4 h-4 text-[#003478]" />
                    <span className={`font-medium ${darkMode ? 'text-white' : 'text-slate-900'}`}>Ford Blue</span>
                  </div>
                  <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    {framework.applications.blue}
                  </p>
                </div>

                {/* Model e */}
                <div className={`p-4 rounded-lg border-l-4 border-[#FF6B00] ${darkMode ? 'bg-[#0F172A]' : 'bg-orange-50'}`}>
                  <div className="flex items-center space-x-2 mb-2">
                    <Cpu className="w-4 h-4 text-[#FF6B00]" />
                    <span className={`font-medium ${darkMode ? 'text-white' : 'text-slate-900'}`}>Ford Model e</span>
                  </div>
                  <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    {framework.applications.modelE}
                  </p>
                </div>

                {/* Ford Pro */}
                <div className={`p-4 rounded-lg border-l-4 border-[#00A550] ${darkMode ? 'bg-[#0F172A]' : 'bg-green-50'}`}>
                  <div className="flex items-center space-x-2 mb-2">
                    <Truck className="w-4 h-4 text-[#00A550]" />
                    <span className={`font-medium ${darkMode ? 'text-white' : 'text-slate-900'}`}>Ford Pro</span>
                  </div>
                  <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    {framework.applications.pro}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function FrameworkExplorer({ darkMode }) {
  const [frameworks, setFrameworks] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedFramework, setSelectedFramework] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}data/frameworks.json`)
      .then(r => r.json())
      .then(data => {
        setFrameworks(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Error loading frameworks:', err)
        setLoading(false)
      })
  }, [])

  // Get unique categories
  const categories = ['all', ...new Set(frameworks.map(f => f.area))]

  // Filter frameworks
  const filteredFrameworks = frameworks.filter(f => {
    const matchesSearch = f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          f.assessment.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || f.area === selectedCategory
    return matchesSearch && matchesCategory
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#003478]"></div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-2">
          <BookOpen className={`w-8 h-8 ${darkMode ? 'text-[#60A5FA]' : 'text-[#003478]'}`} />
          <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            Framework Explorer
          </h1>
        </div>
        <p className={darkMode ? 'text-slate-400' : 'text-slate-600'}>
          Explore how 12 course frameworks from DSCI-5330 apply to Ford's strategic transformation
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`} />
          <input
            type="text"
            placeholder="Search frameworks..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
              darkMode
                ? 'bg-[#1E293B] border-slate-700 text-white placeholder-slate-500'
                : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400'
            } focus:outline-none focus:ring-2 focus:ring-[#003478]`}
          />
        </div>

        <div className="relative">
          <Filter className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`} />
          <select
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
            className={`pl-10 pr-8 py-2 rounded-lg border appearance-none ${
              darkMode
                ? 'bg-[#1E293B] border-slate-700 text-white'
                : 'bg-white border-slate-200 text-slate-900'
            } focus:outline-none focus:ring-2 focus:ring-[#003478]`}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat === 'all' ? 'All Categories' : cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className={`rounded-xl p-4 mb-8 ${darkMode ? 'bg-[#1E293B]' : 'bg-white'} shadow-lg`}>
        <div className="flex flex-wrap gap-6">
          <div>
            <span className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              {frameworks.length}
            </span>
            <span className={`ml-2 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Total Frameworks</span>
          </div>
          <div>
            <span className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              {categories.length - 1}
            </span>
            <span className={`ml-2 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Categories</span>
          </div>
          <div>
            <span className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              3
            </span>
            <span className={`ml-2 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Business Units Analyzed</span>
          </div>
        </div>
      </div>

      {/* Framework Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFrameworks.map((framework, index) => (
          <FrameworkCard
            key={index}
            framework={framework}
            onClick={setSelectedFramework}
            darkMode={darkMode}
          />
        ))}
      </div>

      {filteredFrameworks.length === 0 && (
        <div className={`text-center py-12 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
          No frameworks match your search criteria
        </div>
      )}

      {/* Modal */}
      {selectedFramework && (
        <FrameworkModal
          framework={selectedFramework}
          onClose={() => setSelectedFramework(null)}
          darkMode={darkMode}
        />
      )}
    </div>
  )
}
