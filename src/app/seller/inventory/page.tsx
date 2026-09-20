"use client";
import Link from "next/link";
import {
  Check,
  CheckSquare,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Download,
  Grid3X3,
  Leaf,
  List,
  PackageCheck,
  ScanLine,
  Search,
  ShieldCheck,
  Truck,
} from "lucide-react";
import {
  type KeyboardEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { SellerShell } from "@/components/seller/SellerShell";
import { sellerInventory, InventoryState } from "@/data/seller-inventory-data";
import {
  badge,
  badgeNeutral,
  body,
  btnGold,
  btnLinkPrimary,
  btnRow,
  btnSecondary,
  card,
  checkbox,
  container,
  display,
  focus,
  h1,
  input as inputField,
  money,
  segmented,
  segTab,
  toastBox,
} from "@/components/ui/tokens";

/* ---------- Data & helper ---------- */
type Filter = InventoryState | "all";

const tabs: [Filter, string][] = [
  ["all", "Semua Barang"],
  ["active", "Aktif Dijual"],
  ["action", "Perlu Tindakan"],
  ["completed", "Terjual & Selesai"],
  ["draft", "Draf & Audit AI"],
  ["repair", "Reparasi"],
];

const metrics = [
  {
    label: "Total Barang Aktif",
    value: "12 Unit",
    detail: "Nilai inventaris Rp28.450.000",
    icon: PackageCheck,
  },
  {
    label: "Perlu Tindakan",
    value: "3 Pesanan",
    detail: "Order terdekat Sony A6000",
    icon: Truck,
  },
  {
    label: "Tersalurkan & Terjual",
    value: "48 Produk",
    detail: "Tingkat sirkularitas 94,2%",
    icon: Leaf,
  },
  {
    label: "Pencegahan Sampah",
    value: "38,6 kg",
    detail: "1.420 kg CO₂e dicegah",
    icon: ShieldCheck,
  },
];

// Opsi kategori diambil dari data, jadi selalu cocok dengan isi inventaris
const categoryOptions = [
  { value: "all", label: "Semua Kategori" },
  ...Array.from(new Set(sellerInventory.map((i) => i.category))).map((c) => ({
    value: c,
    label: c,
  })),
];

const scoreOptions = [
  { value: "all", label: "Semua Skor AI" },
  { value: "85-100", label: "85 – 100" },
  { value: "70-84", label: "70 – 84" },
  { value: "lt70", label: "Di bawah 70" },
];

const pageSizeOptions = [
  { value: "5", label: "5" },
  { value: "10", label: "10" },
  { value: "20", label: "20" },
];

const inScoreRange = (score: number, range: string) => {
  if (range === "85-100") return score >= 85;
  if (range === "70-84") return score >= 70 && score < 85;
  if (range === "lt70") return score < 70;
  return true;
};

// Warna skor mengikuti skala di home page (45–64 / 65–79 / 80–100)
const scoreDot = (score: number) =>
  score >= 80 ? "bg-[#0B4F3F]" : score >= 65 ? "bg-[#D9A441]" : "bg-[#C8672B]";

// Daftar nomor halaman: 1 … 4 5 6 … 12
function pageItems(current: number, total: number): (number | "…")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const nums = Array.from(
    new Set([1, total, current - 1, current, current + 1]),
  )
    .filter((n) => n >= 1 && n <= total)
    .sort((a, b) => a - b);
  const out: (number | "…")[] = [];
  nums.forEach((n, i) => {
    if (i > 0 && n - nums[i - 1] > 1) out.push("…");
    out.push(n);
  });
  return out;
}

type Option = { value: string; label: string };

