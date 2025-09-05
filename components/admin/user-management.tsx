"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Users, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Mail, 
  Shield, 
  ShieldCheck,
  UserCheck,
  UserX,
  Calendar,
  TrendingUp,
  Activity,
  Eye,
  Ban
} from "lucide-react"

  // Mock user data
const mockUsers = [
    {
    id: 1,
      name: "John Doe",
      email: "john.doe@email.com",
    role: "user",
    status: "active",
      joinDate: "2024-01-15",
    lastActive: "2 hours ago",
      resumeCount: 3,
      atsScans: 12,
    jobApplications: 8,
    avatar: "/placeholder-user.jpg"
    },
    {
    id: 2,
      name: "Jane Smith",
      email: "jane.smith@email.com",
    role: "premium",
    status: "active",
    joinDate: "2024-02-20",
    lastActive: "1 day ago",
      resumeCount: 5,
      atsScans: 25,
    jobApplications: 15,
    avatar: "/placeholder-user.jpg"
    },
    {
    id: 3,
      name: "Mike Johnson",
    email: "mike.johnson@email.com",
    role: "user",
      status: "inactive",
    joinDate: "2024-01-10",
    lastActive: "1 week ago",
    resumeCount: 1,
    atsScans: 3,
    jobApplications: 2,
    avatar: "/placeholder-user.jpg"
  },
  {
    id: 4,
    name: "Sarah Wilson",
    email: "sarah.wilson@email.com",
    role: "admin",
    status: "active",
    joinDate: "2023-12-01",
    lastActive: "30 minutes ago",
    resumeCount: 8,
    atsScans: 45,
    jobApplications: 22,
    avatar: "/placeholder-user.jpg"
  }
]

const UserCard = ({ user, index }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const getRoleColor = (role) => {
    switch (role) {
      case "admin": return "bg-red-100 text-red-800"
      case "premium": return "bg-purple-100 text-purple-800"
      case "user": return "bg-blue-100 text-blue-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800"
      case "inactive": return "bg-gray-100 text-gray-800"
      case "banned": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -2 }}
    >
      <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-slate-50/50">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                />
                <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                  user.status === "active" ? "bg-green-500" : "bg-gray-400"
                }`} />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-gray-900">{user.name}</h3>
                <p className="text-sm text-gray-600">{user.email}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge className={getRoleColor(user.role)}>
                    {user.role}
                  </Badge>
                  <Badge className={getStatusColor(user.status)}>
                    {user.status}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                <Eye className="w-4 h-4 mr-2" />
                {isExpanded ? "Hide" : "View"}
              </Button>
              <Button variant="outline" size="sm">
                <Edit className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 pt-6 border-t border-gray-200"
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-cyan-600">{user.resumeCount}</div>
                  <div className="text-sm text-gray-600">Resumes</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-600">{user.atsScans}</div>
                  <div className="text-sm text-gray-600">ATS Scans</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{user.jobApplications}</div>
                  <div className="text-sm text-gray-600">Applications</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-medium text-gray-600">Joined</div>
                  <div className="text-sm text-gray-500">{user.joinDate}</div>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  Last active: {user.lastActive}
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline">
                    <Mail className="w-4 h-4 mr-2" />
                    Send Email
                  </Button>
                  <Button size="sm" variant="outline">
                    <Shield className="w-4 h-4 mr-2" />
                    Manage Role
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}

export function UserManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [activeTab, setActiveTab] = useState("all")

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = roleFilter === "all" || user.role === roleFilter
    const matchesStatus = statusFilter === "all" || user.status === statusFilter
    
    return matchesSearch && matchesRole && matchesStatus
  })

  const activeUsers = filteredUsers.filter(u => u.status === "active")
  const premiumUsers = filteredUsers.filter(u => u.role === "premium")
  const newUsers = filteredUsers.filter(u => {
    const joinDate = new Date(u.joinDate)
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    return joinDate > thirtyDaysAgo
  })

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">Total Users</p>
                  <p className="text-3xl font-bold text-blue-700">{filteredUsers.length}</p>
                </div>
                <Users className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-600">Active Users</p>
                  <p className="text-3xl font-bold text-green-700">{activeUsers.length}</p>
                </div>
                <UserCheck className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-600">Premium Users</p>
                  <p className="text-3xl font-bold text-purple-700">{premiumUsers.length}</p>
                </div>
                <ShieldCheck className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-orange-100/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-orange-600">New Users (30d)</p>
                  <p className="text-3xl font-bold text-orange-700">{newUsers.length}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Search and Filters */}
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5 text-cyan-600" />
            Search & Filter Users
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                  placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-cyan-200 focus:border-cyan-400 focus:ring-cyan-400"
              />
            </div>
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="border-cyan-200 focus:border-cyan-400 focus:ring-cyan-400">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
                <SelectItem value="user">User</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="border-cyan-200 focus:border-cyan-400 focus:ring-cyan-400">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="banned">Banned</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* User Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-white/80 backdrop-blur-sm">
          <TabsTrigger value="all" className="hover:scale-105 transition-all duration-200">
            All ({filteredUsers.length})
          </TabsTrigger>
          <TabsTrigger value="active" className="hover:scale-105 transition-all duration-200">
            Active ({activeUsers.length})
          </TabsTrigger>
          <TabsTrigger value="premium" className="hover:scale-105 transition-all duration-200">
            Premium ({premiumUsers.length})
          </TabsTrigger>
          <TabsTrigger value="new" className="hover:scale-105 transition-all duration-200">
            New ({newUsers.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          {activeTab === "all" && filteredUsers.map((user, index) => (
            <UserCard key={user.id} user={user} index={index} />
          ))}
          {activeTab === "active" && activeUsers.map((user, index) => (
            <UserCard key={user.id} user={user} index={index} />
          ))}
          {activeTab === "premium" && premiumUsers.map((user, index) => (
            <UserCard key={user.id} user={user} index={index} />
          ))}
          {activeTab === "new" && newUsers.map((user, index) => (
            <UserCard key={user.id} user={user} index={index} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}