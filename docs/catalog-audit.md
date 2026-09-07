# India-market catalog audit

This audit covers every retained record in `shared/medicines.ts`. The `brandName` column is the label exposed by MedGuard India, while `source product name` is the product-level title used to verify the label against the primary India-market reference. The executable registry is `shared/catalog-audit.ts`; the Vitest suite asserts that every catalog record has exactly one audit entry, that the names match, and that the primary URL is present on the record.

| ID | MedGuard brand name | Source product name | Primary source |
| --- | --- | --- | --- |
| `dolo-650` | Dolo 650 | Dolo 650 Tablet | [Tata 1mg](https://www.1mg.com/drugs/dolo-650-tablet-74467) |
| `combiflam` | Combiflam | Combiflam Tablet | [Tata 1mg](https://www.1mg.com/drugs/combiflam-tablet-325414) |
| `clavam-625` | Clavam 625 | Clavam 625 Tablet | [Tata 1mg](https://www.1mg.com/drugs/clavam-625-tablet-63841) |
| `moxikind-cv-625` | Moxikind-CV 625 | Moxikind-CV 625 Tablet | [Tata 1mg](https://www.1mg.com/drugs/moxikind-cv-625-tablet-329310) |
| `augmentin-625` | Augmentin 625 Duo | Augmentin 625 Duo Tablets | [Arka Health](https://store.arka.health/product/augmentin-625-duo-tablets-a-stripe-of-10-tablets/) |
| `benadryl` | Benadryl Syrup | Benadryl Syrup | [Tata 1mg](https://www.1mg.com/drugs/benadryl-syrup-114690) |
| `warf-5` | Warf 5 | Warf 5 Tablet | [Tata 1mg](https://www.1mg.com/drugs/warf-5-tablet-541663) |
| `tamoxifen` | Tamoxifen Citrate 20mg Tablet | Tamoxifen Citrate 20mg Tablet | [Tata 1mg](https://www.1mg.com/drugs/tamoxifen-citrate-20mg-tablet-813615) |
| `methotrexate` | MTX 5mg Tablet | MTX 5mg Tablet | [Tata 1mg](https://www.1mg.com/drugs/mtx-5mg-tablet-400030) |
| `pantoprazole` | Pantocid Tablet | Pantocid Tablet | [Tata 1mg](https://www.1mg.com/drugs/pantocid-tablet-332527) |
| `azithral` | Azithral 500 | Azithral 500mg Tablet | [PharmEasy](https://pharmeasy.in/online-medicine-order/azithral-500mg-tab-5-s-183974) |
| `crocin-advance` | Crocin Advance 500 | Crocin Advance 500mg Tablet | [Tata 1mg](https://www.1mg.com/drugs/crocin-advance-500mg-tablet-11952) |
| `calpol-500` | Calpol 500 | Calpol 500mg Tablet | [Tata 1mg](https://www.1mg.com/drugs/calpol-500mg-tablet-11302) |
| `ecosprin-75` | Ecosprin 75 | Ecosprin 75mg Tablet | [Apollo Pharmacy](https://www.apollopharmacy.in/medicine/ecosprin-75mg-tablet) |
| `pantocid-40` | Pantocid 40 | Pantocid 40mg Strip of 15 Tablets | [PharmEasy](https://pharmeasy.in/online-medicine-order/pantocid-40mg-strip-of-15-tablets-25758) |
| `brufen-400` | Brufen 400 | Brufen 400mg Tablet | [PharmEasy](https://pharmeasy.in/online-medicine-order/brufen-400mg-tablet-38362) |
| `amoxyclav-625` | Amoxyclav 625 | Amoxyclav 625mg Tablet | [PharmEasy](https://pharmeasy.in/online-medicine-order/amoxyclav-625mg-tab-10-s-214164) |
| `azee-500` | Azee 500 | Azee 500mg Tablet | [Apollo Pharmacy](https://www.apollopharmacy.in/medicine/azee-500mg-tablet) |
| `allercet-l` | Allercet-L | Allercet-L Tablet | [Tata 1mg](https://www.1mg.com/drugs/allercet-l-tablet-15414) |
| `omez-20` | Omez 20 | Omez 20 Capsule | [PharmEasy](https://pharmeasy.in/online-medicine-order/omez-20-cap-20-s-173904) |
| `toprazol-d` | Toprazol-D | Toprazol-D | [Karnataka Antibiotics & Pharmaceuticals](https://www.kaplindia.com/toprazol-d/) |
| `medomol-500` | Medomol 500 | Medomol Paracetamol 500mg Tablets | [Medopharm](https://www.medopharm.com/radiant/medomol-paracetamol-500mg-tablets/) |
| `keramycin-ksdp-500` | Keramycin (KSDP) 500 | Keramycin 500 | [KSDP](https://ksdp.co.in/portfolio/tablets/) |
| `keramycin-250` | Keramycin 250 | Keramycin 250mg Capsule | [Tata 1mg](https://www.1mg.com/drugs/keramycin-250mg-capsule-583743) |

## Audit interpretation

The catalog currently contains **24 brand records** and **17 unique active salts**. A source URL is retained on every record, and no record is included solely because of a generic ingredient name. The source register does not represent a complete Tata 1mg export; it is a curated India-market prototype and users must verify the dispensed pack, strength, dosage form, and current label before clinical use.
