"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Trash2, X } from "lucide-react"
import { useResume } from "../resume-provider"
import type { Project } from "@/types/resume"

export function ProjectsSection() {
  const { resume, updateResume } = useResume()
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const addProject = () => {
    const newProject: Project = {
      id: `proj-${Date.now()}`,
      name: "",
      description: "",
      technologies: [],
      link: "",
      bullets: [""],
    }

    updateResume({
      projects: [...resume.projects, newProject],
    })
    setExpandedId(newProject.id)
  }

  const updateProject = (id: string, updates: Partial<Project>) => {
    updateResume({
      projects: resume.projects.map((proj) => (proj.id === id ? { ...proj, ...updates } : proj)),
    })
  }

  const removeProject = (id: string) => {
    updateResume({
      projects: resume.projects.filter((proj) => proj.id !== id),
    })
  }

  const addTechnology = (projId: string, tech: string) => {
    const project = resume.projects.find((proj) => proj.id === projId)
    if (project && tech.trim() && !project.technologies.includes(tech.trim())) {
      updateProject(projId, {
        technologies: [...project.technologies, tech.trim()],
      })
    }
  }

  const removeTechnology = (projId: string, techToRemove: string) => {
    const project = resume.projects.find((proj) => proj.id === projId)
    if (project) {
      updateProject(projId, {
        technologies: project.technologies.filter((tech) => tech !== techToRemove),
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-heading font-semibold">Projects</h3>
        <Button onClick={addProject}>
          <Plus className="w-4 h-4 mr-2" />
          Add Project
        </Button>
      </div>

      {resume.projects.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <p>No projects added yet.</p>
          <p className="text-sm">Showcase your best work and side projects.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {resume.projects.map((project) => (
            <Card key={project.id}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-medium">{project.name || "New Project"}</CardTitle>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setExpandedId(expandedId === project.id ? null : project.id)}
                    >
                      {expandedId === project.id ? "Collapse" : "Edit"}
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => removeProject(project.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {expandedId === project.id && (
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Project Name *</Label>
                      <Input
                        value={project.name}
                        onChange={(e) => updateProject(project.id, { name: e.target.value })}
                        placeholder="E-commerce Platform"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Project Link</Label>
                      <Input
                        value={project.link}
                        onChange={(e) => updateProject(project.id, { link: e.target.value })}
                        placeholder="https://github.com/username/project"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                      value={project.description}
                      onChange={(e) => updateProject(project.id, { description: e.target.value })}
                      placeholder="Brief description of what the project does and its key features..."
                      className="min-h-20"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label>Technologies Used</Label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add technology (e.g., React, Node.js)"
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault()
                            const input = e.target as HTMLInputElement
                            addTechnology(project.id, input.value)
                            input.value = ""
                          }
                        }}
                      />
                    </div>
                    {project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <Badge key={tech} variant="secondary" className="flex items-center gap-1">
                            {tech}
                            <button
                              onClick={() => removeTechnology(project.id, tech)}
                              className="ml-1 hover:text-destructive transition-colors"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    )}
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
