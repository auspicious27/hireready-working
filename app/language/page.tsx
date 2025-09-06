"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Globe, Check, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/components/i18n/language-provider"
import type { Language } from "@/lib/i18n"
import { motion } from "framer-motion"

const languages = [
  { code: "en" as Language, name: "English", nativeName: "English", flag: "🇺🇸", description: "English language interface" },
  { code: "hi" as Language, name: "Hindi", nativeName: "हिंदी", flag: "🇮🇳", description: "हिंदी भाषा इंटरफेस" },
  { code: "mai" as Language, name: "Maithili", nativeName: "मैथिली", flag: "🇮🇳", description: "मैथिली भाषा इंटरफेस" },
  { code: "ta" as Language, name: "Tamil", nativeName: "தமிழ்", flag: "🇮🇳", description: "தமிழ் மொழி இடைமுகம்" },
  { code: "te" as Language, name: "Telugu", nativeName: "తెలుగు", flag: "🇮🇳", description: "తెలుగు భాషా ఇంటర్ఫేస్" },
  { code: "kn" as Language, name: "Kannada", nativeName: "ಕನ್ನಡ", flag: "🇮🇳", description: "ಕನ್ನಡ ಭಾಷೆ ಇಂಟರ್ಫೇಸ್" },
  { code: "ml" as Language, name: "Malayalam", nativeName: "മലയാളം", flag: "🇮🇳", description: "മലയാളം ഭാഷാ ഇന്റർഫേസ്" },
]

export default function LanguagePage() {
  const { language, setLanguage } = useLanguage()

  const handleLanguageSelect = (langCode: Language) => {
    setLanguage(langCode)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/settings" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Settings
              </Link>
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Globe className="w-5 h-5 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-heading font-bold text-foreground">Language Settings</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          {/* Introduction */}
          <div className="text-center space-y-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto"
            >
              <Globe className="w-8 h-8 text-primary" />
            </motion.div>
            <h2 className="text-3xl font-heading font-bold">Choose Your Language</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Select your preferred language for the HireReady interface. You can change this anytime from your settings.
            </p>
          </div>

          {/* Language Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {languages.map((lang, index) => (
              <motion.div
                key={lang.code}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card 
                  className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 ${
                    language === lang.code 
                      ? "ring-2 ring-primary bg-primary/5 shadow-lg" 
                      : "hover:bg-muted/50"
                  }`}
                  onClick={() => handleLanguageSelect(lang.code)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{lang.flag}</span>
                        <div>
                          <CardTitle className="text-lg">{lang.nativeName}</CardTitle>
                          <CardDescription className="text-sm">{lang.name}</CardDescription>
                        </div>
                      </div>
                      {language === lang.code && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Check className="w-6 h-6 text-primary" />
                        </motion.div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground">{lang.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Current Selection Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="bg-muted/30 rounded-lg p-6 text-center"
          >
            <h3 className="font-semibold mb-2">Current Language</h3>
            <div className="flex items-center justify-center gap-3">
              <span className="text-2xl">
                {languages.find(lang => lang.code === language)?.flag}
              </span>
              <div>
                <p className="font-medium">
                  {languages.find(lang => lang.code === language)?.nativeName}
                </p>
                <p className="text-sm text-muted-foreground">
                  {languages.find(lang => lang.code === language)?.name}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="flex justify-center gap-4"
          >
            <Button variant="outline" asChild>
              <Link href="/settings">Back to Settings</Link>
            </Button>
            <Button asChild>
              <Link href="/dashboard">Continue</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
