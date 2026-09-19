"use client";
import { Camera, Check, Lightbulb, ShieldCheck, X } from "lucide-react";
import { useEffect } from "react";
import styles from "./AiScanModal.module.css";

const goodImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDGiYfbsJGkEGSOe1cVSf8oDGuzoMWXDOAWnLLda4F3mFOyyHnMeboOZ0HvfroYoCTeLOeXhuwR9KtvdfDHX9Pti7KKhYHzKbnlsIJYH8oHFzENWc6P8KrEf1TlWXIMxMk-XfoPEgmQI2AP977iP0G_4wTVO41vgkT8zvSSyy-w9Bg0_gH5EI9QG75K0ewcMjVVH2fRyhFM1eM5HzU7vZTIsFh2O1LtuzzEt-_sckM";
const badImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBdB_AmpZcJKwVwiztvcRHXPzPgmqhum4Dq59xV-4bZqjR9VBL7aiuOqY1cJ72ViAwIFKhw2PUHmisKQb2wZrCj332peqF33pO4_MdyNJFwCxEUwzrm8JQegSsMMIqJ8fkBERCKfEygtXme0gpqyA7-X4h3fLt89vcA8XjEzLDYcNgfbKmscoqZVPPCnf8cLtnoNQh2y_NdIjYiTLRmf69MVi16n9T5n8QVDO8eB0M";

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
      className={styles.nestedBackdrop}
      onMouseDown={(event) => event.currentTarget === event.target && onClose()}
    >
      <section
        className={styles.guideModal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="photo-guide-title"
      >
        <div className={styles.guideAccent} />
        <header className={styles.guideHeader}>
          <div className={styles.guideTitle}>
            <span className={styles.guideIcon}>
              <Camera size={25} />
            </span>
            <div>
              <h2 id="photo-guide-title">
                Panduan Foto untuk Verifikasi AI & Paspor Sirkular
              </h2>
              <p>
                Ikuti panduan berikut agar AI Vision mengenali kondisi barang
                secara presisi dan penerbitan paspor berjalan lebih cepat.
              </p>
            </div>
          </div>
          <button
            className={styles.close}
            onClick={onClose}
            aria-label="Tutup panduan"
          >
            <X size={20} />
          </button>
        </header>
        <div className={styles.guideBody}>
          <div className={styles.photoComparison}>
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
            <h3 className={styles.sectionHeading}>
              <ShieldCheck size={19} />4 Aturan Kunci Pengambilan Foto
            </h3>
            <div className={styles.ruleGrid}>
              {[
                "Cahaya Terang & Alami",
                "Tangkap Seluruh Objek",
                "Fokus Detail Kritis",
                "Perlindungan Privasi",
              ].map((title, index) => (
                <article className={styles.ruleCard} key={title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <b>{title}</b>
                  <p>
                    {
                      [
                        "Hindari flash langsung pada lensa atau kaca.",
                        "Pastikan tidak ada sisi barang yang terpotong.",
                        "Ambil close-up port, layar, dial, dan keausan.",
                        "Jauhkan identitas dan data pribadi dari latar.",
                      ][index]
                    }
                  </p>
                </article>
              ))}
            </div>
          </section>
          <div className={styles.guideCallout}>
            <Lightbulb size={20} />
            <div>
              <b>Tips Kamera & Elektronik</b>
              <p>
                Sertakan foto sensor atau lensa, layar aktif, dan nomor seri
                untuk meningkatkan kepercayaan verifikasi hingga Grade A.
              </p>
            </div>
          </div>
        </div>
        <footer className={styles.guideFooter}>
          <span>JPG, PNG, WEBP • Maks. 10 MB per foto</span>
          <div className={styles.actions}>
            <button className={styles.buttonSoft} onClick={onClose}>
              Kembali ke Scan
            </button>
            <button className={styles.buttonPrimary} onClick={onContinue}>
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
      className={`${styles.guideCard} ${good ? styles.guideGood : styles.guideBad}`}
    >
      <span className={`${styles.badge} ${good ? "" : styles.errorBadge}`}>
        {good ? <Check size={14} /> : <X size={14} />} {title}
      </span>
      <img
        src={image}
        alt={
          good
            ? "Contoh foto produk yang benar"
            : "Contoh foto produk yang harus dihindari"
        }
      />
      <div>
        {points.map((point) => (
          <p key={point}>
            <span>{good ? "✓" : "×"}</span>
            {point}
          </p>
        ))}
      </div>
    </article>
  );
}
