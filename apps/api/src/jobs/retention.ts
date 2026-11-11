import { config } from "../config.js";
import { pool } from "../db.js";
import { deletePhotosForOrg } from "../storage.js";

// Runs nightly as a Kubernetes CronJob (deploy/k8s/cronjob-retention.yaml).
// Deletes everything about a school owner whose subscription ended more than
// RETENTION_DAYS_AFTER_SUBSCRIPTION days ago: the photos in object storage
// first, then the subscription row, which cascades to pupils, journal entries
// and finds. One school owner at a time, each in its own transaction, so a
// failure leaves the others done and that one to be retried the next night.
const { rows } = await pool.query<{ org_id: string }>(
  `SELECT org_id FROM subscription
    WHERE ended_at IS NOT NULL AND ended_at + make_interval(days => $1) <= now()`,
  [config.RETENTION_DAYS_AFTER_SUBSCRIPTION],
);

for (const { org_id: orgId } of rows) {
  const photos = await deletePhotosForOrg(orgId);
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await client.query("DELETE FROM subscription WHERE org_id = $1", [orgId]);
    await client.query("COMMIT");
    console.log(`Slettet alle data for ${orgId} (${photos} bilder)`);
  } catch (error) {
    await client.query("ROLLBACK");
    console.error(`Kunne ikke slette data for ${orgId}`, error);
    process.exitCode = 1;
  } finally {
    client.release();
  }
}
await pool.end();
