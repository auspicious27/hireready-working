"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Globe, Check, Languages } from "lucide-react"
import { useLanguage } from "./language-provider"
import type { Language } from "@/lib/i18n"

const languages = [
  { code: "en" as Language, name: "English", nativeName: "English", flag: "🇺🇸" },
  { code: "hi" as Language, name: "Hindi", nativeName: "हिंदी", flag: "🇮🇳" },
  { code: "mai" as Language, name: "Maithili", nativeName: "मैथिली", flag: "🇮🇳" },
  { code: "ta" as Language, name: "Tamil", nativeName: "தமிழ்", flag: "🇮🇳" },
  { code: "te" as Language, name: "Telugu", nativeName: "తెలుగు", flag: "🇮🇳" },
  { code: "kn" as Language, name: "Kannada", nativeName: "ಕನ್ನಡ", flag: "🇮🇳" },
  { code: "ml" as Language, name: "Malayalam", nativeName: "മലയാളം", flag: "🇮🇳" },
]

interface LanguageModalProps {
  trigger?: React.ReactNode
  title?: string
  description?: string
}

export function LanguageModal({ 
  trigger, 
  title = "Select Language", 
  description = "Choose your preferred language for the interface" 
}: LanguageModalProps) {
  const { language, setLanguage } = useLanguage()
  const [open, setOpen] = useState(false)

  const handleLanguageSelect = (langCode: Language) => {
    setLanguage(langCode)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" className="flex items-center gap-2">
            <Languages className="w-4 h-4" />
            Change Language
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5" />
            {title}
          </DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 py-4">
          {languages.map((lang) => (
            <Card 
              key={lang.code}
              className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                language === lang.code 
                  ? "ring-2 ring-primary bg-primary/5" 
                  : "hover:bg-muted/50"
              }`}
              onClick={() => handleLanguageSelect(lang.code)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{lang.flag}</span>
                    <div className="flex flex-col">
                      <span className="font-medium text-sm">{lang.nativeName}</span>
                      <span className="text-xs text-muted-foreground">{lang.name}</span>
                    </div>
                  </div>
                  {language === lang.code && (
                    <Check className="w-5 h-5 text-primary" />
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}

// Enhanced Language Selector with Modal Option
export function EnhancedLanguageSelector() {
  const { language, setLanguage } = useLanguage()
  const currentLanguage = languages.find((lang) => lang.code === language)

  return (
    <div className="flex items-center gap-2">
      {/* Quick Dropdown */}
      <div className="hidden md:block">
        <LanguageSelector />
      </div>
      
      {/* Mobile Modal Trigger */}
      <div className="md:hidden">
        <LanguageModal 
          trigger={
            <Button variant="ghost" size="sm" className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-muted-foreground" />
              <span className="font-medium text-sm">{currentLanguage?.nativeName}</span>
            </Button>
          }
        />
      </div>
    </div>
  )
}

// Import the original LanguageSelector for the dropdown
import { LanguageSelector } from "./language-selector"
