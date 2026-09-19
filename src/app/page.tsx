"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Camera,
  CircleCheck,
  Leaf,
  Recycle,
  Sparkles,
} from "lucide-react";

const reveal = { hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0 } };
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

export default function LandingPage() {
  return (
    <main className="landing-page">
      <nav className="landing-nav">
        <Link href="/" className="brand">
          <span className="brand-mark">
            <Leaf size={18} />
          </span>
          <span>PakaiLagi</span>
        </Link>
        <div className="landing-nav-links">
          <a href="#cara-kerja">Cara kerja</a>
          <a href="#dampak">Dampak</a>
          <Link href="/auth" className="button button-outline">
            Masuk
          </Link>
        </div>
      </nav>
      <motion.section
        className="landing-hero"
        initial="hidden"
        animate="visible"
        variants={stagger}
      >
        <motion.div className="landing-hero-copy" variants={reveal}>
          <p className="eyebrow">Untuk barang kos, rumah, dan komunitasmu</p>
          <h1>
            Jangan buru-buru membuang <em>yang masih berarti.</em>
          </h1>
          <p className="landing-lead">
            Kipas yang masih menyala, buku yang sudah selesai dipakai, atau
            kursi yang tidak muat di rumah baru. Temukan orang yang sedang
            membutuhkannya sebelum barang itu berakhir di tempat sampah.
          </p>
          <div className="landing-actions">
            <Link href="/auth" className="button button-primary">
              Mulai perjalanan <ArrowRight size={17} />
            </Link>
            <Link href="#cara-kerja" className="button button-quiet">
              Lihat cara kerja
            </Link>
          </div>
          <div className="landing-trust">
            <span>
              <CircleCheck size={15} /> Transparan
            </span>
            <span>
              <CircleCheck size={15} /> Berbasis komunitas
            </span>
            <span>
              <CircleCheck size={15} /> Lebih bertanggung jawab
            </span>
          </div>
        </motion.div>
        <motion.div className="landing-orbit" variants={reveal}>
          <div className="orbit-center">
            <Leaf size={39} />
          </div>
          <div className="orbit-object orbit-chair" aria-hidden="true">
            <span />
          </div>
          <div className="orbit-object orbit-box" aria-hidden="true">
            <span />
          </div>
          <div className="orbit-item orbit-one">
            <Camera size={19} />
            <span>Foto</span>
          </div>
          <div className="orbit-item orbit-two">
            <Sparkles size={19} />
            <span>Cek kondisi</span>
          </div>
          <div className="orbit-item orbit-three">
            <Recycle size={19} />
            <span>Putar lagi</span>
          </div>
        </motion.div>
      </motion.section>
      <motion.section
        className="landing-proof"
        id="dampak"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        variants={stagger}
      >
        <motion.div variants={reveal}>
          <strong>12</strong>
          <span>
            barang sudah
            <br />
            mendapat langkah baru
          </span>
        </motion.div>
        <motion.div variants={reveal}>
          <strong>24.6 kg</strong>
          <span>
            material tercatat
            <br />
            dalam siklus
          </span>
        </motion.div>
        <motion.div variants={reveal}>
          <strong>3</strong>
          <span>
            jalur pemanfaatan
            <br />
            yang tersedia
          </span>
        </motion.div>
      </motion.section>
      <motion.section
        className="landing-section"
        id="cara-kerja"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={stagger}
      >
        <div className="landing-section-heading">
          <p className="eyebrow">Dari tidak terpakai</p>
          <h2>
            Berpindah tangan
            <br />
            <em>lagi dan lagi.</em>
          </h2>
        </div>
        <motion.div className="landing-steps" variants={stagger}>
          <motion.div variants={reveal}>
            <span>01</span>
            <Camera size={22} />
            <h3>Foto barangmu</h3>
            <p>Ceritakan barangnya dengan foto dan detail yang jujur.</p>
          </motion.div>
          <motion.div variants={reveal}>
            <span>02</span>
            <Sparkles size={22} />
            <h3>Pahami kondisinya</h3>
            <p>
              Jawab beberapa pertanyaan supaya orang berikutnya tahu kondisinya.
            </p>
          </motion.div>
          <motion.div variants={reveal}>
            <span>03</span>
            <Recycle size={22} />
            <h3>Pilih langkah terbaik</h3>
            <p>Jual, tukar, donasi, perbaiki, atau simpan untuk suku cadang.</p>
          </motion.div>
        </motion.div>
      </motion.section>
      <motion.section
        className="landing-categories"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={stagger}
      >
        <motion.div className="landing-section-heading" variants={reveal}>
          <p className="eyebrow">Yang biasa berpindah tangan</p>
          <h2>
            Mulai dari barang
            <br />
            <em>sehari-hari.</em>
          </h2>
        </motion.div>
        <motion.div className="category-list" variants={stagger}>
          <motion.div variants={reveal}>
            <strong>01</strong>
            <span>Elektronik kecil</span>
            <small>Kipas, blender, rice cooker</small>
          </motion.div>
          <motion.div variants={reveal}>
            <strong>02</strong>
            <span>Furnitur kos</span>
            <small>Kursi, rak, meja belajar</small>
          </motion.div>
          <motion.div variants={reveal}>
            <strong>03</strong>
            <span>Perlengkapan belajar</span>
            <small>Buku, tas, alat praktikum</small>
          </motion.div>
          <motion.div variants={reveal}>
            <strong>04</strong>
            <span>Tekstil rumah</span>
            <small>Gorden, seprai, kain</small>
          </motion.div>
        </motion.div>
      </motion.section>
      <section className="landing-cta">
        <div>
          <p className="eyebrow">Satu barang adalah awal</p>
          <h2>
            Siap menemukan
            <br />
            <em>langkah berikutnya?</em>
          </h2>
        </div>
        <Link href="/auth" className="button button-dark">
          Buat akun gratis <ArrowRight size={17} />
        </Link>
      </section>
      <footer className="landing-footer">
        <span>© 2026 PakaiLagi</span>
        <span>Kenali. Alihkan. Lanjutkan.</span>
      </footer>
    </main>
  );
}
