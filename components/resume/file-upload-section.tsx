"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Upload, FileText, CheckCircle, AlertCircle, X } from "lucide-react"
import { extractTextFromFile, validateFileType, formatFileSize, type FileUploadResult } from "@/lib/file-utils"
import { useResume } from "./resume-provider"

export function FileUploadSection() {
  const { setResumeData } = useResume()
  const [isDragging, setIsDragging] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadResult, setUploadResult] = useState<FileUploadResult | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      handleFileSelection(files[0])
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFileSelection(files[0])
    }
  }

  const handleFileSelection = async (file: File) => {
    if (!validateFileType(file)) {
      setUploadResult({
        success: false,
        error: "Please upload a PDF or DOCX file only.",
      })
      return
    }

    if (file.size > 10 * 1024 * 1024) {
      // 10MB limit
      setUploadResult({
        success: false,
        error: "File size must be less than 10MB.",
      })
      return
    }

    setUploadedFile(file)
    setIsProcessing(true)
    setUploadProgress(0)
    setUploadResult(null)

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval)
          return 90
        }
        return prev + 10
      })
    }, 200)

    try {
      const result = await extractTextFromFile(file)
      clearInterval(progressInterval)
      setUploadProgress(100)

      if (result.success && result.data) {
        setUploadResult(result)
        // Auto-populate the resume with extracted data
        setResumeData(result.data)
      } else {
        setUploadResult({
          success: false,
          error: result.error || "Failed to extract text from file.",
        })
      }
    } catch (error) {
      clearInterval(progressInterval)
      setUploadResult({
        success: false,
        error: "An error occurred while processing the file.",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const clearUpload = () => {
    setUploadedFile(null)
    setUploadResult(null)
    setUploadProgress(0)
    setIsProcessing(false)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="w-5 h-5" />
          Import Existing Resume
        </CardTitle>
        <CardDescription>
          Upload your current resume (PDF or DOCX) to automatically populate the form fields
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!uploadedFile ? (
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              isDragging ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <div className="space-y-2">
              <p className="text-sm font-medium">Drag and drop your resume here, or click to browse</p>
              <p className="text-xs text-muted-foreground">Supports PDF and DOCX files up to 10MB</p>
            </div>
            <Button variant="outline" className="mt-4 bg-transparent" onClick={() => fileInputRef.current?.click()}>
              Choose File
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.docx,.doc"
              onChange={handleFileInput}
              className="hidden"
            />
          </div>
        ) : (
          <div className="space-y-4">
            {/* File Info */}
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-3">
                <FileText className="w-8 h-8 text-primary" />
                <div>
                  <p className="font-medium text-sm">{uploadedFile.name}</p>
                  <p className="text-xs text-muted-foreground">{formatFileSize(uploadedFile.size)}</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={clearUpload} disabled={isProcessing}>
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Processing Progress */}
            {isProcessing && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Processing resume...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} className="w-full" />
              </div>
            )}

            {/* Results */}
            {uploadResult && (
              <Alert className={uploadResult.success ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}>
                {uploadResult.success ? (
                  <CheckCircle className="w-4 h-4 text-green-600" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-red-600" />
                )}
                <AlertDescription className={uploadResult.success ? "text-green-800" : "text-red-800"}>
                  {uploadResult.success
                    ? "Resume imported successfully! Your form has been populated with the extracted information."
                    : uploadResult.error}
                </AlertDescription>
              </Alert>
            )}

            {uploadResult?.success && (
              <div className="flex gap-2">
                <Button size="sm" onClick={clearUpload}>
                  Upload Another Resume
                </Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
