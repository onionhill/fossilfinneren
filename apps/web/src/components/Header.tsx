import { NavLink } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { useLanguage } from "../i18n/LanguageContext";

export function Header() {
  const { viewer, logout } = useAuth();
  const { t, language, setLanguage } = useLanguage();

  return (
    <header className="header">
      <a className="skip-link" href="#main">
        {t("skipToContent")}
      </a>
      <NavLink to="/" className="header__brand">
        <img src="/favicon.svg" alt="" width={32} height={32} />
        Fossilfinneren
      </NavLink>
      <nav aria-label="Hovedmeny" className="header__nav">
        <NavLink to="/kart">{t("navMap")}</NavLink>
        <NavLink to="/fossiler">{t("navFossils")}</NavLink>
        <NavLink to="/oppdrag">{t("navMissions")}</NavLink>
        <NavLink to="/feltdagbok">{t("navJournal")}</NavLink>
        {viewer?.role === "laerer" && <NavLink to="/laerer">{t("navTeacher")}</NavLink>}
      </nav>
      <div className="header__tools">
        <label>
          {t("language")}{" "}
          <select value={language} onChange={(e) => setLanguage(e.target.value as "nb" | "nn")}>
            <option value="nb">Bokmål</option>
            <option value="nn">Nynorsk</option>
          </select>
        </label>
        {viewer ? (
          <button type="button" onClick={() => void logout()}>
            {t("logout")} ({viewer.name.split(" ")[0]})
          </button>
        ) : (
          <NavLink to="/logg-inn" className="button">
            {t("login")}
          </NavLink>
        )}
      </div>
    </header>
  );
}
