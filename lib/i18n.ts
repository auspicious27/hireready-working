// Internationalization utilities and configuration

export type Language = "en" | "hi" | "mai" | "ta" | "te" | "kn" | "ml"

export interface Translations {
  // Navigation and Common
  nav: {
    home: string
    resumeBuilder: string
    atsScore: string
    jobMatch: string
    dashboard: string
    signIn: string
    signUp: string
    getStarted: string
  }

  // Home Page
  home: {
    title: string
    subtitle: string
    description: string
    startBuilding: string
    checkAtsScore: string
    features: {
      resumeBuilder: {
        title: string
        description: string
        features: string[]
      }
      atsScore: {
        title: string
        description: string
        features: string[]
      }
      jobMatch: {
        title: string
        description: string
        features: string[]
      }
    }
    cta: {
      title: string
      description: string
      button: string
    }
  }

  // Resume Builder
  resumeBuilder: {
    title: string
    sections: {
      upload: string
      personal: string
      summary: string
      experience: string
      education: string
      skills: string
      projects: string
      certifications: string
      export: string
    }
    progress: string
    save: string
    preview: string
    tips: {
      title: string
      items: string[]
    }
  }

  // ATS Scoring
  atsScore: {
    title: string
    description: string
    uploadResume: string
    selectResume: string
    analyze: string
    analyzing: string
    overallScore: string
    breakdown: {
      keywordMatch: string
      skillsCoverage: string
      experienceRelevance: string
      formatting: string
    }
    missingKeywords: string
    recommendations: string
  }

  // Job Matching
  jobMatch: {
    title: string
    description: string
    jobDescription: string
    pasteText: string
    uploadFile: string
    analyze: string
    analyzing: string
    matchScore: string
    verdict: {
      strongFit: string
      moderateFit: string
      lowFit: string
    }
    missingKeywords: string
    summaryRewrites: string
    bulletImprovements: string
    skillSuggestions: string
  }

  // Common UI Elements
  common: {
    loading: string
    error: string
    success: string
    cancel: string
    continue: string
    back: string
    next: string
    finish: string
    required: string
    optional: string
    download: string
    upload: string
    delete: string
    edit: string
    add: string
    remove: string
    search: string
    filter: string
    export: string
    import: string
  }
}

// English translations
export const enTranslations: Translations = {
  nav: {
    home: "Home",
    resumeBuilder: "Resume Builder",
    atsScore: "ATS Score",
    jobMatch: "Job Match",
    dashboard: "Dashboard",
    signIn: "Sign In",
    signUp: "Sign Up",
    getStarted: "Get Started",
  },

  home: {
    title: "Build ATS-Ready Resumes That Get You Hired",
    subtitle: "100% Free Resume Builder",
    description:
      "Create professional resumes, get instant ATS compatibility scores, and match your resume against job descriptions with actionable feedback.",
    startBuilding: "Start Building Free",
    checkAtsScore: "Check ATS Score",
    features: {
      resumeBuilder: {
        title: "Free Resume Builder",
        description: "Create professional resumes with our guided form and ATS-friendly templates",
        features: ["3 professional templates", "Live preview as you type", "Export to PDF & DOCX"],
      },
      atsScore: {
        title: "ATS Compatibility Score",
        description: "Get instant feedback on how well your resume performs with ATS systems",
        features: ["Keyword match analysis", "Skills coverage breakdown", "Formatting optimization"],
      },
      jobMatch: {
        title: "Job Description Matching",
        description: "Compare your resume against job postings and get actionable improvement suggestions",
        features: ["Best fit analysis", "Missing keywords detection", "Bullet point rewrites"],
      },
    },
    cta: {
      title: "Ready to Build Your Perfect Resume?",
      description: "Join thousands of job seekers who have improved their resume with HireReady's free tools.",
      button: "Start Building Now - It's Free",
    },
  },

  resumeBuilder: {
    title: "Resume Builder",
    sections: {
      upload: "Import Resume",
      personal: "Personal Info",
      summary: "Summary",
      experience: "Experience",
      education: "Education",
      skills: "Skills",
      projects: "Projects",
      certifications: "Certifications",
      export: "Export Resume",
    },
    progress: "Progress",
    save: "Save",
    preview: "Preview",
    tips: {
      title: "Tips",
      items: [
        "Use action verbs and quantify your achievements with numbers",
        "Keep bullet points concise and impactful",
        "Tailor your resume for each job application",
      ],
    },
  },

  atsScore: {
    title: "ATS Compatibility Score",
    description: "Upload your resume to get instant ATS compatibility analysis",
    uploadResume: "Upload Resume",
    selectResume: "Select Resume",
    analyze: "Analyze Resume",
    analyzing: "Analyzing Resume...",
    overallScore: "Overall ATS Score",
    breakdown: {
      keywordMatch: "Keyword Match",
      skillsCoverage: "Skills Coverage",
      experienceRelevance: "Experience Relevance",
      formatting: "Formatting Score",
    },
    missingKeywords: "Missing Keywords",
    recommendations: "Recommendations",
  },

  jobMatch: {
    title: "Job Description Matching",
    description: "Compare your resume against job postings and get actionable feedback",
    jobDescription: "Job Description",
    pasteText: "Paste Text",
    uploadFile: "Upload File",
    analyze: "Analyze Job Match",
    analyzing: "Analyzing Match...",
    matchScore: "Match Score",
    verdict: {
      strongFit: "Strong Fit",
      moderateFit: "Moderate Fit",
      lowFit: "Low Fit",
    },
    missingKeywords: "Missing Keywords & Skills",
    summaryRewrites: "Summary Rewrite Suggestions",
    bulletImprovements: "Experience Bullet Improvements",
    skillSuggestions: "Skills Section Optimization",
  },

  common: {
    loading: "Loading...",
    error: "Error",
    success: "Success",
    cancel: "Cancel",
    continue: "Continue",
    back: "Back",
    next: "Next",
    finish: "Finish",
    required: "Required",
    optional: "Optional",
    download: "Download",
    upload: "Upload",
    delete: "Delete",
    edit: "Edit",
    add: "Add",
    remove: "Remove",
    search: "Search",
    filter: "Filter",
    export: "Export",
    import: "Import",
  },
}

