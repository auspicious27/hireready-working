"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { FileText, ArrowLeft, User, Mail, Phone, GraduationCap, MapPin, Calendar, Briefcase } from "lucide-react"
import { useAuth } from "@/components/auth/auth-provider"
import { motion } from "framer-motion"

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    // Basic Information
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    
    // Personal Details
    dateOfBirth: "",
    gender: "",
    address: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    
    // Education Details
    collegeName: "",
    course: "",
    specialization: "",
    graduationYear: "",
    cgpa: "",
    university: "",
    
    // Professional Details
    currentJobTitle: "",
    company: "",
    experience: "",
    skills: "",
    resume: null as File | null,
    
    // Preferences
    jobPreferences: "",
    salaryExpectation: "",
    workLocation: "",
    noticePeriod: ""
  })
  
  const [error, setError] = useState("")
  const [currentStep, setCurrentStep] = useState(1)
  const { register, loading } = useAuth()
  const router = useRouter()

  const handleInputChange = (field: string, value: string | File) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    try {
      await register(formData.email, formData.password, `${formData.firstName} ${formData.lastName}`)
      router.push("/dashboard")
    } catch (err) {
      setError("Registration failed. Please try again.")
    }
  }

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-primary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <motion.div 
          className="flex items-center justify-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-lg">
              <FileText className="w-7 h-7 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-heading font-bold text-foreground">HireReady</h1>
          </div>
        </motion.div>

        {/* Progress Indicator */}
        <motion.div 
          className="flex justify-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-center space-x-4">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep >= step 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {step}
                </div>
                {step < 4 && (
                  <div className={`w-8 h-0.5 mx-2 ${
                    currentStep > step ? 'bg-primary' : 'bg-muted'
                  }`} />
                )}
              </div>
            ))}
        </div>
        </motion.div>

        <Card className="shadow-xl border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-heading text-primary">
              Create Your Account
            </CardTitle>
            <CardDescription className="text-base">
              Start building your perfect resume for free
            </CardDescription>
          </CardHeader>
          
          <CardContent className="px-8 pb-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Step 1: Basic Information */}
              {currentStep === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-2 mb-6">
                    <User className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-semibold">Basic Information</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                      <Label htmlFor="firstName">First Name *</Label>
                <Input
                        id="firstName"
                  type="text"
                        placeholder="Enter your first name"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        type="text"
                        placeholder="Enter your last name"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Mobile Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Enter your mobile number"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                  required
                />
              </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                      <Label htmlFor="password">Password *</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a password (min. 6 characters)"
                        value={formData.password}
                        onChange={(e) => handleInputChange("password", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password *</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Personal Details */}
              {currentStep === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-2 mb-6">
                    <MapPin className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-semibold">Personal Details</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="dateOfBirth">Date of Birth</Label>
                      <Input
                        id="dateOfBirth"
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="gender">Gender</Label>
                      <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                          <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Textarea
                      id="address"
                      placeholder="Enter your complete address"
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      rows={3}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        type="text"
                        placeholder="Enter your city"
                        value={formData.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        type="text"
                        placeholder="Enter your state"
                        value={formData.state}
                        onChange={(e) => handleInputChange("state", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pincode">Pincode</Label>
                      <Input
                        id="pincode"
                        type="text"
                        placeholder="Enter pincode"
                        value={formData.pincode}
                        onChange={(e) => handleInputChange("pincode", e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Select value={formData.country} onValueChange={(value) => handleInputChange("country", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="india">India</SelectItem>
                        <SelectItem value="usa">United States</SelectItem>
                        <SelectItem value="uk">United Kingdom</SelectItem>
                        <SelectItem value="canada">Canada</SelectItem>
                        <SelectItem value="australia">Australia</SelectItem>
                        <SelectItem value="germany">Germany</SelectItem>
                        <SelectItem value="france">France</SelectItem>
                        <SelectItem value="singapore">Singapore</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Education Details */}
              {currentStep === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-2 mb-6">
                    <GraduationCap className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-semibold">Education Details</h3>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="collegeName">College/University Name *</Label>
                    <Input
                      id="collegeName"
                      type="text"
                      placeholder="Enter your college/university name"
                      value={formData.collegeName}
                      onChange={(e) => handleInputChange("collegeName", e.target.value)}
                  required
                />
              </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="course">Course/Degree *</Label>
                      <Select value={formData.course} onValueChange={(value) => handleInputChange("course", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your course" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="btech">B.Tech/B.E.</SelectItem>
                          <SelectItem value="mtech">M.Tech/M.E.</SelectItem>
                          <SelectItem value="bca">BCA</SelectItem>
                          <SelectItem value="mca">MCA</SelectItem>
                          <SelectItem value="bsc">B.Sc.</SelectItem>
                          <SelectItem value="msc">M.Sc.</SelectItem>
                          <SelectItem value="bba">BBA</SelectItem>
                          <SelectItem value="mba">MBA</SelectItem>
                          <SelectItem value="bcom">B.Com</SelectItem>
                          <SelectItem value="mcom">M.Com</SelectItem>
                          <SelectItem value="ba">B.A.</SelectItem>
                          <SelectItem value="ma">M.A.</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="specialization">Specialization</Label>
                      <Input
                        id="specialization"
                        type="text"
                        placeholder="e.g., Computer Science, Electronics"
                        value={formData.specialization}
                        onChange={(e) => handleInputChange("specialization", e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="graduationYear">Graduation Year *</Label>
                      <Select value={formData.graduationYear} onValueChange={(value) => handleInputChange("graduationYear", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select year" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 20 }, (_, i) => {
                            const year = new Date().getFullYear() - i
                            return (
                              <SelectItem key={year} value={year.toString()}>
                                {year}
                              </SelectItem>
                            )
                          })}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cgpa">CGPA/Percentage</Label>
                      <Input
                        id="cgpa"
                        type="text"
                        placeholder="e.g., 8.5 or 85%"
                        value={formData.cgpa}
                        onChange={(e) => handleInputChange("cgpa", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="university">University</Label>
                      <Input
                        id="university"
                        type="text"
                        placeholder="University name"
                        value={formData.university}
                        onChange={(e) => handleInputChange("university", e.target.value)}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Professional Details */}
              {currentStep === 4 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-2 mb-6">
                    <Briefcase className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-semibold">Professional Details</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentJobTitle">Current Job Title</Label>
                      <Input
                        id="currentJobTitle"
                        type="text"
                        placeholder="e.g., Software Engineer"
                        value={formData.currentJobTitle}
                        onChange={(e) => handleInputChange("currentJobTitle", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Current Company</Label>
                      <Input
                        id="company"
                        type="text"
                        placeholder="Company name"
                        value={formData.company}
                        onChange={(e) => handleInputChange("company", e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="experience">Years of Experience</Label>
                    <Select value={formData.experience} onValueChange={(value) => handleInputChange("experience", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select experience" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fresher">Fresher (0 years)</SelectItem>
                        <SelectItem value="0-1">0-1 years</SelectItem>
                        <SelectItem value="1-2">1-2 years</SelectItem>
                        <SelectItem value="2-3">2-3 years</SelectItem>
                        <SelectItem value="3-5">3-5 years</SelectItem>
                        <SelectItem value="5-8">5-8 years</SelectItem>
                        <SelectItem value="8-10">8-10 years</SelectItem>
                        <SelectItem value="10+">10+ years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="skills">Skills</Label>
                    <Textarea
                      id="skills"
                      placeholder="List your key skills (e.g., JavaScript, React, Python, Machine Learning)"
                      value={formData.skills}
                      onChange={(e) => handleInputChange("skills", e.target.value)}
                      rows={3}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="jobPreferences">Job Preferences</Label>
                    <Textarea
                      id="jobPreferences"
                      placeholder="Describe your ideal job role and preferences"
                      value={formData.jobPreferences}
                      onChange={(e) => handleInputChange("jobPreferences", e.target.value)}
                      rows={3}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="salaryExpectation">Expected Salary</Label>
                      <Input
                        id="salaryExpectation"
                        type="text"
                        placeholder="e.g., 5-8 LPA"
                        value={formData.salaryExpectation}
                        onChange={(e) => handleInputChange("salaryExpectation", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="workLocation">Preferred Work Location</Label>
                      <Input
                        id="workLocation"
                        type="text"
                        placeholder="e.g., Bangalore, Remote"
                        value={formData.workLocation}
                        onChange={(e) => handleInputChange("workLocation", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="noticePeriod">Notice Period</Label>
                      <Select value={formData.noticePeriod} onValueChange={(value) => handleInputChange("noticePeriod", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select notice period" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="immediate">Immediate</SelectItem>
                          <SelectItem value="15-days">15 days</SelectItem>
                          <SelectItem value="1-month">1 month</SelectItem>
                          <SelectItem value="2-months">2 months</SelectItem>
                          <SelectItem value="3-months">3 months</SelectItem>
                          <SelectItem value="more">More than 3 months</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </motion.div>
              )}

              {error && (
                <motion.div 
                  className="text-sm text-destructive text-center bg-destructive/10 p-3 rounded-md"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {error}
                </motion.div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Previous
                </Button>
                
                {currentStep < 4 ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="bg-primary hover:bg-primary/90"
                  >
                    Next Step
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={loading}
                    className="bg-primary hover:bg-primary/90 px-8"
                  >
                {loading ? "Creating Account..." : "Create Account"}
              </Button>
                )}
              </div>
            </form>

            <div className="mt-8 text-center text-sm">
              <span className="text-muted-foreground">Already have an account? </span>
              <Link href="/login" className="text-primary hover:underline font-medium">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to home
          </Link>
        </div>
      </div>
    </div>
  )
}