"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { FileText, Upload, Target, ArrowLeft, CheckCircle } from "lucide-react"
import Link from "next/link"
import { ATSUploadForm } from "@/components/ats/ats-upload-form"
import { ATSResumeSelector } from "@/components/ats/ats-resume-selector"
import { ATSResults } from "@/components/ats/ats-results"
import type { ATSScanResult } from "@/types/ats"

export default function ATSScorePage() {
  const [scanResult, setScanResult] = useState<ATSScanResult | null>(null)
  const [loading, setLoading] = useState(false)

  const handleScanComplete = (result: ATSScanResult) => {
    setScanResult(result)
    setLoading(false)
  }

  const handleNewScan = () => {
    setScanResult(null)
    setLoading(false)
  }

  if (scanResult) {
    return (
      <div className="min-h-screen bg-background">
        <div className="border-b border-border bg-card/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-primary-foreground" />
                </div>
                <h1 className="text-xl font-heading font-bold">HireReady</h1>
              </Link>
              <Badge variant="secondary">ATS Score Results</Badge>
            </div>
            <Button variant="outline" onClick={handleNewScan}>
              Scan Another Resume
            </Button>
          </div>
        </div>
        <div className="container mx-auto px-4 py-8">
          <ATSResults result={scanResult} />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-heading font-bold">HireReady</h1>
            </Link>
            <Badge variant="secondary">ATS Score Checker</Badge>
          </div>
          <Link href="/dashboard">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Target className="w-8 h-8 text-accent" />
          </div>
          <h1 className="text-3xl font-heading font-bold mb-4">ATS Compatibility Checker</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get instant feedback on how well your resume performs with Applicant Tracking Systems (ATS). Upload your
            resume or select from your saved resumes to get started.
          </p>
        </div>

        {/* Scan Options */}
        <Card>
          <CardHeader>
            <CardTitle className="font-heading">Choose Your Resume</CardTitle>
            <CardDescription>
              Upload a new resume file or select from your existing resumes built with HireReady
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="upload" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="upload" className="flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  Upload Resume
                </TabsTrigger>
                <TabsTrigger value="existing" className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  My Resumes
                </TabsTrigger>
              </TabsList>

              <TabsContent value="upload" className="mt-6">
                <ATSUploadForm onScanComplete={handleScanComplete} loading={loading} setLoading={setLoading} />
              </TabsContent>

              <TabsContent value="existing" className="mt-6">
                <ATSResumeSelector onScanComplete={handleScanComplete} loading={loading} setLoading={setLoading} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                <CheckCircle className="w-5 h-5 text-primary" />
              </div>
              <CardTitle className="font-heading text-lg">Keyword Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                We analyze your resume for industry-relevant keywords and technical skills that ATS systems look for.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader>
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center mb-3">
                <Target className="w-5 h-5 text-accent" />
              </div>
              <CardTitle className="font-heading text-lg">Skills Coverage</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Check if your resume includes the right mix of hard and soft skills for your target role.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader>
              <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center mb-3">
                <FileText className="w-5 h-5 text-secondary" />
              </div>
              <CardTitle className="font-heading text-lg">Format Check</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Ensure your resume format is ATS-friendly with proper structure and readable content.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