// Hindi translations
export const hiTranslations: Translations = {
  nav: {
    home: "होम",
    resumeBuilder: "रिज्यूमे बिल्डर",
    atsScore: "एटीएस स्कोर",
    jobMatch: "जॉब मैच",
    dashboard: "डैशबोर्ड",
    signIn: "साइन इन",
    signUp: "साइन अप",
    getStarted: "शुरू करें",
  },

  home: {
    title: "एटीएस-तैयार रिज्यूमे बनाएं जो आपको नौकरी दिलाए",
    subtitle: "100% मुफ्त रिज्यूमे बिल्डर",
    description:
      "पेशेवर रिज्यूमे बनाएं, तुरंत एटीएस संगतता स्कोर प्राप्त करें, और कार्यात्मक फीडबैक के साथ नौकरी विवरण के विरुद्ध अपने रिज्यूमे का मिलान करें।",
    startBuilding: "मुफ्त में बनाना शुरू करें",
    checkAtsScore: "एटीएस स्कोर जांचें",
    features: {
      resumeBuilder: {
        title: "मुफ्त रिज्यूमे बिल्डर",
        description: "हमारे गाइडेड फॉर्म और एटीएस-फ्रेंडली टेम्प्लेट्स के साथ पेशेवर रिज्यूमे बनाएं",
        features: ["3 पेशेवर टेम्प्लेट्स", "टाइप करते समय लाइव प्रीव्यू", "पीडीएफ और डॉक्स में एक्सपोर्ट"],
      },
      atsScore: {
        title: "एटीएस संगतता स्कोर",
        description: "एटीएस सिस्टम के साथ आपका रिज्यूमे कितना अच्छा प्रदर्शन करता है, इस पर तुरंत फीडबैक प्राप्त करें",
        features: ["कीवर्ड मैच विश्लेषण", "कौशल कवरेज ब्रेकडाउन", "फॉर्मेटिंग अनुकूलन"],
      },
      jobMatch: {
        title: "नौकरी विवरण मैचिंग",
        description: "नौकरी पोस्टिंग के विरुद्ध अपने रिज्यूमे की तुलना करें और कार्यात्मक सुधार सुझाव प्राप्त करें",
        features: ["सर्वोत्तम फिट विश्लेषण", "गुम कीवर्ड का पता लगाना", "बुलेट पॉइंट रीराइट"],
      },
    },
    cta: {
      title: "अपना परफेक्ट रिज्यूमे बनाने के लिए तैयार हैं?",
      description: "हजारों नौकरी चाहने वालों में शामिल हों जिन्होंने HireReady के मुफ्त टूल्स से अपना रिज्यूमे सुधारा है।",
      button: "अभी बनाना शुरू करें - यह मुफ्त है",
    },
  },

  resumeBuilder: {
    title: "रिज्यूमे बिल्डर",
    sections: {
      upload: "रिज्यूमे आयात करें",
      personal: "व्यक्तिगत जानकारी",
      summary: "सारांश",
      experience: "अनुभव",
      education: "शिक्षा",
      skills: "कौशल",
      projects: "प्रोजेक्ट्स",
      certifications: "प्रमाणपत्र",
      export: "रिज्यूमे एक्सपोर्ट करें",
    },
    progress: "प्रगति",
    save: "सेव करें",
    preview: "प्रीव्यू",
    tips: {
      title: "सुझाव",
      items: [
        "एक्शन वर्ब्स का उपयोग करें और अपनी उपलब्धियों को संख्याओं के साथ मापें",
        "बुलेट पॉइंट्स को संक्षिप्त और प्रभावशाली रखें",
        "प्रत्येक नौकरी आवेदन के लिए अपने रिज्यूमे को तैयार करें",
      ],
    },
  },

  atsScore: {
    title: "एटीएस संगतता स्कोर",
    description: "तुरंत एटीएस संगतता विश्लेषण प्राप्त करने के लिए अपना रिज्यूमे अपलोड करें",
    uploadResume: "रिज्यूमे अपलोड करें",
    selectResume: "रिज्यूमे चुनें",
    analyze: "रिज्यूमे का विश्लेषण करें",
    analyzing: "रिज्यूमे का विश्लेषण कर रहे हैं...",
    overallScore: "समग्र एटीएस स्कोर",
    breakdown: {
      keywordMatch: "कीवर्ड मैच",
      skillsCoverage: "कौशल कवरेज",
      experienceRelevance: "अनुभव प्रासंगिकता",
      formatting: "फॉर्मेटिंग स्कोर",
    },
    missingKeywords: "गुम कीवर्ड्स",
    recommendations: "सिफारिशें",
  },

  jobMatch: {
    title: "नौकरी विवरण मैचिंग",
    description: "नौकरी पोस्टिंग के विरुद्ध अपने रिज्यूमे की तुलना करें और कार्यात्मक फीडबैक प्राप्त करें",
    jobDescription: "नौकरी विवरण",
    pasteText: "टेक्स्ट पेस्ट करें",
    uploadFile: "फाइल अपलोड करें",
    analyze: "जॉब मैच का विश्लेषण करें",
    analyzing: "मैच का विश्लेषण कर रहे हैं...",
    matchScore: "मैच स्कोर",
    verdict: {
      strongFit: "मजबूत फिट",
      moderateFit: "मध्यम फिट",
      lowFit: "कम फिट",
    },
    missingKeywords: "गुम कीवर्ड्स और कौशल",
    summaryRewrites: "सारांश रीराइट सुझाव",
    bulletImprovements: "अनुभव बुलेट सुधार",
    skillSuggestions: "कौशल अनुभाग अनुकूलन",
  },

  common: {
    loading: "लोड हो रहा है...",
    error: "त्रुटि",
    success: "सफलता",
    cancel: "रद्द करें",
    continue: "जारी रखें",
    back: "वापस",
    next: "अगला",
    finish: "समाप्त",
    required: "आवश्यक",
    optional: "वैकल्पिक",
    download: "डाउनलोड",
    upload: "अपलोड",
    delete: "हटाएं",
    edit: "संपादित करें",
    add: "जोड़ें",
    remove: "हटाएं",
    search: "खोजें",
    filter: "फिल्टर",
    export: "एक्सपोर्ट",
    import: "आयात",
  },
}

