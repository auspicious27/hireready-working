"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Building2, 
  MapPin, 
  Users, 
  Star, 
  Globe, 
  Calendar, 
  TrendingUp,
  Heart,
  Share2,
  ExternalLink,
  Briefcase,
  Award,
  Clock,
  DollarSign,
  CheckCircle,
  ArrowRight,
  Filter,
  Search
} from "lucide-react"

// Mock company data
const mockCompanies = [
  {
    id: 1,
    name: "TechCorp Inc.",
    logo: "/placeholder-logo.png",
    description: "Leading technology company specializing in innovative software solutions and digital transformation.",
    industry: "Technology",
    size: "1000-5000 employees",
    location: "San Francisco, CA",
    founded: "2010",
    website: "https://techcorp.com",
    rating: 4.8,
    reviews: 1247,
    openJobs: 23,
    benefits: ["Health Insurance", "401k", "Remote Work", "Stock Options", "Learning Budget"],
    culture: ["Innovation", "Collaboration", "Work-Life Balance", "Diversity"],
    featured: true,
    verified: true
  },
  {
    id: 2,
    name: "StartupXYZ",
    logo: "/placeholder-logo.png",
    description: "Fast-growing startup revolutionizing the fintech industry with cutting-edge payment solutions.",
    industry: "Fintech",
    size: "50-200 employees",
    location: "New York, NY",
    founded: "2018",
    website: "https://startupxyz.com",
    rating: 4.5,
    reviews: 89,
    openJobs: 12,
    benefits: ["Health Insurance", "Flexible Hours", "Learning Budget", "Equity"],
    culture: ["Fast-paced", "Innovation", "Growth", "Teamwork"],
    featured: false,
    verified: true
  },
  {
    id: 3,
    name: "DesignStudio",
    logo: "/placeholder-logo.png",
    description: "Creative design agency focused on user experience and digital product design.",
    industry: "Design",
    size: "20-50 employees",
    location: "Austin, TX",
    founded: "2015",
    website: "https://designstudio.com",
    rating: 4.7,
    reviews: 156,
    openJobs: 8,
    benefits: ["Health Insurance", "Flexible Schedule", "Creative Freedom", "Professional Development"],
    culture: ["Creativity", "Collaboration", "Innovation", "Work-Life Balance"],
    featured: true,
    verified: false
  },
  {
    id: 4,
    name: "CloudTech",
    logo: "/placeholder-logo.png",
    description: "Cloud infrastructure and DevOps solutions provider for enterprise clients.",
    industry: "Cloud Computing",
    size: "500-1000 employees",
    location: "Seattle, WA",
    founded: "2012",
    website: "https://cloudtech.com",
    rating: 4.6,
    reviews: 234,
    openJobs: 15,
    benefits: ["Health Insurance", "401k", "Remote Work", "Learning Budget", "Stock Options"],
    culture: ["Technical Excellence", "Innovation", "Collaboration", "Growth"],
    featured: false,
    verified: true
  }
]

