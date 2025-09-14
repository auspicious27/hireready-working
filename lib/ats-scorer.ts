import type { ResumeData } from "@/types/resume"
import type { ATSScore, ATSScanResult } from "@/types/ats"

// Mock keyword databases - in real app, these would be more comprehensive
const HARD_SKILLS = [
  "JavaScript",
  "Python",
  "Java",
  "React",
  "Node.js",
  "TypeScript",
  "SQL",
  "AWS",
  "Docker",
  "Kubernetes",
  "Git",
  "MongoDB",
  "PostgreSQL",
  "Redis",
  "GraphQL",
  "REST API",
  "Machine Learning",
  "Data Analysis",
  "HTML",
  "CSS",
  "Vue.js",
  "Angular",
  "Express.js",
  "Django",
  "Flask",
  "Spring Boot",
  "Laravel",
]

const SOFT_SKILLS = [
  "Leadership",
  "Communication",
  "Problem Solving",
  "Team Collaboration",
  "Project Management",
  "Critical Thinking",
  "Adaptability",
  "Time Management",
  "Creativity",
  "Analytical Thinking",
  "Attention to Detail",
  "Customer Service",
  "Negotiation",
  "Presentation",
  "Mentoring",
]

const TOOLS_PLATFORMS = [
  "GitHub",
  "GitLab",
  "Jira",
  "Confluence",
  "Slack",
  "Trello",
  "Asana",
  "Jenkins",
  "CircleCI",
  "Terraform",
  "Ansible",
  "Figma",
  "Adobe Creative Suite",
  "Microsoft Office",
  "Google Workspace",
  "Salesforce",
  "HubSpot",
  "Tableau",
  "Power BI",
  "Elasticsearch",
  "Splunk",
]

const CERTIFICATIONS = [
  "AWS Certified",
  "Google Cloud",
  "Azure",
  "PMP",
  "Scrum Master",
  "CISSP",
  "CompTIA",
  "Salesforce Certified",
  "Oracle Certified",
  "Microsoft Certified",
  "Cisco Certified",
]

export class ATSScorer {
  static extractTextFromResume(resume: ResumeData): string {
    const sections = []

    // Personal info
    sections.push(resume.personal.fullName)
    sections.push(resume.personal.email)

    // Summary
    if (resume.summary) {
      sections.push(resume.summary)
    }

    // Skills
    sections.push(resume.skills.join(" "))

    // Experience
    resume.experience.forEach((exp) => {
      sections.push(`${exp.position} ${exp.company}`)
      sections.push(exp.bullets.join(" "))
    })

    // Education
    resume.education.forEach((edu) => {
      sections.push(`${edu.degree} ${edu.field} ${edu.institution}`)
    })

    // Projects
    resume.projects.forEach((proj) => {
      sections.push(`${proj.name} ${proj.description}`)
      sections.push(proj.technologies.join(" "))
    })

    // Certifications
    resume.certifications.forEach((cert) => {
      sections.push(`${cert.name} ${cert.issuer}`)
    })

    return sections.join(" ").toLowerCase()
  }

  static calculateKeywordMatch(resumeText: string): { score: number; found: string[]; missing: string[] } {
    const allKeywords = [...HARD_SKILLS, ...TOOLS_PLATFORMS].map((k) => k.toLowerCase())
    const resumeTextLower = resumeText.toLowerCase()
    
    const found = allKeywords.filter((keyword) => resumeTextLower.includes(keyword.toLowerCase()))
    const missing = allKeywords.filter((keyword) => !resumeTextLower.includes(keyword.toLowerCase()))

    // More realistic scoring based on industry standards
    // ATS systems typically look for 60-80% keyword match
    const keywordDensity = found.length / Math.max(allKeywords.length * 0.4, 1) // Expect 40% of keywords
    const score = Math.min(100, Math.round(keywordDensity * 100))

    return { 
      score: Math.max(0, score), 
      found: found.slice(0, 20), // Limit to top 20 found keywords
      missing: missing.slice(0, 10) // Show top 10 missing keywords
    }
  }

  static calculateSkillsCoverage(resume: ResumeData): { score: number; missing: string[] } {
    const resumeSkills = resume.skills.map((s) => s.toLowerCase())
    const allSkills = [...HARD_SKILLS, ...SOFT_SKILLS].map((s) => s.toLowerCase())

    const foundSkills = allSkills.filter((skill) =>
      resumeSkills.some((resumeSkill) => resumeSkill.includes(skill) || skill.includes(resumeSkill)),
    )

    const missingSoftSkills = SOFT_SKILLS.filter(
      (skill) => !resumeSkills.some((resumeSkill) => resumeSkill.toLowerCase().includes(skill.toLowerCase())),
    ).slice(0, 5)

    // More balanced scoring - expect 30% of total skills
    const skillDensity = foundSkills.length / Math.max(allSkills.length * 0.3, 1)
    const score = Math.min(100, Math.round(skillDensity * 100))

    return { score: Math.max(0, score), missing: missingSoftSkills }
  }

