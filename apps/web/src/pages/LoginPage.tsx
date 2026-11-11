import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { config } from "../config";
import { useLanguage } from "../i18n/LanguageContext";

export function LoginPage() {
  const { login } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const loginAs = async (role: "elev" | "laerer") => {
    await login(role);
    if (config.authMode === "mock") navigate(role === "laerer" ? "/laerer" : "/feltdagbok");
  };

  return (
    <section className="narrow">
      <h1>{t("loginTitle")}</h1>
      <p>{t("loginText")}</p>
      {config.authMode === "feide" ? (
        <button type="button" className="button" onClick={() => void login()}>
          {t("login")}
        </button>
      ) : (
        <div className="stack">
          <button type="button" className="button" onClick={() => void loginAs("elev")}>
            {t("loginAsPupil")}
          </button>
          <button type="button" className="button" onClick={() => void loginAs("laerer")}>
            {t("loginAsTeacher")}
          </button>
        </div>
      )}
    </section>
  );
}
