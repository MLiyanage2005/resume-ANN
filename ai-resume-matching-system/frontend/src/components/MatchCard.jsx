import React from 'react'
import { motion } from 'framer-motion'

export default function MatchCard({ children, className = '', hoverGlow = true, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay, ease: [0.16, 1, 0.3, 1] }}
      className={`rounded-2xl p-6 glass-panel border border-white/5 transition-all duration-300 relative overflow-hidden group ${
        hoverGlow 
          ? 'hover:border-accent/30 hover:bg-white/[0.03] hover:shadow-glow' 
          : ''
      } ${className}`}
    >
      {/* Decorative ambient background blur inside card */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-accent/5 rounded-full blur-3xl pointer-events-none group-hover:bg-accent/10 transition-all duration-300" />
      
      {children}
    </motion.div>
  )
}
