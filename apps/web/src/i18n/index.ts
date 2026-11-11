import { nb } from "./nb";
import { nn } from "./nn";

export type Language = "nb" | "nn";
export type MessageKey = keyof typeof nb;

const messages: Record<Language, Record<MessageKey, string>> = { nb, nn };

// The «lang» cookie (functional, 1 year) remembers bokmål or nynorsk.
const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

export function readLanguage(cookie: string): Language {
  const match = /(?:^|;\s*)lang=(nb|nn)/.exec(cookie);
  return match ? (match[1] as Language) : "nb";
}

export function saveLanguage(language: Language): void {
  document.cookie = `lang=${language}; Max-Age=${ONE_YEAR_SECONDS}; Path=/; SameSite=Lax; Secure`;
  document.documentElement.lang = language;
}

export function translate(language: Language, key: MessageKey): string {
  return messages[language][key];
}
