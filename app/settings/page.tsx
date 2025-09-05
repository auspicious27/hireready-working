"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Save, Bell, Shield, Palette, Globe, Download, Upload, Trash2 } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: false,
      sms: false,
      weeklyDigest: true
    },
    privacy: {
      profileVisibility: "public",
      dataSharing: false,
      analytics: true
    },
    appearance: {
      theme: "system",
      language: "en",
      fontSize: "medium"
    },
    data: {
      autoSave: true,
      backupFrequency: "daily"
    }
  })

  const handleSave = () => {
    // In a real app, save to backend
    console.log("Settings saved:", settings)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link href="/dashboard">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Link>
            </Button>
            <h1 className="text-xl font-heading font-bold text-foreground">Settings</h1>
          </div>
          <Button onClick={handleSave} className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Tabs defaultValue="notifications" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="privacy">Privacy</TabsTrigger>
              <TabsTrigger value="appearance">Appearance</TabsTrigger>
              <TabsTrigger value="data">Data</TabsTrigger>
            </TabsList>

            <TabsContent value="notifications" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="w-5 h-5 text-primary" />
                    Notification Preferences
                  </CardTitle>
                  <CardDescription>Choose how you want to be notified about updates and activities</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="email-notifications">Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive updates via email</p>
                      </div>
                      <Switch
                        id="email-notifications"
                        checked={settings.notifications.email}
                        onCheckedChange={(checked) => 
                          setSettings({
                            ...settings,
                            notifications: { ...settings.notifications, email: checked }
                          })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="push-notifications">Push Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive browser notifications</p>
                      </div>
                      <Switch
                        id="push-notifications"
                        checked={settings.notifications.push}
                        onCheckedChange={(checked) => 
                          setSettings({
                            ...settings,
                            notifications: { ...settings.notifications, push: checked }
                          })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="sms-notifications">SMS Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive updates via SMS</p>
                      </div>
                      <Switch
                        id="sms-notifications"
                        checked={settings.notifications.sms}
                        onCheckedChange={(checked) => 
                          setSettings({
                            ...settings,
                            notifications: { ...settings.notifications, sms: checked }
                          })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="weekly-digest">Weekly Digest</Label>
                        <p className="text-sm text-muted-foreground">Receive weekly summary emails</p>
                      </div>
                      <Switch
                        id="weekly-digest"
                        checked={settings.notifications.weeklyDigest}
                        onCheckedChange={(checked) => 
                          setSettings({
                            ...settings,
                            notifications: { ...settings.notifications, weeklyDigest: checked }
                          })
                        }
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="privacy" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-primary" />
                    Privacy & Security
                  </CardTitle>
                  <CardDescription>Control your privacy settings and data sharing preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="profile-visibility">Profile Visibility</Label>
                      <Select
                        value={settings.privacy.profileVisibility}
                        onValueChange={(value) => 
                          setSettings({
                            ...settings,
                            privacy: { ...settings.privacy, profileVisibility: value }
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="public">Public</SelectItem>
                          <SelectItem value="private">Private</SelectItem>
                          <SelectItem value="friends">Friends Only</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="data-sharing">Data Sharing</Label>
                        <p className="text-sm text-muted-foreground">Allow sharing of anonymized data for research</p>
                      </div>
                      <Switch
                        id="data-sharing"
                        checked={settings.privacy.dataSharing}
                        onCheckedChange={(checked) => 
                          setSettings({
                            ...settings,
                            privacy: { ...settings.privacy, dataSharing: checked }
                          })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="analytics">Analytics</Label>
                        <p className="text-sm text-muted-foreground">Help improve the platform with usage analytics</p>
                      </div>
                      <Switch
                        id="analytics"
                        checked={settings.privacy.analytics}
                        onCheckedChange={(checked) => 
                          setSettings({
                            ...settings,
                            privacy: { ...settings.privacy, analytics: checked }
                          })
                        }
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="appearance" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="w-5 h-5 text-primary" />
                    Appearance & Language
                  </CardTitle>
                  <CardDescription>Customize the look and feel of your experience</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="theme">Theme</Label>
                      <Select
                        value={settings.appearance.theme}
                        onValueChange={(value) => 
                          setSettings({
                            ...settings,
                            appearance: { ...settings.appearance, theme: value }
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">Light</SelectItem>
                          <SelectItem value="dark">Dark</SelectItem>
                          <SelectItem value="system">System</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="language">Language</Label>
                      <Select
                        value={settings.appearance.language}
                        onValueChange={(value) => 
                          setSettings({
                            ...settings,
                            appearance: { ...settings.appearance, language: value }
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="hi">हिंदी</SelectItem>
                          <SelectItem value="mai">मैथिली</SelectItem>
                          <SelectItem value="ta">தமிழ்</SelectItem>
                          <SelectItem value="te">తెలుగు</SelectItem>
                          <SelectItem value="kn">ಕನ್ನಡ</SelectItem>
                          <SelectItem value="ml">മലയാളം</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="font-size">Font Size</Label>
                      <Select
                        value={settings.appearance.fontSize}
                        onValueChange={(value) => 
                          setSettings({
                            ...settings,
                            appearance: { ...settings.appearance, fontSize: value }
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="small">Small</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="large">Large</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="data" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="w-5 h-5 text-primary" />
                    Data Management
                  </CardTitle>
                  <CardDescription>Manage your data, backups, and exports</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="auto-save">Auto Save</Label>
                        <p className="text-sm text-muted-foreground">Automatically save your work</p>
                      </div>
                      <Switch
                        id="auto-save"
                        checked={settings.data.autoSave}
                        onCheckedChange={(checked) => 
                          setSettings({
                            ...settings,
                            data: { ...settings.data, autoSave: checked }
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="backup-frequency">Backup Frequency</Label>
                      <Select
                        value={settings.data.backupFrequency}
                        onValueChange={(value) => 
                          setSettings({
                            ...settings,
                            data: { ...settings.data, backupFrequency: value }
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="pt-6 border-t">
                    <h4 className="font-medium mb-4">Data Actions</h4>
                    <div className="grid md:grid-cols-3 gap-4">
                      <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                        <Download className="w-5 h-5" />
                        <span>Export Data</span>
                        <span className="text-xs text-muted-foreground">Download your data</span>
                      </Button>
                      <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                        <Upload className="w-5 h-5" />
                        <span>Import Data</span>
                        <span className="text-xs text-muted-foreground">Upload backup file</span>
                      </Button>
                      <Button variant="destructive" className="h-auto p-4 flex flex-col items-center gap-2">
                        <Trash2 className="w-5 h-5" />
                        <span>Delete All Data</span>
                        <span className="text-xs text-muted-foreground">Permanently remove</span>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}