// Maithili translations
export const maiTranslations: Translations = {
  nav: {
    home: "घर",
    resumeBuilder: "रिज्यूमे बनाउ",
    atsScore: "एटीएस स्कोर",
    jobMatch: "नोकरी मिलाउ",
    dashboard: "डैशबोर्ड",
    signIn: "साइन इन",
    signUp: "साइन अप",
    getStarted: "शुरू करू",
  },
  home: {
    title: "एटीएस-तैयार रिज्यूमे बनाउ जे आपनके नोकरी देव",
    subtitle: "100% मुफ्त रिज्यूमे बिल्डर",
    description: "पेशेवर रिज्यूमे बनाउ, तुरंत एटीएस संगतता स्कोर पाउ, आ नोकरी विवरण के साथ अपन रिज्यूमे के मिलान करू।",
    startBuilding: "मुफ्त में बनाउ शुरू करू",
    checkAtsScore: "एटीएस स्कोर जांचू",
    features: {
      resumeBuilder: {
        title: "मुफ्त रिज्यूमे बिल्डर",
        description: "हमार गाइडेड फॉर्म आ एटीएस-फ्रेंडली टेम्प्लेट्स के साथ पेशेवर रिज्यूमे बनाउ",
        features: ["3 पेशेवर टेम्प्लेट्स", "टाइप करते समय लाइव प्रीव्यू", "पीडीएफ आ डॉक्स में एक्सपोर्ट"],
      },
      atsScore: {
        title: "एटीएस संगतता स्कोर",
        description: "एटीएस सिस्टम के साथ आपन रिज्यूमे कतेक अच्छा प्रदर्शन करै छै, ओकरा पर तुरंत फीडबैक पाउ",
        features: ["कीवर्ड मैच विश्लेषण", "कौशल कवरेज ब्रेकडाउन", "फॉर्मेटिंग अनुकूलन"],
      },
      jobMatch: {
        title: "नोकरी विवरण मैचिंग",
        description: "नोकरी पोस्टिंग के विरुद्ध अपन रिज्यूमे के तुलना करू आ कार्यात्मक सुधार सुझाव पाउ",
        features: ["सर्वोत्तम फिट विश्लेषण", "गुम कीवर्ड के पता लगाउ", "बुलेट पॉइंट रीराइट"],
      },
    },
    cta: {
      title: "अपन परफेक्ट रिज्यूमे बनाए के लेल तैयार छी?",
      description: "हजारों नोकरी चाहने वाला लोग के साथ जुड़ू जिनके HireReady के मुफ्त टूल्स से अपन रिज्यूमे सुधारलक।",
      button: "अभी बनाउ शुरू करू - ई मुफ्त छै",
    },
  },
  resumeBuilder: {
    title: "रिज्यूमे बिल्डर",
    sections: {
      upload: "रिज्यूमे आयात करू",
      personal: "व्यक्तिगत जानकारी",
      summary: "सारांश",
      experience: "अनुभव",
      education: "शिक्षा",
      skills: "कौशल",
      projects: "प्रोजेक्ट्स",
      certifications: "प्रमाणपत्र",
      export: "रिज्यूमे एक्सपोर्ट करू",
    },
    progress: "प्रगति",
    save: "सेव करू",
    preview: "प्रीव्यू",
    tips: {
      title: "सुझाव",
      items: [
        "एक्शन वर्ब्स के उपयोग करू आ अपन उपलब्धि के संख्या के साथ मापू",
        "बुलेट पॉइंट्स के संक्षिप्त आ प्रभावशाली रखू",
        "प्रत्येक नोकरी आवेदन के लेल अपन रिज्यूमे के तैयार करू",
      ],
    },
  },
  atsScore: {
    title: "एटीएस संगतता स्कोर",
    description: "तुरंत एटीएस संगतता विश्लेषण पाए के लेल अपन रिज्यूमे अपलोड करू",
    uploadResume: "रिज्यूमे अपलोड करू",
    selectResume: "रिज्यूमे चुनू",
    analyze: "रिज्यूमे के विश्लेषण करू",
    analyzing: "रिज्यूमे के विश्लेषण कर रहल छी...",
    overallScore: "समग्र एटीएस स्कोर",
    breakdown: {
      keywordMatch: "कीवर्ड मैच",
      skillsCoverage: "कौशल कवरेज",
      experienceRelevance: "अनुभव प्रासंगिकता",
      formatting: "फॉर्मेटिंग स्कोर",
    },
    missingKeywords: "गुम कीवर्ड्स",
    recommendations: "सिफारिश",
  },
  jobMatch: {
    title: "नोकरी विवरण मैचिंग",
    description: "नोकरी पोस्टिंग के विरुद्ध अपन रिज्यूमे के तुलना करू आ कार्यात्मक फीडबैक पाउ",
    jobDescription: "नोकरी विवरण",
    pasteText: "टेक्स्ट पेस्ट करू",
    uploadFile: "फाइल अपलोड करू",
    analyze: "नोकरी मैच के विश्लेषण करू",
    analyzing: "मैच के विश्लेषण कर रहल छी...",
    matchScore: "मैच स्कोर",
    verdict: {
      strongFit: "मजबूत फिट",
      moderateFit: "मध्यम फिट",
      lowFit: "कम फिट",
    },
    missingKeywords: "गुम कीवर्ड्स आ कौशल",
    summaryRewrites: "सारांश रीराइट सुझाव",
    bulletImprovements: "अनुभव बुलेट सुधार",
    skillSuggestions: "कौशल अनुभाग अनुकूलन",
  },
  common: {
    loading: "लोड हो रहल छै...",
    error: "त्रुटि",
    success: "सफलता",
    cancel: "रद्द करू",
    continue: "जारी रखू",
    back: "वापस",
    next: "अगिला",
    finish: "समाप्त",
    required: "आवश्यक",
    optional: "वैकल्पिक",
    download: "डाउनलोड",
    upload: "अपलोड",
    delete: "हटाउ",
    edit: "संपादित करू",
    add: "जोड़ू",
    remove: "हटाउ",
    search: "खोजू",
    filter: "फिल्टर",
    export: "एक्सपोर्ट",
    import: "आयात",
  },
}

