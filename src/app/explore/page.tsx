"use client";
import Link from "next/link";
import {
  BarChart3,
  Check,
  CheckCircle,
  ChevronDown,
  ClipboardCheck,
  Leaf,
  Search,
  X,
} from "lucide-react";
import {
  type KeyboardEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  MarketplaceFooter,
  MarketplaceHeader,
} from "@/components/marketplace/MarketplaceShell";
import { DiscoverCard } from "@/components/discover/DiscoverCard";
import {
  discoverProducts,
  DiscoverCategory,
  DiscoverPath,
} from "@/data/discover-products";

/* ---------- Style tokens (shared with homepage) ---------- */
const display = "font-[family-name:var(--font-display,Georgia,serif)]";
const body = "font-[family-name:var(--font-body,system-ui,sans-serif)]";
const focus =
  "focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#12705A]";
const card =
  "rounded-2xl border border-[#E4E7EB] bg-white shadow-[0_1px_2px_rgba(17,24,39,0.04)]";
const h2 = `${display} text-[1.7rem] leading-tight font-normal tracking-[-0.01em] sm:text-[2.1rem]`;

/* ---------- Data ---------- */
const paths: { value: DiscoverPath; label: string }[] = [
  { value: "sell", label: "Jual" },
  { value: "swap", label: "Tukar" },
  { value: "donate", label: "Donasi" },
  { value: "repair", label: "Perlu Perbaikan" },
  { value: "parts", label: "Suku Cadang" },
];

const categories: { value: DiscoverCategory; label: string }[] = [
  { value: "electronics", label: "Elektronik Kecil" },
  { value: "furniture", label: "Furnitur Kecil" },
  { value: "study", label: "Perlengkapan Belajar" },
  { value: "textile", label: "Tekstil Rumah" },
];

const scoreTiers = [
  { value: 80, label: "Sangat baik (80+)" },
  { value: 65, label: "Kondisi baik (65+)" },
  { value: 45, label: "Cukup, mungkin perlu servis (45+)" },
  { value: 0, label: "Semua kondisi" },
];

const sortOptions = [
  { value: "score", label: "Skor kondisi tertinggi" },
  { value: "price-low", label: "Harga terendah" },
  { value: "price-high", label: "Harga tertinggi" },
];

const PAGE_SIZE = 9;

const dataPrices = discoverProducts.map((p) => p.price);
const PRICE_MIN = dataPrices.length ? Math.min(...dataPrices) : 0;
const PRICE_MAX_RAW = dataPrices.length ? Math.max(...dataPrices) : 2_000_000;
const PRICE_MAX = Math.ceil(PRICE_MAX_RAW / 50_000) * 50_000;
const PRICE_STEP = Math.max(
  10_000,
  Math.round((PRICE_MAX - PRICE_MIN) / 40 / 10_000) * 10_000,
);

const formatRupiah = (value: number) => `Rp ${value.toLocaleString("id-ID")}`;

