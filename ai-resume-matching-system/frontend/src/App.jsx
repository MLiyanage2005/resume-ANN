import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import DashboardHome from './pages/DashboardHome'
import UploadResume from './pages/UploadResume'
import Results from './pages/Results'
import About from './pages/About'
import JobMatcher from './pages/JobMatcher'

export default function App() {
  const [filename, setFilename] = useState('')
  const [results, setResults] = useState(null)

  const handleAnalysisComplete = (name, data) => {
    setFilename(name)
    setResults(data)
  }

  return (
    <Routes>
      {/* Landing Page */}
      <Route path="/" element={<Home />} />
      
      {/* Dashboard App Flow */}
      <Route path="/dashboard" element={<DashboardHome />} />
      
      <Route 
        path="/dashboard/upload" 
        element={
          <UploadResume onAnalysisComplete={handleAnalysisComplete} />
        } 
      />
      
      <Route 
        path="/dashboard/results" 
        element={
          <Results filename={filename} results={results} />
        } 
      />
      
      <Route path="/dashboard/about" element={<About />} />
      
      <Route 
        path="/dashboard/job-matcher" 
        element={
          <JobMatcher filename={filename} results={results} />
        } 
      />
    </Routes>
  )
}
