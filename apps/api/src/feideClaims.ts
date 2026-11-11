// Pure helpers for what Feide says about a user, kept free of config so they test without an environment.

export type Role = "elev" | "laerer";

export interface Viewer {
  feideId: string;
  name: string;
  role: Role;
  orgId: string;
  school: string;
  groups: string[];
}

export interface FeideUserInfo {
  user: { userid_sec: string[]; name: string };
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

/** Teachers are «faculty» or «owner»/«admin» in a teaching group; everyone else is a pupil. */
export function roleFromGroups(groups: FeideGroup[]): Role {
  const isTeacher = groups.some((g) => {
    const affiliation = g.membership?.affiliation;
    const affiliations = Array.isArray(affiliation) ? affiliation : affiliation ? [affiliation] : [];
    return affiliations.includes("faculty") || ["owner", "admin"].includes(g.membership?.basic ?? "");
  });
  return isTeacher ? "laerer" : "elev";
}