// Tamil translations
export const taTranslations: Translations = {
  nav: {
    home: "வீடு",
    resumeBuilder: "ரெஸ்யூம் பில்டர்",
    atsScore: "ATS ஸ்கோர்",
    jobMatch: "வேலை பொருத்தம்",
    dashboard: "டாஷ்போர்டு",
    signIn: "உள்நுழை",
    signUp: "பதிவு செய்",
    getStarted: "தொடங்கு",
  },
  home: {
    title: "உங்களுக்கு வேலை தரும் ATS-தயார் ரெஸ்யூம்களை உருவாக்குங்கள்",
    subtitle: "100% இலவச ரெஸ்யூம் பில்டர்",
    description: "தொழில்முறை ரெஸ்யூம்களை உருவாக்குங்கள், உடனடி ATS பொருத்தப்பாட்டு மதிப்பெண்களைப் பெறுங்கள், மற்றும் வேலை விளக்கங்களுக்கு எதிராக உங்கள் ரெஸ்யூமை பொருத்துங்கள்.",
    startBuilding: "இலவசமாக உருவாக்கத் தொடங்குங்கள்",
    checkAtsScore: "ATS ஸ்கோரை சரிபார்க்கவும்",
    features: {
      resumeBuilder: {
        title: "இலவச ரெஸ்யூம் பில்டர்",
        description: "எங்கள் வழிகாட்டப்பட்ட படிவம் மற்றும் ATS-நட்பு வார்ப்புருக்களுடன் தொழில்முறை ரெஸ்யூம்களை உருவாக்குங்கள்",
        features: ["3 தொழில்முறை வார்ப்புருக்கள்", "நீங்கள் தட்டச்சு செய்யும்போது நேரடி முன்னோட்டம்", "PDF மற்றும் DOCX க்கு ஏற்றுமதி"],
      },
      atsScore: {
        title: "ATS பொருத்தப்பாட்டு மதிப்பெண்",
        description: "ATS அமைப்புகளுடன் உங்கள் ரெஸ்யூம் எவ்வளவு நன்றாக செயல்படுகிறது என்பதற்கான உடனடி கருத்தைப் பெறுங்கள்",
        features: ["முக்கிய சொல் பொருத்தம் பகுப்பாய்வு", "திறமைகள் உள்ளடக்கம் பிரித்தல்", "வடிவமைப்பு மேம்படுத்தல்"],
      },
      jobMatch: {
        title: "வேலை விளக்கம் பொருத்தம்",
        description: "வேலை விளம்பரங்களுக்கு எதிராக உங்கள் ரெஸ்யூமை ஒப்பிடுங்கள் மற்றும் செயல்படக்கூடிய மேம்பாட்டு பரிந்துரைகளைப் பெறுங்கள்",
        features: ["சிறந்த பொருத்தம் பகுப்பாய்வு", "காணாமல் போன முக்கிய சொற்களைக் கண்டறிதல்", "புல்லட் பாயிண்ட் மறுவரைவு"],
      },
    },
    cta: {
      title: "உங்கள் சரியான ரெஸ்யூமை உருவாக்க தயாரா?",
      description: "HireReady இன் இலவச கருவிகளால் தங்கள் ரெஸ்யூமை மேம்படுத்திய ஆயிரக்கணக்கான வேலை தேடுபவர்களுடன் சேர்ந்து கொள்ளுங்கள்.",
      button: "இப்போது உருவாக்கத் தொடங்குங்கள் - இது இலவசம்",
    },
  },
  resumeBuilder: {
    title: "ரெஸ்யூம் பில்டர்",
    sections: {
      upload: "ரெஸ்யூமை இறக்குமதி செய்",
      personal: "தனிப்பட்ட தகவல்",
      summary: "சுருக்கம்",
      experience: "அனுபவம்",
      education: "கல்வி",
      skills: "திறமைகள்",
      projects: "திட்டங்கள்",
      certifications: "சான்றிதழ்கள்",
      export: "ரெஸ்யூமை ஏற்றுமதி செய்",
    },
    progress: "முன்னேற்றம்",
    save: "சேமி",
    preview: "முன்னோட்டம்",
    tips: {
      title: "உதவிக்குறிப்புகள்",
      items: [
        "செயல் வினைச்சொற்களைப் பயன்படுத்துங்கள் மற்றும் எண்களுடன் உங்கள் சாதனைகளை அளவிடுங்கள்",
        "புல்லட் பாயிண்டுகளை சுருக்கமாகவும் தாக்கமுள்ளதாகவும் வைத்திருங்கள்",
        "ஒவ்வொரு வேலை விண்ணப்பத்திற்கும் உங்கள் ரெஸ்யூமை தனிப்பயனாக்குங்கள்",
      ],
    },
  },
  atsScore: {
    title: "ATS பொருத்தப்பாட்டு மதிப்பெண்",
    description: "உடனடி ATS பொருத்தப்பாட்டு பகுப்பாய்வைப் பெற உங்கள் ரெஸ்யூமை பதிவேற்றுங்கள்",
    uploadResume: "ரெஸ்யூமை பதிவேற்று",
    selectResume: "ரெஸ்யூமை தேர்ந்தெடு",
    analyze: "ரெஸ்யூமை பகுப்பாய்வு செய்",
    analyzing: "ரெஸ்யூமை பகுப்பாய்வு செய்கிறது...",
    overallScore: "மொத்த ATS மதிப்பெண்",
    breakdown: {
      keywordMatch: "முக்கிய சொல் பொருத்தம்",
      skillsCoverage: "திறமைகள் உள்ளடக்கம்",
      experienceRelevance: "அனுபவம் பொருத்தம்",
      formatting: "வடிவமைப்பு மதிப்பெண்",
    },
    missingKeywords: "காணாமல் போன முக்கிய சொற்கள்",
    recommendations: "பரிந்துரைகள்",
  },
  jobMatch: {
    title: "வேலை விளக்கம் பொருத்தம்",
    description: "வேலை விளம்பரங்களுக்கு எதிராக உங்கள் ரெஸ்யூமை ஒப்பிடுங்கள் மற்றும் செயல்படக்கூடிய கருத்தைப் பெறுங்கள்",
    jobDescription: "வேலை விளக்கம்",
    pasteText: "உரையை ஒட்டு",
    uploadFile: "கோப்பை பதிவேற்று",
    analyze: "வேலை பொருத்தத்தை பகுப்பாய்வு செய்",
    analyzing: "பொருத்தத்தை பகுப்பாய்வு செய்கிறது...",
    matchScore: "பொருத்த மதிப்பெண்",
    verdict: {
      strongFit: "வலுவான பொருத்தம்",
      moderateFit: "மிதமான பொருத்தம்",
      lowFit: "குறைந்த பொருத்தம்",
    },
    missingKeywords: "காணாமல் போன முக்கிய சொற்கள் மற்றும் திறமைகள்",
    summaryRewrites: "சுருக்க மறுவரைவு பரிந்துரைகள்",
    bulletImprovements: "அனுபவ புல்லட் மேம்பாடுகள்",
    skillSuggestions: "திறமைகள் பிரிவு மேம்படுத்தல்",
  },
  common: {
    loading: "ஏற்றுகிறது...",
    error: "பிழை",
    success: "வெற்றி",
    cancel: "ரத்து செய்",
    continue: "தொடர்",
    back: "பின்",
    next: "அடுத்து",
    finish: "முடி",
    required: "தேவை",
    optional: "விருப்பமானது",
    download: "பதிவிறக்கு",
    upload: "பதிவேற்று",
    delete: "நீக்கு",
    edit: "திருத்து",
    add: "சேர்",
    remove: "அகற்று",
    search: "தேடு",
    filter: "வடிகட்டி",
    export: "ஏற்றுமதி",
    import: "இறக்குமதி",
  },
}

