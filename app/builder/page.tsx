"use client"

import { ResumeProvider } from "@/components/resume/resume-provider"
import { ResumeBuilder } from "@/components/resume/resume-builder"

export default function BuilderPage() {
  return (
    <ResumeProvider>
      <ResumeBuilder />
    </ResumeProvider>
  )
}
