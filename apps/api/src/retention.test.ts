import { describe, expect, it } from "vitest";
import { deletionDate, isDue } from "./retention.js";

describe("retention", () => {
  const ended = new Date("2026-06-30T00:00:00Z");

  it("deletes 180 days after the subscription ended", () => {
    expect(deletionDate(ended, 180).toISOString()).toBe("2026-12-27T00:00:00.000Z");
  });

  it("is due only once that day has come, and never for an active subscription", () => {
    expect(isDue(ended, 180, new Date("2026-12-26T00:00:00Z"))).toBe(false);
    expect(isDue(ended, 180, new Date("2026-12-27T00:00:00Z"))).toBe(true);
    expect(isDue(null, 180, new Date("2030-01-01T00:00:00Z"))).toBe(false);
  });
});
