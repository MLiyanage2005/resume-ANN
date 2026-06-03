import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Cpu, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Navbar() {
  const navigate = useNavigate()

  const handleNavClick = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <motion.header 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 w-full z-50 glass-panel border-b border-white/5 py-4 px-6 md:px-12 flex justify-between items-center"
    >
      {/* Brand Logo & Name */}
      <Link to="/" className="flex items-center gap-3 group">
        <div className="w-10 h-10 rounded-lg bg-black border border-accent/30 flex items-center justify-center shadow-glow group-hover:border-accent group-hover:shadow-glow-lg transition-all duration-300">
          <Cpu className="w-5 h-5 text-accent group-hover:scale-110 transition-transform duration-300" />
        </div>
        <span className="font-semibold text-xl tracking-tight text-white font-sans">
          Resume <span className="text-accent font-bold glow-text-yellow">AI</span>
        </span>
      </Link>

      {/* Nav Links */}
      <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-white/70">
        <button 
          onClick={() => handleNavClick('features')} 
          className="hover:text-accent hover:glow-text-yellow transition-all duration-200"
        >
          Features
        </button>
        <button 
          onClick={() => handleNavClick('technology')} 
          className="hover:text-accent hover:glow-text-yellow transition-all duration-200"
        >
          Technology
        </button>
        <button 
          onClick={() => handleNavClick('about')} 
          className="hover:text-accent hover:glow-text-yellow transition-all duration-200"
        >
          About
        </button>
      </nav>

      {/* Launch Platform CTA */}
      <div>
        <button 
          onClick={() => navigate('/dashboard')}
          className="relative overflow-hidden group px-6 py-2 rounded-full bg-accent hover:bg-accent-dark text-black font-semibold text-sm flex items-center gap-2 shadow-glow hover:shadow-glow-lg transition-all duration-300 scale-100 hover:scale-105 active:scale-95"
        >
          <span>Launch Platform</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </motion.header>
  )
}
