import { AreaChart, Area, BarChart, Bar, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import AssignmentDashboard from './AssignmentDashboard'

// Marketing ROI Trend Data
const roiData = [
  { year: '2019', roi: 0.32 },
  { year: '2020', roi: 0.85 },
  { year: '2021', roi: 1.24 },
  { year: '2022', roi: 1.56 },
  { year: '2023', roi: 1.89 },
  { year: '2024', roi: 2.11 },
]

// Segment Performance Data
const segmentData = [
  { year: '2019', trucks: 40, suvs: 35, cars: 23, evs: 2 },
  { year: '2020', trucks: 42, suvs: 36, cars: 19, evs: 3 },
  { year: '2021', trucks: 43, suvs: 36, cars: 16, evs: 5 },
  { year: '2022', trucks: 44, suvs: 37, cars: 13, evs: 6 },
  { year: '2023', trucks: 45, suvs: 37, cars: 10, evs: 8 },
  { year: '2024', trucks: 45, suvs: 37, cars: 9, evs: 9 },
]

// Competitive Analysis Radar Data
const competitiveData = [
  { metric: 'Market Share', ford: 14.2, gm: 16.1, toyota: 15.8, stellantis: 10.5 },
  { metric: 'Truck Loyalty', ford: 65.1, gm: 58.4, toyota: 61.2, stellantis: 52.1 },
  { metric: 'Brand Value ($B)', ford: 22.9, gm: 18.2, toyota: 51.9, stellantis: 12.4 },
  { metric: 'Digital Mix %', ford: 65, gm: 58, toyota: 52, stellantis: 48 },
  { metric: 'Marketing Efficiency', ford: 85, gm: 72, toyota: 78, stellantis: 65 },
]

// Campaign Performance (Ready, Set, Ford)
const campaignData = [
  { metric: 'Brand Awareness', before: 68, after: 74, change: '+6%' },
  { metric: 'Consideration Rate', before: 42, after: 48, change: '+6%' },
  { metric: 'Digital Engagement', before: 3.8, after: 5.2, change: '+37%' },
  { metric: 'Lead Generation (K)', before: 124, after: 168, change: '+35%' },
]

// Digital vs Traditional Mix
const digitalMixData = [
  { year: '2019', digital: 45, traditional: 55 },
  { year: '2020', digital: 52, traditional: 48 },
  { year: '2021', digital: 56, traditional: 44 },
  { year: '2022', digital: 60, traditional: 40 },
  { year: '2023', digital: 63, traditional: 37 },
  { year: '2024', digital: 65, traditional: 35 },
]

// Channel ROI Data
const channelRoiData = [
  { name: 'FordPass App', roi: 4.8, engagement: 68 },
  { name: 'Email Marketing', roi: 5.1, engagement: 3.5 },
  { name: 'Website', roi: 3.2, engagement: 1.2 },
  { name: 'Social Media', roi: 2.1, engagement: 4.2 },
  { name: 'Video/OTT', roi: 2.7, engagement: 2.8 },
  { name: 'Display Ads', roi: 1.4, engagement: 0.05 },
]

const frameworks = [
  {
    name: 'STP Framework',
    source: 'Dolan & John, 2024',
    application: 'Ford restructured marketing around three lifestyle segments - Build (work-focused), Thrill (performance), and Adventure (outdoor) - rather than traditional product-first categories. This enables targeted messaging that resonates with customer aspirations.'
  },
  {
    name: 'Consumer Decision-Making',
    source: 'Behavioral Economics',
    application: 'Recognized that vehicle purchases involve both cognitive (specs, price) and emotional (lifestyle, identity) factors. Ford\'s "Ready, Set, Ford" campaign emphasizes emotional connection while maintaining rational value propositions.'
  },
  {
    name: 'Marketing Mix Evolution (4Ps → 7Ps)',
    source: 'Services Marketing',
    application: 'Extended traditional 4Ps with People (dealer training), Process (digital buying journey), and Physical Evidence (brand experience centers). Ford Pro exemplifies this with integrated service offerings beyond just vehicles.'
  },
]

const findings = [
  {
    title: 'Industry-Leading Truck Loyalty',
    description: 'Ford dominates truck loyalty, outperforming the industry average by 12.4 percentage points.',
    metric: '65.1% vs 52.7% industry average'
  },
  {
    title: 'Marketing ROI Transformation',
    description: 'Systematic improvement in marketing efficiency through digital transformation and better targeting.',
    metric: '0.32 → 2.11 ROI (559% improvement)'
  },
  {
    title: 'Best-in-Class Efficiency',
    description: 'Ford spends less on marketing as a percentage of revenue than competitors while achieving strong results.',
    metric: '1.51% of revenue (vs GM 1.90%, Stellantis 2.10%)'
  },
  {
    title: '"Ready, Set, Ford" Success',
    description: 'September 2024 campaign launch drove significant improvements across all key metrics.',
    metric: '+35% lead generation, +37% digital engagement'
  },
]

const COLORS = ['#003478', '#00A550', '#FF6B00', '#8B5CF6']

// Custom tooltip
const CustomTooltip = ({ active, payload, label, darkMode }) => {
  if (active && payload && payload.length) {
    return (
      <div className={`p-3 rounded-lg shadow-lg border ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
        <p className={`font-semibold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {typeof entry.value === 'number' ? entry.value.toFixed(1) : entry.value}
            {entry.name.includes('%') || entry.name.includes('Mix') ? '%' : ''}
          </p>
        ))}
      </div>
    )
  }
  return null
}

