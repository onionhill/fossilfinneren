import { FossilCard } from "../components/FossilCard";
import { FOSSILS } from "../data/fossils";
import { useLanguage } from "../i18n/LanguageContext";

export function FossilsPage() {
  const { t } = useLanguage();
  return (
    <>
      <h1>{t("navFossils")}</h1>
      <div className="grid">
        {FOSSILS.map((fossil) => (
          <FossilCard key={fossil.id} fossil={fossil} />
        ))}
      </div>
    </>
  );
}
