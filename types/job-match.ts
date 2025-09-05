export interface JobDescription {
  id: string
  title: string
  company: string
  text: string
  requirements: string[]
  preferredSkills: string[]
  createdAt: string
}

export interface JobMatchResult {
  matchScore: number
  verdict: "strong-fit" | "moderate-fit" | "low-fit"
  verdictReason: string
  missingKeywords: {
    keyword: string
    importance: number
    category: "hard-skill" | "soft-skill" | "tool" | "certification" | "experience"
  }[]
  summaryRewrites: {
    variant: number
    text: string
    focus: string
  }[]
  bulletRewrites: {
    originalBullet: string
    rewrittenBullet: string
    improvement: string
  }[]
  skillSuggestions: {
    action: "add" | "remove" | "reorder"
    skill: string
    justification: string
    priority: "high" | "medium" | "low"
  }[]
  scanId: string
  resumeId: string
  jobId: string
  createdAt: string
}

export interface JobMatchRequest {
  resumeId: string
  jobDescription: string
  jobTitle?: string
  company?: string
}
