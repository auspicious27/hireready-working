export interface ATSScore {
  overall: number
  breakdown: {
    keywordMatch: number
    skillsCoverage: number
    experienceRelevance: number
    formatting: number
  }
  missing: {
    hardSkills: string[]
    softSkills: string[]
    tools: string[]
    certifications: string[]
  }
  recommendations: string[]
  scanId: string
  createdAt: string
}

export interface ATSScanRequest {
  resumeId?: string
  resumeText?: string
  fileName?: string
}

export interface ATSScanResult extends ATSScore {
  resumeId?: string
  fileName?: string
  verdict: "excellent" | "good" | "needs-improvement" | "poor"
}
