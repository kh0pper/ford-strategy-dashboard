import { AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart, Legend } from 'recharts'
import AssignmentDashboard from './AssignmentDashboard'

// Financial data from Ford 10-K (2015-2024)
const revenueData = [
  { year: '2015', revenue: 149.6, grossMargin: 16.8, operatingMargin: 4.7, netMargin: 4.9 },
  { year: '2016', revenue: 151.8, grossMargin: 16.9, operatingMargin: 3.8, netMargin: 3.0 },
  { year: '2017', revenue: 156.8, grossMargin: 16.2, operatingMargin: 3.1, netMargin: 4.9 },
  { year: '2018', revenue: 160.3, grossMargin: 15.0, operatingMargin: 2.0, netMargin: 2.3 },
  { year: '2019', revenue: 155.9, grossMargin: 13.6, operatingMargin: 0.4, netMargin: 0.5 },
  { year: '2020', revenue: 127.1, grossMargin: 11.3, operatingMargin: -3.5, netMargin: -1.0 },
  { year: '2021', revenue: 136.3, grossMargin: 15.9, operatingMargin: 3.3, netMargin: 13.1 },
  { year: '2022', revenue: 158.1, grossMargin: 15.0, operatingMargin: 4.0, netMargin: -1.4 },
  { year: '2023', revenue: 176.2, grossMargin: 14.6, operatingMargin: 3.1, netMargin: 2.5 },
  { year: '2024', revenue: 185.0, grossMargin: 14.4, operatingMargin: 2.8, netMargin: 3.2 },
]

const cashFlowData = [
  { year: '2015', operatingCF: 16.2, capex: -7.2, freeCF: 9.0 },
  { year: '2016', operatingCF: 19.8, capex: -7.0, freeCF: 12.9 },
  { year: '2017', operatingCF: 18.1, capex: -7.0, freeCF: 11.0 },
  { year: '2018', operatingCF: 15.0, capex: -7.8, freeCF: 7.2 },
  { year: '2019', operatingCF: 17.6, capex: -7.6, freeCF: 10.0 },
  { year: '2020', operatingCF: 24.3, capex: -5.7, freeCF: 18.5 },
  { year: '2021', operatingCF: 15.8, capex: -6.2, freeCF: 9.6 },
  { year: '2022', operatingCF: 6.8, capex: -6.9, freeCF: 0.0 },
  { year: '2023', operatingCF: 14.9, capex: -8.2, freeCF: 6.7 },
  { year: '2024', operatingCF: 15.4, capex: -8.7, freeCF: 6.7 },
]

const balanceSheetData = [
  { year: '2015', totalDebt: 133, cash: 4.0, equity: 28.7 },
  { year: '2016', totalDebt: 143, cash: 3.0, equity: 29.2 },
  { year: '2017', totalDebt: 154, cash: 3.5, equity: 34.9 },
  { year: '2018', totalDebt: 154, cash: 2.7, equity: 36.0 },
  { year: '2019', totalDebt: 155, cash: 17.5, equity: 33.2 },
  { year: '2020', totalDebt: 161, cash: 25.2, equity: 30.8 },
  { year: '2021', totalDebt: 138, cash: 20.5, equity: 48.6 },
  { year: '2022', totalDebt: 139, cash: 25.1, equity: 43.2 },
  { year: '2023', totalDebt: 149, cash: 24.9, equity: 42.8 },
  { year: '2024', totalDebt: 159, cash: 22.9, equity: 44.9 },
]

const incomeData = [
  { year: '2015', operatingIncome: 7.0, netIncome: 7.4 },
  { year: '2016', operatingIncome: 5.8, netIncome: 4.6 },
  { year: '2017', operatingIncome: 4.9, netIncome: 7.6 },
  { year: '2018', operatingIncome: 3.2, netIncome: 3.7 },
  { year: '2019', operatingIncome: 0.6, netIncome: 0.8 },
  { year: '2020', operatingIncome: -4.4, netIncome: -1.3 },
  { year: '2021', operatingIncome: 4.5, netIncome: 17.9 },
  { year: '2022', operatingIncome: 6.3, netIncome: -2.2 },
  { year: '2023', operatingIncome: 5.5, netIncome: 4.3 },
  { year: '2024', operatingIncome: 5.2, netIncome: 5.9 },
]

const npvData = [
  { rate: '5%', investmentA: 623.1, investmentB: 354.5 },
  { rate: '8%', investmentA: 490.9, investmentB: 301.4 },
  { rate: '10%', investmentA: 425.7, investmentB: 272.5 },
  { rate: '12%', investmentA: 373.5, investmentB: 247.8 },
  { rate: '15%', investmentA: 313.0, investmentB: 216.8 },
]

