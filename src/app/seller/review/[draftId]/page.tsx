"use client";
import {
  Check,
  ImagePlus,
  Save,
  Send,
  ShieldCheck,
  Sparkles,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { SellerShell } from "@/components/seller/SellerShell";
import {
  badge,
  badgeError,
  badgeGold,
  badgeNeutral,
  btnDanger,
  btnPrimary,
  btnSecondary,
  card,
  cardPad,
  cardTitle,
  checkbox,
  container,
  display,
  fieldLabel,
  h1,
  input,
  pageBg,
  textarea,
  toastBox,
} from "@/components/ui/tokens";

const cx = (...v: (string | false | null | undefined)[]) =>
  v.filter(Boolean).join(" ");

const images = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBD0FbLJ6plXtjEtvVaqx13yEFZg9d_fMOeiUBoz9640Ez1BN63dJ6gfk57OpiupYG3eKHKVkMvsQJN_MudsX_7NMNybIHRJQOIPbMxlRK7cHQMXzdSF4SEpfMxEquaGgq4YgMn8efssMwVJOQEOsgfILooxv29XW8bH58W2QlLIn6Ce-adXi4HKkacVCuCHSt4f4_BdCFWCVV1ITUsb9ZOkiumGEEohxccievIsc1D4PQaqfJwBqBS",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAEQU9eAf4Zh2D7LauDRWkTmMk064qJEDYIyNSAu1eCPMB22W1RTy9RAbOTCl3WTVSr3vXXhi6HarLIZ0NUXuvjdebrleNqpyqTTi5al3APoU0Duu2ks-_qqUc_FC0Zgav9XuLATIMS24DCBAcoKowNPfwxIeIdUI3yfXWKRJwlYfEXpPHMFRFHHOJbL3PkhbXf6oQHjADD0bHyR4B-Bf2HtNMQu1CAgbpxpbhautdWyEC9GKigA-T8",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCOuoYp5o-bNr975GMY5hbqqIXZR353Z56w8mAOZDkLVkX1Em9nvLhHTyY--A8e5_JmhncQ0ZBXm1lO5KZ7Da_-JzG8wJe0n8afCtlp-a9TsnE3ILeU5MUUthkNGr0GZiWMusFxOwSNz0abgXhJcjOVGkTnAzKqvLzl64YEfsrpUzvDi9Goz6Cjlp6zwRh2Fa7f3o2xIaL3wPyojoakREaqXgAPEDMrqQdIT-fRZWGNgRcveh1BjZg-",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAk1aV9CEAlMoKGMmVfaEHGSIgRjIzvzyYzvMV2SCwK9SpSe2daUBjK3NjGR57JLDt79Ir1Wkls9xHz_ZwW-DjoESzB9RimAMioTXa5EJueGFdJIJXIijv00rnt4n9FEo_GjzcbhIl5QS2FC6X7ssRg_j81oAwGhyT8E1S6Fik1wMcfONdrqGTg3TOMaMQsnWY0ESfIoT-Mr5xCAPGVccTKWm29OScFmXIPQJUKKUcVQVBOOQP9D1-j",
];

const barColor = (v: number) =>
  v >= 80 ? "#0B4F3F" : v >= 65 ? "#D9A441" : "#C8672B";

const scoreRows = [
  { name: "Fungsi audio dan driver 45mm", value: 98 },
  { name: "Struktur fisik dan engsel", value: 90 },
  { name: "Estetika dan bantalan earpad", value: 55 },
  { name: "Kelengkapan aksesori", value: 70 },
];

const steps = [
  "Unggah foto",
  "Analisis AI",
  "Klarifikasi penjual",
  "Skor dan jalur",
  "Detail dan harga",
];

const questions = [
  {
    name: "driver",
    prompt: "Apakah driver kiri dan kanan seimbang tanpa suara kresek?",
    options: [
      "Jernih di semua frekuensi",
      "Ada kresek halus saat kabel diputar",
    ],
  },
  {
    name: "cable",
    prompt: "Apakah kabel bawaan masih lentur tanpa sambungan isolasi?",
    options: ["Kabel bawaan original utuh", "Menggunakan kabel aftermarket"],
  },
];

