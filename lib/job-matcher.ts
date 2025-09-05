import type { ResumeData } from "@/types/resume"
import type { JobMatchResult, JobMatchRequest } from "@/types/job-match"

export class JobMatcher {
  private static readonly ACTION_VERBS = [
    "achieved",
    "analyzed",
    "built",
    "collaborated",
    "created",
    "delivered",
    "developed",
    "enhanced",
    "established",
    "executed",
    "implemented",
    "improved",
    "increased",
    "led",
    "managed",
    "optimized",
    "reduced",
    "resolved",
    "spearheaded",
    "streamlined",
    "transformed",
  ]

  private static readonly SKILL_CATEGORIES = {
    "hard-skill": ["JavaScript", "Python", "Java", "React", "Node.js", "SQL", "Machine Learning", "Data Analysis"],
    "soft-skill": ["Leadership", "Communication", "Problem Solving", "Team Collaboration", "Project Management"],
    tool: ["Git", "Docker", "AWS", "Kubernetes", "Jira", "Figma", "Salesforce"],
    certification: ["AWS Certified", "PMP", "Scrum Master", "Google Cloud", "Microsoft Certified"],
    experience: ["Senior", "Lead", "Manager", "Director", "Architect", "Principal"],
  }

  static extractKeywords(text: string): string[] {
    // Simple keyword extraction - in real app would use NLP
    const words = text
      .toLowerCase()
      .replace(/[^\w\s]/g, " ")
      .split(/\s+/)
      .filter((word) => word.length > 2)

    // Remove common words
    const stopWords = new Set([
      "the",
      "and",
      "for",
      "are",
      "but",
      "not",
      "you",
      "all",
      "can",
      "had",
      "her",
      "was",
      "one",
      "our",
      "out",
      "day",
      "get",
      "has",
      "him",
      "his",
      "how",
      "man",
      "new",
      "now",
      "old",
      "see",
      "two",
      "way",
      "who",
      "boy",
      "did",
      "its",
      "let",
      "put",
      "say",
      "she",
      "too",
      "use",
    ])

    return [...new Set(words.filter((word) => !stopWords.has(word)))]
  }

  static calculateMatchScore(resume: ResumeData, jobText: string): number {
    const resumeText = this.extractResumeText(resume).toLowerCase()
    const jobKeywords = this.extractKeywords(jobText)

    let matchedKeywords = 0
    let totalImportantKeywords = 0

    // Check for skill matches
    Object.values(this.SKILL_CATEGORIES)
      .flat()
      .forEach((skill) => {
        if (jobText.toLowerCase().includes(skill.toLowerCase())) {
          totalImportantKeywords++
          if (resumeText.includes(skill.toLowerCase())) {
            matchedKeywords++
          }
        }
      })

    // Check for general keyword overlap
    const resumeKeywords = this.extractKeywords(resumeText)
    const commonKeywords = jobKeywords.filter((keyword) =>
      resumeKeywords.some((resumeKeyword) => resumeKeyword.includes(keyword) || keyword.includes(resumeKeyword)),
    )

    const keywordScore =
      totalImportantKeywords > 0
        ? (matchedKeywords / totalImportantKeywords) * 70
        : (commonKeywords.length / Math.max(jobKeywords.length * 0.3, 1)) * 70

    // Experience relevance bonus
    const experienceBonus = this.calculateExperienceRelevance(resume, jobText)

    return Math.min(100, Math.round(keywordScore + experienceBonus))
  }

  static calculateExperienceRelevance(resume: ResumeData, jobText: string): number {
    let bonus = 0

    // Check for seniority level match
    const jobSeniority = this.extractSeniorityLevel(jobText)
    const resumeSeniority = this.extractResumeSeniorityLevel(resume)

    if (jobSeniority && resumeSeniority && jobSeniority <= resumeSeniority) {
      bonus += 15
    }

    // Check for industry/role match
    const jobRole = this.extractJobRole(jobText)
    const resumeRoles = resume.experience.map((exp) => exp.position.toLowerCase())

    if (jobRole && resumeRoles.some((role) => role.includes(jobRole) || jobRole.includes(role))) {
      bonus += 15
    }

    return bonus
  }

  static extractSeniorityLevel(text: string): number {
    const seniorityMap: { [key: string]: number } = {
      intern: 1,
      junior: 2,
      associate: 3,
      mid: 4,
      senior: 5,
      lead: 6,
      principal: 7,
      staff: 7,
      manager: 6,
      director: 8,
    }

    for (const [level, value] of Object.entries(seniorityMap)) {
      if (text.toLowerCase().includes(level)) {
        return value
      }
    }
    return 3 // Default mid-level
  }

