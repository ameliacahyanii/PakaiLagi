import Link from "next/link";
import {
  ArrowLeft,
  BarChart3,
  Box,
  PlusCircle,
  Recycle,
  Truck,
} from "lucide-react";
import styles from "./SellerWorkspace.module.css";
const avatar =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAchsCmu8eSuRKWKbhu_hXW5WbD-aJbsbrVh-1s5JyQPL4323_w2JHI9rvuLQKsMYic2qaS9F1Zl6GJuLVQmi36BLOzHGaGBQXk4cjAVBE95ZvvlKOfJGxUQ7wur8k9c4vRDlkzJEByKQt_qBkc0GGC-wshDN_9O76pQPHhcNJIUEPXT0-_kNbxMMEmcOI2Rgb1xI4u3FiOWv8OsiVBUcfU_sJaFQx8wizYjGE67tsGXFc1K4wdflSx";
export function SellerShell({
  children,
  active = "dashboard",
}: {
  children: React.ReactNode;
  active?: "dashboard" | "inventory" | "orders" | "routes";
}) {
  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar}>
        <div className={styles.brand}>
          <Link href="/dashboard">PakaiLagi</Link>
          <span className={styles.sellerTag}>Seller</span>
        </div>
        <div className={styles.profile}>
          <img src={avatar} alt="Budi Santoso" className={styles.avatar} />
          <div>
            <b>Budi Santoso</b>
            <small>● Penjual Terverifikasi</small>
          </div>
        </div>
        <nav className={styles.nav}>
          <Link
            className={active === "dashboard" ? styles.active : ""}
            href="/seller/dashboard"
          >
            <BarChart3 size={18} />
            Ringkasan Toko
          </Link>
          <Link
            className={active === "inventory" ? styles.active : ""}
            href="/seller/inventory"
          >
            <Box size={18} />
            Inventaris & AI Audit
          </Link>
          <Link
            className={active === "orders" ? styles.active : ""}
            href="/seller/orders"
          >
            <Truck size={18} />
            Pesanan & Logistik
          </Link>
          <Link
            className={active === "routes" ? styles.active : ""}
            href="/seller/routes"
          >
            <Recycle size={18} />
            Rute Swap & Repair
          </Link>
        </nav>
        <Link href="/dashboard" className={styles.back}>
          <ArrowLeft size={16} /> Kembali ke Marketplace
        </Link>
      </aside>
      <div className={styles.workspace}>
        <header className={styles.topbar}>
          <b>Portal Penjual Berkelanjutan</b>
          <div className={styles.topActions}>
            <Link href="/seller/scan" className={styles.primary}>
              <PlusCircle size={17} />
              Tambah Listing Sirkular
            </Link>
          </div>
        </header>
        {children}
      </div>
    </div>
  );
}
