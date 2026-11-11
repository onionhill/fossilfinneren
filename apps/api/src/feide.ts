import { config } from "./config.js";
import { feideName, roleFromGroups } from "./feideClaims.js";
import type { FeideGroup, FeideUserInfo, Viewer } from "./feideClaims.js";

export type { Role, Viewer } from "./feideClaims.js";

/**
 * Checks a Feide access token by asking Feide who it belongs to: the userinfo
 * API (userinfo-name, userid-feide) and the groups API (groups-org, groups-edu).
 */
export async function viewerFromToken(token: string): Promise<Viewer | null> {
  const headers = { Authorization: `Bearer ${token}` };
  const [userResponse, groupsResponse] = await Promise.all([
    fetch(config.FEIDE_USERINFO_URL, { headers }),
    fetch(config.FEIDE_GROUPS_URL, { headers }),
  ]);
  if (!userResponse.ok || !groupsResponse.ok) return null;

  const { user } = (await userResponse.json()) as FeideUserInfo;
  const groups = (await groupsResponse.json()) as FeideGroup[];
  const id = feideName(user.userid_sec);
  const org = groups.find((g) => g.type === "fc:org");
  if (!id || !org) return null;

  return {
    feideId: id,
    name: user.name,
    role: roleFromGroups(groups),
    orgId: org.id,
    school: org.displayName,
    groups: groups.filter((g) => g.type === "fc:gogroup").map((g) => g.displayName),
  };
}

export const MOCK_VIEWERS: Record<string, Viewer> = {
  "mock-elev": {
    feideId: "asbjorn_elev@spusers.feide.no",
    name: "Asbjørn ElevEn",
    role: "elev",
    orgId: "fc:org:spusers.feide.no",
    school: "Feide testskole",
    groups: ["3A naturfag"],
  },
  "mock-laerer": {
    feideId: "turid_laerer@spusers.feide.no",
    name: "Turid LærerEn",
    role: "laerer",
    orgId: "fc:org:spusers.feide.no",
    school: "Feide testskole",
    groups: ["3A naturfag", "4B naturfag"],
  },
};
