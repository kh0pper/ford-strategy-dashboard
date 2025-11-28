import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Play, Pause, Circle, CheckCircle, AlertCircle, TrendingUp, Users, Target, Factory, DollarSign, Lightbulb } from 'lucide-react'

const storySteps = [
  {
    id: 1,
    year: '2020',
    title: 'The Challenge',
    subtitle: 'Legacy automaker facing disruption',
    icon: AlertCircle,
    color: '#EF4444',
    content: `When Jim Farley assumed the CEO role in October 2020, Ford Motor Company faced an existential challenge. A 117-year-old manufacturing giant had to transform for an uncertain future defined by electrification, software-driven experiences, and new competitors.`,
    stats: [
      { label: 'Revenue', value: '$127.1B' },
      { label: 'Net Income', value: '-$1.3B' },
      { label: 'EBIT', value: '-$2.9B' },
    ],
    framework: 'Porter\'s Five Forces reveals unprecedented competitive pressure from traditional rivals, EV disruptors (Tesla), and emerging Chinese manufacturers.',
  },
  {
    id: 2,
    year: '2021',
    title: 'New Leadership Vision',
    subtitle: 'Ford+ Plan announcement',
    icon: Lightbulb,
    color: '#F59E0B',
    content: `May 2021: Ford+ vision announced — "Help build a better world, where every person is free to move and pursue their dreams." This oblique objective, pursuing purpose rather than profits directly, set the stage for comprehensive transformation.`,
    stats: [
      { label: 'Revenue', value: '$136.3B' },
      { label: 'Investment', value: '$11B+', subtitle: 'BlueOval SK' },
      { label: 'Employees', value: '183K' },
    ],
    framework: 'Kay\'s Oblique Principle: Companies like IKEA and Google achieve superior results by pursuing higher-level goals that may not directly target profitability.',
  },
  {
    id: 3,
    year: '2022',
    title: 'Restructuring',
    subtitle: 'Creation of three business units',
    icon: Factory,
    color: '#003478',
    content: `March 2022: Ford restructures into Ford Blue (ICE vehicles), Ford Model e (EVs), and Ford Pro (commercial). This applies Skinner's Focused Factory concept at the business unit level — each unit optimizes for its specific market context.`,
    stats: [
      { label: 'Ford Blue', value: 'ICE', subtitle: 'Cost leadership' },
      { label: 'Model e', value: 'EV', subtitle: 'Market penetration' },
      { label: 'Ford Pro', value: 'Commercial', subtitle: 'Differentiation' },
    ],
    framework: 'Skinner\'s Focused Factory (1974): Rather than forcing a single model across diverse segments, create specialized units with distinct operational approaches.',
  },
  {
    id: 4,
    year: '2023',
    title: 'Financial Recovery',
    subtitle: 'Revenue growth and profitability',
    icon: DollarSign,
    color: '#10B981',
    content: `Ford demonstrates remarkable financial recovery. Revenue grows to $176.2B, EBIT reaches $8.5B, and net income hits $4.3B. Ford Blue and Pro generate strong returns, while Model e represents strategic investment for the future.`,
    stats: [
      { label: 'Revenue', value: '$176.2B', subtitle: '+$50B since 2020' },
      { label: 'EBIT', value: '$8.5B' },
      { label: 'Blue + Pro EBIT', value: '$14.9B' },
    ],
    framework: 'Time Value of Money (Luehrman): Model e losses represent option value — accepting negative NPV today for future positioning and flexibility.',
  },
  {
    id: 5,
    year: '2024',
    title: 'Marketing Evolution',
    subtitle: 'From product-first to lifestyle segmentation',
    icon: Target,
    color: '#8B5CF6',
    content: `September 2024: "Ready, Set, Ford" campaign launches, organizing messaging around three lifestyle categories — Build, Thrill, and Adventure. This reflects the STP Framework's insight that customers buy vehicles to enable lifestyles, not specifications.`,
    stats: [
      { label: 'Brand Awareness', value: '+6%', subtitle: '68% → 74%' },
      { label: 'Lead Generation', value: '+35%', subtitle: '124K → 168K' },
      { label: 'Marketing ROI', value: '2.11', subtitle: 'Up from 0.32' },
    ],
    framework: 'STP Framework (Dolan & John): Segmentation, Targeting, Positioning — understanding that different customer segments require different value propositions.',
  },
  {
    id: 6,
    year: '2024',
    title: 'Operations Transformation',
    subtitle: 'Focused factory concept in action',
    icon: Factory,
    color: '#0EA5E9',
    content: `Ford operates 375+ facilities across 24 countries. Each business unit has dedicated infrastructure: Blue focuses on efficient ICE manufacturing, Model e builds new EV capacity (BlueOval SK plants), and Pro integrates commercial facilities with software platforms.`,
    stats: [
      { label: 'Facilities', value: '375+' },
      { label: 'Countries', value: '24' },
      { label: 'US Plants', value: '14' },
    ],
    framework: 'MIT Decision Category Framework: Structural decisions (facilities, capacity) and infrastructure decisions (workforce, IT) embed competitive capability into physical systems.',
  },
  {
    id: 7,
    year: '2024',
    title: 'The Tension',
    subtitle: 'Model e losses vs strategic necessity',
    icon: AlertCircle,
    color: '#FF6B00',
    content: `Model e's -$5.1B EBIT (-131.8% margin) reveals the gap between strategic intent and market reality. EV demand grew slower than projected, creating execution challenges. Yet Ford maintains investment, believing EVs represent the future powertrain technology.`,
    stats: [
      { label: 'Model e Revenue', value: '$3.9B' },
      { label: 'Model e EBIT', value: '-$5.1B' },
      { label: 'Framework Fit', value: '4/10' },
    ],
    framework: 'Strategy-Execution Misalignment: Ambitious goals require market validation. Model e demonstrates that mission-driven culture alone cannot overcome competitive cost structures.',
  },
  {
    id: 8,
    year: '2025',
    title: 'Looking Forward',
    subtitle: 'Strategic recalibration',
    icon: TrendingUp,
    color: '#00A550',
    content: `2025 brings strategic recalibration: $1B cost savings target, leadership restructuring, and balance between autonomy and coordination. Ford Pro emerges as the exemplar — 13.5% EBIT margin through integrated strategy across all dimensions.`,
    stats: [
      { label: 'Ford Pro EBIT', value: '13.5%', subtitle: 'Industry-leading' },
      { label: 'Cost Target', value: '$1B', subtitle: 'Savings' },
      { label: 'Pro Fit Score', value: '10/10' },
    ],
    framework: 'Birkinshaw & Goddard: Management model recalibration — shifting from pure emergence emphasis toward balanced strategic oversight while maintaining business unit autonomy.',
  },
]

