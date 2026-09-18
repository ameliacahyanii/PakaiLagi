"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Leaf,
  Search,
  Sparkles,
  Weight,
} from "lucide-react";
import { useMemo, useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { Item, ItemCard } from "@/components/ui/ItemCard";

const items: Item[] = [
  {
    id: "1",
    title: "Kipas meja Cosmos",
    category: "Elektronik",
    action: "Donasi",
    location: "Sleman, DIY",
    time: "2 jam lalu",
    accent: "visual-sage",
    glyph: "◌",
  },
  {
    id: "2",
    title: "Kursi kerja minimalis",
    category: "Furnitur",
    action: "Jual",
    location: "Jakarta Selatan",
    time: "5 jam lalu",
    accent: "visual-sky",
    glyph: "▱",
  },
  {
    id: "3",
    title: "Set buku kuliah semester 2",
    category: "Belajar",
    action: "Tukar",
    location: "Bandung",
    time: "Kemarin",
    accent: "visual-sand",
    glyph: "▤",
  },
];
const categories = ["Semua", "Elektronik", "Furnitur", "Belajar", "Tekstil"];

export default function DashboardPage() {
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [query, setQuery] = useState("");
  const filteredItems = useMemo(
    () =>
      items.filter(
        (item) =>
          (selectedCategory === "Semua" ||
            item.category === selectedCategory) &&
          item.title.toLowerCase().includes(query.toLowerCase()),
      ),
    [query, selectedCategory],
  );

  return (
    <AppShell>
      <main className="dashboard-page">
        <motion.section className="welcome-row" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
          <div>
            <p className="eyebrow">Ruang kerjamu</p>
            <h1>
              Apa yang mau kamu lanjutkan hari ini? <span>✦</span>
            </h1>
            <p className="page-subtitle">
              Cek barangmu atau cari sesuatu dari komunitas sekitar.
            </p>
          </div>
          <Link href="/items/new" className="button button-primary">
            <Sparkles size={17} /> Analisis barang
          </Link>
        </motion.section>
        <motion.section className="hero-panel" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08, duration: 0.5 }}>
          <div className="hero-copy">
            <div className="hero-icon">
              <Leaf size={19} />
            </div>
            <p className="eyebrow">Dari kamar ke tangan berikutnya</p>
            <h2>
              Barang yang tidak terpakai
              <br />
              <em>belum tentu kehilangan arti.</em>
            </h2>
            <p>
              Punya barang yang sudah jarang dipakai? Foto dulu, ceritakan
              kondisinya, lalu pilih langkah yang paling masuk akal.
            </p>
            <Link href="/items/new" className="button button-dark">
              Tambah barang <ArrowRight size={17} />
            </Link>
          </div>
          <div className="hero-stat">
            <span className="stat-number">12</span>
            <span>
              barang berhasil
              <br />
              digunakan kembali
            </span>
            <div className="stat-line">
              <i />
              <i />
              <i />
              <i />
              <i />
            </div>
          </div>
        </motion.section>
        <motion.section className="stat-grid" aria-label="Ringkasan dampak" initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.08 } } }}>
          <motion.div className="stat-card" variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}>
            <span className="stat-card-icon stat-green">
              <Leaf size={17} />
            </span>
            <div>
              <strong>8</strong>
              <span>barang dialihkan</span>
            </div>
            <small>+3 bulan ini</small>
          </motion.div>
          <motion.div className="stat-card" variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}>
            <span className="stat-card-icon stat-yellow">
              <Weight size={17} />
            </span>
            <div>
              <strong>24.6 kg</strong>
              <span>berat terselamatkan</span>
            </div>
            <small>+8.2 kg bulan ini</small>
          </motion.div>
          <motion.div className="stat-card" variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}>
            <span className="stat-card-icon stat-blue">
              <Check size={17} />
            </span>
            <div>
              <strong>92%</strong>
              <span>transaksi selesai</span>
            </div>
            <small>di atas rata-rata</small>
          </motion.div>
        </motion.section>
        <section className="section-heading">
          <div>
            <p className="eyebrow">Komunitas sekitar</p>
            <h2>Barang yang sedang mencari pemilik baru</h2>
          </div>
          <Link href="/explore" className="text-link">
            Lihat semua <ArrowRight size={16} />
          </Link>
        </section>
        <section className="explore-toolbar">
          <div className="category-tabs">
            {categories.map((category) => (
              <button
                key={category}
                className={selectedCategory === category ? "active" : ""}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
          <label className="search-box">
            <Search size={17} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Cari barang..."
              aria-label="Cari barang"
            />
          </label>
        </section>
        <section className="item-grid">
          {filteredItems.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </section>
        {filteredItems.length === 0 && (
          <div className="empty-state">
            Belum ada barang yang cocok dengan pencarianmu.
          </div>
        )}
        <section className="how-it-works">
          <div>
            <p className="eyebrow">Cara kerja PakaiLagi</p>
            <h2>
              Satu barang, satu langkah
              <br />
              <em>menuju siklus berikutnya.</em>
            </h2>
          </div>
          <div className="steps">
            <div>
              <span>01</span>
              <strong>Foto barangmu</strong>
              <p>AI membantu mengenali jenis dan kondisi visual.</p>
            </div>
            <div>
              <span>02</span>
              <strong>Jawab inspeksi singkat</strong>
              <p>Jawabanmu membuat rekomendasi lebih bertanggung jawab.</p>
            </div>
            <div>
              <span>03</span>
              <strong>Tentukan langkah terbaik</strong>
              <p>Jual, tukar, donasi, atau perbaiki dengan yakin.</p>
            </div>
          </div>
        </section>
      </main>
    </AppShell>
  );
}
