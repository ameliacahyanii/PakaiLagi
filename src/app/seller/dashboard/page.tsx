"use client";
import Link from "next/link";
import {
  ArrowRight,
  ClipboardList,
  Eye,
  Filter,
  Leaf,
  ScanLine,
  Send,
  ShieldCheck,
  Store,
  TriangleAlert,
} from "lucide-react";
import { useMemo, useState } from "react";
import { SellerShell } from "@/components/seller/SellerShell";
import { inventoryItems, InventoryStatus } from "@/data/seller-workspace-data";
import Image from "next/image";

/* ---------- Style tokens — identik dengan halaman lain ---------- */
const display = "font-[family-name:var(--font-display,Georgia,serif)]";
const focus =
  "focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#12705A]";
const card =
  "rounded-2xl border border-[#E4E7EB] bg-white shadow-[0_1px_2px_rgba(17,24,39,0.04),0_10px_28px_-14px_rgba(17,24,39,0.10)]";
const btn = `inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-4 text-sm font-semibold no-underline transition-colors`;
const btnPrimary = `${btn} ${focus} bg-[#0B4F3F] !text-white hover:bg-[#083D31]`;
const btnOutline = `${btn} ${focus} border border-[#E4E7EB] !text-[#111827] hover:border-[#0B4F3F]`;

const money = (value: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);

const carbonAvoided = 142.8;
const carbonTarget = 200;
const carbonPercent = Math.round((carbonAvoided / carbonTarget) * 100);

const metrics = [
  {
    label: "Listing Aktif",
    value: "8",
    foot: "3 menunggu pembeli",
    icon: Store,
  },
  {
    label: "Perlu Tindakan",
    value: "3",
    foot: "1 verifikasi inspeksi",
    icon: TriangleAlert,
  },
  {
    label: "Barang Tersalurkan",
    value: "24",
    foot: "18 jual · 4 tukar · 2 donasi",
    icon: Send,
  },
  {
    label: "Reuse & Recovery",
    value: "91,5%",
    foot: `${carbonAvoided} kg CO₂e dicegah`,
    icon: Leaf,
  },
];

const filters: { id: InventoryStatus | "all"; label: string }[] = [
  { id: "all", label: "Semua" },
  { id: "shipping" as InventoryStatus, label: "Perlu Tindakan" },
  { id: "active" as InventoryStatus, label: "Aktif" },
  { id: "draft" as InventoryStatus, label: "Draf" },
];

