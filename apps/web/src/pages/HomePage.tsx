import { Link } from "react-router-dom";
import { useLanguage } from "../i18n/LanguageContext";

export function HomePage() {
  const { t } = useLanguage();
  return (
    <>
      <section className="hero">
        <h1>{t("heroTitle")}</h1>
        <p>{t("heroText")}</p>
        <Link className="button" to="/logg-inn">
          {t("login")}
        </Link>
      </section>
      <section aria-labelledby="for-skolen">
        <h2 id="for-skolen">For skolen</h2>
        <ul>
          <li>Naturfag 1.–4. trinn, på bokmål og nynorsk.</li>
          <li>Fossilkart, fossilkort med bilder og video, oppdrag og feltdagbok.</li>
          <li>Klassekart over funnsteder og kommentarer fra læreren.</li>
          <li>Opplesing av alle oppgaver.</li>
          <li>Innlogging med Feide. Ingen reklame.</li>
          <li>29 kr per elev per år.</li>
        </ul>
      </section>
    </>
  );
}
