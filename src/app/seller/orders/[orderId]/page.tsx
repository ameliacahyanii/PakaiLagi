"use client";
import Link from "next/link";
import {
  Check,
  CircleCheck,
  Clock,
  LockKeyhole,
  MessageCircle,
  PackageCheck,
  Phone,
  Printer,
  ShieldCheck,
} from "lucide-react";
import { useEffect, useState } from "react";
import { SellerShell } from "@/components/seller/SellerShell";
import {
  badge,
  btnLinkSecondary,
  btnPrimary,
  btnSecondary,
  card,
  cardPad,
  cardTitle,
  container,
  display,
  h1,
  pageBg,
  toastBox,
} from "@/components/ui/tokens";
import Image from "next/image";

/* Helper kecil untuk merangkai class bersyarat.
   Kalau nanti dipakai di banyak halaman, pindahkan saja ke lib/ui. */
const cx = (...v: (string | false | null | undefined)[]) =>
  v.filter(Boolean).join(" ");

const product =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCl8YQw4XH0Vg84F64eq_3ZOKlgmTbnUEevL_vSu5AJ59h-guz1aj6nQDo2gB2LoCywWHeE2XLk79yYICRMAvFnEhfVY40ywPUMHEQM-DPGFaUEPdEUpdARkjcy7F85k1ptZ5jcwusZINym72AuuWA84SSdEk8BGfVHSl6Z5BDPCJXqsPaM-UawjVNl81fF7xzPn8I9NdqjRq7qeW_DcvIRYD81Qz2uJSxhdVGFBaGXRpfL4j42IwmK";
const courier =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCouTV9ncM63Ap8ydwCv3Nm9YaeInVQ5sx3Z219rN935YRDFJXAml2ag-ehwUv7sSuMum7dvLkM76ZGmiKwLqMWA2y9F-MqlcgfkFZMHLpSSDZlKKcPOUze-sMGDQ610jvXuQGQWPjM8Bln7BvKJyJBY-dmETA3kGZDuuhF-BKHAr2H28d1fYhf1b72T5iH1w-zOw3hzFV9sS9rnFXmFLZ2OUuqEdE-Kv3rETHn5VOYrjG4WOBp06vo";

const checklist = [
  "Optik depan dan belakang bersih",
  "Shutter mekanis responsif",
  "Aksesori bawaan lengkap",
  "Serial bodi dan lensa cocok",
];

const activity = [
  { time: "15.15", action: "Barcode kurir listrik dibuat" },
  { time: "15.00", action: "Unit dimasukkan ke sleeve reusable" },
  { time: "14.40", action: "Jadwal penjemputan dikonfirmasi" },
  { time: "14.35", action: "Dana masuk escrow" },
];

const impact = [
  { value: "+45", label: "Poin sirkular" },
  { value: "420 g", label: "E-waste dicegah" },
];

function format(seconds: number) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return [h, m, s].map((v) => String(v).padStart(2, "0")).join(":");
}

