"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Calendar, Target } from "lucide-react"
import { ATSScorer } from "@/lib/ats-scorer"
import type { ResumeData } from "@/types/resume"
import type { ATSScanResult } from "@/types/ats"

interface ATSResumeSelectorProps {
  onScanComplete: (result: ATSScanResult) => void
  loading: boolean
  setLoading: (loading: boolean) => void
}

export function ATSResumeSelector({ onScanComplete, loading, setLoading }: ATSResumeSelectorProps) {
  const [resumes, setResumes] = useState<ResumeData[]>([])
  const [selectedResumeId, setSelectedResumeId] = useState<string | null>(null)

  useEffect(() => {
    // Load saved resumes from localStorage - in real app, would fetch from API
    const savedResumes: ResumeData[] = []
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key?.startsWith("resume-")) {
        try {
          const resume = JSON.parse(localStorage.getItem(key) || "{}")
          if (resume.id) {
            savedResumes.push(resume)
          }
        } catch (error) {
          console.error("Error parsing resume:", error)
        }
      }
    }
    setResumes(savedResumes.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()))
  }, [])

  const handleScan = async () => {
    const selectedResume = resumes.find((r) => r.id === selectedResumeId)
    if (!selectedResume) return

    setLoading(true)

    try {
      // Simulate processing delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const result = ATSScorer.scoreResume(selectedResume)
      onScanComplete(result)
    } catch (error) {
      console.error("Error scanning resume:", error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const getCompletionPercentage = (resume: ResumeData) => {
    let completed = 0
    const total = 7

    if (resume.personal.fullName && resume.personal.email && resume.personal.phone) completed++
    if (resume.summary.length > 50) completed++
    if (resume.skills.length > 0) completed++
    if (resume.experience.length > 0) completed++
    if (resume.education.length > 0) completed++
    if (resume.projects.length > 0) completed++
    if (resume.certifications.length > 0) completed++

    return Math.round((completed / total) * 100)
  }

  if (resumes.length === 0) {
    return (
      <div className="text-center py-12">
        <FileText className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
        <h3 className="text-lg font-heading font-semibold mb-2">No Resumes Found</h3>
        <p className="text-muted-foreground mb-6">
          You haven't created any resumes yet. Build your first resume to analyze it here.
        </p>
        <Button asChild>
          <a href="/builder">Create Your First Resume</a>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        {resumes.map((resume) => (
          <Card
            key={resume.id}
            className={`cursor-pointer transition-all ${
              selectedResumeId === resume.id ? "ring-2 ring-primary border-primary" : "hover:border-primary/50"
            }`}
            onClick={() => setSelectedResumeId(resume.id)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="font-heading text-lg">{resume.title}</CardTitle>
                  <CardDescription className="flex items-center gap-4 mt-1">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      Updated {formatDate(resume.updatedAt)}
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {getCompletionPercentage(resume)}% Complete
                    </Badge>
                  </CardDescription>
                </div>
                {selectedResumeId === resume.id && (
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-primary-foreground rounded-full" />
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <span>{resume.personal.fullName || "Name not set"}</span>
                <span>
                  {resume.experience.length} Experience{resume.experience.length !== 1 ? "s" : ""}
                </span>
                <span>{resume.skills.length} Skills</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-center">
        <Button onClick={handleScan} disabled={!selectedResumeId || loading} size="lg" className="px-8">
          <Target className="w-4 h-4 mr-2" />
          {loading ? "Analyzing Resume..." : "Analyze ATS Score"}
        </Button>
      </div>
    </div>
  )
}
