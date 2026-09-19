"use client";
import Link from "next/link";
import {
  Camera,
  Check,
  CheckCircle,
  ImagePlus,
  Send,
  Save,
  ShieldCheck,
  Sparkles,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { SellerShell } from "@/components/seller/SellerShell";
import styles from "@/components/seller/SellerDetail.module.css";

const images = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBD0FbLJ6plXtjEtvVaqx13yEFZg9d_fMOeiUBoz9640Ez1BN63dJ6gfk57OpiupYG3eKHKVkMvsQJN_MudsX_7NMNybIHRJQOIPbMxlRK7cHQMXzdSF4SEpfMxEquaGgq4YgMn8efssMwVJOQEOsgfILooxv29XW8bH58W2QlLIn6Ce-adXi4HKkacVCuCHSt4f4_BdCFWCVV1ITUsb9ZOkiumGEEohxccievIsc1D4PQaqfJwBqBS",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAEQU9eAf4Zh2D7LauDRWkTmMk064qJEDYIyNSAu1eCPMB22W1RTy9RAbOTCl3WTVSr3vXXhi6HarLIZ0NUXuvjdebrleNqpyqTTi5al3APoU0Duu2ks-_qqUc_FC0Zgav9XuLATIMS24DCBAcoKowNPfwxIeIdUI3yfXWKRJwlYfEXpPHMFRFHHOJbL3PkhbXf6oQHjADD0bHyR4B-Bf2HtNMQu1CAgbpxpbhautdWyEC9GKigA-T8",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCOuoYp5o-bNr975GMY5hbqqIXZR353Z56w8mAOZDkLVkX1Em9nvLhHTyY--A8e5_JmhncQ0ZBXm1lO5KZ7Da_-JzG8wJe0n8afCtlp-a9TsnE3ILeU5MUUthkNGr0GZiWMusFxOwSNz0abgXhJcjOVGkTnAzKqvLzl64YEfsrpUzvDi9Goz6Cjlp6zwRh2Fa7f3o2xIaL3wPyojoakREaqXgAPEDMrqQdIT-fRZWGNgRcveh1BjZg-",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAk1aV9CEAlMoKGMmVfaEHGSIgRjIzvzyYzvMV2SCwK9SpSe2daUBjK3NjGR57JLDt79Ir1Wkls9xHz_ZwW-DjoESzB9RimAMioTXa5EJueGFdJIJXIijv00rnt4n9FEo_GjzcbhIl5QS2FC6X7ssRg_j81oAwGhyT8E1S6Fik1wMcfONdrqGTg3TOMaMQsnWY0ESfIoT-Mr5xCAPGVccTKWm29OScFmXIPQJUKKUcVQVBOOQP9D1-j",
];
const scoreRows = [
  { name: "Fungsi Audio & Driver 45mm", value: 98, color: "#2f8f68" },
  { name: "Struktur Fisik & Engsel", value: 90, color: "#2f8f68" },
  { name: "Estetika & Bantalan Earpad", value: 55, color: "#e5a93d" },
  { name: "Kelengkapan Aksesori", value: 70, color: "#3478b8" },
];

