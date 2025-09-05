"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Target, TrendingUp, AlertTriangle, CheckCircle, XCircle, Download, Share, RefreshCw } from "lucide-react"
import type { ATSScanResult } from "@/types/ats"

interface ATSResultsProps {
  result: ATSScanResult
}

export function ATSResults({ result }: ATSResultsProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreIcon = (score: number) => {
    if (score >= 80) return <CheckCircle className="w-5 h-5 text-green-600" />
    if (score >= 60) return <AlertTriangle className="w-5 h-5 text-yellow-600" />
    return <XCircle className="w-5 h-5 text-red-600" />
  }

  const getVerdictBadge = (verdict: ATSScanResult["verdict"]) => {
    const variants = {
      excellent: { variant: "default" as const, color: "bg-green-100 text-green-800" },
      good: { variant: "secondary" as const, color: "bg-blue-100 text-blue-800" },
      "needs-improvement": { variant: "outline" as const, color: "bg-yellow-100 text-yellow-800" },
      poor: { variant: "destructive" as const, color: "bg-red-100 text-red-800" },
    }

    return <Badge className={variants[verdict].color}>{verdict.replace("-", " ").toUpperCase()}</Badge>
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    })
  }

  return (
    <div className="space-y-8">
      {/* Overall Score Header */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="text-center pb-6">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
              <Target className="w-8 h-8 text-primary" />
            </div>
            <div>
              <div className={`text-4xl font-bold ${getScoreColor(result.overall)}`}>{result.overall}%</div>
              <p className="text-muted-foreground">ATS Score</p>
            </div>
          </div>
          <CardTitle className="font-heading text-2xl mb-2">Your Resume Analysis is Complete</CardTitle>
          <div className="flex items-center justify-center gap-4">
            {getVerdictBadge(result.verdict)}
            <span className="text-sm text-muted-foreground">Scanned on {formatDate(result.createdAt)}</span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center gap-3">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Download Report
            </Button>
            <Button variant="outline" size="sm">
              <Share className="w-4 h-4 mr-2" />
              Share Results
            </Button>
            <Button variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Rescan
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Score Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="font-heading">Score Breakdown</CardTitle>
          <CardDescription>Detailed analysis of your resume's ATS compatibility across key areas</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-medium">Keyword Match</span>
                <div className="flex items-center gap-2">
                  {getScoreIcon(result.breakdown.keywordMatch)}
                  <span className={`font-semibold ${getScoreColor(result.breakdown.keywordMatch)}`}>
                    {result.breakdown.keywordMatch}%
                  </span>
                </div>
              </div>
              <Progress value={result.breakdown.keywordMatch} className="h-2" />
              <p className="text-sm text-muted-foreground">Industry-relevant keywords and technical skills</p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-medium">Skills Coverage</span>
                <div className="flex items-center gap-2">
                  {getScoreIcon(result.breakdown.skillsCoverage)}
                  <span className={`font-semibold ${getScoreColor(result.breakdown.skillsCoverage)}`}>
                    {result.breakdown.skillsCoverage}%
                  </span>
                </div>
              </div>
              <Progress value={result.breakdown.skillsCoverage} className="h-2" />
              <p className="text-sm text-muted-foreground">Balance of hard and soft skills</p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-medium">Experience Relevance</span>
                <div className="flex items-center gap-2">
                  {getScoreIcon(result.breakdown.experienceRelevance)}
                  <span className={`font-semibold ${getScoreColor(result.breakdown.experienceRelevance)}`}>
                    {result.breakdown.experienceRelevance}%
                  </span>
                </div>
              </div>
              <Progress value={result.breakdown.experienceRelevance} className="h-2" />
              <p className="text-sm text-muted-foreground">Quantified achievements and action verbs</p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-medium">Formatting</span>
                <div className="flex items-center gap-2">
                  {getScoreIcon(result.breakdown.formatting)}
                  <span className={`font-semibold ${getScoreColor(result.breakdown.formatting)}`}>
                    {result.breakdown.formatting}%
                  </span>
                </div>
              </div>
              <Progress value={result.breakdown.formatting} className="h-2" />
              <p className="text-sm text-muted-foreground">ATS-friendly structure and parseability</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      {result.recommendations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="font-heading flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Recommendations
            </CardTitle>
            <CardDescription>Actionable steps to improve your ATS score</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {result.recommendations.map((recommendation, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-semibold text-accent">{index + 1}</span>
                  </div>
                  <p className="text-sm">{recommendation}</p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Missing Keywords */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-heading text-lg">Missing Hard Skills</CardTitle>
            <CardDescription>Technical skills that could strengthen your resume</CardDescription>
          </CardHeader>
          <CardContent>
            {result.missing.hardSkills.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {result.missing.hardSkills.map((skill) => (
                  <Badge key={skill} variant="outline" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Great! No critical hard skills missing.</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-heading text-lg">Missing Soft Skills</CardTitle>
            <CardDescription>Interpersonal skills that add value</CardDescription>
          </CardHeader>
          <CardContent>
            {result.missing.softSkills.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {result.missing.softSkills.map((skill) => (
                  <Badge key={skill} variant="outline" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Excellent soft skills coverage!</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
