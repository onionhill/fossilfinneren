import type { FastifyInstance } from "fastify";
import { pool } from "../db.js";

export async function classRoutes(app: FastifyInstance) {
  // «Klassekart over funnsteder»: the finds of one of the teacher's own groups.
  app.get<{ Params: { group: string } }>("/api/klasser/:group/funn", async (request, reply) => {
    const viewer = request.viewer;
    if (viewer.role !== "laerer" || !viewer.groups.includes(request.params.group)) {
      return reply.code(403).send({ error: "Du har ikke tilgang til denne gruppen." });
    }
    const { rows } = await pool.query(
      `SELECT p.display_name AS pupil, f.place, f.lat, f.lng
         FROM find f JOIN pupil p ON p.feide_id = f.pupil_feide_id AND p.org_id = f.org_id
        WHERE f.org_id = $1 AND f.pupil_group = $2`,
      [viewer.orgId, request.params.group],
    );
    return rows;
  });
}