const frameworks = [
  {
    name: 'Time Value of Money (TVM)',
    source: 'Luehrman, HBR 2024',
    application: 'Applied to evaluate Ford\'s investment alternatives, demonstrating that $1 today is worth more than $1 in the future. Investment A ($50M/yr for 20 years) consistently outperforms Investment B across all discount rates.'
  },
  {
    name: 'Net Present Value (NPV) Analysis',
    source: 'Financial Statement Analysis',
    application: 'Used to compare investment alternatives at different discount rates (5-15%). Investment A shows NPV advantage of $96M-$269M over Investment B, supporting the recommendation for longer-term strategic investments.'
  },
  {
    name: 'Financial Statement Analysis',
    source: 'GAAP Accounting Principles',
    application: 'Distinguished between accrual-based earnings and cash flows to reveal Ford\'s underlying operational strength. Despite periodic accounting losses, the company generated $91.7B in cumulative Free Cash Flow over the decade.'
  },
]

const findings = [
  {
    title: '3-Phase Transformation',
    description: 'Ford\'s decade reveals three distinct phases: Decline (2015-2018), Strategic Pivot (2018-2020), and Transformation Payoff (2021-2024).',
    metric: '2018: Critical restructuring into Blue/Model e/Pro'
  },
  {
    title: 'Revenue Recovery',
    description: 'From pandemic low to record high, demonstrating resilience and successful strategic execution.',
    metric: '$127B → $185B (+45.6%)'
  },
  {
    title: 'Cash Generation Power',
    description: 'Positive Free Cash Flow in 9 of 10 years despite profitability challenges, enabling internal funding of EV transformation.',
    metric: '$91.7B cumulative FCF'
  },
  {
    title: 'Margin Challenge',
    description: 'Operating margins remain thin (avg 2.4%), leaving little room for error and driving focus on higher-margin trucks/SUVs.',
    metric: '2.8% operating margin (2024)'
  },
]

// Custom tooltip component
const CustomTooltip = ({ active, payload, label, darkMode }) => {
  if (active && payload && payload.length) {
    return (
      <div className={`p-3 rounded-lg shadow-lg border ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
        <p className={`font-semibold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {typeof entry.value === 'number' ? entry.value.toFixed(1) : entry.value}
            {entry.name.includes('Margin') ? '%' : entry.name.includes('Revenue') || entry.name.includes('CF') || entry.name.includes('Income') || entry.name.includes('Debt') || entry.name.includes('Cash') || entry.name.includes('Equity') ? 'B' : entry.name.includes('Investment') ? 'M' : ''}
          </p>
        ))}
      </div>
    )
  }
  return null
}

