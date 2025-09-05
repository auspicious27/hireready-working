"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { type Language, type Translations, getTranslation } from "@/lib/i18n"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: Translations
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")
  const [translations, setTranslations] = useState<Translations>(getTranslation("en"))

  useEffect(() => {
    // Load saved language from localStorage
    const savedLanguage = localStorage.getItem("hireready-language") as Language
    if (savedLanguage && ["en", "hi", "mai", "ta", "te", "kn", "ml"].includes(savedLanguage)) {
      setLanguage(savedLanguage)
      setTranslations(getTranslation(savedLanguage))
    }
  }, [])

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang)
    setTranslations(getTranslation(lang))
    localStorage.setItem("hireready-language", lang)

    // Update document direction for RTL languages (if needed in future)
    document.documentElement.dir = lang === "hi" ? "ltr" : "ltr" // Both are LTR for now
  }

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage: handleLanguageChange,
        t: translations,
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
