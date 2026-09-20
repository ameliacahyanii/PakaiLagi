"use client";

import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  CircleAlert,
  ClipboardCheck,
  Cpu,
  Flag,
  Home,
  Leaf,
  PackageSearch,
  Recycle,
  Search,
  Send,
  Truck,
  X,
} from "lucide-react";
import { type FormEvent, useState } from "react";

/* ---------- Style tokens ---------- */
const display = "font-[family-name:var(--font-display,Georgia,serif)]";
const body = "font-[family-name:var(--font-body,system-ui,sans-serif)]";
const focus =
  "focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#12705A]";
const card =
  "rounded-2xl border border-[#E4E7EB] bg-white shadow-[0_1px_2px_rgba(17,24,39,0.04),0_10px_28px_-14px_rgba(17,24,39,0.10)]";
const btn = `inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-5 text-[0.95rem] font-semibold no-underline transition-colors`;
const btnPrimary = `${btn} ${focus} bg-[#0B4F3F] !text-white hover:bg-[#083D31]`;
const btnOutline = `${btn} ${focus} border border-[#E4E7EB] !text-[#111827] hover:border-[#0B4F3F]`;

const recoveryPaths = [
  {
    href: "/explore",
    icon: Cpu,
    title: "Katalog Barang Terverifikasi",
    description:
      "Temukan barang preloved yang sudah punya skor kondisi dan Circular Passport.",
  },
  {
    href: "/status",
    icon: Truck,
    title: "Status Pesanan & Serah Terima",
    description:
      "Lacak transaksi aktif serta jadwal dan kode serah terima hingga barang diterima.",
  },
  {
    href: "/items/new",
    icon: PackageSearch,
    title: "Jual atau Titip Barang",
    description:
      "Unggah foto barang untuk mendapat rekomendasi jalur sirkular dan rentang harga.",
  },
  {
    href: "/profile",
    icon: Leaf,
    title: "Dampak & Circular Passport",
    description:
      "Pantau kontribusi pengurangan e-waste, emisi CO₂e, dan riwayat paspor barangmu.",
  },
];

const metrics = [
  { icon: Recycle, value: "98,4%", label: "Serah Terima Sukses" },
  { icon: BadgeCheck, value: "48", label: "Inspeksi Adaptif Aktif" },
  { icon: ClipboardCheck, value: "100%", label: "Kode Terkonfirmasi" },
  { icon: Leaf, value: "12,4 ton", label: "CO₂e Tercegah" },
];

