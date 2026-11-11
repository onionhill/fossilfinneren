import { describe, expect, it } from "vitest";
import { readLanguage, translate } from "./index";
import { nb } from "./nb";
import { nn } from "./nn";

describe("i18n", () => {
  it("has every bokmål text in nynorsk too", () => {
    expect(Object.keys(nn).sort()).toEqual(Object.keys(nb).sort());
  });

  it("reads the lang cookie and falls back to bokmål", () => {
    expect(readLanguage("session_id=abc; lang=nn")).toBe("nn");
    expect(readLanguage("session_id=abc")).toBe("nb");
  });

  it("translates", () => {
    expect(translate("nn", "journalTitle")).toBe("Feltdagboka mi");
  });
});
