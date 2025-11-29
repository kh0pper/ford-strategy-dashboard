import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, BarChart, Bar, ComposedChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell, Area, AreaChart } from 'recharts'
import AssignmentDashboard from './AssignmentDashboard'

// Birkinshaw & Goddard 4-D Management Model Evolution
// Converted to numeric scale: 1=Traditional, 5=Progressive
const managementModelData = [
  { dimension: 'Objectives', d2020: 2, d2022: 4, d2025: 3, fullMark: 5 },
  { dimension: 'Motivation', d2020: 2, d2022: 4, d2025: 3, fullMark: 5 },
  { dimension: 'Coordination', d2020: 1, d2022: 4, d2025: 3, fullMark: 5 },
  { dimension: 'Decisions', d2020: 1, d2022: 4, d2025: 3, fullMark: 5 },
]

// Business Unit Performance Data (2022-2024)
const businessUnitData = [
  { year: '2022', blueRev: 77.5, blueEBIT: 7.2, modelERev: 3.0, modelEEBIT: -2.1, proRev: 45.0, proEBIT: 7.2 },
  { year: '2023', blueRev: 76.5, blueEBIT: 6.4, modelERev: 5.2, modelEEBIT: -4.7, proRev: 48.0, proEBIT: 7.2 },
  { year: '2024', blueRev: 75.0, blueEBIT: 5.6, modelERev: 7.0, modelEEBIT: -5.4, proRev: 53.0, proEBIT: 8.1 },
]

// SIR (Strategy Implementation Roadmap) Scores by Business Unit
const sirData = [
  { pillar: 'Strategy', blue: 4.0, modelE: 3.5, pro: 4.5 },
  { pillar: 'Governance', blue: 3.5, modelE: 3.0, pro: 4.0 },
  { pillar: 'Leadership', blue: 3.5, modelE: 3.0, pro: 4.5 },
  { pillar: 'Resources', blue: 4.0, modelE: 3.5, pro: 4.0 },
  { pillar: 'Culture', blue: 3.0, modelE: 2.5, pro: 4.0 },
  { pillar: 'Agility', blue: 3.0, modelE: 3.5, pro: 4.5 },
  { pillar: 'Performance', blue: 3.5, modelE: 2.0, pro: 4.5 },
]

// Strategic Timeline Data
const timelineData = [
  { year: '2020', theme: 'Turnaround', score: 2.5 },
  { year: '2021', theme: 'Ford+ Launch', score: 3.5 },
  { year: '2022', theme: 'Restructure', score: 4.0 },
  { year: '2023', theme: 'Optimization', score: 3.8 },
  { year: '2024', theme: 'Efficiency', score: 3.5 },
  { year: '2025', theme: 'Rebalancing', score: 3.3 },
]

// EBIT Margin by Unit
const marginData = [
  { name: 'Ford Pro', margin: 15.3, color: '#10B981' },
  { name: 'Ford Blue', margin: 7.5, color: '#003478' },
  { name: 'Model e', margin: -77.1, color: '#EF4444' },
]

const frameworks = [
  {
    name: 'Birkinshaw & Goddard 4-Dimension Model',
    source: 'MIT Sloan Management Review',
    application: 'Ford\'s management approach evolved from traditional hierarchical (2020) to progressive emergence-based during Ford+ (2022-2024), now rebalancing toward accountability in 2025 with new CSO role and performance-based compensation.'
  },
  {
    name: 'Nieto-Rodriguez Strategy Implementation Roadmap (SIR)',
    source: 'Harvard Business Review, 2022',
    application: 'Evaluated Ford\'s three business units across 7 pillars. Ford Pro scores highest (4.2/5.0) with clear strategy and execution. Model e scores lowest (3.0/5.0) due to $5.4B losses creating cultural tensions.'
  },
  {
    name: 'Kay\'s Obliquity Concept',
    source: 'Oblique Strategy Framework',
    application: 'Ford+ embraced obliquity with vision of "customer freedom" rather than pure profit maximization. 2025 pivot suggests return toward more direct goal-setting as EV losses pressure leadership.'
  },
]

const findings = [
  {
    title: 'Overall SIR Score',
    description: 'Ford\'s average strategy implementation readiness across all business units.',
    metric: '3.3 / 5.0'
  },
  {
    title: 'Ford Pro: Execution Excellence',
    description: 'Commercial business exemplifies balanced management with highest scores across all SIR pillars.',
    metric: '4.2/5.0 SIR Score, 15.3% EBIT Margin'
  },
  {
    title: 'Model e: Strategic Tensions',
    description: '$5.4B cumulative losses creating cultural friction and pressure for cost discipline.',
    metric: '-77.1% EBIT Margin (2024)'
  },
  {
    title: '2025 Leadership Pivot',
    description: 'New CSO (Gjaja), CFO (House), and Vice Chair-Strategy (Lawler) signal strategic rebalancing.',
    metric: 'February 2025 restructure'
  },
]

