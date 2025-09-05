"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import type { ResumeData, ResumeSection } from "@/types/resume"

interface ResumeContextType {
  resume: ResumeData
  resumes: ResumeData[] // Added resumes array for listing saved resumes
  updateResume: (updates: Partial<ResumeData>) => void
  setResumeData: (data: Partial<ResumeData>) => void // Added setResumeData for file upload
  activeSection: ResumeSection
  setActiveSection: (section: ResumeSection) => void
  saveResume: () => Promise<void>
  loading: boolean
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined)

const defaultResume: ResumeData = {
  id: "",
  title: "My Resume",
  personal: {
    fullName: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    linkedin: "",
    github: "",
  },
  summary: "",
  skills: [],
  experience: [],
  education: [],
  projects: [],
  certifications: [],
  links: [], // Added missing links array
  templateId: "template-1",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}

export function ResumeProvider({ children, resumeId }: { children: React.ReactNode; resumeId?: string }) {
  const [resume, setResume] = useState<ResumeData>(defaultResume)
  const [resumes, setResumes] = useState<ResumeData[]>([]) // Added resumes state
  const [activeSection, setActiveSection] = useState<ResumeSection>("personal")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const loadResumes = () => {
      const savedResumes: ResumeData[] = []
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key?.startsWith("resume-")) {
          try {
            const resumeData = JSON.parse(localStorage.getItem(key) || "{}")
            savedResumes.push(resumeData)
          } catch (error) {
            console.error("Failed to parse resume:", key, error)
          }
        }
      }
      setResumes(savedResumes.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()))
    }

    loadResumes()
  }, [])

  useEffect(() => {
    if (resumeId) {
      // Load existing resume - mock for now
      const savedResume = localStorage.getItem(`resume-${resumeId}`)
      if (savedResume) {
        setResume(JSON.parse(savedResume))
      }
    }
  }, [resumeId])

  // Auto-save functionality
  useEffect(() => {
    const timer = setTimeout(() => {
      if (resume.id) {
        localStorage.setItem(`resume-${resume.id}`, JSON.stringify(resume))
        setResumes((prev) => {
          const updated = prev.filter((r) => r.id !== resume.id)
          return [resume, ...updated].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
        })
      }
    }, 2000)

    return () => clearTimeout(timer)
  }, [resume])

  const updateResume = (updates: Partial<ResumeData>) => {
    setResume((prev) => ({
      ...prev,
      ...updates,
      updatedAt: new Date().toISOString(),
    }))
  }

  const setResumeData = (data: Partial<ResumeData>) => {
    const newResumeId = `resume-${Date.now()}`
    const newResume: ResumeData = {
      ...defaultResume,
      ...data,
      id: newResumeId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    setResume(newResume)
  }

  const saveResume = async () => {
    setLoading(true)
    try {
      // Mock save - in real app, call backend API
      const resumeId = resume.id || `resume-${Date.now()}`
      const updatedResume = { ...resume, id: resumeId }
      localStorage.setItem(`resume-${resumeId}`, JSON.stringify(updatedResume))
      setResume(updatedResume)

      setResumes((prev) => {
        const updated = prev.filter((r) => r.id !== resumeId)
        return [updatedResume, ...updated].sort(
          (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
        )
      })
    } catch (error) {
      console.error("Failed to save resume:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <ResumeContext.Provider
      value={{
        resume,
        resumes, // Added resumes to context
        updateResume,
        setResumeData, // Added setResumeData to context
        activeSection,
        setActiveSection,
        saveResume,
        loading,
      }}
    >
      {children}
    </ResumeContext.Provider>
  )
}

export function useResume() {
  const context = useContext(ResumeContext)
  if (context === undefined) {
    throw new Error("useResume must be used within a ResumeProvider")
  }
  return context
}