function StepIndicator({ step, currentStep, onClick, darkMode }) {
  const isCompleted = step.id < currentStep
  const isCurrent = step.id === currentStep

  return (
    <button
      onClick={() => onClick(step.id)}
      className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all ${
        isCurrent
          ? 'bg-[#003478] text-white'
          : isCompleted
            ? darkMode ? 'text-green-400 hover:bg-slate-700' : 'text-green-600 hover:bg-slate-100'
            : darkMode ? 'text-slate-500 hover:bg-slate-700' : 'text-slate-400 hover:bg-slate-100'
      }`}
    >
      {isCompleted ? (
        <CheckCircle className="w-4 h-4" />
      ) : isCurrent ? (
        <Circle className="w-4 h-4 fill-current" />
      ) : (
        <Circle className="w-4 h-4" />
      )}
      <span className="text-sm font-medium hidden md:inline">{step.year}</span>
    </button>
  )
}

function StatCard({ label, value, subtitle, darkMode }) {
  return (
    <div className={`p-4 rounded-lg ${darkMode ? 'bg-[#0F172A]' : 'bg-slate-100'}`}>
      <p className={`text-xs ${darkMode ? 'text-slate-500' : 'text-slate-500'}`}>{label}</p>
      <p className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{value}</p>
      {subtitle && <p className={`text-xs ${darkMode ? 'text-slate-500' : 'text-slate-500'}`}>{subtitle}</p>}
    </div>
  )
}

export default function StoryTimeline({ darkMode }) {
  const [currentStep, setCurrentStep] = useState(1)
  const [isPlaying, setIsPlaying] = useState(false)

  const step = storySteps.find(s => s.id === currentStep)
  const Icon = step.icon

  // Auto-play functionality
  useEffect(() => {
    if (isPlaying) {
      const timer = setTimeout(() => {
        if (currentStep < storySteps.length) {
          setCurrentStep(currentStep + 1)
        } else {
          setIsPlaying(false)
        }
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [isPlaying, currentStep])

  const goToStep = (stepId) => {
    setCurrentStep(stepId)
    setIsPlaying(false)
  }

  const nextStep = () => {
    if (currentStep < storySteps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
          Ford's Transformation Story
        </h1>
        <p className={`mt-2 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
          A guided journey through Ford's strategic evolution from 2020 to 2025
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Step {currentStep} of {storySteps.length}
          </span>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`flex items-center space-x-2 px-3 py-1 rounded-lg ${
              darkMode ? 'hover:bg-slate-700' : 'hover:bg-slate-100'
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4" />
                <span className="text-sm">Pause</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                <span className="text-sm">Auto-play</span>
              </>
            )}
          </button>
        </div>
        <div className={`h-2 rounded-full ${darkMode ? 'bg-slate-700' : 'bg-slate-200'}`}>
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#003478] to-[#0076CE] transition-all duration-500"
            style={{ width: `${(currentStep / storySteps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Step Indicators */}
      <div className={`flex justify-center flex-wrap gap-2 mb-8 p-4 rounded-xl ${darkMode ? 'bg-[#1E293B]' : 'bg-white'} shadow-lg`}>
        {storySteps.map(s => (
          <StepIndicator
            key={s.id}
            step={s}
            currentStep={currentStep}
            onClick={goToStep}
            darkMode={darkMode}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className={`rounded-2xl overflow-hidden ${darkMode ? 'bg-[#1E293B]' : 'bg-white'} shadow-lg`}>
        {/* Step Header */}
        <div
          className="p-6 text-white"
          style={{ background: `linear-gradient(135deg, ${step.color}, ${step.color}dd)` }}
        >
          <div className="flex items-center space-x-4">
            <div className="p-3 rounded-xl bg-white/20">
              <Icon className="w-8 h-8" />
            </div>
            <div>
              <span className="text-sm opacity-80">{step.year}</span>
              <h2 className="text-2xl font-bold">{step.title}</h2>
              <p className="opacity-80">{step.subtitle}</p>
            </div>
          </div>
        </div>

        {/* Step Content */}
        <div className="p-6">
          <p className={`text-lg leading-relaxed mb-6 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
            {step.content}
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {step.stats.map((stat, index) => (
              <StatCard key={index} {...stat} darkMode={darkMode} />
            ))}
          </div>

          {/* Framework Callout */}
          <div className={`p-4 rounded-lg border-l-4 ${darkMode ? 'bg-[#0F172A] border-[#60A5FA]' : 'bg-blue-50 border-[#003478]'}`}>
            <h4 className={`text-sm font-semibold mb-1 ${darkMode ? 'text-[#60A5FA]' : 'text-[#003478]'}`}>
              Framework Insight
            </h4>
            <p className={`text-sm ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
              {step.framework}
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className={`flex justify-between items-center p-6 border-t ${darkMode ? 'border-slate-700' : 'border-slate-200'}`}>
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
              currentStep === 1
                ? 'opacity-50 cursor-not-allowed'
                : darkMode ? 'hover:bg-slate-700' : 'hover:bg-slate-100'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Previous</span>
          </button>

          <div className={`text-sm ${darkMode ? 'text-slate-500' : 'text-slate-500'}`}>
            Press arrow keys or click to navigate
          </div>

          <button
            onClick={nextStep}
            disabled={currentStep === storySteps.length}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
              currentStep === storySteps.length
                ? 'opacity-50 cursor-not-allowed'
                : 'bg-[#003478] text-white hover:bg-[#0076CE]'
            }`}
          >
            <span>Next</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
