import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { pool } from "../db.js";
import { readPhoto, storePhoto } from "../storage.js";

const comment = z.object({ text: z.string().trim().min(1).max(500) });

export async function journalRoutes(app: FastifyInstance) {
  // A pupil sees only their own journal.
  app.get("/api/feltdagbok", async (request) => {
    const viewer = request.viewer;
    const { rows } = await pool.query(
      `SELECT id, text, CASE WHEN photo_key IS NULL THEN NULL ELSE '/api/bilder/' || id END AS "photoUrl", teacher_comment AS "teacherComment", created_at AS "createdAt"
         FROM journal_entry WHERE org_id = $1 AND pupil_feide_id = $2 ORDER BY created_at DESC`,
      [viewer.orgId, viewer.feideId],
    );
    return rows;
  });

  app.post("/api/feltdagbok", async (request, reply) => {
    const viewer = request.viewer;
    let text = "";
    let photoKey: string | null = null;
    for await (const part of request.parts()) {
      if (part.type === "file" && part.fieldname === "photo" && part.filename) {
        photoKey = await storePhoto(viewer.orgId, await part.toBuffer(), part.mimetype);
      } else if (part.type === "field" && part.fieldname === "text") {
        text = String(part.value).slice(0, 2000);
      }
    }
    if (!text.trim()) return reply.code(400).send({ error: "Skriv noe om funnet ditt." });
    const { rows } = await pool.query(
      `INSERT INTO journal_entry (org_id, pupil_feide_id, pupil_group, text, photo_key)
       VALUES ($1, $2, $3, $4, $5) RETURNING id, text, created_at AS "createdAt"`,
      [viewer.orgId, viewer.feideId, viewer.groups[0] ?? null, text, photoKey],
    );
    return reply.code(201).send(rows[0]);
  });

  // A photo is shown to the pupil who took it, and to teachers of the pupil's group.
  app.get<{ Params: { id: string } }>("/api/bilder/:id", async (request, reply) => {
    const viewer = request.viewer;
    const { rows } = await pool.query(
      `SELECT photo_key FROM journal_entry
        WHERE id = $1 AND org_id = $2 AND (pupil_feide_id = $3 OR pupil_group = ANY($4))`,
      [request.params.id, viewer.orgId, viewer.feideId, viewer.role === "laerer" ? viewer.groups : []],
    );
    const photo = rows[0]?.photo_key ? await readPhoto(rows[0].photo_key) : null;
    if (!photo) return reply.code(404).send({ error: "Fant ikke bildet." });
    return reply.type(photo.contentType).header("Cache-Control", "private, max-age=300").send(Buffer.from(photo.body));
  });

  // «Fritekstkommentarer fra lærer»: a teacher comments on a find in one of their own groups.
  app.post<{ Params: { id: string } }>("/api/feltdagbok/:id/kommentar", async (request, reply) => {
    const viewer = request.viewer;
    if (viewer.role !== "laerer") return reply.code(403).send({ error: "Bare lærere kan kommentere." });
    const body = comment.parse(request.body);
    const { rows } = await pool.query(
      `UPDATE journal_entry SET teacher_comment = $1, commented_at = now()
        WHERE id = $2 AND org_id = $3 AND pupil_group = ANY($4)
        RETURNING id, text, teacher_comment AS "teacherComment"`,
      [body.text, request.params.id, viewer.orgId, viewer.groups],
    );
    if (rows.length === 0) return reply.code(404).send({ error: "Fant ikke funnet." });
    return rows[0];
  });
}