  static extractResumeSeniorityLevel(resume: ResumeData): number {
    const positions = resume.experience.map((exp) => exp.position.toLowerCase()).join(" ")
    return this.extractSeniorityLevel(positions)
  }

  static extractJobRole(jobText: string): string {
    const roles = ["engineer", "developer", "designer", "manager", "analyst", "consultant", "specialist"]
    for (const role of roles) {
      if (jobText.toLowerCase().includes(role)) {
        return role
      }
    }
    return ""
  }

  static extractResumeText(resume: ResumeData): string {
    const sections = [
      resume.personal.fullName,
      resume.summary,
      resume.skills.join(" "),
      ...resume.experience.flatMap((exp) => [exp.position, exp.company, ...exp.bullets]),
      ...resume.education.map((edu) => `${edu.degree} ${edu.field}`),
      ...resume.projects.flatMap((proj) => [proj.name, proj.description, ...proj.technologies]),
      ...resume.certifications.map((cert) => `${cert.name} ${cert.issuer}`),
    ]
    return sections.join(" ")
  }

  static findMissingKeywords(resume: ResumeData, jobText: string): JobMatchResult["missingKeywords"] {
    const resumeText = this.extractResumeText(resume).toLowerCase()
    const missing: JobMatchResult["missingKeywords"] = []

    Object.entries(this.SKILL_CATEGORIES).forEach(([category, skills]) => {
      skills.forEach((skill) => {
        if (jobText.toLowerCase().includes(skill.toLowerCase()) && !resumeText.includes(skill.toLowerCase())) {
          missing.push({
            keyword: skill,
            importance: Math.random() * 0.4 + 0.6, // Mock importance 0.6-1.0
            category: category as any,
          })
        }
      })
    })

    return missing.sort((a, b) => b.importance - a.importance).slice(0, 10)
  }

  static generateSummaryRewrites(resume: ResumeData, jobText: string): JobMatchResult["summaryRewrites"] {
    const jobKeywords = this.extractKeywords(jobText).slice(0, 5)
    const role = this.extractJobRole(jobText) || "professional"

    return [
      {
        variant: 1,
        text: `Results-driven ${role} with ${resume.experience.length}+ years of experience in ${jobKeywords.slice(0, 3).join(", ")}. Proven track record of delivering high-impact solutions and driving business growth through innovative approaches.`,
        focus: "Results & Impact",
      },
      {
        variant: 2,
        text: `Experienced ${role} specializing in ${jobKeywords.slice(0, 2).join(" and ")} with expertise in ${resume.skills.slice(0, 3).join(", ")}. Passionate about leveraging technology to solve complex business challenges and improve operational efficiency.`,
        focus: "Technical Expertise",
      },
      {
        variant: 3,
        text: `Dynamic ${role} with strong background in ${jobKeywords.slice(0, 2).join(" and ")}. Demonstrated ability to lead cross-functional teams, manage complex projects, and deliver scalable solutions that exceed business objectives.`,
        focus: "Leadership & Collaboration",
      },
    ]
  }

  static generateBulletRewrites(resume: ResumeData, jobText: string): JobMatchResult["bulletRewrites"] {
    const relevantBullets = resume.experience
      .flatMap((exp) => exp.bullets.map((bullet) => ({ bullet, company: exp.company, position: exp.position })))
      .filter((item) => item.bullet.trim().length > 20)
      .slice(0, 3)

    return relevantBullets.map((item) => {
      const actionVerb = this.ACTION_VERBS[Math.floor(Math.random() * this.ACTION_VERBS.length)]
      const hasNumbers = /\d+/.test(item.bullet)

      let rewritten = item.bullet
      if (!hasNumbers) {
        rewritten = rewritten.replace(/^[^a-zA-Z]*/, `${actionVerb.charAt(0).toUpperCase() + actionVerb.slice(1)} `)
        rewritten += " resulting in 25% improvement in efficiency"
      }

      return {
        originalBullet: item.bullet,
        rewrittenBullet: rewritten,
        improvement: hasNumbers ? "Enhanced with stronger action verb" : "Added quantifiable impact metrics",
      }
    })
  }

