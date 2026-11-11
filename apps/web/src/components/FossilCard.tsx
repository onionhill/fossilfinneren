import type { Fossil } from "../data/fossils";
import { ReadAloud } from "./ReadAloud";

export function FossilCard({ fossil }: { fossil: Fossil }) {
  return (
    <article className="fossil-card">
      {/* UU-avvik 1.1.1: some photos still have an empty alt text. */}
      <img src={fossil.image} alt={fossil.imageAlt} loading="lazy" width={320} height={200} />
      <h3>{fossil.name}</h3>
      <p className="fossil-card__age">{fossil.age}</p>
      <p>{fossil.facts}</p>
      <p>Funnet: {fossil.location.place}</p>
      {fossil.video && (
        <video controls preload="none" src={fossil.video} aria-label={`Video om ${fossil.name}`}>
          <track kind="captions" srcLang="nb" src={fossil.video.replace("index.m3u8", "nb.vtt")} default />
        </video>
      )}
      <ReadAloud text={`${fossil.name}. ${fossil.age}. ${fossil.facts}`} />
    </article>
  );
}
