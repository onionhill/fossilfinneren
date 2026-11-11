import { describe, expect, it } from "vitest";
import { gradesForAims, SUBJECT_CODES } from "./curriculum";

describe("curriculum", () => {
  it("covers naturfag 1st to 4th grade", () => {
    expect(SUBJECT_CODES.map((s) => s.code)).toEqual(["NAT0001", "NAT0002", "NAT0003", "NAT0004"]);
  });

  it("gives each grade once, lowest first", () => {
    expect(gradesForAims(["KM13825", "KM13810", "KM13811"])).toEqual(["aarstrinn2", "aarstrinn4"]);
  });
});
