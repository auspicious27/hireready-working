"use client"

import { Button } from "@/components/ui/button"
import { FileText, Menu, X } from "lucide-react"
import Link from "next/link"
import { EnhancedLanguageSelector } from "@/components/i18n/language-modal"
import { HomePageContent } from "@/components/home/home-page-content"
import { useState } from "react"

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-heading font-bold text-foreground">HireReady</h1>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/builder" className="text-muted-foreground hover:text-foreground transition-colors hover:scale-105 transform">
              Resume Builder
            </Link>
            <Link href="/ats-score" className="text-muted-foreground hover:text-foreground transition-colors hover:scale-105 transform">
              ATS Score
            </Link>
            <Link href="/job-match" className="text-muted-foreground hover:text-foreground transition-colors hover:scale-105 transform">
              Job Match
            </Link>
            <Link href="/job-search" className="text-muted-foreground hover:text-foreground transition-colors hover:scale-105 transform">
              Job Search
            </Link>
            <Link href="/companies" className="text-muted-foreground hover:text-foreground transition-colors hover:scale-105 transform">
              Companies
            </Link>
            <Link href="/notifications" className="text-muted-foreground hover:text-foreground transition-colors hover:scale-105 transform">
              Notifications
            </Link>
          </nav>
          
          <div className="flex items-center gap-3">
            <EnhancedLanguageSelector />
            <Button variant="ghost" asChild className="hidden sm:flex hover:bg-primary/10 transition-colors">
              <Link href="/login">Sign In</Link>
            </Button>
            <Button asChild className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              <Link href="/register">Get Started Free</Link>
            </Button>
            
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-card/95 backdrop-blur-sm">
            <nav className="container mx-auto px-4 py-4 space-y-3">
              <Link 
                href="/builder" 
                className="block text-muted-foreground hover:text-foreground transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Resume Builder
              </Link>
              <Link 
                href="/ats-score" 
                className="block text-muted-foreground hover:text-foreground transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                ATS Score
              </Link>
              <Link 
                href="/job-match" 
                className="block text-muted-foreground hover:text-foreground transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Job Match
              </Link>
              <Link 
                href="/job-search" 
                className="block text-muted-foreground hover:text-foreground transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Job Search
              </Link>
              <Link 
                href="/companies" 
                className="block text-muted-foreground hover:text-foreground transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Companies
              </Link>
              <Link 
                href="/notifications" 
                className="block text-muted-foreground hover:text-foreground transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Notifications
              </Link>
              <div className="pt-3 border-t border-border">
                <Button variant="ghost" asChild className="w-full justify-start">
                  <Link href="/login" onClick={() => setMobileMenuOpen(false)}>Sign In</Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </header>

      <HomePageContent />
    </div>
  )
}