const COLORS = {
  blue: '#003478',
  modelE: '#FF6B00',
  pro: '#10B981',
  gray: '#94a3b8'
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

// SIR Heatmap Cell Component
const SIRHeatmap = ({ data, darkMode }) => {
  const getColor = (score) => {
    if (score >= 4.0) return 'bg-green-500'
    if (score >= 3.5) return 'bg-green-400'
    if (score >= 3.0) return 'bg-yellow-400'
    if (score >= 2.5) return 'bg-orange-400'
    return 'bg-red-400'
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr>
            <th className={`p-2 text-left ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>SIR Pillar</th>
            <th className={`p-2 text-center ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Ford Blue</th>
            <th className={`p-2 text-center ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Model e</th>
            <th className={`p-2 text-center ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Ford Pro</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx} className={darkMode ? 'border-slate-700' : 'border-slate-200'}>
              <td className={`p-2 font-medium ${darkMode ? 'text-white' : 'text-slate-900'}`}>{row.pillar}</td>
              <td className="p-1">
                <div className={`${getColor(row.blue)} text-white text-center py-1 px-2 rounded font-semibold`}>
                  {row.blue.toFixed(1)}
                </div>
              </td>
              <td className="p-1">
                <div className={`${getColor(row.modelE)} text-white text-center py-1 px-2 rounded font-semibold`}>
                  {row.modelE.toFixed(1)}
                </div>
              </td>
              <td className="p-1">
                <div className={`${getColor(row.pro)} text-white text-center py-1 px-2 rounded font-semibold`}>
                  {row.pro.toFixed(1)}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className={`border-t-2 ${darkMode ? 'border-slate-600' : 'border-slate-300'}`}>
            <td className={`p-2 font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>Average</td>
            <td className="p-2 text-center font-bold" style={{ color: COLORS.blue }}>3.5</td>
            <td className="p-2 text-center font-bold" style={{ color: COLORS.modelE }}>3.0</td>
            <td className="p-2 text-center font-bold" style={{ color: COLORS.pro }}>4.2</td>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}

export default function ManagementDashboard({ darkMode }) {
  return (
    <AssignmentDashboard
      title="Management Strategy"
      assignment="04"
      subtitle="Birkinshaw & Goddard Analysis"
      frameworks={frameworks}
      findings={findings}
      darkMode={darkMode}
    >
      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Management Model Evolution Radar */}
        <div className={`rounded-xl p-6 ${darkMode ? 'bg-[#1E293B]' : 'bg-white'} shadow-lg`}>
          <h3 className={`text-lg font-semibold mb-1 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            Management Model Evolution
          </h3>
          <p className={`text-xs mb-4 ${darkMode ? 'text-slate-500' : 'text-slate-500'}`}>
            Birkinshaw & Goddard 4-D Model (1=Traditional, 5=Progressive)
          </p>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={managementModelData}>
              <PolarGrid stroke={darkMode ? '#334155' : '#e2e8f0'} />
              <PolarAngleAxis dataKey="dimension" stroke={darkMode ? '#94a3b8' : '#64748b'} tick={{ fontSize: 11 }} />
              <PolarRadiusAxis angle={30} domain={[0, 5]} stroke={darkMode ? '#94a3b8' : '#64748b'} tick={{ fontSize: 9 }} />
              <Radar name="2020" dataKey="d2020" stroke="#94a3b8" fill="#94a3b8" fillOpacity={0.2} strokeWidth={2} />
              <Radar name="2022-24" dataKey="d2022" stroke="#10B981" fill="#10B981" fillOpacity={0.3} strokeWidth={2} />
              <Radar name="2025" dataKey="d2025" stroke="#003478" fill="#003478" fillOpacity={0.4} strokeWidth={2} />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* SIR Heatmap */}
        <div className={`rounded-xl p-6 ${darkMode ? 'bg-[#1E293B]' : 'bg-white'} shadow-lg`}>
          <h3 className={`text-lg font-semibold mb-1 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            Strategy Implementation Readiness
          </h3>
          <p className={`text-xs mb-4 ${darkMode ? 'text-slate-500' : 'text-slate-500'}`}>
            Nieto-Rodriguez SIR scores by business unit (scale: 1-5)
          </p>
          <SIRHeatmap data={sirData} darkMode={darkMode} />
        </div>

        {/* Business Unit Revenue & EBIT */}
        <div className={`rounded-xl p-6 ${darkMode ? 'bg-[#1E293B]' : 'bg-white'} shadow-lg`}>
          <h3 className={`text-lg font-semibold mb-1 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            Business Unit Performance
          </h3>
          <p className={`text-xs mb-4 ${darkMode ? 'text-slate-500' : 'text-slate-500'}`}>
            Revenue ($B) and EBIT ($B) by segment (2022-2024)
          </p>
          <ResponsiveContainer width="100%" height={280}>
            <ComposedChart data={businessUnitData}>
              <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#334155' : '#e2e8f0'} />
              <XAxis dataKey="year" stroke={darkMode ? '#94a3b8' : '#64748b'} tick={{ fontSize: 11 }} />
              <YAxis yAxisId="left" stroke={darkMode ? '#94a3b8' : '#64748b'} tick={{ fontSize: 11 }} />
              <YAxis yAxisId="right" orientation="right" stroke={darkMode ? '#94a3b8' : '#64748b'} tick={{ fontSize: 11 }} domain={[-8, 10]} />
              <Tooltip content={<CustomTooltip darkMode={darkMode} />} />
              <Legend wrapperStyle={{ fontSize: '10px' }} />
              <Bar yAxisId="left" dataKey="blueRev" fill={COLORS.blue} name="Blue Rev" opacity={0.7} />
              <Bar yAxisId="left" dataKey="proRev" fill={COLORS.pro} name="Pro Rev" opacity={0.7} />
              <Bar yAxisId="left" dataKey="modelERev" fill={COLORS.modelE} name="Model e Rev" opacity={0.7} />
              <Line yAxisId="right" type="monotone" dataKey="proEBIT" stroke={COLORS.pro} strokeWidth={3} name="Pro EBIT" dot={{ r: 4 }} />
              <Line yAxisId="right" type="monotone" dataKey="blueEBIT" stroke={COLORS.blue} strokeWidth={3} name="Blue EBIT" dot={{ r: 4 }} />
              <Line yAxisId="right" type="monotone" dataKey="modelEEBIT" stroke={COLORS.modelE} strokeWidth={3} name="Model e EBIT" dot={{ r: 4 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* EBIT Margin Comparison */}
        <div className={`rounded-xl p-6 ${darkMode ? 'bg-[#1E293B]' : 'bg-white'} shadow-lg`}>
          <h3 className={`text-lg font-semibold mb-1 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            EBIT Margin by Business Unit
          </h3>
          <p className={`text-xs mb-4 ${darkMode ? 'text-slate-500' : 'text-slate-500'}`}>
            2024 operating margins reveal stark performance differences
          </p>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={marginData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#334155' : '#e2e8f0'} />
              <XAxis type="number" stroke={darkMode ? '#94a3b8' : '#64748b'} tick={{ fontSize: 11 }} domain={[-100, 20]} tickFormatter={(v) => `${v}%`} />
              <YAxis dataKey="name" type="category" stroke={darkMode ? '#94a3b8' : '#64748b'} tick={{ fontSize: 11 }} width={80} />
              <Tooltip
                formatter={(value) => [`${value.toFixed(1)}%`, 'EBIT Margin']}
                contentStyle={{ backgroundColor: darkMode ? '#1e293b' : '#fff', borderColor: darkMode ? '#334155' : '#e2e8f0' }}
                labelStyle={{ color: darkMode ? '#fff' : '#000' }}
              />
              <Bar dataKey="margin" name="EBIT Margin" radius={[0, 4, 4, 0]}>
                {marginData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <p className={`text-xs mt-2 text-center ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Ford Pro&apos;s 15.3% margin subsidizes Model e&apos;s ongoing EV investment losses
          </p>
        </div>

        {/* Strategic Evolution Timeline - Full Width */}
        <div className={`lg:col-span-2 rounded-xl p-6 ${darkMode ? 'bg-[#1E293B]' : 'bg-white'} shadow-lg`}>
          <h3 className={`text-lg font-semibold mb-1 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            Strategic Evolution Timeline
          </h3>
          <p className={`text-xs mb-4 ${darkMode ? 'text-slate-500' : 'text-slate-500'}`}>
            Ford&apos;s management transformation from turnaround to rebalancing
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={timelineData}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#003478" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#003478" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#334155' : '#e2e8f0'} />
                <XAxis dataKey="year" stroke={darkMode ? '#94a3b8' : '#64748b'} tick={{ fontSize: 11 }} />
                <YAxis stroke={darkMode ? '#94a3b8' : '#64748b'} tick={{ fontSize: 11 }} domain={[0, 5]} />
                <Tooltip content={<CustomTooltip darkMode={darkMode} />} />
                <Area type="monotone" dataKey="score" fill="url(#colorScore)" stroke="#003478" strokeWidth={3} name="Management Score" dot={{ r: 5, fill: '#003478' }} />
              </AreaChart>
            </ResponsiveContainer>
            <div className="space-y-3">
              {[
                { year: '2020', event: 'Jim Farley becomes CEO (Oct)', theme: 'Turnaround focus' },
                { year: '2021', event: 'Ford+ Plan announced (May)', theme: 'Transformation begins' },
                { year: '2022', event: 'Three business units created (Mar)', theme: 'Structural reorganization' },
                { year: '2023', event: 'Pro profitability, Model e cost focus', theme: 'Execution phase' },
                { year: '2024', event: '$1B cost savings initiative', theme: 'Efficiency drive' },
                { year: '2025', event: 'New CSO, CFO, strategy structure', theme: 'Rebalancing' },
              ].map((item, idx) => (
                <div key={idx} className={`flex items-start space-x-3 p-2 rounded ${darkMode ? 'bg-slate-800/50' : 'bg-slate-50'}`}>
                  <span className={`font-bold text-sm min-w-[45px] ${darkMode ? 'text-[#60A5FA]' : 'text-[#003478]'}`}>{item.year}</span>
                  <div>
                    <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-slate-900'}`}>{item.event}</p>
                    <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{item.theme}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AssignmentDashboard>
  )
}
