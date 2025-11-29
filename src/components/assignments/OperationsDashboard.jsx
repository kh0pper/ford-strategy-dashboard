import { BarChart, Bar, ComposedChart, Line, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell, PieChart, Pie } from 'recharts'
import AssignmentDashboard from './AssignmentDashboard'

// Business Unit Performance Data (2024)
const businessUnitData = [
  { name: 'Ford Blue', units: 2279, revenue: 72.8, ebit: 9.3, margin: 12.8, color: '#003478' },
  { name: 'Model e', units: 97, revenue: 3.9, ebit: -5.1, margin: -131.8, color: '#FF6B00' },
  { name: 'Ford Pro', units: 1503, revenue: 66.9, ebit: 9.0, margin: 13.5, color: '#10B981' },
]

// Manufacturing Footprint Data
const manufacturingData = [
  { name: 'Assembly Plants', value: 41, description: 'Global manufacturing' },
  { name: 'Countries', value: 24, description: 'Geographic presence' },
  { name: 'Total Facilities', value: 375, description: 'Operations worldwide' },
  { name: 'Joint Ventures', value: 6, description: 'Strategic partnerships' },
]

// MIT Decision Categories - Structural vs Infrastructure
const mitCategoriesData = [
  { category: 'Facilities', structural: 85, infrastructure: 15 },
  { category: 'Capacity', structural: 75, infrastructure: 25 },
  { category: 'Integration', structural: 70, infrastructure: 30 },
  { category: 'Technology', structural: 65, infrastructure: 35 },
  { category: 'Workforce', structural: 30, infrastructure: 70 },
  { category: 'Supply Chain', structural: 40, infrastructure: 60 },
  { category: 'IT Systems', structural: 25, infrastructure: 75 },
  { category: 'Organization', structural: 20, infrastructure: 80 },
]

// Strategic Fit Radar - Business Unit Alignment
const strategicFitData = [
  { metric: 'Cost Leadership', blue: 4.5, modelE: 2.0, pro: 4.0 },
  { metric: 'Differentiation', blue: 3.0, modelE: 4.0, pro: 5.0 },
  { metric: 'Capacity Fit', blue: 3.5, modelE: 2.5, pro: 4.5 },
  { metric: 'Vertical Integration', blue: 3.0, modelE: 4.5, pro: 4.0 },
  { metric: 'Process Innovation', blue: 3.0, modelE: 4.0, pro: 4.5 },
  { metric: 'Profitability', blue: 4.0, modelE: 1.0, pro: 5.0 },
]

// Vertical Integration Strategy
const integrationData = [
  { component: 'Batteries', level: 95, status: 'BlueOval SK JV' },
  { component: 'Engines', level: 90, status: 'Fully Integrated' },
  { component: 'Transmissions', level: 85, status: 'Mostly Integrated' },
  { component: 'Software', level: 80, status: 'In-house Dev' },
  { component: 'Stamping', level: 75, status: 'Mixed' },
  { component: 'Semiconductors', level: 20, status: 'Outsourced' },
]

// Capacity Utilization Trend
const capacityData = [
  { year: '2020', ice: 78, ev: 15 },
  { year: '2021', ice: 72, ev: 25 },
  { year: '2022', ice: 68, ev: 35 },
  { year: '2023', ice: 65, ev: 48 },
  { year: '2024', ice: 62, ev: 58 },
]

const frameworks = [
  {
    name: 'MIT Decision Category Framework',
    source: 'Hayes & Wheelwright',
    application: 'Ford\'s operations span 8 decision categories split between Structural (facilities, capacity, integration, technology) and Infrastructure (workforce, supply chain, IT, organization). The tri-unit structure enables category-specific optimization.'
  },
  {
    name: 'Skinner\'s Focused Factory',
    source: 'Harvard Business Review, 1974',
    application: 'Ford\'s separation into Blue (ICE), Model e (EV), and Pro (Commercial) creates focused factories within each unit. This reduces complexity and enables targeted manufacturing excellence for distinct product families.'
  },
  {
    name: 'Resource-Based View (RBV)',
    source: 'Barney, 1991',
    application: 'Ford Pro\'s software capabilities and Ford Blue\'s truck manufacturing heritage represent VRIN resources. BlueOval SK battery JV represents strategic capability building for EV competitiveness.'
  },
]

