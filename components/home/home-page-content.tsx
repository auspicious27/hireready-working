"use client"

import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Target, CheckCircle, ArrowRight, Star, Zap, Users, TrendingUp, Award, Globe, Shield, Sparkles } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/components/i18n/language-provider"

// 3D Floating Elements Component
const FloatingElement = ({ children, delay = 0, duration = 3, className = "" }) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20, rotateX: -15 }}
      animate={{ 
        opacity: 1, 
        y: 0, 
        rotateX: 0,
        y: [0, -10, 0],
        rotateY: [0, 5, 0]
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }}
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px"
      }}
    >
      {children}
    </motion.div>
  )
}

// Animated Background Particles
const ParticleField = () => {
  const [particles, setParticles] = useState([])
  
  useEffect(() => {
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      delay: Math.random() * 5,
      duration: Math.random() * 10 + 5
    }))
    setParticles(newParticles)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-gradient-to-r from-cyan-400/20 to-emerald-400/20"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 20 - 10, 0],
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.8, 0.3]
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  )
}

// 3D Card Component
const AnimatedCard = ({ children, delay = 0, className = "" }) => {
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 50, rotateX: -20 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      whileHover={{ 
        y: -10, 
        rotateX: 5, 
        rotateY: 5,
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
      transition={{ duration: 0.6, delay }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px"
      }}
    >
      <motion.div
        className="h-full"
        animate={{
          rotateY: isHovered ? 2 : 0,
          boxShadow: isHovered 
            ? "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(6, 182, 212, 0.1)"
            : "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
        }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

export function HomePageContent() {
  const { t } = useLanguage()
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [0, -50])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [1, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95])

  return (
    <motion.div 
      ref={containerRef}
      style={{ y, opacity, scale }}
      className="relative"
    >
      <ParticleField />
      
      {/* Hero Section with 3D Effects */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <FloatingElement delay={0.2}>
            <Badge variant="secondary" className="mb-4 bg-gradient-to-r from-cyan-100 to-emerald-100 text-cyan-800 border-cyan-200">
              <Star className="w-3 h-3 mr-1" />
              {t.home.subtitle}
            </Badge>
          </FloatingElement>
          
          <motion.h1 
            className="text-4xl md:text-6xl font-heading font-black text-balance mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Land Your Dream Job Worldwide 🌍
          </motion.h1>
          
          <FloatingElement delay={0.5}>
            <p className="text-xl text-muted-foreground text-balance mb-8 max-w-2xl mx-auto">
              Build ATS-optimized resumes, get instant scores, and connect with top companies worldwide including Google, Microsoft, Amazon, Apple, Meta, and startups. Join millions of successful job seekers globally.
            </p>
          </FloatingElement>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <motion.div
              whileHover={{ scale: 1.05, rotateY: 5 }}
              whileTap={{ scale: 0.95 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <Button size="lg" className="text-lg px-8 bg-gradient-to-r from-cyan-600 to-emerald-600 hover:from-cyan-700 hover:to-emerald-700 shadow-lg hover:shadow-xl transition-all duration-300" asChild>
                <Link href="/builder">
                  {t.home.startBuilding}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05, rotateY: -5 }}
              whileTap={{ scale: 0.95 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent border-2 border-cyan-200 hover:border-cyan-300 hover:bg-cyan-50 transition-all duration-300" asChild>
                <Link href="/ats-score">
                  {t.home.checkAtsScore}
                  <Target className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
        
        {/* 3D Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-cyan-400/20 to-emerald-400/20 rounded-full blur-xl"
            animate={{
              y: [0, -20, 0],
              rotate: [0, 180, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-lg blur-lg"
            animate={{
              y: [0, 20, 0],
              rotate: [0, -180, -360],
              scale: [1, 0.9, 1]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </section>

      {/* Enhanced Features Grid with 3D Cards */}
      <section className="py-16 px-4 bg-gradient-to-b from-muted/30 to-background relative">
        <div className="container mx-auto max-w-6xl">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-heading font-bold mb-4 bg-gradient-to-r from-cyan-600 to-emerald-600 bg-clip-text text-transparent">
              Everything You Need to Land Your Dream Job
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Our comprehensive platform helps you create, optimize, and perfect your resume for any job application.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <AnimatedCard delay={0.1}>
              <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-white to-cyan-50/50">
                <CardHeader>
                  <motion.div 
                    className="w-12 h-12 bg-gradient-to-br from-cyan-100 to-emerald-100 rounded-lg flex items-center justify-center mb-4"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <FileText className="w-6 h-6 text-cyan-600" />
                  </motion.div>
                  <CardTitle className="font-heading">{t.home.features.resumeBuilder.title}</CardTitle>
                  <CardDescription>{t.home.features.resumeBuilder.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {t.home.features.resumeBuilder.features.map((feature, index) => (
                      <motion.li 
                        key={index} 
                        className="flex items-center gap-2"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * index }}
                      >
                        <CheckCircle className="w-4 h-4 text-emerald-500" />
                        {feature}
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </AnimatedCard>

            <AnimatedCard delay={0.2}>
              <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-white to-emerald-50/50">
                <CardHeader>
                  <motion.div 
                    className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-lg flex items-center justify-center mb-4"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Target className="w-6 h-6 text-emerald-600" />
                  </motion.div>
                  <CardTitle className="font-heading">{t.home.features.atsScore.title}</CardTitle>
                  <CardDescription>{t.home.features.atsScore.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {t.home.features.atsScore.features.map((feature, index) => (
                      <motion.li 
                        key={index} 
                        className="flex items-center gap-2"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * index }}
                      >
                        <CheckCircle className="w-4 h-4 text-emerald-500" />
                        {feature}
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </AnimatedCard>

            <AnimatedCard delay={0.3}>
              <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-white to-purple-50/50">
                <CardHeader>
                  <motion.div 
                    className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg flex items-center justify-center mb-4"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Zap className="w-6 h-6 text-purple-600" />
                  </motion.div>
                  <CardTitle className="font-heading">{t.home.features.jobMatch.title}</CardTitle>
                  <CardDescription>{t.home.features.jobMatch.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {t.home.features.jobMatch.features.map((feature, index) => (
                      <motion.li 
                        key={index} 
                        className="flex items-center gap-2"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * index }}
                      >
                        <CheckCircle className="w-4 h-4 text-emerald-500" />
                        {feature}
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </AnimatedCard>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-cyan-50 to-emerald-50">
        <div className="container mx-auto max-w-6xl">
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {[
              { icon: Users, value: "50K+", label: "Active Users", color: "cyan" },
              { icon: FileText, value: "100K+", label: "Resumes Created", color: "emerald" },
              { icon: Target, value: "95%", label: "ATS Success Rate", color: "purple" },
              { icon: Award, value: "4.9/5", label: "User Rating", color: "orange" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05, rotateY: 5 }}
                transition={{ delay: index * 0.1 }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <motion.div
                  className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-${stat.color}-100 to-${stat.color}-200 flex items-center justify-center`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <stat.icon className={`w-8 h-8 text-${stat.color}-600`} />
                </motion.div>
                <motion.h3 
                  className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-emerald-600 bg-clip-text text-transparent"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                >
                  {stat.value}
                </motion.h3>
                <p className="text-muted-foreground font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6 bg-gradient-to-r from-cyan-600 to-emerald-600 bg-clip-text text-transparent">
              {t.home.cta.title}
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              {t.home.cta.description}
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button size="lg" className="text-lg px-8 bg-gradient-to-r from-cyan-600 to-emerald-600 hover:from-cyan-700 hover:to-emerald-700 shadow-lg hover:shadow-xl transition-all duration-300" asChild>
                <Link href="/builder">
                  {t.home.cta.button}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-1/2 left-1/4 w-40 h-40 bg-gradient-to-br from-cyan-400/10 to-emerald-400/10 rounded-full blur-2xl"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute top-1/3 right-1/4 w-32 h-32 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-lg blur-xl"
            animate={{
              scale: [1, 0.8, 1],
              rotate: [0, -180, -360]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </section>

      {/* Enhanced Features Showcase */}
      <section className="py-20 px-4 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Why Choose HireReady?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join thousands of job seekers who have successfully landed their dream jobs with our comprehensive platform.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-heading font-bold mb-2">100% Free</h3>
              <p className="text-muted-foreground">No hidden fees, no subscriptions. All features are completely free to use.</p>
            </motion.div>

            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-heading font-bold mb-2">Instant Results</h3>
              <p className="text-muted-foreground">Get ATS scores and job matches in seconds, not hours.</p>
            </motion.div>

            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-heading font-bold mb-2">Privacy First</h3>
              <p className="text-muted-foreground">Your data is secure and never shared with third parties.</p>
            </motion.div>
          </div>

          {/* Success Stories */}
          <motion.div
            className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl p-8 border border-primary/10"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl font-heading font-bold mb-2">Success Stories</h3>
              <p className="text-muted-foreground">Real results from real users</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">85%</div>
                <p className="text-sm text-muted-foreground">Average ATS Score Improvement</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">2M+</div>
                <p className="text-sm text-muted-foreground">Job Seekers Helped Globally</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">78%</div>
                <p className="text-sm text-muted-foreground">Success Rate Worldwide</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <motion.div
            className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/20 rounded-full blur-3xl"
            animate={{ 
              scale: [1, 1.2, 1], 
              rotate: [0, 180, 360],
              x: [0, 50, 0],
              y: [0, -30, 0]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-primary/20 rounded-lg blur-3xl"
            animate={{ 
              scale: [1, 0.8, 1], 
              rotate: [0, -180, -360],
              x: [0, -40, 0],
              y: [0, 20, 0]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Ready to Land Your Dream Job Worldwide? 🌍
            </h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join 2M+ job seekers worldwide who have successfully landed jobs at top companies like Google, Microsoft, Amazon, Apple, Meta, and startups globally with HireReady.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <Link href="/builder">
                  <FileText className="w-5 h-5 mr-2" />
                  Start Building Free
                </Link>
              </Button>
              <Button variant="outline" asChild size="lg" className="border-primary/20 hover:bg-primary/5 hover:border-primary/40 transition-all duration-300 transform hover:scale-105">
                <Link href="/ats-score">
                  <Target className="w-5 h-5 mr-2" />
                  Check ATS Score
                </Link>
              </Button>
              <Button variant="outline" asChild size="lg" className="border-primary/20 hover:bg-primary/5 hover:border-primary/40 transition-all duration-300 transform hover:scale-105">
                <Link href="/job-search">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Find Jobs
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="border-t border-border bg-gradient-to-b from-muted/30 to-muted/50 py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-2 mb-4">
                <motion.div 
                  className="w-6 h-6 bg-gradient-to-br from-cyan-500 to-emerald-500 rounded flex items-center justify-center"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <FileText className="w-4 h-4 text-white" />
                </motion.div>
                <span className="font-heading font-bold">HireReady</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Build ATS-optimized resumes and land your dream job with our free tools.
              </p>
            </motion.div>
            
            {[
              { title: "Product", links: [
                { name: t.nav.resumeBuilder, href: "/builder" },
                { name: t.nav.atsScore, href: "/ats-score" },
                { name: t.nav.jobMatch, href: "/job-match" }
              ]},
              { title: "Support", links: [
                { name: "Help Center", href: "/help" },
                { name: "Contact Us", href: "/contact" },
                { name: "Privacy Policy", href: "/privacy" }
              ]},
              { title: "Company", links: [
                { name: "About", href: "/about" },
                { name: "Blog", href: "/blog" },
                { name: "Careers", href: "/careers" }
              ]}
            ].map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="font-heading font-semibold mb-3">{section.title}</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {section.links.map((link, linkIndex) => (
                    <motion.li
                      key={linkIndex}
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Link href={link.href} className="hover:text-foreground transition-colors">
                        {link.name}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
          <motion.div 
            className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <p>&copy; 2024 HireReady. All rights reserved.</p>
          </motion.div>
        </div>
      </footer>
    </motion.div>
  )
}
