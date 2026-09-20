"use client";
import {
  Camera,
  Check,
  Lightbulb,
  Maximize2,
  ScanLine,
  ShieldCheck,
  Sun,
  X,
} from "lucide-react";
import { useEffect } from "react";
import {
  actionsRow,
  badge,
  badgeError,
  btnGhost,
  btnPrimary,
  card,
  closeBtn,
  modalFooter,
  modalHeader,
  modalPanel,
  modalTitle,
  nestedBackdrop,
} from "@/components/ui/tokens";

const goodImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDGiYfbsJGkEGSOe1cVSf8oDGuzoMWXDOAWnLLda4F3mFOyyHnMeboOZ0HvfroYoCTeLOeXhuwR9KtvdfDHX9Pti7KKhYHzKbnlsIJYH8oHFzENWc6P8KrEf1TlWXIMxMk-XfoPEgmQI2AP977iP0G_4wTVO41vgkT8zvSSyy-w9Bg0_gH5EI9QG75K0ewcMjVVH2fRyhFM1eM5HzU7vZTIsFh2O1LtuzzEt-_sckM";
const badImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBdB_AmpZcJKwVwiztvcRHXPzPgmqhum4Dq59xV-4bZqjR9VBL7aiuOqY1cJ72ViAwIFKhw2PUHmisKQb2wZrCj332peqF33pO4_MdyNJFwCxEUwzrm8JQegSsMMIqJ8fkBERCKfEygtXme0gpqyA7-X4h3fLt89vcA8XjEzLDYcNgfbKmscoqZVPPCnf8cLtnoNQh2y_NdIjYiTLRmf69MVi16n9T5n8QVDO8eB0M";

const rules = [
  {
    icon: Sun,
    title: "Cahaya Terang & Alami",
    text: "Hindari flash langsung pada lensa atau kaca.",
  },
  {
    icon: Maximize2,
    title: "Tangkap Seluruh Objek",
    text: "Pastikan tidak ada sisi barang yang terpotong.",
  },
  {
    icon: ScanLine,
    title: "Fokus Detail Kritis",
    text: "Ambil close-up port, layar, dial, dan keausan.",
  },
  {
    icon: ShieldCheck,
    title: "Perlindungan Privasi",
    text: "Jauhkan identitas dan data pribadi dari latar.",
  },
];

export function PhotoGuideModal({
  onClose,
  onContinue,
}: {
  onClose: () => void;
  onContinue: () => void;
}) {
  useEffect(() => {
    const handler = (event: KeyboardEvent) =>
      event.key === "Escape" && onClose();
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      className={nestedBackdrop}
      onMouseDown={(event) => event.currentTarget === event.target && onClose()}
    >
      <section
        className={`${modalPanel} max-w-[900px]`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="photo-guide-title"
      >
        <div className="h-1.5 shrink-0 bg-[#C29A4B]" />
        <header className={modalHeader}>
          <div className="flex min-w-0 items-start gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#E6F2ED] text-[#0B4F3F]">
              <Camera size={25} />
            </span>
            <div className="min-w-0">
              <h2 id="photo-guide-title" className={modalTitle}>
                Panduan Foto untuk Verifikasi AI & Paspor Sirkular
              </h2>
              <p className="mt-2 max-w-[62ch] leading-relaxed text-[#5B6675]">
                Ikuti panduan berikut agar AI Vision mengenali kondisi barang
                secara presisi dan penerbitan paspor berjalan lebih cepat.
              </p>
            </div>
          </div>
          <button
            type="button"
            className={closeBtn}
            onClick={onClose}
            aria-label="Tutup panduan"
          >
            <X size={20} />
          </button>
        </header>

        <div className="flex flex-1 flex-col gap-6 overflow-y-auto p-4 sm:p-6">
          <div className="grid gap-4 md:grid-cols-2">
            <GuideCard
              good
              title="Direkomendasikan • Akurasi >95%"
              image={goodImage}
              points={[
                "Pencahayaan terang dan merata",
                "Seluruh bodi masuk ke dalam frame",
                "Nomor seri terbaca tanpa pantulan",
                "Foto fokus dan stabil",
              ]}
            />
            <GuideCard
              title="Hindari • Memicu kegagalan"
              image={badImage}
              points={[
                "Foto buram akibat guncangan",
                "Pantulan flash menutup detail",
                "Objek terpotong atau terlalu jauh",
                "Latar terlalu ramai",
              ]}
            />
          </div>

          <section>
            <h3 className="flex items-center gap-2 text-[1.1rem] font-semibold">
              <ShieldCheck size={19} className="text-[#12705A]" />4 Aturan Kunci
              Pengambilan Foto
            </h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {rules.map(({ icon: Icon, title, text }) => (
                <article key={title} className={`${card} p-4`}>
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-[#E6F2ED] text-[#0B4F3F]">
                    <Icon size={18} />
                  </span>
                  <b className="mt-3 block text-[0.95rem] leading-snug font-semibold">
                    {title}
                  </b>
                  <p className="mt-1 text-[0.88rem] leading-relaxed text-[#5B6675]">
                    {text}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <div className="flex items-start gap-3 rounded-2xl bg-[#0A3D31] p-5 text-white">
            <Lightbulb size={20} className="mt-0.5 shrink-0 text-[#E2BC6B]" />
            <div>
              <b className="font-semibold">Tips Kamera & Elektronik</b>
              <p className="mt-1 leading-relaxed text-white/75">
                Sertakan foto sensor atau lensa, layar aktif, dan nomor seri
                untuk meningkatkan kepercayaan verifikasi hingga Grade A.
              </p>
            </div>
          </div>
        </div>

        <footer className={modalFooter}>
          <span className="text-sm text-[#5B6675]">
            JPG, PNG, WEBP • Maks. 10 MB per foto
          </span>
          <div className={actionsRow}>
            <button type="button" className={btnGhost} onClick={onClose}>
              Kembali ke Scan
            </button>
            <button type="button" className={btnPrimary} onClick={onContinue}>
              <Camera size={17} />
              Saya Paham, Unggah Foto
            </button>
          </div>
        </footer>
      </section>
    </div>
  );
}

function GuideCard({
  good = false,
  title,
  image,
  points,
}: {
  good?: boolean;
  title: string;
  image: string;
  points: string[];
}) {
  return (
    <article
      className={`flex flex-col gap-3 rounded-2xl border bg-white p-4 ${
        good ? "border-[#0B4F3F]" : "border-[#EBC5AB]"
      }`}
    >
      <span className={`${good ? badge : badgeError} w-fit`}>
        {good ? <Check size={14} /> : <X size={14} />} {title}
      </span>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image}
        alt={
          good
            ? "Contoh foto produk yang benar"
            : "Contoh foto produk yang harus dihindari"
        }
        className="aspect-[4/3] w-full rounded-xl bg-[#EDEFEC] object-cover"
      />
      <ul className="space-y-2">
        {points.map((point) => (
          <li key={point} className="flex items-start gap-2 text-[0.9rem]">
            <span
              className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full ${
                good
                  ? "bg-[#E6F2ED] text-[#0B4F3F]"
                  : "bg-[#FBEDE4] text-[#9A4A1B]"
              }`}
            >
              {good ? <Check size={12} /> : <X size={12} />}
            </span>
            {point}
          </li>
        ))}
      </ul>
    </article>
  );
}
