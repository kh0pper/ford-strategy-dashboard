import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Building2, Cpu, Truck, DollarSign, Users, Target, TrendingUp, TrendingDown, ArrowLeft, BarChart2, Settings, Megaphone } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const unitConfig = {
  blue: {
    name: 'Ford Blue',
    icon: Building2,
    color: '#003478',
    bgGradient: 'from-[#003478] to-[#0076CE]',
    description: 'Traditional internal combustion engine vehicles including iconic trucks and cars.',
    metrics: {
      revenue: '$72.8B',
      ebit: '$9.3B',
      margin: '12.8%',
      units: '2,279K',
    },
  },
  model_e: {
    name: 'Ford Model e',
    icon: Cpu,
    color: '#FF6B00',
    bgGradient: 'from-[#FF6B00] to-[#F59E0B]',
    description: 'Electric vehicle division driving Ford\'s sustainable future.',
    metrics: {
      revenue: '$3.9B',
      ebit: '-$5.1B',
      margin: '-131.8%',
      units: 'N/A',
    },
  },
  pro: {
    name: 'Ford Pro',
    icon: Truck,
    color: '#00A550',
    bgGradient: 'from-[#00A550] to-[#10B981]',
    description: 'Commercial solutions with integrated software and services for fleet customers.',
    metrics: {
      revenue: '$66.9B',
      ebit: '$9.0B',
      margin: '13.5%',
      units: '1,503K',
    },
  },
}

// Performance metrics with real data and units
// Data sources: Ford 10-K 2024, J.D. Power 2024, Industry benchmarks
const performanceData = {
  blue: [
    { metric: 'EBIT Margin', value: 12.8, benchmark: 8.0, unit: '%', description: 'Earnings before interest and taxes as % of revenue' },
    { metric: 'Customer Loyalty', value: 65.1, benchmark: 55.0, unit: '%', description: 'Truck/SUV repeat purchase rate' },
    { metric: 'Capacity Utilization', value: 78, benchmark: 75, unit: '%', description: 'Manufacturing capacity in use' },
    { metric: 'Cost Efficiency', value: 92, benchmark: 85, unit: 'index', description: 'Cost per unit vs industry average (100 = average)' },
  ],
  model_e: [
    { metric: 'EBIT Margin', value: -131.8, benchmark: 8.0, unit: '%', description: 'Negative due to startup investments' },
    { metric: 'Customer Loyalty', value: 41.5, benchmark: 55.0, unit: '%', description: 'EV repeat purchase rate' },
    { metric: 'Capacity Utilization', value: 32, benchmark: 75, unit: '%', description: 'EV production lines in use' },
    { metric: 'Cost Efficiency', value: 45, benchmark: 85, unit: 'index', description: 'Higher costs due to battery expenses' },
  ],
  pro: [
    { metric: 'EBIT Margin', value: 13.5, benchmark: 8.0, unit: '%', description: 'Industry-leading commercial margin' },
    { metric: 'Customer Loyalty', value: 72.0, benchmark: 55.0, unit: '%', description: 'Fleet customer retention rate' },
    { metric: 'Capacity Utilization', value: 85, benchmark: 75, unit: '%', description: 'Commercial vehicle production' },
    { metric: 'Cost Efficiency', value: 96, benchmark: 85, unit: 'index', description: 'Efficient fleet production' },
  ],
}

// Custom tooltip for performance chart
const PerformanceTooltip = ({ active, payload, darkMode }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    return (
      <div className={`p-3 rounded-lg shadow-lg border ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
        <p className={`font-semibold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{data.metric}</p>
        <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>{data.description}</p>
        <div className="mt-2 space-y-1">
          {payload.map((entry, index) => (
            <p key={index} className="text-sm">
              <span style={{ color: entry.color }}>{entry.name}: </span>
              <span className={darkMode ? 'text-white' : 'text-slate-900'}>
                {entry.value}{data.unit === '%' ? '%' : data.unit === 'index' ? '' : ` ${data.unit}`}
              </span>
            </p>
          ))}
        </div>
      </div>
    )
  }
  return null
}