export default function FinanceDashboard({ darkMode }) {
  return (
    <AssignmentDashboard
      title="Finance & Accounting"
      assignment="02"
      subtitle="10-Year Financial Analysis (2015-2024)"
      frameworks={frameworks}
      findings={findings}
      darkMode={darkMode}
    >
      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue & Margins Chart */}
        <div className={`rounded-xl p-6 ${darkMode ? 'bg-[#1E293B]' : 'bg-white'} shadow-lg`}>
          <h3 className={`text-lg font-semibold mb-1 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            Revenue & Profitability Trends
          </h3>
          <p className={`text-xs mb-4 ${darkMode ? 'text-slate-500' : 'text-slate-500'}`}>
            Revenue ($B) with gross, operating, and net margin trends
          </p>
          <ResponsiveContainer width="100%" height={280}>
            <ComposedChart data={revenueData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#003478" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#003478" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#334155' : '#e2e8f0'} />
              <XAxis dataKey="year" stroke={darkMode ? '#94a3b8' : '#64748b'} tick={{ fontSize: 11 }} />
              <YAxis yAxisId="left" stroke={darkMode ? '#94a3b8' : '#64748b'} tick={{ fontSize: 11 }} />
              <YAxis yAxisId="right" orientation="right" stroke={darkMode ? '#94a3b8' : '#64748b'} tick={{ fontSize: 11 }} domain={[-5, 20]} />
              <Tooltip content={<CustomTooltip darkMode={darkMode} />} />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Area yAxisId="left" type="monotone" dataKey="revenue" fill="url(#colorRevenue)" stroke="#003478" strokeWidth={2} name="Revenue ($B)" />
              <Line yAxisId="right" type="monotone" dataKey="grossMargin" stroke="#10B981" strokeWidth={2} dot={{ r: 3 }} name="Gross Margin %" />
              <Line yAxisId="right" type="monotone" dataKey="operatingMargin" stroke="#F59E0B" strokeWidth={2} dot={{ r: 3 }} name="Operating Margin %" />
              <Line yAxisId="right" type="monotone" dataKey="netMargin" stroke="#EF4444" strokeWidth={2} dot={{ r: 3 }} name="Net Margin %" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Cash Flow Chart */}
        <div className={`rounded-xl p-6 ${darkMode ? 'bg-[#1E293B]' : 'bg-white'} shadow-lg`}>
          <h3 className={`text-lg font-semibold mb-1 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            Cash Flow Analysis
          </h3>
          <p className={`text-xs mb-4 ${darkMode ? 'text-slate-500' : 'text-slate-500'}`}>
            Operating cash flow, CapEx, and Free Cash Flow ($B)
          </p>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={cashFlowData}>
              <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#334155' : '#e2e8f0'} />
              <XAxis dataKey="year" stroke={darkMode ? '#94a3b8' : '#64748b'} tick={{ fontSize: 11 }} />
              <YAxis stroke={darkMode ? '#94a3b8' : '#64748b'} tick={{ fontSize: 11 }} />
              <Tooltip content={<CustomTooltip darkMode={darkMode} />} />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Bar dataKey="operatingCF" fill="#003478" name="Operating CF ($B)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="capex" fill="#EF4444" name="CapEx ($B)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="freeCF" fill="#10B981" name="Free CF ($B)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Balance Sheet Chart */}
        <div className={`rounded-xl p-6 ${darkMode ? 'bg-[#1E293B]' : 'bg-white'} shadow-lg`}>
          <h3 className={`text-lg font-semibold mb-1 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            Leverage & Liquidity
          </h3>
          <p className={`text-xs mb-4 ${darkMode ? 'text-slate-500' : 'text-slate-500'}`}>
            Total debt, cash holdings, and shareholders' equity ($B)
          </p>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={balanceSheetData}>
              <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#334155' : '#e2e8f0'} />
              <XAxis dataKey="year" stroke={darkMode ? '#94a3b8' : '#64748b'} tick={{ fontSize: 11 }} />
              <YAxis stroke={darkMode ? '#94a3b8' : '#64748b'} tick={{ fontSize: 11 }} />
              <Tooltip content={<CustomTooltip darkMode={darkMode} />} />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Bar dataKey="totalDebt" fill="#EF4444" name="Total Debt ($B)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="cash" fill="#10B981" name="Cash ($B)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="equity" fill="#003478" name="Equity ($B)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Income Comparison Chart */}
        <div className={`rounded-xl p-6 ${darkMode ? 'bg-[#1E293B]' : 'bg-white'} shadow-lg`}>
          <h3 className={`text-lg font-semibold mb-1 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            Operating vs Net Income
          </h3>
          <p className={`text-xs mb-4 ${darkMode ? 'text-slate-500' : 'text-slate-500'}`}>
            Year-over-year income comparison ($B) - Note: 2021 includes Rivian gains
          </p>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={incomeData}>
              <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#334155' : '#e2e8f0'} />
              <XAxis dataKey="year" stroke={darkMode ? '#94a3b8' : '#64748b'} tick={{ fontSize: 11 }} />
              <YAxis stroke={darkMode ? '#94a3b8' : '#64748b'} tick={{ fontSize: 11 }} />
              <Tooltip content={<CustomTooltip darkMode={darkMode} />} />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Bar dataKey="operatingIncome" fill="#F59E0B" name="Operating Income ($B)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="netIncome" fill="#003478" name="Net Income ($B)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* NPV Analysis Chart - Full Width */}
        <div className={`lg:col-span-2 rounded-xl p-6 ${darkMode ? 'bg-[#1E293B]' : 'bg-white'} shadow-lg`}>
          <h3 className={`text-lg font-semibold mb-1 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            Investment NPV Analysis
          </h3>
          <p className={`text-xs mb-4 ${darkMode ? 'text-slate-500' : 'text-slate-500'}`}>
            Comparing Investment A ($50M/yr × 20 yrs) vs Investment B ($40M/yr × 12 yrs) across discount rates
          </p>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={npvData}>
              <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#334155' : '#e2e8f0'} />
              <XAxis dataKey="rate" stroke={darkMode ? '#94a3b8' : '#64748b'} tick={{ fontSize: 11 }} />
              <YAxis stroke={darkMode ? '#94a3b8' : '#64748b'} tick={{ fontSize: 11 }} label={{ value: 'NPV ($M)', angle: -90, position: 'insideLeft', style: { fontSize: 11 } }} />
              <Tooltip content={<CustomTooltip darkMode={darkMode} />} />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Line type="monotone" dataKey="investmentA" stroke="#003478" strokeWidth={3} dot={{ r: 5, fill: '#003478' }} name="Investment A NPV ($M)" />
              <Line type="monotone" dataKey="investmentB" stroke="#FF6B00" strokeWidth={3} dot={{ r: 5, fill: '#FF6B00' }} name="Investment B NPV ($M)" />
            </LineChart>
          </ResponsiveContainer>
          <p className={`text-xs mt-2 text-center ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Investment A consistently delivers higher NPV ($96M-$269M advantage), supporting longer-term strategic investments aligned with Ford's EV transformation
          </p>
        </div>
      </div>
    </AssignmentDashboard>
  )
}
