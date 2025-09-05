"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Upload, FileText, Target, CheckCircle, AlertCircle, TrendingUp, Edit3 } from "lucide-react"
import type { JobMatchRequest, JobMatchResult } from "@/types/job-match"
import { matchJobDescription } from "@/lib/job-matcher"
import { useResume } from "@/components/resume/resume-provider"

export default function JobMatchPage() {
  const { resumes } = useResume()
  const [selectedResumeId, setSelectedResumeId] = useState<string>("")
  const [jobDescription, setJobDescription] = useState("")
  const [jobTitle, setJobTitle] = useState("")
  const [company, setCompany] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [results, setResults] = useState<JobMatchResult | null>(null)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (
      file &&
      (file.type === "application/pdf" ||
        file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document")
    ) {
      setUploadedFile(file)
      // In a real app, you'd extract text from the file here
      const mockText = `Job Title: ${jobTitle || "Software Engineer"}
      
Company: ${company || "Tech Company"}

Job Description:
We are looking for a talented software engineer to join our team...

Requirements:
- Bachelor's degree in Computer Science
- 3+ years of experience with React
- Strong knowledge of JavaScript/TypeScript
- Experience with Node.js and databases
- Excellent communication skills

Preferred Skills:
- Experience with cloud platforms (AWS, Azure)
- Knowledge of DevOps practices
- Agile/Scrum methodology experience`

      setJobDescription(mockText)
    }
  }

  const handleAnalyze = async () => {
    if (!selectedResumeId && !uploadedFile) {
      alert("Please select a resume or upload a job description file")
      return
    }
    if (!jobDescription.trim()) {
      alert("Please enter or upload a job description")
      return
    }

    setIsAnalyzing(true)

    try {
      const request: JobMatchRequest = {
        resumeId: selectedResumeId,
        jobDescription,
        jobTitle: jobTitle || undefined,
        company: company || undefined,
      }

      const result = await matchJobDescription(request)
      setResults(result)
    } catch (error) {
      console.error("Analysis failed:", error)
      alert("Analysis failed. Please try again.")
    } finally {
      setIsAnalyzing(false)
    }
  }

  const getVerdictColor = (verdict: string) => {
    switch (verdict) {
      case "strong-fit":
        return "text-green-600 bg-green-50"
      case "moderate-fit":
        return "text-yellow-600 bg-yellow-50"
      case "low-fit":
        return "text-red-600 bg-red-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  const getVerdictText = (verdict: string) => {
    switch (verdict) {
      case "strong-fit":
        return "Strong Fit"
      case "moderate-fit":
        return "Moderate Fit"
      case "low-fit":
        return "Low Fit"
      default:
        return "Unknown"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-heading font-bold">Job Description Matching</h1>
              <p className="text-muted-foreground">
                Compare your resume against job postings and get actionable feedback
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {!results ? (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Resume Selection
                </CardTitle>
                <CardDescription>Choose a resume from your saved resumes to analyze</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="resume-select">Select Resume</Label>
                  <select
                    id="resume-select"
                    className="w-full mt-1 p-2 border border-border rounded-md bg-background"
                    value={selectedResumeId}
                    onChange={(e) => setSelectedResumeId(e.target.value)}
                  >
                    <option value="">Choose a resume...</option>
                    {resumes.map((resume) => (
                      <option key={resume.id} value={resume.id}>
                        {resume.personal.fullName || "Untitled Resume"} -{" "}
                        {new Date(resume.updatedAt).toLocaleDateString()}
                      </option>
                    ))}
                  </select>
                </div>

                {selectedResumeId && (
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      Resume selected and ready for analysis
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Job Description Input */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  Job Description
                </CardTitle>
                <CardDescription>Upload a job posting file or paste the job description text</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Tabs defaultValue="paste" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="paste">Paste Text</TabsTrigger>
                    <TabsTrigger value="upload">Upload File</TabsTrigger>
                  </TabsList>

                  <TabsContent value="paste" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="job-title">Job Title (Optional)</Label>
                        <Input
                          id="job-title"
                          placeholder="e.g., Senior Software Engineer"
                          value={jobTitle}
                          onChange={(e) => setJobTitle(e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="company">Company (Optional)</Label>
                        <Input
                          id="company"
                          placeholder="e.g., Google"
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="job-description">Job Description</Label>
                      <Textarea
                        id="job-description"
                        placeholder="Paste the complete job description here..."
                        className="min-h-[200px]"
                        value={jobDescription}
                        onChange={(e) => setJobDescription(e.target.value)}
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="upload" className="space-y-4">
                    <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                      <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Upload Job Description</p>
                        <p className="text-xs text-muted-foreground">PDF or DOCX files only</p>
                      </div>
                      <input type="file" accept=".pdf,.docx" onChange={handleFileUpload} className="mt-4" />
                      {uploadedFile && (
                        <div className="mt-4 p-2 bg-muted/50 rounded text-sm">
                          <CheckCircle className="w-4 h-4 inline mr-2 text-green-600" />
                          {uploadedFile.name} uploaded successfully
                        </div>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        ) : null}

        {/* Action Button */}
        {!results && (
          <div className="mt-8 text-center">
            <Button
              size="lg"
              onClick={handleAnalyze}
              disabled={isAnalyzing || (!selectedResumeId && !uploadedFile) || !jobDescription.trim()}
              className="px-8"
            >
              {isAnalyzing ? (
                <>
                  <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                  Analyzing Match...
                </>
              ) : (
                <>
                  <Target className="w-5 h-5 mr-2" />
                  Analyze Job Match
                </>
              )}
            </Button>
          </div>
        )}

        {/* Results Section */}
        {results && (
          <div className="space-y-8">
            {/* Overall Score */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Job Match Analysis</span>
                  <Button variant="outline" size="sm" onClick={() => setResults(null)}>
                    New Analysis
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">{results.matchScore}%</div>
                    <p className="text-sm text-muted-foreground">Overall Match Score</p>
                  </div>
                  <div className="text-center">
                    <Badge className={`text-sm px-3 py-1 ${getVerdictColor(results.verdict)}`}>
                      {getVerdictText(results.verdict)}
                    </Badge>
                    <p className="text-sm text-muted-foreground mt-2">{results.verdictReason}</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-semibold text-accent mb-2">{results.missingKeywords.length}</div>
                    <p className="text-sm text-muted-foreground">Missing Keywords</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Missing Keywords */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  Missing Keywords & Skills
                </CardTitle>
                <CardDescription>
                  Top keywords and skills from the job description that are missing from your resume
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {results.missingKeywords.slice(0, 10).map((keyword, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-xs font-medium">
                          {index + 1}
                        </div>
                        <div>
                          <span className="font-medium">{keyword.keyword}</span>
                          <Badge variant="outline" className="ml-2 text-xs">
                            {keyword.category}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Progress value={keyword.importance * 20} className="w-16" />
                        <span className="text-xs text-muted-foreground">{Math.round(keyword.importance * 20)}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Summary Rewrites */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Edit3 className="w-5 h-5" />
                  Summary Rewrite Suggestions
                </CardTitle>
                <CardDescription>Tailored summary variations optimized for this specific job posting</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {results.summaryRewrites.map((rewrite, index) => (
                    <div key={index} className="p-4 border border-border rounded-lg">
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="secondary">Variant {rewrite.variant}</Badge>
                        <span className="text-sm text-muted-foreground">Focus: {rewrite.focus}</span>
                      </div>
                      <p className="text-sm leading-relaxed">{rewrite.text}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Bullet Point Rewrites */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Experience Bullet Improvements
                </CardTitle>
                <CardDescription>
                  Enhanced bullet points using STAR method and action verbs for better impact
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {results.bulletRewrites.map((bullet, index) => (
                    <div key={index} className="space-y-3">
                      <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-sm font-medium text-red-800 mb-1">Original:</p>
                        <p className="text-sm text-red-700">{bullet.originalBullet}</p>
                      </div>
                      <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                        <p className="text-sm font-medium text-green-800 mb-1">Improved:</p>
                        <p className="text-sm text-green-700">{bullet.rewrittenBullet}</p>
                        <Separator className="my-2" />
                        <p className="text-xs text-green-600">
                          <strong>Why this is better:</strong> {bullet.improvement}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Skill Suggestions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Skills Section Optimization
                </CardTitle>
                <CardDescription>Recommendations to optimize your skills section for this job posting</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {results.skillSuggestions.map((suggestion, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Badge
                          variant={
                            suggestion.action === "add"
                              ? "default"
                              : suggestion.action === "remove"
                                ? "destructive"
                                : "secondary"
                          }
                          className="capitalize"
                        >
                          {suggestion.action}
                        </Badge>
                        <span className="font-medium">{suggestion.skill}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className={`text-xs ${
                            suggestion.priority === "high"
                              ? "border-red-300 text-red-700"
                              : suggestion.priority === "medium"
                                ? "border-yellow-300 text-yellow-700"
                                : "border-green-300 text-green-700"
                          }`}
                        >
                          {suggestion.priority} priority
                        </Badge>
                      </div>
                    </div>
                  ))}

                  {results.skillSuggestions.length > 0 && (
                    <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-sm text-blue-800">
                        <strong>Pro tip:</strong> Focus on high-priority additions first, as these will have the biggest
                        impact on your match score.
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
