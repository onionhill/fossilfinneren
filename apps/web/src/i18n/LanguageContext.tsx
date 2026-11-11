import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import { readLanguage, saveLanguage, translate } from "./index";
import type { Language, MessageKey } from "./index";

interface LanguageState {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: MessageKey) => string;
}

const LanguageContext = createContext<LanguageState | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => readLanguage(document.cookie));
  const setLanguage = (next: Language) => {
    saveLanguage(next);
    setLanguageState(next);
  };
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: (key) => translate(language, key) }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageState {
  const state = useContext(LanguageContext);
  if (!state) throw new Error("useLanguage must be used inside LanguageProvider");
  return state;
}