// Telugu translations
export const teTranslations: Translations = {
  nav: {
    home: "హోమ్",
    resumeBuilder: "రెజ్యూమ్ బిల్డర్",
    atsScore: "ATS స్కోర్",
    jobMatch: "ఉద్యోగ మ్యాచ్",
    dashboard: "డాష్‌బోర్డ్",
    signIn: "సైన్ ఇన్",
    signUp: "సైన్ అప్",
    getStarted: "ప్రారంభించండి",
  },
  home: {
    title: "మీకు ఉద్యోగం ఇచ్చే ATS-రెడీ రెజ్యూమ్‌లను సృష్టించండి",
    subtitle: "100% ఉచిత రెజ్యూమ్ బిల్డర్",
    description: "వృత్తిపరమైన రెజ్యూమ్‌లను సృష్టించండి, తక్షణ ATS అనుకూలత స్కోర్‌లను పొందండి, మరియు ఉద్యోగ వివరణలకు వ్యతిరేకంగా మీ రెజ్యూమ్‌ను మ్యాచ్ చేయండి.",
    startBuilding: "ఉచితంగా నిర్మించడం ప్రారంభించండి",
    checkAtsScore: "ATS స్కోర్‌ను తనిఖీ చేయండి",
    features: {
      resumeBuilder: {
        title: "ఉచిత రెజ్యూమ్ బిల్డర్",
        description: "మా గైడెడ్ ఫారమ్ మరియు ATS-ఫ్రెండ్లీ టెంప్‌లేట్‌లతో వృత్తిపరమైన రెజ్యూమ్‌లను సృష్టించండి",
        features: ["3 వృత్తిపరమైన టెంప్‌లేట్‌లు", "మీరు టైప్ చేస్తున్నప్పుడు లైవ్ ప్రివ్యూ", "PDF మరియు DOCX కు ఎక్స్‌పోర్ట్"],
      },
      atsScore: {
        title: "ATS అనుకూలత స్కోర్",
        description: "ATS వ్యవస్థలతో మీ రెజ్యూమ్ ఎంత బాగా పనిచేస్తుందో దానిపై తక్షణ ఫీడ్‌బ్యాక్ పొందండి",
        features: ["కీవర్డ్ మ్యాచ్ విశ్లేషణ", "స్కిల్‌ల కవరేజ్ బ్రేక్‌డౌన్", "ఫార్మాట్‌టింగ్ ఆప్టిమైజేషన్"],
      },
      jobMatch: {
        title: "ఉద్యోగ వివరణ మ్యాచింగ్",
        description: "ఉద్యోగ పోస్టింగ్‌లకు వ్యతిరేకంగా మీ రెజ్యూమ్‌ను పోల్చండి మరియు చర్యాత్మక మెరుగుదల సూచనలను పొందండి",
        features: ["ఉత్తమ ఫిట్ విశ్లేషణ", "తప్పిపోయిన కీవర్డ్‌లను గుర్తించడం", "బుల్లెట్ పాయింట్ రీరైట్‌లు"],
      },
    },
    cta: {
      title: "మీ పర్ఫెక్ట్ రెజ్యూమ్‌ను సృష్టించడానికి సిద్ధమా?",
      description: "HireReady యొక్క ఉచిత సాధనాలతో తమ రెజ్యూమ్‌లను మెరుగుపరచిన వేలాది ఉద్యోగ అన్వేషకులతో చేరండి.",
      button: "ఇప్పుడు నిర్మించడం ప్రారంభించండి - ఇది ఉచితం",
    },
  },
  resumeBuilder: {
    title: "రెజ్యూమ్ బిల్డర్",
    sections: {
      upload: "రెజ్యూమ్‌ను ఇంపోర్ట్ చేయండి",
      personal: "వ్యక్తిగత సమాచారం",
      summary: "సారాంశం",
      experience: "అనుభవం",
      education: "విద్య",
      skills: "స్కిల్‌లు",
      projects: "ప్రాజెక్ట్‌లు",
      certifications: "సర్టిఫికేట్‌లు",
      export: "రెజ్యూమ్‌ను ఎక్స్‌పోర్ట్ చేయండి",
    },
    progress: "ప్రగతి",
    save: "సేవ్ చేయండి",
    preview: "ప్రివ్యూ",
    tips: {
      title: "చిట్కాలు",
      items: [
        "ఆక్షన్ వెర్బ్‌లను ఉపయోగించండి మరియు సంఖ్యలతో మీ విజయాలను కొలవండి",
        "బుల్లెట్ పాయింట్‌లను సంక్షిప్తంగా మరియు ప్రభావవంతంగా ఉంచండి",
        "ప్రతి ఉద్యోగ అప్లికేషన్ కోసం మీ రెజ్యూమ్‌ను కస్టమైజ్ చేయండి",
      ],
    },
  },
  atsScore: {
    title: "ATS అనుకూలత స్కోర్",
    description: "తక్షణ ATS అనుకూలత విశ్లేషణను పొందడానికి మీ రెజ్యూమ్‌ను అప్‌లోడ్ చేయండి",
    uploadResume: "రెజ్యూమ్‌ను అప్‌లోడ్ చేయండి",
    selectResume: "రెజ్యూమ్‌ను ఎంచుకోండి",
    analyze: "రెజ్యూమ్‌ను విశ్లేషించండి",
    analyzing: "రెజ్యూమ్‌ను విశ్లేషిస్తోంది...",
    overallScore: "మొత్తం ATS స్కోర్",
    breakdown: {
      keywordMatch: "కీవర్డ్ మ్యాచ్",
      skillsCoverage: "స్కిల్‌ల కవరేజ్",
      experienceRelevance: "అనుభవం సంబంధం",
      formatting: "ఫార్మాట్‌టింగ్ స్కోర్",
    },
    missingKeywords: "తప్పిపోయిన కీవర్డ్‌లు",
    recommendations: "సిఫార్సులు",
  },
  jobMatch: {
    title: "ఉద్యోగ వివరణ మ్యాచింగ్",
    description: "ఉద్యోగ పోస్టింగ్‌లకు వ్యతిరేకంగా మీ రెజ్యూమ్‌ను పోల్చండి మరియు చర్యాత్మక ఫీడ్‌బ్యాక్ పొందండి",
    jobDescription: "ఉద్యోగ వివరణ",
    pasteText: "టెక్స్ట్‌ను పేస్ట్ చేయండి",
    uploadFile: "ఫైల్‌ను అప్‌లోడ్ చేయండి",
    analyze: "ఉద్యోగ మ్యాచ్‌ను విశ్లేషించండి",
    analyzing: "మ్యాచ్‌ను విశ్లేషిస్తోంది...",
    matchScore: "మ్యాచ్ స్కోర్",
    verdict: {
      strongFit: "బలమైన ఫిట్",
      moderateFit: "మితమైన ఫిట్",
      lowFit: "తక్కువ ఫిట్",
    },
    missingKeywords: "తప్పిపోయిన కీవర్డ్‌లు మరియు స్కిల్‌లు",
    summaryRewrites: "సారాంశ రీరైట్ సూచనలు",
    bulletImprovements: "అనుభవ బుల్లెట్ మెరుగుదలలు",
    skillSuggestions: "స్కిల్‌ల సెక్షన్ ఆప్టిమైజేషన్",
  },
  common: {
    loading: "లోడ్ అవుతోంది...",
    error: "లోపం",
    success: "విజయం",
    cancel: "రద్దు చేయండి",
    continue: "కొనసాగించండి",
    back: "వెనుకకు",
    next: "తదుపరి",
    finish: "ముగించండి",
    required: "అవసరం",
    optional: "ఐచ్ఛికం",
    download: "డౌన్‌లోడ్",
    upload: "అప్‌లోడ్",
    delete: "తొలగించండి",
    edit: "సవరించండి",
    add: "జోడించండి",
    remove: "తొలగించండి",
    search: "వెతకండి",
    filter: "ఫిల్టర్",
    export: "ఎక్స్‌పోర్ట్",
    import: "ఇంపోర్ట్",
  },
}

