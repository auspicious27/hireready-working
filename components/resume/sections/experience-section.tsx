"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Trash2 } from "lucide-react"
import { useResume } from "../resume-provider"
import type { Experience } from "@/types/resume"

export function ExperienceSection() {
  const { resume, updateResume } = useResume()
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const addExperience = () => {
    const newExperience: Experience = {
      id: `exp-${Date.now()}`,
      company: "",
      position: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      bullets: [""],
    }

    updateResume({
      experience: [...resume.experience, newExperience],
    })
    setExpandedId(newExperience.id)
  }

  const updateExperience = (id: string, updates: Partial<Experience>) => {
    updateResume({
      experience: resume.experience.map((exp) => (exp.id === id ? { ...exp, ...updates } : exp)),
    })
  }

  const removeExperience = (id: string) => {
    updateResume({
      experience: resume.experience.filter((exp) => exp.id !== id),
    })
  }

  const addBullet = (expId: string) => {
    const experience = resume.experience.find((exp) => exp.id === expId)
    if (experience) {
      updateExperience(expId, {
        bullets: [...experience.bullets, ""],
      })
    }
  }

  const updateBullet = (expId: string, bulletIndex: number, value: string) => {
    const experience = resume.experience.find((exp) => exp.id === expId)
    if (experience) {
      const newBullets = [...experience.bullets]
      newBullets[bulletIndex] = value
      updateExperience(expId, { bullets: newBullets })
    }
  }

  const removeBullet = (expId: string, bulletIndex: number) => {
    const experience = resume.experience.find((exp) => exp.id === expId)
    if (experience && experience.bullets.length > 1) {
      const newBullets = experience.bullets.filter((_, index) => index !== bulletIndex)
      updateExperience(expId, { bullets: newBullets })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-heading font-semibold">Work Experience</h3>
        <Button onClick={addExperience}>
          <Plus className="w-4 h-4 mr-2" />
          Add Experience
        </Button>
      </div>

      {resume.experience.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <p>No work experience added yet.</p>
          <p className="text-sm">Click "Add Experience" to get started.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {resume.experience.map((exp, index) => (
            <Card key={exp.id}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-medium">
                    {exp.position || "New Position"} {exp.company && `at ${exp.company}`}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setExpandedId(expandedId === exp.id ? null : exp.id)}
                    >
                      {expandedId === exp.id ? "Collapse" : "Edit"}
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => removeExperience(exp.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {expandedId === exp.id && (
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Job Title *</Label>
                      <Input
                        value={exp.position}
                        onChange={(e) => updateExperience(exp.id, { position: e.target.value })}
                        placeholder="Software Engineer"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Company *</Label>
                      <Input
                        value={exp.company}
                        onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
                        placeholder="Tech Company Inc."
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Location</Label>
                      <Input
                        value={exp.location}
                        onChange={(e) => updateExperience(exp.id, { location: e.target.value })}
                        placeholder="San Francisco, CA"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Start Date *</Label>
                      <Input
                        type="month"
                        value={exp.startDate}
                        onChange={(e) => updateExperience(exp.id, { startDate: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>End Date</Label>
                      <Input
                        type="month"
                        value={exp.endDate}
                        onChange={(e) => updateExperience(exp.id, { endDate: e.target.value })}
                        disabled={exp.current}
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`current-${exp.id}`}
                      checked={exp.current}
                      onCheckedChange={(checked) =>
                        updateExperience(exp.id, { current: checked as boolean, endDate: checked ? "" : exp.endDate })
                      }
                    />
                    <Label htmlFor={`current-${exp.id}`}>I currently work here</Label>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>Key Achievements & Responsibilities</Label>
                      <Button variant="outline" size="sm" onClick={() => addBullet(exp.id)}>
                        <Plus className="w-4 h-4 mr-1" />
                        Add Bullet
                      </Button>
                    </div>
                    {exp.bullets.map((bullet, bulletIndex) => (
                      <div key={bulletIndex} className="flex gap-2">
                        <Textarea
                          value={bullet}
                          onChange={(e) => updateBullet(exp.id, bulletIndex, e.target.value)}
                          placeholder="• Increased team productivity by 25% through implementation of agile methodologies..."
                          className="min-h-20"
                        />
                        {exp.bullets.length > 1 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeBullet(exp.id, bulletIndex)}
                            className="mt-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    ))}
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
