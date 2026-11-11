import { useEffect, useState } from "react";
import { useLanguage } from "../i18n/LanguageContext";

/** «Opplesing»: reads a task or a fossil card aloud with the browser's own speech synthesis. */
export function ReadAloud({ text }: { text: string }) {
  const { t, language } = useLanguage();
  const [speaking, setSpeaking] = useState(false);

  useEffect(() => () => window.speechSynthesis?.cancel(), []);

  if (!("speechSynthesis" in window)) return null;

  const toggle = () => {
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language === "nn" ? "nn-NO" : "nb-NO";
    utterance.onend = () => setSpeaking(false);
    window.speechSynthesis.speak(utterance);
    setSpeaking(true);
  };

  return (
    <button type="button" className="read-aloud" aria-pressed={speaking} onClick={toggle}>
      {speaking ? t("stopReading") : t("readAloud")}
    </button>
  );
}
