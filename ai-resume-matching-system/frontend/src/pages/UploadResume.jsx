import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DashboardLayout from '../components/DashboardLayout'
import ResumeUploader from '../components/ResumeUploader'
import Loader from '../components/Loader'
import { ShieldCheck, Zap, Crosshair } from 'lucide-react'
import { analyzeResume } from '../api/api'

export default function UploadResume({ onAnalysisComplete }) {
  const navigate = useNavigate()
  const [file, setFile] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleUpload = async (uploadedFile) => {
    setFile(uploadedFile)
    setIsProcessing(true)

    try {
      // Trigger the API request (which has mock fallback if the backend isn't running)
      const results = await analyzeResume(uploadedFile)
      
      // Save results in parent state
      onAnalysisComplete(uploadedFile.name, results)
      
      // Navigate to results screen after completion
      setIsProcessing(false)
      navigate('/dashboard/results')
    } catch (err) {
      console.error("Error analyzing resume:", err)
      setIsProcessing(false)
    }
  }

  const features = [
    {
      icon: ShieldCheck,
      title: 'Secure',
      desc: 'Encrypted processing'
    },
    {
      icon: Zap,
      title: 'Fast',
      desc: '< 800ms inference'
    },
    {
      icon: Crosshair,
      title: 'Precise',
      desc: '94.2% accuracy'
    }
  ]

  if (isProcessing) {
    return <Loader filename={file ? file.name : "Resume"} />
  }

  return (
    <DashboardLayout>
      {/* Header Info */}
      <div className="mb-10">
        <span className="text-xs uppercase font-bold tracking-widest text-accent font-mono block mb-1">
          Resume Analysis
        </span>
        <h1 className="text-3xl font-extrabold text-white mb-2 font-sans tracking-tight">
          Upload Your Resume
        </h1>
        <p className="text-sm text-white/50">
          AI will analyze semantic skill patterns and predict your career domain.
        </p>
      </div>

      {/* Main Upload Portal Area */}
      <div className="flex flex-col gap-12 py-6">
        <ResumeUploader onUpload={handleUpload} />

        {/* Small Feature Cards Row Below Portal (Matches Screenshot) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto w-full">
          {features.map((feat, idx) => {
            const Icon = feat.icon
            return (
              <div 
                key={idx}
                className="p-4 rounded-xl glass-panel border border-white/5 flex flex-col items-center justify-center text-center hover:border-white/10 transition-all duration-200"
              >
                <div className="w-8 h-8 rounded-lg bg-black border border-white/5 flex items-center justify-center mb-2">
                  <Icon className="w-4 h-4 text-accent" />
                </div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1 font-sans">
                  {feat.title}
                </h4>
                <p className="text-[10px] text-white/40 font-mono">
                  {feat.desc}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </DashboardLayout>
  )
}
