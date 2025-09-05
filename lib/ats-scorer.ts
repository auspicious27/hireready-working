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
    const found = allKeywords.filter((keyword) => resumeText.includes(keyword.toLowerCase()))
    const missing = allKeywords.filter((keyword) => !resumeText.includes(keyword.toLowerCase()))

    // Score based on industry-relevant keywords found
    const score = Math.min(100, (found.length / Math.max(allKeywords.length * 0.3, 1)) * 100)

    return { score: Math.round(score), found, missing: missing.slice(0, 10) }
  }

  static calculateSkillsCoverage(resume: ResumeData): { score: number; missing: string[] } {
    const resumeSkills = resume.skills.map((s) => s.toLowerCase())
    const allSkills = [...HARD_SKILLS, ...SOFT_SKILLS].map((s) => s.toLowerCase())

    const foundSkills = allSkills.filter((skill) =>
      resumeSkills.some((resumeSkill) => resumeSkill.includes(skill) || skill.includes(resumeSkill)),
    )

    const missingSkills = SOFT_SKILLS.filter(
      (skill) => !resumeSkills.some((resumeSkill) => resumeSkill.toLowerCase().includes(skill.toLowerCase())),
    ).slice(0, 5)

    const score = Math.min(100, (foundSkills.length / Math.max(allSkills.length * 0.2, 1)) * 100)

    return { score: Math.round(score), missing: missingSkills }
  }

  static calculateExperienceRelevance(resume: ResumeData): number {
    let score = 0

    // Base score for having experience
    if (resume.experience.length > 0) score += 30

    // Bonus for multiple positions
    if (resume.experience.length >= 2) score += 20
    if (resume.experience.length >= 3) score += 10

    // Check for quantified achievements
    const hasQuantifiedBullets = resume.experience.some((exp) => exp.bullets.some((bullet) => /\d+/.test(bullet)))
    if (hasQuantifiedBullets) score += 25

    // Check for action verbs
    const actionVerbs = ["led", "managed", "developed", "implemented", "created", "improved", "increased", "reduced"]
    const hasActionVerbs = resume.experience.some((exp) =>
      exp.bullets.some((bullet) => actionVerbs.some((verb) => bullet.toLowerCase().includes(verb))),
    )
    if (hasActionVerbs) score += 15

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
    // Mock scoring for uploaded text - simplified version
    const keywordAnalysis = this.calculateKeywordMatch(resumeText)

    // Basic text analysis
    const wordCount = resumeText.split(/\s+/).length
    const hasEmail = /@/.test(resumeText)
    const hasPhone = /\d{3}[-.\s]?\d{3}[-.\s]?\d{4}/.test(resumeText)
    const hasQuantifiedAchievements = /\d+%|\d+\s*(years?|months?|k\b|million|billion)/.test(resumeText)

    let formattingScore = 70
    if (hasEmail) formattingScore += 10
    if (hasPhone) formattingScore += 10
    if (wordCount > 200) formattingScore += 10

    let experienceScore = 40
    if (hasQuantifiedAchievements) experienceScore += 30
    if (wordCount > 400) experienceScore += 20
    if (/\b(led|managed|developed|created|improved)\b/i.test(resumeText)) experienceScore += 10

    const overall = Math.round(
      keywordAnalysis.score * 0.35 +
        60 * 0.3 + // Default skills score
        Math.min(100, experienceScore) * 0.25 +
        Math.min(100, formattingScore) * 0.1,
    )

    const score: ATSScore = {
      overall,
      breakdown: {
        keywordMatch: keywordAnalysis.score,
        skillsCoverage: 60,
        experienceRelevance: Math.min(100, experienceScore),
        formatting: Math.min(100, formattingScore),
      },
      missing: {
        hardSkills: keywordAnalysis.missing.slice(0, 5),
        softSkills: SOFT_SKILLS.slice(0, 5),
        tools: TOOLS_PLATFORMS.slice(0, 5),
        certifications: CERTIFICATIONS.slice(0, 3),
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
