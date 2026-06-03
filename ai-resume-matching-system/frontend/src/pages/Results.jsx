import React from 'react'
import { useNavigate } from 'react-router-dom'
import DashboardLayout from '../components/DashboardLayout'
import MatchCard from '../components/MatchCard'
import SkillTag from '../components/SkillTag'
import { 
  FileText, Download, RotateCcw, AlertTriangle, 
  Sparkles, CheckCircle2, TrendingUp, BarChart2 
} from 'lucide-react'
import { motion } from 'framer-motion'

export default function Results({ filename, results }) {
  const navigate = useNavigate()

  // Placeholder if no analysis has been executed yet
  if (!results) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center py-20 text-center max-w-md mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-center mb-6">
            <AlertTriangle className="w-8 h-8 text-accent animate-pulse" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2 font-sans">
            No Analysis Found
          </h2>
          <p className="text-sm text-white/50 mb-8">
            Please upload a resume first to generate predictions and view career match analytics.
          </p>
          <button
            onClick={() => navigate('/dashboard/upload')}
            className="px-6 py-2.5 rounded-full bg-accent hover:bg-accent-dark text-black font-semibold text-sm shadow-glow hover:shadow-glow-lg transition-all duration-300"
          >
            Go to Upload
          </button>
        </div>
      </DashboardLayout>
    )
  }

  const topMatch = results.top_predictions[0]

  // Map description text based on prediction roles
  const getRoleDescription = (role) => {
    const desc = {
      "Data Scientist": "Strong match in ML, statistics, Python, data pipelines.",
      "Business Analyst": "Familiarity with systems requirements, database queries, and business processes.",
      "Database Specialist": "Expertise in SQL query optimization, database design, and storage management.",
      "DevOps Engineer": "Moderate overlap: infrastructure, automation tooling.",
      "Network Security Engineer": "Competency in firewall configuration, networking, and server vulnerability patching.",
      "Java Developer": "Foundational programming and API design skills.",
      "DotNet Developer": "Proficiency in C#, .NET Framework, and enterprise application architectures.",
      "Web Designing": "Expertise in client-side scripting, responsive UI layout, and graphics software.",
      "Arts": "Creative competencies, multimedia design, and styling operations.",
      "Testing": "Solid foundations in regression testing, test planning, and manual quality verification."
    };
    return desc[role] || "Matched competencies found in this career domain.";
  }

  return (
    <DashboardLayout>
      {/* Header Info */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <span className="relative flex h-2 w-2">
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
          </span>
          <span className="text-[10px] uppercase font-bold tracking-widest text-accent font-mono">
            Prediction Complete
          </span>
        </div>
        <h1 className="text-3xl font-extrabold text-white mb-2 font-sans tracking-tight">
          Career Analysis Results
        </h1>
        <p className="text-sm text-white/50">
          Transformer embeddings · ANN classifier · 25 career domains
        </p>
      </div>

      {/* Main Results Container (Grid) */}
      <div className="flex flex-col gap-6">
        
        {/* TOP CAREER MATCH DISPLAY CARD (Matches Screenshot) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-3xl p-8 bg-gradient-to-r from-accent/[0.04] to-transparent border border-accent/25 shadow-glow relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6"
        >
          {/* Accent corner line */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col gap-4">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-accent font-mono block mb-1">
                Top Career Match
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-white font-sans tracking-tight">
                {topMatch.role}
              </h2>
            </div>
            
            <div className="flex items-baseline gap-3">
              <span className="text-5xl font-extrabold text-accent glow-text-yellow font-sans">
                {Math.round(topMatch.confidence * 100)}%
              </span>
              <span className="text-xs text-white/50 font-sans">
                Confidence Score · High confidence · Top 5th percentile
              </span>
            </div>
          </div>

          {/* Semantic tags stack on the right */}
          <div className="flex flex-wrap md:flex-col items-start md:items-end gap-2 shrink-0">
            <span className="px-3 py-1.5 rounded-xl text-xs font-mono font-semibold bg-white/5 border border-white/10 text-white/70">
              # Statistics
            </span>
            <span className="px-3 py-1.5 rounded-xl text-xs font-mono font-semibold bg-white/5 border border-white/10 text-white/70">
              # Python/TensorFlow
            </span>
            <span className="px-3 py-1.5 rounded-xl text-xs font-mono font-semibold bg-white/5 border border-white/10 text-white/70">
              # Data Engineering
            </span>
          </div>
        </motion.div>

        {/* FULL PREDICTION DISTRIBUTION PANEL (Matches Screenshot) */}
        <MatchCard className="p-6" hoverGlow={false}>
          <span className="text-[10px] uppercase font-bold tracking-widest text-white/40 block mb-6 font-sans">
            Full Prediction Distribution
          </span>

          <div className="flex flex-col gap-6">
            {results.top_predictions.map((pred, idx) => {
              const percentage = Math.round(pred.confidence * 100)
              // Gradient styling for the progress bars
              const isFirst = idx === 0
              
              return (
                <div key={idx} className="flex flex-col gap-2">
                  <div className="flex justify-between items-baseline">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white font-sans">
                        {pred.role}
                      </span>
                      <span className="text-xs text-white/30 font-mono">
                        {getRoleDescription(pred.role)}
                      </span>
                    </div>
                    <span className={`text-sm font-extrabold font-mono ${isFirst ? 'text-accent' : 'text-white/60'}`}>
                      {percentage}%
                    </span>
                  </div>

                  {/* Visual Progress Bar */}
                  <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 1, ease: 'easeOut', delay: idx * 0.1 }}
                      className={`h-full rounded-full ${
                        isFirst ? 'bg-accent shadow-glow' : 'bg-white/20'
                      }`}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </MatchCard>

        {/* TWO-COLUMN METRICS GRID (Selected Skills + Semantic Profile) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* SELECTED SKILLS TAG CLOUD */}
          <MatchCard className="p-6" hoverGlow={false}>
            <span className="text-[10px] uppercase font-bold tracking-widest text-white/40 block mb-6 font-sans">
              Selected Skills
            </span>
            
            <div className="flex flex-wrap gap-2.5">
              {results.skills.map((skill, idx) => (
                <SkillTag key={idx} name={skill} />
              ))}
            </div>
          </MatchCard>

          {/* SEMANTIC PROFILE PROGRESS */}
          <MatchCard className="p-6" hoverGlow={false}>
            <span className="text-[10px] uppercase font-bold tracking-widest text-white/40 block mb-6 font-sans">
              Semantic Profile
            </span>

            <div className="flex flex-col gap-5">
              {Object.entries(results.semantic_profile).map(([key, val], idx) => {
                const label = key.replace('_', ' ').replace(/\b\w/g, c => c.toUpperCase())
                return (
                  <div key={key} className="flex flex-col gap-2">
                    <div className="flex justify-between items-baseline text-xs font-semibold">
                      <span className="text-white/70 font-sans">{label}</span>
                      <span className="text-accent font-mono">{val}%</span>
                    </div>
                    
                    {/* Thin yellow progress bar */}
                    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${val}%` }}
                        transition={{ duration: 0.8, ease: 'easeOut', delay: idx * 0.1 }}
                        className="h-full bg-accent rounded-full"
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </MatchCard>
        </div>

        {/* BOTTOM ACTIONS (Matches Screenshot) */}
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <button
            onClick={() => navigate('/dashboard/upload')}
            className="px-6 py-3 rounded-full bg-accent hover:bg-accent-dark text-black font-bold text-sm tracking-wide shadow-glow hover:shadow-glow-lg flex items-center justify-center gap-2 group transition-all duration-300 scale-100 hover:scale-105 active:scale-95"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Analyze Another Resume</span>
          </button>
          
          <button
            onClick={() => alert(`Exporting JSON Report for: ${filename}`)}
            className="px-6 py-3 rounded-full border border-white/10 hover:border-white/30 bg-white/[0.02] text-white font-semibold text-sm tracking-wide hover:bg-white/5 flex items-center justify-center gap-2 transition-all duration-300"
          >
            <Download className="w-4 h-4 text-white/40" />
            <span>Export Report</span>
          </button>
        </div>

      </div>
    </DashboardLayout>
  )
}
