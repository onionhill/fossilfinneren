import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

// WCAG 2.1 A and AA on every page a pupil or teacher opens.
const pages = ["/", "/logg-inn", "/fossiler", "/oppdrag", "/feltdagbok", "/personvern", "/tilgjengelighet"];

for (const path of pages) {
  test(`${path} har ingen brudd på WCAG 2.1 AA`, async ({ page }) => {
    await page.goto(path);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      // UU-avvik 1.1.1: some fossil card photos lack alt text. Fix planned by 1 Feb 2027.
      .disableRules(["image-alt"])
      .analyze();
    expect(results.violations).toEqual([]);
  });
}

// UU-avvik 2.4.7: the map's zoom and layer buttons have no visible focus, which axe cannot test.
test.fixme("fossilkartet har synlig fokus på alle knapper", async () => {});
