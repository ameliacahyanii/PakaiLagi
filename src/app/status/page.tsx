"use client";
import Link from "next/link";
import {
  Check,
  CheckCircle,
  Clock3,
  Download,
  FileCheck2,
  History,
  Leaf,
  LockKeyhole,
  MapPin,
  MessageCircle,
  PackageCheck,
  RotateCw,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  MarketplaceFooter,
  MarketplaceHeader,
} from "@/components/marketplace/MarketplaceShell";

const productImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCvkJ0IRry4SchIUAhqu5oHBgrwtzVxdclvxVOlt1YLpaTxzZ3JFZDhq6Fc4mX5w3C-L1Jxxq_FJE11tO1Lp5EG-TZibBRFf7s_0kMd9MQm5NdvRr0rc7xq7ls4w-CMrX696GSe1SlaiRctyHjRbVpwAS7v2h1LvX7XxBG8Yr2qY52tER2RASTkzJgcSsG1FIvbvNzZn9kc8OwqU1PLlNhSSLRCc-uV1YCD08IrW3FglsI1TPpu0moe";

type StepStatus = "done" | "active" | "pending";

const steps: {
  name: string;
  meta: string;
  status: StepStatus;
  icon: typeof Check;
}[] = [
  {
    name: "Pembayaran Selesai",
    meta: "19 Sep 2026 • 14:35",
    status: "done",
    icon: Check,
  },
  {
    name: "Penyiapan & Audit",
    meta: "Sedang berjalan",
    status: "active",
    icon: RotateCw,
  },
  {
    name: "Pengiriman Sirkular",
    meta: "Hub Tebet",
    status: "pending",
    icon: Truck,
  },
  {
    name: "Uji Mandiri 48 Jam",
    meta: "Verifikasi skor 88",
    status: "pending",
    icon: FileCheck2,
  },
  {
    name: "Selesai & Escrow Cair",
    meta: "Tahap akhir",
    status: "pending",
    icon: LockKeyhole,
  },
];

const logs = [
  {
    time: "14:35",
    title: "Pembayaran Virtual Account Diterima",
    text: "Sandbox memvalidasi pembayaran simulasi Rp4.500.000.",
  },
  {
    time: "14:36",
    title: "Circular Escrow Mengunci Dana",
    text: "Dana dummy ditahan hingga konfirmasi pembeli atau masa uji selesai.",
  },
  {
    time: "14:40",
    title: "Penjual Mengonfirmasi Pesanan",
    text: "Rian Pratama menyetujui jadwal serah terima di Hub Tebet.",
  },
  {
    time: "15:00",
    title: "Pengemasan Zero-Waste Berjalan",
    text: "Kamera masuk ke padded sleeve returnable #SWAP-BAG-092.",
  },
];

const diagnostics = [
  { label: "Optik & Kaca Lensa", value: "96% Bersih", note: "Bebas jamur" },
  { label: "Sensor CMOS", value: "100% Bebas Cacat", note: "No dead pixel" },
  { label: "Bodi & Ergonomi", value: "84% Minor Scuff", note: "Goresan wajar" },
];

const summary = [
  { label: "Harga Kesepakatan", value: "Rp4.500.000" },
  { label: "Ongkir Hub", value: "Gratis" },
  { label: "Escrow & Asuransi", value: "Gratis" },
];

/* ---------- Style tokens ---------- */
const display = "font-[family-name:var(--font-display,Georgia,serif)]";
const body = "font-[family-name:var(--font-body,system-ui,sans-serif)]";
const focus =
  "focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#12705A]";
const focusDark =
  "focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-white";
const card =
  "rounded-2xl border border-[#E4E7EB] bg-white p-5 shadow-[0_1px_2px_rgba(17,24,39,0.04),0_10px_28px_-14px_rgba(17,24,39,0.10)] sm:p-6";
const badge =
  "inline-flex items-center gap-1.5 rounded-full bg-[#E6F2ED] px-3 py-1 text-xs font-semibold text-[#0B4F3F]";
const cardTitle = "text-[1.1rem] font-semibold tracking-tight";
const btn =
  "inline-flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-xl px-5 text-[0.92rem] font-semibold transition-colors disabled:cursor-wait sm:w-auto";
const btnGold = `${btn} ${focusDark} bg-[#E2BC6B] text-[#111827] hover:bg-[#ECCB86]`;
const btnGhostDark = `${btn} ${focusDark} border border-white/30 text-white hover:bg-white/10`;
const btnOutline = `${btn} ${focus} border border-[#E4E7EB] bg-white text-[#111827] hover:border-[#0B4F3F]`;

