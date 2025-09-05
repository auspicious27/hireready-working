"use client"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useResume } from "../resume-provider"

export function PersonalSection() {
  const { resume, updateResume } = useResume()

  const updatePersonal = (field: string, value: string) => {
    updateResume({
      personal: {
        ...resume.personal,
        [field]: value,
      },
    })
  }

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name *</Label>
          <Input
            id="fullName"
            value={resume.personal.fullName}
            onChange={(e) => updatePersonal("fullName", e.target.value)}
            placeholder="John Doe"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            value={resume.personal.email}
            onChange={(e) => updatePersonal("email", e.target.value)}
            placeholder="john.doe@email.com"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number *</Label>
          <Input
            id="phone"
            value={resume.personal.phone}
            onChange={(e) => updatePersonal("phone", e.target.value)}
            placeholder="+1 (555) 123-4567"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="location">Location *</Label>
          <Input
            id="location"
            value={resume.personal.location}
            onChange={(e) => updatePersonal("location", e.target.value)}
            placeholder="New York, NY"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="website">Website</Label>
          <Input
            id="website"
            value={resume.personal.website}
            onChange={(e) => updatePersonal("website", e.target.value)}
            placeholder="https://johndoe.com"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="linkedin">LinkedIn</Label>
          <Input
            id="linkedin"
            value={resume.personal.linkedin}
            onChange={(e) => updatePersonal("linkedin", e.target.value)}
            placeholder="https://linkedin.com/in/johndoe"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="github">GitHub</Label>
        <Input
          id="github"
          value={resume.personal.github}
          onChange={(e) => updatePersonal("github", e.target.value)}
          placeholder="https://github.com/johndoe"
        />
      </div>
    </div>
  )
}