// Kannada translations
export const knTranslations: Translations = {
  nav: {
    home: "ಮನೆ",
    resumeBuilder: "ರೆಸ್ಯೂಮ್ ಬಿಲ್ಡರ್",
    atsScore: "ATS ಸ್ಕೋರ್",
    jobMatch: "ಉದ್ಯೋಗ ಹೊಂದಾಣಿಕೆ",
    dashboard: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
    signIn: "ಸೈನ್ ಇನ್",
    signUp: "ಸೈನ್ ಅಪ್",
    getStarted: "ಪ್ರಾರಂಭಿಸಿ",
  },
  home: {
    title: "ನಿಮಗೆ ಉದ್ಯೋಗ ನೀಡುವ ATS-ಸಿದ್ಧ ರೆಸ್ಯೂಮ್‌ಗಳನ್ನು ರಚಿಸಿ",
    subtitle: "100% ಉಚಿತ ರೆಸ್ಯೂಮ್ ಬಿಲ್ಡರ್",
    description: "ವೃತ್ತಿಪರ ರೆಸ್ಯೂಮ್‌ಗಳನ್ನು ರಚಿಸಿ, ತಕ್ಷಣ ATS ಹೊಂದಾಣಿಕೆ ಸ್ಕೋರ್‌ಗಳನ್ನು ಪಡೆಯಿರಿ, ಮತ್ತು ಉದ್ಯೋಗ ವಿವರಣೆಗಳ ವಿರುದ್ಧ ನಿಮ್ಮ ರೆಸ್ಯೂಮ್‌ನ್ನು ಹೊಂದಿಸಿ.",
    startBuilding: "ಉಚಿತವಾಗಿ ನಿರ್ಮಿಸಲು ಪ್ರಾರಂಭಿಸಿ",
    checkAtsScore: "ATS ಸ್ಕೋರ್ ಅನ್ನು ಪರಿಶೀಲಿಸಿ",
    features: {
      resumeBuilder: {
        title: "ಉಚಿತ ರೆಸ್ಯೂಮ್ ಬಿಲ್ಡರ್",
        description: "ನಮ್ಮ ಮಾರ್ಗದರ್ಶಿತ ಫಾರ್ಮ್ ಮತ್ತು ATS-ಸ್ನೇಹಿ ಟೆಂಪ್ಲೇಟ್‌ಗಳೊಂದಿಗೆ ವೃತ್ತಿಪರ ರೆಸ್ಯೂಮ್‌ಗಳನ್ನು ರಚಿಸಿ",
        features: ["3 ವೃತ್ತಿಪರ ಟೆಂಪ್ಲೇಟ್‌ಗಳು", "ನೀವು ಟೈಪ್ ಮಾಡುವಾಗ ಲೈವ್ ಪೂರ್ವವೀಕ್ಷಣೆ", "PDF ಮತ್ತು DOCX ಗೆ ರಫ್ತು"],
      },
      atsScore: {
        title: "ATS ಹೊಂದಾಣಿಕೆ ಸ್ಕೋರ್",
        description: "ATS ವ್ಯವಸ್ಥೆಗಳೊಂದಿಗೆ ನಿಮ್ಮ ರೆಸ್ಯೂಮ್ ಎಷ್ಟು ಚೆನ್ನಾಗಿ ಕೆಲಸ ಮಾಡುತ್ತದೆ ಎಂಬುದರ ಬಗ್ಗೆ ತಕ್ಷಣ ಪ್ರತಿಕ್ರಿಯೆಯನ್ನು ಪಡೆಯಿರಿ",
        features: ["ಕೀವರ್ಡ್ ಹೊಂದಾಣಿಕೆ ವಿಶ್ಲೇಷಣೆ", "ಕೌಶಲ್ಯಗಳ ಕವರೇಜ್ ವಿಭಜನೆ", "ಫಾರ್ಮ್ಯಾಟಿಂಗ್ ಅತ್ಯುತ್ತಮೀಕರಣ"],
      },
      jobMatch: {
        title: "ಉದ್ಯೋಗ ವಿವರಣೆ ಹೊಂದಾಣಿಕೆ",
        description: "ಉದ್ಯೋಗ ಪೋಸ್ಟಿಂಗ್‌ಗಳ ವಿರುದ್ಧ ನಿಮ್ಮ ರೆಸ್ಯೂಮ್‌ನ್ನು ಹೋಲಿಸಿ ಮತ್ತು ಕ್ರಿಯಾತ್ಮಕ ಸುಧಾರಣೆ ಸಲಹೆಗಳನ್ನು ಪಡೆಯಿರಿ",
        features: ["ಉತ್ತಮ ಹೊಂದಾಣಿಕೆ ವಿಶ್ಲೇಷಣೆ", "ಕಾಣೆಯಾದ ಕೀವರ್ಡ್‌ಗಳನ್ನು ಗುರುತಿಸುವುದು", "ಬುಲೆಟ್ ಪಾಯಿಂಟ್ ಮರುಬರಹಗಳು"],
      },
    },
    cta: {
      title: "ನಿಮ್ಮ ಪರಿಪೂರ್ಣ ರೆಸ್ಯೂಮ್ ರಚಿಸಲು ಸಿದ್ಧರಾ?",
      description: "HireReady ನ ಉಚಿತ ಸಾಧನಗಳೊಂದಿಗೆ ತಮ್ಮ ರೆಸ್ಯೂಮ್‌ಗಳನ್ನು ಸುಧಾರಿಸಿದ ಸಾವಿರಾರು ಉದ್ಯೋಗ ಅನ್ವೇಷಕರೊಂದಿಗೆ ಸೇರಿಕೊಳ್ಳಿ.",
      button: "ಈಗ ನಿರ್ಮಿಸಲು ಪ್ರಾರಂಭಿಸಿ - ಇದು ಉಚಿತ",
    },
  },
  resumeBuilder: {
    title: "ರೆಸ್ಯೂಮ್ ಬಿಲ್ಡರ್",
    sections: {
      upload: "ರೆಸ್ಯೂಮ್ ಅನ್ನು ಆಮದು ಮಾಡಿ",
      personal: "ವೈಯಕ್ತಿಕ ಮಾಹಿತಿ",
      summary: "ಸಾರಾಂಶ",
      experience: "ಅನುಭವ",
      education: "ಶಿಕ್ಷಣ",
      skills: "ಕೌಶಲ್ಯಗಳು",
      projects: "ಯೋಜನೆಗಳು",
      certifications: "ಪ್ರಮಾಣಪತ್ರಗಳು",
      export: "ರೆಸ್ಯೂಮ್ ಅನ್ನು ರಫ್ತು ಮಾಡಿ",
    },
    progress: "ಪ್ರಗತಿ",
    save: "ಉಳಿಸಿ",
    preview: "ಪೂರ್ವವೀಕ್ಷಣೆ",
    tips: {
      title: "ಸಲಹೆಗಳು",
      items: [
        "ಆಕ್ಷನ್ ಕ್ರಿಯಾಪದಗಳನ್ನು ಬಳಸಿ ಮತ್ತು ಸಂಖ್ಯೆಗಳೊಂದಿಗೆ ನಿಮ್ಮ ಸಾಧನೆಗಳನ್ನು ಅಳೆಯಿರಿ",
        "ಬುಲೆಟ್ ಪಾಯಿಂಟ್‌ಗಳನ್ನು ಸಂಕ್ಷಿಪ್ತವಾಗಿ ಮತ್ತು ಪ್ರಭಾವಶಾಲಿಯಾಗಿ ಇರಿಸಿ",
        "ಪ್ರತಿ ಉದ್ಯೋಗ ಅರ್ಜಿಗೆ ನಿಮ್ಮ ರೆಸ್ಯೂಮ್ ಅನ್ನು ಕಸ್ಟಮೈಜ್ ಮಾಡಿ",
      ],
    },
  },
  atsScore: {
    title: "ATS ಹೊಂದಾಣಿಕೆ ಸ್ಕೋರ್",
    description: "ತಕ್ಷಣ ATS ಹೊಂದಾಣಿಕೆ ವಿಶ್ಲೇಷಣೆಯನ್ನು ಪಡೆಯಲು ನಿಮ್ಮ ರೆಸ್ಯೂಮ್ ಅನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
    uploadResume: "ರೆಸ್ಯೂಮ್ ಅನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
    selectResume: "ರೆಸ್ಯೂಮ್ ಅನ್ನು ಆಯ್ಕೆ ಮಾಡಿ",
    analyze: "ರೆಸ್ಯೂಮ್ ಅನ್ನು ವಿಶ್ಲೇಷಿಸಿ",
    analyzing: "ರೆಸ್ಯೂಮ್ ಅನ್ನು ವಿಶ್ಲೇಷಿಸುತ್ತಿದೆ...",
    overallScore: "ಒಟ್ಟು ATS ಸ್ಕೋರ್",
    breakdown: {
      keywordMatch: "ಕೀವರ್ಡ್ ಹೊಂದಾಣಿಕೆ",
      skillsCoverage: "ಕೌಶಲ್ಯಗಳ ಕವರೇಜ್",
      experienceRelevance: "ಅನುಭವ ಸಂಬಂಧ",
      formatting: "ಫಾರ್ಮ್ಯಾಟಿಂಗ್ ಸ್ಕೋರ್",
    },
    missingKeywords: "ಕಾಣೆಯಾದ ಕೀವರ್ಡ್‌ಗಳು",
    recommendations: "ಶಿಫಾರಸುಗಳು",
  },
  jobMatch: {
    title: "ಉದ್ಯೋಗ ವಿವರಣೆ ಹೊಂದಾಣಿಕೆ",
    description: "ಉದ್ಯೋಗ ಪೋಸ್ಟಿಂಗ್‌ಗಳ ವಿರುದ್ಧ ನಿಮ್ಮ ರೆಸ್ಯೂಮ್‌ನ್ನು ಹೋಲಿಸಿ ಮತ್ತು ಕ್ರಿಯಾತ್ಮಕ ಪ್ರತಿಕ್ರಿಯೆಯನ್ನು ಪಡೆಯಿರಿ",
    jobDescription: "ಉದ್ಯೋಗ ವಿವರಣೆ",
    pasteText: "ಟೆಕ್ಸ್ಟ್ ಅನ್ನು ಅಂಟಿಸಿ",
    uploadFile: "ಫೈಲ್ ಅನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
    analyze: "ಉದ್ಯೋಗ ಹೊಂದಾಣಿಕೆಯನ್ನು ವಿಶ್ಲೇಷಿಸಿ",
    analyzing: "ಹೊಂದಾಣಿಕೆಯನ್ನು ವಿಶ್ಲೇಷಿಸುತ್ತಿದೆ...",
    matchScore: "ಹೊಂದಾಣಿಕೆ ಸ್ಕೋರ್",
    verdict: {
      strongFit: "ಬಲವಾದ ಹೊಂದಾಣಿಕೆ",
      moderateFit: "ಮಧ್ಯಮ ಹೊಂದಾಣಿಕೆ",
      lowFit: "ಕಡಿಮೆ ಹೊಂದಾಣಿಕೆ",
    },
    missingKeywords: "ಕಾಣೆಯಾದ ಕೀವರ್ಡ್‌ಗಳು ಮತ್ತು ಕೌಶಲ್ಯಗಳು",
    summaryRewrites: "ಸಾರಾಂಶ ಮರುಬರಹ ಸಲಹೆಗಳು",
    bulletImprovements: "ಅನುಭವ ಬುಲೆಟ್ ಸುಧಾರಣೆಗಳು",
    skillSuggestions: "ಕೌಶಲ್ಯಗಳ ವಿಭಾಗ ಅತ್ಯುತ್ತಮೀಕರಣ",
  },
  common: {
    loading: "ಲೋಡ್ ಆಗುತ್ತಿದೆ...",
    error: "ದೋಷ",
    success: "ಯಶಸ್ಸು",
    cancel: "ರದ್ದು ಮಾಡಿ",
    continue: "ಮುಂದುವರಿಸಿ",
    back: "ಹಿಂದಕ್ಕೆ",
    next: "ಮುಂದೆ",
    finish: "ಮುಗಿಸಿ",
    required: "ಅಗತ್ಯ",
    optional: "ಐಚ್ಛಿಕ",
    download: "ಡೌನ್‌ಲೋಡ್",
    upload: "ಅಪ್‌ಲೋಡ್",
    delete: "ಅಳಿಸಿ",
    edit: "ಸಂಪಾದಿಸಿ",
    add: "ಸೇರಿಸಿ",
    remove: "ತೆಗೆದುಹಾಕಿ",
    search: "ಹುಡುಕಿ",
    filter: "ಫಿಲ್ಟರ್",
    export: "ರಫ್ತು",
    import: "ಆಮದು",
  },
}

