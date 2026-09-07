export type CatalogAuditEntry = {
  id: string;
  brandName: string;
  sourceProductName: string;
  primarySourceUrl: string;
};

/**
 * Human-reviewed India-market provenance register. The expected product title
 * is intentionally kept beside the catalog so future edits cannot silently
 * change a brand label without updating its source-backed audit entry.
 */
export const catalogAudit: CatalogAuditEntry[] = [
  { id: "dolo-650", brandName: "Dolo 650", sourceProductName: "Dolo 650 Tablet", primarySourceUrl: "https://www.1mg.com/drugs/dolo-650-tablet-74467" },
  { id: "combiflam", brandName: "Combiflam", sourceProductName: "Combiflam Tablet", primarySourceUrl: "https://www.1mg.com/drugs/combiflam-tablet-325414" },
  { id: "clavam-625", brandName: "Clavam 625", sourceProductName: "Clavam 625 Tablet", primarySourceUrl: "https://www.1mg.com/drugs/clavam-625-tablet-63841" },
  { id: "moxikind-cv-625", brandName: "Moxikind-CV 625", sourceProductName: "Moxikind-CV 625 Tablet", primarySourceUrl: "https://www.1mg.com/drugs/moxikind-cv-625-tablet-329310" },
  { id: "augmentin-625", brandName: "Augmentin 625 Duo", sourceProductName: "Augmentin 625 Duo Tablets", primarySourceUrl: "https://store.arka.health/product/augmentin-625-duo-tablets-a-stripe-of-10-tablets/" },
  { id: "benadryl", brandName: "Benadryl Syrup", sourceProductName: "Benadryl Syrup", primarySourceUrl: "https://www.1mg.com/drugs/benadryl-syrup-114690" },
  { id: "warf-5", brandName: "Warf 5", sourceProductName: "Warf 5 Tablet", primarySourceUrl: "https://www.1mg.com/drugs/warf-5-tablet-541663" },
  { id: "tamoxifen", brandName: "Tamoxifen Citrate 20mg Tablet", sourceProductName: "Tamoxifen Citrate 20mg Tablet", primarySourceUrl: "https://www.1mg.com/drugs/tamoxifen-citrate-20mg-tablet-813615" },
  { id: "methotrexate", brandName: "MTX 5mg Tablet", sourceProductName: "MTX 5mg Tablet", primarySourceUrl: "https://www.1mg.com/drugs/mtx-5mg-tablet-400030" },
  { id: "pantoprazole", brandName: "Pantocid Tablet", sourceProductName: "Pantocid Tablet", primarySourceUrl: "https://www.1mg.com/drugs/pantocid-tablet-332527" },
  { id: "azithral", brandName: "Azithral 500", sourceProductName: "Azithral 500mg Tablet", primarySourceUrl: "https://pharmeasy.in/online-medicine-order/azithral-500mg-tab-5-s-183974" },
  { id: "crocin-advance", brandName: "Crocin Advance 500", sourceProductName: "Crocin Advance 500mg Tablet", primarySourceUrl: "https://www.1mg.com/drugs/crocin-advance-500mg-tablet-11952" },
  { id: "calpol-500", brandName: "Calpol 500", sourceProductName: "Calpol 500mg Tablet", primarySourceUrl: "https://www.1mg.com/drugs/calpol-500mg-tablet-11302" },
  { id: "ecosprin-75", brandName: "Ecosprin 75", sourceProductName: "Ecosprin 75mg Tablet", primarySourceUrl: "https://www.apollopharmacy.in/medicine/ecosprin-75mg-tablet" },
  { id: "pantocid-40", brandName: "Pantocid 40", sourceProductName: "Pantocid 40mg Strip of 15 Tablets", primarySourceUrl: "https://pharmeasy.in/online-medicine-order/pantocid-40mg-strip-of-15-tablets-25758" },
  { id: "brufen-400", brandName: "Brufen 400", sourceProductName: "Brufen 400mg Tablet", primarySourceUrl: "https://pharmeasy.in/online-medicine-order/brufen-400mg-tablet-38362" },
  { id: "amoxyclav-625", brandName: "Amoxyclav 625", sourceProductName: "Amoxyclav 625mg Tablet", primarySourceUrl: "https://pharmeasy.in/online-medicine-order/amoxyclav-625mg-tab-10-s-214164" },
  { id: "azee-500", brandName: "Azee 500", sourceProductName: "Azee 500mg Tablet", primarySourceUrl: "https://www.apollopharmacy.in/medicine/azee-500mg-tablet" },
  { id: "allercet-l", brandName: "Allercet-L", sourceProductName: "Allercet-L Tablet", primarySourceUrl: "https://www.1mg.com/drugs/allercet-l-tablet-15414" },
  { id: "omez-20", brandName: "Omez 20", sourceProductName: "Omez 20 Capsule", primarySourceUrl: "https://pharmeasy.in/online-medicine-order/omez-20-cap-20-s-173904" },
  { id: "toprazol-d", brandName: "Toprazol-D", sourceProductName: "Toprazol-D", primarySourceUrl: "https://www.kaplindia.com/toprazol-d/" },
  { id: "medomol-500", brandName: "Medomol 500", sourceProductName: "Medomol Paracetamol 500mg Tablets", primarySourceUrl: "https://www.medopharm.com/radiant/medomol-paracetamol-500mg-tablets/" },
  { id: "keramycin-ksdp-500", brandName: "Keramycin (KSDP) 500", sourceProductName: "Keramycin 500", primarySourceUrl: "https://ksdp.co.in/portfolio/tablets/" },
  { id: "keramycin-250", brandName: "Keramycin 250", sourceProductName: "Keramycin 250mg Capsule", primarySourceUrl: "https://www.1mg.com/drugs/keramycin-250mg-capsule-583743" },
];

export const catalogAuditById = new Map(catalogAudit.map((entry) => [entry.id, entry]));

export function normalizeAuditName(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}

export function validateCatalogAudit(brands: Array<{ id: string; brandName: string; sourceUrls?: string[] }>) {
  return brands.every((brand) => {
    const audit = catalogAuditById.get(brand.id);
    if (!audit) return false;
    return normalizeAuditName(brand.brandName) === normalizeAuditName(audit.brandName) && Boolean(brand.sourceUrls?.includes(audit.primarySourceUrl));
  });
}
