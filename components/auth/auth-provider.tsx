"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

interface User {
  id: string
  email: string
  name: string
  plan: "free" | "pro"
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, name: string) => Promise<void>
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing session on mount
    const token = localStorage.getItem("auth-token")
    if (token) {
      // In a real app, validate token with backend
      // For now, mock a user
      setUser({
        id: "1",
        email: "demo@hireready.com",
        name: "Demo User",
        plan: "free",
      })
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    setLoading(true)
    try {
      // Mock login - in real app, call backend API
      const mockUser = {
        id: "1",
        email,
        name: email.split("@")[0],
        plan: "free" as const,
      }
      localStorage.setItem("auth-token", "mock-jwt-token")
      setUser(mockUser)
    } catch (error) {
      throw new Error("Login failed")
    } finally {
      setLoading(false)
    }
  }

  const register = async (email: string, password: string, name: string) => {
    setLoading(true)
    try {
      // Mock registration - in real app, call backend API
      const mockUser = {
        id: "1",
        email,
        name,
        plan: "free" as const,
      }
      localStorage.setItem("auth-token", "mock-jwt-token")
      setUser(mockUser)
    } catch (error) {
      throw new Error("Registration failed")
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem("auth-token")
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, login, register, logout, loading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
