"use client";
import Link from "next/link";
import {
  CheckSquare,
  Download,
  Grid3X3,
  Leaf,
  List,
  PackageCheck,
  ScanLine,
  Search,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { useMemo, useState } from "react";
import { SellerShell } from "@/components/seller/SellerShell";
import { sellerInventory, InventoryState } from "@/data/seller-inventory-data";
import styles from "@/components/seller/SellerInventory.module.css";
const money = (value: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
type Filter = InventoryState | "all";
export default function SellerInventoryPage() {
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [grid, setGrid] = useState(false);
  const [toast, setToast] = useState("");
  const visible = useMemo(
    () =>
      sellerInventory.filter(
        (item) =>
          (filter === "all" || item.state === filter) &&
          `${item.name} ${item.category} ${item.passport}`
            .toLowerCase()
            .includes(query.toLowerCase()),
      ),
    [filter, query],
  );
  function notify(v: string) {
    setToast(v);
    setTimeout(() => setToast(""), 2300);
  }
  function toggle(id: string) {
    setSelected((v) =>
      v.includes(id) ? v.filter((x) => x !== id) : [...v, id],
    );
  }
  function action(itemId: string, action: string) {
    if (action === "Kirim Sekarang")
      location.href = `/seller/orders/ORDER-SIM-88219`;
    else if (action === "Lanjutkan Draf")
      location.href = "/seller/review/DRAFT-AI-8809";
    else notify(`${action} untuk ${itemId} dibuka.`);
  }
  return (
    <SellerShell active="inventory">
      <main className={styles.page}>
        <header className={styles.head}>
          <div>
            <span className={styles.badge}>
              <ShieldCheck size={14} />
              Transparansi Sirkular Terverifikasi • SL-JKT-8821
            </span>
            <h1>Manajemen Inventaris & Paspor Sirkular</h1>
            <p>
              Kelola listing, skor AI, paspor digital, transaksi Escrow, serta
              riwayat penyaluran barang.
            </p>
          </div>
          <div className={styles.actions}>
            <button
              className={styles.secondary}
              onClick={() => notify("Laporan dampak disiapkan.")}
            >
              <Download size={17} />
              Ekspor Dampak
            </button>
            <button
              className={styles.secondary}
              onClick={() => notify("Mode batch diaktifkan.")}
            >
              <CheckSquare size={17} />
              Kelola Batch
            </button>
            <Link className={styles.primary} href="/seller/scan">
              <ScanLine size={17} />
              Pindai Barang Baru
            </Link>
          </div>
        </header>
        <section className={styles.metrics}>
          {[
            {
              label: "Total Barang Aktif",
              value: "12 Unit",
              detail: "Nilai inventaris Rp28.450.000",
              icon: PackageCheck,
            },
            {
              label: "Perlu Tindakan",
              value: "3 Pesanan",
              detail: "Order terdekat Sony A6000",
              icon: Truck,
            },
            {
              label: "Tersalurkan & Terjual",
              value: "48 Produk",
              detail: "Tingkat sirkularitas 94,2%",
              icon: Leaf,
            },
            {
              label: "Pencegahan Sampah",
              value: "38,6 kg",
              detail: "1.420 kg CO₂e dicegah",
              icon: ShieldCheck,
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
          {(
            [
              ["all", "Semua Barang"],
              ["active", "Aktif Dijual"],
              ["action", "Perlu Tindakan"],
              ["completed", "Terjual & Selesai"],
              ["draft", "Draf & Audit AI"],
              ["repair", "Reparasi"],
            ] as [Filter, string][]
          ).map(([id, label]) => (
            <button
              key={id}
              className={`${styles.tab} ${filter === id ? styles.tabActive : ""}`}
              onClick={() => setFilter(id)}
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
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari nama barang, kategori, atau ID paspor..."
            />
          </div>
          <select>
            <option>Semua Kategori</option>
            <option>Kamera & Optik</option>
            <option>Gadget & Tablet</option>
            <option>Audio</option>
          </select>
          <select>
            <option>Semua Skor AI</option>
            <option>85 - 100</option>
            <option>70 - 84</option>
            <option>Di bawah 70</option>
          </select>
          <div className={styles.actions}>
            <button
              className={`${styles.icon} ${!grid ? styles.tabActive : ""}`}
              onClick={() => setGrid(false)}
            >
              <List size={18} />
            </button>
            <button
              className={`${styles.icon} ${grid ? styles.tabActive : ""}`}
              onClick={() => setGrid(true)}
            >
              <Grid3X3 size={18} />
            </button>
          </div>
        </section>
        <section className={styles.tableCard}>
          <div className={styles.quickBar}>
            <label>
              <input
                type="checkbox"
                checked={
                  visible.length > 0 && selected.length === visible.length
                }
                onChange={(e) =>
                  setSelected(
                    e.target.checked ? visible.map((item) => item.id) : [],
                  )
                }
              />{" "}
              Pilih semua halaman
            </label>
            <span>{selected.length} barang terpilih</span>
            <div className={styles.actions}>
              <button
                className={styles.secondary}
                onClick={() => notify("Rute massal siap diubah.")}
              >
                Ubah Rute
              </button>
              <button
                className={styles.secondary}
                onClick={() => notify("Tag QR Paspor siap dicetak.")}
              >
                Cetak QR Paspor
              </button>
            </div>
          </div>
          {grid ? (
            <div className={styles.gridView}>
              {visible.map((item) => (
                <article className={styles.gridCard} key={item.id}>
                  <img src={item.image} alt={item.name} />
                  <span className={styles.badge}>{item.passport}</span>
                  <h3>{item.name}</h3>
                  <p>
                    {money(item.price)} • AI {item.score}/100
                  </p>
                  <p>
                    <span className={styles.route}>{item.route}</span>{" "}
                    <span className={styles.status}>{item.status}</span>
                  </p>
                  <button
                    className={styles.action}
                    onClick={() => action(item.id, item.action)}
                  >
                    {item.action}
                  </button>
                </article>
              ))}
            </div>
          ) : (
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th></th>
                    <th>Produk & Paspor</th>
                    <th>Nilai</th>
                    <th>Audit AI</th>
                    <th>Jalur</th>
                    <th>Status</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {visible.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <input
                          type="checkbox"
                          checked={selected.includes(item.id)}
                          onChange={() => toggle(item.id)}
                        />
                      </td>
                      <td>
                        <div className={styles.product}>
                          <img src={item.image} alt={item.name} />
                          <div className={styles.productInfo}>
                            <b>{item.name}</b>
                            <small>
                              {item.category} • {item.passport}
                            </small>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className={styles.price}>{money(item.price)}</div>
                        <small>{item.detail}</small>
                      </td>
                      <td>
                        <span className={styles.score}>
                          {item.score}/100 • {item.scoreLabel}
                        </span>
                      </td>
                      <td>
                        <span className={styles.route}>{item.route}</span>
                      </td>
                      <td>
                        <span className={styles.status}>{item.status}</span>
                      </td>
                      <td>
                        <button
                          className={styles.action}
                          onClick={() => action(item.id, item.action)}
                        >
                          {item.action}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <footer className={`${styles.footer} ${styles.between}`}>
            <span>Menampilkan {visible.length} dari 63 barang terdaftar</span>
            <div className={styles.pagination}>
              <button className={styles.active}>1</button>
              <button>2</button>
              <button>3</button>
              <button>9</button>
            </div>
          </footer>
        </section>
        <aside className={styles.health}>
          <div>
            <h3>Kesehatan Inventaris Sangat Tinggi • 96%</h3>
            <p>
              Skor AI dan deskripsi objektif membantu memangkas retur serta
              menjaga Eco-Seller Tier 1.
            </p>
          </div>
          <button
            className={styles.secondary}
            onClick={() => notify("Metrik sirkular dibuka.")}
          >
            Pelajari Metrik
          </button>
        </aside>
      </main>
      {toast && <div className={styles.toast}>{toast}</div>}
    </SellerShell>
  );
}
