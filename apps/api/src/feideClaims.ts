// Pure helpers for what Feide says about a user, kept free of config so they test without an environment.

export type Role = "elev" | "laerer";

/** A teaching group from Feide (groups-edu). The id is stable; the name is for display only. */
export interface TeachingGroup {
  id: string;
  name: string;
}

export interface Viewer {
  feideId: string;
  /** Feide's subject, which the ID token's «sub» must match. */
  userId: string;
  name: string;
  role: Role;
  orgId: string;
  school: string;
  /** A teacher's groups are those they teach; a pupil's are those they are a pupil in. */
  groups: TeachingGroup[];
}

export interface FeideUserInfo {
  user: { userid: string; userid_sec: string[]; name: string };
}

export interface FeideGroup {
  id: string;
  type: string;
  displayName: string;
  membership?: { basic?: string; affiliation?: string | string[] };
}

/** The Feide name (userid-feide) from the user's secondary ids, e.g. "feide:ola@skole.no". */
export function feideName(useridSec: string[]): string | undefined {
  return useridSec.find((id) => id.startsWith("feide:"))?.slice("feide:".length);
}

function affiliations(group: FeideGroup): string[] {
  const affiliation = group.membership?.affiliation;
  return Array.isArray(affiliation) ? affiliation : affiliation ? [affiliation] : [];
}

/**
 * Only teaching groups (fc:gogroup) count, and only the user's affiliation in
 * each: «faculty» teaches the group, «student» is a pupil in it. Ad hoc groups
 * and the basic «owner»/«admin» membership give no rights here.
 */
export function teachingGroups(groups: FeideGroup[]): { taught: TeachingGroup[]; attended: TeachingGroup[] } {
  const teaching = groups.filter((g) => g.type === "fc:gogroup");
  const toGroup = (g: FeideGroup) => ({ id: g.id, name: g.displayName });
  return {
    taught: teaching.filter((g) => affiliations(g).includes("faculty")).map(toGroup),
    attended: teaching.filter((g) => affiliations(g).includes("student")).map(toGroup),
  };
}

/** A teacher teaches at least one teaching group; everyone else is a pupil. */
export function roleFromGroups(groups: FeideGroup[]): Role {
  return teachingGroups(groups).taught.length > 0 ? "laerer" : "elev";
}
