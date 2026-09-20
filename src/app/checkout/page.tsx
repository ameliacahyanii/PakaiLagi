"use client";
import Link from "next/link";
import {
  Check,
  CheckCircle,
  Clock3,
  Copy,
  KeyRound,
  Leaf,
  MapPin,
  PackageCheck,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  MarketplaceFooter,
  MarketplaceHeader,
} from "@/components/marketplace/MarketplaceShell";

/* ---------- Style tokens (shared with halaman lain) ---------- */
const display = "font-[family-name:var(--font-display,Georgia,serif)]";
const body = "font-[family-name:var(--font-body,system-ui,sans-serif)]";
const focus =
  "focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#12705A]";
const card =
  "rounded-2xl border border-[#E4E7EB] bg-white p-6 shadow-[0_1px_2px_rgba(17,24,39,0.04)]";

const productImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAiHK34Habb8AELrl8rrkO8_Z7FX4nUzOg1D1fM_i_6POatyDtAOHFN0CrJcDiXnuyhAa42xDLK28FR4m1hzZkYrpxcwsaslx9Fd2hRvxjRBZ7TCKClCQFrahmiq8tgZayPnTC9fyAJ2Esxu6NezmvcyArSUCwfDBv-npOSNUniNbAHvsTPg79ZdxFGUuC4hDtctTrBecIim7BL0OynRe-sZbiAcmj8pepha-rQ_zJtJgSFw-NEavMu";

const scoreBreakdown = [
  { label: "Fungsi", value: 82 },
  { label: "Kondisi fisik", value: 68 },
  { label: "Kelengkapan", value: 90 },
];

const handoverOptions = [
  {
    id: "hub",
    name: "Serah Terima di Circular Hub Tebet",
    description:
      "Ketemu langsung, barang bisa dicek dan dites di tempat sebelum kode dikonfirmasi.",
    cost: 0,
    meta: "Hari ini, 16.00",
  },
  {
    id: "ev",
    name: "Antar oleh Kurir Motor Listrik",
    description:
      "Diantar ke alamatmu dengan tote bag returnable, bebas kardus sekali pakai.",
    cost: 25000,
    meta: "Tiba 2–3 jam",
  },
  {
    id: "regular",
    name: "Reguler, Kardus Upcycled",
    description:
      "Kardus bekas layak pakai dan bubble wrap berbahan pati singkong.",
    cost: 14000,
    meta: "1–2 hari kerja",
  },
];

const money = (value: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);

const HANDOVER_CODE = "PKL-HO-2026-0183";
const askingPrice = 4_750_000;
const negoDiscount = 250_000;
const agreedPrice = askingPrice - negoDiscount;

function stepStatus(step: number, confirmed: boolean) {
  if (step === 1) return "done";
  if (step === 2) return confirmed ? "done" : "current";
  return confirmed ? "done" : "upcoming";
}

function StepIndicator({
  number,
  label,
  confirmed,
}: {
  number: number;
  label: string;
  confirmed: boolean;
}) {
  const status = stepStatus(number, confirmed);
  return (
    <span
      className={`inline-flex items-center gap-2 ${
        status === "upcoming"
          ? "text-[#5B6675]"
          : "font-semibold text-[#0B4F3F]"
      }`}
    >
      <span
        className={`grid h-5 w-5 place-items-center rounded-full text-xs ${
          status === "done"
            ? "bg-[#0B4F3F] text-white"
            : status === "current"
              ? "border-2 border-[#0B4F3F] text-[#0B4F3F]"
              : "border border-[#CBD0D6] text-[#5B6675]"
        }`}
      >
        {status === "done" ? <Check size={12} /> : number}
      </span>
      {label}
    </span>
  );
}

