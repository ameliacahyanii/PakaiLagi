import Link from "next/link";
import { Bell, Leaf, Search, Store, UserRound } from "lucide-react";
import styles from "./Marketplace.module.css";

export function MarketplaceHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.bar}>
        <Link className={styles.brand} href="/dashboard">
          <span className={styles.brandMark}>
            <Leaf size={19} />
          </span>
          PakaiLagi
        </Link>
        <label className={styles.search}>
          <Search size={19} />
          <input placeholder="Cari barang bekas berkualitas..." />
        </label>
        <nav className={styles.nav}>
          <Link href="/dashboard">Beranda/Katalog</Link>
          <Link href="/explore">Temukan</Link>
          <Link href="#">Status Pesanan</Link>
          <Link href="#">Dampak Sirkular</Link>
        </nav>
        <Link className={styles.sellerButton} href="/items/new">
          <Store size={17} /> Mode Penjual
        </Link>
        <Bell size={21} />
        <span className={styles.profile}>
          <UserRound size={18} />
        </span>
      </div>
    </header>
  );
}

export function MarketplaceFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div>
          <div className={styles.brand}>
            <span className={styles.brandMark}>
              <Leaf size={18} />
            </span>
            PakaiLagi
          </div>
          <p>
            Infrastruktur pasar sirkular berbasis transparansi data, pengujian
            kondisi terverifikasi, dan penilaian siklus hidup.
          </p>
        </div>
        <div>
          <h4>Eksplorasi Sirkular</h4>
          <a href="#">Katalog Elektronik Teruji</a>
          <a href="#">Tukar Tambah</a>
          <a href="#">Direktori Reparasi</a>
        </div>
        <div>
          <h4>Akuntabilitas</h4>
          <a href="#">Standar Inspeksi</a>
          <a href="#">Garansi Rekondisi</a>
          <a href="#">Rekening Bersama</a>
        </div>
        <div>
          <h4>Ekosistem</h4>
          <a href="#">Pusat Bantuan</a>
          <a href="#">Mitra Teknisi</a>
          <a href="#">Laporan Dampak</a>
        </div>
      </div>
    </footer>
  );
}