function Dropdown({
  value,
  onChange,
  options,
  ariaLabel,
  placement = "bottom",
  className = "w-full",
}: {
  value: string;
  onChange: (v: string) => void;
  options: Option[];
  ariaLabel: string;
  placement?: "bottom" | "top";
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const current = options.find((o) => o.value === value) ?? options[0];

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
    if (e.key === "Tab" && open) {
      setOpen(false);
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
    <div ref={root} onKeyDown={onKeyDown} className={`relative ${className}`}>
      <button
        ref={trigger}
        type="button"
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className={`flex min-h-11 w-full cursor-pointer items-center justify-between gap-3 rounded-xl border bg-white px-4 text-[0.9rem] font-semibold text-[#111827] transition-colors hover:border-[#0B4F3F] ${focus} ${
          open ? "border-[#0B4F3F]" : "border-[#E4E7EB]"
        }`}
      >
        <span className="truncate">{current?.label}</span>
        <ChevronDown
          size={16}
          className={`shrink-0 text-[#5B6675] transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label={ariaLabel}
          className={`absolute inset-x-0 z-30 max-h-64 overflow-y-auto rounded-xl border border-[#E4E7EB] bg-white p-1.5 shadow-[0_16px_40px_-12px_rgba(17,24,39,0.25)] ${
            placement === "top" ? "bottom-full mb-2" : "mt-2"
          }`}
        >
          {options.map((o) => {
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

/* ---------- Halaman ---------- */
export default function SellerInventoryPage() {
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [scoreRange, setScoreRange] = useState("all");
  const [selected, setSelected] = useState<string[]>([]);
  const [grid, setGrid] = useState(false);
  const [toast, setToast] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState("5");

  const visible = useMemo(
    () =>
      sellerInventory.filter(
        (item) =>
          (filter === "all" || item.state === filter) &&
          (category === "all" || item.category === category) &&
          inScoreRange(item.score, scoreRange) &&
          `${item.name} ${item.category} ${item.passport}`
            .toLowerCase()
            .includes(query.toLowerCase()),
      ),
    [filter, query, category, scoreRange],
  );

  /* ----- Pagination ----- */
  const size = Number(pageSize);
  const totalPages = Math.max(1, Math.ceil(visible.length / size));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * size;
  const paged = visible.slice(start, start + size);
  const from = visible.length === 0 ? 0 : start + 1;
  const to = Math.min(start + size, visible.length);
  const allOnPageSelected =
    paged.length > 0 && paged.every((item) => selected.includes(item.id));

  // Setiap filter berubah, kembali ke halaman 1
  const withReset =
    <T,>(setter: (v: T) => void) =>
    (v: T) => {
      setter(v);
      setPage(1);
    };
  const changeFilter = withReset(setFilter);
  const changeQuery = withReset(setQuery);
  const changeCategory = withReset(setCategory);
  const changeScore = withReset(setScoreRange);
  const changePageSize = withReset(setPageSize);

  function notify(v: string) {
    setToast(v);
    setTimeout(() => setToast(""), 2300);
  }
  function toggle(id: string) {
    setSelected((v) =>
      v.includes(id) ? v.filter((x) => x !== id) : [...v, id],
    );
  }
  function togglePage(checked: boolean) {
    const ids = paged.map((item) => item.id);
    setSelected((v) =>
      checked
        ? Array.from(new Set([...v, ...ids]))
        : v.filter((id) => !ids.includes(id)),
    );
  }
  function runAction(itemId: string, label: string) {
    if (label === "Kirim Sekarang")
      location.href = `/seller/orders/ORDER-SIM-88219`;
    else if (label === "Lanjutkan Draf")
      location.href = "/seller/review/DRAFT-AI-8809";
    else notify(`${label} untuk ${itemId} dibuka.`);
  }

  const pageBtn = `grid h-9 w-9 cursor-pointer place-items-center rounded-lg transition-colors hover:bg-[#ECEEEB] hover:text-[#111827] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent ${focus}`;

  return (
    <SellerShell active="inventory">
      <main
        className={`${body} ${container} flex flex-col gap-6 bg-[#F7F8F7] py-6 text-[#111827] antialiased sm:gap-8 sm:py-8`}
      >
        {/* ============ Header ============ */}
        <header className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className={badge}>
              <ShieldCheck size={14} />
              Transparansi Sirkular Terverifikasi • SL-JKT-8821
            </span>
            <h1 className={`${h1} mt-4 max-w-[22ch]`}>
              Manajemen Inventaris & Paspor Sirkular
            </h1>
            <p className="mt-3 max-w-[56ch] leading-relaxed text-[#5B6675]">
              Kelola listing, skor AI, paspor digital, transaksi Escrow, serta
              riwayat penyaluran barang.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <button
              type="button"
              className={btnSecondary}
              onClick={() => notify("Laporan dampak disiapkan.")}
            >
              <Download size={17} />
              Ekspor Dampak
            </button>
            <button
              type="button"
              className={btnSecondary}
              onClick={() => notify("Mode batch diaktifkan.")}
            >
              <CheckSquare size={17} />
              Kelola Batch
            </button>
            <Link className={btnLinkPrimary} href="/seller/scan">
              <ScanLine size={17} />
              Pindai Barang Baru
            </Link>
          </div>
        </header>

        {/* ============ Metrik ============ */}
        <section
          aria-label="Ringkasan inventaris"
          className={`${card} grid divide-y divide-[#EDEFEC] sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x`}
        >
          {metrics.map(({ label, value, detail, icon: Icon }) => (
            <article
              key={label}
              className="p-6 sm:p-7 sm:[&:nth-child(n+3)]:border-t sm:[&:nth-child(n+3)]:border-[#EDEFEC] lg:[&:nth-child(n+3)]:border-t-0"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm text-[#5B6675]">{label}</span>
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#E6F2ED] text-[#0B4F3F]">
                  <Icon size={18} />
                </span>
              </div>
              <strong
                className={`${display} mt-4 block text-4xl leading-none font-normal`}
              >
                {value}
              </strong>
              <small className="mt-2 block text-sm text-[#5B6675]">
                {detail}
              </small>
            </article>
          ))}
        </section>

        {/* ============ Filter tab + toolbar ============ */}
        <section className="flex flex-col gap-3">
          <div
            role="group"
            aria-label="Filter status barang"
            className="-mx-4 overflow-x-auto px-4 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden"
          >
            <div className={segmented}>
              {tabs.map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  aria-pressed={filter === id}
                  onClick={() => changeFilter(id)}
                  className={segTab(filter === id)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <label className="relative flex-1">
              <span className="sr-only">Cari barang</span>
              <Search
                size={18}
                className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-[#5B6675]"
              />
              <input
                type="search"
                value={query}
                onChange={(e) => changeQuery(e.target.value)}
                placeholder="Cari nama barang, kategori, atau ID paspor..."
                className={`${inputField} pl-11`}
              />
            </label>
            <Dropdown
              ariaLabel="Filter kategori"
              value={category}
              onChange={changeCategory}
              options={categoryOptions}
              className="w-full lg:w-56"
            />
            <Dropdown
              ariaLabel="Filter skor AI"
              value={scoreRange}
              onChange={changeScore}
              options={scoreOptions}
              className="w-full lg:w-52"
            />
            <div className="flex gap-2">
              {[
                {
                  on: !grid,
                  set: () => setGrid(false),
                  Icon: List,
                  label: "Tampilan daftar",
                },
                {
                  on: grid,
                  set: () => setGrid(true),
                  Icon: Grid3X3,
                  label: "Tampilan grid",
                },
              ].map(({ on, set, Icon, label }) => (
                <button
                  key={label}
                  type="button"
                  aria-label={label}
                  aria-pressed={on}
                  onClick={set}
                  className={`grid h-11 w-11 cursor-pointer place-items-center rounded-xl border transition-colors ${focus} ${
                    on
                      ? "border-[#0B4F3F] bg-[#E6F2ED] text-[#0B4F3F]"
                      : "border-[#E4E7EB] bg-white text-[#5B6675] hover:border-[#0B4F3F]"
                  }`}
                >
                  <Icon size={18} />
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ============ Tabel / grid ============ */}
        {/* Tanpa overflow-hidden supaya menu dropdown "per halaman" tidak terpotong */}
        <section className={card}>
          <div className="flex flex-col gap-3 rounded-t-2xl border-b border-[#EDEFEC] p-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
              <label className="inline-flex cursor-pointer items-center gap-2 font-semibold">
                <input
                  type="checkbox"
                  className={checkbox}
                  checked={allOnPageSelected}
                  onChange={(e) => togglePage(e.target.checked)}
                />
                Pilih semua di halaman ini
              </label>
              <span className="text-[#5B6675]" aria-live="polite">
                {selected.length} barang terpilih
              </span>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <button
                type="button"
                className={btnSecondary}
                onClick={() => notify("Rute massal siap diubah.")}
              >
                Ubah Rute
              </button>
              <button
                type="button"
                className={btnSecondary}
                onClick={() => notify("Tag QR Paspor siap dicetak.")}
              >
                Cetak QR Paspor
              </button>
            </div>
          </div>

          {visible.length === 0 ? (
            <p className="m-6 rounded-2xl border border-dashed border-[#CBD0D6] px-4 py-14 text-center text-[#5B6675]">
              Belum ada barang yang cocok. Coba ganti filter atau kata kunci.
            </p>
          ) : grid ? (
            <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,240px),1fr))] gap-5 p-4 sm:p-6">
              {paged.map((item) => (
                <article
                  key={item.id}
                  className="flex flex-col rounded-2xl border border-[#E4E7EB] bg-white p-3 transition duration-200 hover:border-[#0B4F3F]/40 hover:shadow-[0_14px_32px_-14px_rgba(11,79,63,0.35)]"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="aspect-[4/3] w-full rounded-xl bg-[#EDEFEC] object-cover"
                  />
                  <span className={`${badge} mt-3 w-fit`}>{item.passport}</span>
                  <h3 className="mt-2 text-[1rem] leading-snug font-semibold">
                    {item.name}
                  </h3>
                  <p className="mt-1 flex items-center gap-2 text-sm text-[#5B6675]">
                    <span className="font-semibold text-[#111827]">
                      {money(item.price)}
                    </span>
                    <span aria-hidden="true">•</span>
                    <span className="inline-flex items-center gap-1.5">
                      <span
                        className={`h-2 w-2 rounded-full ${scoreDot(item.score)}`}
                      />
                      AI {item.score}/100
                    </span>
                  </p>
                  <p className="mt-3 flex flex-wrap gap-1.5">
                    <span className={badge}>{item.route}</span>
                    <span className={badgeNeutral}>{item.status}</span>
                  </p>
                  <button
                    type="button"
                    className={`${btnRow} mt-4`}
                    onClick={() => runAction(item.id, item.action)}
                  >
                    {item.action}
                  </button>
                </article>
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[880px] border-collapse text-left text-[0.9rem]">
                <thead>
                  <tr className="bg-[#F7F8F7] text-[0.8rem] text-[#5B6675]">
                    <th className="w-12 px-4 py-3 sm:pl-6">
                      <span className="sr-only">Pilih</span>
                    </th>
                    <th className="px-3 py-3 font-semibold">Produk & Paspor</th>
                    <th className="px-3 py-3 font-semibold">Nilai</th>
                    <th className="px-3 py-3 font-semibold">Audit AI</th>
                    <th className="px-3 py-3 font-semibold">Jalur</th>
                    <th className="px-3 py-3 font-semibold">Status</th>
                    <th className="px-3 py-3 font-semibold sm:pr-6">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {paged.map((item) => (
                    <tr
                      key={item.id}
                      className="border-t border-[#EDEFEC] transition-colors hover:bg-[#F7F8F7]"
                    >
                      <td className="px-4 py-4 sm:pl-6">
                        <input
                          type="checkbox"
                          className={checkbox}
                          aria-label={`Pilih ${item.name}`}
                          checked={selected.includes(item.id)}
                          onChange={() => toggle(item.id)}
                        />
                      </td>
                      <td className="px-3 py-4">
                        <div className="flex items-center gap-3">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-12 w-12 shrink-0 rounded-lg bg-[#EDEFEC] object-cover"
                          />
                          <div className="min-w-0">
                            <b className="block font-semibold">{item.name}</b>
                            <small className="block text-[0.8rem] text-[#5B6675]">
                              {item.category} • {item.passport}
                            </small>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-4">
                        <div className="font-semibold">{money(item.price)}</div>
                        <small className="block text-[0.8rem] text-[#5B6675]">
                          {item.detail}
                        </small>
                      </td>
                      <td className="px-3 py-4">
                        <span className="inline-flex items-center gap-2 whitespace-nowrap">
                          <span
                            className={`h-2 w-2 rounded-full ${scoreDot(item.score)}`}
                          />
                          <span className="font-semibold">
                            {item.score}/100
                          </span>
                          <span className="text-[0.8rem] text-[#5B6675]">
                            {item.scoreLabel}
                          </span>
                        </span>
                      </td>
                      <td className="px-3 py-4">
                        <span className={`${badge} whitespace-nowrap`}>
                          {item.route}
                        </span>
                      </td>
                      <td className="px-3 py-4">
                        <span className={`${badgeNeutral} whitespace-nowrap`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-3 py-4 sm:pr-6">
                        <button
                          type="button"
                          className={btnRow}
                          onClick={() => runAction(item.id, item.action)}
                        >
                          {item.action}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* ----- Pagination ----- */}
          <footer className="flex flex-col gap-4 rounded-b-2xl border-t border-[#EDEFEC] p-4 text-sm text-[#5B6675] sm:px-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
              <span aria-live="polite">
                Menampilkan {from}–{to} dari {visible.length} barang
              </span>
              <div className="flex items-center gap-2">
                <span>Per halaman</span>
                <Dropdown
                  ariaLabel="Jumlah barang per halaman"
                  value={pageSize}
                  onChange={changePageSize}
                  options={pageSizeOptions}
                  placement="top"
                  className="w-24"
                />
              </div>
            </div>

            <nav aria-label="Halaman" className="flex items-center gap-1">
              <button
                type="button"
                aria-label="Halaman sebelumnya"
                disabled={currentPage === 1}
                onClick={() => setPage(currentPage - 1)}
                className={pageBtn}
              >
                <ChevronLeft size={18} />
              </button>
              {pageItems(currentPage, totalPages).map((p, i) =>
                p === "…" ? (
                  <span
                    key={`gap-${i}`}
                    aria-hidden="true"
                    className="grid h-9 w-6 place-items-center"
                  >
                    …
                  </span>
                ) : (
                  <button
                    key={p}
                    type="button"
                    aria-label={`Halaman ${p}`}
                    aria-current={p === currentPage ? "page" : undefined}
                    onClick={() => setPage(p)}
                    className={`grid h-9 min-w-9 cursor-pointer place-items-center rounded-lg px-2 text-[0.88rem] font-semibold transition-colors ${focus} ${
                      p === currentPage
                        ? "bg-[#0B4F3F] text-white"
                        : "hover:bg-[#ECEEEB] hover:text-[#111827]"
                    }`}
                  >
                    {p}
                  </button>
                ),
              )}
              <button
                type="button"
                aria-label="Halaman berikutnya"
                disabled={currentPage === totalPages}
                onClick={() => setPage(currentPage + 1)}
                className={pageBtn}
              >
                <ChevronRight size={18} />
              </button>
            </nav>
          </footer>
        </section>

        {/* ============ Kesehatan inventaris ============ */}
        <aside className="flex flex-col gap-6 rounded-3xl bg-[#0A3D31] p-6 text-white sm:p-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h3
              className={`${display} text-[1.6rem] leading-[1.15] font-normal sm:text-[2rem]`}
            >
              Kesehatan Inventaris Sangat Tinggi • 96%
            </h3>
            <p className="mt-3 max-w-[56ch] leading-relaxed text-white/75">
              Skor AI dan deskripsi objektif membantu memangkas retur serta
              menjaga Eco-Seller Tier 1.
            </p>
          </div>
          <button
            type="button"
            className={`${btnGold} shrink-0`}
            onClick={() => notify("Metrik sirkular dibuka.")}
          >
            Pelajari Metrik
          </button>
        </aside>
      </main>

      {toast && (
        <div role="status" className={toastBox}>
          {toast}
        </div>
      )}
    </SellerShell>
  );
}
