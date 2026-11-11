const env = import.meta.env;

export const config = {
  authMode: (env.VITE_AUTH_MODE ?? "feide") as "feide" | "mock",
  feide: {
    issuer: env.VITE_FEIDE_ISSUER ?? "https://auth.dataporten.no",
    clientId: env.VITE_FEIDE_CLIENT_ID ?? "",
    redirectUri: env.VITE_FEIDE_REDIRECT_URI ?? "https://fossilfinneren.no/auth/callback",
    postLogoutRedirectUri: env.VITE_FEIDE_POST_LOGOUT_REDIRECT_URI ?? "https://fossilfinneren.no/",
  },
  apiUrl: env.VITE_API_URL ?? "https://api.fossilfinneren.no",
  contentUrl: env.VITE_CONTENT_URL ?? "https://innhold.fossilfinneren.no",
  videoUrl: env.VITE_VIDEO_URL ?? "https://video.fossilfinneren.no",
  mapTileUrl:
    env.VITE_MAP_TILE_URL ??
    "https://cache.kartverket.no/v1/wmts/1.0.0/topo/default/webmercator/{z}/{y}/{x}.png",
  plausibleDomain: env.VITE_PLAUSIBLE_DOMAIN ?? "fossilfinneren.no",
} as const;
