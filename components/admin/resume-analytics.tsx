"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { FileText, TrendingUp, Users, Download } from "lucide-react"

export function ResumeAnalytics() {
  // Mock analytics data
  const resumeStats = {
    totalResumes: 23456,
    templatesUsed: {
      Modern: 8934,
      Classic: 7823,
      Creative: 6699,
    },
    completionRates: {
      "Personal Info": 98,
      Experience: 87,
      Education: 92,
      Skills: 89,
      Projects: 45,
      Certifications: 32,
    },
    exportFormats: {
      PDF: 18934,
      DOCX: 4522,
    },
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Resumes</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{resumeStats.totalResumes.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+15%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Completion</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+3%</span> from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Builders</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">Currently building resumes</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Template Usage</CardTitle>
            <CardDescription>Most popular resume templates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(resumeStats.templatesUsed).map(([template, count]) => (
              <div key={template} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded flex items-center justify-center">
                    <FileText className="w-4 h-4 text-primary" />
                  </div>
                  <span className="font-medium">{template}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">{count.toLocaleString()}</span>
                  <Badge variant="secondary">{Math.round((count / resumeStats.totalResumes) * 100)}%</Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Section Completion Rates</CardTitle>
            <CardDescription>How often users complete each section</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(resumeStats.completionRates).map(([section, rate]) => (
              <div key={section} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{section}</span>
                  <span className="text-sm text-muted-foreground">{rate}%</span>
                </div>
                <Progress value={rate} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Export Analytics</CardTitle>
          <CardDescription>Resume download and export statistics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium">Export Formats</h4>
              {Object.entries(resumeStats.exportFormats).map(([format, count]) => (
                <div key={format} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Download className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium">{format}</span>
                  </div>
                  <Badge variant="outline">{count.toLocaleString()}</Badge>
                </div>
              ))}
            </div>
            <div className="space-y-4">
              <h4 className="font-medium">Recent Exports</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between p-2 bg-muted/30 rounded">
                  <span>Software Engineer Resume.pdf</span>
                  <span className="text-muted-foreground">2 min ago</span>
                </div>
                <div className="flex justify-between p-2 bg-muted/30 rounded">
                  <span>Marketing Manager Resume.docx</span>
                  <span className="text-muted-foreground">5 min ago</span>
                </div>
                <div className="flex justify-between p-2 bg-muted/30 rounded">
                  <span>Data Analyst Resume.pdf</span>
                  <span className="text-muted-foreground">8 min ago</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
