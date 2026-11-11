import { readdir, readFile } from "node:fs/promises";
import { pool } from "./db.js";

const dir = new URL("../sql/", import.meta.url);
for (const file of (await readdir(dir)).filter((f) => f.endsWith(".sql")).sort()) {
  await pool.query(await readFile(new URL(file, dir), "utf8"));
  console.log(`Kjørte ${file}`);
}
await pool.end();