// Malayalam translations
export const mlTranslations: Translations = {
  nav: {
    home: "വീട്",
    resumeBuilder: "റെസ്യൂം ബിൽഡർ",
    atsScore: "ATS സ്കോർ",
    jobMatch: "ജോലി മാച്ച്",
    dashboard: "ഡാഷ്‌ബോർഡ്",
    signIn: "സൈൻ ഇൻ",
    signUp: "സൈൻ അപ്പ്",
    getStarted: "ആരംഭിക്കുക",
  },
  home: {
    title: "നിങ്ങൾക്ക് ജോലി നൽകുന്ന ATS-റെഡി റെസ്യൂമുകൾ സൃഷ്ടിക്കുക",
    subtitle: "100% സൗജന്യ റെസ്യൂം ബിൽഡർ",
    description: "പ്രൊഫഷണൽ റെസ്യൂമുകൾ സൃഷ്ടിക്കുക, തൽക്ഷണ ATS അനുയോജ്യത സ്കോറുകൾ നേടുക, ജോലി വിവരണങ്ങൾക്കെതിരെ നിങ്ങളുടെ റെസ്യൂം മാച്ച് ചെയ്യുക.",
    startBuilding: "സൗജന്യമായി നിർമ്മിക്കാൻ ആരംഭിക്കുക",
    checkAtsScore: "ATS സ്കോർ പരിശോധിക്കുക",
    features: {
      resumeBuilder: {
        title: "സൗജന്യ റെസ്യൂം ബിൽഡർ",
        description: "ഞങ്ങളുടെ ഗൈഡഡ് ഫോം, ATS-ഫ്രണ്ട് ടെംപ്ലേറ്റുകളുമായി പ്രൊഫഷണൽ റെസ്യൂമുകൾ സൃഷ്ടിക്കുക",
        features: ["3 പ്രൊഫഷണൽ ടെംപ്ലേറ്റുകൾ", "നിങ്ങൾ ടൈപ്പ് ചെയ്യുമ്പോൾ ലൈവ് പ്രിവ്യൂ", "PDF, DOCX എന്നിവയിലേക്ക് എക്സ്‌പോർട്ട്"],
      },
      atsScore: {
        title: "ATS അനുയോജ്യത സ്കോർ",
        description: "ATS സിസ്റ്റങ്ങളുമായി നിങ്ങളുടെ റെസ്യൂം എത്ര നന്നായി പ്രവർത്തിക്കുന്നു എന്നതിനെക്കുറിച്ച് തൽക്ഷണ ഫീഡ്‌ബാക്ക് നേടുക",
        features: ["കീവേഡ് മാച്ച് വിശ്ലേഷണം", "കഴിവുകളുടെ കവറേജ് ബ്രേക്ക്ഡൗൺ", "ഫോർമാറ്റിംഗ് ഒപ്റ്റിമൈസേഷൻ"],
      },
      jobMatch: {
        title: "ജോലി വിവരണ മാച്ചിംഗ്",
        description: "ജോലി പോസ്റ്റിംഗുകൾക്കെതിരെ നിങ്ങളുടെ റെസ്യൂം താരതമ്യം ചെയ്യുക, പ്രവർത്തനാത്മക മെച്ചപ്പെടുത്തൽ നിർദ്ദേശങ്ങൾ നേടുക",
        features: ["മികച്ച ഫിറ്റ് വിശ്ലേഷണം", "കാണാതായ കീവേഡുകൾ കണ്ടെത്തൽ", "ബുള്ളറ്റ് പോയിന്റ് റിറൈറ്റുകൾ"],
      },
    },
    cta: {
      title: "നിങ്ങളുടെ പരിപൂർണ്ണ റെസ്യൂം സൃഷ്ടിക്കാൻ തയ്യാറാണോ?",
      description: "HireReady ന്റെ സൗജന്യ ഉപകരണങ്ങൾ ഉപയോഗിച്ച് അവരുടെ റെസ്യൂമുകൾ മെച്ചപ്പെടുത്തിയ ആയിരക്കണക്കിന് ജോലി തേടുന്നവരുമായി ചേരുക.",
      button: "ഇപ്പോൾ നിർമ്മിക്കാൻ ആരംഭിക്കുക - ഇത് സൗജന്യമാണ്",
    },
  },
  resumeBuilder: {
    title: "റെസ്യൂം ബിൽഡർ",
    sections: {
      upload: "റെസ്യൂം ഇംപോർട്ട് ചെയ്യുക",
      personal: "വ്യക്തിഗത വിവരങ്ങൾ",
      summary: "സംഗ്രഹം",
      experience: "അനുഭവം",
      education: "വിദ്യാഭ്യാസം",
      skills: "കഴിവുകൾ",
      projects: "പ്രോജക്റ്റുകൾ",
      certifications: "സർട്ടിഫിക്കേറ്റുകൾ",
      export: "റെസ്യൂം എക്സ്‌പോർട്ട് ചെയ്യുക",
    },
    progress: "പുരോഗതി",
    save: "സേവ് ചെയ്യുക",
    preview: "പ്രിവ്യൂ",
    tips: {
      title: "നുറുങ്ങുകൾ",
      items: [
        "ആക്ഷൻ വെർബുകൾ ഉപയോഗിക്കുക, സംഖ്യകളുമായി നിങ്ങളുടെ നേട്ടങ്ങൾ അളക്കുക",
        "ബുള്ളറ്റ് പോയിന്റുകൾ ചുരുക്കവും ശക്തവുമായി സൂക്ഷിക്കുക",
        "ഓരോ ജോലി അപ്ലിക്കേഷനും നിങ്ങളുടെ റെസ്യൂം കസ്റ്റമൈസ് ചെയ്യുക",
      ],
    },
  },
  atsScore: {
    title: "ATS അനുയോജ്യത സ്കോർ",
    description: "തൽക്ഷണ ATS അനുയോജ്യത വിശ്ലേഷണം നേടാൻ നിങ്ങളുടെ റെസ്യൂം അപ്‌ലോഡ് ചെയ്യുക",
    uploadResume: "റെസ്യൂം അപ്‌ലോഡ് ചെയ്യുക",
    selectResume: "റെസ്യൂം തിരഞ്ഞെടുക്കുക",
    analyze: "റെസ്യൂം വിശ്ലേഷണം ചെയ്യുക",
    analyzing: "റെസ്യൂം വിശ്ലേഷണം ചെയ്യുന്നു...",
    overallScore: "മൊത്തം ATS സ്കോർ",
    breakdown: {
      keywordMatch: "കീവേഡ് മാച്ച്",
      skillsCoverage: "കഴിവുകളുടെ കവറേജ്",
      experienceRelevance: "അനുഭവ പ്രസക്തി",
      formatting: "ഫോർമാറ്റിംഗ് സ്കോർ",
    },
    missingKeywords: "കാണാതായ കീവേഡുകൾ",
    recommendations: "ശുപാർശകൾ",
  },
  jobMatch: {
    title: "ജോലി വിവരണ മാച്ചിംഗ്",
    description: "ജോലി പോസ്റ്റിംഗുകൾക്കെതിരെ നിങ്ങളുടെ റെസ്യൂം താരതമ്യം ചെയ്യുക, പ്രവർത്തനാത്മക ഫീഡ്‌ബാക്ക് നേടുക",
    jobDescription: "ജോലി വിവരണം",
    pasteText: "ടെക്സ്റ്റ് പേസ്റ്റ് ചെയ്യുക",
    uploadFile: "ഫയൽ അപ്‌ലോഡ് ചെയ്യുക",
    analyze: "ജോലി മാച്ച് വിശ്ലേഷണം ചെയ്യുക",
    analyzing: "മാച്ച് വിശ്ലേഷണം ചെയ്യുന്നു...",
    matchScore: "മാച്ച് സ്കോർ",
    verdict: {
      strongFit: "ശക്തമായ ഫിറ്റ്",
      moderateFit: "മിതമായ ഫിറ്റ്",
      lowFit: "കുറഞ്ഞ ഫിറ്റ്",
    },
    missingKeywords: "കാണാതായ കീവേഡുകളും കഴിവുകളും",
    summaryRewrites: "സംഗ്രഹ റിറൈറ്റ് നിർദ്ദേശങ്ങൾ",
    bulletImprovements: "അനുഭവ ബുള്ളറ്റ് മെച്ചപ്പെടുത്തലുകൾ",
    skillSuggestions: "കഴിവുകളുടെ സെക്ഷൻ ഒപ്റ്റിമൈസേഷൻ",
  },
  common: {
    loading: "ലോഡ് ചെയ്യുന്നു...",
    error: "പിശക്",
    success: "വിജയം",
    cancel: "റദ്ദാക്കുക",
    continue: "തുടരുക",
    back: "പിന്നോക്കം",
    next: "അടുത്തത്",
    finish: "പൂർത്തിയാക്കുക",
    required: "ആവശ്യമാണ്",
    optional: "ഓപ്ഷണൽ",
    download: "ഡൗൺലോഡ്",
    upload: "അപ്‌ലോഡ്",
    delete: "ഇല്ലാതാക്കുക",
    edit: "എഡിറ്റ് ചെയ്യുക",
    add: "ചേർക്കുക",
    remove: "നീക്കം ചെയ്യുക",
    search: "തിരയുക",
    filter: "ഫിൽട്ടർ",
    export: "എക്സ്‌പോർട്ട്",
    import: "ഇംപോർട്ട്",
  },
}

export const translations = {
  en: enTranslations,
  hi: hiTranslations,
  mai: maiTranslations,
  ta: taTranslations,
  te: teTranslations,
  kn: knTranslations,
  ml: mlTranslations,
}

export function getTranslation(language: Language): Translations {
  return translations[language] || translations.en
}