export default function MarketingDashboard({ darkMode }) {
  return (
    <AssignmentDashboard
      title="Marketing Intelligence"
      assignment="03"
      subtitle="Marketing Evolution & STP Analysis"
      frameworks={frameworks}
      findings={findings}
      darkMode={darkMode}
    >
      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Marketing ROI Trend */}
        <div className={`rounded-xl p-6 ${darkMode ? 'bg-[#1E293B]' : 'bg-white'} shadow-lg`}>
          <h3 className={`text-lg font-semibold mb-1 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            Marketing ROI Trend
          </h3>
          <p className={`text-xs mb-4 ${darkMode ? 'text-slate-500' : 'text-slate-500'}`}>
            Return on marketing investment (2019-2024)
          </p>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={roiData}>
              <defs>
                <linearGradient id="colorRoi" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#334155' : '#e2e8f0'} />
              <XAxis dataKey="year" stroke={darkMode ? '#94a3b8' : '#64748b'} tick={{ fontSize: 11 }} />
              <YAxis stroke={darkMode ? '#94a3b8' : '#64748b'} tick={{ fontSize: 11 }} domain={[0, 2.5]} />
              <Tooltip content={<CustomTooltip darkMode={darkMode} />} />
              <Area type="monotone" dataKey="roi" fill="url(#colorRoi)" stroke="#10B981" strokeWidth={3} name="Marketing ROI" dot={{ r: 4, fill: '#10B981' }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Segment Allocation */}
        <div className={`rounded-xl p-6 ${darkMode ? 'bg-[#1E293B]' : 'bg-white'} shadow-lg`}>
          <h3 className={`text-lg font-semibold mb-1 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            Marketing Budget by Segment
          </h3>
          <p className={`text-xs mb-4 ${darkMode ? 'text-slate-500' : 'text-slate-500'}`}>
            Budget allocation shift toward trucks/SUVs and away from cars (%)
          </p>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={segmentData}>
              <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#334155' : '#e2e8f0'} />
              <XAxis dataKey="year" stroke={darkMode ? '#94a3b8' : '#64748b'} tick={{ fontSize: 11 }} />
              <YAxis stroke={darkMode ? '#94a3b8' : '#64748b'} tick={{ fontSize: 11 }} />
              <Tooltip content={<CustomTooltip darkMode={darkMode} />} />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Bar dataKey="trucks" stackId="a" fill="#003478" name="Trucks %" />
              <Bar dataKey="suvs" stackId="a" fill="#0076CE" name="SUVs %" />
              <Bar dataKey="cars" stackId="a" fill="#94a3b8" name="Cars %" />
              <Bar dataKey="evs" stackId="a" fill="#FF6B00" name="EVs %" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Competitive Radar */}
        <div className={`rounded-xl p-6 ${darkMode ? 'bg-[#1E293B]' : 'bg-white'} shadow-lg`}>
          <h3 className={`text-lg font-semibold mb-1 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            Competitive Analysis
          </h3>
          <p className={`text-xs mb-4 ${darkMode ? 'text-slate-500' : 'text-slate-500'}`}>
            Ford vs competitors across key marketing metrics (normalized scale)
          </p>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={competitiveData}>
              <PolarGrid stroke={darkMode ? '#334155' : '#e2e8f0'} />
              <PolarAngleAxis dataKey="metric" stroke={darkMode ? '#94a3b8' : '#64748b'} tick={{ fontSize: 10 }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} stroke={darkMode ? '#94a3b8' : '#64748b'} tick={{ fontSize: 9 }} />
              <Radar name="Ford" dataKey="ford" stroke="#003478" fill="#003478" fillOpacity={0.4} strokeWidth={2} />
              <Radar name="GM" dataKey="gm" stroke="#EF4444" fill="#EF4444" fillOpacity={0.2} strokeWidth={2} />
              <Radar name="Toyota" dataKey="toyota" stroke="#10B981" fill="#10B981" fillOpacity={0.2} strokeWidth={2} />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Campaign Performance */}
        <div className={`rounded-xl p-6 ${darkMode ? 'bg-[#1E293B]' : 'bg-white'} shadow-lg`}>
          <h3 className={`text-lg font-semibold mb-1 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            "Ready, Set, Ford" Campaign Results
          </h3>
          <p className={`text-xs mb-4 ${darkMode ? 'text-slate-500' : 'text-slate-500'}`}>
            Before vs After campaign launch (September 2024)
          </p>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={campaignData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#334155' : '#e2e8f0'} />
              <XAxis type="number" stroke={darkMode ? '#94a3b8' : '#64748b'} tick={{ fontSize: 11 }} />
              <YAxis dataKey="metric" type="category" stroke={darkMode ? '#94a3b8' : '#64748b'} tick={{ fontSize: 10 }} width={100} />
              <Tooltip content={<CustomTooltip darkMode={darkMode} />} />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Bar dataKey="before" fill="#94a3b8" name="Before Campaign" radius={[0, 4, 4, 0]} />
              <Bar dataKey="after" fill="#003478" name="After Campaign" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Digital Transformation - Full Width */}
        <div className={`lg:col-span-2 rounded-xl p-6 ${darkMode ? 'bg-[#1E293B]' : 'bg-white'} shadow-lg`}>
          <h3 className={`text-lg font-semibold mb-1 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            Digital Transformation Journey
          </h3>
          <p className={`text-xs mb-4 ${darkMode ? 'text-slate-500' : 'text-slate-500'}`}>
            Shift from traditional to digital marketing channels (% of total spend)
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={digitalMixData}>
                <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#334155' : '#e2e8f0'} />
                <XAxis dataKey="year" stroke={darkMode ? '#94a3b8' : '#64748b'} tick={{ fontSize: 11 }} />
                <YAxis stroke={darkMode ? '#94a3b8' : '#64748b'} tick={{ fontSize: 11 }} domain={[0, 100]} />
                <Tooltip content={<CustomTooltip darkMode={darkMode} />} />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Area type="monotone" dataKey="digital" stackId="1" fill="#003478" stroke="#003478" name="Digital Mix %" />
                <Area type="monotone" dataKey="traditional" stackId="1" fill="#94a3b8" stroke="#94a3b8" name="Traditional Mix %" />
              </AreaChart>
            </ResponsiveContainer>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={channelRoiData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#334155' : '#e2e8f0'} />
                <XAxis type="number" stroke={darkMode ? '#94a3b8' : '#64748b'} tick={{ fontSize: 11 }} />
                <YAxis dataKey="name" type="category" stroke={darkMode ? '#94a3b8' : '#64748b'} tick={{ fontSize: 10 }} width={90} />
                <Tooltip content={<CustomTooltip darkMode={darkMode} />} />
                <Bar dataKey="roi" fill="#10B981" name="Channel ROI" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className={`text-xs mt-2 text-center ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Digital channels now represent 65% of marketing spend, with FordPass App (4.8x ROI) and Email (5.1x ROI) delivering highest returns
          </p>
        </div>
      </div>
    </AssignmentDashboard>
  )
}
