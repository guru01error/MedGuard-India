# India-only catalog research

## Inclusion rule

For this migration, a record is retained only when a Tata 1mg India-market product page provides a named brand, an exact active ingredient or fixed-dose composition, and a strength. The Tata 1mg page URL is stored as the primary provenance source. A manufacturer being headquartered outside India is not, by itself, grounds for exclusion if the named product is marketed and sold in India; the dataset represents Indian-market medicines, not a claim about corporate nationality.

## Verified product references

- **Dolo 650 Tablet** — Tata 1mg identifies paracetamol 650 mg and Micro Labs Ltd as marketer. Reference: https://www.1mg.com/drugs/dolo-650-tablet-74467
- **Clavam 625 Tablet** — Tata 1mg identifies amoxycillin 500 mg plus clavulanic acid 125 mg and Alkem Laboratories Ltd as marketer. Reference: https://www.1mg.com/drugs/clavam-625-tablet-63841
- **Moxikind-CV 625 Tablet** — Tata 1mg identifies amoxycillin 500 mg plus clavulanic acid 125 mg and Mankind Pharma Ltd as marketer. Reference: https://www.1mg.com/drugs/moxikind-cv-625-tablet-329310
- **Keramycin 250 Capsule** — Tata 1mg identifies chloramphenicol 250 mg and Macwell Pharmaceuticals as marketer. Reference: https://www.1mg.com/drugs/keramycin-250mg-capsule-583743

## Source boundary

Tata 1mg pages can be captcha-protected and are used as product references, not as a bulk downloadable dataset. The app will not imply that it has copied Tata 1mg’s full catalog, prices, reviews, or proprietary data. Only the minimal medicine metadata required for normalization and safety prototyping will be retained.

## Additional direct Tata 1mg verification

- **Combiflam Tablet** — Tata 1mg lists Ibuprofen 400 mg plus Paracetamol 325 mg and Sanofi Consumer Healthcare India Limited as marketer. Reference: https://www.1mg.com/drugs/combiflam-tablet-325414
- **Warf 5 Tablet** — Tata 1mg lists Warfarin 5 mg and Cipla Ltd as marketer. Reference: https://www.1mg.com/drugs/warf-5-tablet-541663

## Oncology record audit

- **Tamoxifen Citrate 20mg Tablet** — Tata 1mg lists Tamoxifen 20 mg and Jan Aushadhi as marketer. Reference: https://www.1mg.com/drugs/tamoxifen-citrate-20mg-tablet-813615
- **Methotrexate 5 mg** — The selected Tata 1mg URL returned a temporary product error in the review session, so this record remains unverified from that URL and must be removed or replaced with a working direct Tata 1mg product page before the final migration.

## Additional direct Tata 1mg verification

- **MTX 5mg Tablet** — Tata 1mg lists Methotrexate 5 mg and Nexgen Rx Life Science Pvt Ltd as marketer. Reference: https://www.1mg.com/drugs/mtx-5mg-tablet-400030
- **Pantocid Tablet** — Tata 1mg lists Pantoprazole 40 mg and Sun Pharmaceutical Industries Ltd as marketer. Reference: https://www.1mg.com/drugs/pantocid-tablet-332527

## Final source boundary

The final catalog is India-market-only, not a claim that every record is sourced from Tata 1mg. Tata 1mg is the primary source for direct re-verified records; other India-based product pages are retained where Tata 1mg did not expose a matching page. Every retained record must have at least one source URL, and the UI labels the dataset as a curated India-market catalog rather than a full Tata 1mg export.

- **Benadryl Syrup** — Tata 1mg lists Diphenhydramine 14.08 mg/5 mL, Ammonium Chloride 138 mg/5 mL, and Sodium Citrate 57.03 mg/5 mL; marketer: JNTL Consumer Health (India) Pvt. Ltd. Reference: https://www.1mg.com/drugs/benadryl-syrup-114690
- **Augmentin 625 Duo** — Arka Health lists the India-market 500 mg amoxicillin plus 125 mg clavulanate combination. Reference: https://store.arka.health/product/augmentin-625-duo-tablets-a-stripe-of-10-tablets/
