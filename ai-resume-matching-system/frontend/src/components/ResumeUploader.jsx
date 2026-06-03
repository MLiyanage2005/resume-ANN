import React, { useState, useRef } from 'react'
import { UploadCloud, FileText, CheckCircle2, AlertCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ResumeUploader({ onUpload }) {
  const [dragActive, setDragActive] = useState(false)
  const [error, setError] = useState(null)
  const fileInputRef = useRef(null)

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const validateFile = (file) => {
    if (!file) return false
    
    // Check file extension
    const extension = file.name.split('.').pop().toLowerCase()
    if (extension !== 'pdf' && extension !== 'docx' && extension !== 'doc') {
      setError("Unsupported file format. Please upload PDF, DOCX, or DOC.")
      return false
    }

    // Check file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      setError("File is too large. Maximum size is 10MB.")
      return false
    }

    setError(null)
    return true
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      if (validateFile(file)) {
        onUpload(file)
      }
    }
  }

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      if (validateFile(file)) {
        onUpload(file)
      }
    }
  }

  const onButtonClick = () => {
    fileInputRef.current.click()
  }

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col gap-4">
      {/* Drag & Drop Area */}
      <motion.div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={onButtonClick}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        className={`w-full py-16 px-8 rounded-3xl cursor-pointer border-2 border-dashed transition-all duration-300 relative overflow-hidden flex flex-col items-center justify-center text-center ${
          dragActive 
            ? 'border-accent bg-accent/5 shadow-glow-lg' 
            : 'border-white/10 bg-white/[0.02] hover:border-accent/40 hover:bg-white/[0.04]'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept=".pdf,.docx,.doc"
          onChange={handleFileChange}
        />

        {/* Floating background gradient light */}
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

        {/* Upload Icon */}
        <div className="w-16 h-16 rounded-2xl bg-black border border-white/10 flex items-center justify-center shadow-lg mb-6 group-hover:border-accent transition-all duration-300">
          <UploadCloud className={`w-8 h-8 ${dragActive ? 'text-accent' : 'text-accent/80'}`} />
        </div>

        {/* Text Guidelines */}
        <h3 className="text-xl font-semibold text-white mb-2 font-sans">
          Drop your resume here
        </h3>
        <p className="text-sm text-white/50 mb-6 max-w-sm">
          or click to browse from your machine
        </p>

        {/* Support types pills */}
        <div className="flex gap-2 mb-6">
          {['.PDF', '.DOCX', '.DOC'].map((type) => (
            <span key={type} className="px-3 py-1 rounded-full text-xs font-semibold bg-white/5 border border-white/10 text-white/70">
              {type}
            </span>
          ))}
        </div>

        {/* Yellow Select File Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onButtonClick();
          }}
          className="px-6 py-2.5 rounded-full bg-accent hover:bg-accent-dark text-black font-semibold text-sm shadow-glow hover:shadow-glow-lg transition-all duration-300"
        >
          Select File
        </button>

        {/* Bottom security assurance */}
        <p className="text-[10px] uppercase font-bold tracking-widest text-white/30 mt-8">
          MAX 10MB • ENCRYPTED TRANSFER • NOT STORED
        </p>
      </motion.div>

      {/* Error message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-start gap-3 text-sm"
          >
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Upload Error</span>
              <p className="mt-1 text-white/70">{error}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
