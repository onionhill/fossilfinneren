import { createRemoteJWKSet, jwtVerify } from "jose";
import { config } from "./config.js";
import { feideName, roleFromGroups, teachingGroups } from "./feideClaims.js";
import type { FeideGroup, FeideUserInfo, Viewer } from "./feideClaims.js";

export type { Role, TeachingGroup, Viewer } from "./feideClaims.js";

const jwks = createRemoteJWKSet(new URL(config.FEIDE_JWKS_URL));

/**
 * Who a request comes from. Feide's access tokens are opaque, so the app also
 * sends the ID token: its signature, issuer and audience prove the login was
 * made for Fossilfinneren's client, so a token issued to another service is
 * refused. The access token then reads the user (userinfo-name, userid-feide)
 * and their school and groups (groups-org, groups-edu), and must belong to the
 * same user as the ID token.
 */
export async function viewerFromTokens(accessToken: string, idToken: string): Promise<Viewer | null> {
  const verified = await jwtVerify(idToken, jwks, {
    issuer: config.FEIDE_ISSUER,
    audience: config.FEIDE_CLIENT_ID,
    algorithms: ["RS256"],
  }).catch(() => null);
  if (!verified?.payload.sub) return null;

  const headers = { Authorization: `Bearer ${accessToken}` };
  const [userResponse, groupsResponse] = await Promise.all([
    fetch(config.FEIDE_USERINFO_URL, { headers }),
    fetch(config.FEIDE_GROUPS_URL, { headers }),
  ]);
  if (!userResponse.ok || !groupsResponse.ok) return null;

  const { user } = (await userResponse.json()) as FeideUserInfo;
  if (user.userid !== verified.payload.sub) return null;
  const groups = (await groupsResponse.json()) as FeideGroup[];
  const id = feideName(user.userid_sec);
  const org = groups.find((g) => g.type === "fc:org");
  if (!id || !org) return null;

  const role = roleFromGroups(groups);
  const { taught, attended } = teachingGroups(groups);
  return {
    feideId: id,
    userId: user.userid,
    name: user.name,
    role,
    orgId: org.id,
    school: org.displayName,
    groups: role === "laerer" ? taught : attended,
  };
}

export const MOCK_VIEWERS: Record<string, Viewer> = {
  "mock-elev": {
    feideId: "asbjorn_elev@spusers.feide.no",
    userId: "mock-elev",
    name: "Asbjørn ElevEn",
    role: "elev",
    orgId: "fc:org:spusers.feide.no",
    school: "Feide testskole",
    groups: [{ id: "fc:gogroup:spusers.feide.no:3a-nat", name: "3A naturfag" }],
  },
  "mock-laerer": {
    feideId: "turid_laerer@spusers.feide.no",
    userId: "mock-laerer",
    name: "Turid LærerEn",
    role: "laerer",
    orgId: "fc:org:spusers.feide.no",
    school: "Feide testskole",
    groups: [
      { id: "fc:gogroup:spusers.feide.no:3a-nat", name: "3A naturfag" },
      { id: "fc:gogroup:spusers.feide.no:4b-nat", name: "4B naturfag" },
    ],
  },
};
