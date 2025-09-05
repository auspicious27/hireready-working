"use client"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useResume } from "./resume-provider"

export function ResumePreview() {
  const { resume } = useResume()

  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    const date = new Date(dateString + "-01")
    return date.toLocaleDateString("en-US", { month: "short", year: "numeric" })
  }

  return (
    <Card className="max-w-4xl mx-auto p-8 bg-white text-black print:shadow-none">
      {/* Header */}
      <div className="text-center border-b border-gray-300 pb-6 mb-6">
        <h1 className="text-3xl font-bold mb-2">{resume.personal.fullName || "Your Name"}</h1>
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
          {resume.personal.email && <span>{resume.personal.email}</span>}
          {resume.personal.phone && <span>{resume.personal.phone}</span>}
          {resume.personal.location && <span>{resume.personal.location}</span>}
        </div>
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600 mt-2">
          {resume.personal.website && (
            <a href={resume.personal.website} className="hover:underline">
              {resume.personal.website}
            </a>
          )}
          {resume.personal.linkedin && (
            <a href={resume.personal.linkedin} className="hover:underline">
              LinkedIn
            </a>
          )}
          {resume.personal.github && (
            <a href={resume.personal.github} className="hover:underline">
              GitHub
            </a>
          )}
        </div>
      </div>

      {/* Summary */}
      {resume.summary && (
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-3 text-gray-800">Professional Summary</h2>
          <p className="text-gray-700 leading-relaxed">{resume.summary}</p>
        </div>
      )}

      {/* Skills */}
      {resume.skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-3 text-gray-800">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {resume.skills.map((skill) => (
              <Badge key={skill} variant="outline" className="text-gray-700 border-gray-300">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Experience */}
      {resume.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Professional Experience</h2>
          <div className="space-y-4">
            {resume.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-lg">{exp.position}</h3>
                    <p className="text-gray-600">
                      {exp.company} {exp.location && `• ${exp.location}`}
                    </p>
                  </div>
                  <div className="text-right text-sm text-gray-600">
                    {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                  </div>
                </div>
                {exp.bullets.some((bullet) => bullet.trim()) && (
                  <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                    {exp.bullets
                      .filter((bullet) => bullet.trim())
                      .map((bullet, index) => (
                        <li key={index}>{bullet}</li>
                      ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {resume.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Education</h2>
          <div className="space-y-3">
            {resume.education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">
                    {edu.degree} in {edu.field}
                  </h3>
                  <p className="text-gray-600">{edu.institution}</p>
                  {edu.gpa && <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>}
                </div>
                <div className="text-right text-sm text-gray-600">
                  {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {resume.projects.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Projects</h2>
          <div className="space-y-4">
            {resume.projects.map((project) => (
              <div key={project.id}>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg">{project.name}</h3>
                  {project.link && (
                    <a href={project.link} className="text-sm text-blue-600 hover:underline">
                      View Project
                    </a>
                  )}
                </div>
                {project.description && <p className="text-gray-700 mb-2">{project.description}</p>}
                {project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-2">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs text-gray-600 border-gray-300">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {resume.certifications.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Certifications</h2>
          <div className="space-y-3">
            {resume.certifications.map((cert) => (
              <div key={cert.id} className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{cert.name}</h3>
                  <p className="text-gray-600">{cert.issuer}</p>
                  {cert.credentialId && <p className="text-sm text-gray-600">ID: {cert.credentialId}</p>}
                </div>
                <div className="text-right text-sm text-gray-600">
                  {formatDate(cert.date)}
                  {cert.expiryDate && ` - ${formatDate(cert.expiryDate)}`}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  )
}
