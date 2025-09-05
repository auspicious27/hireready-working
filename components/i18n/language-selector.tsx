"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Globe } from "lucide-react"
import { useLanguage } from "./language-provider"
import type { Language } from "@/lib/i18n"

const languages = [
  { code: "en" as Language, name: "English", nativeName: "English" },
  { code: "hi" as Language, name: "Hindi", nativeName: "हिंदी" },
  { code: "mai" as Language, name: "Maithili", nativeName: "मैथिली" },
  { code: "ta" as Language, name: "Tamil", nativeName: "தமிழ்" },
  { code: "te" as Language, name: "Telugu", nativeName: "తెలుగు" },
  { code: "kn" as Language, name: "Kannada", nativeName: "ಕನ್ನಡ" },
  { code: "ml" as Language, name: "Malayalam", nativeName: "മലയാളം" },
]

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage()

  const currentLanguage = languages.find((lang) => lang.code === language)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center gap-2">
          <Globe className="w-4 h-4" />
          <span className="hidden sm:inline">{currentLanguage?.nativeName}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`flex items-center justify-between ${language === lang.code ? "bg-muted" : ""}`}
          >
            <span>{lang.nativeName}</span>
            <span className="text-xs text-muted-foreground ml-2">{lang.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
