import { useEffect } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import { countPageView } from "./analytics";
import { useAuth } from "./auth/AuthContext";
import { Header } from "./components/Header";
import { useLanguage } from "./i18n/LanguageContext";
import { AccessibilityPage } from "./pages/AccessibilityPage";
import { CallbackPage } from "./pages/CallbackPage";
import { FossilsPage } from "./pages/FossilsPage";
import { HomePage } from "./pages/HomePage";
import { JournalPage } from "./pages/JournalPage";
import { LoginPage } from "./pages/LoginPage";
import { MapPage } from "./pages/MapPage";
import { MissionsPage } from "./pages/MissionsPage";
import { PrivacyPage } from "./pages/PrivacyPage";
import { TeacherPage } from "./pages/TeacherPage";

export function App() {
  const location = useLocation();
  const { viewer } = useAuth();
  const { t } = useLanguage();

  useEffect(() => countPageView(location.pathname, viewer !== null), [location.pathname, viewer]);

  return (
    <>
      <Header />
      <main id="main" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/logg-inn" element={<LoginPage />} />
          <Route path="/auth/callback" element={<CallbackPage />} />
          <Route path="/kart" element={<MapPage />} />
          <Route path="/fossiler" element={<FossilsPage />} />
          <Route path="/oppdrag" element={<MissionsPage />} />
          <Route path="/feltdagbok" element={<JournalPage />} />
          <Route path="/laerer" element={<TeacherPage />} />
          <Route path="/personvern" element={<PrivacyPage />} />
          <Route path="/tilgjengelighet" element={<AccessibilityPage />} />
          <Route path="*" element={<h1>{t("notFound")}</h1>} />
        </Routes>
      </main>
      <footer className="footer">
        <p>Fossilfinneren AS · org.nr. 317 280 297</p>
        <Link to="/personvern">{t("privacy")}</Link>
        <Link to="/tilgjengelighet">{t("accessibility")}</Link>
      </footer>
    </>
  );
}
