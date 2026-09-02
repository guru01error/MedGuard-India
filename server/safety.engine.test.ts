import { describe, expect, it } from "vitest";
import { brands, normalizeBrandQuery } from "../shared/medicines";
import { analyzeSafety, buildEvidenceExplanation } from "../shared/safety";

describe("medicine normalization", () => {
  it("resolves Indian aliases and fixed-dose combinations", () => {
    expect(normalizeBrandQuery("augmentin625")[0]?.brandName).toBe("Augmentin 625");
    expect(normalizeBrandQuery("dolo")[0]?.salts[0]?.salt).toBe("Paracetamol");
    expect(normalizeBrandQuery("combiflam")[0]?.salts).toHaveLength(2);
    expect(normalizeBrandQuery("ecosprin")[0]?.salts[0]?.salt).toBe("Aspirin");
    expect(normalizeBrandQuery("pantocid 40")[0]?.salts[0]?.strength).toBe("40 mg");
    expect(normalizeBrandQuery("crocin")[0]?.salts[0]?.amountPerUnitMg).toBe(500);
    expect(normalizeBrandQuery("brufen")[0]?.salts[0]?.salt).toBe("Ibuprofen");
    expect(normalizeBrandQuery("amoxyclav")[0]?.salts).toHaveLength(2);
    expect(normalizeBrandQuery("azee")[0]?.salts[0]?.salt).toBe("Azithromycin");
    expect(normalizeBrandQuery("allercet l")[0]?.salts[0]?.salt).toBe("Levocetirizine");
    expect(normalizeBrandQuery("omez20")[0]?.salts[0]?.salt).toBe("Omeprazole");
    expect(normalizeBrandQuery("toprazol d")[0]?.salts).toHaveLength(2);
    expect(normalizeBrandQuery("toprazol d")[0]?.region).toBe("Karnataka");
    expect(normalizeBrandQuery("medomol")[0]?.salts[0]?.salt).toBe("Paracetamol");
    expect(normalizeBrandQuery("keramycin capsule")[0]?.salts[0]?.salt).toBe("Chloramphenicol");
    expect(normalizeBrandQuery("keramycin capsule")[0]?.salts[0]?.strength).toBe("250 mg");
    expect(normalizeBrandQuery("ksdp keramycin")[0]?.salts[0]?.salt).toBe("Azithromycin");
    expect(normalizeBrandQuery("ksdp keramycin")[0]?.region).toBe("Kerala");
  });
});

describe("safety engine", () => {
  it("detects a curated warfarin and ibuprofen bleeding rule", () => {
    const result = analyzeSafety([brands.find((b) => b.id === "warf-5")!, brands.find((b) => b.id === "combiflam")!], [{ brandId: "warf-5", unitsPerDay: 1 }, { brandId: "combiflam", unitsPerDay: 1 }]);
    expect(result.findings[0]?.sourceType).toBe("Curated clinical rule");
    expect(result.findings[0]?.severity).toBe("CRITICAL");
  });
  it("totals overlapping paracetamol doses and flags threshold", () => {
    const result = analyzeSafety([brands.find((b) => b.id === "dolo-650")!, brands.find((b) => b.id === "combiflam")!], [{ brandId: "dolo-650", unitsPerDay: 6 }, { brandId: "combiflam", unitsPerDay: 1 }]);
    expect(result.totals.Paracetamol).toBe(4225);
    expect(result.findings.some((finding) => finding.sourceType === "Dose threshold rule")).toBe(true);
  });
  it("labels unmapped two-brand checks as predictive rather than curated", () => {
    const result = analyzeSafety([brands.find((b) => b.id === "dolo-650")!, brands.find((b) => b.id === "pantoprazole")!], [{ brandId: "dolo-650", unitsPerDay: 1 }, { brandId: "pantoprazole", unitsPerDay: 1 }]);
    expect(result.findings.some((finding) => finding.sourceType === "Predictive heuristic")).toBe(true);
  });
  it("keeps explanations scoped to selected names and findings", () => {
    const result = analyzeSafety([brands.find((b) => b.id === "warf-5")!, brands.find((b) => b.id === "combiflam")!], [{ brandId: "warf-5", unitsPerDay: 1 }, { brandId: "combiflam", unitsPerDay: 1 }]);
    const explanation = buildEvidenceExplanation(result.findings, ["Warf 5", "Combiflam"]);
    expect(explanation).toContain("Warf 5, Combiflam");
    expect(explanation).not.toContain("Augmentin");
  });
});
