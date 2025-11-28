import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { TrendingUp, TrendingDown, DollarSign, Users, Target, BarChart3, Building2, Cpu, Truck, ArrowRight } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts'

// Revenue trend data
const revenueData = [
  { year: '2020', revenue: 127.1, ebit: -2.9 },
  { year: '2021', revenue: 136.3, ebit: 2.1 },
  { year: '2022', revenue: 158.1, ebit: 6.2 },
  { year: '2023', revenue: 176.2, ebit: 8.5 },
  { year: '2024', revenue: 185.0, ebit: 11.3 },
]

// Business unit comparison data for radar
const radarData = [
  { dimension: 'Financial', blue: 85, modelE: 20, pro: 90 },
  { dimension: 'Marketing', blue: 80, modelE: 60, pro: 85 },
  { dimension: 'Management', blue: 75, modelE: 65, pro: 90 },
  { dimension: 'Operations', blue: 80, modelE: 55, pro: 88 },
  { dimension: 'Strategy Fit', blue: 90, modelE: 40, pro: 100 },
]

function KPICard({ title, value, change, icon: Icon, trend, darkMode, color = 'blue' }) {
  const isPositive = trend === 'up'
  const colorClasses = {
    blue: 'from-[#003478] to-[#0076CE]',
    green: 'from-[#00A550] to-[#10B981]',
    orange: 'from-[#FF6B00] to-[#F59E0B]',
  }

  return (
    <div className={`rounded-xl p-6 ${darkMode ? 'bg-[#1E293B]' : 'bg-white'} shadow-lg hover:shadow-xl transition-shadow`}>
      <div className="flex justify-between items-start">
        <div>
          <p className={`text-sm font-medium ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>{title}</p>
          <p className={`text-3xl font-bold mt-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>{value}</p>
          <div className={`flex items-center mt-2 text-sm ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
            {isPositive ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
            <span>{change}</span>
          </div>
        </div>
        <div className={`p-3 rounded-lg bg-gradient-to-br ${colorClasses[color]}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  )
}

function BusinessUnitCard({ unit, data, darkMode }) {
  const unitConfig = {
    blue: {
      name: 'Ford Blue',
      icon: Building2,
      color: '#003478',
      bgGradient: 'from-[#003478] to-[#0076CE]',
      path: '/blue',
    },
    model_e: {
      name: 'Model e',
      icon: Cpu,
      color: '#FF6B00',
      bgGradient: 'from-[#FF6B00] to-[#F59E0B]',
      path: '/model-e',
    },
    pro: {
      name: 'Ford Pro',
      icon: Truck,
      color: '#00A550',
      bgGradient: 'from-[#00A550] to-[#10B981]',
      path: '/pro',
    },
  }

  const config = unitConfig[unit]
  const Icon = config.icon

  // Extract metrics from the data
  const extractMetric = (text, pattern) => {
    const match = text.match(pattern)
    return match ? match[1] : 'N/A'
  }

  const revenue = extractMetric(data.financial, /Revenue: \$([\d.]+)B/)
  const ebit = extractMetric(data.financial, /EBIT: [^(]*\(([^)]+)/)
  const fitScore = data.framework_fit_score.split(' - ')[0]

  return (
    <Link
      to={config.path}
      className={`block rounded-xl overflow-hidden ${darkMode ? 'bg-[#1E293B]' : 'bg-white'} shadow-lg hover:shadow-xl transition-all hover:-translate-y-1`}
    >
      {/* Header gradient */}
      <div className={`h-2 bg-gradient-to-r ${config.bgGradient}`} />

      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg bg-gradient-to-br ${config.bgGradient}`}>
              <Icon className="w-5 h-5 text-white" />
            </div>
            <h3 className={`font-semibold text-lg ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              {config.name}
            </h3>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            fitScore.includes('10') || fitScore.includes('9')
              ? 'bg-green-100 text-green-800'
              : fitScore.includes('4') || fitScore.includes('3')
                ? 'bg-red-100 text-red-800'
                : 'bg-yellow-100 text-yellow-800'
          }`}>
            {fitScore}
          </span>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between">
            <span className={darkMode ? 'text-slate-400' : 'text-slate-600'}>Revenue</span>
            <span className={`font-semibold ${darkMode ? 'text-white' : 'text-slate-900'}`}>${revenue}B</span>
          </div>
          <div className="flex justify-between">
            <span className={darkMode ? 'text-slate-400' : 'text-slate-600'}>EBIT Margin</span>
            <span className={`font-semibold ${ebit.includes('-') ? 'text-red-500' : 'text-green-500'}`}>{ebit}</span>
          </div>
        </div>

        <p className={`mt-4 text-sm line-clamp-2 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
          {data.strategic_position}
        </p>

        <div className={`mt-4 flex items-center text-sm font-medium ${darkMode ? 'text-[#60A5FA]' : 'text-[#003478]'}`}>
          View Details
          <ArrowRight className="w-4 h-4 ml-1" />
        </div>
      </div>
    </Link>
  )
}

export default function ExecutiveSummary({ darkMode }) {
  const [businessUnits, setBusinessUnits] = useState(null)
  const [kpis, setKpis] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      fetch(`${import.meta.env.BASE_URL}data/business_units.json`).then(r => r.json()),
      fetch(`${import.meta.env.BASE_URL}data/kpis.json`).then(r => r.json()),
    ])
      .then(([units, kpiData]) => {
        setBusinessUnits(units)
        setKpis(kpiData)
        setLoading(false)
      })
      .catch(err => {
        console.error('Error loading data:', err)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#003478]"></div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
          Executive Dashboard
        </h1>
        <p className={`mt-2 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
          Ford Motor Company Strategy Analysis (2020-2025)
        </p>
      </div>

      {/* Top KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KPICard
          title="Total Revenue (2024)"
          value="$185.0B"
          change="+5.0% YoY"
          icon={DollarSign}
          trend="up"
          darkMode={darkMode}
          color="blue"
        />
        <KPICard
          title="EBIT (2024)"
          value="$11.3B"
          change="+33.0% YoY"
          icon={TrendingUp}
          trend="up"
          darkMode={darkMode}
          color="green"
        />
        <KPICard
          title="Net Income"
          value="$6.6B"
          change="+53.5% YoY"
          icon={BarChart3}
          trend="up"
          darkMode={darkMode}
          color="blue"
        />
        <KPICard
          title="Employees"
          value="171K"
          change="-3.4% YoY"
          icon={Users}
          trend="down"
          darkMode={darkMode}
          color="orange"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Revenue & EBIT Trend */}
        <div className={`rounded-xl p-6 ${darkMode ? 'bg-[#1E293B]' : 'bg-white'} shadow-lg`}>
          <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            Revenue & EBIT Trend (2020-2024)
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#003478" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#003478" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorEbit" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00A550" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#00A550" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#334155' : '#e2e8f0'} />
              <XAxis dataKey="year" stroke={darkMode ? '#94a3b8' : '#64748b'} />
              <YAxis stroke={darkMode ? '#94a3b8' : '#64748b'} />
              <Tooltip
                contentStyle={{
                  backgroundColor: darkMode ? '#1E293B' : '#fff',
                  borderColor: darkMode ? '#334155' : '#e2e8f0',
                  color: darkMode ? '#fff' : '#000',
                }}
              />
              <Area type="monotone" dataKey="revenue" stroke="#003478" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" name="Revenue ($B)" />
              <Area type="monotone" dataKey="ebit" stroke="#00A550" strokeWidth={2} fillOpacity={1} fill="url(#colorEbit)" name="EBIT ($B)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Business Unit Radar */}
        <div className={`rounded-xl p-6 ${darkMode ? 'bg-[#1E293B]' : 'bg-white'} shadow-lg`}>
          <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            Business Unit Comparison
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <RadarChart data={radarData}>
              <PolarGrid stroke={darkMode ? '#334155' : '#e2e8f0'} />
              <PolarAngleAxis dataKey="dimension" stroke={darkMode ? '#94a3b8' : '#64748b'} tick={{ fontSize: 12 }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} stroke={darkMode ? '#94a3b8' : '#64748b'} />
              <Radar name="Ford Blue" dataKey="blue" stroke="#003478" fill="#003478" fillOpacity={0.3} />
              <Radar name="Model e" dataKey="modelE" stroke="#FF6B00" fill="#FF6B00" fillOpacity={0.3} />
              <Radar name="Ford Pro" dataKey="pro" stroke="#00A550" fill="#00A550" fillOpacity={0.3} />
              <Tooltip
                contentStyle={{
                  backgroundColor: darkMode ? '#1E293B' : '#fff',
                  borderColor: darkMode ? '#334155' : '#e2e8f0',
                  color: darkMode ? '#fff' : '#000',
                }}
              />
            </RadarChart>
          </ResponsiveContainer>
          <div className="flex justify-center space-x-4 mt-2">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-[#003478] mr-2"></div>
              <span className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Blue</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-[#FF6B00] mr-2"></div>
              <span className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Model e</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-[#00A550] mr-2"></div>
              <span className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Pro</span>
            </div>
          </div>
        </div>
      </div>

      {/* Business Unit Cards */}
      <div className="mb-8">
        <h2 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
          Business Units
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {businessUnits && Object.entries(businessUnits).map(([key, data]) => (
            <BusinessUnitCard key={key} unit={key} data={data} darkMode={darkMode} />
          ))}
        </div>
      </div>

      {/* Quick Links */}
      <div className={`rounded-xl p-6 ${darkMode ? 'bg-[#1E293B]' : 'bg-white'} shadow-lg`}>
        <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
          Explore Further
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            to="/frameworks"
            className={`flex items-center p-4 rounded-lg border ${darkMode ? 'border-slate-700 hover:bg-slate-700' : 'border-slate-200 hover:bg-slate-50'} transition-colors`}
          >
            <Target className="w-8 h-8 text-[#003478] mr-4" />
            <div>
              <h4 className={`font-medium ${darkMode ? 'text-white' : 'text-slate-900'}`}>Framework Explorer</h4>
              <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>12 course frameworks applied to Ford</p>
            </div>
            <ArrowRight className={`w-5 h-5 ml-auto ${darkMode ? 'text-slate-400' : 'text-slate-600'}`} />
          </Link>
          <Link
            to="/story"
            className={`flex items-center p-4 rounded-lg border ${darkMode ? 'border-slate-700 hover:bg-slate-700' : 'border-slate-200 hover:bg-slate-50'} transition-colors`}
          >
            <BarChart3 className="w-8 h-8 text-[#00A550] mr-4" />
            <div>
              <h4 className={`font-medium ${darkMode ? 'text-white' : 'text-slate-900'}`}>Transformation Story</h4>
              <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Ford's journey from 2020 to 2025</p>
            </div>
            <ArrowRight className={`w-5 h-5 ml-auto ${darkMode ? 'text-slate-400' : 'text-slate-600'}`} />
          </Link>
        </div>
      </div>
    </div>
  )
}
