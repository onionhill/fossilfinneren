import { useEffect, useState } from "react";
import { api } from "../api/client";
import { useAuth } from "../auth/AuthContext";
import { FossilMap } from "../components/FossilMap";
import type { MapPoint } from "../components/FossilMap";
import { useLanguage } from "../i18n/LanguageContext";

/** The teacher's view: the class map of finds for each teaching group from Feide (groups-edu). */
export function TeacherPage() {
  const { viewer } = useAuth();
  const { t } = useLanguage();
  const [group, setGroup] = useState(viewer?.groups[0]?.id ?? "");
  const [points, setPoints] = useState<MapPoint[]>([]);

  useEffect(() => {
    if (!viewer || viewer.role !== "laerer" || !group) return;
    api
      .classFinds(viewer, group)
      .then((finds) => setPoints(finds.map((f, i) => ({ id: String(i), label: `${f.pupil}: ${f.place}`, ...f }))))
      .catch(() => setPoints([]));
  }, [viewer, group]);

  if (viewer?.role !== "laerer") return <p>Denne siden er for lærere.</p>;

  return (
    <>
      <h1>{t("teacherTitle")}</h1>
      <label>
        Gruppe{" "}
        <select value={group} onChange={(e) => setGroup(e.target.value)}>
          {viewer.groups.map((g) => (
            <option key={g.id} value={g.id}>
              {g.name}
            </option>
          ))}
        </select>
      </label>
      <h2>{t("teacherMap")}</h2>
      <FossilMap points={points} title={t("teacherMap")} />
    </>
  );
}
