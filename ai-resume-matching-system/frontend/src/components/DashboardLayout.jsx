import React from 'react'
import Sidebar from './Sidebar'
import { motion } from 'framer-motion'

export default function DashboardLayout({ children }) {
  return (
    <div className="bg-black min-h-screen text-white font-sans flex">
      {/* Fixed Left Sidebar */}
      <Sidebar />

      {/* Main Content Area on the right */}
      <div className="flex-1 pl-64 min-h-screen flex flex-col">
        <motion.main 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex-1 p-8 md:p-12 max-w-7xl w-full mx-auto"
        >
          {children}
        </motion.main>
      </div>
    </div>
  )
}
