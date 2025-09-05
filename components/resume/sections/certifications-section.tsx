"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Trash2 } from "lucide-react"
import { useResume } from "../resume-provider"
import type { Certification } from "@/types/resume"

export function CertificationsSection() {
  const { resume, updateResume } = useResume()
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const addCertification = () => {
    const newCertification: Certification = {
      id: `cert-${Date.now()}`,
      name: "",
      issuer: "",
      date: "",
      expiryDate: "",
      credentialId: "",
    }

    updateResume({
      certifications: [...resume.certifications, newCertification],
    })
    setExpandedId(newCertification.id)
  }

  const updateCertification = (id: string, updates: Partial<Certification>) => {
    updateResume({
      certifications: resume.certifications.map((cert) => (cert.id === id ? { ...cert, ...updates } : cert)),
    })
  }

  const removeCertification = (id: string) => {
    updateResume({
      certifications: resume.certifications.filter((cert) => cert.id !== id),
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-heading font-semibold">Certifications</h3>
        <Button onClick={addCertification}>
          <Plus className="w-4 h-4 mr-2" />
          Add Certification
        </Button>
      </div>

      {resume.certifications.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <p>No certifications added yet.</p>
          <p className="text-sm">Add professional certifications to strengthen your profile.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {resume.certifications.map((cert) => (
            <Card key={cert.id}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-medium">
                    {cert.name || "New Certification"} {cert.issuer && `by ${cert.issuer}`}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setExpandedId(expandedId === cert.id ? null : cert.id)}
                    >
                      {expandedId === cert.id ? "Collapse" : "Edit"}
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => removeCertification(cert.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {expandedId === cert.id && (
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Certification Name *</Label>
                      <Input
                        value={cert.name}
                        onChange={(e) => updateCertification(cert.id, { name: e.target.value })}
                        placeholder="AWS Solutions Architect"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Issuing Organization *</Label>
                      <Input
                        value={cert.issuer}
                        onChange={(e) => updateCertification(cert.id, { issuer: e.target.value })}
                        placeholder="Amazon Web Services"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Issue Date *</Label>
                      <Input
                        type="month"
                        value={cert.date}
                        onChange={(e) => updateCertification(cert.id, { date: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Expiry Date</Label>
                      <Input
                        type="month"
                        value={cert.expiryDate}
                        onChange={(e) => updateCertification(cert.id, { expiryDate: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Credential ID</Label>
                    <Input
                      value={cert.credentialId}
                      onChange={(e) => updateCertification(cert.id, { credentialId: e.target.value })}
                      placeholder="ABC123XYZ"
                    />
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