const findings = [
  {
    title: 'Global Manufacturing Footprint',
    description: '41 manufacturing plants across 24 countries with 375+ total operations facilities.',
    metric: '4.25M annual production capacity'
  },
  {
    title: 'Ford Pro: Strategic Exemplar',
    description: 'Highest strategic fit scores across all dimensions with 13.5% EBIT margin and growing software services revenue.',
    metric: '5-Star Strategic Alignment'
  },
  {
    title: 'BlueOval SK Integration',
    description: 'Critical $11B+ battery vertical integration investment with SK On for domestic EV production.',
    metric: '2 Battery Plants (TN + KY)'
  },
  {
    title: 'Model e Capacity Challenge',
    description: 'EV capacity utilization at ~58% as demand ramps slower than projected. ICE excess capacity creates cost burden.',
    metric: 'Capacity Utilization: 58-73%'
  },
]

const COLORS = {
  blue: '#003478',
  modelE: '#FF6B00',
  pro: '#10B981',
  structural: '#8B5CF6',
  infrastructure: '#06B6D4'
}

// Custom tooltip
const CustomTooltip = ({ active, payload, label, darkMode }) => {
  if (active && payload && payload.length) {
    return (
      <div className={`p-3 rounded-lg shadow-lg border ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
        <p className={`font-semibold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {typeof entry.value === 'number' ? entry.value.toFixed(1) : entry.value}
          </p>
        ))}
      </div>
    )
  }
  return null
}

// Manufacturing Footprint Card
const FootprintCard = ({ item, darkMode }) => (
  <div className={`p-4 rounded-lg text-center ${darkMode ? 'bg-slate-800' : 'bg-slate-50'}`}>
    <p className={`text-3xl font-bold ${darkMode ? 'text-[#60A5FA]' : 'text-[#003478]'}`}>
      {item.value}{item.value === 375 ? '+' : ''}
    </p>
    <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-slate-900'}`}>{item.name}</p>
    <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{item.description}</p>
  </div>
)

