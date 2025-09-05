"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Trash2 } from "lucide-react"
import { useResume } from "../resume-provider"
import type { Education } from "@/types/resume"

export function EducationSection() {
  const { resume, updateResume } = useResume()
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const addEducation = () => {
    const newEducation: Education = {
      id: `edu-${Date.now()}`,
      institution: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
      gpa: "",
    }

    updateResume({
      education: [...resume.education, newEducation],
    })
    setExpandedId(newEducation.id)
  }

  const updateEducation = (id: string, updates: Partial<Education>) => {
    updateResume({
      education: resume.education.map((edu) => (edu.id === id ? { ...edu, ...updates } : edu)),
    })
  }

  const removeEducation = (id: string) => {
    updateResume({
      education: resume.education.filter((edu) => edu.id !== id),
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-heading font-semibold">Education</h3>
        <Button onClick={addEducation}>
          <Plus className="w-4 h-4 mr-2" />
          Add Education
        </Button>
      </div>

      {resume.education.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <p>No education added yet.</p>
          <p className="text-sm">Click "Add Education" to get started.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {resume.education.map((edu) => (
            <Card key={edu.id}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-medium">
                    {edu.degree || "New Degree"} {edu.institution && `at ${edu.institution}`}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setExpandedId(expandedId === edu.id ? null : edu.id)}
                    >
                      {expandedId === edu.id ? "Collapse" : "Edit"}
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => removeEducation(edu.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {expandedId === edu.id && (
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Institution *</Label>
                      <Input
                        value={edu.institution}
                        onChange={(e) => updateEducation(edu.id, { institution: e.target.value })}
                        placeholder="University of California"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Degree *</Label>
                      <Input
                        value={edu.degree}
                        onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
                        placeholder="Bachelor of Science"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Field of Study *</Label>
                      <Input
                        value={edu.field}
                        onChange={(e) => updateEducation(edu.id, { field: e.target.value })}
                        placeholder="Computer Science"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>GPA (Optional)</Label>
                      <Input
                        value={edu.gpa}
                        onChange={(e) => updateEducation(edu.id, { gpa: e.target.value })}
                        placeholder="3.8/4.0"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Start Date</Label>
                      <Input
                        type="month"
                        value={edu.startDate}
                        onChange={(e) => updateEducation(edu.id, { startDate: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>End Date</Label>
                      <Input
                        type="month"
                        value={edu.endDate}
                        onChange={(e) => updateEducation(edu.id, { endDate: e.target.value })}
                      />
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