/* ---------- Dropdown urutan (sama gayanya dengan homepage) ---------- */
function SortMenu({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const current = sortOptions.find((o) => o.value === value) ?? sortOptions[0];

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  useEffect(() => {
    if (open) {
      root.current
        ?.querySelector<HTMLElement>('[aria-selected="true"]')
        ?.focus();
    }
  }, [open]);

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape" && open) {
      setOpen(false);
      trigger.current?.focus();
      return;
    }
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
    e.preventDefault();
    if (!open) {
      setOpen(true);
      return;
    }
    const items = Array.from(
      root.current?.querySelectorAll<HTMLElement>('[role="option"]') ?? [],
    );
    const i = items.indexOf(document.activeElement as HTMLElement);
    const next =
      e.key === "ArrowDown"
        ? (i + 1) % items.length
        : (i - 1 + items.length) % items.length;
    items[next]?.focus();
  };

  return (
    <div ref={root} onKeyDown={onKeyDown} className="relative w-full sm:w-auto">
      <button
        ref={trigger}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className={`flex min-h-11 w-full cursor-pointer items-center justify-between gap-3 rounded-xl border bg-white px-4 text-[0.9rem] font-semibold text-[#111827] transition-colors hover:border-[#0B4F3F] sm:w-auto sm:min-w-[14rem] ${focus} ${
          open ? "border-[#0B4F3F]" : "border-[#E4E7EB]"
        }`}
      >
        <span className="flex items-center gap-2">
          <span className="font-normal text-[#5B6675]">Urutkan:</span>
          {current.label}
        </span>
        <ChevronDown
          size={16}
          className={`shrink-0 text-[#5B6675] transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label="Urutkan katalog"
          className="absolute right-0 z-30 mt-2 w-full min-w-[14rem] rounded-xl border border-[#E4E7EB] bg-white p-1.5 shadow-[0_16px_40px_-12px_rgba(17,24,39,0.25)] sm:w-max"
        >
          {sortOptions.map((o) => {
            const selected = o.value === value;
            return (
              <li key={o.value} role="presentation">
                <button
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onClick={() => {
                    onChange(o.value);
                    setOpen(false);
                    trigger.current?.focus();
                  }}
                  className={`flex w-full cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left text-[0.9rem] whitespace-nowrap transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#12705A] focus-visible:ring-inset ${
                    selected
                      ? "bg-[#E6F2ED] font-semibold text-[#0B4F3F]"
                      : "text-[#111827] hover:bg-[#F3F4F2]"
                  }`}
                >
                  {o.label}
                  {selected && <Check size={16} />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default function ExplorePage() {
  return (
    <>
      <style>{`
        .range-thumb::-webkit-slider-thumb {
          pointer-events: auto;
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 9999px;
          background: #0B4F3F;
          border: 2px solid white;
          box-shadow: 0 1px 3px rgba(17,24,39,0.3);
          cursor: pointer;
        }
        .range-thumb::-moz-range-thumb {
          pointer-events: auto;
          width: 16px;
          height: 16px;
          border-radius: 9999px;
          background: #0B4F3F;
          border: 2px solid white;
          box-shadow: 0 1px 3px rgba(17,24,39,0.3);
          cursor: pointer;
        }
      `}</style>
      <ExplorePageContent />
    </>
  );
}

function ExplorePageContent() {
  const [query, setQuery] = useState("");
  const [selectedPaths, setSelectedPaths] = useState<DiscoverPath[]>([]);
  const [category, setCategory] = useState<DiscoverCategory | "all">("all");
  const [minimumScore, setMinimumScore] = useState(0);
  const [minimumPrice, setMinimumPrice] = useState(PRICE_MIN);
  const [maximumPrice, setMaximumPrice] = useState(PRICE_MAX);
  const [electricCourier, setElectricCourier] = useState(true);
  const [transitDropoff, setTransitDropoff] = useState(false);
  const [sort, setSort] = useState("score");
  const [page, setPage] = useState(1);

  const pathCounts = useMemo(() => {
    const counts: Partial<Record<DiscoverPath, number>> = {};
    for (const product of discoverProducts) {
      counts[product.path] = (counts[product.path] ?? 0) + 1;
    }
    return counts;
  }, []);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const result = discoverProducts.filter(
      (product) =>
        product.title.toLowerCase().includes(normalized) &&
        (selectedPaths.length === 0 || selectedPaths.includes(product.path)) &&
        (category === "all" || product.category === category) &&
        product.score >= minimumScore &&
        product.price >= minimumPrice &&
        product.price <= maximumPrice,
    );
    return [...result].sort((a, b) =>
      sort === "price-low"
        ? a.price - b.price
        : sort === "price-high"
          ? b.price - a.price
          : b.score - a.score,
    );
  }, [
    category,
    maximumPrice,
    minimumPrice,
    minimumScore,
    query,
    selectedPaths,
    sort,
  ]);

  const filterKey = JSON.stringify({
    category,
    maximumPrice,
    minimumPrice,
    minimumScore,
    query,
    selectedPaths,
    sort,
  });

  const [prevFilterKey, setPrevFilterKey] = useState(filterKey);
  if (filterKey !== prevFilterKey) {
    setPrevFilterKey(filterKey);
    setPage(1);
  }

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginated = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const priceSpan = PRICE_MAX - PRICE_MIN || 1;
  const minPercent = ((minimumPrice - PRICE_MIN) / priceSpan) * 100;
  const maxPercent = ((maximumPrice - PRICE_MIN) / priceSpan) * 100;

  function togglePath(path: DiscoverPath) {
    setSelectedPaths((current) =>
      current.includes(path)
        ? current.filter((item) => item !== path)
        : [...current, path],
    );
  }

  function handleMinPrice(value: number) {
    setMinimumPrice(Math.min(value, maximumPrice));
  }
  function handleMaxPrice(value: number) {
    setMaximumPrice(Math.max(value, minimumPrice));
  }

  function reset() {
    setSelectedPaths([]);
    setCategory("all");
    setMinimumScore(0);
    setMinimumPrice(PRICE_MIN);
    setMaximumPrice(PRICE_MAX);
    setElectricCourier(true);
    setTransitDropoff(false);
    setSort("score");
    setQuery("");
  }

  const hasActiveFilters =
    selectedPaths.length > 0 ||
    minimumScore > 0 ||
    category !== "all" ||
    minimumPrice > PRICE_MIN ||
    maximumPrice < PRICE_MAX;

  return (
    <div
      className={`${body} min-h-screen bg-[#F7F8F7] text-[#111827] antialiased`}
    >
      <MarketplaceHeader />

      {/* ============ Breadcrumb bar ============ */}
      <div className="border-b border-[#E4E7EB] bg-white">
        <div className="mx-auto flex w-full max-w-[1200px] flex-wrap items-center justify-between gap-2 px-4 py-3 text-sm sm:px-6">
          <span className="text-[#5B6675]">
            <Link
              href="/"
              className={`no-underline hover:!text-[#0B4F3F] hover:underline ${focus}`}
            >
              Beranda
            </Link>{" "}
            › <b className="text-[#111827]">Temukan</b> · {filtered.length}{" "}
            barang sesuai filter
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E6F2ED] px-3 py-1 text-xs font-semibold text-[#0B4F3F]">
            <ClipboardCheck size={14} /> Setiap barang melalui inspeksi adaptif
          </span>
        </div>
      </div>

      <main className="mx-auto w-full max-w-[1200px] px-4 py-8 sm:px-6 sm:py-12">
        <div className="grid items-start gap-8 lg:grid-cols-[18rem_1fr]">
          {/* ============ Sidebar filter ============ */}
          <aside className={`${card} h-fit p-6 lg:sticky lg:top-6`}>
            <div className="flex items-center justify-between">
              <b className="text-[0.95rem]">Filter</b>
              {hasActiveFilters && (
                <button
                  onClick={reset}
                  className={`rounded-md text-sm font-semibold text-[#0B4F3F] hover:underline ${focus}`}
                >
                  Reset
                </button>
              )}
            </div>

            <div className="mt-5 divide-y divide-[#EDEFEC] [&>fieldset]:py-5 [&>fieldset:first-child]:pt-0 [&>fieldset:last-child]:pb-0">
              <fieldset>
                <legend className="text-sm font-semibold">
                  Jalur Sirkular
                </legend>
                <div className="mt-3 flex flex-col gap-2.5">
                  {paths.map((path) => (
                    <label
                      key={path.value}
                      className="flex cursor-pointer items-center justify-between gap-3 text-sm"
                    >
                      <span className="flex items-center gap-2.5">
                        <input
                          type="checkbox"
                          checked={selectedPaths.includes(path.value)}
                          onChange={() => togglePath(path.value)}
                          className="h-4 w-4 rounded border-[#CBD0D6] text-[#0B4F3F] focus-visible:outline-[#12705A]"
                        />
                        {path.label}
                      </span>
                      <span className="text-[#5B6675]">
                        {pathCounts[path.value] ?? 0}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <fieldset>
                <legend className="text-sm font-semibold">Kategori</legend>
                <div className="mt-3 flex flex-col gap-2.5">
                  <label className="flex cursor-pointer items-center gap-2.5 text-sm">
                    <input
                      type="radio"
                      name="category"
                      checked={category === "all"}
                      onChange={() => setCategory("all")}
                      className="h-4 w-4 border-[#CBD0D6] text-[#0B4F3F] focus-visible:outline-[#12705A]"
                    />
                    Semua kategori
                  </label>
                  {categories.map((item) => (
                    <label
                      key={item.value}
                      className="flex cursor-pointer items-center gap-2.5 text-sm"
                    >
                      <input
                        type="radio"
                        name="category"
                        checked={category === item.value}
                        onChange={() => setCategory(item.value)}
                        className="h-4 w-4 border-[#CBD0D6] text-[#0B4F3F] focus-visible:outline-[#12705A]"
                      />
                      {item.label}
                    </label>
                  ))}
                </div>
              </fieldset>

              <fieldset>
                <legend className="text-sm font-semibold">
                  Skor Kondisi AI
                </legend>
                <p className="mt-1 text-xs leading-relaxed text-[#5B6675]">
                  Skor dari inspeksi adaptif yang dikonfirmasi pemilik barang.
                </p>
                <div className="mt-3 flex flex-col gap-2.5">
                  {scoreTiers.map((tier) => (
                    <label
                      key={tier.value}
                      className="flex cursor-pointer items-center gap-2.5 text-sm"
                    >
                      <input
                        type="radio"
                        name="score"
                        checked={minimumScore === tier.value}
                        onChange={() => setMinimumScore(tier.value)}
                        className="h-4 w-4 border-[#CBD0D6] text-[#0B4F3F] focus-visible:outline-[#12705A]"
                      />
                      {tier.label}
                    </label>
                  ))}
                </div>
              </fieldset>

              <fieldset>
                <legend className="text-sm font-semibold">Rentang Harga</legend>
                <div className="mt-3 flex items-center justify-between text-sm font-semibold text-[#111827]">
                  <span>{formatRupiah(minimumPrice)}</span>
                  <span>{formatRupiah(maximumPrice)}</span>
                </div>
                <div className="relative mt-4 h-4">
                  <div className="absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-[#EDEFEC]" />
                  <div
                    className="absolute top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-[#0B4F3F]"
                    style={{
                      left: `${minPercent}%`,
                      right: `${100 - maxPercent}%`,
                    }}
                  />
                  <input
                    type="range"
                    aria-label="Harga minimum"
                    min={PRICE_MIN}
                    max={PRICE_MAX}
                    step={PRICE_STEP}
                    value={minimumPrice}
                    onChange={(e) => handleMinPrice(Number(e.target.value))}
                    className="range-thumb pointer-events-none absolute inset-x-0 top-1/2 h-1.5 w-full -translate-y-1/2 appearance-none bg-transparent"
                  />
                  <input
                    type="range"
                    aria-label="Harga maksimum"
                    min={PRICE_MIN}
                    max={PRICE_MAX}
                    step={PRICE_STEP}
                    value={maximumPrice}
                    onChange={(e) => handleMaxPrice(Number(e.target.value))}
                    className="range-thumb pointer-events-none absolute inset-x-0 top-1/2 h-1.5 w-full -translate-y-1/2 appearance-none bg-transparent"
                  />
                </div>
              </fieldset>

              <fieldset>
                <legend className="text-sm font-semibold">
                  Pengambilan Barang
                </legend>
                <div className="mt-3 flex flex-col gap-2.5 text-sm">
                  <label className="flex cursor-pointer items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={electricCourier}
                      onChange={(e) => setElectricCourier(e.target.checked)}
                      className="h-4 w-4 rounded border-[#CBD0D6] text-[#0B4F3F] focus-visible:outline-[#12705A]"
                    />
                    Kurir motor listrik
                  </label>
                  <label className="flex cursor-pointer items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={transitDropoff}
                      onChange={(e) => setTransitDropoff(e.target.checked)}
                      className="h-4 w-4 rounded border-[#CBD0D6] text-[#0B4F3F] focus-visible:outline-[#12705A]"
                    />
                    Titik ambil di stasiun MRT/KRL
                  </label>
                </div>
              </fieldset>
            </div>
          </aside>

          {/* ============ Konten ============ */}
          <section>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch sm:justify-between">
              <label
                className={`flex min-h-11 flex-1 items-center gap-2.5 rounded-xl border border-[#E4E7EB] bg-white px-4 ${focus}`}
              >
                <Search size={18} className="shrink-0 text-[#5B6675]" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Cari nama barang..."
                  className="w-full border-none bg-transparent text-sm outline-none placeholder:text-[#5B6675]"
                />
              </label>
              <SortMenu value={sort} onChange={setSort} />
            </div>

            {hasActiveFilters && (
              <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
                <span className="text-[#5B6675]">Filter aktif:</span>
                {minimumScore > 0 && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#ECEEEB] px-3 py-1">
                    Skor ≥ {minimumScore}
                    <button
                      onClick={() => setMinimumScore(0)}
                      className={focus}
                    >
                      <X size={13} />
                    </button>
                  </span>
                )}
                {selectedPaths.map((path) => (
                  <span
                    key={path}
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#ECEEEB] px-3 py-1"
                  >
                    {paths.find((item) => item.value === path)?.label}
                    <button onClick={() => togglePath(path)} className={focus}>
                      <X size={13} />
                    </button>
                  </span>
                ))}
                <button
                  onClick={reset}
                  className={`font-semibold text-[#0B4F3F] hover:underline ${focus}`}
                >
                  Hapus semua
                </button>
              </div>
            )}

            <div className="mt-6 grid grid-cols-[repeat(auto-fill,minmax(min(100%,240px),1fr))] gap-5">
              {paginated.length === 0 ? (
                <p className="col-span-full rounded-2xl border border-dashed border-[#CBD0D6] px-4 py-14 text-center text-[#5B6675]">
                  Belum ada barang yang cocok. Coba ubah atau hapus sebagian
                  filter.
                </p>
              ) : (
                paginated.map((product) => (
                  <DiscoverCard key={product.id} product={product} />
                ))
              )}
            </div>

            {filtered.length > 0 && (
              <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-[#E4E7EB] pt-6 sm:flex-row">
                <span className="text-sm text-[#5B6675]">
                  Menampilkan{" "}
                  <b className="text-[#111827]">
                    {(currentPage - 1) * PAGE_SIZE + 1}–
                    {Math.min(currentPage * PAGE_SIZE, filtered.length)}
                  </b>{" "}
                  dari <b className="text-[#111827]">{filtered.length}</b>{" "}
                  barang
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    className={`min-h-9 min-w-9 rounded-lg border border-[#E4E7EB] text-sm font-semibold disabled:opacity-40 ${focus}`}
                  >
                    ‹
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (n) => (
                      <button
                        key={n}
                        onClick={() => setPage(n)}
                        aria-current={n === currentPage}
                        className={`min-h-9 min-w-9 rounded-lg border text-sm font-semibold ${focus} ${
                          n === currentPage
                            ? "border-[#0B4F3F] bg-[#0B4F3F] text-white"
                            : "border-[#E4E7EB] text-[#111827] hover:border-[#0B4F3F]"
                        }`}
                      >
                        {n}
                      </button>
                    ),
                  )}
                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    className={`min-h-9 min-w-9 rounded-lg border border-[#E4E7EB] text-sm font-semibold disabled:opacity-40 ${focus}`}
                  >
                    ›
                  </button>
                </div>
              </div>
            )}
          </section>
        </div>
      </main>

      {/* ============ Transparansi kondisi & serah terima ============ */}
      <section className="mx-auto w-full max-w-[1200px] px-4 pb-16 sm:px-6 sm:pb-24">
        <div className="grid gap-8 rounded-3xl bg-[#0A3D31] p-6 text-white sm:p-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14 lg:p-14">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold">
              <CheckCircle size={14} /> Cara kami menilai kondisi barang
            </span>
            <h2 className={`${h2} mt-4`}>
              Skor kondisi yang bisa kamu telusuri, bukan klaim sepihak
            </h2>
            <p className="mt-3 max-w-[52ch] leading-relaxed text-white/75">
              AI membantu mengenali barang dan menyusun pertanyaan inspeksi,
              tetapi kondisi akhirnya berasal dari deklarasi pemilik barang.
              Setiap serah terima dikonfirmasi lewat kode, dan riwayatnya
              tercatat di Circular Passport milik barang tersebut.
            </p>
            <div className="mt-8 grid gap-5 sm:grid-cols-3">
              <div className="flex items-start gap-3">
                <BarChart3
                  className="mt-0.5 shrink-0 text-[#E2BC6B]"
                  size={20}
                />
                <span className="text-sm leading-snug">
                  <b className="block">Inspeksi adaptif</b>
                  <span className="text-white/70">
                    Pertanyaan kondisi sesuai kategori barang
                  </span>
                </span>
              </div>
              <div className="flex items-start gap-3">
                <ClipboardCheck
                  className="mt-0.5 shrink-0 text-[#E2BC6B]"
                  size={20}
                />
                <span className="text-sm leading-snug">
                  <b className="block">Serah terima terverifikasi</b>
                  <span className="text-white/70">
                    Dikonfirmasi lewat kode oleh kedua pihak
                  </span>
                </span>
              </div>
              <div className="flex items-start gap-3">
                <Leaf className="mt-0.5 shrink-0 text-[#E2BC6B]" size={20} />
                <span className="text-sm leading-snug">
                  <b className="block">Circular Passport</b>
                  <span className="text-white/70">
                    Riwayat kondisi dan perpindahan barang
                  </span>
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 text-[#111827]">
            <p className="text-xs font-semibold text-[#5B6675]">
              Contoh Circular Passport · PKL-2026-0183
            </p>
            <div className="mt-4 flex items-end justify-between gap-4">
              <div>
                <p className="font-semibold">Kursi kerja</p>
                <p className="text-sm text-[#5B6675]">Furnitur kecil</p>
              </div>
              <p className="flex items-baseline gap-1">
                <span
                  className={`${display} text-5xl leading-none font-normal`}
                >
                  76
                </span>
                <span className="text-sm text-[#5B6675]">/100</span>
              </p>
            </div>
            <ul className="mt-5 space-y-3.5">
              {[
                { label: "Fungsi", value: 82 },
                { label: "Kondisi fisik", value: 70 },
                { label: "Kelengkapan", value: 90 },
              ].map((s) => (
                <li key={s.label}>
                  <div className="flex justify-between text-sm">
                    <span>{s.label}</span>
                    <span className="font-semibold">{s.value}</span>
                  </div>
                  <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-[#EDEFEC]">
                    <div
                      className="h-full rounded-full bg-[#12705A]"
                      style={{ width: `${s.value}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-5 border-t border-[#EDEFEC] pt-4 text-xs text-[#5B6675]">
              Dinilai lewat deklarasi pemilik dan inspeksi adaptif — belum
              melalui pengujian fisik oleh teknisi.
            </p>
          </div>
        </div>
      </section>

      <MarketplaceFooter />
    </div>
  );
}
