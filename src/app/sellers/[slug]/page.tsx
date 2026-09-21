"use client";
import Link from "next/link";
import {
  BadgeCheck,
  CheckCircle,
  ChevronDown,
  ChevronRight,
  Leaf,
  MessageCircle,
  PackageCheck,
  Recycle,
  Share2,
  ShieldCheck,
  Star,
  UserPlus,
  Verified,
  X,
  Check,
} from "lucide-react";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import {
  MarketplaceFooter,
  MarketplaceHeader,
} from "@/components/marketplace/MarketplaceShell";
import { SellerProductCard } from "@/components/profile/SellerProductCard";
import { sellerProducts } from "@/data/profile-data";
import {
  actionsRow,
  badge,
  badgeNeutral,
  btnPrimary,
  btnSecondary,
  card,
  cardPad,
  cardTitle,
  closeBtn,
  container,
  display,
  focus,
  h1,
  h2,
  modalBackdrop,
  modalFooter,
  modalHeader,
  modalPanel,
  modalTitle,
  pageBg,
  segTab,
  segmented,
  textarea,
  toastBox,
} from "@/components/ui/tokens";
import Image from "next/image";

const sellerAvatar =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuC89Ju9TrM9Qsk6N1abB41TMpGJZvYoy4MHvvZoSgokOoipLvmiX0CC0KtlFlv_bXKojBN1V1uVtQ-fN3kt8PCzpQ1r7m9Ny0e3HBJFajwzkDygE8Ss8Czpq9jrcTbLXDd7woKRC-mh7h9RR3FyCYypo-wjnDcQ_yP8pK4cfsPlRJIJwSN56po7ZzQtsrzTTHrqOagPryGh9k3mYPdKW6Etl2Riao48oz48_dPZO1ipWnah_oor3StK";
const packagingImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAEd-yLJ6w_-4XXh2cr5073VjzHYgdB-L8022iJpWOA7Z4z8bi2e4UWpFc5q8_KCOxin0oqqtesleyMJdWJEjdPO7QLmWlDIi75u6GPhmSp802Lfu0Rrfd1M76vMdl-vfaFhr4B1_R7RyfESY96LNlqNONGPzujX4-mGY7f7orEmboW0RCF-uIlryatDR77ws3oAMrMqQCLmmXzK74XuD4TY5fLhKu3P0a6dgls2XEDMZloi6u1n0v4";

const metrics = [
  {
    icon: BadgeCheck,
    value: "98/100",
    label: "Skor reputasi sirkular",
  },
  {
    icon: Recycle,
    value: "18 unit",
    label: "Barang tersalurkan",
  },
  {
    icon: CheckCircle,
    value: "0% komplain",
    label: "Retur bebas ribet",
  },
];

const tabs = [
  { id: "all", label: "Semua produk" },
  { id: "camera", label: "Kamera dan optik" },
  { id: "accessory", label: "Aksesori dan gawai" },
];

const protocols = [
  {
    icon: PackageCheck,
    title: "Returnable Sleeve",
    text: "Bantalan serat daur ulang yang bisa dikembalikan gratis.",
  },
  {
    icon: Leaf,
    title: "Drybox khusus optik",
    text: "Ruang terkontrol RH 40–45% untuk mencegah jamur dan kondensasi.",
  },
];

const reviews = [
  {
    initials: "AS",
    name: "Arya Setiawan",
    item: "Fujifilm X-T30 Body",
    score: 92,
    text: "Pengemasan sleeve sirkular rapi. Sensor bersih dan performa autofocus sesuai laporan audit.",
  },
  {
    initials: "DW",
    name: "Dewi Wulandari",
    item: "Sony FE 85mm f/1.8",
    score: 96,
    text: "Lensa dirawat dalam drybox. Fokus mulus dan penjual sangat terbuka soal riwayat servis.",
  },
  {
    initials: "MK",
    name: "Michael Kevin",
    item: "iPad Mini 5 dan Pencil",
    score: 89,
    text: "Proses swap lancar lewat escrow. Kondisi baterai sama dengan bukti diagnostik yang diberikan.",
  },
];

