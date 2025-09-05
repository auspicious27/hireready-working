"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Search, 
  MapPin, 
  Clock, 
  Building2, 
  Star, 
  Filter, 
  Bookmark, 
  Share2,
  TrendingUp,
  Users,
  DollarSign,
  Briefcase,
  Calendar,
  ArrowRight,
  CheckCircle,
  Heart
} from "lucide-react"

// Mock job data
const mockJobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$120k - $150k",
    posted: "2 days ago",
    description: "We're looking for a senior frontend developer to join our growing team...",
    requirements: ["React", "TypeScript", "Next.js", "5+ years experience"],
    benefits: ["Health insurance", "401k", "Remote work", "Stock options"],
    rating: 4.8,
    applicants: 234,
    featured: true,
    urgent: false
  },
  {
    id: 2,
    title: "Full Stack Engineer",
    company: "StartupXYZ",
    location: "New York, NY",
    type: "Full-time",
    salary: "$100k - $130k",
    posted: "1 week ago",
    description: "Join our innovative startup as a full stack engineer...",
    requirements: ["Node.js", "React", "PostgreSQL", "3+ years experience"],
    benefits: ["Health insurance", "Flexible hours", "Learning budget"],
    rating: 4.5,
    applicants: 156,
    featured: false,
    urgent: true
  },
  {
    id: 3,
    title: "UI/UX Designer",
    company: "DesignStudio",
    location: "Austin, TX",
    type: "Contract",
    salary: "$80k - $100k",
    posted: "3 days ago",
    description: "Creative UI/UX designer needed for exciting projects...",
    requirements: ["Figma", "Adobe Creative Suite", "3+ years experience"],
    benefits: ["Flexible schedule", "Creative freedom"],
    rating: 4.7,
    applicants: 89,
    featured: true,
    urgent: false
  },
  {
    id: 4,
    title: "DevOps Engineer",
    company: "CloudTech",
    location: "Seattle, WA",
    type: "Full-time",
    salary: "$130k - $160k",
    posted: "5 days ago",
    description: "DevOps engineer to manage our cloud infrastructure...",
    requirements: ["AWS", "Docker", "Kubernetes", "4+ years experience"],
    benefits: ["Health insurance", "401k", "Remote work", "Learning budget"],
    rating: 4.6,
    applicants: 78,
    featured: false,
    urgent: false
  }
]

