import { UserManager, WebStorageStateStore } from "oidc-client-ts";
import { config } from "../config";

/**
 * Feide user information the service asks for, and why. Kept in one place so
 * the scope string and the privacy statement cannot drift apart.
 */
export const FEIDE_SCOPES = [
  { key: "openid", reason: "Kreves for OpenID Connect." },
  { key: "userinfo-name", reason: "Vise navnet til eleven og læreren i tjenesten." },
  {
    key: "userid-feide",
    reason: "Identifisere brukeren ved innlogging og knytte resultater til riktig elev.",
  },
  {
    key: "groups-org",
    reason: "Vite hvilken skole brukeren tilhører, slik at riktig lisens brukes.",
  },
  {
    key: "groups-edu",
    reason: "Sette opp klasser og grupper automatisk, slik at læreren ser sine elever.",
  },
] as const;

export const userManager = new UserManager({
  authority: config.feide.issuer,
  client_id: config.feide.clientId,
  // Registered in Feide kundeportal: https://fossilfinneren.no/auth/callback
  redirect_uri: config.feide.redirectUri,
  post_logout_redirect_uri: config.feide.postLogoutRedirectUri,
  response_type: "code",
  scope: FEIDE_SCOPES.map((s) => s.key).join(" "),
  loadUserInfo: true,
  userStore: new WebStorageStateStore({ store: window.sessionStorage }),
});