const CompanyCard = ({ company, index }) => {
  const [isFollowing, setIsFollowing] = useState(false)
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
            <div className="flex items-start gap-4">
              <div className="relative">
                <img
                  src={company.logo}
                  alt={company.name}
                  className="w-16 h-16 rounded-lg object-cover border-2 border-gray-200"
                />
                {company.verified && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-3 h-3 text-white" />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-xl font-bold group-hover:text-cyan-600 transition-colors">
                    {company.name}
                  </h3>
                  {company.featured && (
                    <Badge className="bg-gradient-to-r from-cyan-500 to-emerald-500 text-white">
                      Featured
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                  {company.description}
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Building2 className="w-4 h-4" />
                    {company.industry}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {company.size}
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {company.location}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
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
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
              >
                <Share2 className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="font-semibold">{company.rating}</span>
              </div>
              <span className="text-sm text-gray-600">({company.reviews} reviews)</span>
            </div>
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-blue-600" />
              <span className="font-semibold text-blue-600">{company.openJobs} open jobs</span>
            </div>
          </div>
          
          <div className="space-y-3">
            <div>
              <h4 className="font-semibold text-sm mb-2 text-gray-700">Key Benefits:</h4>
              <div className="flex flex-wrap gap-2">
                {company.benefits.slice(0, 3).map((benefit, idx) => (
                  <Badge key={idx} variant="secondary" className="text-xs">
                    {benefit}
                  </Badge>
                ))}
                {company.benefits.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{company.benefits.length - 3} more
                  </Badge>
                )}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-2 text-gray-700">Company Culture:</h4>
              <div className="flex flex-wrap gap-2">
                {company.culture.slice(0, 3).map((value, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs border-emerald-200 text-emerald-700">
                    {value}
                  </Badge>
                ))}
                {company.culture.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{company.culture.length - 3} more
                  </Badge>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between mt-6 pt-4 border-t">
            <Button 
              variant="outline" 
              size="sm" 
              className="hover:bg-gray-50"
              onClick={() => setIsFollowing(!isFollowing)}
            >
              {isFollowing ? "Following" : "Follow Company"}
            </Button>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="hover:bg-gray-50">
                <ExternalLink className="w-4 h-4 mr-2" />
                Visit Website
              </Button>
              <Button className="bg-gradient-to-r from-cyan-600 to-emerald-600 hover:from-cyan-700 hover:to-emerald-700">
                View Jobs
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default function CompanyProfilesPage() {
  const [companies, setCompanies] = useState(mockCompanies)
  const [searchTerm, setSearchTerm] = useState("")
  const [industry, setIndustry] = useState("")
  const [size, setSize] = useState("")
  const [location, setLocation] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesIndustry = !industry || company.industry === industry
    const matchesSize = !size || company.size === size
    const matchesLocation = !location || company.location.toLowerCase().includes(location.toLowerCase())
    
    return matchesSearch && matchesIndustry && matchesSize && matchesLocation
  })

  const featuredCompanies = filteredCompanies.filter(c => c.featured)
  const verifiedCompanies = filteredCompanies.filter(c => c.verified)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-cyan-50/30">
      {/* Header */}
      <header className="border-b border-border bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-emerald-500 rounded-lg flex items-center justify-center">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-heading font-bold bg-gradient-to-r from-cyan-600 to-emerald-600 bg-clip-text text-transparent">
                Company Profiles
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                Following (12)
              </Button>
              <Button size="sm" className="bg-gradient-to-r from-cyan-600 to-emerald-600">
                <Globe className="w-4 h-4 mr-2" />
                Browse Jobs
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
                Discover Companies
              </CardTitle>
              <CardDescription>
                Explore company profiles and find your ideal workplace.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="lg:col-span-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search companies..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <select
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                >
                  <option value="">All Industries</option>
                  <option value="Technology">Technology</option>
                  <option value="Fintech">Fintech</option>
                  <option value="Design">Design</option>
                  <option value="Cloud Computing">Cloud Computing</option>
                </select>
                <select
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                >
                  <option value="">All Sizes</option>
                  <option value="20-50 employees">20-50 employees</option>
                  <option value="50-200 employees">50-200 employees</option>
                  <option value="500-1000 employees">500-1000 employees</option>
                  <option value="1000-5000 employees">1000-5000 employees</option>
                </select>
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
                  <h4 className="font-semibold mb-3">Company Type</h4>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input type="checkbox" className="rounded border-cyan-300 text-cyan-600 focus:ring-cyan-500" />
                      <span className="text-sm">Featured Companies</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input type="checkbox" className="rounded border-cyan-300 text-cyan-600 focus:ring-cyan-500" />
                      <span className="text-sm">Verified Companies</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input type="checkbox" className="rounded border-cyan-300 text-cyan-600 focus:ring-cyan-500" />
                      <span className="text-sm">Hiring Now</span>
                    </label>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Company Size</h4>
                  <div className="space-y-2">
                    {["Startup (1-50)", "Small (51-200)", "Medium (201-1000)", "Large (1000+)"].map((size) => (
                      <label key={size} className="flex items-center space-x-2 cursor-pointer">
                        <input type="checkbox" className="rounded border-cyan-300 text-cyan-600 focus:ring-cyan-500" />
                        <span className="text-sm">{size}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Benefits</h4>
                  <div className="space-y-2">
                    {["Remote Work", "Health Insurance", "401k", "Stock Options", "Learning Budget"].map((benefit) => (
                      <label key={benefit} className="flex items-center space-x-2 cursor-pointer">
                        <input type="checkbox" className="rounded border-cyan-300 text-cyan-600 focus:ring-cyan-500" />
                        <span className="text-sm">{benefit}</span>
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

          {/* Company Listings */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-3 bg-white/80 backdrop-blur-sm">
                <TabsTrigger value="all" className="hover:scale-105 transition-all duration-200">
                  All ({filteredCompanies.length})
                </TabsTrigger>
                <TabsTrigger value="featured" className="hover:scale-105 transition-all duration-200">
                  Featured ({featuredCompanies.length})
                </TabsTrigger>
                <TabsTrigger value="verified" className="hover:scale-105 transition-all duration-200">
                  Verified ({verifiedCompanies.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab} className="space-y-6">
                {activeTab === "all" && filteredCompanies.map((company, index) => (
                  <CompanyCard key={company.id} company={company} index={index} />
                ))}
                {activeTab === "featured" && featuredCompanies.map((company, index) => (
                  <CompanyCard key={company.id} company={company} index={index} />
                ))}
                {activeTab === "verified" && verifiedCompanies.map((company, index) => (
                  <CompanyCard key={company.id} company={company} index={index} />
                ))}
              </TabsContent>
            </Tabs>

            {filteredCompanies.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <Building2 className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No companies found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search criteria or filters
                </p>
                <Button 
                  onClick={() => {
                    setSearchTerm("")
                    setIndustry("")
                    setSize("")
                    setLocation("")
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