const sortOptions = [
  { value: "score", label: "Skor AI tertinggi" },
  { value: "price-low", label: "Harga terendah" },
  { value: "price-high", label: "Harga tertinggi" },
];

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

  const onKeyDown = (e: ReactKeyboardEvent) => {
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

export default function SellerProfilePage() {
  const [followed, setFollowed] = useState(false);
  const [chat, setChat] = useState(false);
  const [tab, setTab] = useState("all");
  const [sort, setSort] = useState("score");
  const [toast, setToast] = useState("");

  const visible = useMemo(
    () =>
      sellerProducts
        .filter((product) => tab === "all" || product.category === tab)
        .sort((a, b) =>
          sort === "price-low"
            ? a.price - b.price
            : sort === "price-high"
              ? b.price - a.price
              : b.score - a.score,
        ),
    [sort, tab],
  );

  useEffect(() => {
    if (!chat) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setChat(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [chat]);

  function notify(value: string) {
    setToast(value);
    setTimeout(() => setToast(""), 2400);
  }

  return (
    <div className={pageBg}>
      <MarketplaceHeader />

      {/* ============ Breadcrumb ============ */}
      <div className="border-b border-[#E4E7EB] bg-white">
        <div className={container}>
          <nav
            aria-label="Navigasi breadcrumb"
            className="flex items-center gap-1.5 py-3 text-sm text-[#5B6675]"
          >
            <Link
              href="/"
              className={`rounded font-medium transition-colors hover:text-[#0B4F3F] ${focus}`}
            >
              Beranda
            </Link>
            <ChevronRight size={14} className="shrink-0 text-[#CBD0D6]" />
            <Link
              href="/explore"
              className={`rounded font-medium transition-colors hover:text-[#0B4F3F] ${focus}`}
            >
              Eksplorasi
            </Link>
            <ChevronRight size={14} className="shrink-0 text-[#CBD0D6]" />
            <span className="truncate font-semibold text-[#111827]">
              Rian Pratama
            </span>
          </nav>
        </div>
      </div>

      {/* ============ Hero ============ */}
      <section className="bg-[#0A3D31] pt-10 pb-24 sm:pt-12 sm:pb-28">
        <div className={container}>
          <p className="max-w-[46ch] text-sm text-white/60">
            Toko sirkular terverifikasi PakaiLagi
          </p>
          <h1 className={`${h1} mt-3 text-white`}>Rian Pratama</h1>
          <p className="mt-4 max-w-[52ch] leading-relaxed text-white/75">
            Menjual kamera dan optik bekas yang dirawat dalam drybox, dikirim
            tanpa plastik sekali pakai.
          </p>
        </div>
      </section>

      <main
        className={`${container} flex flex-col gap-12 pb-16 sm:gap-16 sm:pb-20`}
      >
        {/* ============ Kartu identitas ============ */}
        <section className={`${card} -mt-16 p-5 sm:-mt-20 sm:p-7`}>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Image
                src={sellerAvatar}
                alt="Rian Pratama"
                className="h-20 w-20 shrink-0 rounded-full border-4 border-white object-cover shadow-[0_10px_28px_-14px_rgba(17,24,39,0.4)]"
              />
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={badge}>
                    <ShieldCheck size={13} /> Toko terverifikasi
                  </span>
                  <span className={badge}>
                    <Leaf size={13} /> Tier 1 Eco-Seller
                  </span>
                  <span className={badgeNeutral}>
                    <Verified size={13} /> Akurasi audit AI 98,4%
                  </span>
                </div>
                <p className="mt-3 text-[0.9rem] text-[#5B6675]">
                  Tebet, Jakarta Selatan · balas kurang dari 15 menit
                </p>
                <p className="mt-1 text-[0.9rem] text-[#5B6675]">
                  <span className="text-[#C29A4B]">★</span> 4,9 dari 42 ulasan ·
                  siap kurir listrik dan Returnable Sleeve
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap lg:shrink-0">
              <button
                type="button"
                className={btnPrimary}
                onClick={() => setChat(true)}
              >
                <MessageCircle size={17} /> Chat penjual
              </button>
              <button
                type="button"
                className={btnSecondary}
                onClick={() => {
                  setFollowed(!followed);
                  notify(
                    followed ? "Berhenti mengikuti toko." : "Mengikuti toko.",
                  );
                }}
              >
                <UserPlus size={17} />
                {followed ? "Mengikuti" : "Ikuti toko"}
              </button>
              <button
                type="button"
                aria-label="Bagikan profil toko"
                onClick={() => notify("Tautan profil disalin.")}
                className={`grid h-11 w-11 shrink-0 cursor-pointer place-items-center self-start rounded-xl border border-[#E4E7EB] bg-white text-[#5B6675] transition-colors hover:border-[#0B4F3F] hover:text-[#111827] ${focus}`}
              >
                <Share2 size={17} />
              </button>
            </div>
          </div>

          <div className="mt-7 grid divide-y divide-[#E4E7EB] border-t border-[#E4E7EB] pt-1 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {metrics.map(({ icon: Icon, value, label }) => (
              <div
                key={label}
                className="flex items-center gap-3.5 py-5 sm:px-6 sm:first:pl-0 sm:last:pr-0"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#E6F2ED] text-[#0B4F3F]">
                  <Icon size={20} />
                </span>
                <div className="min-w-0">
                  <p className={`${display} text-[1.5rem] leading-none`}>
                    {value}
                  </p>
                  <p className="mt-1.5 text-[0.82rem] text-[#5B6675]">
                    {label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ============ Katalog toko ============ */}
        <section id="katalog" className="scroll-mt-24">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className={h2}>Katalog toko</h2>
              <p
                className="mt-2 text-[0.95rem] text-[#5B6675]"
                aria-live="polite"
              >
                {visible.length} barang tersedia
              </p>
            </div>
            <div className="flex gap-4 text-sm font-semibold">
              <a
                href="#ulasan"
                className={`!text-[#0B4F3F] underline-offset-4 hover:underline ${focus}`}
              >
                Ulasan pembeli
              </a>
              <a
                href="#komitmen"
                className={`!text-[#0B4F3F] underline-offset-4 hover:underline ${focus}`}
              >
                Komitmen pengemasan
              </a>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div
              role="group"
              aria-label="Filter kategori produk"
              className="-mx-4 overflow-x-auto px-4 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden"
            >
              <div className={segmented}>
                {tabs.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    aria-pressed={tab === item.id}
                    onClick={() => setTab(item.id)}
                    className={segTab(tab === item.id)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
            <SortMenu value={sort} onChange={setSort} />
          </div>

          <div className="mt-8 grid grid-cols-[repeat(auto-fill,minmax(min(100%,240px),1fr))] gap-5">
            {visible.length === 0 ? (
              <p className="col-span-full rounded-2xl border border-dashed border-[#CBD0D6] px-4 py-14 text-center text-[#5B6675]">
                Belum ada barang di kategori ini. Coba kategori lain.
              </p>
            ) : (
              visible.map((product) => (
                <SellerProductCard key={product.id} product={product} />
              ))
            )}
          </div>
        </section>

        {/* ============ Komitmen pengemasan ============ */}
        <section
          id="komitmen"
          className={`${card} grid scroll-mt-24 gap-8 p-6 sm:p-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center`}
        >
          <div>
            <span className={badge}>
              <Verified size={13} /> Standar transparansi penjual
            </span>
            <h2 className={`${h2} mt-4`}>
              Pengemasan sirkular dan perawatan optik.
            </h2>
            <p className="mt-3 max-w-[52ch] leading-relaxed text-[#5B6675]">
              Setiap pengiriman meniadakan plastik sekali pakai tanpa
              mengorbankan keamanan optik dan presisi gawai.
            </p>
            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              {protocols.map(({ icon: Icon, title, text }) => (
                <div
                  key={title}
                  className="rounded-2xl border border-[#E4E7EB] p-5"
                >
                  <Icon size={22} className="text-[#12705A]" />
                  <h3 className={`${cardTitle} mt-4`}>{title}</h3>
                  <p className="mt-1.5 text-[0.88rem] leading-relaxed text-[#5B6675]">
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <Image
            src={packagingImage}
            alt="Kemasan sirkular returnable"
            className="aspect-[4/3] w-full rounded-2xl object-cover"
          />
        </section>

        {/* ============ Ulasan ============ */}
        <section id="ulasan" className="scroll-mt-24">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className={badge}>
                <Star size={13} /> Reputasi transaksi nyata
              </span>
              <h2 className={`${h2} mt-4 max-w-[24ch]`}>
                Ulasan pembeli setelah uji mandiri 48 jam.
              </h2>
            </div>
            <span className={badgeNeutral}>42 ulasan terverifikasi</span>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review) => (
              <article
                key={review.name}
                className={`${cardPad} flex flex-col justify-between gap-5`}
              >
                <div>
                  <div className="flex items-center gap-3">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#E6F2ED] text-[0.82rem] font-semibold text-[#0B4F3F]">
                      {review.initials}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-[0.95rem] font-semibold">
                        {review.name}
                      </p>
                      <p className="truncate text-[0.82rem] text-[#5B6675]">
                        {review.item}
                      </p>
                    </div>
                    <span
                      className="shrink-0 text-[0.9rem] text-[#C29A4B]"
                      aria-label="Lima dari lima bintang"
                    >
                      ★★★★★
                    </span>
                  </div>
                  <p className={`${badge} mt-4`}>
                    <CheckCircle size={12} /> Skor saat tiba {review.score}/100
                  </p>
                  <p className="mt-4 text-[0.92rem] leading-relaxed text-[#111827]/80">
                    {review.text}
                  </p>
                </div>
                <p className="border-t border-[#E4E7EB] pt-4 text-[0.8rem] text-[#5B6675]">
                  Transaksi tervalidasi PakaiLagi
                </p>
              </article>
            ))}
          </div>
        </section>
      </main>

      <MarketplaceFooter />

      {/* ============ Modal chat ============ */}
      {chat && (
        <div
          className={modalBackdrop}
          role="dialog"
          aria-modal="true"
          aria-labelledby="judul-chat"
          onClick={(event) => {
            if (event.target === event.currentTarget) setChat(false);
          }}
        >
          <div className={`${modalPanel} sm:max-w-lg`}>
            <div className={modalHeader}>
              <div>
                <h3 id="judul-chat" className={modalTitle}>
                  Chat dengan Rian Pratama
                </h3>
                <p className="mt-1.5 text-[0.9rem] text-[#5B6675]">
                  Tanyakan kondisi barang, hasil audit AI, atau opsi serah
                  terima.
                </p>
              </div>
              <button
                type="button"
                className={closeBtn}
                aria-label="Tutup"
                onClick={() => setChat(false)}
              >
                <X size={18} />
              </button>
            </div>

            <div className="overflow-y-auto p-4 sm:p-6">
              <label className="flex flex-col gap-1.5 text-[0.85rem] font-semibold">
                Pesan
                <textarea
                  rows={5}
                  className={textarea}
                  defaultValue="Halo, saya ingin bertanya tentang produk di toko Anda."
                />
              </label>
              <p className="mt-3 text-[0.85rem] leading-relaxed text-[#5B6675]">
                Penjual biasanya membalas kurang dari 15 menit pada jam kerja.
              </p>
            </div>

            <div className={modalFooter}>
              <p className="text-[0.82rem] text-[#5B6675]">
                Percakapan tercatat untuk perlindungan pembeli.
              </p>
              <div className={actionsRow}>
                <button
                  type="button"
                  className={btnSecondary}
                  onClick={() => setChat(false)}
                >
                  Batal
                </button>
                <button
                  type="button"
                  className={btnPrimary}
                  onClick={() => {
                    setChat(false);
                    notify("Pesan terkirim ke penjual.");
                  }}
                >
                  Kirim pesan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className={toastBox} role="status" aria-live="polite">
          {toast}
        </div>
      )}
    </div>
  );
}
