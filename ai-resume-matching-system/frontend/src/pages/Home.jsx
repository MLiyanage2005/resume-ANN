import React from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import MatchCard from '../components/MatchCard'
import { 
  ArrowRight, Cpu, Network, CheckCircle2, FileText, 
  Layers, Zap, Code, ShieldCheck, Terminal, Compass 
} from 'lucide-react'
import { motion } from 'framer-motion'

export default function Home() {
  const navigate = useNavigate()

  const stats = [
    { value: '94.2%', label: 'Prediction Accuracy' },
    { value: '< 0.8s', label: 'Inference Speed' },
    { value: '25+', label: 'Career Domains' },
    { value: '50k+', label: 'Training Samples' }
  ]

  const capabilities = [
    {
      title: 'Transformer-Based Resume Understanding',
      desc: 'Leverages BERT-family encoders to comprehend full resume context — capturing professional intent semantically, far beyond keyword matching.',
      tag: 'NLP',
      icon: Network
    },
    {
      title: 'Semantic Skill Analysis',
      desc: 'Maps skill mentions into a dense 384-dim vector space so fuzzy-match recognition works across synonymous technical competencies.',
      tag: '#embeddings',
      icon: Cpu
    },
    {
      title: 'AI Role Prediction',
      desc: 'An ANN classifier trained on 50k+ annotated resumes predicts career domain with sub-second inference and calibrated confidence scores.',
      tag: 'Classification',
      icon: Terminal
    },
    {
      title: 'PDF & DOCX Resume Support',
      desc: 'Robust ingestion via PyMuPDF and python-docx with intelligent text normalization, layout stripping, and Unicode handling.',
      tag: 'Parsing',
      icon: FileText
    },
    {
      title: 'Top Career Match Confidence Scores',
      desc: 'Returns probability distributions across 25 career domains so recruiters evaluate depth of fit — not just a top-1 label.',
      tag: 'Analytics',
      icon: Layers
    },
    {
      title: 'Fast AI Inference Pipeline',
      desc: 'Optimized serving architecture delivers predictions in under 800 ms end-to-end — from raw document bytes to ranked domain output.',
      tag: 'Performance',
      icon: Zap
    }
  ]

  const techStack = [
    {
      category: 'Frontend',
      subtitle: 'Modern reactive UI with atomic CSS',
      badges: ['React 18', 'Vite', 'TailwindCSS']
    },
    {
      category: 'Backend',
      subtitle: 'High performance async API server',
      badges: ['FastAPI', 'Python 3.11', 'Uvicorn']
    },
    {
      category: 'Machine Learning',
      subtitle: 'Transformer embeddings + ANN classifier',
      badges: ['TensorFlow', 'Sentence Transformers', 'all-MiniLM-L6-v2']
    },
    {
      category: 'Document Processing',
      subtitle: 'Multi-format resume ingestion pipeline',
      badges: ['PyMuPDF', 'python-docx', 'Text Normalizer']
    },
    {
      category: 'Deployment',
      subtitle: 'Containerized production stack',
      badges: ['Docker', 'Docker Compose', 'Nginx']
    }
  ]

  const howItWorks = [
    {
      step: '01',
      title: 'Resume Upload',
      desc: 'PDF or DOCX submitted via drag-and-drop interface.'
    },
    {
      step: '02',
      title: 'Text Extraction',
      desc: 'PyMuPDF / python-docx parses raw document content.'
    },
    {
      step: '03',
      title: 'Text Cleaning',
      desc: 'Tokenization, stop-word removal, unicode normalization.'
    },
    {
      step: '04',
      title: 'Transformer Embeddings',
      desc: 'all-MiniLM-L6-v2 encodes resume into 384-dimensional vector.'
    },
    {
      step: '05',
      title: 'ANN Prediction',
      desc: 'Approximate Nearest Neighbor lookup in career embedding space.'
    },
    {
      step: '06',
      title: 'Career Role Results',
      desc: 'Ranked probability distribution across 25 career domains returned.'
    }
  ]

  return (
    <div className="bg-black text-white relative min-h-screen">
      {/* Top Navigation */}
      <Navbar />

      {/* Grid Overlay */}
      <div className="absolute inset-0 grid-bg min-h-screen opacity-40 z-0 pointer-events-none" />

      {/* ================= SECTION 1 — HERO ================= */}
      <section className="relative min-h-screen pt-36 pb-20 flex flex-col items-center justify-center text-center px-6 md:px-12 z-10 overflow-hidden">
        {/* Animated Glow Spotlights */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] pointer-events-none animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-4xl mx-auto flex flex-col items-center">
          {/* Sub-header version badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-8 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/[0.03] text-accent text-xs font-bold tracking-widest uppercase font-mono shadow-glow"
          >
            • AI-POWERED · TRANSFORMER BASED · v2.4.1
          </motion.div>

          {/* Large glowing title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tight mb-8 font-sans leading-none"
          >
            Resume <span className="text-accent glow-text-yellow">AI</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-2xl md:text-3xl font-semibold text-white/95 mb-6 tracking-wide font-sans"
          >
            AI-Powered Resume Intelligence Platform
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-base md:text-lg text-white/60 mb-12 max-w-2xl leading-relaxed"
          >
            Analyzes resumes with transformer embeddings to extract semantic meaning,
            predict career domains, and match professional skills — powered by state-of-the-art NLP and neural inference.
          </motion.p>

          {/* Call-to-action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row gap-4 mb-24 relative z-10"
          >
            <button
              onClick={() => navigate('/dashboard')}
              className="px-8 py-3.5 rounded-full bg-accent hover:bg-accent-dark text-black font-bold text-sm tracking-wide shadow-glow hover:shadow-glow-lg flex items-center justify-center gap-2 group transition-all duration-300 scale-100 hover:scale-105 active:scale-95"
            >
              <span>Launch Platform</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => {
                const el = document.getElementById('features');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-3.5 rounded-full border border-white/10 hover:border-white/30 bg-white/[0.02] text-white font-semibold text-sm tracking-wide hover:bg-white/5 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <span>View Demo</span>
              <span className="text-white/40 group-hover:translate-x-1 transition-transform">&gt;</span>
            </button>
          </motion.div>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 p-8 rounded-3xl bg-white/[0.01] border border-white/5 backdrop-blur-md"
          >
            {stats.map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <span className="text-3xl md:text-4xl font-extrabold text-white mb-2 glow-text-yellow">{stat.value}</span>
                <span className="text-xs uppercase font-bold tracking-widest text-white/40 text-center">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================= SECTION 2 — CAPABILITIES ================= */}
      <section id="features" className="py-32 px-6 md:px-12 max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <span className="text-xs uppercase font-bold tracking-widest text-accent font-mono mb-3 block">
            Capabilities
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-4 font-sans">
            Built for intelligence. Designed for precision.
          </h2>
          <p className="text-base md:text-lg text-white/50 max-w-2xl mx-auto">
            Six distinct AI capabilities working in concert to deliver career intelligence at professional grade.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((item, idx) => {
            const IconComponent = item.icon
            return (
              <MatchCard key={idx} delay={idx * 0.05}>
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 rounded-xl bg-black border border-white/10 flex items-center justify-center group-hover:border-accent/40 group-hover:shadow-glow transition-all duration-300">
                    <IconComponent className="w-5 h-5 text-accent" />
                  </div>
                  <span className="px-2.5 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider bg-white/5 border border-white/5 text-white/50 font-mono">
                    {item.tag}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-3 font-sans group-hover:text-accent transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-sm text-white/50 leading-relaxed">
                  {item.desc}
                </p>
              </MatchCard>
            )
          })}
        </div>
      </section>

      {/* ================= SECTION 3 — TECHNOLOGY STACK ================= */}
      <section id="technology" className="py-32 px-6 md:px-12 max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <span className="text-xs uppercase font-bold tracking-widest text-accent font-mono mb-3 block">
            Technology
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
            Enterprise-grade stack. Open architecture.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {techStack.map((tech, idx) => (
            <MatchCard key={idx} delay={idx * 0.08} className="flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-accent font-mono block mb-2">{tech.category}</span>
                <p className="text-white/50 text-sm mb-6 leading-relaxed">{tech.subtitle}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {tech.badges.map((badge, bIdx) => (
                  <span 
                    key={bIdx} 
                    className="px-3 py-1 rounded-full text-xs font-semibold bg-white/5 border border-white/10 text-white/70 font-mono"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </MatchCard>
          ))}
        </div>
      </section>

      {/* ================= SECTION 4 — HOW IT WORKS ================= */}
      <section id="about" className="py-32 px-6 md:px-12 max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-24">
          <span className="text-xs uppercase font-bold tracking-widest text-accent font-mono mb-3 block">
            Inference Pipeline
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
            How It Works
          </h2>
        </div>

        {/* Vertical Timeline */}
        <div className="relative">
          {/* Vertical Center Line */}
          <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-0.5 bg-white/5 -translate-x-1/2 pointer-events-none" />

          {/* Timeline Nodes */}
          <div className="flex flex-col gap-12">
            {howItWorks.map((item, idx) => {
              const isEven = idx % 2 === 0
              return (
                <div key={idx} className="relative flex flex-col md:flex-row items-start md:items-center">
                  {/* Glowing timeline node dot */}
                  <div className="absolute left-6 md:left-1/2 w-4 h-4 rounded-full bg-black border-2 border-accent -translate-x-1/2 z-20 shadow-glow" />

                  {/* Spacer or Card side block depending on layout */}
                  <div className={`w-full md:w-1/2 pl-16 md:pl-0 ${isEven ? 'md:pr-16 md:text-right' : 'md:order-2 md:pl-16'}`}>
                    <div className="inline-block p-6 rounded-2xl glass-panel border border-white/5 hover:border-accent/20 transition-all duration-300 max-w-md w-full">
                      <span className="text-xs font-bold text-accent font-mono block mb-2">Step {item.step}</span>
                      <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                      <p className="text-sm text-white/50 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>

                  {/* Empty spacer block for standard layout grids */}
                  <div className="hidden md:block w-1/2" />
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ================= SECTION 5 — CTA SECTION ================= */}
      <section className="py-32 px-6 md:px-12 max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl p-12 md:p-16 overflow-hidden glass-panel border border-white/10 text-center flex flex-col items-center gap-8"
        >
          {/* Background Ambient Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-accent/10 to-accent/5 pointer-events-none blur-3xl" />
          
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white max-w-xl">
            Ready to find your perfect career match?
          </h2>
          <p className="text-base text-white/50 max-w-md">
            Upload your resume and get AI-powered career domain predictions in under a second.
          </p>
          
          <button
            onClick={() => navigate('/dashboard/upload')}
            className="px-8 py-4 rounded-full bg-accent hover:bg-accent-dark text-black font-bold text-sm tracking-wide shadow-glow hover:shadow-glow-lg flex items-center gap-2 group transition-all duration-300 scale-100 hover:scale-105 active:scale-95"
          >
            <span>Start Analyzing Now</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 text-center text-xs text-white/30 z-10 relative">
        <p>© {new Date().getFullYear()} Resume AI Inc. All rights reserved. Designed for predictive excellence.</p>
      </footer>
    </div>
  )
}
