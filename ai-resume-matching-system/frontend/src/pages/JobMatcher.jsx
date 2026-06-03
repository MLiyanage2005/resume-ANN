import React, { useState } from 'react'
import DashboardLayout from '../components/DashboardLayout'
import MatchCard from '../components/MatchCard'
import SkillTag from '../components/SkillTag'
import { Briefcase, ArrowRight, HelpCircle, CheckCircle2, Star } from 'lucide-react'
import { motion } from 'framer-motion'

export default function JobMatcher({ filename, results }) {
  const [jobDescription, setJobDescription] = useState('')
  const [matchResult, setMatchResult] = useState(null)
  const [matching, setMatching] = useState(false)

  const handleMatch = async (e) => {
    e.preventDefault()
    if (!jobDescription.trim()) return

    setMatching(true)
    // Simulate matching analysis
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Calculate simulated match based on overlap or keyword matching
    const score = results ? 84 : 45
    const missing = ["Docker", "Kubernetes", "AWS CloudFormation"]
    const overlapping = ["Python", "TensorFlow", "Pandas", "SQL"]

    setMatchResult({
      score,
      overlapping,
      missing,
      feedback: "Great alignment on data operations and core scripting. Consider gaining additional container/cloud orchestrator skills to optimize infrastructure alignment."
    })
    setMatching(false)
  }

  return (
    <DashboardLayout>
      {/* Header Info */}
      <div className="mb-10">
        <span className="text-xs uppercase font-bold tracking-widest text-accent font-mono block mb-1">
          Career Alignment
        </span>
        <h1 className="text-3xl font-extrabold text-white mb-2 font-sans tracking-tight">
          Job Target Matcher
        </h1>
        <p className="text-sm text-white/50">
          Compare your resume's semantic profile directly against a target job description.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Form Input */}
        <div className="flex flex-col gap-6">
          <MatchCard hoverGlow={false} className="p-6">
            <form onSubmit={handleMatch} className="flex flex-col gap-4">
              <label className="text-xs font-bold text-white/40 uppercase tracking-widest block font-sans">
                Paste Job Description
              </label>
              
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the target job description here..."
                className="w-full h-72 p-4 rounded-xl bg-black border border-white/10 text-white/80 placeholder-white/20 focus:border-accent focus:ring-1 focus:ring-accent outline-none text-sm transition-all resize-none font-sans"
              />

              <button
                type="submit"
                disabled={matching || !jobDescription.trim()}
                className="px-6 py-3 rounded-full bg-accent hover:bg-accent-dark disabled:bg-white/5 disabled:text-white/20 disabled:shadow-none text-black font-bold text-sm tracking-wide shadow-glow hover:shadow-glow-lg transition-all duration-300 flex items-center justify-center gap-2 group scale-100 hover:scale-[1.02] active:scale-95 disabled:scale-100"
              >
                <span>{matching ? 'Analyzing Alignment...' : 'Analyze Matching Score'}</span>
                {!matching && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
              </button>
            </form>
          </MatchCard>
        </div>

        {/* Right Match Results */}
        <div className="flex flex-col gap-6">
          {matchResult ? (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col gap-6"
            >
              {/* Score card */}
              <MatchCard hoverGlow={false} className="p-6 border border-accent/25 shadow-glow">
                <span className="text-[10px] uppercase font-bold tracking-widest text-accent font-mono block mb-2">
                  Matching Score
                </span>
                <div className="flex items-baseline gap-4">
                  <span className="text-6xl font-extrabold text-accent glow-text-yellow tracking-tight">
                    {matchResult.score}%
                  </span>
                  <span className="text-sm font-semibold text-white/80 font-sans">
                    {matchResult.score >= 80 ? 'Highly Aligned Match' : 'Moderate Alignment'}
                  </span>
                </div>
                <p className="text-xs text-white/50 mt-4 leading-relaxed font-sans">
                  {matchResult.feedback}
                </p>
              </MatchCard>

              {/* Skills overlap details */}
              <MatchCard hoverGlow={false} className="p-6">
                <span className="text-[10px] uppercase font-bold tracking-widest text-white/40 block mb-4 font-sans">
                  Matching Skills Found
                </span>
                <div className="flex flex-wrap gap-2 mb-8">
                  {matchResult.overlapping.map((skill, idx) => (
                    <SkillTag key={idx} name={skill} />
                  ))}
                </div>

                <span className="text-[10px] uppercase font-bold tracking-widest text-white/40 block mb-4 font-sans">
                  Recommended Skills to Add
                </span>
                <div className="flex flex-wrap gap-2">
                  {matchResult.missing.map((skill, idx) => (
                    <span 
                      key={idx} 
                      className="px-4 py-2 rounded-xl text-xs font-semibold text-white/40 border border-white/5 bg-white/[0.01] font-sans tracking-wide"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </MatchCard>
            </motion.div>
          ) : (
            <div className="flex-1 rounded-2xl border border-white/5 border-dashed p-12 flex flex-col items-center justify-center text-center h-full min-h-[300px]">
              <div className="w-12 h-12 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-center mb-4 text-white/30">
                <Briefcase className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white mb-1 font-sans">
                Waiting for Job Description
              </h3>
              <p className="text-xs text-white/40 max-w-xs leading-relaxed">
                Paste a job posting on the left to see semantic matching details and missing skills recommendations.
              </p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
