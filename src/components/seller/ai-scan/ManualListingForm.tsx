"use client";
import {
  ArrowLeft,
  ArrowRight,
  Leaf,
  Plus,
  Save,
  ShieldCheck,
  X,
} from "lucide-react";
import { ChangeEvent, FormEvent, type ReactNode, useState } from "react";
import {
  actionsRow,
  badge,
  btnGhost,
  btnPrimary,
  btnSecondary,
  card,
  checkbox,
  closeBtn,
  fieldLabel,
  fieldWithin,
  focusWithin,
  input as inputField,
  modalFooter,
  modalHeader,
  modalPanel,
  modalTitle,
  nestedBackdrop,
  segmented,
  segTab,
  textarea,
} from "@/components/ui/tokens";

const defaultPhotos = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuD829EtupoqbvwyD50gGu7oWyMKHjT8NiMekjT6RW75RzOKUjuTX69P46oh1kaUbVPYfXFfV9k_Ti6SOXMjVI3A4aH0rgi8pUUTblwmq8K3d77o3F-9DhfPc59Hh1g9t9uM6IPw4VVNIl95lnmRDVgQvU-3tkjhSNunfxnE0Co3pydV3o_ItStQvUlrQ-vKqeKIfLqW1EAgaeokIzy4pZIi2iqQAhv8mO-lJY4yq4GIH0-hBSWm-Azl",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAkFs4fjOvdVcof_0iLmAiXl3sJpSEJlYqNzCqOjaV-Ix5HSL3behLoWkhx-MyvTzWisOtudm5qe0CEBrWKSy5SIbXaHpw1LgRi9hc9kkP9ccRbhszRiOy5g5zRsZlziknNc4VNGndMedkKmfrouqjr2RTA3UPrsfwr80p5muMnkAhBO7ppAt0CS9czYQ53g7KameGQUvEL2uOwg-uAUPbzVRxTYdJi-zuYPK882qkyEAYIwila-rvk",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBzpL0g2s71wb0kzqoFp2wU_1mB8s3riYTMUOz3J1cHFwDC-CyS5VUACmm8YUQcrUFQ_jbIp4_-q7xqoRbEdRA1qT6uYfNyYTjlyGDWzQ35vpfwtZLz-hBykcnm9ZgFBpiumNmrwFftW-4liIXVtCjvjUseDq8vMZpeJVHfpFbdEEaJumJydcf23Iq6XEuVxim-_6TAMV2mmL2Ehh8ovXp6SEftMD8Fz7XuhOqfa6NOd4AZhrkNXHK8",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuADwpmWa6096Nbirg2pSBvEI8OIH3f66ytU5lO2-bt6_cSDokj2y00Gq7PfVINKPcRcVEO9h7uCgv2HGZPs1y51AxhuRFAMKG5OAm_bm1wE8pfzc_Yx5Ovp8bw0BbD1q_dwb9BuzY9kqBnVBsbSVrkD6oTOG2Fsj8EfDsaTpOvKQwGHypN00VlJcaAiOgvTgb7NTJKSJjHh5OMSoqoJ0na-qbLXLCkG497evJpdLpOi6tGwsZ2o-M99",
];

const routes = [
  ["sell", "Jual Langsung"],
  ["swap", "Tukar Tambah"],
  ["donate", "Donasi Hijau"],
] as const;

