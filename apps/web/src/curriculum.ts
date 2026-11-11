/** Grep subject codes (LK20) the service is made for: naturfag, 1st to 4th grade. */
export const SUBJECT_CODES = [
  { code: "NAT0001", name: "Naturfag 1. årstrinn", grade: "aarstrinn1" },
  { code: "NAT0002", name: "Naturfag 2. årstrinn", grade: "aarstrinn2" },
  { code: "NAT0003", name: "Naturfag 3. årstrinn", grade: "aarstrinn3" },
  { code: "NAT0004", name: "Naturfag 4. årstrinn", grade: "aarstrinn4" },
] as const;

export const TOPICS = ["fossiler", "dinosaurer", "arter som dør ut"] as const;

/** Competence aims the missions are tagged with. */
export const COMPETENCE_AIMS = {
  KM13810: {
    set: "KV1075",
    after: "aarstrinn2",
    text: "utforske et naturområde i nærmiljøet og beskrive hvordan noen organismer er tilpasset området og hverandre",
  },
  KM13811: {
    set: "KV1075",
    after: "aarstrinn2",
    text: "oppleve naturen til ulike årstider, reflektere over hvordan naturen er i endring, og hvorfor året deles inn på ulike måter i norsk og samisk tradisjon",
  },
  KM13825: {
    set: "KV1076",
    after: "aarstrinn4",
    text: "utforske og sammenligne ulike dyre- og plantearters tilpasninger til miljø og levesteder og drøfte hvorfor noen arter dør ut",
  },
} as const;

export type AimCode = keyof typeof COMPETENCE_AIMS;

/** The grades a set of aims is meant for, lowest first. */
export function gradesForAims(aims: AimCode[]): string[] {
  const grades = new Set(aims.map((aim) => COMPETENCE_AIMS[aim].after));
  return [...grades].sort();
}