  static calculateExperienceRelevance(resume: ResumeData): number {
    let score = 0

    // Base score for having experience
    if (resume.experience.length > 0) score += 25

    // Bonus for multiple positions (shows career progression)
    if (resume.experience.length >= 2) score += 15
    if (resume.experience.length >= 3) score += 10
    if (resume.experience.length >= 4) score += 5

    // Check for quantified achievements (numbers, percentages, metrics)
    const quantifiedPatterns = [
      /\d+%/, // percentages
      /\d+\s*(years?|months?)/, // time periods
      /\d+\s*(k\b|million|billion)/, // large numbers
      /\d+\s*(users?|customers?|clients?)/, // user counts
      /\$\d+/, // dollar amounts
      /\d+x/, // multipliers
    ]
    
    const hasQuantifiedBullets = resume.experience.some((exp) => 
      exp.bullets.some((bullet) => 
        quantifiedPatterns.some(pattern => pattern.test(bullet))
      )
    )
    if (hasQuantifiedBullets) score += 20

    // Check for strong action verbs
    const actionVerbs = [
      "led", "managed", "developed", "implemented", "created", "improved", 
      "increased", "reduced", "optimized", "designed", "built", "launched",
      "achieved", "delivered", "executed", "coordinated", "supervised"
    ]
    const hasActionVerbs = resume.experience.some((exp) =>
      exp.bullets.some((bullet) => 
        actionVerbs.some((verb) => bullet.toLowerCase().includes(verb))
      ),
    )
    if (hasActionVerbs) score += 15

    // Check for leadership indicators
    const leadershipKeywords = ["team", "lead", "manage", "supervise", "mentor", "train"]
    const hasLeadership = resume.experience.some((exp) =>
      exp.bullets.some((bullet) => 
        leadershipKeywords.some((keyword) => bullet.toLowerCase().includes(keyword))
      ),
    )
    if (hasLeadership) score += 10

    return Math.min(100, score)
  }

  static calculateFormattingScore(resume: ResumeData): number {
    let score = 100

    // Check required fields
    if (!resume.personal.fullName) score -= 20
    if (!resume.personal.email) score -= 15
    if (!resume.personal.phone) score -= 10

    // Check for consistent date formatting
    const hasInconsistentDates = resume.experience.some((exp) => !exp.startDate || (!exp.endDate && !exp.current))
    if (hasInconsistentDates) score -= 15

    // Check for empty sections
    if (resume.skills.length === 0) score -= 10
    if (resume.experience.length === 0) score -= 20

    // Check for bullet points
    const hasEmptyBullets = resume.experience.some((exp) => exp.bullets.some((bullet) => !bullet.trim()))
    if (hasEmptyBullets) score -= 10

    return Math.max(0, score)
  }

  static generateRecommendations(score: ATSScore): string[] {
    const recommendations = []

    if (score.breakdown.keywordMatch < 60) {
      recommendations.push("Add more industry-relevant keywords and technical skills")
    }

    if (score.breakdown.skillsCoverage < 70) {
      recommendations.push("Include more soft skills like leadership, communication, and problem-solving")
    }

    if (score.breakdown.experienceRelevance < 70) {
      recommendations.push("Quantify your achievements with specific numbers and metrics")
      recommendations.push("Use strong action verbs to start your bullet points")
    }

    if (score.breakdown.formatting < 80) {
      recommendations.push("Ensure all required fields are completed")
      recommendations.push("Use consistent date formatting throughout")
    }

    if (score.overall < 70) {
      recommendations.push("Consider tailoring your resume for specific job descriptions")
    }

    return recommendations
  }

