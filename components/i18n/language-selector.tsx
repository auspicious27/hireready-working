"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Globe, Check } from "lucide-react"
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
        <Button variant="ghost" size="sm" className="flex items-center gap-2 hover:bg-muted/50 transition-colors">
          <Globe className="w-4 h-4 text-muted-foreground" />
          <span className="font-medium text-sm">{currentLanguage?.nativeName}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 p-2">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`flex items-center justify-between px-3 py-2 rounded-md cursor-pointer transition-colors ${
              language === lang.code 
                ? "bg-primary/10 text-primary font-medium" 
                : "hover:bg-muted/50"
            }`}
          >
            <div className="flex flex-col items-start">
              <span className="text-sm font-medium">{lang.nativeName}</span>
              <span className="text-xs text-muted-foreground">{lang.name}</span>
            </div>
            {language === lang.code && (
              <Check className="w-4 h-4 text-primary" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