export default function CheckoutPage() {
  const [handover, setHandover] = useState("hub");
  const [agreed, setAgreed] = useState(false);
  const [showAgreementError, setShowAgreementError] = useState(false);
  const [modal, setModal] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [pending, setPending] = useState(false);
  const [copied, setCopied] = useState(false);
  const [seconds, setSeconds] = useState(2 * 3600);

  const [editingAddress, setEditingAddress] = useState(false);
  const [address, setAddress] = useState({
    name: "Budi Santoso",
    label: "Rumah Utama",
    detail: "Jl. Tebet Barat Dalam Raya No. 42, Jakarta Selatan 12810",
    phone: "+62 812-3456-7890",
  });
  const [draftAddress, setDraftAddress] = useState(address);

  const defaultSlot = useMemo(() => {
    const d = new Date();
    d.setHours(d.getHours() + 3, 0, 0, 0);
    return d.toISOString().slice(0, 16);
  }, []);
  const [scheduledAt, setScheduledAt] = useState(defaultSlot);

  useEffect(() => {
    const timer = setInterval(
      () => setSeconds((v) => Math.max(0, v - 1)),
      1000,
    );
    return () => clearInterval(timer);
  }, []);

  const selectedHandover = handoverOptions.find((o) => o.id === handover)!;
  const total = agreedPrice + selectedHandover.cost;
  const timeUp = seconds === 0;

  const countdown = useMemo(() => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return [h, m, s].map((v) => String(v).padStart(2, "0")).join(":");
  }, [seconds]);

  const scheduledLabel = useMemo(() => {
    const d = new Date(scheduledAt);
    if (Number.isNaN(d.getTime())) return "";
    return d.toLocaleString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      hour: "2-digit",
      minute: "2-digit",
    });
  }, [scheduledAt]);

  function confirmHandover() {
    if (timeUp) return;
    if (!agreed) {
      setShowAgreementError(true);
      return;
    }
    setPending(true);
    setTimeout(() => {
      setPending(false);
      setConfirmed(true);
      setModal(true);
    }, 600);
  }

  function saveAddress() {
    setAddress(draftAddress);
    setEditingAddress(false);
  }
  function cancelEditAddress() {
    setDraftAddress(address);
    setEditingAddress(false);
  }

  async function copyCode() {
    try {
      await navigator.clipboard?.writeText(HANDOVER_CODE);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard tidak tersedia, kode tetap terlihat untuk disalin manual.
    }
  }

  return (
    <div
      className={`${body} min-h-screen bg-[#F7F8F7] text-[#111827] antialiased`}
    >
      <MarketplaceHeader />

      <main className="mx-auto w-full max-w-[1100px] px-4 py-8 sm:px-6 sm:py-12">
        {/* ============ Header konteks ============ */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="inline-flex items-center rounded-full bg-[#E6F2ED] px-3 py-1 text-xs font-semibold text-[#0B4F3F]">
              Tawaran Disepakati
            </span>
            <span className="text-sm text-[#5B6675]">#ORDER-SIM-88219</span>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-sm text-[#5B6675]">
            <StepIndicator
              number={1}
              label="Verifikasi Pesanan"
              confirmed={confirmed}
            />
            <span>-</span>
            <StepIndicator
              number={2}
              label="Jadwal Serah Terima"
              confirmed={confirmed}
            />
            <span>-</span>
            <StepIndicator
              number={3}
              label="Konfirmasi Kode"
              confirmed={confirmed}
            />
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_22rem]">
          {/* ============ Kolom utama ============ */}
          <div className="flex flex-col gap-6">
            <section className={`${card} bg-[#E6F2ED]`}>
              <div className="flex items-start gap-3">
                <CheckCircle
                  className="mt-0.5 shrink-0 text-[#0B4F3F]"
                  size={22}
                />
                <div>
                  <strong className="block">
                    Tawaran disepakati {money(agreedPrice)}
                  </strong>
                  <p className="mt-1 text-sm text-[#111827]/80">
                    Rian Pratama menyetujui tawaran kamu. Pilih jadwal serah
                    terima sebelum batas konfirmasi berakhir.
                  </p>
                </div>
              </div>
              <div className="mt-4 inline-flex items-center gap-2 rounded-lg bg-white px-3 py-1.5 text-sm font-semibold text-[#0B4F3F]">
                <Clock3 size={16} /> Sisa waktu konfirmasi: {countdown}
              </div>
            </section>

            <section className={card}>
              <div className="flex items-center justify-between">
                <h2 className={`${display} text-xl font-normal`}>
                  Snapshot Barang Terverifikasi
                </h2>
                <Link
                  href="/items/kipas-angin-meja-16"
                  className={`text-sm font-semibold !text-[#0B4F3F] no-underline hover:underline ${focus}`}
                >
                  Lihat Circular Passport
                </Link>
              </div>
              <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-start">
                <img
                  src={productImage}
                  alt="Kipas angin meja 16 inci"
                  className="h-28 w-28 shrink-0 rounded-xl object-cover"
                />
                <div className="flex-1">
                  <span className="inline-flex items-center rounded-full bg-[#E6F2ED] px-2.5 py-1 text-xs font-semibold text-[#0B4F3F]">
                    Skor Kondisi 74/100
                  </span>
                  <h3 className="mt-2 font-semibold">
                    Kipas Angin Meja 16 Inci
                  </h3>
                  <p className="mt-1 text-sm text-[#5B6675]">
                    Fungsi normal di semua tingkat kecepatan • Pelindong
                    baling-baling sedikit penyok • Kabel dalam kondisi baik
                  </p>
                  <small className="mt-2 block text-[#5B6675]">
                    Penjual: <b className="text-[#111827]">Rian Pratama</b> ·
                    Tebet, Jakarta Selatan
                  </small>
                  <ul className="mt-3 space-y-2">
                    {scoreBreakdown.map((s) => (
                      <li key={s.label}>
                        <div className="flex justify-between text-xs text-[#5B6675]">
                          <span>{s.label}</span>
                          <span className="font-semibold text-[#111827]">
                            {s.value}
                          </span>
                        </div>
                        <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-[#EDEFEC]">
                          <div
                            className="h-full rounded-full bg-[#12705A]"
                            style={{ width: `${s.value}%` }}
                          />
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="text-right">
                  <div className="text-sm text-[#5B6675] line-through">
                    {money(askingPrice)}
                  </div>
                  <div className="text-lg font-bold">{money(agreedPrice)}</div>
                </div>
              </div>
              <div className="mt-4 flex items-start gap-2.5 rounded-xl bg-[#F7F8F7] p-3.5 text-sm text-[#5B6675]">
                <ShieldCheck
                  size={18}
                  className="mt-0.5 shrink-0 text-[#0B4F3F]"
                />
                <span>
                  Skor kondisi berasal dari inspeksi adaptif dan deklarasi
                  penjual — periksa langsung barangnya saat serah terima sebelum
                  kode dikonfirmasi.
                </span>
              </div>
            </section>

            <section className={card}>
              <div className="flex items-center gap-2.5">
                <MapPin className="text-[#0B4F3F]" size={20} />
                <h2 className={`${display} text-xl font-normal`}>
                  Alamat & Lokasi Serah Terima
                </h2>
              </div>
              <div className="mt-4 rounded-xl bg-[#F7F8F7] p-4">
                <b>Budi Santoso · Rumah Utama</b>
                <p className="mt-1 text-sm text-[#5B6675]">
                  Jl. Tebet Barat Dalam Raya No. 42, Jakarta Selatan 12810 · +62
                  812-3456-7890
                </p>
                <small className="mt-1 block text-[#5B6675]">
                  Radius 1,8 km dari penjual — cocok untuk serah terima
                  langsung.
                </small>
              </div>
              <input
                defaultValue="Titipkan di pos satpam bila tidak ada orang di rumah."
                aria-label="Catatan untuk kurir"
                className={`mt-3 w-full rounded-xl border border-[#E4E7EB] px-4 py-2.5 text-sm ${focus}`}
              />
            </section>

            <section className={card}>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <Truck className="text-[#0B4F3F]" size={20} />
                  <h2 className={`${display} text-xl font-normal`}>
                    Opsi Serah Terima
                  </h2>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E6F2ED] px-2.5 py-1 text-xs font-semibold text-[#0B4F3F]">
                  <Leaf size={13} /> Minim kemasan sekali pakai
                </span>
              </div>
              <div className="mt-4 flex flex-col gap-2.5">
                {handoverOptions.map((option) => {
                  const selected = handover === option.id;
                  return (
                    <label
                      key={option.id}
                      className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3.5 transition-colors ${
                        selected
                          ? "border-[#0B4F3F] bg-[#E6F2ED]/40"
                          : "border-[#E4E7EB] hover:border-[#0B4F3F]/50"
                      }`}
                    >
                      <input
                        type="radio"
                        name="handover"
                        checked={selected}
                        onChange={() => setHandover(option.id)}
                        className="mt-1 h-4 w-4 border-[#CBD0D6] text-[#0B4F3F] focus-visible:outline-[#12705A]"
                      />
                      <div className="flex flex-1 items-start justify-between gap-3">
                        <div>
                          <strong className="block text-sm">
                            {option.name}
                          </strong>
                          <p className="mt-0.5 text-sm text-[#5B6675]">
                            {option.description}
                          </p>
                          <small className="mt-1 block text-[#5B6675]">
                            {option.meta}
                          </small>
                        </div>
                        <span className="shrink-0 text-sm font-semibold">
                          {option.cost === 0 ? "Gratis" : money(option.cost)}
                        </span>
                      </div>
                    </label>
                  );
                })}
              </div>
              <div className="mt-4 flex items-start gap-2.5 rounded-xl bg-[#F7F8F7] p-3.5 text-sm text-[#5B6675]">
                <PackageCheck
                  size={18}
                  className="mt-0.5 shrink-0 text-[#0B4F3F]"
                />
                Kedua opsi antar tetap mengharuskan konfirmasi kode saat barang
                diterima.
              </div>
            </section>

            <section className={card}>
              <div className="flex items-center gap-2.5">
                <KeyRound className="text-[#0B4F3F]" size={20} />
                <h2 className={`${display} text-xl font-normal`}>
                  Kode Serah Terima
                </h2>
              </div>
              <p className="mt-2 text-sm text-[#5B6675]">
                Setelah dikonfirmasi, kode ini dipakai kedua pihak untuk
                menandai serah terima selesai. Belum ada uang yang berpindah
                lewat platform pada tahap ini.
              </p>
              <div className="mt-4 flex items-center justify-between gap-3 rounded-xl border border-dashed border-[#CBD0D6] bg-[#F7F8F7] px-4 py-3">
                <span className="font-mono text-sm font-semibold tracking-wide">
                  {HANDOVER_CODE}
                </span>
                <button
                  type="button"
                  onClick={copyCode}
                  className={`inline-flex items-center gap-1.5 rounded-lg border border-[#E4E7EB] bg-white px-3 py-1.5 text-sm font-semibold text-[#111827] transition-colors hover:border-[#0B4F3F] ${focus}`}
                >
                  <Copy size={14} /> {copied ? "Tersalin!" : "Salin"}
                </button>
              </div>
            </section>

            <section className={card}>
              <label className="flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => {
                    setAgreed(e.target.checked);
                    if (e.target.checked) setShowAgreementError(false);
                  }}
                  className="mt-0.5 h-4 w-4 rounded border-[#CBD0D6] text-[#0B4F3F] focus-visible:outline-[#12705A]"
                />
                <span className="text-sm">
                  Saya sudah membaca kondisi barang di atas dan akan memeriksa
                  langsung kondisinya saat serah terima sebelum mengonfirmasi
                  kode.
                </span>
              </label>
              {showAgreementError && (
                <p className="mt-2 text-sm font-semibold text-[#B3261E]">
                  Centang persetujuan di atas dulu sebelum melanjutkan.
                </p>
              )}
            </section>
          </div>

          {/* ============ Sidebar ringkasan ============ */}
          <aside className="flex flex-col gap-6 lg:sticky lg:top-6 lg:h-fit">
            <section className={card}>
              <h2 className={`${display} text-xl font-normal`}>
                Ringkasan Pesanan
              </h2>
              <div className="mt-4 flex flex-col gap-2.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#5B6675]">Harga Awal</span>
                  <b>{money(askingPrice)}</b>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#5B6675]">Potongan Nego</span>
                  <b>-{money(negoDiscount)}</b>
                </div>
                <div className="flex justify-between border-t border-[#EDEFEC] pt-2.5">
                  <span className="text-[#5B6675]">Harga Setelah Nego</span>
                  <b>{money(agreedPrice)}</b>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#5B6675]">
                    Serah Terima · {selectedHandover.name}
                  </span>
                  <b>
                    {selectedHandover.cost
                      ? money(selectedHandover.cost)
                      : "Gratis"}
                  </b>
                </div>
                <div className="flex justify-between border-t border-[#EDEFEC] pt-3 text-base">
                  <span className="font-semibold">Total</span>
                  <strong>{money(total)}</strong>
                </div>
                <button
                  type="button"
                  onClick={confirmHandover}
                  className={`mt-2 flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#0B4F3F] !text-white no-underline transition-colors hover:bg-[#083D31] ${focus}`}
                >
                  <KeyRound size={18} /> Konfirmasi Jadwal Serah Terima
                </button>
                <p className="text-xs text-[#5B6675]">
                  Tombol ini menjadwalkan serah terima dan membuka kode di atas
                  — belum ada pembayaran nyata yang diproses lewat platform pada
                  prototipe ini.
                </p>
              </div>
            </section>

            <section className={card}>
              <h3 className="text-sm font-semibold">
                Estimasi Dampak Sirkular
              </h3>
              <p className="mt-1 text-xs text-[#5B6675]">
                Tercatat resmi ke Circular Passport setelah serah terima selesai
                dikonfirmasi kedua pihak.
              </p>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-[#F7F8F7] p-3">
                  <strong className="block text-lg">1 barang</strong>
                  <span className="text-xs text-[#5B6675]">
                    Berpotensi digunakan ulang
                  </span>
                </div>
                <div className="rounded-xl bg-[#F7F8F7] p-3">
                  <strong className="block text-lg">1,2 kg</strong>
                  <span className="text-xs text-[#5B6675]">
                    Berat barang dialihkan
                  </span>
                </div>
              </div>
            </section>
          </aside>
        </div>
      </main>

      <MarketplaceFooter />

      {modal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Kode serah terima dikonfirmasi"
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 p-4"
        >
          <section className={`${card} w-full max-w-sm text-center`}>
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[#E6F2ED] text-[#0B4F3F]">
              <Check size={28} />
            </div>
            <h2 className={`${display} mt-4 text-xl font-normal`}>
              Jadwal Serah Terima Dikonfirmasi
            </h2>
            <span className="text-sm text-[#5B6675]">#PL-HO-994102</span>
            <div className="mt-3 rounded-xl border border-dashed border-[#CBD0D6] bg-[#F7F8F7] px-4 py-3 font-mono text-sm font-semibold">
              {HANDOVER_CODE}
            </div>
            <p className="mt-3 text-sm text-[#5B6675]">
              Tunjukkan kode ini ke penjual saat serah terima untuk
              menyelesaikan transaksi. Tidak ada dana yang dipindahkan lewat
              platform.
            </p>
            <Link
              href="/status"
              className={`mt-5 flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#0B4F3F] !text-white no-underline transition-colors hover:bg-[#083D31] ${focus}`}
            >
              Lihat Status Serah Terima
            </Link>
            <button
              type="button"
              onClick={() => setModal(false)}
              className={`mt-2 flex min-h-11 w-full items-center justify-center rounded-xl border border-[#E4E7EB] text-sm font-semibold text-[#111827] ${focus}`}
            >
              Tetap di halaman ini
            </button>
          </section>
        </div>
      )}
    </div>
  );
}
