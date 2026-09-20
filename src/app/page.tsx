"use client";
import Link from "next/link";
import {
  ArrowUpDown,
  BookOpen,
  Camera,
  Check,
  ChevronDown,
  CircleCheck,
  CirclePlus,
  Leaf,
  Recycle,
  ShoppingBag,
  Smartphone,
  Sofa,
  Sparkles,
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
import { ProductCard } from "@/components/marketplace/ProductCard";
import { CircularPath, products } from "@/data/marketplace";

/* ---------- Data ---------- */
const filters: { label: string; value: "all" | CircularPath }[] = [
  { label: "Semua", value: "all" },
  { label: "Beli (Sell)", value: "sell" },
  { label: "Tukar (Swap)", value: "swap" },
  { label: "Donasi", value: "donate" },
  { label: "Perlu Perbaikan", value: "repair" },
];

const categories = [
  { label: "Elektronik", count: "3.410 item", icon: Smartphone },
  { label: "Perabot Rumah", count: "2.180 item", icon: Sofa },
  { label: "Fashion & Aksesori", count: "4.890 item", icon: Sparkles },
  { label: "Hobi & Kamera", count: "1.640 item", icon: Camera },
  { label: "Buku & Media", count: "2.700 item", icon: BookOpen },
];

const impact = [
  { value: "14.820", label: "Barang tersalurkan" },
  { value: "88%", label: "Reuse rate" },
  { value: "12,4 ton", label: "CO₂e tercegah" },
];

// Contoh tampilan hasil audit, ganti dengan data asli bila sudah ada
const sampleScores = [
  { label: "Fungsi", value: 92 },
  { label: "Kondisi fisik", value: 81 },
  { label: "Kelengkapan", value: 85 },
];

// Urut dari skor terendah ke tertinggi; flex = lebar rentang skor
const grades = [
  { range: "45 – 64", label: "Cukup / servis", flex: 20, bar: "bg-[#C8672B]" },
  { range: "65 – 79", label: "Kondisi baik", flex: 15, bar: "bg-[#D9A441]" },
  { range: "80 – 100", label: "Sangat baik", flex: 21, bar: "bg-[#0B4F3F]" },
];

const flow = [
  {
    icon: Camera,
    title: "Unggah foto",
    text: "Foto barang dari beberapa sisi dan isi detail singkat. Ikuti panduan foto supaya hasil audit akurat.",
  },
  {
    icon: Sparkles,
    title: "Audit kondisi oleh AI",
    text: "AI menilai fungsi, kondisi fisik, dan kelengkapan, lalu memberi skor yang bisa dilihat semua pembeli.",
  },
  {
    icon: Recycle,
    title: "Pilih jalur",
    text: "AI menyarankan jalur yang paling masuk akal untuk barangmu. Keputusan akhir tetap di tanganmu.",
    chips: ["Jual", "Tukar", "Donasi", "Perbaiki"],
  },
  {
    icon: Leaf,
    title: "Dampak tercatat",
    text: "Setelah barang berpindah tangan, jejak CO₂e yang tercegah masuk ke dampak komunitas.",
  },
];

const sortOptions = [
  { value: "relevance", label: "Rekomendasi" },
  { value: "score-desc", label: "Skor tertinggi" },
  { value: "price-asc", label: "Harga terendah" },
  { value: "price-desc", label: "Harga tertinggi" },
];

// Nilai bisa berupa angka atau teks seperti "Rp 1.250.000"
const toNumber = (v: unknown): number => {
  if (typeof v === "number") return v;
  const str = String(v ?? "").trim();
  if (/^\d+(\.\d+)?$/.test(str)) return Number(str);
  return Number(str.replace(/[^\d]/g, "")) || 0;
};

/* ---------- Style tokens ---------- */
const display = "font-[family-name:var(--font-display,Georgia,serif)]";
const body = "font-[family-name:var(--font-body,system-ui,sans-serif)]";

const focus =
  "focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#12705A]";
const focusDark =
  "focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-white";
const card =
  "rounded-2xl border border-[#E4E7EB] bg-white shadow-[0_1px_2px_rgba(17,24,39,0.04),0_10px_28px_-14px_rgba(17,24,39,0.10)]";
const btn = `inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl px-5 text-[0.95rem] font-semibold no-underline transition-colors sm:w-auto`;
const btnPrimary = `${btn} ${focus} bg-[#0B4F3F] !text-white hover:bg-[#083D31]`;
const btnGold = `${btn} ${focusDark} bg-[#E2BC6B] !text-[#111827] hover:bg-[#ECCB86]`;
const btnGhostDark = `${btn} ${focusDark} border border-white/30 !text-white hover:bg-white/10`;
const h2 = `${display} text-[2rem] leading-[1.08] font-normal tracking-[-0.01em] sm:text-[2.6rem]`;

/* ---------- Dropdown urutan ---------- */
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
        className={`flex min-h-11 w-full cursor-pointer items-center justify-between gap-3 rounded-xl border bg-white px-4 text-[0.9rem] font-semibold text-[#111827] transition-colors hover:border-[#0B4F3F] sm:w-auto sm:min-w-[15rem] ${focus} ${
          open ? "border-[#0B4F3F]" : "border-[#E4E7EB]"
        }`}
      >
        <span className="flex items-center gap-2">
          <ArrowUpDown size={16} className="text-[#5B6675]" />
          <span className="font-normal text-[#5B6675]">Urutkan:</span>
          {current.label}
        </span>
        <ChevronDown
          size={16}
          className={`text-[#5B6675] transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label="Urutkan katalog"
          className="absolute inset-x-0 z-30 mt-2 rounded-xl border border-[#E4E7EB] bg-white p-1.5 shadow-[0_16px_40px_-12px_rgba(17,24,39,0.25)]"
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
                  className={`flex w-full cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left text-[0.9rem] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#12705A] focus-visible:ring-inset ${
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

function useHashScroll() {
  useEffect(() => {
    function scrollToHash() {
      const hash = window.location.hash;
      if (!hash) return;
      const el = document.querySelector(hash);
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    const timeout = setTimeout(scrollToHash, 80);
    window.addEventListener("hashchange", scrollToHash);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("hashchange", scrollToHash);
    };
  }, []);
}

/* ---------- Halaman ---------- */
export default function HomePage() {
  const [filter, setFilter] = useState<"all" | CircularPath>("all");
  const [sort, setSort] = useState("relevance");
  useHashScroll();

  const visible = useMemo(() => {
    const list =
      filter === "all"
        ? products
        : products.filter((p) => p.paths.includes(filter));
    return [...list].sort((a, b) => {
      const byScore = toNumber(b.score) - toNumber(a.score);
      if (sort === "score-desc") return byScore;
      if (sort === "price-asc")
        return toNumber(a.price) - toNumber(b.price) || byScore;
      if (sort === "price-desc")
        return toNumber(b.price) - toNumber(a.price) || byScore;
      return 0;
    });
  }, [filter, sort]);

  return (
    <div
      className={`${body} min-h-screen bg-[#F7F8F7] text-[#111827] antialiased`}
    >
      <MarketplaceHeader />
      <main className="mx-auto flex w-full max-w-[1200px] flex-col gap-16 px-4 pt-6 pb-16 sm:gap-24 sm:px-6 sm:pt-8 sm:pb-24">
        {/* ============ Hero ============ */}
        <section className="grid items-center gap-10 rounded-3xl bg-[#0A3D31] p-6 text-white sm:p-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14 lg:p-14">
          <div>
            <h1
              className={`${display} text-[2.75rem] leading-[1] font-normal tracking-[-0.02em] sm:text-6xl lg:text-[4.5rem]`}
            >
              Perpanjang usia guna, pilih dampak nyata.
            </h1>
            <p className="mt-6 max-w-[48ch] text-[1.05rem] leading-relaxed text-white/75">
              Marketplace barang preloved yang kondisinya dicek AI dan
              dijelaskan apa adanya. Beli, tukar, donasikan, atau perbaiki,
              supaya barang yang masih layak tidak berakhir di tempat sampah.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#katalog" className={btnGold}>
                <ShoppingBag size={18} /> Jelajahi koleksi
              </a>
              <Link href="/seller/scan" className={btnGhostDark}>
                <CirclePlus size={18} /> Jual atau titip barang
              </Link>
            </div>
            <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/75">
              {[
                "Kondisi dicek AI",
                "Skor transparan",
                "Empat jalur sirkular",
              ].map((t) => (
                <li key={t} className="inline-flex items-center gap-1.5">
                  <CircleCheck size={16} className="text-[#E2BC6B]" />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          {/* Contoh hasil audit AI */}
          <figure className="m-0 rounded-2xl bg-white p-5 text-[#111827] shadow-[0_30px_60px_-24px_rgba(0,0,0,0.5)] sm:p-6">
            <figcaption className="flex items-center justify-between gap-3 text-sm">
              <span className="font-medium text-[#5B6675]">
                Contoh hasil audit AI
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-[#E6F2ED] px-2.5 py-1 text-xs font-semibold text-[#0B4F3F]">
                <Check size={12} /> Sangat baik
              </span>
            </figcaption>

            <div className="mt-5 flex items-end justify-between gap-4">
              <div>
                <p className="font-semibold">Kipas angin meja 16 inci</p>
                <p className="text-sm text-[#5B6675]">
                  Elektronik · dipakai 2 tahun
                </p>
              </div>
              <p className="flex items-baseline gap-1">
                <span
                  className={`${display} text-6xl leading-none font-normal`}
                >
                  86
                </span>
                <span className="text-sm text-[#5B6675]">/100</span>
              </p>
            </div>

            <ul className="mt-5 space-y-3.5">
              {sampleScores.map((s) => (
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

            <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-[#EDEFEC] pt-4 text-sm">
              <span className="text-[#5B6675]">Rute disarankan</span>
              <span className="rounded-full bg-[#111827] px-3 py-1 text-xs font-semibold text-white">
                Jual
              </span>
              <span className="rounded-full border border-[#E4E7EB] px-3 py-1 text-xs font-semibold">
                Tukar
              </span>
            </div>
          </figure>
        </section>

        {/* ============ Dampak ============ */}
        <section
          id="dampak"
          aria-label="Dampak sirkular"
          className={`${card} scroll-mt-24`}
        >
          <div className="grid divide-y divide-[#EDEFEC] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {impact.map((m) => (
              <div key={m.label} className="p-6 sm:p-8">
                <p
                  className={`${display} text-4xl leading-none font-normal sm:text-5xl`}
                >
                  {m.value}
                </p>
                <p className="mt-2 text-sm text-[#5B6675]">{m.label}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-3 border-t border-[#EDEFEC] p-6 sm:flex-row sm:items-center sm:gap-8 sm:px-8">
            <div className="sm:w-60">
              <p className="text-sm font-semibold">Target bebas e-waste Q3</p>
              <p className="text-sm text-[#5B6675]">
                1.280 item dialihkan pekan ini
              </p>
            </div>
            <div className="flex flex-1 items-center gap-3">
              <div
                className="h-2 flex-1 overflow-hidden rounded-full bg-[#EDEFEC]"
                role="progressbar"
                aria-valuenow={88}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Target bebas e-waste Q3"
              >
                <div className="h-full w-[88%] rounded-full bg-[#0B4F3F]" />
              </div>
              <span className="text-sm font-semibold">88%</span>
            </div>
          </div>
        </section>

        {/* ============ Kategori ============ */}
        <section>
          <div className="mb-6 flex items-end justify-between gap-4">
            <h2 className={h2}>Jelajahi kategori</h2>
            <Link
              href="/explore"
              className={`text-sm font-semibold !text-[#0B4F3F] underline-offset-4 hover:underline ${focus}`}
            >
              Lihat semua
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
            {categories.map(({ label, count, icon: Icon }) => (
              <Link
                key={label}
                href="/explore"
                className={`${card} group flex items-center gap-3 !text-[#111827] no-underline p-4 transition duration-200 hover:-translate-y-0.5 hover:border-[#0B4F3F]/40 hover:shadow-[0_14px_32px_-14px_rgba(11,79,63,0.35)] odd:last:col-span-2 md:odd:last:col-span-1 ${focus}`}
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#E6F2ED] text-[#0B4F3F] transition-colors group-hover:bg-[#0B4F3F] group-hover:text-white">
                  <Icon size={20} />
                </span>
                <span className="min-w-0">
                  <strong className="block text-[0.92rem] leading-snug font-semibold">
                    {label}
                  </strong>
                  <small className="block text-[0.8rem] text-[#5B6675]">
                    {count}
                  </small>
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* ============ Katalog ============ */}
        <section id="katalog" className="scroll-mt-24">
          <h2 className={h2}>Katalog terverifikasi</h2>
          <p className="mt-2 text-[0.95rem] text-[#5B6675]" aria-live="polite">
            {visible.length} barang lolos pengujian kondisi
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div
              role="group"
              aria-label="Filter jalur"
              className="-mx-4 overflow-x-auto px-4 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden"
            >
              <div className="inline-flex gap-1 rounded-xl bg-[#ECEEEB] p-1">
                {filters.map((item) => {
                  const active = filter === item.value;
                  return (
                    <button
                      key={item.value}
                      type="button"
                      aria-pressed={active}
                      onClick={() => setFilter(item.value)}
                      className={`min-h-9 shrink-0 cursor-pointer rounded-lg px-4 text-[0.88rem] font-semibold whitespace-nowrap transition-all ${focus} ${
                        active
                          ? "bg-white text-[#111827] shadow-[0_1px_3px_rgba(17,24,39,0.12)]"
                          : "text-[#5B6675] hover:text-[#111827]"
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>
            <SortMenu value={sort} onChange={setSort} />
          </div>

          <div className="mt-8 grid grid-cols-[repeat(auto-fill,minmax(min(100%,240px),1fr))] gap-5">
            {visible.length === 0 ? (
              <p className="col-span-full rounded-2xl border border-dashed border-[#CBD0D6] px-4 py-14 text-center text-[#5B6675]">
                Belum ada barang di jalur ini. Coba pilih filter lain.
              </p>
            ) : (
              visible.map((product) => (
                <ProductCard product={product} key={product.id} />
              ))
            )}
          </div>
        </section>

        {/* ============ Alur ============ */}
        <section id="cara-kerja" className={`${card} scroll-mt-24 p-6 sm:p-12`}>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className={h2}>Dari foto sampai berpindah tangan</h2>
              <p className="mt-3 max-w-[52ch] leading-relaxed text-[#5B6675]">
                Empat langkah singkat untuk memberi barang lama kesempatan
                kedua, tanpa perlu menebak nilainya sendiri.
              </p>
            </div>
            <Link href="/seller/scan" className={`${btnPrimary} shrink-0`}>
              <CirclePlus size={18} /> Mulai unggah barang
            </Link>
          </div>

          <ol className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
            {flow.map((step, i) => (
              <li
                key={step.title}
                className="flex flex-col lg:border-l lg:border-[#E4E7EB] lg:px-7 lg:first:border-l-0 lg:first:pl-0 lg:last:pr-0"
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`${display} text-5xl leading-none font-normal text-[#C29A4B]`}
                  >
                    {i + 1}
                  </span>
                  <step.icon size={22} className="text-[#12705A]" />
                </div>
                <h3 className="mt-5 text-[1.05rem] font-semibold">
                  {step.title}
                </h3>
                <p className="mt-2 text-[0.92rem] leading-relaxed text-[#5B6675]">
                  {step.text}
                </p>
                {step.chips && (
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {step.chips.map((c) => (
                      <li
                        key={c}
                        className="rounded-full bg-[#E6F2ED] px-2.5 py-1 text-xs font-semibold text-[#0B4F3F]"
                      >
                        {c}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ol>
        </section>

        {/* ============ Skor kondisi ============ */}
        <section className="grid gap-8 lg:grid-cols-[1fr_1.3fr] lg:items-center lg:gap-20">
          <div>
            <h2 className={h2}>Cara membaca skor kondisi</h2>
            <p className="mt-3 max-w-[46ch] leading-relaxed text-[#5B6675]">
              Setiap barang dinilai lewat audit visual AI dan dicek manual.
              Skornya tertera di kartu produk, jadi kamu tahu kondisi barang
              sebelum membeli.
            </p>
          </div>
          <div className={`${card} p-6 sm:p-8`}>
            <div className="flex gap-1" aria-hidden="true">
              {grades.map((g) => (
                <div
                  key={g.range}
                  style={{ flex: g.flex }}
                  className={`h-3 first:rounded-l-full last:rounded-r-full ${g.bar}`}
                />
              ))}
            </div>
            <ol className="mt-4 flex gap-1">
              {grades.map((g) => (
                <li key={g.range} style={{ flex: g.flex }} className="min-w-0">
                  <b className="block text-[0.95rem] font-semibold whitespace-nowrap">
                    {g.range}
                  </b>
                  <span className="block text-[0.85rem] leading-snug text-[#5B6675]">
                    {g.label}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ============ CTA ============ */}
        <section className="flex flex-col gap-8 rounded-3xl bg-[#E6F2ED] p-6 sm:p-12 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className={`${h2} max-w-[20ch] text-[#0A3D31]`}>
              Punya barang tak terpakai di rumah?
            </h2>
            <p className="mt-3 max-w-[48ch] leading-relaxed text-[#111827]/70">
              Unggah fotonya, AI PakaiLagi menilai kondisinya, lalu kamu pilih
              jalur terbaik untuk barang itu.
            </p>
          </div>
          <Link href="/seller/scan" className={`${btnPrimary} shrink-0`}>
            <Leaf size={18} /> Audit foto kilat AI
          </Link>
        </section>
      </main>
      <MarketplaceFooter />
    </div>
  );
}