export default function DraftReviewPage() {
  const [toast, setToast] = useState("");
  const [published, setPublished] = useState(false);
  const [extraPhoto, setExtraPhoto] = useState(false);
  function notify(v: string) {
    setToast(v);
    setTimeout(() => setToast(""), 2500);
  }
  function publish() {
    setPublished(true);
    notify("Listing berhasil dipublikasikan secara lokal.");
  }
  return (
    <SellerShell active="inventory">
      <main className={styles.page}>
        <div className={styles.head}>
          <div>
            <div className={styles.badgeRow}>
              <h1>Review Hasil Inspeksi AI & Lengkapi Draf</h1>
              <span className={styles.badge}>Draf #DRAFT-AI-8809</span>
              <span className={styles.badge}>
                <Sparkles size={14} />
                AI Multi-Vision v2.4
              </span>
            </div>
            <p>
              Periksa hasil mesin, konfirmasi fungsi, dan tetapkan harga pasar
              sirkular.
            </p>
          </div>
          <div className={styles.actions}>
            <button
              className={styles.danger}
              onClick={() => notify("Draf tidak dihapus. Mode demo aktif.")}
            >
              <Trash2 size={16} />
              Hapus Draf
            </button>
            <button className={styles.primary} onClick={publish}>
              <Send size={16} />
              {published ? "Sudah Terbit" : "Publikasikan"}
            </button>
          </div>
        </div>
        <div className={styles.stepper}>
          {[
            "Unggah Foto",
            "Analisis AI",
            "Klarifikasi Penjual",
            "Skor & Jalur",
            "Detail & Harga",
          ].map((step, index) => (
            <div
              className={`${styles.step} ${index < 2 ? styles.stepDone : ""} ${index === 2 ? styles.stepActive : ""}`}
              key={step}
            >
              {index < 2 ? "✓ " : `${index + 1}. `}
              {step}
            </div>
          ))}
        </div>
        <div className={styles.grid}>
          <section className={styles.column}>
            <article className={styles.card}>
              <div className={styles.between}>
                <div>
                  <h2>Visual AI Inspection Heatmap</h2>
                  <p className={styles.muted}>
                    Bounding box menandai komponen dan keausan kosmetik.
                  </p>
                </div>
                <span className={styles.badge}>Mode Inspeksi Aktif</span>
              </div>
              <div className={styles.heatmap}>
                <img
                  src={images[0]}
                  alt="Audio-Technica ATH-M50x hasil inspeksi"
                />
                <div className={styles.boxGood}>Driver & Swivel: 98%</div>
                <div className={styles.boxWarn}>Earpad Wear: 35%</div>
              </div>
              <div className={styles.thumbs}>
                {images.slice(1).map((src, index) => (
                  <img src={src} alt={`Foto inspeksi ${index + 2}`} key={src} />
                ))}
                <button
                  className={styles.addPhoto}
                  onClick={() => setExtraPhoto(true)}
                >
                  <ImagePlus />+ Foto Jack
                  <br />
                  <small>+10 Poin Transparansi</small>
                </button>
              </div>
              {extraPhoto && (
                <p className={styles.badge}>
                  Slot foto tambahan diaktifkan. Upload masih simulasi lokal.
                </p>
              )}
            </article>
            <article className={styles.card}>
              <div className={styles.scorePanel}>
                <div className={styles.scoreHeader}>
                  <div className={styles.badgeRow}>
                    <div className={styles.scoreCircle}>
                      <b>75</b>
                    </div>
                    <div>
                      <h2>Kondisi Baik • Grade B+</h2>
                      <p>
                        Performa audio referensi studio dengan degradasi minor
                        pada earpad.
                      </p>
                    </div>
                  </div>
                  <div>
                    <small>Tingkat Keyakinan AI</small>
                    <div className={styles.price}>94,8%</div>
                  </div>
                </div>
              </div>
              <h3>Rincian Komponen Penilaian AI</h3>
              {scoreRows.map((row) => (
                <div className={styles.scoreRow} key={row.name}>
                  <div className={styles.between}>
                    <b>{row.name}</b>
                    <b>{row.value}/100</b>
                  </div>
                  <div className={styles.progress}>
                    <i
                      style={{ width: `${row.value}%`, background: row.color }}
                    />
                  </div>
                </div>
              ))}
              <h3>Rekomendasi Jalur Sirkular</h3>
              <div className={styles.routeGrid}>
                <div className={styles.routeCard}>
                  <span className={styles.badge}>Jalur Utama</span>
                  <h3>Jual Kembali</h3>
                  <p>Jual transparan untuk pembeli studio hemat.</p>
                  <b>Rp1.350.000 - Rp1.450.000</b>
                </div>
                <div className={styles.routeCard}>
                  <span className={styles.badge}>Tambah Nilai</span>
                  <h3>Ganti Earpad Baru</h3>
                  <p>Modal sekitar Rp60.000 untuk menaikkan skor.</p>
                  <b>Potensi Rp1.650.000</b>
                </div>
              </div>
            </article>
            <article className={styles.card}>
              <h2>Klarifikasi & Bukti Penjual</h2>
              <p className={styles.muted}>
                Pernyataan ini ditautkan pada perlindungan Escrow 48 jam.
              </p>
              <div className={styles.question}>
                <b>
                  1. Apakah driver kiri dan kanan seimbang tanpa suara kresek?
                </b>
                <label>
                  <input defaultChecked name="driver" type="radio" />
                  Ya, jernih di semua frekuensi
                </label>
                <label>
                  <input name="driver" type="radio" />
                  Ada kresek halus saat kabel diputar
                </label>
              </div>
              <div className={styles.question}>
                <b>
                  2. Apakah kabel original masih lentur tanpa sambungan isolasi?
                </b>
                <label>
                  <input defaultChecked name="cable" type="radio" />
                  Ya, kabel bawaan original utuh
                </label>
                <label>
                  <input name="cable" type="radio" />
                  Menggunakan kabel aftermarket
                </label>
              </div>
              <div className={styles.notice}>
                <ShieldCheck size={18} />
                Jawaban penjual tercatat dalam protokol perlindungan pembeli.
              </div>
            </article>
            <article className={styles.card}>
              <div className={styles.between}>
                <h2>Detail Listing Pasar</h2>
                <span className={styles.muted}>Dapat disunting</span>
              </div>
              <div className={styles.form}>
                <label className={styles.field}>
                  <b>Judul Listing</b>
                  <input defaultValue="Audio-Technica ATH-M50x Professional Studio Monitor Headphones - Driver Prima" />
                </label>
                <label className={styles.field}>
                  <b>Kategori</b>
                  <input
                    readOnly
                    value="Elektronik & Audio > Headphone & Aksesori"
                  />
                </label>
                <label className={styles.field}>
                  <b>Deskripsi Kejujuran AI</b>
                  <textarea
                    rows={5}
                    defaultValue="Driver dan performa suara normal. Minus kosmetik minor pada bantalan earpad yang mulai terkelupas tipis karena usia pemakaian wajar. Engsel kokoh dan kabel coiled original tersedia."
                  />
                </label>
                <div className={styles.twoCols}>
                  <label className={styles.field}>
                    <b>Harga Jual</b>
                    <input defaultValue="Rp 1.400.000" />
                    <small>Saran AI Rp1.350.000 - Rp1.450.000</small>
                  </label>
                  <div className={styles.fieldBox}>
                    <b>Fitur Tawar Sirkular</b>
                    <label>
                      <input type="checkbox" defaultChecked /> Aktif, batas
                      Rp1.250.000
                    </label>
                  </div>
                </div>
              </div>
            </article>
          </section>
          <aside className={`${styles.column} ${styles.sticky}`}>
            <article className={styles.card}>
              <div className={styles.between}>
                <h3>Paspor Digital Produk</h3>
                <span className={styles.badge}>DRAFT</span>
              </div>
              <div className={styles.notice}>
                <b>#PASSPORT-DRAFT-ATH88</b>
                <span>Verifikasi seri: Terdaftar resmi</span>
              </div>
              <h4>Estimasi Dampak Sirkular</h4>
              <div className={styles.stats}>
                <div className={styles.stat}>
                  <strong>285 g</strong>
                  <small>e-Waste Dicegah</small>
                </div>
                <div className={styles.stat}>
                  <strong>14,2 kg</strong>
                  <small>CO₂e Dihindari</small>
                </div>
              </div>
              <div className={styles.stat}>
                <strong>+35 Poin Eco</strong>
                <small>Reward Penjual</small>
              </div>
            </article>
            <article className={styles.card}>
              <div className={styles.between}>
                <h3>Kesiapan Rilis</h3>
                <b>4/5 Siap</b>
              </div>
              <div className={styles.checklist}>
                {[
                  "Foto utama terverifikasi AI",
                  "Keausan dikonfirmasi penjual",
                  "Uji fungsi driver terisi",
                  "Foto jack kabel opsional",
                  "Harga sesuai rekomendasi",
                ].map((item, index) => (
                  <div className={styles.ready} key={item}>
                    <span className={styles.readyDot}>
                      {index === 3 ? "!" : "✓"}
                    </span>
                    {item}
                  </div>
                ))}
              </div>
            </article>
            <article className={styles.notice}>
              <ShieldCheck />
              <div>
                <b>Standar Penjual Tepercaya</b>
                <p>
                  Deskripsi jujur membantu mengurangi retur dan menjaga
                  Eco-Seller Tier.
                </p>
              </div>
            </article>
            <article className={styles.card}>
              <button className={styles.primary} onClick={publish}>
                <Send size={17} />
                Terbitkan ke Marketplace
              </button>
              <button
                className={styles.secondary}
                onClick={() => notify("Draf berhasil disimpan secara lokal.")}
              >
                <Save size={17} />
                Simpan & Lanjutkan Nanti
              </button>
            </article>
          </aside>
        </div>
      </main>
      {toast && <div className={styles.toast}>{toast}</div>}
    </SellerShell>
  );
}
