"use client"

import type React from "react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Plus, X } from "lucide-react"
import { useResume } from "../resume-provider"

export function SkillsSection() {
  const { resume, updateResume } = useResume()
  const [newSkill, setNewSkill] = useState("")

  const addSkill = () => {
    if (newSkill.trim() && !resume.skills.includes(newSkill.trim())) {
      updateResume({
        skills: [...resume.skills, newSkill.trim()],
      })
      setNewSkill("")
    }
  }

  const removeSkill = (skillToRemove: string) => {
    updateResume({
      skills: resume.skills.filter((skill) => skill !== skillToRemove),
    })
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addSkill()
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Label>Add Skills</Label>
        <div className="flex gap-2">
          <Input
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="e.g., JavaScript, Project Management, Python..."
          />
          <Button onClick={addSkill} disabled={!newSkill.trim()}>
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {resume.skills.length > 0 && (
        <div className="space-y-4">
          <Label>Your Skills ({resume.skills.length})</Label>
          <div className="flex flex-wrap gap-2">
            {resume.skills.map((skill) => (
              <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                {skill}
                <button onClick={() => removeSkill(skill)} className="ml-1 hover:text-destructive transition-colors">
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>
      )}

      <div className="bg-muted/50 p-4 rounded-lg">
        <h4 className="font-medium mb-2">Skill Categories to Consider:</h4>
        <div className="grid md:grid-cols-2 gap-2 text-sm text-muted-foreground">
          <div>
            <strong>Technical:</strong> Programming languages, frameworks, tools
          </div>
          <div>
            <strong>Soft Skills:</strong> Leadership, communication, problem-solving
          </div>
          <div>
            <strong>Industry:</strong> Domain-specific knowledge and certifications
          </div>
          <div>
            <strong>Languages:</strong> Spoken languages and proficiency levels
          </div>
        </div>
      </div>
    </div>
  )
}
