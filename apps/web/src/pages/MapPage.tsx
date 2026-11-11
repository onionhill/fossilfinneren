import { FossilMap } from "../components/FossilMap";
import { FOSSILS } from "../data/fossils";
import { useLanguage } from "../i18n/LanguageContext";

export function MapPage() {
  const { t } = useLanguage();
  const points = FOSSILS.map((f) => ({ id: f.id, label: `${f.name} – ${f.location.place}`, ...f.location }));
  return (
    <>
      <h1>{t("navMap")}</h1>
      <FossilMap points={points} title={t("navMap")} />
    </>
  );
}
