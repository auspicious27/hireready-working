"use client"

import type React from "react"
import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Upload, FileText, X } from "lucide-react"
import { ATSScorer } from "@/lib/ats-scorer"
import type { ATSScanResult } from "@/types/ats"

interface ATSUploadFormProps {
  onScanComplete: (result: ATSScanResult) => void
  loading: boolean
  setLoading: (loading: boolean) => void
}

export function ATSUploadForm({ onScanComplete, loading, setLoading }: ATSUploadFormProps) {
  const [dragActive, setDragActive] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      if (file.type === "application/pdf" || file.name.endsWith(".docx") || file.name.endsWith(".doc")) {
        setSelectedFile(file)
      }
    }
  }, [])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  const handleScan = async () => {
    if (!selectedFile) return

    setLoading(true)

    try {
      // Mock file processing - in real app, would extract text from PDF/DOCX
      const mockResumeText = `
        John Doe Software Engineer
        john.doe@email.com (555) 123-4567
        
        Professional Summary:
        Experienced software engineer with 5+ years developing web applications using JavaScript, React, and Node.js.
        Led team of 4 developers and increased productivity by 25%.
        
        Skills:
        JavaScript, React, Node.js, Python, SQL, AWS, Docker, Git, Problem Solving, Leadership, Communication
        
        Experience:
        Senior Software Engineer at Tech Company (2020-Present)
        - Developed and maintained React applications serving 100k+ users
        - Implemented CI/CD pipelines reducing deployment time by 50%
        - Led code reviews and mentored junior developers
        
        Software Engineer at StartupCo (2018-2020)
        - Built REST APIs using Node.js and Express
        - Optimized database queries improving performance by 30%
        
        Education:
        Bachelor of Science in Computer Science
        University of Technology (2014-2018)
        
        Certifications:
        AWS Certified Solutions Architect
      `

      // Simulate processing delay
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const result = ATSScorer.scoreResumeText(mockResumeText, selectedFile.name)
      onScanComplete(result)
    } catch (error) {
      console.error("Error processing file:", error)
    } finally {
      setLoading(false)
    }
  }

  const removeFile = () => {
    setSelectedFile(null)
  }

  return (
    <div className="space-y-6">
      {!selectedFile ? (
        <Card
          className={`border-2 border-dashed transition-colors cursor-pointer ${
            dragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Upload className="w-12 h-12 text-muted-foreground mb-4" />
            <div className="text-center">
              <Label htmlFor="file-upload" className="text-lg font-medium cursor-pointer">
                Drop your resume here or click to browse
              </Label>
              <p className="text-sm text-muted-foreground mt-2">Supports PDF and DOCX files up to 10MB</p>
            </div>
            <input
              id="file-upload"
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileSelect}
              className="hidden"
            />
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">{selectedFile.name}</p>
                  <p className="text-sm text-muted-foreground">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={removeFile}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex justify-center">
        <Button onClick={handleScan} disabled={!selectedFile || loading} size="lg" className="px-8">
          {loading ? "Analyzing Resume..." : "Analyze ATS Score"}
        </Button>
      </div>
    </div>
  )
}
