"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Settings, Save, RefreshCw, Database, Mail, Shield, Globe } from "lucide-react"

export function SystemSettings() {
  const [settings, setSettings] = useState({
    siteName: "HireReady",
    siteDescription: "Build ATS-optimized resumes and land your dream job",
    maxFileSize: "10",
    allowedFileTypes: "pdf,docx",
    emailNotifications: true,
    maintenanceMode: false,
    registrationEnabled: true,
    atsScoreThreshold: "70",
    maxResumesPerUser: "10",
    sessionTimeout: "24",
  })

  const handleSave = () => {
    // Mock save functionality
    console.log("Settings saved:", settings)
    alert("Settings saved successfully!")
  }

  const handleReset = () => {
    // Mock reset functionality
    console.log("Settings reset to defaults")
    alert("Settings reset to defaults!")
  }

  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5" />
              General Settings
            </CardTitle>
            <CardDescription>Basic platform configuration</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="siteName">Site Name</Label>
              <Input
                id="siteName"
                value={settings.siteName}
                onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="siteDescription">Site Description</Label>
              <Textarea
                id="siteDescription"
                value={settings.siteDescription}
                onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
                rows={3}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Maintenance Mode</Label>
                <div className="text-sm text-muted-foreground">Temporarily disable public access</div>
              </div>
              <Switch
                checked={settings.maintenanceMode}
                onCheckedChange={(checked) => setSettings({ ...settings, maintenanceMode: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>User Registration</Label>
                <div className="text-sm text-muted-foreground">Allow new user signups</div>
              </div>
              <Switch
                checked={settings.registrationEnabled}
                onCheckedChange={(checked) => setSettings({ ...settings, registrationEnabled: checked })}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              File Upload Settings
            </CardTitle>
            <CardDescription>Configure file upload parameters</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="maxFileSize">Max File Size (MB)</Label>
              <Input
                id="maxFileSize"
                type="number"
                value={settings.maxFileSize}
                onChange={(e) => setSettings({ ...settings, maxFileSize: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="allowedFileTypes">Allowed File Types</Label>
              <Input
                id="allowedFileTypes"
                value={settings.allowedFileTypes}
                onChange={(e) => setSettings({ ...settings, allowedFileTypes: e.target.value })}
                placeholder="pdf,docx,doc"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="atsThreshold">ATS Score Threshold (%)</Label>
              <Input
                id="atsThreshold"
                type="number"
                value={settings.atsScoreThreshold}
                onChange={(e) => setSettings({ ...settings, atsScoreThreshold: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="maxResumes">Max Resumes per User</Label>
              <Input
                id="maxResumes"
                type="number"
                value={settings.maxResumesPerUser}
                onChange={(e) => setSettings({ ...settings, maxResumesPerUser: e.target.value })}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="w-5 h-5" />
              Email Settings
            </CardTitle>
            <CardDescription>Configure email notifications and settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Email Notifications</Label>
                <div className="text-sm text-muted-foreground">Send system notifications via email</div>
              </div>
              <Switch
                checked={settings.emailNotifications}
                onCheckedChange={(checked) => setSettings({ ...settings, emailNotifications: checked })}
              />
            </div>
            <div className="p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Email Service Status</span>
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                  Warning
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">Email service experiencing delays. Check configuration.</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Security Settings
            </CardTitle>
            <CardDescription>Security and session management</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="sessionTimeout">Session Timeout (hours)</Label>
              <Input
                id="sessionTimeout"
                type="number"
                value={settings.sessionTimeout}
                onChange={(e) => setSettings({ ...settings, sessionTimeout: e.target.value })}
              />
            </div>
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-green-800">Security Status</span>
                <Badge className="bg-green-100 text-green-800">Secure</Badge>
              </div>
              <p className="text-xs text-green-700">All security measures are active and functioning properly.</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="w-5 h-5" />
            System Status
          </CardTitle>
          <CardDescription>Current system health and performance metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-green-800">Database</span>
                <Badge className="bg-green-100 text-green-800">Healthy</Badge>
              </div>
              <div className="text-xs text-green-700">
                Response time: 45ms
                <br />
                Connections: 23/100
              </div>
            </div>
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-green-800">API Services</span>
                <Badge className="bg-green-100 text-green-800">Healthy</Badge>
              </div>
              <div className="text-xs text-green-700">
                Uptime: 99.9%
                <br />
                Requests/min: 1,234
              </div>
            </div>
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-yellow-800">Storage</span>
                <Badge className="bg-yellow-100 text-yellow-800">Warning</Badge>
              </div>
              <div className="text-xs text-yellow-700">
                Usage: 78% (7.8GB/10GB)
                <br />
                Files: 45,678
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center gap-4">
        <Button onClick={handleSave} className="flex items-center gap-2">
          <Save className="w-4 h-4" />
          Save Settings
        </Button>
        <Button variant="outline" onClick={handleReset} className="flex items-center gap-2 bg-transparent">
          <RefreshCw className="w-4 h-4" />
          Reset to Defaults
        </Button>
      </div>
    </div>
  )
}
