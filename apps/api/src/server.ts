import cookie from "@fastify/cookie";
import cors from "@fastify/cors";
import multipart from "@fastify/multipart";
import Fastify from "fastify";
import { config } from "./config.js";
import { MOCK_VIEWERS, viewerFromTokens } from "./feide.js";
import type { Viewer } from "./feide.js";
import { classRoutes } from "./routes/classes.js";
import { journalRoutes } from "./routes/journal.js";

declare module "fastify" {
  interface FastifyRequest {
    viewer: Viewer;
  }
}

const app = Fastify({ logger: { redact: ["req.headers.authorization", "req.headers.cookie", 'req.headers["x-feide-id-token"]'] } });

await app.register(cors, { origin: config.WEB_ORIGIN, credentials: true });
await app.register(cookie, { secret: config.SESSION_SECRET });
await app.register(multipart, { limits: { fileSize: 5 * 1024 * 1024, files: 1 } });

app.get("/api/helse", async () => ({ status: "ok" }));

// Every other route needs a Feide access token.
app.addHook("onRequest", async (request, reply) => {
  if (request.url === "/api/helse" || request.method === "OPTIONS") return;
  const token = request.headers.authorization?.replace(/^Bearer /, "");
  const idToken = request.headers["x-feide-id-token"];
  const viewer = !token
    ? undefined
    : config.AUTH_MODE === "mock"
      ? MOCK_VIEWERS[token]
      : typeof idToken === "string"
        ? await viewerFromTokens(token, idToken)
        : null;
  if (!viewer) return reply.code(401).send({ error: "Logg inn med Feide." });
  request.viewer = viewer;
  // «session_id» (necessary): keeps the pupil logged in, removed at logout.
  reply.setCookie("session_id", viewer.feideId, {
    signed: true,
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
  });
});

app.get("/api/meg", async (request) => {
  const { name, role, school, groups } = request.viewer;
  return { name, role, school, groups };
});

app.post("/api/logg-ut", async (_request, reply) => {
  reply.clearCookie("session_id", { path: "/" });
  return { ok: true };
});

await app.register(journalRoutes);
await app.register(classRoutes);

await app.listen({ port: config.PORT, host: "0.0.0.0" });
