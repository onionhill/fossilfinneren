import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { api } from "../api/client";
import type { JournalEntry } from "../api/client";
import { useAuth } from "../auth/AuthContext";
import { useLanguage } from "../i18n/LanguageContext";

/** «Feltdagbok»: the pupil's own finds, as free text with an optional photo. Only the pupil and their teacher see it. */
export function JournalPage() {
  const { viewer } = useAuth();
  const { t } = useLanguage();
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (!viewer) return;
    api.journal(viewer.accessToken).then(setEntries).catch(() => setEntries([]));
  }, [viewer]);

  if (!viewer) return <p>Logg inn for å se feltdagboken din.</p>;

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const entry = await api.addEntry(viewer.accessToken, new FormData(form));
    setEntries((current) => [entry, ...current]);
    setStatus(t("saved"));
    form.reset();
  };

  return (
    <>
      <h1>{t("journalTitle")}</h1>
      <form onSubmit={(e) => void submit(e)} className="stack">
        <label htmlFor="text">{t("journalPlaceholder")}</label>
        <textarea id="text" name="text" rows={4} required maxLength={2000} />
        <label htmlFor="photo">{t("journalPhoto")}</label>
        <input id="photo" name="photo" type="file" accept="image/*" capture="environment" />
        <button type="submit" className="button">
          {t("save")}
        </button>
        <p role="status">{status}</p>
      </form>
      <ul className="journal">
        {entries.map((entry) => (
          <li key={entry.id}>
            <p>{entry.text}</p>
            {entry.photoUrl && <img src={entry.photoUrl} alt="Bilde av funnet mitt" width={240} />}
            {entry.teacherComment && <p className="journal__comment">Læreren: {entry.teacherComment}</p>}
          </li>
        ))}
      </ul>
    </>
  );
}
