"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Target, TrendingUp, AlertCircle, CheckCircle } from "lucide-react"

export function ATSAnalytics() {
  // Mock ATS analytics data
  const atsStats = {
    totalScans: 15678,
    averageScore: 78.5,
    scoreDistribution: {
      "90-100": 2345,
      "80-89": 4567,
      "70-79": 3890,
      "60-69": 2876,
      "Below 60": 2000,
    },
    commonIssues: [
      { issue: "Missing keywords", count: 8934, percentage: 57 },
      { issue: "Poor formatting", count: 6789, percentage: 43 },
      { issue: "Insufficient experience details", count: 5432, percentage: 35 },
      { issue: "Skills mismatch", count: 4321, percentage: 28 },
      { issue: "Contact info incomplete", count: 3210, percentage: 20 },
    ],
    improvements: {
      "Keywords added": 12456,
      "Format optimized": 9876,
      "Skills updated": 8765,
      "Experience enhanced": 7654,
    },
  }

  const getScoreColor = (range: string) => {
    if (range === "90-100") return "bg-green-100 text-green-800"
    if (range === "80-89") return "bg-blue-100 text-blue-800"
    if (range === "70-79") return "bg-yellow-100 text-yellow-800"
    if (range === "60-69") return "bg-orange-100 text-orange-800"
    return "bg-red-100 text-red-800"
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total ATS Scans</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{atsStats.totalScans.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+22%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{atsStats.averageScore}%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+2.3%</span> from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Scores</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(
                ((atsStats.scoreDistribution["90-100"] + atsStats.scoreDistribution["80-89"]) / atsStats.totalScans) *
                  100,
              )}
              %
            </div>
            <p className="text-xs text-muted-foreground">Scores 80% and above</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Score Distribution</CardTitle>
            <CardDescription>ATS compatibility score ranges</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(atsStats.scoreDistribution).map(([range, count]) => (
              <div key={range} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Badge className={getScoreColor(range)}>{range}%</Badge>
                  <span className="font-medium">{count.toLocaleString()} resumes</span>
                </div>
                <div className="flex items-center gap-2">
                  <Progress value={(count / atsStats.totalScans) * 100} className="w-20 h-2" />
                  <span className="text-sm text-muted-foreground">
                    {Math.round((count / atsStats.totalScans) * 100)}%
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Common Issues</CardTitle>
            <CardDescription>Most frequent ATS compatibility problems</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {atsStats.commonIssues.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-orange-500" />
                  <div>
                    <div className="font-medium">{item.issue}</div>
                    <div className="text-sm text-muted-foreground">{item.count.toLocaleString()} occurrences</div>
                  </div>
                </div>
                <Badge variant="outline">{item.percentage}%</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Improvement Tracking</CardTitle>
          <CardDescription>User actions taken based on ATS recommendations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(atsStats.improvements).map(([improvement, count]) => (
              <div key={improvement} className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-green-800">{improvement}</span>
                </div>
                <div className="text-2xl font-bold text-green-700">{count.toLocaleString()}</div>
                <div className="text-xs text-green-600">improvements made</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
