export interface PersonalInfo {
  fullName: string
  email: string
  phone: string
  location: string
  website?: string
  linkedin?: string
  github?: string
}

export interface Experience {
  id: string
  company: string
  position: string
  location: string
  startDate: string
  endDate: string
  current?: boolean // Made current optional to match usage
  bullets: string[]
}

export interface Education {
  id: string
  institution?: string // Made optional to match file upload data structure
  school?: string // Added school as alternative field name
  degree: string
  field: string
  startDate?: string // Made optional for flexibility
  endDate?: string // Made optional for flexibility
  graduationDate?: string // Added graduationDate as alternative
  location?: string // Added location field
  gpa?: string
}

export interface Project {
  id: string
  name: string
  description: string
  technologies: string[]
  link?: string
  url?: string // Added url as alternative field name
  startDate?: string // Added date fields for projects
  endDate?: string
  bullets?: string[] // Made bullets optional
}

export interface Certification {
  id: string
  name: string
  issuer: string
  date: string
  expiryDate?: string
  credentialId?: string
  url?: string // Added url field for certification links
}

export interface Link {
  id: string
  label: string
  url: string
}

export interface ResumeData {
  id: string
  title?: string // Made title optional
  personal: PersonalInfo
  summary: string
  skills: string[]
  experience: Experience[]
  education: Education[]
  projects: Project[]
  certifications: Certification[]
  links: Link[] // Added links array
  templateId?: string // Made templateId optional
  createdAt: string
  updatedAt: string
}

export type ResumeSection =
  | "upload" // Added upload section
  | "personal"
  | "summary"
  | "skills"
  | "experience"
  | "education"
  | "projects"
  | "certifications"
  | "export" // Added export section
