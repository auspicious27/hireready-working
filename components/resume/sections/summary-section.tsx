"use client"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { useResume } from "../resume-provider"

export function SummarySection() {
  const { resume, updateResume } = useResume()

  const updateSummary = (value: string) => {
    updateResume({ summary: value })
  }

  const wordCount = resume.summary.split(" ").filter(Boolean).length

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label htmlFor="summary">Professional Summary</Label>
        <Badge variant={wordCount >= 50 && wordCount <= 150 ? "default" : "secondary"}>{wordCount} words</Badge>
      </div>
      <Textarea
        id="summary"
        value={resume.summary}
        onChange={(e) => updateSummary(e.target.value)}
        placeholder="Write a compelling 2-3 sentence summary highlighting your key skills, experience, and career objectives..."
        className="min-h-32"
      />
      <p className="text-sm text-muted-foreground">
        Aim for 50-150 words. Focus on your most relevant skills and achievements that match your target role.
      </p>
    </div>
  )
}