  static scoreResume(resume: ResumeData): ATSScanResult {
    const resumeText = this.extractTextFromResume(resume)

    // Calculate individual scores
    const keywordAnalysis = this.calculateKeywordMatch(resumeText)
    const skillsAnalysis = this.calculateSkillsCoverage(resume)
    const experienceScore = this.calculateExperienceRelevance(resume)
    const formattingScore = this.calculateFormattingScore(resume)

    // Calculate weighted overall score
    const overall = Math.round(
      keywordAnalysis.score * 0.35 + skillsAnalysis.score * 0.3 + experienceScore * 0.25 + formattingScore * 0.1,
    )

    const score: ATSScore = {
      overall,
      breakdown: {
        keywordMatch: keywordAnalysis.score,
        skillsCoverage: skillsAnalysis.score,
        experienceRelevance: experienceScore,
        formatting: formattingScore,
      },
      missing: {
        hardSkills: keywordAnalysis.missing.slice(0, 5),
        softSkills: skillsAnalysis.missing,
        tools: TOOLS_PLATFORMS.filter((tool) => !resumeText.includes(tool.toLowerCase())).slice(0, 5),
        certifications: CERTIFICATIONS.filter((cert) => !resumeText.includes(cert.toLowerCase())).slice(0, 3),
      },
      recommendations: [],
      scanId: `scan-${Date.now()}`,
      createdAt: new Date().toISOString(),
    }

    score.recommendations = this.generateRecommendations(score)

    let verdict: ATSScanResult["verdict"] = "poor"
    if (overall >= 85) verdict = "excellent"
    else if (overall >= 70) verdict = "good"
    else if (overall >= 50) verdict = "needs-improvement"

    return {
      ...score,
      resumeId: resume.id,
      verdict,
    }
  }

  static scoreResumeText(resumeText: string, fileName?: string): ATSScanResult {
    // Enhanced text analysis for uploaded files
    const keywordAnalysis = this.calculateKeywordMatch(resumeText)
    
    // Basic text analysis
    const wordCount = resumeText.split(/\s+/).length
    const hasEmail = /@/.test(resumeText)
    const hasPhone = /\d{3}[-.\s]?\d{3}[-.\s]?\d{4}/.test(resumeText)
    
    // Enhanced quantified achievements detection
    const quantifiedPatterns = [
      /\d+%/, // percentages
      /\d+\s*(years?|months?)/, // time periods
      /\d+\s*(k\b|million|billion)/, // large numbers
      /\d+\s*(users?|customers?|clients?)/, // user counts
      /\$\d+/, // dollar amounts
      /\d+x/, // multipliers
    ]
    const hasQuantifiedAchievements = quantifiedPatterns.some(pattern => pattern.test(resumeText))

    // Calculate formatting score
    let formattingScore = 60 // Base score
    if (hasEmail) formattingScore += 15
    if (hasPhone) formattingScore += 10
    if (wordCount > 200) formattingScore += 10
    if (wordCount > 400) formattingScore += 5

    // Calculate experience score
    let experienceScore = 30 // Base score
    if (hasQuantifiedAchievements) experienceScore += 25
    if (wordCount > 400) experienceScore += 20
    if (wordCount > 600) experienceScore += 10
    
    // Check for action verbs
    const actionVerbs = [
      "led", "managed", "developed", "implemented", "created", "improved", 
      "increased", "reduced", "optimized", "designed", "built", "launched"
    ]
    const hasActionVerbs = actionVerbs.some(verb => new RegExp(`\\b${verb}\\b`, 'i').test(resumeText))
    if (hasActionVerbs) experienceScore += 15

    // Calculate skills coverage based on text analysis
    const skillsKeywords = [...HARD_SKILLS, ...SOFT_SKILLS].map(s => s.toLowerCase())
    const foundSkills = skillsKeywords.filter(skill => resumeText.toLowerCase().includes(skill))
    const skillsScore = Math.min(100, Math.round((foundSkills.length / Math.max(skillsKeywords.length * 0.3, 1)) * 100))

    const overall = Math.round(
      keywordAnalysis.score * 0.35 +
      skillsScore * 0.3 +
      Math.min(100, experienceScore) * 0.25 +
      Math.min(100, formattingScore) * 0.1,
    )

    const score: ATSScore = {
      overall,
      breakdown: {
        keywordMatch: keywordAnalysis.score,
        skillsCoverage: skillsScore,
        experienceRelevance: Math.min(100, experienceScore),
        formatting: Math.min(100, formattingScore),
      },
      missing: {
        hardSkills: keywordAnalysis.missing.slice(0, 5),
        softSkills: SOFT_SKILLS.filter(skill => !resumeText.toLowerCase().includes(skill.toLowerCase())).slice(0, 5),
        tools: TOOLS_PLATFORMS.filter(tool => !resumeText.toLowerCase().includes(tool.toLowerCase())).slice(0, 5),
        certifications: CERTIFICATIONS.filter(cert => !resumeText.toLowerCase().includes(cert.toLowerCase())).slice(0, 3),
      },
      recommendations: [],
      scanId: `scan-${Date.now()}`,
      createdAt: new Date().toISOString(),
    }

    score.recommendations = this.generateRecommendations(score)

    let verdict: ATSScanResult["verdict"] = "poor"
    if (overall >= 85) verdict = "excellent"
    else if (overall >= 70) verdict = "good"
    else if (overall >= 50) verdict = "needs-improvement"

    return {
      ...score,
      fileName,
      verdict,
    }
  }
}
