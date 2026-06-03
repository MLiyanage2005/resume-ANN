import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Cpu, Binary, Search, RefreshCw, BarChart2 } from 'lucide-react'

export default function Loader({ filename }) {
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    { text: "Extracting Resume text content...", icon: Search },
    { text: "Normalizing text and cleaning character noise...", icon: RefreshCw },
    { text: "Encoding to 384-dimensional dense vectors...", icon: Binary },
    { text: "Executing feed-forward Artificial Neural Network (ANN)...", icon: Cpu },
    { text: "Calculating final confidence scores...", icon: BarChart2 }
  ]

  useEffect(() => {
    const intervals = [800, 1500, 2200, 3100, 3900];
    
    const timers = intervals.map((time, index) => {
      return setTimeout(() => {
        setCurrentStep(index)
      }, time)
    })

    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center p-6 select-none overflow-hidden">
      {/* Dynamic Animated Particle Background */}
      <div className="absolute inset-0 grid-bg opacity-30" />

      {/* Cinematic Glowing Orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none animate-pulse" />

      {/* Main Central Container */}
      <div className="w-full max-w-lg relative z-10 flex flex-col items-center">
        {/* Scanner Radar and Neural Grid Animation */}
        <div className="relative w-48 h-48 mb-12 flex items-center justify-center">
          {/* Outer Pulsing Glow */}
          <motion.div 
            animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="absolute inset-0 rounded-full bg-accent/10 border border-accent/25 filter blur-sm"
          />

          {/* Rotating Outer Ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
            className="absolute inset-2 border border-dashed border-accent/40 rounded-full"
          />

          {/* Glowing Scanner Line */}
          <motion.div
            animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.3, 0.8, 0.3] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent shadow-glow"
          />

          {/* Custom SVG Neural Network Nodes Animation */}
          <svg className="w-32 h-32 text-accent/80 relative z-20" viewBox="0 0 100 100">
            {/* Connection Lines */}
            <motion.path
              d="M 20,50 L 50,20 M 20,50 L 50,50 M 20,50 L 50,80 M 50,20 L 80,50 M 50,50 L 80,50 M 50,80 L 80,50"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              strokeDasharray="4 4"
              animate={{ strokeDashoffset: [0, -20] }}
              transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
            />
            
            {/* Input Node */}
            <circle cx="20" cy="50" r="4" fill="#000000" stroke="#EAB308" strokeWidth="2" className="shadow-glow" />
            <circle cx="20" cy="50" r="1.5" fill="#EAB308" />

            {/* Hidden Nodes */}
            <circle cx="50" cy="20" r="4" fill="#000000" stroke="#EAB308" strokeWidth="2" />
            <circle cx="50" cy="20" r="1.5" fill="#EAB308" />

            <circle cx="50" cy="50" r="4" fill="#000000" stroke="#EAB308" strokeWidth="2" />
            <circle cx="50" cy="50" r="1.5" fill="#EAB308" />

            <circle cx="50" cy="80" r="4" fill="#000000" stroke="#EAB308" strokeWidth="2" />
            <circle cx="50" cy="80" r="1.5" fill="#EAB308" />

            {/* Output Node */}
            <circle cx="80" cy="50" r="4" fill="#000000" stroke="#EAB308" strokeWidth="2" />
            <circle cx="80" cy="50" r="1.5" fill="#EAB308" />
          </svg>
        </div>

        {/* File being analyzed */}
        <div className="mb-8 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-white/60">
          Analyzing: <span className="text-accent font-semibold">{filename}</span>
        </div>

        {/* Rotating text loader */}
        <h2 className="text-xl font-bold font-sans tracking-wide text-white mb-6 text-center glow-text-yellow h-8">
          {steps[currentStep].text}
        </h2>

        {/* Pipeline Progression Indicators (Step list) */}
        <div className="w-full bg-white/5 border border-white/5 rounded-2xl p-6 flex flex-col gap-4">
          {steps.map((step, idx) => {
            const Icon = step.icon
            const isCompleted = idx < currentStep
            const isActive = idx === currentStep

            return (
              <div 
                key={idx} 
                className={`flex items-center gap-4 transition-all duration-300 ${
                  isCompleted ? 'text-emerald-400 opacity-90' : isActive ? 'text-accent opacity-100' : 'text-white/20'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-all ${
                  isCompleted 
                    ? 'border-emerald-500/30 bg-emerald-500/10' 
                    : isActive 
                      ? 'border-accent bg-accent/10 shadow-glow' 
                      : 'border-white/5 bg-white/[0.02]'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 flex justify-between items-center text-sm font-medium">
                  <span>{step.text.split("...")[0]}</span>
                  {isCompleted && (
                    <span className="text-xs uppercase font-bold tracking-wider text-emerald-400 font-mono">
                      Completed
                    </span>
                  )}
                  {isActive && (
                    <span className="text-xs uppercase font-bold tracking-wider text-accent font-mono animate-pulse">
                      Processing
                    </span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
