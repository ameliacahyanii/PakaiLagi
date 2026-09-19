"use client";
import Link from "next/link";
import {
  ArrowRight,
  Brain,
  CheckCircle,
  CloudCog,
  Eye,
  Filter,
  Leaf,
  ScanLine,
  Send,
  Store,
  Truck,
  TriangleAlert,
} from "lucide-react";
import { useMemo, useState } from "react";
import { SellerShell } from "@/components/seller/SellerShell";
import { inventoryItems, InventoryStatus } from "@/data/seller-workspace-data";
import styles from "@/components/seller/SellerWorkspace.module.css";
const money = (value: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
export default function SellerDashboard() {
  const [filter, setFilter] = useState<InventoryStatus | "all">("all");
  const visible = useMemo(
    () =>
      inventoryItems.filter(
        (item) => filter === "all" || item.status === filter,
      ),
    [filter],
  );
  return (
    <SellerShell>
      <main className={styles.content}>
        <div className={styles.pageHead}>
          <div>
            <h1>Selamat datang kembali, Budi!</h1>
            <p>Kelola inventaris sirkular dan pantau dampak lingkungan toko.</p>
          </div>
          <div className={styles.actions}>
            <button className={styles.secondary}>
              <Filter size={17} />
              Filter Laporan
            </button>
            <Link className={styles.primary} href="/seller/scan">
              <ScanLine size={17} />
              Scan Barang AI
            </Link>
          </div>
        </div>
        <section className={styles.metrics}>
          {[
            {
              label: "Listing Aktif",
              value: "8",
              foot: "3 menunggu pembeli",
              icon: Store,
            },
            {
              label: "Perlu Tindakan",
              value: "3",
              foot: "1 verifikasi inspeksi",
              icon: TriangleAlert,
            },
            {
              label: "Barang Tersalurkan",
              value: "24",
              foot: "18 jual • 4 swap • 2 donasi",
              icon: Send,
            },
            {
              label: "Reuse & Recovery",
              value: "91,5%",
              foot: "142 kg CO₂e dicegah",
              icon: Leaf,
            },
          ].map(({ label, value, foot, icon: Icon }) => (
            <div className={styles.metric} key={label}>
              <div className={styles.metricTop}>
                <span>{label}</span>
                <Icon color="#005144" />
              </div>
              <strong>{value}</strong>
              <div className={styles.metricFooter}>{foot}</div>
            </div>
          ))}
        </section>
        <section className={`${styles.card} ${styles.banner}`}>
          <div>
            <span className={styles.badge}>
              AI Quality Diagnostics • #AI-88391
            </span>
            <h2>Draf Analisis AI Siap Ditinjau</h2>
            <p>
              MacBook Air M1 2020 memperoleh skor 82. Periksa rute sirkular dan
              publikasikan.
            </p>
          </div>
          <div className={styles.actions}>
            <button className={styles.secondary}>Abaikan</button>
            <Link className={styles.primary} href="/seller/scan">
              Tinjau & Publikasikan <ArrowRight size={17} />
            </Link>
          </div>
        </section>
        <section>
          <div className={styles.tableHead}>
            <div>
              <h2>Inventaris Barang Terkini</h2>
              <span>{visible.length} item</span>
            </div>
            <div className={styles.filters}>
              {[
                { id: "all", label: "Semua" },
                { id: "shipping", label: "Perlu Tindakan" },
                { id: "active", label: "Aktif" },
                { id: "draft", label: "Draf" },
              ].map((item) => (
                <button
                  key={item.id}
                  className={filter === item.id ? styles.selected : ""}
                  onClick={() => setFilter(item.id as InventoryStatus | "all")}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Foto & Nama</th>
                  <th>Kategori</th>
                  <th>Jalur</th>
                  <th>Skor</th>
                  <th>Harga</th>
                  <th>Status</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {visible.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div className={styles.product}>
                        <img src={item.image} alt={item.name} />
                        <div>
                          <b>{item.name}</b>
                          <small>{item.note}</small>
                        </div>
                      </div>
                    </td>
                    <td>{item.category}</td>
                    <td>
                      <span className={styles.route}>{item.route}</span>
                    </td>
                    <td>
                      <span className={styles.score}>
                        {item.score} • {item.condition}
                      </span>
                    </td>
                    <td className={styles.price}>{money(item.price)}</td>
                    <td>
                      <span className={styles.status}>{item.statusLabel}</span>
                    </td>
                    <td>
                      <button className={styles.iconButton}>
                        <Eye size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <section className={styles.bottomGrid}>
          <div className={styles.card}>
            <div className={styles.between}>
              <h3>Jejak Karbon Dihindari</h3>
              <Leaf color="#005144" />
            </div>
            <strong>142,8 kg CO₂e</strong>
            <p>71% dari target tahunan 200 kg.</p>
            <div className={styles.progress}>
              <i style={{ width: "71%" }} />
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.between}>
              <h3>AI Inspector Engine</h3>
              <Brain color="#3478b8" />
            </div>
            <p>Model inspeksi fisik dan depresiasi berjalan real-time.</p>
            <b>98,4% Akurasi Penilaian</b>
          </div>
          <div className={styles.card}>
            <div className={styles.between}>
              <h3>Standar Kejujuran</h3>
              <CheckCircle color="#e5a93d" />
            </div>
            <p>Transparansi cacat fisik meningkatkan perlindungan transaksi.</p>
            <span className={styles.badge}>Status: Mitra Unggul</span>
          </div>
        </section>
      </main>
    </SellerShell>
  );
}