export function ManualListingForm({
  onClose,
  onBack,
  onSaved,
  onContinue,
}: {
  onClose: () => void;
  onBack: () => void;
  onSaved: () => void;
  onContinue: () => void;
}) {
  const [photos, setPhotos] = useState<string[]>(defaultPhotos);
  const [route, setRoute] = useState("sell");
  const [agreed, setAgreed] = useState(true);
  const [price, setPrice] = useState("7.850.000");

  function addPhoto(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file)
      setPhotos((current) =>
        [...current, URL.createObjectURL(file)].slice(0, 5),
      );
  }
  function formatPrice(value: string) {
    const raw = value.replace(/\D/g, "");
    setPrice(raw ? new Intl.NumberFormat("id-ID").format(Number(raw)) : "");
  }
  function submit(event: FormEvent) {
    event.preventDefault();
    if (agreed) onContinue();
  }

  return (
    <div className={nestedBackdrop}>
      <form
        className={`${modalPanel} max-w-[880px]`}
        onSubmit={submit}
        role="dialog"
        aria-modal="true"
        aria-labelledby="manual-form-title"
      >
        <header className={modalHeader}>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <h2 id="manual-form-title" className={modalTitle}>
                Tambah Barang Manual • Jalur Mandiri
              </h2>
              <span className={badge}>Verifikasi Deklarasi Penjual</span>
            </div>
            <p className="mt-2 max-w-[62ch] leading-relaxed text-[#5B6675]">
              Isi kondisi dan riwayat barang secara transparan. Paspor Digital
              akan mencatat sumber deklarasi.
            </p>
          </div>
          <button
            type="button"
            className={closeBtn}
            onClick={onClose}
            aria-label="Tutup"
          >
            <X size={20} />
          </button>
        </header>

        <div className="flex items-start gap-3 border-b border-[#CFE3DA] bg-[#E6F2ED] px-4 py-3 text-[0.9rem] text-[#0B4F3F] sm:px-6">
          <ShieldCheck size={20} className="mt-0.5 shrink-0" />
          <p className="leading-relaxed">
            <b className="font-semibold">Transparansi skor:</b> kondisi dihitung
            dari jawaban penjual dan ditandai sebagai deklarasi mandiri.
          </p>
        </div>

        <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4 sm:p-6">
          <ManualSection number="1" title="Foto & Media Barang">
            <div className="grid gap-3 sm:grid-cols-[1.4fr_1fr]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="aspect-[4/3] w-full rounded-xl bg-[#EDEFEC] object-cover"
                src={photos[0]}
                alt="Foto utama Fujifilm X-T30 II"
              />
              <div className="grid grid-cols-2 gap-3">
                {photos.slice(1).map((photo, index) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={photo}
                    src={photo}
                    alt={`Foto tambahan ${index + 1}`}
                    className="aspect-square w-full rounded-xl bg-[#EDEFEC] object-cover"
                  />
                ))}
                {photos.length < 5 && (
                  <label
                    className={`flex aspect-square cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-[#CBD0D6] text-[0.82rem] font-semibold text-[#5B6675] transition-colors hover:border-[#0B4F3F] hover:text-[#0B4F3F] ${focusWithin}`}
                  >
                    <input
                      className="sr-only"
                      type="file"
                      accept="image/*"
                      onChange={addPhoto}
                    />
                    <Plus size={22} />
                    <span>Tambah Foto</span>
                  </label>
                )}
              </div>
            </div>
          </ManualSection>

          <ManualSection number="2" title="Informasi Dasar Produk">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className={`${fieldLabel} sm:col-span-2`}>
                Judul Listing
                <input
                  className={inputField}
                  defaultValue="Fujifilm X-T30 II Body Only - Silver (Kondisi Sangat Baik)"
                  required
                />
              </label>
              <label className={fieldLabel}>
                Kategori
                <select
                  className={`${inputField} cursor-pointer font-normal`}
                  defaultValue="camera"
                >
                  <option value="camera">Kamera & Optik • Mirrorless</option>
                  <option value="audio">Audio & Headphone</option>
                  <option value="computer">Komputer & Tablet</option>
                </select>
              </label>
              <label className={fieldLabel}>
                Tahun / Riwayat
                <input
                  className={`${inputField} font-normal`}
                  defaultValue="2022 • Pemakaian sekitar 2 tahun"
                />
              </label>
              <label className={fieldLabel}>
                Merk
                <input
                  className={`${inputField} font-normal`}
                  defaultValue="Fujifilm"
                  required
                />
              </label>
              <label className={fieldLabel}>
                Model
                <input
                  className={`${inputField} font-normal`}
                  defaultValue="X-T30 II"
                  required
                />
              </label>
            </div>
          </ManualSection>

          <ManualSection number="3" title="Deklarasi Kondisi Fisik & Fungsi">
            <div className="flex flex-col gap-5">
              <fieldset>
                <legend className="mb-2 text-[0.85rem] font-semibold">
                  Status Fungsi
                </legend>
                <div className="grid gap-2 sm:grid-cols-3">
                  {["100% Normal", "Ada Minus Minor", "Perlu Servis"].map(
                    (item, index) => (
                      <ChoiceChip
                        key={item}
                        name="function"
                        label={item}
                        defaultChecked={index === 0}
                      />
                    ),
                  )}
                </div>
              </fieldset>
              <fieldset>
                <legend className="mb-2 text-[0.85rem] font-semibold">
                  Kondisi Kosmetik
                </legend>
                <div className="grid gap-2 sm:grid-cols-3">
                  {[
                    "Mulus Seperti Baru",
                    "Lecet Pemakaian Wajar",
                    "Dent / Cacat Jelas",
                  ].map((item, index) => (
                    <ChoiceChip
                      key={item}
                      name="cosmetic"
                      label={item}
                      defaultChecked={index === 1}
                    />
                  ))}
                </div>
              </fieldset>
              <label className={fieldLabel}>
                Deskripsi Kejujuran
                <textarea
                  rows={4}
                  className={`${textarea} font-normal leading-relaxed`}
                  defaultValue="Kondisi fisik terawat. Sensor bersih, shutter count 4.200. Ada baret mikro di sudut bawah yang tidak memengaruhi fungsi. Lengkap box dan charger."
                  required
                />
              </label>
            </div>
          </ManualSection>

          <ManualSection number="4" title="Harga, Jalur Sirkular & Dampak">
            <div className="flex flex-col gap-5">
              <div
                role="group"
                aria-label="Jalur sirkular"
                className="-mx-1 overflow-x-auto px-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              >
                <div className={segmented}>
                  {routes.map(([id, label]) => (
                    <button
                      type="button"
                      key={id}
                      aria-pressed={route === id}
                      className={segTab(route === id)}
                      onClick={() => setRoute(id)}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div className={fieldLabel}>
                <label htmlFor="manual-price">Harga Pasang</label>
                <span
                  className={`flex overflow-hidden rounded-xl border border-[#E4E7EB] bg-white transition-colors ${fieldWithin}`}
                >
                  <b className="grid place-items-center border-r border-[#E4E7EB] bg-[#F7F8F7] px-4 text-[0.9rem] font-semibold text-[#5B6675]">
                    Rp
                  </b>
                  <input
                    id="manual-price"
                    inputMode="numeric"
                    value={price}
                    onChange={(event) => formatPrice(event.target.value)}
                    required
                    className="h-11 w-full bg-transparent px-3.5 text-[0.92rem] font-normal text-[#111827] outline-none"
                  />
                </span>
                <small className="font-normal text-[#5B6675]">
                  Rekomendasi pasar: Rp7.500.000 - Rp8.200.000
                </small>
              </div>

              <div className="flex flex-wrap items-center gap-x-8 gap-y-3 rounded-xl bg-[#E6F2ED] p-4 text-[#0B4F3F]">
                <Leaf size={22} className="shrink-0" />
                {[
                  { value: "+45 Poin", label: "Sirkularitas" },
                  { value: "380 g", label: "e-Waste Dicegah" },
                  { value: "16,5 kg", label: "CO₂e Dihemat" },
                ].map((m) => (
                  <div key={m.label}>
                    <b className="block text-[1.05rem] leading-tight font-semibold">
                      {m.value}
                    </b>
                    <small className="text-[0.8rem] text-[#0B4F3F]/75">
                      {m.label}
                    </small>
                  </div>
                ))}
              </div>
            </div>
          </ManualSection>

          <label
            className={`${card} flex cursor-pointer items-start gap-3 p-4`}
          >
            <input
              type="checkbox"
              className={`${checkbox} mt-0.5`}
              checked={agreed}
              onChange={(event) => setAgreed(event.target.checked)}
            />
            <span className="text-[0.9rem] leading-relaxed">
              Saya menyatakan seluruh informasi sesuai dengan kondisi fisik
              barang sebenarnya.
            </span>
          </label>
        </div>

        <footer className={modalFooter}>
          <button type="button" className={btnGhost} onClick={onBack}>
            <ArrowLeft size={16} />
            Beralih ke AI Scan
          </button>
          <div className={actionsRow}>
            <button type="button" className={btnSecondary} onClick={onSaved}>
              <Save size={16} />
              Simpan Draf
            </button>
            <button type="submit" disabled={!agreed} className={btnPrimary}>
              Pratinjau & Publikasi <ArrowRight size={16} />
            </button>
          </div>
        </footer>
      </form>
    </div>
  );
}

/* ---------- Bagian kecil ---------- */
function ManualSection({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className={`${card} p-4 sm:p-6`}>
      <h3 className="flex items-center gap-3 text-[1.05rem] font-semibold">
        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#0B4F3F] text-[0.8rem] text-white">
          {number}
        </span>
        {title}
      </h3>
      <div className="mt-4">{children}</div>
    </section>
  );
}

// Radio bergaya kartu: input asli tetap ada (sr-only) supaya keyboard & screen reader jalan
function ChoiceChip({
  name,
  label,
  defaultChecked,
}: {
  name: string;
  label: string;
  defaultChecked?: boolean;
}) {
  return (
    <label className="relative block cursor-pointer">
      <input
        type="radio"
        name={name}
        defaultChecked={defaultChecked}
        className="peer sr-only"
      />
      <span className="flex min-h-11 items-center justify-center rounded-xl border border-[#E4E7EB] bg-white px-3 text-center text-[0.88rem] font-semibold text-[#5B6675] transition-colors hover:border-[#0B4F3F] peer-checked:border-[#0B4F3F] peer-checked:bg-[#E6F2ED] peer-checked:text-[#0B4F3F] peer-focus-visible:outline peer-focus-visible:outline-[3px] peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#12705A]">
        {label}
      </span>
    </label>
  );
}