const JobCard = ({ job, index }) => {
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [isLiked, setIsLiked] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="group"
    >
      <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-white to-slate-50/50">
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <CardTitle className="text-xl font-bold group-hover:text-cyan-600 transition-colors">
                  {job.title}
                </CardTitle>
                {job.featured && (
                  <Badge className="bg-gradient-to-r from-cyan-500 to-emerald-500 text-white">
                    Featured
                  </Badge>
                )}
                {job.urgent && (
                  <Badge variant="destructive">
                    Urgent
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                <div className="flex items-center gap-1">
                  <Building2 className="w-4 h-4" />
                  {job.company}
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {job.location}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {job.posted}
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <Badge variant="outline" className="border-cyan-200 text-cyan-700">
                  {job.type}
                </Badge>
                <div className="flex items-center gap-1 text-emerald-600 font-medium">
                  <DollarSign className="w-4 h-4" />
                  {job.salary}
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm">{job.rating}</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Users className="w-4 h-4" />
                  {job.applicants} applicants
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`p-2 rounded-full transition-colors ${
                  isBookmarked 
                    ? 'bg-cyan-100 text-cyan-600' 
                    : 'bg-gray-100 text-gray-600 hover:bg-cyan-100 hover:text-cyan-600'
                }`}
              >
                <Bookmark className="w-4 h-4" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsLiked(!isLiked)}
                className={`p-2 rounded-full transition-colors ${
                  isLiked 
                    ? 'bg-red-100 text-red-600' 
                    : 'bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-600'
                }`}
              >
                <Heart className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-base mb-4">
            {job.description}
          </CardDescription>
          <div className="space-y-3">
            <div>
              <h4 className="font-semibold text-sm mb-2 text-gray-700">Key Requirements:</h4>
              <div className="flex flex-wrap gap-2">
                {job.requirements.map((req, idx) => (
                  <Badge key={idx} variant="secondary" className="text-xs">
                    {req}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-2 text-gray-700">Benefits:</h4>
              <div className="flex flex-wrap gap-2">
                {job.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-center gap-1 text-xs text-emerald-600">
                    <CheckCircle className="w-3 h-3" />
                    {benefit}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between mt-6 pt-4 border-t">
            <Button variant="outline" size="sm" className="hover:bg-cyan-50 hover:border-cyan-200">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button className="bg-gradient-to-r from-cyan-600 to-emerald-600 hover:from-cyan-700 hover:to-emerald-700">
              Apply Now
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default function JobSearchPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [location, setLocation] = useState("")
  const [jobType, setJobType] = useState("")
  const [experience, setExperience] = useState("")
  const [salaryRange, setSalaryRange] = useState("")
  const [filteredJobs, setFilteredJobs] = useState(mockJobs)

  useEffect(() => {
    let filtered = mockJobs

    if (searchTerm) {
      filtered = filtered.filter(job => 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (location) {
      filtered = filtered.filter(job => 
        job.location.toLowerCase().includes(location.toLowerCase())
      )
    }

    if (jobType) {
      filtered = filtered.filter(job => job.type === jobType)
    }

    setFilteredJobs(filtered)
  }, [searchTerm, location, jobType, experience, salaryRange])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-cyan-50/30">
      {/* Header */}
      <header className="border-b border-border bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-emerald-500 rounded-lg flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-heading font-bold bg-gradient-to-r from-cyan-600 to-emerald-600 bg-clip-text text-transparent">
                Job Search
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                Saved Jobs (3)
              </Button>
              <Button size="sm" className="bg-gradient-to-r from-cyan-600 to-emerald-600">
                Upload Resume
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Search Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="w-5 h-5 text-cyan-600" />
                Find Your Dream Job Worldwide 🌍
              </CardTitle>
              <CardDescription>
                Search through thousands of job opportunities and find the perfect match for your skills.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="lg:col-span-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Job title, company, or keywords"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 border-cyan-200 focus:border-cyan-400 focus:ring-cyan-400"
                    />
                  </div>
                </div>
                <div>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="pl-10 border-cyan-200 focus:border-cyan-400 focus:ring-cyan-400"
                    />
                  </div>
                </div>
                <Select value={jobType} onValueChange={setJobType}>
                  <SelectTrigger className="border-cyan-200 focus:border-cyan-400 focus:ring-cyan-400">
                    <SelectValue placeholder="Job Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Full-time">Full-time</SelectItem>
                    <SelectItem value="Part-time">Part-time</SelectItem>
                    <SelectItem value="Contract">Contract</SelectItem>
                    <SelectItem value="Remote">Remote</SelectItem>
                  </SelectContent>
                </Select>
                <Button className="bg-gradient-to-r from-cyan-600 to-emerald-600 hover:from-cyan-700 hover:to-emerald-700">
                  <Search className="w-4 h-4 mr-2" />
                  Search Jobs
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Results Section */}
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Filter className="w-5 h-5 text-cyan-600" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3">Experience Level</h4>
                  <Select value={experience} onValueChange={setExperience}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select experience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="entry">Entry Level (0-2 years)</SelectItem>
                      <SelectItem value="mid">Mid Level (3-5 years)</SelectItem>
                      <SelectItem value="senior">Senior Level (6+ years)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3">Salary Range</h4>
                  <Select value={salaryRange} onValueChange={setSalaryRange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select salary range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="50k-80k">$50k - $80k</SelectItem>
                      <SelectItem value="80k-120k">$80k - $120k</SelectItem>
                      <SelectItem value="120k-150k">$120k - $150k</SelectItem>
                      <SelectItem value="150k+">$150k+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Job Type</h4>
                  <div className="space-y-2">
                    {["Full-time", "Part-time", "Contract", "Remote"].map((type) => (
                      <label key={type} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          className="rounded border-cyan-300 text-cyan-600 focus:ring-cyan-500"
                        />
                        <span className="text-sm">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <Button variant="outline" className="w-full">
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Job Listings */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {filteredJobs.length} Jobs Found
                </h2>
                <p className="text-gray-600">
                  Showing results for your search criteria
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Sort by:</span>
                <Select>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Relevance" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Relevance</SelectItem>
                    <SelectItem value="date">Date Posted</SelectItem>
                    <SelectItem value="salary">Salary</SelectItem>
                    <SelectItem value="company">Company</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-6">
              {filteredJobs.map((job, index) => (
                <JobCard key={job.id} job={job} index={index} />
              ))}
            </div>

            {filteredJobs.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <Search className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No jobs found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search criteria or filters
                </p>
                <Button 
                  onClick={() => {
                    setSearchTerm("")
                    setLocation("")
                    setJobType("")
                    setExperience("")
                    setSalaryRange("")
                  }}
                  className="bg-gradient-to-r from-cyan-600 to-emerald-600"
                >
                  Clear All Filters
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
