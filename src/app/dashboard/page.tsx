"use client";
import Link from "next/link";
import {
  Camera,
  CirclePlus,
  Cpu,
  Leaf,
  Recycle,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Sofa,
  Sparkles,
  Verified,
} from "lucide-react";
import { useMemo, useState } from "react";
import {
  MarketplaceFooter,
  MarketplaceHeader,
} from "@/components/marketplace/MarketplaceShell";
import { ProductCard } from "@/components/marketplace/ProductCard";
import { CircularPath, products } from "@/data/marketplace";
import styles from "@/components/marketplace/Marketplace.module.css";

const filters: { label: string; value: "all" | CircularPath }[] = [
  { label: "Semua", value: "all" },
  { label: "Beli (Sell)", value: "sell" },
  { label: "Tukar (Swap)", value: "swap" },
  { label: "Donasi", value: "donate" },
  { label: "Perlu Perbaikan", value: "repair" },
];
const categories = [
  { label: "Elektronik", count: "3.410 item", icon: Smartphone },
  { label: "Perabot Rumah", count: "2.180 item", icon: Sofa },
  { label: "Fashion & Aksesori", count: "4.890 item", icon: Sparkles },
  { label: "Hobi & Kamera", count: "1.640 item", icon: Camera },
  { label: "Buku & Media", count: "2.700 item", icon: Cpu },
];

export default function DashboardPage() {
  const [filter, setFilter] = useState<"all" | CircularPath>("all");
  const [sort, setSort] = useState("relevance");
  const visible = useMemo(() => {
    const list =
      filter === "all"
        ? products
        : products.filter((p) => p.paths.includes(filter));
    return [...list].sort((a, b) =>
      sort === "score-desc"
        ? b.score - a.score
        : sort === "price-asc"
          ? a.price - b.price
          : sort === "price-desc"
            ? b.price - a.price
            : 0,
    );
  }, [filter, sort]);
  return (
    <div className={styles.shell}>
      <MarketplaceHeader />
      <main className={styles.main}>
        <section className={styles.hero}>
          <div>
            <span className={styles.eyebrow}>
              <Verified size={16} /> Marketplace Ekonomi Sirkular Berbasis AI
            </span>
            <h1>
              Perpanjang usia guna,
              <br />
              <span>pilih dampak nyata.</span>
            </h1>
            <p>
              Temukan barang preloved terverifikasi kondisi aslinya, atau
              salurkan kembali agar bernilai nyata. Transparan lewat audit
              visual cerdas dan jejak sirkular terukur.
            </p>
            <div className={styles.actions}>
              <a href="#katalog" className={styles.primaryButton}>
                <ShoppingBag size={18} /> Jelajahi Koleksi
              </a>
              <Link href="/items/new" className={styles.secondaryButton}>
                <CirclePlus size={18} /> Jual / Titip Sirkular
              </Link>
            </div>
          </div>
          <div className={styles.impact}>
            <div className={styles.impactHeader}>
              <span>
                <Recycle size={18} /> LIVE CIRCULAR IMPACT
              </span>
              <i className={styles.live} />
            </div>
            <p>
              Agregat kontribusi komunitas PakaiLagi secara aktual hari ini:
            </p>
            <div className={styles.metrics}>
              <div className={styles.metric}>
                <strong>14.820</strong>
                <span>Barang Tersalurkan</span>
              </div>
              <div className={styles.metric}>
                <strong>88%</strong>
                <span>Reuse Rate</span>
              </div>
              <div className={styles.metric}>
                <strong>12.4 Ton</strong>
                <span>CO₂e Tercegah</span>
              </div>
            </div>
            <div className={styles.progress}>
              <div className={styles.ring}>
                <b>88%</b>
              </div>
              <div>
                <strong>Target Bebas E-Waste Q3</strong>
                <p>1.280 item dialihkan dari pembuangan akhir pekan ini.</p>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className={styles.sectionTitle}>
            <div>
              <span className={styles.eyebrow}>Jalur Sirkular</span>
              <h2>Pilih Cara Bertransaksi</h2>
            </div>
            <div className={styles.filters}>
              {filters.map((item) => (
                <button
                  key={item.value}
                  className={`${styles.pill} ${filter === item.value ? styles.pillActive : ""}`}
                  onClick={() => setFilter(item.value)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
          <div className={styles.categories}>
            {categories.map(({ label, count, icon: Icon }) => (
              <button className={styles.category} key={label}>
                <span className={styles.categoryIcon}>
                  <Icon size={21} />
                </span>
                <span>
                  <strong>{label}</strong>
                  <small>{count}</small>
                </span>
              </button>
            ))}
          </div>
        </section>
        <section className={styles.education}>
          <div className={styles.educationIntro}>
            <span>
              <ShieldCheck />
            </span>
            <div>
              <h3>Mengenal Skor Kondisi PakaiLagi</h3>
              <p>
                Audit visi AI dan verifikasi manual menghasilkan skor yang
                transparan, bukan klaim sepihak.
              </p>
            </div>
          </div>
          <div className={styles.grades}>
            <div className={styles.grade}>
              <b>80 - 100</b>
              <span>Sangat Baik</span>
            </div>
            <div className={styles.grade}>
              <b>65 - 79</b>
              <span>Kondisi Baik</span>
            </div>
            <div className={styles.grade}>
              <b>45 - 64</b>
              <span>Cukup / Servis</span>
            </div>
          </div>
        </section>
        <div className={styles.catalogHeader} id="katalog">
          <div>
            <h2>Katalog Terverifikasi Terbaru</h2>
            <p>8 barang baru saja lolos pengujian kondisi.</p>
          </div>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="relevance">Rekomendasi Sirkular</option>
            <option value="score-desc">Skor Tertinggi</option>
            <option value="price-asc">Harga Terendah</option>
            <option value="price-desc">Harga Tertinggi</option>
          </select>
        </div>
        <div className={styles.grid}>
          {visible.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
        <section className={styles.cta}>
          <div>
            <span>EKOSISTEM SIRKULAR TERPERCAYA</span>
            <h3>Punya barang tak terpakai di rumah?</h3>
            <p>
              Unggah foto produk. AI PakaiLagi akan menganalisis kondisi dan
              menyarankan rute perputaran terbaik.
            </p>
          </div>
          <Link className={styles.secondaryButton} href="/items/new">
            <Leaf size={18} /> Audit Foto Kilat AI
          </Link>
        </section>
      </main>
      <MarketplaceFooter />
    </div>
  );
}