const readiness = [
  { label: "Foto utama terverifikasi AI", done: true },
  { label: "Keausan dikonfirmasi penjual", done: true },
  { label: "Uji fungsi driver terisi", done: true },
  { label: "Foto jack kabel belum ada", done: false },
  { label: "Harga sesuai rekomendasi", done: true },
];

const SCORE = 75;

export default function DraftReviewPage() {
  const [toast, setToast] = useState("");
  const [published, setPublished] = useState(false);
  const [extraPhoto, setExtraPhoto] = useState(false);

  function notify(value: string) {
    setToast(value);
    setTimeout(() => setToast(""), 2500);
  }

  function publish() {
    setPublished(true);
    notify("Listing diterbitkan.");
  }

  return (
    <SellerShell active="inventory">
      <div className={pageBg}>
        <main
          className={`${container} flex flex-col gap-8 pt-6 pb-16 sm:gap-12 sm:pt-8 sm:pb-20`}
        >
          {/* ============ Judul ============ */}
          <header className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className={badgeNeutral}>Draf #DRAFT-AI-8809</span>
                <span className={badge}>
                  <Sparkles size={12} /> AI Multi-Vision v2.4
                </span>
              </div>
              <h1 className={`${h1} mt-4`}>Review hasil inspeksi AI.</h1>
              <p className="mt-3 max-w-[56ch] text-[0.95rem] leading-relaxed text-[#5B6675]">
                Periksa temuan mesin, konfirmasi fungsi yang hanya kamu tahu,
                lalu tetapkan harga sebelum listing terbit.
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
              <button
                type="button"
                className={btnDanger}
                onClick={() => notify("Draf tidak dihapus, mode demo aktif.")}
              >
                <Trash2 size={16} /> Hapus draf
              </button>
              <button type="button" className={btnPrimary} onClick={publish}>
                <Send size={16} />
                {published ? "Sudah terbit" : "Terbitkan listing"}
              </button>
            </div>
          </header>

          {/* ============ Stepper ============ */}
          <nav aria-label="Tahap penyusunan listing">
            <ol
              className={`${card} grid divide-y divide-[#E4E7EB] sm:grid-cols-3 sm:divide-x sm:divide-y-0 lg:grid-cols-5`}
            >
              {steps.map((step, i) => {
                const done = i < 2;
                const active = i === 2;
                return (
                  <li
                    key={step}
                    aria-current={active ? "step" : undefined}
                    className={cx(
                      "flex items-center gap-3 p-4",
                      active && "bg-[#E6F2ED]",
                    )}
                  >
                    <span
                      className={cx(
                        "grid h-7 w-7 shrink-0 place-items-center rounded-full text-[0.78rem] font-semibold",
                        done && "bg-[#0B4F3F] text-white",
                        active &&
                          "bg-white text-[#0B4F3F] ring-2 ring-[#C29A4B]",
                        !done && !active && "bg-[#ECEEEB] text-[#5B6675]",
                      )}
                    >
                      {done ? <Check size={14} /> : i + 1}
                    </span>
                    <span
                      className={cx(
                        "text-[0.88rem] leading-snug font-semibold",
                        !done && !active && "text-[#5B6675]",
                      )}
                    >
                      {step}
                    </span>
                  </li>
                );
              })}
            </ol>
          </nav>

          <div className="grid gap-6 lg:grid-cols-[1.55fr_0.95fr] lg:items-start lg:gap-8">
            {/* ============ Kolom utama ============ */}
            <div className="flex flex-col gap-6">
              {/* Heatmap */}
              <section className={cardPad}>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h2 className={cardTitle}>Peta inspeksi visual</h2>
                    <p className="mt-1.5 text-[0.92rem] leading-relaxed text-[#5B6675]">
                      Kotak penanda menunjukkan komponen yang dinilai dan
                      keausan kosmetik yang terdeteksi.
                    </p>
                  </div>
                  <span className={badge}>Mode inspeksi aktif</span>
                </div>

                <figure className="relative mt-5 overflow-hidden rounded-2xl bg-[#ECEEEB]">
                  <img
                    src={images[0]}
                    alt="Audio-Technica ATH-M50x hasil inspeksi"
                    className="aspect-[4/3] w-full object-cover"
                  />
                  <span className="absolute top-[18%] left-[14%] rounded-lg bg-[#0B4F3F] px-2 py-1 text-[0.72rem] font-semibold text-white shadow-[0_6px_18px_-6px_rgba(0,0,0,0.6)]">
                    Driver dan swivel 98%
                  </span>
                  <span className="absolute right-[12%] bottom-[20%] rounded-lg bg-[#C8672B] px-2 py-1 text-[0.72rem] font-semibold text-white shadow-[0_6px_18px_-6px_rgba(0,0,0,0.6)]">
                    Keausan earpad 35%
                  </span>
                </figure>

                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {images.slice(1).map((src, i) => (
                    <img
                      key={src}
                      src={src}
                      alt={`Foto inspeksi ${i + 2}`}
                      className="aspect-square w-full rounded-xl border border-[#E4E7EB] object-cover"
                    />
                  ))}
                  <button
                    type="button"
                    onClick={() => setExtraPhoto(true)}
                    className={cx(
                      "flex aspect-square cursor-pointer flex-col items-center justify-center gap-1.5 rounded-xl border border-dashed p-2 text-center transition-colors",
                      extraPhoto
                        ? "border-[#0B4F3F] bg-[#E6F2ED] text-[#0B4F3F]"
                        : "border-[#CBD0D6] text-[#5B6675] hover:border-[#0B4F3F] hover:bg-[#ECEEEB]",
                    )}
                  >
                    <ImagePlus size={20} />
                    <span className="text-[0.8rem] font-semibold">
                      Tambah foto jack
                    </span>
                    <span className="text-[0.72rem]">
                      +10 poin transparansi
                    </span>
                  </button>
                </div>
                {extraPhoto && (
                  <p className="mt-3 text-[0.85rem] text-[#5B6675]">
                    Slot foto tambahan aktif. Unggahan masih simulasi lokal.
                  </p>
                )}
              </section>

              {/* Skor */}
              <section className={cardPad}>
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-5">
                    <div
                      className="grid h-24 w-24 shrink-0 place-items-center rounded-full"
                      style={{
                        background: `conic-gradient(#0B4F3F ${SCORE * 3.6}deg, #ECEEEB 0deg)`,
                      }}
                      role="img"
                      aria-label={`Skor kondisi ${SCORE} dari 100`}
                    >
                      <div className="grid h-[4.75rem] w-[4.75rem] place-items-center rounded-full bg-white">
                        <span className={`${display} text-[2rem] leading-none`}>
                          {SCORE}
                        </span>
                      </div>
                    </div>
                    <div>
                      <h2 className={cardTitle}>Kondisi baik</h2>
                      <p className="mt-1.5 max-w-[42ch] text-[0.92rem] leading-relaxed text-[#5B6675]">
                        Performa audio setara monitor studio dengan degradasi
                        kecil di bantalan earpad.
                      </p>
                    </div>
                  </div>
                  <div className="shrink-0 rounded-2xl bg-[#ECEEEB] px-4 py-3">
                    <p className="text-[0.8rem] font-medium text-[#5B6675]">
                      Keyakinan AI
                    </p>
                    <p className={`${display} mt-1 text-[1.5rem] leading-none`}>
                      94,8%
                    </p>
                  </div>
                </div>

                <h3 className="mt-8 text-[0.95rem] font-semibold">
                  Rincian penilaian per komponen
                </h3>
                <ul className="mt-4 space-y-4">
                  {scoreRows.map((row) => (
                    <li key={row.name}>
                      <div className="flex justify-between gap-4 text-[0.9rem]">
                        <span>{row.name}</span>
                        <span className="font-semibold tabular-nums">
                          {row.value}
                        </span>
                      </div>
                      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#ECEEEB]">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${row.value}%`,
                            background: barColor(row.value),
                          }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>

                <h3 className="mt-8 text-[0.95rem] font-semibold">
                  Jalur sirkular yang disarankan
                </h3>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <article className="rounded-2xl border border-[#0B4F3F]/25 bg-[#E6F2ED] p-5">
                    <span className={badge}>Jalur utama</span>
                    <h4 className="mt-3 text-[1.05rem] font-semibold">
                      Jual kembali
                    </h4>
                    <p className="mt-1.5 text-[0.88rem] leading-relaxed text-[#0A3D31]/75">
                      Cocok untuk pembeli studio yang mencari harga hemat.
                    </p>
                    <p
                      className={`${display} mt-3 text-[1.35rem] leading-none text-[#0A3D31]`}
                    >
                      Rp1.350.000 – Rp1.450.000
                    </p>
                  </article>
                  <article className="rounded-2xl border border-[#E4E7EB] p-5">
                    <span className={badgeGold}>Tambah nilai</span>
                    <h4 className="mt-3 text-[1.05rem] font-semibold">
                      Ganti earpad dulu
                    </h4>
                    <p className="mt-1.5 text-[0.88rem] leading-relaxed text-[#5B6675]">
                      Modal sekitar Rp60.000 untuk menaikkan skor kosmetik.
                    </p>
                    <p
                      className={`${display} mt-3 text-[1.35rem] leading-none`}
                    >
                      Potensi Rp1.650.000
                    </p>
                  </article>
                </div>
              </section>

              {/* Klarifikasi */}
              <section className={cardPad}>
                <h2 className={cardTitle}>Klarifikasi penjual</h2>
                <p className="mt-2 text-[0.92rem] leading-relaxed text-[#5B6675]">
                  Jawabanmu ditautkan pada perlindungan escrow 48 jam.
                </p>
                <div className="mt-6 space-y-5">
                  {questions.map((q, qi) => (
                    <fieldset
                      key={q.name}
                      className="rounded-2xl border border-[#E4E7EB] p-4 sm:p-5"
                    >
                      <legend className="px-1 text-[0.95rem] font-semibold">
                        {qi + 1}. {q.prompt}
                      </legend>
                      <div className="mt-3 space-y-2">
                        {q.options.map((opt, oi) => (
                          <label
                            key={opt}
                            className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-[0.9rem] transition-colors hover:bg-[#ECEEEB] has-[:checked]:bg-[#E6F2ED] has-[:checked]:font-semibold has-[:checked]:text-[#0B4F3F]"
                          >
                            <input
                              type="radio"
                              name={q.name}
                              defaultChecked={oi === 0}
                              className={checkbox}
                            />
                            {opt}
                          </label>
                        ))}
                      </div>
                    </fieldset>
                  ))}
                </div>
                <div className="mt-5 flex gap-3 rounded-2xl bg-[#E6F2ED] p-4">
                  <ShieldCheck
                    size={18}
                    className="mt-0.5 shrink-0 text-[#12705A]"
                  />
                  <p className="text-[0.88rem] leading-relaxed text-[#0A3D31]/80">
                    Jawaban penjual tersimpan dalam protokol perlindungan
                    pembeli.
                  </p>
                </div>
              </section>

              {/* Detail listing */}
              <section className={cardPad}>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h2 className={cardTitle}>Detail listing</h2>
                  <span className="text-[0.85rem] text-[#5B6675]">
                    Semua kolom dapat disunting
                  </span>
                </div>

                <div className="mt-6 space-y-5">
                  <label className={fieldLabel}>
                    Judul listing
                    <input
                      className={input}
                      defaultValue="Audio-Technica ATH-M50x studio monitor headphones, driver prima"
                    />
                  </label>

                  <label className={fieldLabel}>
                    Kategori
                    <input
                      readOnly
                      className={`${input} cursor-not-allowed bg-[#ECEEEB] text-[#5B6675]`}
                      value="Elektronik dan audio › Headphone dan aksesori"
                    />
                  </label>

                  <label className={fieldLabel}>
                    Deskripsi apa adanya
                    <textarea
                      rows={5}
                      className={textarea}
                      defaultValue="Driver dan performa suara normal. Ada minus kosmetik kecil pada bantalan earpad yang mulai terkelupas tipis karena pemakaian wajar. Engsel kokoh dan kabel coiled bawaan tersedia."
                    />
                  </label>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className={fieldLabel}>
                      Harga jual
                      <input className={input} defaultValue="Rp 1.400.000" />
                      <span className="text-[0.8rem] font-normal text-[#5B6675]">
                        Saran AI Rp1.350.000 – Rp1.450.000
                      </span>
                    </label>
                    <div className="rounded-xl border border-[#E4E7EB] p-4">
                      <p className="text-[0.85rem] font-semibold">
                        Penawaran harga
                      </p>
                      <label className="mt-3 flex cursor-pointer items-center gap-3 text-[0.9rem]">
                        <input
                          type="checkbox"
                          defaultChecked
                          className={checkbox}
                        />
                        Terima tawaran sampai Rp1.250.000
                      </label>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* ============ Sidebar ============ */}
            <aside className="flex flex-col gap-6 lg:sticky lg:top-24">
              <section className={cardPad}>
                <div className="flex items-center justify-between gap-3">
                  <h2 className={cardTitle}>Paspor digital produk</h2>
                  <span className={badgeNeutral}>Draf</span>
                </div>
                <div className="mt-4 rounded-2xl bg-[#ECEEEB] p-4">
                  <p className="text-[0.9rem] font-semibold">
                    #PASSPORT-DRAFT-ATH88
                  </p>
                  <p className="mt-1 text-[0.85rem] text-[#5B6675]">
                    Nomor seri terdaftar resmi
                  </p>
                </div>

                <h3 className="mt-6 text-[0.95rem] font-semibold">
                  Estimasi dampak
                </h3>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  {[
                    { value: "285 g", label: "E-waste dicegah" },
                    { value: "14,2 kg", label: "CO₂e dihindari" },
                  ].map((s) => (
                    <div key={s.label} className="rounded-2xl bg-[#ECEEEB] p-4">
                      <p className={`${display} text-[1.5rem] leading-none`}>
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
                    className={`${display} text-[1.5rem] leading-none text-[#0A3D31]`}
                  >
                    +35 poin
                  </p>
                  <p className="mt-1.5 text-[0.8rem] text-[#0A3D31]/70">
                    Reward penjual setelah terbit
                  </p>
                </div>
              </section>

              <section className={cardPad}>
                <div className="flex items-center justify-between gap-3">
                  <h2 className={cardTitle}>Kesiapan rilis</h2>
                  <span className={badgeGold}>4 dari 5</span>
                </div>
                <ul className="mt-4 space-y-2.5">
                  {readiness.map((item) => (
                    <li
                      key={item.label}
                      className="flex items-center gap-3 text-[0.9rem]"
                    >
                      <span
                        className={cx(
                          "grid h-5 w-5 shrink-0 place-items-center rounded-full text-[0.7rem] font-bold text-white",
                          item.done ? "bg-[#12705A]" : "bg-[#B4432B]",
                        )}
                      >
                        {item.done ? <Check size={12} /> : "!"}
                      </span>
                      <span className={item.done ? "" : "text-[#9A4A1B]"}>
                        {item.label}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-[0.85rem] leading-relaxed text-[#5B6675]">
                  Listing tetap bisa terbit, tapi foto jack menaikkan
                  kepercayaan pembeli.
                </p>
              </section>

              <section className={`${cardPad} bg-[#E6F2ED]`}>
                <div className="flex gap-3">
                  <ShieldCheck
                    size={20}
                    className="mt-0.5 shrink-0 text-[#12705A]"
                  />
                  <div>
                    <p className="text-[1.05rem] font-semibold">
                      Standar penjual tepercaya
                    </p>
                    <p className="mt-1.5 text-[0.88rem] leading-relaxed text-[#0A3D31]/75">
                      Deskripsi yang jujur menurunkan retur dan menjaga tier
                      Eco-Seller-mu.
                    </p>
                  </div>
                </div>
              </section>

              <section className={`${cardPad} flex flex-col gap-3`}>
                <button
                  type="button"
                  className={`${btnPrimary} sm:w-full`}
                  onClick={publish}
                >
                  <Send size={16} />
                  {published ? "Sudah terbit" : "Terbitkan ke marketplace"}
                </button>
                <button
                  type="button"
                  className={`${btnSecondary} sm:w-full`}
                  onClick={() => notify("Draf tersimpan.")}
                >
                  <Save size={16} /> Simpan dan lanjutkan nanti
                </button>
                {published && (
                  <p className={`${badgeError} justify-center`}>
                    Mode demo, listing belum benar-benar tayang
                  </p>
                )}
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
