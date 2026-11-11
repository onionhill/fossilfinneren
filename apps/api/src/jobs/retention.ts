import { config } from "../config.js";
import { pool } from "../db.js";

// Runs nightly as a Kubernetes CronJob (deploy/k8s/cronjob-retention.yaml).
// Deletes all pupil data for schools whose subscription ended more than
// RETENTION_DAYS_AFTER_SUBSCRIPTION days ago.
const result = await pool.query(
  `DELETE FROM journal_entry
    WHERE org_id IN (
      SELECT org_id FROM subscription
       WHERE ended_at IS NOT NULL
         AND ended_at + make_interval(days => $1) <= now()
    )`,
  [config.RETENTION_DAYS_AFTER_SUBSCRIPTION],
);
console.log(`Slettet ${result.rowCount ?? 0} innslag i feltdagbøker`);
await pool.end();
