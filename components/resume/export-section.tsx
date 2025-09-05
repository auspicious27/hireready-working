"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download, FileText, File, Loader2 } from "lucide-react"
import { exportToPDF, exportToDOCX, downloadFile } from "@/lib/file-utils"
import { useResume } from "./resume-provider"

export function ExportSection() {
  const { resume } = useResume()
  const [isExporting, setIsExporting] = useState<"pdf" | "docx" | null>(null)

  const handleExport = async (format: "pdf" | "docx") => {
    setIsExporting(format)

    try {
      let blob: Blob
      let filename: string

      if (format === "pdf") {
        blob = await exportToPDF(resume)
        filename = `${resume.personal.fullName || "Resume"}.pdf`
      } else {
        blob = await exportToDOCX(resume)
        filename = `${resume.personal.fullName || "Resume"}.docx`
      }

      downloadFile(blob, filename)
    } catch (error) {
      console.error("Export failed:", error)
      alert("Export failed. Please try again.")
    } finally {
      setIsExporting(null)
    }
  }

  const isResumeComplete = () => {
    return resume.personal.fullName && resume.personal.email && resume.experience.length > 0 && resume.skills.length > 0
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Download className="w-5 h-5" />
          Export Resume
        </CardTitle>
        <CardDescription>Download your resume in PDF or DOCX format</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isResumeComplete() && (
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              Please complete the required sections (Personal Info, Experience, Skills) before exporting.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* PDF Export */}
          <div className="p-4 border border-border rounded-lg space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h3 className="font-medium">PDF Format</h3>
                <p className="text-sm text-muted-foreground">Best for job applications</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="text-xs">
                ATS-Friendly
              </Badge>
              <Badge variant="secondary" className="text-xs">
                Universal
              </Badge>
            </div>
            <Button
              className="w-full"
              onClick={() => handleExport("pdf")}
              disabled={!isResumeComplete() || isExporting === "pdf"}
            >
              {isExporting === "pdf" ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating PDF...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </>
              )}
            </Button>
          </div>

          {/* DOCX Export */}
          <div className="p-4 border border-border rounded-lg space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <File className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium">DOCX Format</h3>
                <p className="text-sm text-muted-foreground">Editable in Microsoft Word</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="text-xs">
                Editable
              </Badge>
              <Badge variant="secondary" className="text-xs">
                Word Compatible
              </Badge>
            </div>
            <Button
              variant="outline"
              className="w-full bg-transparent"
              onClick={() => handleExport("docx")}
              disabled={!isResumeComplete() || isExporting === "docx"}
            >
              {isExporting === "docx" ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating DOCX...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 mr-2" />
                  Download DOCX
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Pro tip:</strong> Use PDF format for job applications as it preserves formatting across all devices
            and ATS systems.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
