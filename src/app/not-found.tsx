"use client";

import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  CircleAlert,
  CloudOff,
  Cpu,
  Flag,
  Home,
  Leaf,
  LockKeyhole,
  PackageSearch,
  Recycle,
  ScanLine,
  Search,
  Send,
  Truck,
  X,
} from "lucide-react";
import { FormEvent, useState } from "react";
import styles from "@/components/errors/NotFoundPage.module.css";

const recoveryPaths = [
  {
    href: "/discover",
    icon: Cpu,
    title: "Katalog Gawai Terverifikasi",
    description:
      "Temukan perangkat pre-loved yang telah memiliki skor kondisi dan Paspor Sirkular.",
  },
  {
    href: "/status",
    icon: Truck,
    title: "Status Pesanan & Escrow",
    description:
      "Lacak transaksi aktif serta status perlindungan Smart Escrow hingga barang diterima.",
  },
  {
    href: "/seller/scan",
    icon: ScanLine,
    title: "Portal Penjual & AI Scan",
    description:
      "Pindai barang bekas untuk membuat listing, estimasi harga, dan rekomendasi jalur sirkular.",
  },
  {
    href: "/profile",
    icon: Leaf,
    title: "Dampak & Paspor Sirkular",
    description:
      "Pantau kontribusi pengurangan e-waste, emisi CO₂e, dan riwayat Paspor Sirkular Anda.",
  },
];

const metrics = [
  { icon: Recycle, value: "98,4%", label: "Siklus Sukses" },
  { icon: BadgeCheck, value: "48 Poin", label: "Inspeksi AI Aktif" },
  { icon: LockKeyhole, value: "100%", label: "Escrow Terjamin" },
  { icon: CloudOff, value: "-12,8 Ton", label: "Pencegahan Karbon" },
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
      ? `/discover?q=${encodeURIComponent(normalized)}`
      : "/discover";
  }

  function submitReport(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("Terima kasih. Kendala tautan telah dicatat secara lokal.");
    setReport("");
    setTimeout(() => setReportOpen(false), 1100);
  }

  return (
    <main className={styles.page}>
      <div className={styles.ambient} />
      <section className={styles.hero}>
        <span className={styles.statusBadge}>
          <CircleAlert size={15} /> Rute Sirkular Terputus
        </span>

        <div className={styles.errorVisual} aria-label="Error 404">
          <span>4</span>
          <div className={styles.cycleIcon}>
            <svg viewBox="0 0 100 100" aria-hidden="true">
              <path
                className={styles.arcPrimary}
                d="M50 12 A38 38 0 0 1 88 50"
              />
              <path className={styles.arrowPrimary} d="M88 44 L88 52 L80 50" />
              <path
                className={styles.arcWarning}
                d="M50 88 A38 38 0 0 1 12 50"
              />
              <path className={styles.arrowWarning} d="M12 56 L12 48 L20 50" />
              <path
                className={styles.leafOne}
                d="M50 62 C50 44 40 38 36 36 C44 36 50 44 50 62Z"
              />
              <path
                className={styles.leafTwo}
                d="M50 62 C50 48 58 42 64 42 C58 44 50 52 50 62Z"
              />
            </svg>
            <span className={styles.brokenBadge}>
              <X size={15} />
            </span>
          </div>
          <span>4</span>
        </div>

        <div className={styles.copy}>
          <h1>Ups! Rute yang Anda Cari Tidak Ditemukan</h1>
          <p>
            Halaman atau barang ini mungkin telah dialihkan, selesai
            ditransaksikan, atau tautannya berubah. Gunakan pencarian atau pilih
            jalur pemulihan berikut.
          </p>
        </div>

        <form className={styles.searchForm} onSubmit={submitSearch}>
          <Search size={21} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Cari gawai, suku cadang, atau rute sirkular..."
            aria-label="Cari marketplace"
          />
          <button type="submit">
            Cari Rute <ArrowRight size={17} />
          </button>
        </form>

        <Link href="/" className={styles.homeButton}>
          <Home size={18} /> Kembali ke Beranda
        </Link>
      </section>

      <section className={styles.metrics} aria-label="Metrik PakaiLagi">
        {metrics.map(({ icon: Icon, value, label }) => (
          <article key={label}>
            <Icon size={24} />
            <div>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          </article>
        ))}
      </section>

      <section className={styles.recovery}>
        <h2>Mungkin Anda Ingin Menuju ke Sini</h2>
        <div className={styles.recoveryGrid}>
          {recoveryPaths.map(({ href, icon: Icon, title, description }) => (
            <Link className={styles.recoveryCard} href={href} key={href}>
              <span className={styles.cardIcon}>
                <Icon size={25} />
              </span>
              <div>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
              <ArrowRight className={styles.cardArrow} size={19} />
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.reportCard}>
        <span className={styles.reportIcon}>
          <Flag size={21} />
        </span>
        <div>
          <h2>Menemukan tautan bermasalah atau katalog yang hilang?</h2>
          <p>
            Laporkan agar integritas navigasi dan siklus transaksi PakaiLagi
            tetap terjaga.
          </p>
        </div>
        <button onClick={() => setReportOpen((value) => !value)}>
          <Flag size={17} /> Laporkan Kendala
        </button>
      </section>

      {reportOpen && (
        <form className={styles.reportForm} onSubmit={submitReport}>
          <div className={styles.reportHeading}>
            <span>
              <Send size={18} /> Detail Kendala Tautan
            </span>
            <button
              type="button"
              onClick={() => setReportOpen(false)}
              aria-label="Tutup laporan"
            >
              <X size={18} />
            </button>
          </div>
          <p>
            Alamat yang diakses akan dicatat oleh sistem. Tambahkan konteks
            singkat bila diperlukan.
          </p>
          <div className={styles.reportControls}>
            <input
              value={report}
              onChange={(event) => setReport(event.target.value)}
              placeholder="Contoh: Saya mencari produk dari tautan chat penjual..."
              required
            />
            <button type="submit">Kirim Masukan</button>
          </div>
          {message && <span className={styles.success}>{message}</span>}
        </form>
      )}

      <div className={styles.bottomNote}>
        <PackageSearch size={18} /> Anda tetap dapat mencari seluruh katalog
        dari halaman Discover.
      </div>
    </main>
  );
}
