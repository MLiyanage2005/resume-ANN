/**
 * API Integration Service for Resume AI
 * Supports both real backend calls and automatic mock fallbacks for demo/development.
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

/**
 * Simulates processing delay and generates realistic predictions if the backend is unavailable.
 */
const generateMockPredictions = (filename) => {
  const nameLower = filename.toLowerCase();
  
  // Custom mock configurations based on filename keywords
  if (nameLower.includes('data') || nameLower.includes('science') || nameLower.includes('analyst') || nameLower.includes('ml')) {
    return {
      success: true,
      cleaned_text: "experienced professional in data science, machine learning, deep learning, python, tensorflow, sql, predictive modeling, data visualization, and statistics.",
      top_predictions: [
        { role: "Data Scientist", confidence: 0.88 },
        { role: "Business Analyst", confidence: 0.09 },
        { role: "Database Specialist", confidence: 0.03 }
      ],
      skills: ["Python", "TensorFlow", "PyTorch", "SQL", "Pandas", "Scikit-Learn", "Statistics", "NumPy", "Matplotlib", "Jupyter"],
      semantic_profile: {
        ml_expertise: 92,
        data_analysis: 85,
        programming: 78,
        research_skills: 70
      }
    };
  }
  
  if (nameLower.includes('devops') || nameLower.includes('cloud') || nameLower.includes('sys') || nameLower.includes('ops')) {
    return {
      success: true,
      cleaned_text: "experienced devops engineer with expertise in docker, kubernetes, aws, terraform, ci/cd pipelines, bash scripting, linux systems administration, and infrastructure monitoring.",
      top_predictions: [
        { role: "DevOps Engineer", confidence: 0.91 },
        { role: "Network Security Engineer", confidence: 0.06 },
        { role: "Java Developer", confidence: 0.03 }
      ],
      skills: ["Docker", "Kubernetes", "AWS", "Terraform", "Jenkins", "Bash", "Linux", "Git", "Prometheus", "YAML"],
      semantic_profile: {
        ml_expertise: 30,
        data_analysis: 45,
        programming: 82,
        research_skills: 60
      }
    };
  }

  if (nameLower.includes('web') || nameLower.includes('design') || nameLower.includes('front') || nameLower.includes('react') || nameLower.includes('html')) {
    return {
      success: true,
      cleaned_text: "creative frontend developer specializing in html5, css3, javascript, typescript, react.js, web design, UI/UX design, tailwind css, and responsive layout development.",
      top_predictions: [
        { role: "Web Designing", confidence: 0.85 },
        { role: "Java Developer", confidence: 0.10 },
        { role: "Arts", confidence: 0.05 }
      ],
      skills: ["React", "Vite", "TailwindCSS", "JavaScript", "TypeScript", "HTML5", "CSS3", "Framer Motion", "Figma", "UI/UX"],
      semantic_profile: {
        ml_expertise: 25,
        data_analysis: 50,
        programming: 88,
        research_skills: 55
      }
    };
  }

  // Default mock response (Java Developer/Software Engineer profile)
  return {
    success: true,
    cleaned_text: "software engineer with strong foundational skills in java development, spring boot, microservices architecture, rest apis, git, object-oriented design, and database modeling.",
    top_predictions: [
      { role: "Java Developer", confidence: 0.76 },
      { role: "DotNet Developer", confidence: 0.15 },
      { role: "Testing", confidence: 0.09 }
    ],
    skills: ["Java", "Spring Boot", "SQL", "Hibernate", "REST APIs", "Git", "Maven", "Docker", "Unit Testing", "Microservices"],
    semantic_profile: {
      ml_expertise: 40,
      data_analysis: 60,
      programming: 94,
      research_skills: 50
    }
  };
};

/**
 * Uploads a resume and gets predictions.
 * Tries the real backend API. If it fails, falls back to the mock generator.
 */
export const analyzeResume = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    // Attempting backend prediction call
    const response = await fetch(`${API_BASE_URL}/api/predict`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    const data = await response.json();
    return {
      success: true,
      cleaned_text: data.cleaned_text,
      top_predictions: data.top_predictions,
      // Map skills & profiles matching our prediction classes (or fallback defaults if not supplied by backend)
      skills: data.skills || getSkillsForRole(data.top_predictions[0]?.role),
      semantic_profile: data.semantic_profile || getProfileForRole(data.top_predictions[0]?.role)
    };
  } catch (error) {
    console.warn("Backend API unavailable. Running local prediction emulation fallback...", error);
    
    // Simulate short network delay for the processing screen to feel real
    await new Promise((resolve) => setTimeout(resolve, 2500));
    
    return generateMockPredictions(file.name);
  }
};

const getSkillsForRole = (role) => {
  const defaults = {
    "Data Scientist": ["Python", "TensorFlow", "PyTorch", "SQL", "Pandas", "Scikit-Learn", "Statistics", "NumPy", "Matplotlib", "Jupyter"],
    "DevOps Engineer": ["Docker", "Kubernetes", "AWS", "Terraform", "Jenkins", "Bash", "Linux", "Git", "Prometheus", "YAML"],
    "Web Designing": ["React", "Vite", "TailwindCSS", "JavaScript", "TypeScript", "HTML5", "CSS3", "Framer Motion", "Figma", "UI/UX"]
  };
  return defaults[role] || ["Java", "Spring Boot", "SQL", "REST APIs", "Git", "Maven", "Docker", "Unit Testing", "Microservices"];
};

const getProfileForRole = (role) => {
  const defaults = {
    "Data Scientist": { ml_expertise: 92, data_analysis: 85, programming: 78, research_skills: 70 },
    "DevOps Engineer": { ml_expertise: 30, data_analysis: 45, programming: 82, research_skills: 60 },
    "Web Designing": { ml_expertise: 25, data_analysis: 50, programming: 88, research_skills: 55 }
  };
  return defaults[role] || { ml_expertise: 40, data_analysis: 60, programming: 94, research_skills: 50 };
};