export default function SellerDashboard() {
  const [filter, setFilter] = useState<InventoryStatus | "all">("all");
  const [toast, setToast] = useState("");

  const visible = useMemo(
    () =>
      inventoryItems.filter(
        (item) => filter === "all" || item.status === filter,
      ),
    [filter],
  );

  function notify(message: string) {
    setToast(message);
    setTimeout(() => setToast(""), 2500);
  }

  return (
    <SellerShell>
      <main className="flex flex-col gap-8 px-4 py-8 sm:px-6 sm:py-10">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className={`${display} text-2xl font-normal sm:text-3xl`}>
              Selamat datang kembali, Budi!
            </h1>
            <p className="mt-1 text-[#5B6675]">
              Kelola inventaris sirkular dan pantau dampak lingkungan toko.
            </p>
          </div>
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() =>
                notify(
                  "Laporan lengkap akan tersedia setelah listing bertambah.",
                )
              }
              className={btnOutline}
            >
              <Filter size={16} /> Filter Laporan
            </button>
            <Link href="/seller/scan" className={btnPrimary}>
              <ScanLine size={16} /> Scan Barang AI
            </Link>
          </div>
        </div>

        {/* ============ Metrik ============ */}
        <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {metrics.map(({ label, value, foot, icon: Icon }) => (
            <div key={label} className={`${card} p-5`}>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-[#5B6675]">
                  {label}
                </span>
                <Icon size={18} className="text-[#0B4F3F]" />
              </div>
              <strong className={`${display} mt-2 block text-2xl font-normal`}>
                {value}
              </strong>
              <div className="mt-1 text-xs text-[#5B6675]">{foot}</div>
            </div>
          ))}
        </section>

        {/* ============ Banner draf siap ditinjau ============ */}
        <section
          className={`${card} flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between`}
        >
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E6F2ED] px-2.5 py-1 text-xs font-semibold text-[#0B4F3F]">
              Inspeksi Adaptif · #AI-88391
            </span>
            <h2 className={`${display} mt-2 text-xl font-normal`}>
              Draf Analisis Siap Ditinjau
            </h2>
            <p className="mt-1 text-sm text-[#5B6675]">
              Rak Buku Kayu 3 Susun memperoleh skor kondisi 82. Periksa jalur
              sirkular yang disarankan dan publikasikan.
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2.5">
            <button
              type="button"
              onClick={() => notify("Draf diabaikan.")}
              className={btnOutline}
            >
              Abaikan
            </button>
            <Link href="/items/rak-buku-kayu-3-susun" className={btnPrimary}>
              Tinjau & Publikasikan <ArrowRight size={16} />
            </Link>
          </div>
        </section>

        {/* ============ Tabel inventaris ============ */}
        <section>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className={`${display} text-xl font-normal`}>
                Inventaris Barang Terkini
              </h2>
              <span className="text-sm text-[#5B6675]">
                {visible.length} item
              </span>
            </div>
            <div className="inline-flex gap-1 rounded-xl bg-[#ECEEEB] p-1">
              {filters.map((item) => {
                const active = filter === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setFilter(item.id)}
                    className={`min-h-9 shrink-0 cursor-pointer rounded-lg px-3.5 text-sm font-semibold whitespace-nowrap transition-all ${focus} ${
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

          <div className={`${card} mt-4 overflow-x-auto`}>
            <table className="w-full min-w-[720px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-[#E4E7EB] text-left text-xs text-[#5B6675]">
                  <th className="px-4 py-3 font-semibold">Foto & Nama</th>
                  <th className="px-4 py-3 font-semibold">Kategori</th>
                  <th className="px-4 py-3 font-semibold">Jalur</th>
                  <th className="px-4 py-3 font-semibold">Skor</th>
                  <th className="px-4 py-3 font-semibold">Harga</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {visible.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-4 py-10 text-center text-[#5B6675]"
                    >
                      Belum ada barang pada status ini.
                    </td>
                  </tr>
                ) : (
                  visible.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b border-[#EDEFEC] last:border-0"
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <Image
                            src={item.image}
                            alt={item.name}
                            className="h-11 w-11 shrink-0 rounded-lg object-cover"
                          />
                          <div>
                            <b className="block">{item.name}</b>
                            <small className="text-[#5B6675]">
                              {item.note}
                            </small>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-[#5B6675]">
                        {item.category}
                      </td>
                      <td className="px-4 py-3">
                        <span className="rounded-full bg-[#F3F4F2] px-2.5 py-1 text-xs font-semibold text-[#5B6675]">
                          {item.route}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-[#5B6675]">
                        {item.score} · {item.condition}
                      </td>
                      <td className="px-4 py-3 font-semibold">
                        {money(item.price)}
                      </td>
                      <td className="px-4 py-3">
                        <span className="rounded-full bg-[#E6F2ED] px-2.5 py-1 text-xs font-semibold text-[#0B4F3F]">
                          {item.statusLabel}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <Link
                          href={`/items/${item.id}`}
                          aria-label={`Lihat ${item.name}`}
                          className={`grid h-9 w-9 place-items-center rounded-lg border border-[#E4E7EB] !text-[#111827] no-underline transition-colors hover:border-[#0B4F3F] ${focus}`}
                        >
                          <Eye size={16} />
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* ============ Ringkasan bawah ============ */}
        <section className="grid gap-4 sm:grid-cols-3">
          <div className={`${card} p-6`}>
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Jejak Karbon Dihindari</h3>
              <Leaf size={18} className="text-[#0B4F3F]" />
            </div>
            <strong className={`${display} mt-2 block text-2xl font-normal`}>
              {carbonAvoided} kg CO₂e
            </strong>
            <p className="mt-1 text-sm text-[#5B6675]">
              {carbonPercent}% dari target tahunan {carbonTarget} kg.
            </p>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#EDEFEC]">
              <div
                className="h-full rounded-full bg-[#0B4F3F]"
                style={{ width: `${carbonPercent}%` }}
              />
            </div>
          </div>

          <div className={`${card} p-6`}>
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Bantuan Inspeksi Adaptif</h3>
              <ClipboardList size={18} className="text-[#0B4F3F]" />
            </div>
            <p className="mt-2 text-sm text-[#5B6675]">
              Menyusun pertanyaan inspeksi sesuai kategori barang dan menandai
              hal yang perlu kamu periksa manual sebelum publikasi.
            </p>
            <b className="mt-2 block text-sm">
              Bukan pengganti pemeriksaan fisik
            </b>
          </div>

          <div className={`${card} p-6`}>
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Standar Kejujuran</h3>
              <ShieldCheck size={18} className="text-[#C29A4B]" />
            </div>
            <p className="mt-2 text-sm text-[#5B6675]">
              Transparansi cacat fisik meningkatkan kepercayaan pembeli pada
              listing kamu.
            </p>
            <span className="mt-2 inline-block rounded-full bg-[#E6F2ED] px-2.5 py-1 text-xs font-semibold text-[#0B4F3F]">
              Status: Mitra Unggul
            </span>
          </div>
        </section>
      </main>

      {toast && (
        <div
          role="status"
          className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-xl bg-[#111827] px-4 py-2.5 text-sm font-medium text-white shadow-lg"
        >
          {toast}
        </div>
      )}
    </SellerShell>
  );
}
