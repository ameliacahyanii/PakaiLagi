"use client";
import Link from "next/link";
import {
  Bike,
  Check,
  CircleCheck,
  Clock,
  ChevronDown,
  LockKeyhole,
  MessageCircle,
  PackageCheck,
  Printer,
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
import { sellerOrders, SellerOrderStatus } from "@/data/seller-operations-data";
import {
  badge,
  badgeGold,
  badgeNeutral,
  btnLinkPrimary,
  btnLinkSecondary,
  btnPrimary,
  btnSecondary,
  card,
  cardPad,
  cardTitle,
  container,
  display,
  focus,
  h1,
  input,
  money,
  pageBg,
  segTab,
  segmented,
  toastBox,
} from "@/components/ui/tokens";

type Option = { value: string; label: string };

const logisticsOptions: Option[] = [
  { value: "all", label: "Semua layanan logistik" },
  { value: "ev", label: "Kurir motor listrik" },
  { value: "hub", label: "Circular Hub" },
];

const sortOptions: Option[] = [
  { value: "deadline", label: "Batas kirim terdekat" },
  { value: "escrow", label: "Nilai escrow tertinggi" },
];

function Dropdown({
  value,
  onChange,
  options,
  ariaLabel,
  className = "w-full",
}: {
  value: string;
  onChange: (v: string) => void;
  options: Option[];
  ariaLabel: string;
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
          className="absolute inset-x-0 z-30 mt-2 max-h-64 overflow-y-auto rounded-xl border border-[#E4E7EB] bg-white p-1.5 shadow-[0_16px_40px_-12px_rgba(17,24,39,0.25)]"
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
                      : "text-[#111827] hover:bg-[#ECEEEB]"
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

const tabs: [SellerOrderStatus | "all", string][] = [
  ["all", "Semua pesanan"],
  ["processing", "Perlu diproses"],
  ["shipping", "Dalam pengiriman"],
  ["testing", "Menunggu konfirmasi"],
  ["completed", "Selesai"],
];

const metrics = [
  {
    label: "Perlu dikirim hari ini",
    value: "3 pesanan",
    detail: "Rp11.450.000 tertahan di escrow",
    icon: Clock,
  },
  {
    label: "Dalam perjalanan",
    value: "5 paket",
    detail: "12,4 kg CO₂e dicegah",
    icon: Truck,
  },
  {
    label: "Sleeve beredar",
    value: "8 kemasan",
    detail: "Seluruh deposit masih terlindungi",
    icon: PackageCheck,
  },
  {
    label: "Escrow siap cair",
    value: "Rp6.850.000",
    detail: "Verifikasi otomatis 48 jam",
    icon: LockKeyhole,
  },
];

const protocol = [
  {
    title: "Masukkan barang ke Returnable Sleeve, lalu pindai barcode",
    text: "Sleeve terdaftar atas nama tokomu sampai kembali ke hub.",
  },
  {
    title: "Serahkan ke kurir motor listrik tanpa dokumen kertas",
    text: "Kurir memverifikasi lewat aplikasi, resi cukup digital.",
  },
  {
    title: "Kumpulkan poin sirkular saat sleeve kembali",
    text: "Poin menambah prioritas penjemputan pada periode berikutnya.",
  },
];

const progressByStatus: Record<string, string> = {
  processing: "35%",
  shipping: "75%",
  testing: "92%",
  completed: "100%",
};

export default function SellerOrdersPage() {
  const [tab, setTab] = useState<SellerOrderStatus | "all">("processing");
  const [search, setSearch] = useState("");
  const [logistics, setLogistics] = useState("all");
  const [sort, setSort] = useState("deadline");
  const [toast, setToast] = useState("");

  const visible = useMemo(() => {
    const filtered = sellerOrders.filter(
      (order) =>
        (tab === "all" || order.status === tab) &&
        (logistics === "all" ||
          (logistics === "ev" &&
            order.logistics.toLowerCase().includes("listrik")) ||
          (logistics === "hub" &&
            order.logistics.toLowerCase().includes("hub"))) &&
        `${order.id} ${order.product} ${order.buyer} ${order.passport}`
          .toLowerCase()
          .includes(search.toLowerCase()),
    );
    return sort === "escrow"
      ? [...filtered].sort((a, b) => b.amount - a.amount)
      : filtered;
  }, [tab, search, logistics, sort]);

  function notify(value: string) {
    setToast(value);
    setTimeout(() => setToast(""), 2400);
  }

  return (
    <SellerShell active="orders">
      <div className={pageBg}>
        <main
          className={`${container} flex flex-col gap-8 pt-6 pb-16 sm:gap-12 sm:pt-8 sm:pb-20`}
        >
          {/* ============ Judul ============ */}
          <header className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className={h1}>Pesanan dan logistik hijau.</h1>
              <p className="mt-3 max-w-[56ch] text-[0.95rem] leading-relaxed text-[#5B6675]">
                Pantau pesanan yang berjalan, kurir listrik, Returnable Sleeve,
                dan pelepasan dana escrow dalam satu tempat.
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
              <button
                type="button"
                className={btnSecondary}
                onClick={() => notify("Batch label reusable disiapkan.")}
              >
                <Printer size={16} /> Cetak batch resi
              </button>
              <button
                type="button"
                className={btnPrimary}
                onClick={() => notify("Dispatcher logistik sudah dikabari.")}
              >
                <Bike size={16} /> Hubungi dispatcher
              </button>
            </div>
          </header>

          {/* ============ Metrik ============ */}
          <section aria-label="Ringkasan operasional">
            <div
              className={`${card} grid divide-y divide-[#E4E7EB] sm:grid-cols-2 sm:divide-x lg:grid-cols-4 lg:divide-y-0`}
            >
              {metrics.map(({ label, value, detail, icon: Icon }) => (
                <article key={label} className="p-5 sm:p-6">
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-[0.8rem] font-medium text-[#5B6675]">
                      {label}
                    </p>
                    <Icon size={18} className="shrink-0 text-[#12705A]" />
                  </div>
                  <p className={`${display} mt-3 text-[1.75rem] leading-none`}>
                    {value}
                  </p>
                  <p className="mt-2 text-[0.82rem] leading-snug text-[#5B6675]">
                    {detail}
                  </p>
                </article>
              ))}
            </div>
          </section>

          {/* ============ Filter dan pencarian ============ */}
          <section id="daftar" className="scroll-mt-24">
            <div
              role="group"
              aria-label="Filter status pesanan"
              className="-mx-4 overflow-x-auto px-4 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden"
            >
              <div className={segmented}>
                {tabs.map(([id, label]) => (
                  <button
                    key={id}
                    type="button"
                    aria-pressed={tab === id}
                    onClick={() => setTab(id)}
                    className={segTab(tab === id)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-3 lg:flex-row lg:items-center">
              <div className="relative flex-1">
                <Search
                  size={17}
                  className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-[#5B6675]"
                />
                <input
                  className={`${input} pl-10`}
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Cari nomor pesanan, pembeli, atau paspor"
                  aria-label="Cari pesanan"
                />
              </div>
              <Dropdown
                ariaLabel="Layanan logistik"
                value={logistics}
                onChange={setLogistics}
                options={logisticsOptions}
                className="w-full lg:w-56"
              />
              <Dropdown
                ariaLabel="Urutkan pesanan"
                value={sort}
                onChange={setSort}
                options={sortOptions}
                className="w-full lg:w-56"
              />
            </div>

            <p className="mt-4 text-[0.9rem] text-[#5B6675]" aria-live="polite">
              {visible.length} pesanan ditampilkan
            </p>

            {/* ============ Daftar pesanan ============ */}
            <div className="mt-5 flex flex-col gap-4">
              {visible.length === 0 ? (
                <p className="rounded-2xl border border-dashed border-[#CBD0D6] px-4 py-14 text-center text-[#5B6675]">
                  Tidak ada pesanan pada filter ini. Ubah status atau kosongkan
                  kata kunci pencarian.
                </p>
              ) : (
                visible.map((order) => (
                  <article key={order.id} className={card}>
                    <header className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E4E7EB] px-5 py-4 sm:px-6">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                        <b className="text-[0.95rem]">#{order.id}</b>
                        <span className="text-[0.85rem] text-[#5B6675]">
                          {order.createdAt}
                        </span>
                        <span
                          className={
                            order.status === "processing" ? badgeGold : badge
                          }
                        >
                          {order.statusLabel}
                        </span>
                      </div>
                      <div className="text-right">
                        <p className="text-[0.8rem] font-medium text-[#5B6675]">
                          {order.status === "testing"
                            ? "Menunggu pelepasan escrow"
                            : "Nilai pesanan"}
                        </p>
                        <p
                          className={`${display} text-[1.35rem] leading-none text-[#0B4F3F]`}
                        >
                          {money(order.amount)}
                        </p>
                      </div>
                    </header>

                    <div className="grid gap-6 p-5 sm:p-6 lg:grid-cols-[1.5fr_1fr_14rem] lg:items-center">
                      <div className="flex gap-4">
                        <img
                          src={order.image}
                          alt={order.product}
                          className="h-20 w-20 shrink-0 rounded-xl object-cover"
                        />
                        <div className="min-w-0">
                          <span className={badgeNeutral}>{order.passport}</span>
                          <h3 className="mt-2 text-[0.98rem] leading-snug font-semibold">
                            {order.product}
                          </h3>
                          <p className="mt-1 text-[0.85rem] text-[#5B6675]">
                            {order.buyer} · trust {order.buyerScore}/100
                          </p>
                          <p className="text-[0.85rem] text-[#5B6675]">
                            {order.location}
                          </p>
                        </div>
                      </div>

                      <div>
                        <p className="text-[0.9rem] font-semibold">
                          {order.logistics}
                        </p>
                        {order.deadline && (
                          <p className="mt-1 text-[0.85rem] text-[#5B6675]">
                            Batas penyerahan {order.deadline}
                          </p>
                        )}
                        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#ECEEEB]">
                          <div
                            className="h-full rounded-full bg-[#0B4F3F] transition-[width] duration-500"
                            style={{
                              width: progressByStatus[order.status] ?? "100%",
                            }}
                          />
                        </div>
                        <p className="mt-2 text-[0.82rem] text-[#5B6675]">
                          {order.sleeve}
                        </p>
                      </div>

                      <div className="flex flex-col gap-2">
                        {order.status === "processing" ? (
                          <>
                            <Link
                              className={`${btnLinkPrimary} sm:w-full`}
                              href={`/seller/orders/${order.id}`}
                            >
                              <CircleCheck size={16} /> Proses dan serahkan
                            </Link>
                            <Link
                              className={`${btnLinkSecondary} sm:w-full`}
                              href="/chat"
                            >
                              <MessageCircle size={16} /> Chat pembeli
                            </Link>
                          </>
                        ) : (
                          <>
                            <Link
                              className={`${btnLinkSecondary} sm:w-full`}
                              href={`/seller/orders/${order.id}`}
                            >
                              Lihat rincian
                            </Link>
                            <button
                              type="button"
                              className={`${btnSecondary} sm:w-full`}
                              onClick={() =>
                                notify(
                                  order.status === "shipping"
                                    ? "Pelacakan kurir dibuka."
                                    : "Rincian escrow dibuka.",
                                )
                              }
                            >
                              {order.status === "shipping"
                                ? "Lacak kurir"
                                : "Detail escrow"}
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </article>
                ))
              )}
            </div>
          </section>

          {/* ============ Protokol dan escrow ============ */}
          <section className="grid gap-6 lg:grid-cols-2">
            <article className={cardPad}>
              <h2 className={cardTitle}>Protokol logistik rendah emisi</h2>
              <ol className="mt-6 space-y-5">
                {protocol.map((item, i) => (
                  <li key={item.title} className="flex gap-4">
                    <span
                      className={`${display} text-[2.5rem] leading-none text-[#C29A4B]`}
                    >
                      {i + 1}
                    </span>
                    <div className="min-w-0 pt-1">
                      <p className="text-[0.95rem] leading-snug font-semibold">
                        {item.title}
                      </p>
                      <p className="mt-1 text-[0.88rem] leading-relaxed text-[#5B6675]">
                        {item.text}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </article>

            <article className={cardPad}>
              <h2 className={cardTitle}>Circular Escrow Vault</h2>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-[#5B6675]">
                Dana pembeli diamankan selama transit dan masa uji 48 jam.
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-[#ECEEEB] p-4">
                  <p className="text-[0.8rem] font-medium text-[#5B6675]">
                    Saldo tertahan
                  </p>
                  <p className={`${display} mt-2 text-[1.6rem] leading-none`}>
                    Rp12.400.000
                  </p>
                  <p className="mt-1.5 text-[0.82rem] text-[#5B6675]">
                    8 pesanan aktif
                  </p>
                </div>
                <div className="rounded-2xl bg-[#E6F2ED] p-4">
                  <p className="text-[0.8rem] font-medium text-[#0A3D31]/70">
                    Siap dicairkan
                  </p>
                  <p
                    className={`${display} mt-2 text-[1.6rem] leading-none text-[#0A3D31]`}
                  >
                    Rp6.850.000
                  </p>
                  <p className="mt-1.5 text-[0.82rem] text-[#0A3D31]/70">
                    3 pesanan terverifikasi
                  </p>
                </div>
              </div>
              <div className="mt-5 flex gap-3.5 border-t border-[#E4E7EB] pt-5">
                <ShieldCheck
                  size={20}
                  className="mt-0.5 shrink-0 text-[#12705A]"
                />
                <div>
                  <p className="text-[0.95rem] font-semibold">
                    Ketepatan pengiriman 99,4%
                  </p>
                  <p className="mt-1 text-[0.88rem] leading-relaxed text-[#5B6675]">
                    Eco-Seller Tier 1 mendapat prioritas penjemputan kurir
                    listrik.
                  </p>
                </div>
              </div>
            </article>
          </section>
        </main>

        {toast && (
          <div className={toastBox} role="status" aria-live="polite">
            {toast}
          </div>
        )}
      </div>
    </SellerShell>
  );
}
