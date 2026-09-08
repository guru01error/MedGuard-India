import { useMemo, useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  AlertTriangle,
  BookOpen,
  ChevronDown,
  ChevronRight,
  ClipboardCheck,
  Database,
  ExternalLink,
  FlaskConical,
  HeartPulse,
  Info,
  Layers3,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  X,
  Loader2,
} from "lucide-react";
import { buildEvidenceExplanation } from "@shared/safety";
import { brands as localBrands, uniqueSaltCount } from "@shared/medicines";

const severityStyles: Record<string, string> = {
  CRITICAL: "bg-red-100 text-red-800 border-red-200",
  HIGH: "bg-orange-100 text-orange-800 border-orange-200",
  MODERATE: "bg-amber-100 text-amber-800 border-amber-200",
  LOW: "bg-emerald-100 text-emerald-800 border-emerald-200",
};

export default function Home() {
  const { data: catalog, isLoading: catalogLoading, isError: catalogError } = trpc.medicines.list.useQuery();
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [searchFocused, setSearchFocused] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [hasChecked, setHasChecked] = useState(false);
  const [assistantOpen, setAssistantOpen] = useState(false);
  const catalogData = catalog || localBrands;
  const selected = useMemo(() => catalogData.filter((brand) => selectedIds.includes(brand.id)), [catalogData, selectedIds]);
  const analysis = trpc.safety.analyze.useQuery(
    { brandIds: selectedIds, quantities: selectedIds.map((brandId) => ({ brandId, unitsPerDay: quantities[brandId] || 1 })) },
    { enabled: hasChecked && selectedIds.length > 0 }
  );

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return catalogData.slice(0, 6);
    const filtered = catalogData.filter((brand) =>
      [brand.brandName, ...brand.aliases, brand.category]
        .filter(Boolean)
        .some((value) => value.toLowerCase().replace(/[^a-z0-9]/g, "").includes(q.replace(/[^a-z0-9]/g, "")))
    );
    return filtered;
  }, [catalogData, query]);

  function handleSearchKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index) => Math.min(index + 1, Math.max(matches.length - 1, 0)));
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) => Math.max(index - 1, 0));
    }
    if (event.key === "Enter") {
      event.preventDefault();
      const item = matches[activeIndex];
      if (item) addBrand(item.id);
    }
  }

  function addBrand(id: string) {
    if (!selectedIds.includes(id)) {
      setSelectedIds((current) => [...current, id]);
      setQuantities((current) => ({ ...current, [id]: 1 }));
    }
    setQuery("");
    setActiveIndex(0);
    setSearchFocused(false);
    setHasChecked(false);
  }
  function removeBrand(id: string) {
    setSelectedIds((current) => current.filter((value) => value !== id));
    setHasChecked(false);
  }

  return (
    <main className="medguard-page min-h-screen text-slate-950">
      <header className="medguard-header border-b border-slate-200/80 bg-white/95 backdrop-blur sticky top-0 z-10">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-4 lg:px-10">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-2xl bg-[#0f766e] text-white shadow-lg shadow-teal-900/15">
              <ShieldCheck size={21} />
            </div>
            <div>
              <div className="font-display text-lg font-semibold tracking-tight">
                MedGuard <span className="text-[#0f766e]">India</span>
              </div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                Clinical safety workspace
              </div>
            </div>
          </div>
          <div className="hidden items-center gap-3 text-sm text-slate-500 md:flex">
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500" /> Prototype dataset online
            </span>
            <span className="h-5 w-px bg-slate-200" />
            <span>Evidence-limited by design</span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => document.getElementById("reference")?.scrollIntoView({ behavior: "smooth" })}
              className="hidden rounded-full border-slate-300 bg-white md:flex"
            >
              About this tool <Info size={15} className="ml-2" />
            </Button>
            <Button variant="ghost" className="md:hidden" onClick={() => document.getElementById("reference")?.scrollIntoView({ behavior: "smooth" })}>
              About
            </Button>
          </div>
        </div>
      </header>

      <div className="medguard-content mx-auto grid max-w-[1440px] gap-8 px-5 py-8 lg:grid-cols-[minmax(0,1fr)_380px] lg:px-10 lg:py-10">
        <section className="space-y-7">
          <div className="medguard-hero max-w-3xl">
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#0f766e]">
              <Stethoscope size={16} /> Calm clarity for complex regimens
            </div>
            <h1 className="font-display text-4xl font-semibold leading-[1.03] tracking-[-0.04em] text-slate-950 md:text-6xl">
              Check the full picture
              <br />
              <span className="text-[#0f766e]">before the next dose.</span>
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
              Resolve Indian medicine brands into their active salts, then review known interaction signals, overlapping doses, and transparent evidence labels in one focused workspace.
            </p>
          </div>

          <Card className="medguard-workspace overflow-hidden rounded-[28px] border-slate-200 bg-white shadow-[0_18px_60px_rgba(15,118,110,0.08)]">
            <CardHeader className="border-b border-slate-100 bg-white/50 p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-sm font-semibold text-slate-600">Medicine workspace</div>
                  <div className="mt-1 text-xs text-slate-400">Search for Indian brands or pick from the quick-start list below.</div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="hidden sm:inline-flex">
                    {catalogData.length} records
                  </Badge>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-6">
              <div className="mb-4 grid gap-3 sm:grid-cols-[1fr_120px]">
                <Input
                  placeholder="Search medicine (eg. 'dolo', 'combiflam', 'amoxyclav')"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleSearchKeyDown}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                />
                <Button onClick={() => { setQuery(""); document.activeElement instanceof HTMLElement && (document.activeElement as HTMLElement).blur(); }}>
                  Clear
                </Button>
              </div>

              {catalogLoading ? (
                <div className="flex items-center gap-3 rounded-2xl border border-teal-100 bg-white p-5">
                  <Loader2 className="animate-spin" />
                  <div>
                    <div className="font-semibold">Loading catalog…</div>
                    <div className="text-sm text-slate-500">Fetching the curated India-market dataset.</div>
                  </div>
                </div>
              ) : (
                <>
                  {matches.length === 0 ? (
                    <div className="rounded-2xl border border-amber-100 bg-amber-50 p-5">
                      <div className="font-semibold">No matches</div>
                      <div className="mt-1 text-sm text-slate-600">Try a different spelling or clear filters. You can also pick a brand from the quick-start suggestions below.</div>
                      <div className="mt-3">
                        <Button variant="outline" onClick={() => setQuery("")}>Reset search</Button>
                      </div>
                    </div>
                  ) : (
                    <ul className="divide-y mt-2">
                      {matches.map((brand, idx) => (
                        <li key={brand.id} className={`py-3 flex items-center justify-between ${idx === activeIndex ? "bg-slate-50" : ""}`}>
                          <div>
                            <div className="font-medium">{brand.brandName}</div>
                            <div className="text-sm text-slate-500">{brand.manufacturer} · {brand.category}</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button size="sm" onClick={() => addBrand(brand.id)}>Add</Button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Quick-start empty guidance */}
                  {selectedIds.length === 0 && !query && (
                    <div className="mt-6 rounded-2xl border border-slate-100 bg-white p-5">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold">Quick start</div>
                          <div className="mt-1 text-sm text-slate-500">Pick one or more common brands to run a safety check.</div>
                        </div>
                        <div>
                          <Button onClick={() => { setSelectedIds(["dolo-650", "combiflam"]); setQuantities({ "dolo-650": 1, combiflam: 1 }); }}>
                            Try example
                          </Button>
                        </div>
                      </div>

                      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                        {catalogData.slice(0, 6).map((b) => (
                          <button key={b.id} onClick={() => addBrand(b.id)} className="rounded-lg border p-3 text-left hover:bg-slate-50">
                            <div className="font-medium">{b.brandName}</div>
                            <div className="text-xs text-slate-500">{b.category}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Selected brands & run check */}
                  {selectedIds.length > 0 && (
                    <div className="mt-6">
                      <div className="flex items-center justify-between">
                        <div className="font-semibold">Selected ({selectedIds.length})</div>
                        <div className="flex items-center gap-2">
                          <Button onClick={() => { setSelectedIds([]); setQuantities({}); setHasChecked(false); }}>Clear</Button>
                          <Button onClick={() => setHasChecked(true)}>Run safety check</Button>
                        </div>
                      </div>

                      <div className="mt-3 grid gap-3">
                        {selected.map((b) => (
                          <div key={b.id} className="flex items-center justify-between rounded-lg border p-3">
                            <div>
                              <div className="font-medium">{b.brandName}</div>
                              <div className="text-sm text-slate-500">{b.manufacturer}</div>
                            </div>
                            <div className="flex items-center gap-3">
                              <input
                                aria-label={`Units per day for ${b.brandName}`}
                                type="number"
                                min={0}
                                value={quantities[b.id] ?? 1}
                                onChange={(e) => setQuantities((cur) => ({ ...cur, [b.id]: Math.max(0, Number(e.target.value)) }))}
                                className="w-20 rounded-md border p-1 text-right"
                              />
                              <Button variant="ghost" onClick={() => removeBrand(b.id)}>Remove</Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {hasChecked && analysis.isLoading && (
                    <div className="medguard-state rounded-2xl border border-teal-100 bg-white p-5" role="status">
                      <div className="flex items-center gap-3">
                        <Loader2 className="animate-spin" />
                        <div>
                          <div className="font-semibold">Analyzing…</div>
                          <div className="text-sm text-slate-500">Building safety signals for the selected medicines.</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {hasChecked && analysis.data && (
                    <div className="mt-6">
                      {/* Simplified result rendering to keep Home.tsx focused — details available in the Assistant dialog */}
                      <div className="rounded-lg border p-4">
                        <div className="font-semibold">Analysis results</div>
                        <div className="mt-2 text-sm text-slate-600">{analysis.data.findings.length} findings · {Object.keys(analysis.data.totals || {}).length} totals</div>
                        <div className="mt-3 grid gap-3">
                          {analysis.data.findings.map((f: any, i: number) => (
                            <div key={i} className="rounded-lg border p-3">
                              <div className="flex items-center justify-between">
                                <div className="font-medium">{f.title}</div>
                                <div className={`px-2 py-1 rounded text-xs ${severityStyles[f.severity] ?? "bg-slate-100"}`}>{f.severity}</div>
                              </div>
                              <div className="mt-2 text-sm text-slate-500">{f.description}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </section>

        <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
          <div className="medguard-sidebar-card rounded-[28px] bg-[#123d3a] p-6 text-white shadow-xl shadow-teal-950/10">
            <div className="flex items-center gap-3">
              <ShieldCheck />
              <div>
                <div className="font-semibold">India-market curated dataset</div>
                <div className="text-sm text-teal-100">Focused on common brands available in India.</div>
              </div>
            </div>

            <div className="mt-4 text-sm text-teal-100">
              <div>Salts: {uniqueSaltCount}</div>
              <div className="mt-2">Evidence-limited prototype — always verify with the dispensed pack.</div>
            </div>
          </div>

          <div className="rounded-[28px] border-slate-200 bg-white p-6">
            <div className="font-semibold">Quick links</div>
            <div className="mt-3 grid gap-2">
              <a className="text-sm text-slate-600 hover:underline" href="#reference">References & sources</a>
              <a className="text-sm text-slate-600 hover:underline" href="#">User guide</a>
              <a className="text-sm text-slate-600 hover:underline" href="#">Report an issue</a>
            </div>
          </div>
        </aside>
      </div>

      <ReferenceSections />

      {assistantOpen && analysis.data && (
        <div className="fixed inset-0 z-30 grid place-items-center bg-slate-950/30 p-5" role="dialog" aria-modal="true">
          <div className="w-full max-w-lg rounded-[28px] bg-white p-6">
            <div className="flex items-center justify-between">
              <div className="font-semibold">Assistant</div>
              <button onClick={() => setAssistantOpen(false)} aria-label="Close">
                <X />
              </button>
            </div>
            <div className="mt-4">
              <pre className="whitespace-pre-wrap text-sm">{JSON.stringify(analysis.data, null, 2)}</pre>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

function ReferenceSections() {
  const modules = [
    ["Frontend", "React 19, TypeScript, Vite", "Responsive dashboard UI and local interaction state."],
    ["Data layer", "tRPC 11 + TanStack Query", "Typed procedures with loading, error, and cache states."],
    ["Backend", "Express 4 + tRPC server", "Typed catalog and safety-analysis procedures."],
    ["Persistence", "Drizzle ORM + MySQL/TiDB", "User and authentication persistence; catalog remains local."],
    ["Testing", "Vitest + TypeScript", "Normalization, dose totals, rules, predictive labels, and scope tests."],
  ];
  const salts = ["Paracetamol", "Ibuprofen", "Amoxicillin", "Clavulanic Acid", "Diphenhydramine", "Warfarin", "Tamoxifen", "Methotrexate", "Pantoprazole", "Azithromycin", "Aspirin", "Domperidone"];
  const rules = [
    ["CYP2D6", "Tamoxifen + diphenhydramine", "Potential reduction in tamoxifen activation"],
    ["Bleeding", "Warfarin + ibuprofen", "Elevated bleeding hazard"],
    ["Renal clearance", "Methotrexate + amoxicillin", "Potential methotrexate accumulation"],
    ["QT risk", "Azithromycin + tamoxifen", "Potential additive cardiac-repolarization risk"],
  ];
  const references = [
    ["Tata 1mg", "Dolo 650 Tablet", "https://www.1mg.com/drugs/dolo-650-tablet-74467"],
    ["Tata 1mg", "Clavam 625 Tablet", "https://www.1mg.com/drugs/clavam-625-tablet-63841"],
    ["Tata 1mg", "Moxikind-CV 625 Tablet", "https://www.1mg.com/drugs/moxikind-cv-625-tablet-329310"],
    ["Karnataka Antibiotics & Pharmaceuticals", "Toprazol-D", "https://www.kaplindia.com/toprazol-d/"],
    ["Medopharm", "Medomol 500", "https://www.medopharm.com/radiant/medomol-paracetamol-500mg-tablets/"],
    ["Kerala Government", "KSDP Keramycin announcement", "https://kerala.gov.in/articledetail/OTE4MjY4NTE5LjUy/0"],
  ];

  return (
    <section id="reference" className="reference-section mx-auto mt-10 max-w-[1440px] scroll-mt-24 px-5 pb-16 lg:px-10">
      <div className="reference-banner overflow-hidden rounded-[32px] bg-[#123d3a] p-6 text-white shadow-xl shadow-teal-950/10 md:p-10">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-teal-100">
              <BookOpen size={16} /> Reference materials
            </div>
            <h2 className="font-display text-2xl font-semibold">Catalog sources & safety notes</h2>
            <p className="mt-3 text-sm text-teal-100">Curated India-market records with product-level references where available. This workspace is a prototype and evidence-limited by design.</p>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.15fr_.85fr]">
        <Card className="rounded-[28px] border-slate-200 bg-white">
          <CardHeader>
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-teal-700">
              <Layers3 size={16} /> How the product works
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-slate-600">This prototype resolves brand names into active salts and applies a set of curated rules and predictive heuristics to highlight potential safety signals. Always verify with product labels and clinical judgement.</div>
          </CardContent>
        </Card>

        <Card className="rounded-[28px] border-slate-200 bg-white">
          <CardHeader>
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-violet-700">
              <Database size={16} /> Local catalog
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-slate-600">Records are curated for India-market brands. Sources are retained where direct product pages were available; the app does not replicate third-party proprietary catalog data.</div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[.9fr_1.1fr]">
        <Card className="rounded-[28px] border-slate-200 bg-white">
          <CardHeader>
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-rose-700">
              <HeartPulse size={16} /> Safety engine
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-slate-600">The safety engine combines curated clinical rules with dose aggregation and predictive heuristics. It is a decision-support prototype, not a substitute for clinical care.</div>
          </CardContent>
        </Card>

        <Card className="rounded-[28px] border-slate-200 bg-white">
          <CardHeader>
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-sky-700">
              <ExternalLink size={16} /> Evidence registry
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-slate-600">Each curated record includes at least one product-level reference when available. Records without direct product pages are noted in the dataset documentation.</div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 rounded-[28px] border border-amber-200 bg-amber-50 p-6 md:p-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-start">
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-amber-100 text-amber-700">
            <AlertTriangle />
          </div>
          <div>
            <div className="font-semibold">Safety & limitations</div>
            <div className="mt-2 text-sm text-amber-900">This system is a prototype. It may omit brands, strengths, or formulations found in local pharmacies. Confirm labels on the dispensed pack before making clinical decisions.</div>
          </div>
        </div>
      </div>
    </section>
  );
}
