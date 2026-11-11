import { describe, expect, it } from "vitest";
import { feideName, roleFromGroups } from "./feideClaims.js";

describe("feide", () => {
  it("finds the Feide name among the secondary ids", () => {
    expect(feideName(["nin:01010112345", "feide:ola@eksempel.no"])).toBe("ola@eksempel.no");
    expect(feideName(["nin:01010112345"])).toBeUndefined();
  });

  it("treats faculty in a teaching group as a teacher", () => {
    expect(
      roleFromGroups([{ id: "g1", type: "fc:gogroup", displayName: "3A", membership: { affiliation: "faculty" } }]),
    ).toBe("laerer");
    expect(
      roleFromGroups([{ id: "g1", type: "fc:gogroup", displayName: "3A", membership: { affiliation: "student" } }]),
    ).toBe("elev");
  });
});