/* ---------- Tahapan transaksi ---------- */
function Tracker() {
  return (
    <ol className="mt-8 grid gap-6 lg:grid-cols-5 lg:gap-4">
      {steps.map(({ name, meta, status, icon: Icon }, i) => {
        const last = i === steps.length - 1;
        const done = status === "done";
        const active = status === "active";
        return (
          <li key={name} className="relative flex gap-4 lg:flex-col lg:gap-3">
            <div className="flex items-center lg:w-full">
              <span
                className={`relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full border-2 ${
                  done
                    ? "border-[#0B4F3F] bg-[#0B4F3F] text-white"
                    : active
                      ? "border-[#0B4F3F] bg-white text-[#0B4F3F] ring-4 ring-[#E6F2ED]"
                      : "border-[#E4E7EB] bg-white text-[#7A8593]"
                }`}
              >
                <Icon
                  size={17}
                  className={
                    active ? "animate-spin motion-reduce:animate-none" : ""
                  }
                />
              </span>
              {!last && (
                <span
                  aria-hidden="true"
                  className={`ml-2 hidden h-0.5 flex-1 rounded-full lg:block ${
                    done ? "bg-[#0B4F3F]" : "bg-[#E4E7EB]"
                  }`}
                />
              )}
            </div>
            {!last && (
              <span
                aria-hidden="true"
                className={`absolute top-10 -bottom-6 left-5 w-0.5 -translate-x-1/2 lg:hidden ${
                  done ? "bg-[#0B4F3F]" : "bg-[#E4E7EB]"
                }`}
              />
            )}
            <div className="min-w-0 pt-1.5 lg:pt-0">
              <b
                className={`block text-[0.92rem] leading-snug font-semibold ${
                  status === "pending" ? "text-[#5B6675]" : "text-[#111827]"
                }`}
              >
                {name}
              </b>
              <small
                className={`mt-0.5 block text-[0.8rem] ${
                  active ? "font-semibold text-[#0B4F3F]" : "text-[#5B6675]"
                }`}
              >
                {meta}
              </small>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

export default function StatusPage() {
  const [invoice, setInvoice] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  function downloadInvoice() {
    setInvoice(true);
    timer.current = setTimeout(() => setInvoice(false), 1200);
  }

  return (
    <div
      className={`${body} min-h-screen bg-[#F7F8F7] text-[#111827] antialiased`}
    >
      <MarketplaceHeader />
      <main className="mx-auto flex w-full max-w-[1200px] flex-col gap-6 px-4 pt-6 pb-16 sm:px-6 sm:pt-8 sm:pb-24">
        {/* Breadcrumb */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 text-sm text-[#5B6675]"
          >
            <Link
              href="/"
              className={`!text-[#5B6675] no-underline hover:!text-[#0B4F3F] hover:underline ${focus}`}
            >
              Beranda
            </Link>
            <span aria-hidden="true">›</span>
            <span>Pesanan Saya</span>
            <span aria-hidden="true">›</span>
            <b className="font-semibold text-[#111827]">#ORDER-SIM-88219</b>
          </nav>
          <span className={badge}>
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#12705A] opacity-50 motion-reduce:animate-none" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#12705A]" />
            </span>
            Live Escrow Active
          </span>
        </div>

        {/* Banner status */}
        <section className="flex flex-col gap-6 rounded-3xl bg-[#0A3D31] p-6 text-white sm:p-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex gap-4 sm:gap-5">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#E2BC6B] text-[#111827] sm:h-14 sm:w-14">
              <CheckCircle size={26} />
            </span>
            <div>
              <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-[#E2BC6B]">
                Pembayaran Diterima • Rp4.500.000
              </span>
              <h1
                className={`${display} mt-3 max-w-[22ch] text-[1.9rem] leading-[1.1] font-normal tracking-[-0.01em] sm:text-[2.4rem]`}
              >
                Pesanan sedang diproses & diaudit penjual
              </h1>
              <p className="mt-3 max-w-[54ch] text-[0.95rem] leading-relaxed text-white/75">
                Pembayaran simulasi tercatat. Penjual menyiapkan unit dan
                verifikasi fisik sebelum serah terima zero-waste.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:shrink-0 lg:flex-col xl:flex-row">
            <button type="button" className={btnGold}>
              <MessageCircle size={17} /> Hubungi Penjual
            </button>
            <button
              type="button"
              className={btnGhostDark}
              onClick={downloadInvoice}
              disabled={invoice}
            >
              {invoice ? (
                <RotateCw
                  size={17}
                  className="animate-spin motion-reduce:animate-none"
                />
              ) : (
                <Download size={17} />
              )}
              {invoice ? "Membuat..." : "Invoice Simulasi"}
            </button>
          </div>
        </section>

        {/* Tahapan */}
        <section className={card}>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className={cardTitle}>Tahapan Transaksi Sirkular</h2>
            <span className={badge}>
              <ShieldCheck size={14} /> Escrow Terproteksi
            </span>
          </div>
          <Tracker />
        </section>

        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
          {/* Kolom utama */}
          <div className="flex flex-col gap-6">
            {/* Paspor sirkular */}
            <section className={card}>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className={cardTitle}>Rincian Barang & Paspor Sirkular</h2>
                <span className="rounded-full border border-[#E4E7EB] px-3 py-1 text-xs font-semibold text-[#5B6675]">
                  #PASSPORT-ID-SNY-9921
                </span>
              </div>

              <div className="mt-5 flex flex-col gap-5 sm:flex-row">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={productImage}
                  alt="Sony Alpha A6000"
                  className="h-44 w-full shrink-0 rounded-xl bg-[#F0F2EF] object-cover sm:h-32 sm:w-32"
                />
                <div className="min-w-0">
                  <span className={badge}>Skor AI 88/100</span>
                  <h3 className="mt-2.5 text-[1.15rem] leading-snug font-semibold">
                    Sony Alpha A6000 Kit 16-50mm OSS
                  </h3>
                  <p
                    className={`${display} mt-1 text-[2rem] leading-none font-normal`}
                  >
                    Rp4.500.000
                  </p>
                  <p className="mt-2.5 text-sm leading-relaxed text-[#5B6675]">
                    Shutter 8.450 • Garansi Fisik 48 Jam • Penjual Rian Pratama
                    ★ 4.9
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {diagnostics.map((d) => (
                  <div key={d.label} className="rounded-xl bg-[#F7F8F7] p-4">
                    <span className="block text-[0.8rem] text-[#5B6675]">
                      {d.label}
                    </span>
                    <strong className="mt-1 block text-[0.98rem] font-semibold">
                      {d.value}
                    </strong>
                    <small className="text-[0.8rem] text-[#5B6675]">
                      {d.note}
                    </small>
                  </div>
                ))}
              </div>
            </section>

            {/* Rute pengiriman */}
            <section className={card}>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className={cardTitle}>Rute Pengiriman & Serah Terima</h2>
                <span className={badge}>
                  <Leaf size={13} /> Zero-Waste Returnable Tote
                </span>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="flex gap-3 rounded-xl border border-[#E4E7EB] p-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#E6F2ED] text-[#0B4F3F]">
                    <MapPin size={19} />
                  </span>
                  <div className="min-w-0">
                    <strong className="block font-semibold">
                      Circular Hub Tebet
                    </strong>
                    <span className="text-sm text-[#5B6675]">
                      Pintu Barat Transit Hub • 16.30-18.00 WIB
                    </span>
                  </div>
                </div>
                <div className="flex gap-3 rounded-xl border border-[#E4E7EB] p-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#E6F2ED] text-[#0B4F3F]">
                    <Truck size={19} />
                  </span>
                  <div className="min-w-0">
                    <strong className="block font-semibold">
                      Hendra Wijaya
                    </strong>
                    <span className="text-sm text-[#5B6675]">
                      Motor Listrik #EV-JKT-04
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-3 flex gap-3 rounded-xl bg-[#E6F2ED] p-4 text-sm leading-relaxed text-[#0A3D31]">
                <PackageCheck size={20} className="mt-0.5 shrink-0" />
                <span>
                  Unit dibungkus padded sleeve daur ulang dan wajib dikembalikan
                  kepada kurir.
                </span>
              </div>

              <div className="mt-3 grid h-36 place-items-center rounded-xl border border-dashed border-[#CBD0D6] bg-[#F7F8F7] px-4 text-center text-sm text-[#5B6675]">
                <span className="flex flex-col items-center gap-2 sm:flex-row">
                  <MapPin size={18} className="text-[#0B4F3F]" />
                  Lokasi Hub: Stasiun Tebet • Siap pukul 16.30
                </span>
              </div>
            </section>

            {/* Log aktivitas */}
            <section className={card}>
              <div className="flex items-center gap-2.5">
                <History size={20} className="text-[#0B4F3F]" />
                <h2 className={cardTitle}>
                  Log Aktivitas Pesanan Terverifikasi
                </h2>
              </div>
              <ol className="mt-6">
                {logs.map((log, index) => {
                  const last = index === logs.length - 1;
                  return (
                    <li
                      key={log.time}
                      className="relative grid grid-cols-[2.75rem_1.75rem_minmax(0,1fr)] gap-x-3 pb-6 last:pb-0"
                    >
                      <b className="pt-0.5 text-sm font-semibold text-[#5B6675]">
                        {log.time}
                      </b>
                      <span
                        className={`relative z-10 grid h-7 w-7 place-items-center rounded-full ${
                          last
                            ? "bg-[#F5ECD7] text-[#8A6A25]"
                            : "bg-[#E6F2ED] text-[#0B4F3F]"
                        }`}
                      >
                        {last ? <Clock3 size={14} /> : <Check size={14} />}
                      </span>
                      {!last && (
                        <span
                          aria-hidden="true"
                          className="absolute top-7 -bottom-0 left-[4.375rem] w-px -translate-x-1/2 bg-[#E4E7EB]"
                        />
                      )}
                      <div className="min-w-0">
                        <strong className="block text-[0.95rem] leading-snug font-semibold">
                          {log.title}
                        </strong>
                        <p className="mt-1 text-sm leading-relaxed text-[#5B6675]">
                          {log.text}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="flex flex-col gap-6 lg:sticky lg:top-24">
            {/* Escrow (fokus) */}
            <section className="rounded-2xl bg-[#0A3D31] p-5 text-white sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-[1.1rem] font-semibold tracking-tight">
                  Circular Escrow
                </h2>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-[#E2BC6B]">
                  <LockKeyhole size={12} /> Terkunci aman
                </span>
              </div>
              <div className="mt-6">
                <span className="text-sm text-white/65">Nominal Escrow</span>
                <p
                  className={`${display} mt-1 text-[2.6rem] leading-none font-normal`}
                >
                  Rp4.500.000
                </p>
                <b className="mt-2 block text-sm font-medium text-[#E2BC6B]">
                  100% dilindungi kebijakan retur
                </b>
              </div>
              <div className="mt-6 space-y-2.5">
                <div className="flex gap-3 rounded-xl bg-white/10 p-3.5 text-sm leading-relaxed text-white/85">
                  <LockKeyhole size={18} className="mt-0.5 shrink-0" />
                  Dana tidak diteruskan sebelum uji mandiri 48 jam selesai.
                </div>
                <div className="flex gap-3 rounded-xl bg-white/10 p-3.5 text-sm leading-relaxed text-white/85">
                  <ShieldCheck size={18} className="mt-0.5 shrink-0" />
                  Ajukan komplain jika kondisi tidak sesuai skor AI.
                </div>
              </div>
            </section>

            {/* Rincian transaksi */}
            <section className={card}>
              <h3 className={cardTitle}>Rincian Transaksi Simulasi</h3>
              <dl className="mt-4 text-[0.92rem]">
                {summary.map((s) => (
                  <div
                    key={s.label}
                    className="flex items-center justify-between gap-4 py-2"
                  >
                    <dt className="text-[#5B6675]">{s.label}</dt>
                    <dd className="font-semibold">{s.value}</dd>
                  </div>
                ))}
                <div className="mt-2 flex items-baseline justify-between gap-4 border-t border-[#E4E7EB] pt-4">
                  <dt className="font-semibold">Total</dt>
                  <dd
                    className={`${display} text-[1.7rem] leading-none font-normal`}
                  >
                    Rp4.500.000
                  </dd>
                </div>
              </dl>
              <small className="mt-4 block text-[0.8rem] text-[#5B6675]">
                BCA Virtual Account Sandbox • #TRX-2026-99120
              </small>
            </section>

            {/* Dampak */}
            <section className={card}>
              <h3 className={cardTitle}>Dampak Sirkular Anda</h3>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-[#F7F8F7] p-4">
                  <strong
                    className={`${display} block text-[1.8rem] leading-none font-normal`}
                  >
                    420 g
                  </strong>
                  <span className="mt-1.5 block text-[0.8rem] text-[#5B6675]">
                    E-waste dihindari
                  </span>
                </div>
                <div className="rounded-xl bg-[#F7F8F7] p-4">
                  <strong
                    className={`${display} block text-[1.8rem] leading-none font-normal`}
                  >
                    18,4 kg
                  </strong>
                  <span className="mt-1.5 block text-[0.8rem] text-[#5B6675]">
                    CO₂e dicegah
                  </span>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2.5 rounded-xl bg-[#E6F2ED] p-3.5 text-sm text-[#0A3D31]">
                <Leaf size={17} className="shrink-0" />
                +45 poin setelah masa inspeksi selesai.
              </div>
            </section>

            <button type="button" className={`${btnOutline} sm:w-full`}>
              <FileCheck2 size={18} /> Panduan Inspeksi 48 Jam
            </button>
          </aside>
        </div>
      </main>
      <MarketplaceFooter />
    </div>
  );
}
