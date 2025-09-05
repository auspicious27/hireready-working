"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  FileText,
  Target,
  BarChart3,
  Shield,
  TrendingUp,
  Download,
  Clock,
  CheckCircle,
  AlertTriangle,
} from "lucide-react"
import { UserManagement } from "@/components/admin/user-management"
import { ResumeAnalytics } from "@/components/admin/resume-analytics"
import { ATSAnalytics } from "@/components/admin/ats-analytics"
import { JobMatchAnalytics } from "@/components/admin/job-match-analytics"
import { SystemSettings } from "@/components/admin/system-settings"

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  // Mock admin stats
  const stats = {
    totalUsers: 12847,
    activeUsers: 8934,
    totalResumes: 23456,
    atsScans: 15678,
    jobMatches: 9876,
    avgScore: 78.5,
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        {/* Floating geometric shapes */}
        <div
          className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-cyan-400/20 to-emerald-400/20 rounded-full blur-xl animate-pulse"
          style={{ animation: "float 6s ease-in-out infinite" }}
        />
        <div
          className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-lg blur-lg rotate-45"
          style={{ animation: "float 8s ease-in-out infinite reverse" }}
        />
        <div
          className="absolute bottom-32 left-1/4 w-40 h-40 bg-gradient-to-br from-blue-400/15 to-cyan-400/15 rounded-full blur-2xl"
          style={{ animation: "float 10s ease-in-out infinite" }}
        />
        <div
          className="absolute bottom-20 right-1/3 w-28 h-28 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 rounded-lg blur-lg rotate-12"
          style={{ animation: "float 7s ease-in-out infinite reverse" }}
        />

        {/* Animated grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="w-full h-full"
            style={{
              backgroundImage:
                "linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)",
              backgroundSize: "50px 50px",
              animation: "gridMove 20s linear infinite",
            }}
          />
        </div>
      </div>

      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50 relative">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center transform hover:scale-110 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25"
                style={{ transform: "perspective(1000px) rotateY(-10deg)" }}
              >
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-heading font-bold bg-gradient-to-r from-cyan-600 to-emerald-600 bg-clip-text text-transparent">
                  Admin Dashboard
                </h1>
                <p className="text-sm text-muted-foreground">HireReady Platform Management</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge
                variant="secondary"
                className="bg-green-100 text-green-800 hover:scale-105 transition-transform duration-200"
              >
                System Healthy
              </Badge>
              <Button
                variant="outline"
                size="sm"
                className="hover:scale-105 transition-all duration-200 hover:shadow-lg bg-transparent"
              >
                <Download className="w-4 h-4 mr-2" />
                Export Data
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-card/50 backdrop-blur-sm">
            <TabsTrigger
              value="overview"
              className="hover:scale-105 transition-all duration-200 data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="users"
              className="hover:scale-105 transition-all duration-200 data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white"
            >
              Users
            </TabsTrigger>
            <TabsTrigger
              value="resumes"
              className="hover:scale-105 transition-all duration-200 data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white"
            >
              Resumes
            </TabsTrigger>
            <TabsTrigger
              value="ats"
              className="hover:scale-105 transition-all duration-200 data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white"
            >
              ATS Analytics
            </TabsTrigger>
            <TabsTrigger
              value="matching"
              className="hover:scale-105 transition-all duration-200 data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white"
            >
              Job Matching
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="hover:scale-105 transition-all duration-200 data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white"
            >
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card
                className="hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10 bg-card/50 backdrop-blur-sm border-0 shadow-lg"
                style={{ animation: "slideInUp 0.6s ease-out 0.1s both" }}
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground hover:text-cyan-500 transition-colors duration-200" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-emerald-600 bg-clip-text text-transparent">
                    {stats.totalUsers.toLocaleString()}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">+12%</span> from last month
                  </p>
                </CardContent>
              </Card>

              <Card
                className="hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10 bg-card/50 backdrop-blur-sm border-0 shadow-lg"
                style={{ animation: "slideInUp 0.6s ease-out 0.2s both" }}
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground hover:text-emerald-500 transition-colors duration-200" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                    {stats.activeUsers.toLocaleString()}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">+8%</span> from last week
                  </p>
                </CardContent>
              </Card>

              <Card
                className="hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 bg-card/50 backdrop-blur-sm border-0 shadow-lg"
                style={{ animation: "slideInUp 0.6s ease-out 0.3s both" }}
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Resumes Created</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground hover:text-blue-500 transition-colors duration-200" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                    {stats.totalResumes.toLocaleString()}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">+15%</span> from last month
                  </p>
                </CardContent>
              </Card>

              <Card
                className="hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 bg-card/50 backdrop-blur-sm border-0 shadow-lg"
                style={{ animation: "slideInUp 0.6s ease-out 0.4s both" }}
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">ATS Scans</CardTitle>
                  <Target className="h-4 w-4 text-muted-foreground hover:text-purple-500 transition-colors duration-200" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    {stats.atsScans.toLocaleString()}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">+22%</span> from last month
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card
                className="hover:scale-[1.02] transition-all duration-300 hover:shadow-xl bg-card/50 backdrop-blur-sm border-0 shadow-lg"
                style={{ animation: "slideInLeft 0.8s ease-out 0.5s both" }}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-cyan-500" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg hover:bg-muted/70 transition-all duration-200 hover:scale-[1.02]">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">New user registration</p>
                      <p className="text-xs text-muted-foreground">john.doe@email.com - 2 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg hover:bg-muted/70 transition-all duration-200 hover:scale-[1.02]">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Resume created</p>
                      <p className="text-xs text-muted-foreground">Software Engineer resume - 5 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg hover:bg-muted/70 transition-all duration-200 hover:scale-[1.02]">
                    <Target className="w-5 h-5 text-purple-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">ATS scan completed</p>
                      <p className="text-xs text-muted-foreground">Score: 85% - 8 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg hover:bg-muted/70 transition-all duration-200 hover:scale-[1.02]">
                    <BarChart3 className="w-5 h-5 text-orange-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Job match analysis</p>
                      <p className="text-xs text-muted-foreground">Strong fit detected - 12 minutes ago</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card
                className="hover:scale-[1.02] transition-all duration-300 hover:shadow-xl bg-card/50 backdrop-blur-sm border-0 shadow-lg"
                style={{ animation: "slideInRight 0.8s ease-out 0.6s both" }}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-orange-500" />
                    System Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg hover:scale-[1.02] transition-transform duration-200">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-sm font-medium">API Services</span>
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      Healthy
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg hover:scale-[1.02] transition-transform duration-200">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-sm font-medium">Database</span>
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      Healthy
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg hover:scale-[1.02] transition-transform duration-200">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-sm font-medium">File Processing</span>
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      Healthy
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg hover:scale-[1.02] transition-transform duration-200">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
                      <span className="text-sm font-medium">Email Service</span>
                    </div>
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                      Warning
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users">
            <UserManagement />
          </TabsContent>

          <TabsContent value="resumes">
            <ResumeAnalytics />
          </TabsContent>

          <TabsContent value="ats">
            <ATSAnalytics />
          </TabsContent>

          <TabsContent value="matching">
            <JobMatchAnalytics />
          </TabsContent>

          <TabsContent value="settings">
            <SystemSettings />
          </TabsContent>
        </Tabs>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
        
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }
      `}</style>
    </div>
  )
}
