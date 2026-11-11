import { ReadAloud } from "../components/ReadAloud";
import { COMPETENCE_AIMS } from "../curriculum";
import { MISSIONS } from "../data/fossils";
import { useLanguage } from "../i18n/LanguageContext";

export function MissionsPage() {
  const { t } = useLanguage();
  return (
    <>
      <h1>{t("missionsTitle")}</h1>
      <ol className="missions">
        {MISSIONS.map((mission) => (
          <li key={mission.id}>
            <h2>{mission.title}</h2>
            <p>{mission.text}</p>
            <ReadAloud text={`${mission.title}. ${mission.text}`} />
            <details>
              <summary>Kompetansemål</summary>
              <ul>
                {mission.aims.map((aim) => (
                  <li key={aim}>{COMPETENCE_AIMS[aim].text}</li>
                ))}
              </ul>
            </details>
          </li>
        ))}
      </ol>
    </>
  );
}
