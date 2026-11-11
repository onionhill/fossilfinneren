import { describe, expect, it } from "vitest";
import { feideName, roleFromGroups, teachingGroups } from "./feideClaims.js";
import type { FeideGroup } from "./feideClaims.js";

const group = (id: string, type: string, membership: FeideGroup["membership"]): FeideGroup => ({
  id,
  type,
  displayName: id,
  membership,
});

describe("feideClaims", () => {
  it("finds the Feide name among the secondary ids", () => {
    expect(feideName(["nin:01010112345", "feide:ola@eksempel.no"])).toBe("ola@eksempel.no");
    expect(feideName(["nin:01010112345"])).toBeUndefined();
  });

  it("makes a teacher only of faculty in a teaching group", () => {
    expect(roleFromGroups([group("3a", "fc:gogroup", { affiliation: "faculty" })])).toBe("laerer");
    expect(roleFromGroups([group("3a", "fc:gogroup", { affiliation: "student" })])).toBe("elev");
  });

  it("gives no teacher rights for owning an ad hoc group", () => {
    expect(roleFromGroups([group("klubb", "fc:adhoc", { basic: "owner" })])).toBe("elev");
    expect(roleFromGroups([group("3a", "fc:gogroup", { basic: "admin", affiliation: "student" })])).toBe("elev");
  });

  it("keeps taught and attended groups apart, by id", () => {
    const result = teachingGroups([
      group("fc:gogroup:a", "fc:gogroup", { affiliation: "faculty" }),
      group("fc:gogroup:b", "fc:gogroup", { affiliation: "student" }),
      group("fc:adhoc:c", "fc:adhoc", { basic: "owner" }),
    ]);
    expect(result.taught.map((g) => g.id)).toEqual(["fc:gogroup:a"]);
    expect(result.attended.map((g) => g.id)).toEqual(["fc:gogroup:b"]);
  });
});