export default function OperationsDashboard({ darkMode }) {
  return (
    <AssignmentDashboard
      title="Operations Strategy"
      assignment="05"
      subtitle="MIT Framework & Resource-Based View"
      frameworks={frameworks}
      findings={findings}
      darkMode={darkMode}
    >
      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Business Unit Performance */}
        <div className={`rounded-xl p-6 ${darkMode ? 'bg-[#1E293B]' : 'bg-white'} shadow-lg`}>
          <h3 className={`text-lg font-semibold mb-1 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            Business Unit Performance (2024)
          </h3>
          <p className={`text-xs mb-4 ${darkMode ? 'text-slate-500' : 'text-slate-500'}`}>
            Revenue ($B) and EBIT ($B) by segment
          </p>
          <ResponsiveContainer width="100%" height={280}>
            <ComposedChart data={businessUnitData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#334155' : '#e2e8f0'} />
              <XAxis type="number" stroke={darkMode ? '#94a3b8' : '#64748b'} tick={{ fontSize: 11 }} />
              <YAxis dataKey="name" type="category" stroke={darkMode ? '#94a3b8' : '#64748b'} tick={{ fontSize: 11 }} width={80} />
              <Tooltip content={<CustomTooltip darkMode={darkMode} />} />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Bar dataKey="revenue" name="Revenue ($B)" radius={[0, 4, 4, 0]}>
                {businessUnitData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} opacity={0.7} />
                ))}
              </Bar>
              <Bar dataKey="ebit" name="EBIT ($B)" radius={[0, 4, 4, 0]}>
                {businessUnitData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Manufacturing Footprint */}
        <div className={`rounded-xl p-6 ${darkMode ? 'bg-[#1E293B]' : 'bg-white'} shadow-lg`}>
          <h3 className={`text-lg font-semibold mb-1 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            Global Manufacturing Footprint
          </h3>
          <p className={`text-xs mb-4 ${darkMode ? 'text-slate-500' : 'text-slate-500'}`}>
            Ford&apos;s worldwide operations infrastructure
          </p>
          <div className="grid grid-cols-2 gap-4 mb-4">
            {manufacturingData.map((item, idx) => (
              <FootprintCard key={idx} item={item} darkMode={darkMode} />
            ))}
          </div>
          <p className={`text-xs text-center ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Key JVs: BlueOval SK (batteries), Ford Otosan (Turkey), Changan Ford (China)
          </p>
        </div>

        {/* MIT Decision Categories */}
        <div className={`rounded-xl p-6 ${darkMode ? 'bg-[#1E293B]' : 'bg-white'} shadow-lg`}>
          <h3 className={`text-lg font-semibold mb-1 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            MIT Decision Categories
          </h3>
          <p className={`text-xs mb-4 ${darkMode ? 'text-slate-500' : 'text-slate-500'}`}>
            Structural vs Infrastructure focus by category (%)
          </p>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={mitCategoriesData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#334155' : '#e2e8f0'} />
              <XAxis type="number" stroke={darkMode ? '#94a3b8' : '#64748b'} tick={{ fontSize: 11 }} domain={[0, 100]} />
              <YAxis dataKey="category" type="category" stroke={darkMode ? '#94a3b8' : '#64748b'} tick={{ fontSize: 10 }} width={85} />
              <Tooltip content={<CustomTooltip darkMode={darkMode} />} />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Bar dataKey="structural" stackId="a" fill={COLORS.structural} name="Structural %" />
              <Bar dataKey="infrastructure" stackId="a" fill={COLORS.infrastructure} name="Infrastructure %" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Strategic Fit Radar */}
        <div className={`rounded-xl p-6 ${darkMode ? 'bg-[#1E293B]' : 'bg-white'} shadow-lg`}>
          <h3 className={`text-lg font-semibold mb-1 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            Strategic Fit by Business Unit
          </h3>
          <p className={`text-xs mb-4 ${darkMode ? 'text-slate-500' : 'text-slate-500'}`}>
            Resource-based alignment scores (1-5 scale)
          </p>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={strategicFitData}>
              <PolarGrid stroke={darkMode ? '#334155' : '#e2e8f0'} />
              <PolarAngleAxis dataKey="metric" stroke={darkMode ? '#94a3b8' : '#64748b'} tick={{ fontSize: 9 }} />
              <PolarRadiusAxis angle={30} domain={[0, 5]} stroke={darkMode ? '#94a3b8' : '#64748b'} tick={{ fontSize: 9 }} />
              <Radar name="Ford Blue" dataKey="blue" stroke={COLORS.blue} fill={COLORS.blue} fillOpacity={0.3} strokeWidth={2} />
              <Radar name="Model e" dataKey="modelE" stroke={COLORS.modelE} fill={COLORS.modelE} fillOpacity={0.3} strokeWidth={2} />
              <Radar name="Ford Pro" dataKey="pro" stroke={COLORS.pro} fill={COLORS.pro} fillOpacity={0.4} strokeWidth={2} />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Vertical Integration Strategy - Full Width */}
        <div className={`lg:col-span-2 rounded-xl p-6 ${darkMode ? 'bg-[#1E293B]' : 'bg-white'} shadow-lg`}>
          <h3 className={`text-lg font-semibold mb-1 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            Vertical Integration Strategy
          </h3>
          <p className={`text-xs mb-4 ${darkMode ? 'text-slate-500' : 'text-slate-500'}`}>
            Make vs Buy decisions across key component categories
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={integrationData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#334155' : '#e2e8f0'} />
                <XAxis type="number" stroke={darkMode ? '#94a3b8' : '#64748b'} tick={{ fontSize: 11 }} domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
                <YAxis dataKey="component" type="category" stroke={darkMode ? '#94a3b8' : '#64748b'} tick={{ fontSize: 11 }} width={100} />
                <Tooltip
                  formatter={(value) => [`${value}%`, 'Integration Level']}
                  contentStyle={{ backgroundColor: darkMode ? '#1e293b' : '#fff', borderColor: darkMode ? '#334155' : '#e2e8f0' }}
                  labelStyle={{ color: darkMode ? '#fff' : '#000' }}
                />
                <Bar dataKey="level" name="Integration Level" fill="#003478" radius={[0, 4, 4, 0]}>
                  {integrationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.level > 70 ? '#10B981' : entry.level > 40 ? '#F59E0B' : '#EF4444'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div className="space-y-3">
              <div className={`p-4 rounded-lg border-l-4 border-green-500 ${darkMode ? 'bg-slate-800' : 'bg-green-50'}`}>
                <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-slate-900'}`}>High Integration (70%+)</h4>
                <p className={`text-sm ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                  Batteries, Engines, Transmissions - Core capabilities with strategic control
                </p>
              </div>
              <div className={`p-4 rounded-lg border-l-4 border-yellow-500 ${darkMode ? 'bg-slate-800' : 'bg-yellow-50'}`}>
                <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-slate-900'}`}>Medium Integration (40-70%)</h4>
                <p className={`text-sm ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                  Software, Stamping - Mixed model balancing capability and flexibility
                </p>
              </div>
              <div className={`p-4 rounded-lg border-l-4 border-red-500 ${darkMode ? 'bg-slate-800' : 'bg-red-50'}`}>
                <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-slate-900'}`}>Low Integration (&lt;40%)</h4>
                <p className={`text-sm ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                  Semiconductors - Outsourced due to capital/expertise requirements
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Capacity Utilization Trend - Full Width */}
        <div className={`lg:col-span-2 rounded-xl p-6 ${darkMode ? 'bg-[#1E293B]' : 'bg-white'} shadow-lg`}>
          <h3 className={`text-lg font-semibold mb-1 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            Capacity Utilization Trend
          </h3>
          <p className={`text-xs mb-4 ${darkMode ? 'text-slate-500' : 'text-slate-500'}`}>
            ICE vs EV capacity utilization (2020-2024) - Illustrating the transition challenge
          </p>
          <ResponsiveContainer width="100%" height={250}>
            <ComposedChart data={capacityData}>
              <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#334155' : '#e2e8f0'} />
              <XAxis dataKey="year" stroke={darkMode ? '#94a3b8' : '#64748b'} tick={{ fontSize: 11 }} />
              <YAxis stroke={darkMode ? '#94a3b8' : '#64748b'} tick={{ fontSize: 11 }} domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
              <Tooltip content={<CustomTooltip darkMode={darkMode} />} />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Bar dataKey="ice" fill={COLORS.blue} name="ICE Utilization %" opacity={0.7} />
              <Bar dataKey="ev" fill={COLORS.modelE} name="EV Utilization %" opacity={0.7} />
              <Line type="monotone" dataKey="ice" stroke={COLORS.blue} strokeWidth={2} dot={false} name="ICE Trend" />
              <Line type="monotone" dataKey="ev" stroke={COLORS.modelE} strokeWidth={2} dot={false} name="EV Trend" />
            </ComposedChart>
          </ResponsiveContainer>
          <p className={`text-xs mt-2 text-center ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            ICE capacity declining while EV ramps - creating transitional cost burden from underutilized legacy assets
          </p>
        </div>
      </div>
    </AssignmentDashboard>
  )
}
