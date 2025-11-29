import { Link } from 'react-router-dom'
import { ArrowLeft, BookOpen, Lightbulb, TrendingUp } from 'lucide-react'

// Framework card component
function FrameworkCard({ framework, darkMode }) {
  return (
    <div className={`p-4 rounded-lg border-l-4 border-[#003478] ${darkMode ? 'bg-[#0F172A]' : 'bg-blue-50'}`}>
      <div className="flex items-start space-x-3">
        <BookOpen className={`w-5 h-5 mt-0.5 ${darkMode ? 'text-[#60A5FA]' : 'text-[#003478]'}`} />
        <div>
          <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            {framework.name}
          </h4>
          {framework.source && (
            <p className={`text-xs mt-0.5 ${darkMode ? 'text-slate-500' : 'text-slate-500'}`}>
              {framework.source}
            </p>
          )}
          <p className={`text-sm mt-2 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
            {framework.application}
          </p>
        </div>
      </div>
    </div>
  )
}

// Key finding card component
function FindingCard({ finding, darkMode }) {
  return (
    <div className={`p-4 rounded-lg ${darkMode ? 'bg-[#1E293B]' : 'bg-white'} shadow-lg`}>
      <div className="flex items-start space-x-3">
        <div className={`p-2 rounded-lg ${darkMode ? 'bg-green-900/30' : 'bg-green-100'}`}>
          <TrendingUp className={`w-4 h-4 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
        </div>
        <div>
          <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            {finding.title}
          </h4>
          <p className={`text-sm mt-1 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            {finding.description}
          </p>
          {finding.metric && (
            <p className={`text-lg font-bold mt-2 ${darkMode ? 'text-[#60A5FA]' : 'text-[#003478]'}`}>
              {finding.metric}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default function AssignmentDashboard({
  title,
  assignment,
  subtitle,
  frameworks = [],
  findings = [],
  children,
  darkMode
}) {
  const assignmentColors = {
    '02': { gradient: 'from-emerald-600 to-teal-600', bg: 'bg-emerald-600' },
    '03': { gradient: 'from-purple-600 to-indigo-600', bg: 'bg-purple-600' },
    '04': { gradient: 'from-orange-600 to-amber-600', bg: 'bg-orange-600' },
    '05': { gradient: 'from-blue-600 to-cyan-600', bg: 'bg-blue-600' },
  }

  const colors = assignmentColors[assignment] || assignmentColors['02']

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Link */}
      <Link
        to="/"
        className={`inline-flex items-center text-sm mb-6 ${darkMode ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Dashboard
      </Link>

      {/* Header */}
      <div className={`rounded-xl overflow-hidden mb-8 ${darkMode ? 'bg-[#1E293B]' : 'bg-white'} shadow-lg`}>
        <div className={`h-2 bg-gradient-to-r ${colors.gradient}`}></div>
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center space-x-4">
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold text-xl bg-gradient-to-br ${colors.gradient}`}>
                {assignment}
              </div>
              <div>
                <h1 className={`text-2xl md:text-3xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  {title}
                </h1>
                <p className={`mt-1 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  {subtitle || `DSCI-5330 Assignment ${assignment}`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="mb-8">
        {children}
      </div>

      {/* Two Column Layout: Frameworks & Key Findings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Frameworks Panel */}
        {frameworks.length > 0 && (
          <div className={`rounded-xl p-6 ${darkMode ? 'bg-[#1E293B]' : 'bg-white'} shadow-lg`}>
            <div className="flex items-center space-x-2 mb-4">
              <Lightbulb className={`w-5 h-5 ${darkMode ? 'text-[#60A5FA]' : 'text-[#003478]'}`} />
              <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                Academic Frameworks Applied
              </h2>
            </div>
            <div className="space-y-4">
              {frameworks.map((framework, index) => (
                <FrameworkCard key={index} framework={framework} darkMode={darkMode} />
              ))}
            </div>
          </div>
        )}

        {/* Key Findings Panel */}
        {findings.length > 0 && (
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <TrendingUp className={`w-5 h-5 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
              <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                Key Findings
              </h2>
            </div>
            <div className="space-y-4">
              {findings.map((finding, index) => (
                <FindingCard key={index} finding={finding} darkMode={darkMode} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
