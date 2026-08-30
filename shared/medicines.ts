export type Salt = {
  salt: string;
  synonyms: string[];
  strength: string;
  amountPerUnitMg?: number;
  smiles: string;
  inchikey: string;
};

export type Brand = {
  id: string;
  brandName: string;
  aliases: string[];
  manufacturer: string;
  category: string;
  salts: Salt[];
  sourceType: "Local curated prototype dataset";
};

export const brands: Brand[] = [
  { id: "dolo-650", brandName: "Dolo 650", aliases: ["dolo", "dolo650", "paracetamol 650"], manufacturer: "Micro Labs", category: "Analgesic / antipyretic", sourceType: "Local curated prototype dataset", salts: [{ salt: "Paracetamol", synonyms: ["Acetaminophen"], strength: "650 mg", amountPerUnitMg: 650, smiles: "CC(=O)NC1=CC=C(O)C=C1", inchikey: "RZVAJINKPMORJF-UHFFFAOYSA-N" }] },
  { id: "combiflam", brandName: "Combiflam", aliases: ["combiflam tablet", "ibuprofen paracetamol"], manufacturer: "Sanofi India", category: "NSAID / analgesic", sourceType: "Local curated prototype dataset", salts: [{ salt: "Ibuprofen", synonyms: ["Ibuprofenum"], strength: "400 mg", amountPerUnitMg: 400, smiles: "CC(C)CC1=CC=C(C=C1)C(C)C(=O)O", inchikey: "HEFNNWSXXWATRW-UHFFFAOYSA-N" }, { salt: "Paracetamol", synonyms: ["Acetaminophen"], strength: "325 mg", amountPerUnitMg: 325, smiles: "CC(=O)NC1=CC=C(O)C=C1", inchikey: "RZVAJINKPMORJF-UHFFFAOYSA-N" }] },
  { id: "augmentin-625", brandName: "Augmentin 625", aliases: ["augmentin", "augmentin625", "amoxicillin clavulanate"], manufacturer: "GSK", category: "Antibiotic", sourceType: "Local curated prototype dataset", salts: [{ salt: "Amoxicillin", synonyms: ["Amoxycillin"], strength: "500 mg", amountPerUnitMg: 500, smiles: "CC1(C(N2C(S1)C(C2=O)NC(=O)C(C3=CC=C(C=C3)O)N)C(=O)O)C", inchikey: "LSQZJLSUYDQPKJ-MBNYWOFBSA-N" }, { salt: "Clavulanic Acid", synonyms: ["Clavulanate"], strength: "125 mg", amountPerUnitMg: 125, smiles: "C1C2N(C1=O)C(C(O2)=CCO)C(=O)O", inchikey: "HNYUZQJHSCJIDK-UHFFFAOYSA-N" }] },
  { id: "benadryl", brandName: "Benadryl Cough Syrup", aliases: ["benadryl", "diphenhydramine syrup"], manufacturer: "Kenvue", category: "Antihistamine / cold", sourceType: "Local curated prototype dataset", salts: [{ salt: "Diphenhydramine", synonyms: ["Diphenhydramine HCl"], strength: "14 mg / 5 mL", amountPerUnitMg: 14, smiles: "CN(C)CCOC(C1=CC=CC=C1)C2=CC=CC=C2", inchikey: "ZZVUWRFHKOJYQO-UHFFFAOYSA-N" }] },
  { id: "warf-5", brandName: "Warf 5", aliases: ["warf", "warfarin 5", "warfarin"], manufacturer: "Cipla", category: "Anticoagulant", sourceType: "Local curated prototype dataset", salts: [{ salt: "Warfarin", synonyms: ["Warfarin sodium"], strength: "5 mg", amountPerUnitMg: 5, smiles: "CC(=O)CC(C1=CC=CC=C1)C2=C(C3=CC=CC=C3OC2=O)O", inchikey: "PJVWKTKQXJZVAA-UHFFFAOYSA-N" }] },
  { id: "tamoxifen", brandName: "Tamoxifen 20 mg", aliases: ["tamoxifen", "tamoxifen 20"], manufacturer: "Cipla", category: "Oncology / SERM", sourceType: "Local curated prototype dataset", salts: [{ salt: "Tamoxifen", synonyms: ["Tamoxifen citrate"], strength: "20 mg", amountPerUnitMg: 20, smiles: "CCC(=C(C1=CC=CC=C1)C2=CC=C(C=C2)OCCN(C)C)C3=CC=CC=C3", inchikey: "NKANXQFJJICGDU-UHFFFAOYSA-N" }] },
  { id: "methotrexate", brandName: "Methotrexate 5 mg", aliases: ["methotrexate", "mtx 5"], manufacturer: "Cipla", category: "Oncology / immunosuppressant", sourceType: "Local curated prototype dataset", salts: [{ salt: "Methotrexate", synonyms: ["MTX"], strength: "5 mg", amountPerUnitMg: 5, smiles: "CN(CC1=CN=C2C(=N1)C(=NC(=N2)N)N)C3=CC=C(C=C3)C(=O)NC(CCC(=O)O)C(=O)O", inchikey: "FBOZXEJYQVNJAA-UHFFFAOYSA-N" }] },
  { id: "pantoprazole", brandName: "Pantoprazole 40", aliases: ["pantoprazole", "pantop"], manufacturer: "Sun Pharma", category: "Proton-pump inhibitor", sourceType: "Local curated prototype dataset", salts: [{ salt: "Pantoprazole", synonyms: ["Pantoprazole sodium"], strength: "40 mg", amountPerUnitMg: 40, smiles: "COC1=NC=NC2=C1C(=NN2)S(=O)CC3=CC=C(C=C3)OC", inchikey: "IQPSEEYGBUAQFF-UHFFFAOYSA-N" }] },
  { id: "azithral", brandName: "Azithral 500", aliases: ["azithral", "azithromycin"], manufacturer: "Alembic", category: "Macrolide antibiotic", sourceType: "Local curated prototype dataset", salts: [{ salt: "Azithromycin", synonyms: ["Azithromycin dihydrate"], strength: "500 mg", amountPerUnitMg: 500, smiles: "CCC1C(C(C(C(C(O1)C)N(C)C)O)C)OC2C(C(C(C(O2)C)O)OC)N(C)C", inchikey: "MQTOSJVFKKJCRP-UHFFFAOYSA-N" }] },
];

export function normalizeBrandQuery(query: string) {
  const normalized = query.trim().toLowerCase().replace(/[^a-z0-9]/g, "");
  return brands.filter((brand) => [brand.brandName, ...brand.aliases].some((value) => value.toLowerCase().replace(/[^a-z0-9]/g, "").includes(normalized)));
}

export function getBrandsByIds(ids: string[]) {
  return brands.filter((brand) => ids.includes(brand.id));
}
