// File upload and export utilities for resume processing

export interface FileUploadResult {
  success: boolean
  data?: any
  error?: string
}

export interface ExportOptions {
  format: "pdf" | "docx"
  template?: string
}

// Mock file text extraction - in real app would use libraries like pdf-parse, mammoth
export async function extractTextFromFile(file: File): Promise<FileUploadResult> {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Mock extracted resume data
      const mockResumeData = {
        personal: {
          fullName: "Jane Smith",
          email: "jane.smith@email.com",
          phone: "+1 (555) 123-4567",
          location: "New York, NY",
          website: "",
          linkedin: "linkedin.com/in/janesmith",
          github: "",
        },
        summary:
          "Experienced software engineer with 5+ years in full-stack development. Proven track record of building scalable web applications and leading cross-functional teams.",
        skills: ["JavaScript", "React", "Node.js", "Python", "SQL", "AWS", "Docker", "Git"],
        experience: [
          {
            id: "1",
            position: "Senior Software Engineer",
            company: "Tech Solutions Inc",
            location: "New York, NY",
            startDate: "2021-03",
            endDate: "present",
            bullets: [
              "Led development of microservices architecture serving 1M+ users",
              "Improved application performance by 40% through code optimization",
              "Mentored 3 junior developers and conducted code reviews",
            ],
          },
          {
            id: "2",
            position: "Software Engineer",
            company: "StartupXYZ",
            location: "San Francisco, CA",
            startDate: "2019-06",
            endDate: "2021-02",
            bullets: [
              "Built REST APIs using Node.js and Express framework",
              "Implemented automated testing reducing deployment bugs by 60%",
              "Collaborated with product team on feature specifications",
            ],
          },
        ],
        education: [
          {
            id: "1",
            degree: "Bachelor of Science",
            field: "Computer Science",
            school: "Stanford University",
            location: "Stanford, CA",
            graduationDate: "2019-05",
          },
        ],
        projects: [
          {
            id: "1",
            name: "E-commerce Platform",
            description: "Full-stack web application with payment processing",
            technologies: ["React", "Node.js", "PostgreSQL", "Stripe"],
            startDate: "2020-01",
            endDate: "2020-06",
            url: "https://github.com/janesmith/ecommerce",
          },
        ],
        certifications: [
          {
            id: "1",
            name: "AWS Certified Solutions Architect",
            issuer: "Amazon Web Services",
            date: "2022-08",
            url: "",
          },
        ],
        links: [],
      }

      resolve({
        success: true,
        data: mockResumeData,
      })
    }, 2000) // Simulate processing time
  })
}

// Mock PDF export - in real app would use libraries like jsPDF, puppeteer
export async function exportToPDF(resumeData: any, options: ExportOptions = { format: "pdf" }): Promise<Blob> {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Create mock PDF blob
      const pdfContent = `%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj

2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj

3 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Contents 4 0 R
>>
endobj

4 0 obj
<<
/Length 44
>>
stream
BT
/F1 12 Tf
72 720 Td
(${resumeData.personal?.fullName || "Resume"}) Tj
ET
endstream
endobj

xref
0 5
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000206 00000 n 
trailer
<<
/Size 5
/Root 1 0 R
>>
startxref
300
%%EOF`

      const blob = new Blob([pdfContent], { type: "application/pdf" })
      resolve(blob)
    }, 1500)
  })
}

// Mock DOCX export - in real app would use libraries like docx
export async function exportToDOCX(resumeData: any, options: ExportOptions = { format: "docx" }): Promise<Blob> {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Create mock DOCX content (simplified)
      const docxContent = `
        ${resumeData.personal?.fullName || "Resume"}
        ${resumeData.personal?.email || ""}
        ${resumeData.personal?.phone || ""}
        
        SUMMARY
        ${resumeData.summary || ""}
        
        EXPERIENCE
        ${
          resumeData.experience
            ?.map(
              (exp: any) => `
          ${exp.position} at ${exp.company}
          ${exp.startDate} - ${exp.endDate}
          ${exp.bullets?.join("\n") || ""}
        `,
            )
            .join("\n") || ""
        }
        
        EDUCATION
        ${
          resumeData.education
            ?.map(
              (edu: any) => `
          ${edu.degree} in ${edu.field}
          ${edu.school}, ${edu.graduationDate}
        `,
            )
            .join("\n") || ""
        }
        
        SKILLS
        ${resumeData.skills?.join(", ") || ""}
      `

      const blob = new Blob([docxContent], {
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      })
      resolve(blob)
    }, 1500)
  })
}

export function downloadFile(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export function validateFileType(file: File): boolean {
  const allowedTypes = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/msword",
  ]
  return allowedTypes.includes(file.type)
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes"
  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
}