export default function SellerOrderPage() {
  const [seconds, setSeconds] = useState(9910);
  const [handover, setHandover] = useState(false);
  const [packed, setPacked] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => {
    const id = setInterval(() => setSeconds((v) => Math.max(0, v - 1)), 1000);
    return () => clearInterval(id);
  }, []);

  function notify(value: string) {
    setToast(value);
    setTimeout(() => setToast(""), 2400);
  }

  const steps = [
    {
      title: "Pembayaran pembeli selesai",
      text: "Dana Rp4.500.000 diamankan di Circular Escrow Vault.",
      done: true,
    },
    {
      title: "Verifikasi fisik akhir",
      text: "Serial, sensor, shutter, dan aksesori sudah sesuai paspor.",
      done: true,
    },
    {
      title: "Pengemasan tanpa sampah",
      text: "Gunakan Returnable Sleeve #SWAP-BAG-092 lalu unggah buktinya.",
      done: handover || packed,
      active: !handover && !packed,
    },
    {
      title: "Serah terima kurir listrik",
      text: "Hendra Wijaya dijadwalkan tiba di Circular Hub Tebet.",
      done: handover,
      active: !handover && packed,
    },
    {
      title: "Uji mandiri 48 jam dan pencairan",
      text: "Dana cair setelah masa uji selesai tanpa sengketa.",
      active: handover,
    },
  ];

  const currentStep = Math.min(steps.filter((s) => s.done).length + 1, 5);

  return (
    <SellerShell active="orders">
      <div className={pageBg}>
        <main
          className={`${container} flex flex-col gap-8 pt-6 pb-16 sm:gap-12 sm:pt-8 sm:pb-20`}
        >
          {/* ============ Hero ============ */}
          <section className="grid gap-8 rounded-3xl bg-[#0A3D31] p-6 text-white sm:p-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:p-12">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold">
                  <Clock size={13} /> Dikirim hari ini
                </span>
                <span className="inline-flex items-center rounded-full bg-[#E2BC6B] px-3 py-1 text-xs font-semibold text-[#111827]">
                  Prioritas kurir listrik
                </span>
              </div>
              <h1 className={`${h1} mt-5`}>
                Pesanan siap diproses dan diserahkan.
              </h1>
              <p className="mt-4 max-w-[52ch] leading-relaxed text-white/75">
                Kemas unit dalam Returnable Sleeve dan serahkan ke kurir sebelum
                hub tutup operasional.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/15 bg-white/10 p-5">
                <p className="text-sm text-white/70">Batas kirim 18.00 WIB</p>
                <p
                  className={`${display} mt-3 text-[2.2rem] leading-none tabular-nums`}
                >
                  {format(seconds)}
                </p>
                <p className="mt-2 text-xs text-white/60">tersisa</p>
              </div>
              <div className="rounded-2xl border border-white/15 bg-white/10 p-5">
                <p className="text-sm text-white/70">Dana di escrow</p>
                <p className={`${display} mt-3 text-[1.7rem] leading-none`}>
                  Rp4.500.000
                </p>
                <p className="mt-2 inline-flex items-center gap-1.5 text-xs text-[#E2BC6B]">
                  <LockKeyhole size={13} /> terkunci aman
                </p>
              </div>
            </div>
          </section>

          {/* ============ Ringkasan pesanan ============ */}
          <section
            className={`${card} flex flex-col gap-5 p-5 sm:p-6 lg:flex-row lg:items-center`}
          >
            <div className="flex flex-wrap gap-x-10 gap-y-4">
              <div>
                <p className="text-[0.8rem] font-medium text-[#5B6675]">
                  Nomor faktur
                </p>
                <p className="mt-1 font-semibold">#ORDER-SIM-88219</p>
              </div>
              <div>
                <p className="text-[0.8rem] font-medium text-[#5B6675]">
                  Waktu pemesanan
                </p>
                <p className="mt-1 font-semibold">19 Sep 2026, 14.35 WIB</p>
              </div>
              <div>
                <p className="text-[0.8rem] font-medium text-[#5B6675]">
                  Status
                </p>
                <p className="mt-1.5">
                  <span className={badge}>Perlu dikirim</span>
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap lg:ml-auto">
              <button
                type="button"
                className={btnSecondary}
                onClick={() => notify("Label reusable dikirim ke printer.")}
              >
                <Printer size={16} /> Cetak label
              </button>
              <Link className={btnLinkSecondary} href="/chat">
                <MessageCircle size={16} /> Chat pembeli
              </Link>
              <button
                type="button"
                className={btnPrimary}
                onClick={() => {
                  setHandover(true);
                  notify("Serah terima kurir listrik tercatat.");
                }}
              >
                <ShieldCheck size={16} />
                {handover ? "Kurir sudah menerima" : "Konfirmasi serah terima"}
              </button>
            </div>
          </section>

          <div className="grid gap-6 lg:grid-cols-[1.55fr_0.95fr] lg:items-start lg:gap-8">
            {/* ============ Kolom utama ============ */}
            <div className="flex flex-col gap-6">
              {/* Alur pemrosesan */}
              <section className={cardPad}>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h2 className={cardTitle}>Alur pemrosesan penjual</h2>
                  <span className={badge}>Langkah {currentStep} dari 5</span>
                </div>

                <ol className="mt-7">
                  {steps.map((step, i) => {
                    const last = i === steps.length - 1;
                    return (
                      <li
                        key={step.title}
                        className="relative flex gap-4 pb-7 last:pb-0"
                      >
                        {!last && (
                          <span
                            aria-hidden="true"
                            className={cx(
                              "absolute top-9 bottom-1 left-[0.9375rem] w-px",
                              step.done ? "bg-[#0B4F3F]/35" : "bg-[#E4E7EB]",
                            )}
                          />
                        )}
                        <span
                          className={cx(
                            "relative z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full text-[0.8rem] font-semibold",
                            step.done && "bg-[#0B4F3F] text-white",
                            step.active &&
                              !step.done &&
                              "bg-white text-[#0B4F3F] ring-2 ring-[#C29A4B]",
                            !step.done &&
                              !step.active &&
                              "bg-[#ECEEEB] text-[#5B6675]",
                          )}
                        >
                          {step.done ? <Check size={15} /> : i + 1}
                        </span>

                        <div className="min-w-0 flex-1 pt-1">
                          <p
                            className={cx(
                              "text-[0.98rem] font-semibold",
                              !step.done && !step.active && "text-[#5B6675]",
                            )}
                          >
                            {step.title}
                          </p>
                          <p className="mt-1 text-[0.9rem] leading-relaxed text-[#5B6675]">
                            {step.text}
                          </p>
                          {i === 2 && !step.done && (
                            <button
                              type="button"
                              className={`${btnPrimary} mt-4`}
                              onClick={() => {
                                setPacked(true);
                                notify("Bukti kemasan tersimpan.");
                              }}
                            >
                              <PackageCheck size={16} /> Unggah bukti kemasan
                            </button>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ol>
              </section>

              {/* Detail barang */}
              <section className={cardPad}>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h2 className={cardTitle}>
                    Detail barang dan paspor sirkular
                  </h2>
                  <span className={badge}>
                    <Check size={12} /> Skor AI 88/100
                  </span>
                </div>

                <div className="mt-6 flex flex-col gap-5 sm:flex-row">
                  <Image
                    src={product}
                    alt="Sony Alpha A6000 dalam kemasan reusable"
                    className="h-44 w-full rounded-2xl object-cover sm:w-44"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-[0.8rem] font-medium text-[#5B6675]">
                      #PASSPORT-ID-SNY-9921
                    </p>
                    <h3 className="mt-1.5 text-[1.05rem] font-semibold">
                      Sony Alpha A6000 Kit 16-50mm OSS
                    </h3>
                    <p className="mt-2 text-[0.92rem] leading-relaxed text-[#5B6675]">
                      Kondisi terawat, sensor bersih, autofocus dan zoom
                      berfungsi normal.
                    </p>
                    <div className="mt-5 flex flex-wrap gap-x-10 gap-y-3 border-t border-[#E4E7EB] pt-4">
                      <div>
                        <p className="text-[0.8rem] font-medium text-[#5B6675]">
                          Harga awal
                        </p>
                        <p className="mt-0.5 text-[0.95rem] text-[#5B6675] line-through">
                          Rp4.750.000
                        </p>
                      </div>
                      <div>
                        <p className="text-[0.8rem] font-medium text-[#5B6675]">
                          Harga kesepakatan
                        </p>
                        <p
                          className={`${display} mt-0.5 text-[1.5rem] leading-none text-[#0B4F3F]`}
                        >
                          Rp4.500.000
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <h3 className="mt-8 text-[0.95rem] font-semibold">
                  Checklist verifikasi fisik
                </h3>
                <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
                  {checklist.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2.5 rounded-xl bg-[#E6F2ED] px-3.5 py-2.5 text-[0.9rem]"
                    >
                      <CircleCheck
                        size={16}
                        className="shrink-0 text-[#12705A]"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>

              {/* Pengemasan */}
              <section className={cardPad}>
                <h2 className={cardTitle}>Panduan pengemasan tanpa sampah</h2>
                <div className="mt-5 flex gap-3.5 rounded-2xl bg-[#E6F2ED] p-4 sm:p-5">
                  <PackageCheck
                    size={20}
                    className="mt-0.5 shrink-0 text-[#12705A]"
                  />
                  <div>
                    <p className="font-semibold">
                      Gunakan Returnable Padded Sleeve #SWAP-BAG-092
                    </p>
                    <p className="mt-1 text-[0.9rem] leading-relaxed text-[#0A3D31]/75">
                      Jangan pakai bubble wrap plastik, isolasi PVC berlebih,
                      atau styrofoam.
                    </p>
                  </div>
                </div>
                <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                  <button
                    type="button"
                    className={btnSecondary}
                    onClick={() =>
                      notify("Permintaan sleeve pengganti dikirim.")
                    }
                  >
                    Minta sleeve pengganti
                  </button>
                  <button
                    type="button"
                    className={btnSecondary}
                    onClick={() => notify("Panduan pengemasan dibuka.")}
                  >
                    Baca panduan lengkap
                  </button>
                </div>
              </section>

              {/* Log aktivitas */}
              <section className={cardPad}>
                <h2 className={cardTitle}>Log aktivitas pemrosesan</h2>
                <ul className="mt-5 divide-y divide-[#E4E7EB]">
                  {activity.map((item) => (
                    <li
                      key={item.time}
                      className="flex items-start justify-between gap-4 py-3.5 first:pt-0 last:pb-0"
                    >
                      <div className="min-w-0">
                        <p className="text-[0.95rem] font-semibold">
                          {item.action}
                        </p>
                        <p className="mt-0.5 text-[0.85rem] text-[#5B6675]">
                          Tercatat di Circular Ledger PakaiLagi.
                        </p>
                      </div>
                      <span className="shrink-0 text-[0.85rem] tabular-nums text-[#5B6675]">
                        {item.time} WIB
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            {/* ============ Sidebar ============ */}
            <aside className="flex flex-col gap-6 lg:sticky lg:top-24">
              <section className={cardPad}>
                <div className="flex items-center justify-between gap-3">
                  <h2 className={cardTitle}>Circular Escrow Vault</h2>
                  <CircleCheck size={18} className="text-[#12705A]" />
                </div>
                <div className="mt-4 rounded-2xl bg-[#E6F2ED] p-4">
                  <p className="inline-flex items-center gap-1.5 text-[0.8rem] font-semibold text-[#0B4F3F]">
                    <LockKeyhole size={13} /> Terkunci aman
                  </p>
                  <p
                    className={`${display} mt-2 text-[1.9rem] leading-none text-[#0A3D31]`}
                  >
                    Rp4.500.000
                  </p>
                </div>
                <p className="mt-4 text-[0.92rem] leading-relaxed text-[#5B6675]">
                  Dana cair setelah uji mandiri 48 jam selesai tanpa komplain.
                </p>
                <p className="mt-3 text-[0.8rem] text-[#5B6675]">
                  Referensi vault #ESC-JKT-88219
                </p>
              </section>

              <section className={cardPad}>
                <div className="flex items-center justify-between gap-3">
                  <h2 className={cardTitle}>Logistik rendah emisi</h2>
                  <span className={badge}>Kurir listrik</span>
                </div>
                <div className="mt-4 space-y-1 text-[0.92rem] leading-relaxed">
                  <p className="font-semibold">COD sirkular Jabodetabek</p>
                  <p className="text-[#5B6675]">
                    Circular Hub Tebet, pintu barat
                  </p>
                  <p className="font-semibold">Hari ini, 16.30 – 18.00 WIB</p>
                </div>
                <div className="mt-5 flex items-center gap-3 border-t border-[#E4E7EB] pt-4">
                  <Image
                    src={courier}
                    alt="Hendra Wijaya"
                    className="h-11 w-11 rounded-full object-cover"
                  />
                  <div className="min-w-0">
                    <p className="text-[0.92rem] font-semibold">
                      Hendra Wijaya
                    </p>
                    <p className="text-[0.82rem] text-[#5B6675]">
                      Motor listrik #EV-JKT-04 · 4,9
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  className={`${btnPrimary} mt-5 sm:w-full`}
                  onClick={() => notify("Menghubungkan ke kurir.")}
                >
                  <Phone size={16} /> Hubungi kurir
                </button>
              </section>

              <section className={cardPad}>
                <h2 className={cardTitle}>Catatan pembeli</h2>
                <p className="mt-3 font-semibold">Budi Santoso</p>
                <p className="text-[0.88rem] text-[#5B6675]">
                  Trust index 98/100 · Tebet, Jakarta Selatan
                </p>
                <blockquote className="mt-4 rounded-2xl bg-[#ECEEEB] p-4 text-[0.9rem] leading-relaxed text-[#111827]/80">
                  Telepon sebelum tiba. Titipkan di pos satpam bila rumah
                  kosong.
                </blockquote>
                <Link
                  className={`${btnLinkSecondary} mt-4 sm:w-full`}
                  href="/chat"
                >
                  <MessageCircle size={16} /> Kirim pesan
                </Link>
              </section>

              <section className={cardPad}>
                <h2 className={cardTitle}>Dampak ekologis transaksi</h2>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {impact.map((s) => (
                    <div key={s.label} className="rounded-2xl bg-[#ECEEEB] p-4">
                      <p className={`${display} text-[1.6rem] leading-none`}>
                        {s.value}
                      </p>
                      <p className="mt-1.5 text-[0.8rem] text-[#5B6675]">
                        {s.label}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-3 rounded-2xl bg-[#E6F2ED] p-4">
                  <p
                    className={`${display} text-[1.6rem] leading-none text-[#0A3D31]`}
                  >
                    18,4 kg CO₂e
                  </p>
                  <p className="mt-1.5 text-[0.8rem] text-[#0A3D31]/70">
                    Reduksi emisi dibanding beli baru
                  </p>
                </div>
                <div className="mt-4">
                  <div className="flex items-center justify-between text-[0.8rem]">
                    <span className="text-[#5B6675]">Target bulanan</span>
                    <span className="font-semibold">72%</span>
                  </div>
                  <div
                    className="mt-2 h-2 overflow-hidden rounded-full bg-[#ECEEEB]"
                    role="progressbar"
                    aria-valuenow={72}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label="Target dampak bulanan"
                  >
                    <div className="h-full w-[72%] rounded-full bg-[#0B4F3F]" />
                  </div>
                </div>
              </section>
            </aside>
          </div>
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
