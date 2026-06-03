import React from 'react'
import { useNavigate } from 'react-router-dom'
import DashboardLayout from '../components/DashboardLayout'
import MatchCard from '../components/MatchCard'
import { 
  UploadCloud, FileText, CheckCircle2, TrendingUp, 
  Clock, ArrowRight, Brain, ShieldAlert 
} from 'lucide-react'

export default function DashboardHome() {
  const navigate = useNavigate()

  const stats = [
    {
      title: 'Resumes Analyzed',
      value: '2,847',
      change: '+124 this week',
      changeType: 'positive'
    },
    {
      title: 'Match Accuracy',
      value: '94.2%',
      change: '+1.3% vs last month',
      changeType: 'positive'
    },
    {
      title: 'Career Domains',
      value: '25',
      change: 'Active categories',
      changeType: 'neutral'
    },
    {
      title: 'Avg. Inference',
      value: '0.8s',
      change: 'End-to-end pipeline',
      changeType: 'neutral'
    }
  ]

  const recentAnalyses = [
    {
      filename: 'alex_chen_resume.pdf',
      role: 'Data Scientist',
      confidence: '91%',
      time: '2 min ago'
    },
    {
      filename: 'priya_sharma_cv.docx',
      role: 'ML Engineer',
      confidence: '87%',
      time: '15 min ago'
    },
    {
      filename: 'jordan_riley_resume.pdf',
      role: 'Backend Developer',
      confidence: '79%',
      time: '1 hr ago'
    },
    {
      filename: 'sam_jones_cv.pdf',
      role: 'DevOps Engineer',
      confidence: '93%',
      time: '3 hrs ago'
    }
  ]

  return (
    <DashboardLayout>
      {/* Header Info */}
      <div className="mb-10">
        <span className="text-xs uppercase font-bold tracking-widest text-accent font-mono block mb-1">
          Welcome Back
        </span>
        <h1 className="text-3xl font-extrabold text-white mb-2 font-sans tracking-tight">
          AI Resume Intelligence
        </h1>
        <p className="text-sm text-white/50">
          Real-time career prediction powered by transformer embeddings.
        </p>
      </div>

      {/* Stats Cards Row (Matches Screenshot) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, idx) => (
          <MatchCard key={idx} hoverGlow={false} className="p-5">
            <span className="text-xs font-bold text-white/40 block mb-3 font-sans">
              {stat.title}
            </span>
            <span className="text-3xl font-bold text-white block mb-2 glow-text-yellow">
              {stat.value}
            </span>
            <span className={`text-[10px] font-semibold font-mono ${
              stat.changeType === 'positive' ? 'text-emerald-400' : 'text-white/40'
            }`}>
              {stat.change}
            </span>
          </MatchCard>
        ))}
      </div>

      {/* Quick Action Card (Matches Screenshot) */}
      <div className="mb-10">
        <span className="text-[10px] uppercase font-bold tracking-widest text-white/40 block mb-3 font-sans">
          Quick Action
        </span>
        <MatchCard className="p-6 border border-accent/20 bg-accent/[0.02]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-black border border-accent/20 flex items-center justify-center shadow-glow">
                <Brain className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white font-sans mb-1">
                  Analyze a New Resume
                </h3>
                <p className="text-sm text-white/50">
                  Upload PDF or DOCX — predictions in under 800 ms.
                </p>
              </div>
            </div>
            <div>
              <button
                onClick={() => navigate('/dashboard/upload')}
                className="px-6 py-2.5 rounded-full bg-accent hover:bg-accent-dark text-black font-semibold text-sm flex items-center gap-2 shadow-glow hover:shadow-glow-lg transition-all duration-300 w-full md:w-auto"
              >
                <UploadCloud className="w-4 h-4" />
                <span>Upload Resume</span>
              </button>
            </div>
          </div>
        </MatchCard>
      </div>

      {/* Recent Analyses List (Matches Screenshot) */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <span className="text-[10px] uppercase font-bold tracking-widest text-white/40 font-sans">
            Recent Analyses
          </span>
          <button className="text-xs font-semibold text-accent hover:underline font-mono">
            VIEW ALL
          </button>
        </div>

        <div className="flex flex-col gap-3">
          {recentAnalyses.map((item, idx) => (
            <div 
              key={idx}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl glass-panel border border-white/5 hover:border-white/10 transition-all duration-200 gap-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-black border border-white/5 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white/40" />
                </div>
                <div>
                  <span className="text-sm font-semibold text-white block mb-0.5 font-mono">
                    {item.filename}
                  </span>
                  <span className="text-xs text-accent font-medium">
                    {item.role}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between sm:justify-end gap-6">
                <div className="text-right">
                  <span className="text-sm font-bold text-white block glow-text-yellow">
                    {item.confidence}
                  </span>
                  <span className="text-[10px] text-white/30 font-mono">
                    {item.time}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
