"use client";
import Link from "next/link";
import {
  Bike,
  CheckCircle,
  Clock,
  Leaf,
  LockKeyhole,
  MessageCircle,
  PackageCheck,
  Printer,
  Search,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { useMemo, useState } from "react";
import { SellerShell } from "@/components/seller/SellerShell";
import { sellerOrders, SellerOrderStatus } from "@/data/seller-operations-data";
import styles from "@/components/seller/SellerOperations.module.css";
const money = (value: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
const tabs: [SellerOrderStatus | "all", string][] = [
  ["all", "Semua Pesanan"],
  ["processing", "Perlu Diproses & Kirim"],
  ["shipping", "Dalam Pengiriman EV"],
  ["testing", "Menunggu Konfirmasi"],
  ["completed", "Selesai"],
];
export default function SellerOrdersPage() {
  const [tab, setTab] = useState<SellerOrderStatus | "all">("processing");
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState("");
  const visible = useMemo(
    () =>
      sellerOrders.filter(
        (order) =>
          (tab === "all" || order.status === tab) &&
          `${order.id} ${order.product} ${order.buyer} ${order.passport}`
            .toLowerCase()
            .includes(search.toLowerCase()),
      ),
    [tab, search],
  );
  function notify(value: string) {
    setToast(value);
    setTimeout(() => setToast(""), 2400);
  }
  return (
    <SellerShell active="orders">
      <main className={styles.page}>
        <header className={styles.head}>
          <div>
            <h1>Manajemen Pesanan & Logistik Hijau</h1>
            <p>
              Pantau pesanan, kurir EV, Returnable Sleeve, dan pelepasan
              Circular Escrow.
            </p>
          </div>
          <div className={styles.actions}>
            <button
              className={styles.secondary}
              onClick={() => notify("Batch label reusable disiapkan.")}
            >
              <Printer size={17} />
              Cetak Batch Resi
            </button>
            <button
              className={styles.primary}
              onClick={() =>
                notify("Dispatcher logistik EV telah diberi notifikasi.")
              }
            >
              <Bike size={17} />
              Hubungi Dispatcher EV
            </button>
          </div>
        </header>
        <section className={styles.metrics}>
          {[
            {
              label: "Perlu Dikirim Hari Ini",
              value: "3 Pesanan",
              detail: "Rp11.450.000 • Prioritas Escrow",
              icon: Clock,
            },
            {
              label: "Dalam Perjalanan EV",
              value: "5 Paket",
              detail: "12,4 kg CO₂e dicegah",
              icon: Truck,
            },
            {
              label: "Sleeve Beredar",
              value: "8 Kemasan",
              detail: "100% proteksi deposit",
              icon: PackageCheck,
            },
            {
              label: "Escrow Siap Cair",
              value: "Rp6.850.000",
              detail: "Verifikasi otomatis 48 jam",
              icon: LockKeyhole,
            },
          ].map(({ label, value, detail, icon: Icon }) => (
            <article className={styles.metric} key={label}>
              <div className={styles.between}>
                <span>{label}</span>
                <Icon color="#005144" />
              </div>
              <strong>{value}</strong>
              <small>{detail}</small>
            </article>
          ))}
        </section>
        <nav className={styles.tabs}>
          {tabs.map(([id, label]) => (
            <button
              key={id}
              className={`${styles.tab} ${tab === id ? styles.tabActive : ""}`}
              onClick={() => setTab(id)}
            >
              {label}
            </button>
          ))}
        </nav>
        <section className={styles.toolbar}>
          <div
            style={{ display: "flex", alignItems: "center", gap: 8, flex: 1 }}
          >
            <Search size={18} />
            <input
              className={styles.search}
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Cari nomor pesanan, pembeli, atau paspor..."
            />
          </div>
          <select>
            <option>Semua Layanan Logistik</option>
            <option>Kurir Motor Listrik EV</option>
            <option>Circular Hub</option>
          </select>
          <select>
            <option>Batas Kirim Terdekat</option>
            <option>Escrow Tertinggi</option>
          </select>
        </section>
        <section className={styles.orders}>
          {visible.length === 0 && (
            <div className={styles.card}>
              <h3>Tidak ada pesanan</h3>
              <p>Ubah filter atau kata kunci pencarian.</p>
            </div>
          )}
          {visible.map((order) => (
            <article className={styles.orderCard} key={order.id}>
              <header className={styles.orderHeader}>
                <div>
                  <b>#{order.id}</b>{" "}
                  <span className={styles.muted}>• {order.createdAt}</span>{" "}
                  <span className={styles.badge}>{order.statusLabel}</span>
                </div>
                <div>
                  <small>
                    {order.status === "testing"
                      ? "Pelepasan Escrow"
                      : "Nilai Pesanan"}
                  </small>{" "}
                  <span className={styles.amount}>{money(order.amount)}</span>
                </div>
              </header>
              <div className={styles.orderBody}>
                <div className={styles.product}>
                  <img src={order.image} alt={order.product} />
                  <div className={styles.productInfo}>
                    <span className={styles.badge}>{order.passport}</span>
                    <h3>{order.product}</h3>
                    <small>
                      Pembeli: <b>{order.buyer}</b> • Trust {order.buyerScore}
                      /100
                    </small>
                    <small>{order.location}</small>
                  </div>
                </div>
                <div className={styles.logistics}>
                  <b>{order.logistics}</b>
                  {order.deadline && (
                    <span>
                      Batas penyerahan: <b>{order.deadline}</b>
                    </span>
                  )}
                  <div className={styles.progress}>
                    <i
                      style={{
                        width:
                          order.status === "processing"
                            ? "35%"
                            : order.status === "shipping"
                              ? "75%"
                              : "92%",
                      }}
                    />
                  </div>
                  <small>{order.sleeve}</small>
                </div>
                <div className={styles.orderActions}>
                  {order.status === "processing" ? (
                    <>
                      <Link
                        className={styles.primary}
                        href={`/seller/orders/${order.id}`}
                      >
                        <CheckCircle size={16} />
                        Proses & Serahkan
                      </Link>
                      <Link className={styles.secondary} href="/chat">
                        <MessageCircle size={16} />
                        Chat
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        className={styles.secondary}
                        href={`/seller/orders/${order.id}`}
                      >
                        Lihat Rincian
                      </Link>
                      <button
                        className={styles.secondary}
                        onClick={() =>
                          notify(
                            order.status === "shipping"
                              ? "Pelacakan EV dibuka."
                              : "Rincian Escrow dibuka.",
                          )
                        }
                      >
                        {order.status === "shipping"
                          ? "Lacak Live EV"
                          : "Detail Escrow"}
                      </button>
                    </>
                  )}
                </div>
              </div>
            </article>
          ))}
        </section>
        <section className={styles.bottomGrid}>
          <article className={styles.card}>
            <h2>Protokol Logistik Rendah Emisi</h2>
            {[
              "Masukkan barang ke Returnable Sleeve dan scan barcode",
              "Serahkan ke kurir motor listrik tanpa dokumen kertas",
              "Dapatkan poin sirkular saat sleeve kembali",
            ].map((item, index) => (
              <div className={styles.protocol} key={item}>
                <span className={styles.badge}>{index + 1}</span>
                <div>
                  <b>{item}</b>
                  <p className={styles.muted}>
                    Aktivitas tercatat pada Circular Ledger.
                  </p>
                </div>
              </div>
            ))}
          </article>
          <article className={styles.card}>
            <h2>Circular Escrow Vault</h2>
            <p className={styles.muted}>
              Dana pembeli diamankan selama transit dan masa uji 48 jam.
            </p>
            <div className={styles.financialGrid}>
              <div className={styles.financial}>
                <small>Saldo Tertahan</small>
                <strong>Rp12.400.000</strong>
                <span>8 pesanan aktif</span>
              </div>
              <div className={styles.financial}>
                <small>Siap Dicairkan</small>
                <strong>Rp6.850.000</strong>
                <span>3 pesanan terverifikasi</span>
              </div>
            </div>
            <div className={styles.protocol}>
              <ShieldCheck color="#2f8f68" />
              <div>
                <b>SLA Pengiriman 99,4%</b>
                <p>Eco-Seller Tier 1 memperoleh prioritas kurir EV.</p>
              </div>
            </div>
          </article>
        </section>
      </main>
      {toast && <div className={styles.toast}>{toast}</div>}
    </SellerShell>
  );
}
