"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  FileText,
  User,
  FileCheck,
  Briefcase,
  GraduationCap,
  Code,
  Award,
  Save,
  Eye,
  Download,
  ArrowLeft,
  Upload,
} from "lucide-react"
import Link from "next/link"
import { useResume } from "./resume-provider"
import { PersonalSection } from "./sections/personal-section"
import { SummarySection } from "./sections/summary-section"
import { SkillsSection } from "./sections/skills-section"
import { ExperienceSection } from "./sections/experience-section"
import { EducationSection } from "./sections/education-section"
import { ProjectsSection } from "./sections/projects-section"
import { CertificationsSection } from "./sections/certifications-section"
import { FileUploadSection } from "./file-upload-section"
import { ExportSection } from "./export-section"
import { ResumePreview } from "./resume-preview"
import type { ResumeSection } from "@/types/resume"

const sections = [
  { id: "upload" as ResumeSection, label: "Import Resume", icon: Upload, required: false },
  { id: "personal" as ResumeSection, label: "Personal Info", icon: User, required: true },
  { id: "summary" as ResumeSection, label: "Summary", icon: FileCheck, required: false },
  { id: "experience" as ResumeSection, label: "Experience", icon: Briefcase, required: true },
  { id: "education" as ResumeSection, label: "Education", icon: GraduationCap, required: true },
  { id: "skills" as ResumeSection, label: "Skills", icon: Code, required: true },
  { id: "projects" as ResumeSection, label: "Projects", icon: FileText, required: false },
  { id: "certifications" as ResumeSection, label: "Certifications", icon: Award, required: false },
  { id: "export" as ResumeSection, label: "Export Resume", icon: Download, required: false },
]

export function ResumeBuilder() {
  const { resume, activeSection, setActiveSection, saveResume, loading } = useResume()
  const [showPreview, setShowPreview] = useState(false)

  const getCompletionPercentage = () => {
    let completed = 0
    let total = 0

    sections.forEach((section) => {
      total++
      switch (section.id) {
        case "personal":
          if (resume.personal.fullName && resume.personal.email && resume.personal.phone) completed++
          break
        case "summary":
          if (resume.summary.length > 50) completed++
          break
        case "experience":
          if (resume.experience.length > 0) completed++
          break
        case "education":
          if (resume.education.length > 0) completed++
          break
        case "skills":
          if (resume.skills.length > 0) completed++
          break
        case "projects":
          if (resume.projects.length > 0) completed++
          break
        case "certifications":
          if (resume.certifications.length > 0) completed++
          break
      }
    })

    return Math.round((completed / total) * 100)
  }

  const renderActiveSection = () => {
    switch (activeSection) {
      case "upload":
        return <FileUploadSection />
      case "personal":
        return <PersonalSection />
      case "summary":
        return <SummarySection />
      case "skills":
        return <SkillsSection />
      case "experience":
        return <ExperienceSection />
      case "education":
        return <EducationSection />
      case "projects":
        return <ProjectsSection />
      case "certifications":
        return <CertificationsSection />
      case "export":
        return <ExportSection />
      default:
        return <PersonalSection />
    }
  }

  if (showPreview) {
    return (
      <div className="min-h-screen bg-background">
        <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => setShowPreview(false)}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Editor
              </Button>
              <h1 className="text-lg font-heading font-semibold">Resume Preview</h1>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Download DOCX
              </Button>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 py-8">
          <ResumePreview />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-heading font-bold">HireReady</h1>
            </Link>
            <div className="hidden md:flex items-center gap-4">
              <Badge variant="secondary">Resume Builder</Badge>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>Progress:</span>
                <Progress value={getCompletionPercentage()} className="w-20" />
                <span>{getCompletionPercentage()}%</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setShowPreview(true)}>
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
            <Button size="sm" onClick={saveResume} disabled={loading}>
              <Save className="w-4 h-4 mr-2" />
              {loading ? "Saving..." : "Save"}
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="font-heading text-lg">Resume Sections</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {sections.map((section) => {
                  const Icon = section.icon
                  const isActive = activeSection === section.id
                  const isCompleted = getCompletionPercentage() > 0 // Simplified for demo

                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-muted text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="font-medium">{section.label}</span>
                      {section.required && (
                        <Badge variant={isActive ? "secondary" : "outline"} className="ml-auto text-xs">
                          Required
                        </Badge>
                      )}
                    </button>
                  )
                })}
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="font-heading text-lg">Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                  <p>Use action verbs and quantify your achievements with numbers</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                  <p>Keep bullet points concise and impactful</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                  <p>Tailor your resume for each job application</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle className="font-heading text-xl">
                  {sections.find((s) => s.id === activeSection)?.label}
                </CardTitle>
              </CardHeader>
              <CardContent>{renderActiveSection()}</CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