  static generateSkillSuggestions(resume: ResumeData, jobText: string): JobMatchResult["skillSuggestions"] {
    const suggestions: JobMatchResult["skillSuggestions"] = []
    const resumeSkills = resume.skills.map((s) => s.toLowerCase())

    // Suggest adding missing skills
    Object.values(this.SKILL_CATEGORIES)
      .flat()
      .forEach((skill) => {
        if (
          jobText.toLowerCase().includes(skill.toLowerCase()) &&
          !resumeSkills.some((rs) => rs.includes(skill.toLowerCase()))
        ) {
          suggestions.push({
            action: "add",
            skill,
            justification: `Mentioned in job requirements - will improve keyword match`,
            priority: "high",
          })
        }
      })

    // Suggest reordering (move relevant skills to top)
    const jobKeywords = this.extractKeywords(jobText)
    resume.skills.forEach((skill) => {
      if (jobKeywords.some((keyword) => skill.toLowerCase().includes(keyword))) {
        suggestions.push({
          action: "reorder",
          skill,
          justification: "Move to top - highly relevant to this role",
          priority: "medium",
        })
      }
    })

    return suggestions.slice(0, 8)
  }

  static matchResumeToJob(resume: ResumeData, jobText: string, jobTitle?: string, company?: string): JobMatchResult {
    const matchScore = this.calculateMatchScore(resume, jobText)

    let verdict: JobMatchResult["verdict"] = "low-fit"
    let verdictReason = "Limited alignment with job requirements"

    if (matchScore >= 80) {
      verdict = "strong-fit"
      verdictReason = "Excellent match with strong keyword alignment and relevant experience"
    } else if (matchScore >= 60) {
      verdict = "moderate-fit"
      verdictReason = "Good foundation with some gaps that can be addressed"
    }

    return {
      matchScore,
      verdict,
      verdictReason,
      missingKeywords: this.findMissingKeywords(resume, jobText),
      summaryRewrites: this.generateSummaryRewrites(resume, jobText),
      bulletRewrites: this.generateBulletRewrites(resume, jobText),
      skillSuggestions: this.generateSkillSuggestions(resume, jobText),
      scanId: `match-${Date.now()}`,
      resumeId: resume.id,
      jobId: jobTitle || "",
    }
  }
}

export async function matchJobDescription(request: JobMatchRequest): Promise<JobMatchResult> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 2000))

  // In a real implementation, this would:
  // 1. Fetch the resume data from database using request.resumeId
  // 2. Parse and analyze the job description text
  // 3. Use advanced NLP for better keyword extraction and matching
  // 4. Store results in database for future reference

  // Mock resume data for demonstration
  const mockResume: ResumeData = {
    id: request.resumeId,
    personal: {
      fullName: "John Doe",
      email: "john@example.com",
      phone: "+1234567890",
      location: "San Francisco, CA",
      website: "",
      linkedin: "",
      github: "",
    },
    summary: "Experienced software engineer with 5+ years in web development",
    skills: ["JavaScript", "React", "Node.js", "Python", "SQL", "Git"],
    experience: [
      {
        id: "1",
        position: "Senior Software Engineer",
        company: "Tech Corp",
        location: "San Francisco, CA",
        startDate: "2021-01",
        endDate: "present",
        bullets: [
          "Developed scalable web applications using React and Node.js",
          "Led a team of 4 developers on critical product features",
          "Improved application performance by 40% through optimization",
        ],
      },
      {
        id: "2",
        position: "Software Engineer",
        company: "StartupXYZ",
        location: "San Francisco, CA",
        startDate: "2019-06",
        endDate: "2021-01",
        bullets: [
          "Built REST APIs using Python and Flask",
          "Collaborated with cross-functional teams on product development",
          "Implemented automated testing reducing bugs by 30%",
        ],
      },
    ],
    education: [
      {
        id: "1",
        degree: "Bachelor of Science",
        field: "Computer Science",
        school: "University of California",
        location: "Berkeley, CA",
        graduationDate: "2019-05",
      },
    ],
    projects: [
      {
        id: "1",
        name: "E-commerce Platform",
        description: "Full-stack web application for online shopping",
        technologies: ["React", "Node.js", "MongoDB"],
        startDate: "2020-01",
        endDate: "2020-06",
        url: "",
      },
    ],
    certifications: [
      {
        id: "1",
        name: "AWS Certified Developer",
        issuer: "Amazon Web Services",
        date: "2022-03",
        url: "",
      },
    ],
    links: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  const result = JobMatcher.matchResumeToJob(mockResume, request.jobDescription, request.jobTitle, request.company)

  // Add missing fields that the interface requires
  return {
    ...result,
    jobId: `job-${Date.now()}`,
    createdAt: new Date().toISOString(),
  }
}
