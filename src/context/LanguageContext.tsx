"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useSyncExternalStore,
} from "react";

export type Language = "en" | "ar";

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
  isArabic: boolean;
  dir: "ltr" | "rtl";
  t: (enText: string, arText: string) => string;
}

const key = "jordan_language";
const changeEvent = "jordan-language-change";
let fallback: Language = "en";

function snapshot(): Language {
  try {
    const value = window.localStorage.getItem(key);
    return value === "ar" || value === "en" ? value : "en";
  } catch {
    return fallback;
  }
}

function subscribe(notify: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key === key || event.key === null) notify();
  };
  window.addEventListener("storage", onStorage);
  window.addEventListener(changeEvent, notify);
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(changeEvent, notify);
  };
}

const serverSnapshot = (): Language => "en";

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const language = useSyncExternalStore(subscribe, snapshot, serverSnapshot);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, [language]);

  const setLanguage = (lang: Language) => {
    fallback = lang;
    try {
      window.localStorage.setItem(key, lang);
    } catch {
      // Storage unavailable
    }
    window.dispatchEvent(new Event(changeEvent));
  };

  const toggleLanguage = () => {
    const next = language === "en" ? "ar" : "en";
    setLanguage(next);
  };

  const isArabic = language === "ar";
  const dir = isArabic ? "rtl" : "ltr";

  const t = (enText: string, arText: string) => {
    return isArabic ? arText : enText;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        toggleLanguage,
        setLanguage,
        isArabic,
        dir,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    return {
      language: "en" as Language,
      toggleLanguage: () => {},
      setLanguage: () => {},
      isArabic: false,
      dir: "ltr" as const,
      t: (enText: string, arText?: string) => enText,
    };
  }
  return context;
}
