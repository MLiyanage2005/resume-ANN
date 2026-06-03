import React from 'react'
import { motion } from 'framer-motion'

export default function SkillTag({ name }) {
  return (
    <motion.span
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      className="px-4 py-2 rounded-xl text-xs font-semibold text-accent border border-accent/20 bg-accent/[0.03] hover:border-accent hover:bg-accent/5 hover:shadow-glow cursor-default transition-all duration-300 font-sans tracking-wide"
    >
      {name}
    </motion.span>
  )
}
