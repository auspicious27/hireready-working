"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Bell, 
  CheckCircle, 
  AlertCircle, 
  Info, 
  Star, 
  FileText, 
  Target, 
  Users,
  TrendingUp,
  Calendar,
  Mail,
  Settings,
  Trash2,
  Check,
  Filter,
  MapPin,
  Building,
  GraduationCap,
  Briefcase
} from "lucide-react"

// Mock notification data with global context
const mockNotifications = [
  {
    id: 1,
    title: "New Job Match: Software Engineer at Google",
    message: "Your resume matches 95% with a Software Engineer position at Google in Mountain View, CA.",
    type: "job_match",
    priority: "high",
    read: false,
    timestamp: "2 hours ago",
    company: "Google",
    location: "Mountain View, CA, USA",
    salary: "$120k-180k"
  },
  {
    id: 2,
    title: "ATS Score Updated: 87%",
    message: "Your resume for 'Full Stack Developer' position has been scored 87% by our ATS system.",
    type: "ats_score",
    priority: "medium",
    read: false,
    timestamp: "4 hours ago",
    score: 87,
    improvement: "+5%"
  },
  {
    id: 3,
    title: "Interview Scheduled: Microsoft",
    message: "Your interview for Software Developer position at Microsoft has been scheduled for tomorrow at 10:00 AM PST.",
    type: "interview",
    priority: "high",
    read: true,
    timestamp: "1 day ago",
    company: "Microsoft",
    location: "Seattle, WA, USA",
    date: "Tomorrow, 10:00 AM PST"
  },
  {
    id: 4,
    title: "Profile Completion: 75%",
    message: "Complete your profile to increase your job match chances. Add your skills and certifications.",
    type: "profile",
    priority: "low",
    read: true,
    timestamp: "2 days ago",
    completion: 75
  },
  {
    id: 5,
    title: "New Companies Added",
    message: "25 new companies have been added to our platform including Apple, Meta, Netflix, and Tesla.",
    type: "system",
    priority: "low",
    read: false,
    timestamp: "3 days ago",
    companies: ["Apple", "Meta", "Netflix", "Tesla"]
  },
  {
    id: 6,
    title: "Resume Download: 45 times",
    message: "Your resume has been downloaded 45 times this week. Great job!",
    type: "achievement",
    priority: "medium",
    read: true,
    timestamp: "1 week ago",
    downloads: 45
  }
]

const NotificationCard = ({ notification, onMarkAsRead, onDelete }) => {
  const getIcon = () => {
    switch (notification.type) {
      case "job_match":
        return <Target className="w-5 h-5 text-green-600" />
      case "ats_score":
        return <CheckCircle className="w-5 h-5 text-blue-600" />
      case "interview":
        return <Calendar className="w-5 h-5 text-purple-600" />
      case "profile":
        return <Users className="w-5 h-5 text-orange-600" />
      case "system":
        return <Info className="w-5 h-5 text-gray-600" />
      case "achievement":
        return <Star className="w-5 h-5 text-yellow-600" />
      default:
        return <Bell className="w-5 h-5 text-gray-600" />
    }
  }

  const getPriorityColor = () => {
    switch (notification.priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`group ${!notification.read ? 'bg-blue-50/50 border-l-4 border-l-blue-500' : ''}`}
    >
      <Card className="hover:shadow-md transition-all duration-300 border-l-0">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-1">
              {getIcon()}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <h4 className="font-medium text-sm leading-5 mb-1">
                    {notification.title}
                  </h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    {notification.message}
                  </p>
                  
                  {/* Additional details based on notification type */}
                  {notification.type === "job_match" && (
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
                      <div className="flex items-center gap-1">
                        <Building className="w-3 h-3" />
                        {notification.company}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {notification.location}
                      </div>
                      <div className="text-green-600 font-medium">
                        {notification.salary}
                      </div>
                    </div>
                  )}
                  
                  {notification.type === "interview" && (
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
                      <div className="flex items-center gap-1">
                        <Building className="w-3 h-3" />
                        {notification.company}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {notification.location}
                      </div>
                      <div className="text-purple-600 font-medium">
                        {notification.date}
                      </div>
                    </div>
                  )}
                  
                  {notification.type === "ats_score" && (
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
                      <div className="text-blue-600 font-bold text-lg">
                        {notification.score}%
                      </div>
                      <div className="text-green-600 font-medium">
                        {notification.improvement} improvement
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={`text-xs ${getPriorityColor()}`}>
                      {notification.priority}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {notification.timestamp}
                    </span>
                    {!notification.read && (
                      <Badge variant="default" className="text-xs bg-blue-600">
                        New
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-shrink-0 flex gap-2 mt-1">
              {!notification.read && (
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="text-xs h-7 opacity-0 group-hover:opacity-100 transition-opacity" 
                  onClick={() => onMarkAsRead(notification.id)}
                >
                  <Check className="w-3 h-3 mr-1" />
                  Mark Read
                </Button>
              )}
              <Button 
                size="sm" 
                variant="ghost" 
                className="text-xs h-7 opacity-0 group-hover:opacity-100 transition-opacity text-red-600 hover:text-red-700" 
                onClick={() => onDelete(notification.id)}
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications)
  const [activeTab, setActiveTab] = useState("all")
  const [filter, setFilter] = useState("all")

  const handleMarkAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    )
  }

  const handleDelete = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id))
  }

  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })))
  }

  const handleClearAll = () => {
    setNotifications([])
  }

  const filteredNotifications = notifications.filter(notification => {
    if (activeTab === "unread") return !notification.read
    if (activeTab === "read") return notification.read
    if (filter === "high") return notification.priority === "high"
    if (filter === "medium") return notification.priority === "medium"
    if (filter === "low") return notification.priority === "low"
    return true
  })

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Bell className="w-5 h-5 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-heading font-bold text-foreground">Notifications</h1>
              {unreadCount > 0 && (
                <Badge variant="default" className="bg-red-600">
                  {unreadCount} new
                </Badge>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2 mb-6">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("all")}
            >
              <Filter className="w-4 h-4 mr-2" />
              All
            </Button>
            <Button
              variant={filter === "high" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("high")}
            >
              High Priority
            </Button>
            <Button
              variant={filter === "medium" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("medium")}
            >
              Medium Priority
            </Button>
            <Button
              variant={filter === "low" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("low")}
            >
              Low Priority
            </Button>
            <div className="ml-auto flex gap-2">
              <Button variant="outline" size="sm" onClick={handleMarkAllAsRead}>
                <Check className="w-4 h-4 mr-2" />
                Mark All Read
              </Button>
              <Button variant="outline" size="sm" onClick={handleClearAll}>
                <Trash2 className="w-4 h-4 mr-2" />
                Clear All
              </Button>
            </div>
          </div>

          {/* Notifications Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">All ({notifications.length})</TabsTrigger>
              <TabsTrigger value="unread">Unread ({unreadCount})</TabsTrigger>
              <TabsTrigger value="read">Read ({notifications.length - unreadCount})</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="space-y-4">
              <AnimatePresence mode="popLayout">
                {filteredNotifications.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-12"
                  >
                    <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No notifications</h3>
                    <p className="text-muted-foreground">
                      {activeTab === "unread" 
                        ? "You're all caught up! No unread notifications." 
                        : "No notifications to show."}
                    </p>
                  </motion.div>
                ) : (
                  filteredNotifications.map((notification) => (
                    <NotificationCard
                      key={notification.id}
                      notification={notification}
                      onMarkAsRead={handleMarkAsRead}
                      onDelete={handleDelete}
                    />
                  ))
                )}
              </AnimatePresence>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}