export default function NotFound() {
  const [query, setQuery] = useState("");
  const [reportOpen, setReportOpen] = useState(false);
  const [report, setReport] = useState("");
  const [message, setMessage] = useState("");

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalized = query.trim();
    window.location.href = normalized
      ? `/explore?q=${encodeURIComponent(normalized)}`
      : "/explore";
  }

  function submitReport(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("Terima kasih. Kendala tautan telah dicatat secara lokal.");
    setReport("");
    setTimeout(() => setReportOpen(false), 1800);
  }

  return (
    <main
      className={`${body} relative min-h-screen overflow-hidden bg-[#F7F8F7] text-[#111827]`}
    >
      {/* Ambient glow dekoratif */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[-10rem] left-1/2 h-[28rem] w-[42rem] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
        style={{
          background: "radial-gradient(closest-side, #E6F2ED, transparent)",
        }}
      />

      <div className="relative mx-auto flex w-full max-w-[720px] flex-col items-center gap-10 px-4 pt-16 pb-20 text-center sm:px-6">
        <section className="flex flex-col items-center gap-6">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FBEAEA] px-3 py-1 text-xs font-semibold text-[#B3261E]">
            <CircleAlert size={14} /> Rute Sirkular Terputus
          </span>

          {/* Ilustrasi 404 */}
          <div className="flex items-center gap-2" aria-label="Error 404">
            <span
              className={`${display} text-7xl font-normal text-[#0A3D31] sm:text-8xl`}
            >
              4
            </span>
            <div className="relative grid h-20 w-20 place-items-center sm:h-24 sm:w-24">
              <svg
                viewBox="0 0 100 100"
                aria-hidden="true"
                className="h-full w-full"
              >
                <path
                  d="M50 12 A38 38 0 0 1 88 50"
                  fill="none"
                  stroke="#0B4F3F"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
                <path d="M88 44 L88 52 L80 50" fill="#0B4F3F" />
                <path
                  d="M50 88 A38 38 0 0 1 12 50"
                  fill="none"
                  stroke="#C29A4B"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
                <path d="M12 56 L12 48 L20 50" fill="#C29A4B" />
                <path
                  d="M50 62 C50 44 40 38 36 36 C44 36 50 44 50 62Z"
                  fill="#12705A"
                />
                <path
                  d="M50 62 C50 48 58 42 64 42 C58 44 50 52 50 62Z"
                  fill="#E6F2ED"
                />
              </svg>
              <span className="absolute -top-1 -right-1 grid h-6 w-6 place-items-center rounded-full bg-[#B3261E] text-white">
                <X size={13} />
              </span>
            </div>
            <span
              className={`${display} text-7xl font-normal text-[#0A3D31] sm:text-8xl`}
            >
              4
            </span>
          </div>

          <div>
            <h1 className={`${display} text-2xl font-normal sm:text-3xl`}>
              Ups! Rute yang Kamu Cari Tidak Ditemukan
            </h1>
            <p className="mt-3 max-w-[46ch] text-[#5B6675]">
              Halaman atau barang ini mungkin sudah dialihkan, selesai
              ditransaksikan, atau tautannya berubah. Gunakan pencarian atau
              pilih salah satu jalur di bawah.
            </p>
          </div>

          <form
            onSubmit={submitSearch}
            className={`flex w-full max-w-md items-center gap-2 rounded-full border border-[#E4E7EB] bg-white py-1.5 pr-1.5 pl-4 ${focus}`}
          >
            <Search size={18} className="shrink-0 text-[#5B6675]" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Cari barang, kategori, atau jalur sirkular..."
              aria-label="Cari marketplace"
              className="w-full border-none bg-transparent text-sm outline-none placeholder:text-[#5B6675]"
            />
            <button
              type="submit"
              className={`${btnPrimary} min-h-10 shrink-0 px-4`}
            >
              Cari <ArrowRight size={16} />
            </button>
          </form>

          <Link href="/" className={btnOutline}>
            <Home size={18} /> Kembali ke Beranda
          </Link>
        </section>

        {/* ============ Metrik ============ */}
        <section
          aria-label="Metrik PakaiLagi"
          className={`${card} grid w-full grid-cols-2 divide-y divide-[#EDEFEC] sm:grid-cols-4 sm:divide-x sm:divide-y-0`}
        >
          {metrics.map(({ icon: Icon, value, label }) => (
            <article
              key={label}
              className="flex flex-col items-center gap-1.5 p-5"
            >
              <Icon size={22} className="text-[#0B4F3F]" />
              <strong className={`${display} text-xl font-normal`}>
                {value}
              </strong>
              <span className="text-xs text-[#5B6675]">{label}</span>
            </article>
          ))}
        </section>

        {/* ============ Jalur pemulihan ============ */}
        <section className="w-full text-left">
          <h2
            className={`${display} text-center text-xl font-normal sm:text-2xl`}
          >
            Mungkin Kamu Ingin Menuju ke Sini
          </h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {recoveryPaths.map(({ href, icon: Icon, title, description }) => (
              <Link
                key={href}
                href={href}
                className={`${card} group flex items-start gap-3 !text-[#111827] no-underline p-4 transition duration-200 hover:-translate-y-0.5 hover:border-[#0B4F3F]/40 ${focus}`}
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#E6F2ED] text-[#0B4F3F] transition-colors group-hover:bg-[#0B4F3F] group-hover:text-white">
                  <Icon size={20} />
                </span>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold">{title}</h3>
                  <p className="mt-1 text-sm text-[#5B6675]">{description}</p>
                </div>
                <ArrowRight
                  size={18}
                  className="mt-1 shrink-0 text-[#5B6675] transition-transform group-hover:translate-x-0.5 group-hover:text-[#0B4F3F]"
                />
              </Link>
            ))}
          </div>
        </section>

        {/* ============ Lapor kendala ============ */}
        <section
          className={`${card} flex w-full flex-col items-center gap-4 p-6 text-center sm:flex-row sm:text-left`}
        >
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#FBEAEA] text-[#B3261E]">
            <Flag size={20} />
          </span>
          <div className="flex-1">
            <h2 className="font-semibold">
              Menemukan tautan bermasalah atau katalog yang hilang?
            </h2>
            <p className="mt-1 text-sm text-[#5B6675]">
              Laporkan supaya navigasi dan alur sirkular PakaiLagi tetap
              terjaga.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setReportOpen((v) => !v)}
            aria-expanded={reportOpen}
            aria-controls="report-form"
            className={`${btnOutline} shrink-0`}
          >
            <Flag size={16} /> Laporkan Kendala
          </button>
        </section>

        {reportOpen && (
          <form
            id="report-form"
            onSubmit={submitReport}
            className={`${card} w-full p-5 text-left`}
          >
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-sm font-semibold">
                <Send size={16} /> Detail Kendala Tautan
              </span>
              <button
                type="button"
                onClick={() => setReportOpen(false)}
                aria-label="Tutup laporan"
                className={`rounded-lg p-1 text-[#5B6675] hover:text-[#111827] ${focus}`}
              >
                <X size={16} />
              </button>
            </div>
            <p className="mt-1 text-sm text-[#5B6675]">
              Alamat yang kamu akses akan dicatat. Tambahkan konteks singkat
              bila perlu.
            </p>
            <div className="mt-3 flex flex-col gap-2.5 sm:flex-row">
              <input
                value={report}
                onChange={(event) => setReport(event.target.value)}
                placeholder="Contoh: Saya mencari produk dari tautan chat penjual..."
                required
                className={`w-full rounded-xl border border-[#E4E7EB] px-4 py-2.5 text-sm ${focus}`}
              />
              <button type="submit" className={`${btnPrimary} shrink-0`}>
                Kirim Masukan
              </button>
            </div>
            {message && (
              <span className="mt-3 block text-sm font-semibold text-[#0B4F3F]">
                {message}
              </span>
            )}
          </form>
        )}

        <div className="flex items-center gap-2 text-sm text-[#5B6675]">
          <PackageSearch size={16} /> Kamu tetap bisa mencari seluruh katalog
          dari halaman Temukan.
        </div>
      </div>
    </main>
  );
}
