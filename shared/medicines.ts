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
  sourceType: "India-market curated dataset" | "Tata 1mg India-market reference";
  sourceUrls?: string[];
  region?: "Karnataka" | "Telangana" | "Tamil Nadu" | "Kerala" | "Andhra Pradesh";
};

// Curated India-market catalog — streamlined, verified product-level records and sources.
export const brands: Brand[] = [
  {
    id: "dolo-650",
    brandName: "Dolo 650",
    aliases: ["dolo", "dolo650", "paracetamol 650"],
    manufacturer: "Micro Labs",
    category: "Analgesic / antipyretic",
    sourceType: "Tata 1mg India-market reference",
    sourceUrls: ["https://www.1mg.com/drugs/dolo-650-tablet-74467"],
    salts: [
      { salt: "Paracetamol", synonyms: ["Acetaminophen"], strength: "650 mg", amountPerUnitMg: 650, smiles: "CC(=O)NC1=CC=C(O)C=C1", inchikey: "RZVAJINKPMORJF-UHFFFAOYSA-N" },
    ],
  },
  {
    id: "crocin-advance",
    brandName: "Crocin Advance 500",
    aliases: ["crocin", "crocin advance", "paracetamol 500"],
    manufacturer: "GlaxoSmithKline Consumer Healthcare",
    category: "Analgesic / antipyretic",
    sourceType: "India-market curated dataset",
    sourceUrls: ["https://www.1mg.com/drugs/crocin-advance-500mg-tablet-11952"],
    salts: [
      { salt: "Paracetamol", synonyms: ["Acetaminophen"], strength: "500 mg", amountPerUnitMg: 500, smiles: "CC(=O)NC1=CC=C(O)C=C1", inchikey: "RZVAJINKPMORJF-UHFFFAOYSA-N" },
    ],
  },
  {
    id: "calpol-500",
    brandName: "Calpol 500",
    aliases: ["calpol", "calpol 500", "paracetamol tablet"],
    manufacturer: "GlaxoSmithKline Consumer Healthcare",
    category: "Analgesic / antipyretic",
    sourceType: "India-market curated dataset",
    sourceUrls: ["https://www.1mg.com/drugs/calpol-500mg-tablet-11302"],
    salts: [
      { salt: "Paracetamol", synonyms: ["Acetaminophen"], strength: "500 mg", amountPerUnitMg: 500, smiles: "CC(=O)NC1=CC=C(O)C=C1", inchikey: "RZVAJINKPMORJF-UHFFFAOYSA-N" },
    ],
  },
  {
    id: "combiflam",
    brandName: "Combiflam",
    aliases: ["combiflam tablet", "ibuprofen paracetamol"],
    manufacturer: "Sanofi Consumer Healthcare India Limited",
    category: "NSAID / analgesic",
    sourceType: "Tata 1mg India-market reference",
    sourceUrls: ["https://www.1mg.com/drugs/combiflam-tablet-325414"],
    salts: [
      { salt: "Ibuprofen", synonyms: [], strength: "400 mg", amountPerUnitMg: 400, smiles: "CC(C)CC1=CC=C(C=C1)C(C)C(=O)O", inchikey: "HEFNNWSXXWATRW-UHFFFAOYSA-N" },
      { salt: "Paracetamol", synonyms: ["Acetaminophen"], strength: "325 mg", amountPerUnitMg: 325, smiles: "CC(=O)NC1=CC=C(O)C=C1", inchikey: "RZVAJINKPMORJF-UHFFFAOYSA-N" },
    ],
  },
  {
    id: "amoxyclav-625",
    brandName: "Amoxyclav 625",
    aliases: ["amoxyclav", "amoxyclav625", "amoxicillin clavulanate"],
    manufacturer: "Abbott Healthcare Pvt Ltd",
    category: "Antibiotic / fixed-dose combination",
    sourceType: "India-market curated dataset",
    sourceUrls: ["https://www.pharmeasy.in/online-medicine-order/amoxyclav-625mg-tab-10-s-214164"],
    salts: [
      { salt: "Amoxicillin", synonyms: ["Amoxycillin"], strength: "500 mg", amountPerUnitMg: 500, smiles: "", inchikey: "" },
      { salt: "Clavulanic Acid", synonyms: ["Clavulanate"], strength: "125 mg", amountPerUnitMg: 125, smiles: "", inchikey: "" },
    ],
  },
  {
    id: "moxikind-cv-625",
    brandName: "Moxikind-CV 625",
    aliases: ["moxikind cv", "moxikind-cv", "moxikind cv 625"],
    manufacturer: "Mankind Pharma Ltd",
    category: "Antibiotic / fixed-dose combination",
    sourceType: "Tata 1mg India-market reference",
    sourceUrls: ["https://www.1mg.com/drugs/moxikind-cv-625-tablet-329310"],
    salts: [
      { salt: "Amoxicillin", synonyms: ["Amoxycillin"], strength: "500 mg", amountPerUnitMg: 500, smiles: "", inchikey: "" },
      { salt: "Clavulanic Acid", synonyms: ["Clavulanate"], strength: "125 mg", amountPerUnitMg: 125, smiles: "", inchikey: "" },
    ],
  },
  {
    id: "ecosprin-75",
    brandName: "Ecosprin 75",
    aliases: ["ecosprin", "ecosprin 75", "aspirin 75"],
    manufacturer: "USV Pvt Ltd",
    category: "Antiplatelet",
    sourceType: "India-market curated dataset",
    sourceUrls: ["https://www.apollopharmacy.in/medicine/ecosprin-75mg-tablet"],
    salts: [
      { salt: "Aspirin", synonyms: ["Acetylsalicylic acid"], strength: "75 mg", amountPerUnitMg: 75, smiles: "CC(=O)OC1=CC=CC=C1C(=O)O", inchikey: "BSYNRYMUTXBXSQ-UHFFFAOYSA-N" },
    ],
  },
  {
    id: "pantocid-40",
    brandName: "Pantocid 40",
    aliases: ["pantocid", "pantoprazole 40"],
    manufacturer: "Sun Pharma Laboratories",
    category: "Proton-pump inhibitor",
    sourceType: "India-market curated dataset",
    sourceUrls: ["https://pharmeasy.in/online-medicine-order/pantocid-40mg-strip-of-15-tablets-25758"],
    salts: [
      { salt: "Pantoprazole", synonyms: ["Pantoprazole sodium"], strength: "40 mg", amountPerUnitMg: 40, smiles: "COC1=NC=NC2=C1C(=NN2)S(=O)CC3=CC=C(C=C3)OC", inchikey: "IQPSEEYGBUAQFF-UHFFFAOYSA-N" },
    ],
  },
  {
    id: "brufen-400",
    brandName: "Brufen 400",
    aliases: ["brufen", "brufen 400", "ibuprofen 400"],
    manufacturer: "Abbott India Ltd",
    category: "NSAID / analgesic",
    sourceType: "India-market curated dataset",
    sourceUrls: ["https://pharmeasy.in/online-medicine-order/brufen-400mg-tablet-38362"],
    salts: [
      { salt: "Ibuprofen", synonyms: [], strength: "400 mg", amountPerUnitMg: 400, smiles: "CC(C)CC1=CC=C(C=C1)C(C)C(=O)O", inchikey: "HEFNNWSXXWATRW-UHFFFAOYSA-N" },
    ],
  },
  {
    id: "azee-500",
    brandName: "Azee 500",
    aliases: ["azee", "azee 500", "azithromycin 500"],
    manufacturer: "Cipla Ltd",
    category: "Macrolide antibiotic",
    sourceType: "India-market curated dataset",
    sourceUrls: ["https://www.apollopharmacy.in/medicine/azee-500mg-tablet"],
    salts: [
      { salt: "Azithromycin", synonyms: [], strength: "500 mg", amountPerUnitMg: 500, smiles: "", inchikey: "" },
    ],
  },
  {
    id: "medomol-500",
    brandName: "Medomol 500",
    aliases: ["medomol", "medomol 500", "medopharm paracetamol"],
    manufacturer: "Medopharm Pvt Ltd",
    category: "Analgesic / antipyretic",
    sourceType: "India-market curated dataset",
    sourceUrls: ["https://www.medopharm.com/radiant/medomol-paracetamol-500mg-tablets/"],
    salts: [
      { salt: "Paracetamol", synonyms: ["Acetaminophen"], strength: "500 mg", amountPerUnitMg: 500, smiles: "CC(=O)NC1=CC=C(O)C=C1", inchikey: "RZVAJINKPMORJF-UHFFFAOYSA-N" },
    ],
  },
  {
    id: "keramycin-250",
    brandName: "Keramycin 250",
    aliases: ["keramycin", "keramycin 250", "keramycin capsule", "chloramphenicol 250"],
    manufacturer: "Macwell Pharmaceuticals",
    category: "Antibiotic",
    sourceType: "Tata 1mg India-market reference",
    sourceUrls: ["https://www.1mg.com/drugs/keramycin-250mg-capsule-583743"],
    salts: [
      { salt: "Chloramphenicol", synonyms: [], strength: "250 mg", amountPerUnitMg: 250, smiles: "", inchikey: "" },
    ],
  },
  {
    id: "keramycin-ksdp-500",
    brandName: "Keramycin (KSDP) 500",
    aliases: ["keramycin ksdp", "keramycin azithromycin", "ksdp keramycin"],
    manufacturer: "Kerala State Drugs & Pharmaceuticals Ltd",
    category: "Antibiotic",
    sourceType: "India-market curated dataset",
    sourceUrls: ["https://ksdp.co.in/portfolio/tablets/", "https://kerala.gov.in/articledetail/OTE4MjY4NTE5LjUy/0"],
    region: "Kerala",
    salts: [
      { salt: "Azithromycin", synonyms: [], strength: "500 mg", amountPerUnitMg: 500, smiles: "", inchikey: "" },
    ],
  },
  {
    id: "allercet-l",
    brandName: "Allercet-L",
    aliases: ["allercet l", "allercet-l", "levocetirizine 5"],
    manufacturer: "Micro Labs Ltd",
    category: "Antihistamine",
    region: "Karnataka",
    sourceType: "India-market curated dataset",
    sourceUrls: [],
    salts: [
      { salt: "Levocetirizine", synonyms: [], strength: "5 mg", amountPerUnitMg: 5, smiles: "", inchikey: "" },
    ],
  },
  {
    id: "omez-20",
    brandName: "Omez 20",
    aliases: ["omez", "omez 20", "omeprazole 20"],
    manufacturer: "Dr Reddy's Laboratories Ltd",
    category: "Proton-pump inhibitor",
    region: "Telangana",
    sourceType: "India-market curated dataset",
    sourceUrls: [],
    salts: [
      { salt: "Omeprazole", synonyms: [], strength: "20 mg", amountPerUnitMg: 20, smiles: "", inchikey: "" },
    ],
  },
  {
    id: "toprazol-d",
    brandName: "Toprazol-D",
    aliases: ["toprazol d", "toprazol-d", "pantoprazole domperidone"],
    manufacturer: "Karnataka Antibiotics & Pharmaceuticals Ltd",
    category: "Proton-pump inhibitor / prokinetic",
    region: "Karnataka",
    sourceType: "India-market curated dataset",
    sourceUrls: ["https://www.kaplindia.com/toprazol-d/"],
    salts: [
      { salt: "Pantoprazole", synonyms: ["Pantoprazole sodium"], strength: "40 mg", amountPerUnitMg: 40, smiles: "", inchikey: "" },
      { salt: "Domperidone", synonyms: [], strength: "10 mg", amountPerUnitMg: 10, smiles: "", inchikey: "" },
    ],
  },
];

export const uniqueSaltCount = new Set(brands.flatMap((brand) => brand.salts.map((salt) => salt.salt))).size;

export function normalizeBrandQuery(query: string) {
  const normalized = query.trim().toLowerCase().replace(/[^a-z0-9]/g, "");
  return brands.filter((brand) => [brand.brandName, ...brand.aliases].some((value) => value.toLowerCase().replace(/[^a-z0-9]/g, "").includes(normalized)));
}

export function getBrandsByIds(ids: string[]) {
  return brands.filter((brand) => ids.includes(brand.id));
}
