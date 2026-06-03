import React from 'react'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import { LayoutDashboard, UploadCloud, BarChart3, Info, Cpu, ArrowLeft } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()

  const menuItems = [
    {
      name: 'Dashboard',
      path: '/dashboard',
      icon: LayoutDashboard,
      exact: true
    },
    {
      name: 'Upload Resume',
      path: '/dashboard/upload',
      icon: UploadCloud
    },
    {
      name: 'Predictions',
      path: '/dashboard/results',
      icon: BarChart3
    },
    {
      name: 'About AI',
      path: '/dashboard/about',
      icon: Info
    }
  ]

  // Check if current page is active
  const isActive = (item) => {
    if (item.exact) {
      return location.pathname === item.path
    }
    return location.pathname.startsWith(item.path)
  }

  return (
    <div className="w-64 h-screen fixed top-0 left-0 bg-[#070707] border-r border-white/5 flex flex-col justify-between p-6 z-40">
      {/* Brand Header */}
      <div className="flex flex-col gap-8">
        <div 
          onClick={() => navigate('/')} 
          className="flex items-center gap-3 group cursor-pointer"
        >
          <div className="w-9 h-9 rounded-lg bg-black border border-accent/20 flex items-center justify-center shadow-glow group-hover:border-accent transition-all duration-300">
            <Cpu className="w-4 h-5 text-accent" />
          </div>
          <span className="font-semibold text-lg tracking-tight text-white font-sans">
            Resume <span className="text-accent font-bold">AI</span>
          </span>
        </div>

        {/* Navigation Menu */}
        <nav className="flex flex-col gap-2">
          {menuItems.map((item) => {
            const active = isActive(item)
            const Icon = item.icon

            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 group ${
                  active 
                    ? 'bg-accent/10 border border-accent/20 text-accent shadow-glow' 
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${active ? 'text-accent' : 'text-white/40 group-hover:text-white/80'}`} />
                <span>{item.name}</span>
              </NavLink>
            )
          })}
        </nav>
      </div>

      {/* Sidebar Footer Info (Matches Screenshot) */}
      <div className="flex flex-col gap-4">
        {/* Model Status Widget */}
        <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-white/50">Model Active</span>
          </div>
          <span className="text-xs font-semibold text-accent font-mono truncate">all-MiniLM-L6-v2</span>
          <span className="text-[10px] text-emerald-400 font-mono">Inference ready</span>
        </div>

        {/* Back to Home CTA */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center justify-center gap-2 text-xs font-medium text-white/40 hover:text-white py-2 border border-white/5 hover:bg-white/5 rounded-lg transition-all duration-200"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </button>
      </div>
    </div>
  )
}
