"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Target, TrendingUp, Users, Briefcase } from "lucide-react"

export function JobMatchAnalytics() {
  // Mock job matching analytics data
  const matchStats = {
    totalMatches: 9876,
    averageMatchScore: 72.3,
    matchDistribution: {
      "Strong Fit": 2345,
      "Moderate Fit": 4567,
      "Low Fit": 2964,
    },
    topIndustries: [
      { industry: "Technology", matches: 3456, avgScore: 78.5 },
      { industry: "Healthcare", matches: 2134, avgScore: 74.2 },
      { industry: "Finance", matches: 1876, avgScore: 76.8 },
      { industry: "Marketing", matches: 1543, avgScore: 71.9 },
      { industry: "Education", matches: 867, avgScore: 69.3 },
    ],
    commonMissingSkills: [
      { skill: "Python", frequency: 1234 },
      { skill: "Project Management", frequency: 1098 },
      { skill: "AWS", frequency: 987 },
      { skill: "React", frequency: 876 },
      { skill: "Data Analysis", frequency: 765 },
    ],
    improvementActions: {
      "Summary rewrites used": 5432,
      "Bullet points improved": 4321,
      "Skills added": 6789,
      "Keywords incorporated": 7890,
    },
  }

  const getFitColor = (fit: string) => {
    switch (fit) {
      case "Strong Fit":
        return "bg-green-100 text-green-800"
      case "Moderate Fit":
        return "bg-yellow-100 text-yellow-800"
      case "Low Fit":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Job Matches</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{matchStats.totalMatches.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+18%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Match Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{matchStats.averageMatchScore}%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+1.8%</span> from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Strong Matches</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round((matchStats.matchDistribution["Strong Fit"] / matchStats.totalMatches) * 100)}%
            </div>
            <p className="text-xs text-muted-foreground">High compatibility matches</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Match Quality Distribution</CardTitle>
            <CardDescription>Job-resume compatibility breakdown</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(matchStats.matchDistribution).map(([fit, count]) => (
              <div key={fit} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Badge className={getFitColor(fit)}>{fit}</Badge>
                  <span className="font-medium">{count.toLocaleString()} matches</span>
                </div>
                <div className="flex items-center gap-2">
                  <Progress value={(count / matchStats.totalMatches) * 100} className="w-20 h-2" />
                  <span className="text-sm text-muted-foreground">
                    {Math.round((count / matchStats.totalMatches) * 100)}%
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Industries</CardTitle>
            <CardDescription>Most active job matching sectors</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {matchStats.topIndustries.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Briefcase className="w-5 h-5 text-primary" />
                  <div>
                    <div className="font-medium">{item.industry}</div>
                    <div className="text-sm text-muted-foreground">{item.matches.toLocaleString()} matches</div>
                  </div>
                </div>
                <Badge variant="outline">{item.avgScore}% avg</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Most Missing Skills</CardTitle>
            <CardDescription>Skills frequently absent from resumes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {matchStats.commonMissingSkills.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="font-medium">{item.skill}</span>
                <div className="flex items-center gap-2">
                  <Progress value={(item.frequency / 1500) * 100} className="w-16 h-2" />
                  <span className="text-sm text-muted-foreground">{item.frequency}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Improvements</CardTitle>
            <CardDescription>Actions taken based on job match feedback</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(matchStats.improvementActions).map(([action, count]) => (
              <div
                key={action}
                className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg"
              >
                <span className="text-sm font-medium text-blue-800">{action}</span>
                <Badge className="bg-blue-100 text-blue-700">{count.toLocaleString()}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