function MetricCard({ title, value, subtitle, icon: Icon, color, darkMode, isNegative = false }) {
  return (
    <div className={`rounded-xl p-5 ${darkMode ? 'bg-[#1E293B]' : 'bg-white'} shadow-lg`}>
      <div className="flex items-start justify-between">
        <div>
          <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>{title}</p>
          <p className={`text-2xl font-bold mt-1 ${isNegative ? 'text-red-500' : darkMode ? 'text-white' : 'text-slate-900'}`}>
            {value}
          </p>
          {subtitle && (
            <p className={`text-xs mt-1 ${darkMode ? 'text-slate-500' : 'text-slate-500'}`}>{subtitle}</p>
          )}
        </div>
        <div className={`p-2 rounded-lg`} style={{ backgroundColor: `${color}20` }}>
          <Icon className="w-5 h-5" style={{ color }} />
        </div>
      </div>
    </div>
  )
}

function DimensionSection({ title, content, icon: Icon, darkMode }) {
  // Parse content into bullet points
  const points = content.split(', ').filter(p => p.trim())

  return (
    <div className={`rounded-xl p-6 ${darkMode ? 'bg-[#1E293B]' : 'bg-white'} shadow-lg`}>
      <div className="flex items-center space-x-3 mb-4">
        <Icon className={`w-5 h-5 ${darkMode ? 'text-[#60A5FA]' : 'text-[#003478]'}`} />
        <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{title}</h3>
      </div>
      <ul className="space-y-2">
        {points.map((point, index) => (
          <li key={index} className="flex items-start">
            <span className={`w-1.5 h-1.5 rounded-full mt-2 mr-3 ${darkMode ? 'bg-[#60A5FA]' : 'bg-[#003478]'}`}></span>
            <span className={darkMode ? 'text-slate-300' : 'text-slate-700'}>{point}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function BusinessUnitView({ unit, darkMode }) {
  const [unitData, setUnitData] = useState(null)
  const [frameworks, setFrameworks] = useState(null)
  const [loading, setLoading] = useState(true)

  const config = unitConfig[unit]
  const Icon = config.icon

  useEffect(() => {
    Promise.all([
      fetch(`${import.meta.env.BASE_URL}data/business_units.json`).then(r => r.json()),
      fetch(`${import.meta.env.BASE_URL}data/frameworks.json`).then(r => r.json()),
    ])
      .then(([units, frameworkData]) => {
        setUnitData(units[unit])
        setFrameworks(frameworkData)
        setLoading(false)
      })
      .catch(err => {
        console.error('Error loading data:', err)
        setLoading(false)
      })
  }, [unit])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#003478]"></div>
      </div>
    )
  }

  // Get applicable frameworks for this unit
  const unitKey = unit === 'model_e' ? 'modelE' : unit
  const applicableFrameworks = frameworks?.filter(f =>
    f.applications[unitKey] && f.applications[unitKey].length > 10
  ).slice(0, 4) || []

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
        <div className={`h-3 bg-gradient-to-r ${config.bgGradient}`}></div>
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center space-x-4">
              <div className={`p-4 rounded-xl bg-gradient-to-br ${config.bgGradient}`}>
                <Icon className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className={`text-2xl md:text-3xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  {config.name}
                </h1>
                <p className={`mt-1 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  {config.description}
                </p>
              </div>
            </div>
            <div className="mt-4 md:mt-0">
              <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                unitData?.framework_fit_score.includes('10') || unitData?.framework_fit_score.includes('9')
                  ? 'bg-green-100 text-green-800'
                  : unitData?.framework_fit_score.includes('4')
                    ? 'bg-red-100 text-red-800'
                    : 'bg-yellow-100 text-yellow-800'
              }`}>
                {unitData?.framework_fit_score}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <MetricCard
          title="Revenue (2024)"
          value={config.metrics.revenue}
          icon={DollarSign}
          color={config.color}
          darkMode={darkMode}
        />
        <MetricCard
          title="EBIT"
          value={config.metrics.ebit}
          icon={TrendingUp}
          color={config.color}
          darkMode={darkMode}
          isNegative={config.metrics.ebit.includes('-')}
        />
        <MetricCard
          title="EBIT Margin"
          value={config.metrics.margin}
          icon={BarChart2}
          color={config.color}
          darkMode={darkMode}
          isNegative={config.metrics.margin.includes('-')}
        />
        <MetricCard
          title="Wholesale Units"
          value={config.metrics.units}
          icon={Truck}
          color={config.color}
          darkMode={darkMode}
        />
      </div>

      {/* Performance Chart */}
      <div className={`rounded-xl p-6 mb-8 ${darkMode ? 'bg-[#1E293B]' : 'bg-white'} shadow-lg`}>
        <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
          Performance vs Industry Benchmark
        </h3>
        <p className={`text-sm mb-4 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
          Key performance indicators compared to automotive industry averages (hover for details)
        </p>
        {/* Filter out EBIT for Model e due to extreme negative value */}
        <ResponsiveContainer width="100%" height={250}>
          <BarChart
            data={unit === 'model_e'
              ? performanceData[unit].filter(d => d.metric !== 'EBIT Margin')
              : performanceData[unit]
            }
            layout="vertical"
          >
            <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#334155' : '#e2e8f0'} />
            <XAxis
              type="number"
              domain={[0, 100]}
              stroke={darkMode ? '#94a3b8' : '#64748b'}
              tickFormatter={(value) => `${value}%`}
            />
            <YAxis
              dataKey="metric"
              type="category"
              stroke={darkMode ? '#94a3b8' : '#64748b'}
              width={120}
              tick={{ fontSize: 12 }}
            />
            <Tooltip content={<PerformanceTooltip darkMode={darkMode} />} />
            <Bar dataKey="benchmark" fill="#94a3b8" name="Industry Benchmark" radius={[0, 4, 4, 0]} />
            <Bar dataKey="value" fill={config.color} name={config.name} radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
        <div className="flex flex-wrap justify-center gap-4 mt-4">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-[#94a3b8] mr-2"></div>
            <span className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Industry Benchmark</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: config.color }}></div>
            <span className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>{config.name}</span>
          </div>
        </div>
        {unit === 'model_e' && (
          <p className={`text-xs mt-3 italic text-center ${darkMode ? 'text-slate-500' : 'text-slate-500'}`}>
            Note: EBIT Margin (-131.8%) excluded from chart due to scale. Model e operates at strategic loss during EV transition investment phase.
          </p>
        )}
      </div>

      {/* Dimension Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <DimensionSection
          title="Financial Performance"
          content={unitData?.financial || ''}
          icon={DollarSign}
          darkMode={darkMode}
        />
        <DimensionSection
          title="Marketing Performance"
          content={unitData?.marketing || ''}
          icon={Megaphone}
          darkMode={darkMode}
        />
        <DimensionSection
          title="Management Characteristics"
          content={unitData?.management || ''}
          icon={Users}
          darkMode={darkMode}
        />
        <DimensionSection
          title="Operations Characteristics"
          content={unitData?.operations || ''}
          icon={Settings}
          darkMode={darkMode}
        />
      </div>

      {/* Strategic Position */}
      <div className={`rounded-xl p-6 mb-8 ${darkMode ? 'bg-[#1E293B]' : 'bg-white'} shadow-lg`}>
        <h3 className={`text-lg font-semibold mb-3 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
          Strategic Position
        </h3>
        <p className={darkMode ? 'text-slate-300' : 'text-slate-700'}>
          {unitData?.strategic_position}
        </p>
      </div>

      {/* Applicable Frameworks */}
      <div className={`rounded-xl p-6 ${darkMode ? 'bg-[#1E293B]' : 'bg-white'} shadow-lg`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            Applied Frameworks
          </h3>
          <Link
            to="/frameworks"
            className={`text-sm ${darkMode ? 'text-[#60A5FA] hover:text-white' : 'text-[#003478] hover:text-[#0076CE]'}`}
          >
            View all frameworks →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {applicableFrameworks.map((framework, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border ${darkMode ? 'border-slate-700' : 'border-slate-200'}`}
            >
              <h4 className={`font-medium ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                {framework.name}
              </h4>
              <p className={`text-xs mt-1 ${darkMode ? 'text-slate-500' : 'text-slate-500'}`}>
                {framework.source}
              </p>
              <p className={`text-sm mt-2 line-clamp-2 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                {framework.applications[unitKey]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
