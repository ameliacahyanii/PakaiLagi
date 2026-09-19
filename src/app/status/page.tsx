"use client";
import {
  Check,
  CheckCircle,
  Clock3,
  Download,
  FileCheck2,
  History,
  Leaf,
  LockKeyhole,
  MapPin,
  MessageCircle,
  PackageCheck,
  RotateCw,
  ShieldCheck,
  ShoppingBag,
  Star,
  Store,
  Truck,
} from "lucide-react";
import { useState } from "react";
import {
  MarketplaceFooter,
  MarketplaceHeader,
} from "@/components/marketplace/MarketplaceShell";
import styles from "@/components/transaction/Transaction.module.css";

const productImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCvkJ0IRry4SchIUAhqu5oHBgrwtzVxdclvxVOlt1YLpaTxzZ3JFZDhq6Fc4mX5w3C-L1Jxxq_FJE11tO1Lp5EG-TZibBRFf7s_0kMd9MQm5NdvRr0rc7xq7ls4w-CMrX696GSe1SlaiRctyHjRbVpwAS7v2h1LvX7XxBG8Yr2qY52tER2RASTkzJgcSsG1FIvbvNzZn9kc8OwqU1PLlNhSSLRCc-uV1YCD08IrW3FglsI1TPpu0moe";
const steps = [
  {
    name: "Pembayaran Selesai",
    meta: "19 Sep 2026 • 14:35",
    status: "done",
    icon: Check,
  },
  {
    name: "Penyiapan & Audit",
    meta: "Sedang berjalan",
    status: "active",
    icon: RotateCw,
  },
  {
    name: "Pengiriman Sirkular",
    meta: "Hub Tebet",
    status: "pending",
    icon: Truck,
  },
  {
    name: "Uji Mandiri 48 Jam",
    meta: "Verifikasi skor 88",
    status: "pending",
    icon: FileCheck2,
  },
  {
    name: "Selesai & Escrow Cair",
    meta: "Tahap akhir",
    status: "pending",
    icon: LockKeyhole,
  },
];
const logs = [
  {
    time: "14:35",
    title: "Pembayaran Virtual Account Diterima",
    text: "Sandbox memvalidasi pembayaran simulasi Rp4.500.000.",
  },
  {
    time: "14:36",
    title: "Circular Escrow Mengunci Dana",
    text: "Dana dummy ditahan hingga konfirmasi pembeli atau masa uji selesai.",
  },
  {
    time: "14:40",
    title: "Penjual Mengonfirmasi Pesanan",
    text: "Rian Pratama menyetujui jadwal serah terima di Hub Tebet.",
  },
  {
    time: "15:00",
    title: "Pengemasan Zero-Waste Berjalan",
    text: "Kamera masuk ke padded sleeve returnable #SWAP-BAG-092.",
  },
];

export default function StatusPage() {
  const [invoice, setInvoice] = useState(false);
  function downloadInvoice() {
    setInvoice(true);
    setTimeout(() => setInvoice(false), 1200);
  }
  return (
    <div className={styles.page}>
      <MarketplaceHeader />
      <main className={styles.main}>
        <div className={styles.context}>
          <div className={styles.row}>
            <span>Beranda</span>
            <span>›</span>
            <span>Pesanan Saya</span>
            <b>#ORDER-SIM-88219</b>
          </div>
          <span className={styles.badge}>● Live Escrow Active</span>
        </div>
        <section className={styles.banner}>
          <div className={styles.statusLead}>
            <div className={styles.statusIcon}>
              <CheckCircle size={28} />
            </div>
            <div>
              <span className={styles.badge}>
                Pembayaran Diterima • Rp4.500.000
              </span>
              <h1>Pesanan Sedang Diproses & Diaudit Penjual</h1>
              <p>
                Pembayaran simulasi tercatat. Penjual menyiapkan unit dan
                verifikasi fisik sebelum serah terima zero-waste.
              </p>
            </div>
          </div>
          <div className={styles.row}>
            <button className={styles.button}>
              <MessageCircle size={17} /> Hubungi Penjual
            </button>
            <button
              className={`${styles.secondary} ${styles.invoiceState}`}
              onClick={downloadInvoice}
            >
              {invoice ? <RotateCw size={17} /> : <Download size={17} />}{" "}
              {invoice ? "Membuat..." : "Invoice Simulasi"}
            </button>
          </div>
        </section>
        <section className={styles.card}>
          <div className={styles.between}>
            <h2>Tahapan Transaksi Sirkular</h2>
            <span className={styles.badge}>
              <ShieldCheck size={15} /> Escrow Terproteksi
            </span>
          </div>
          <div className={styles.tracker}>
            {steps.map(({ name, meta, status, icon: Icon }) => (
              <div
                key={name}
                className={`${styles.trackStep} ${status === "done" ? styles.trackDone : ""} ${status === "active" ? styles.trackActive : ""}`}
              >
                <div className={styles.trackDot}>
                  <Icon size={17} />
                </div>
                <b>{name}</b>
                <small>{meta}</small>
              </div>
            ))}
          </div>
        </section>
        <div className={styles.grid}>
          <div className={styles.column}>
            <section className={styles.card}>
              <div className={styles.between}>
                <h2>Rincian Barang & Paspor Sirkular</h2>
                <span className={styles.badge}>#PASSPORT-ID-SNY-9921</span>
              </div>
              <div className={styles.passportProduct}>
                <img src={productImage} alt="Sony Alpha A6000" />
                <div>
                  <span className={styles.badge}>Skor AI 88/100</span>
                  <h2>Sony Alpha A6000 Kit 16-50mm OSS</h2>
                  <div className={styles.price}>Rp4.500.000</div>
                  <p className={styles.muted}>
                    Shutter 8.450 • Garansi Fisik 48 Jam • Penjual Rian Pratama
                    ★ 4.9
                  </p>
                </div>
              </div>
              <div className={styles.diagnostics}>
                <div className={styles.diagnostic}>
                  <span>Optik & Kaca Lensa</span>
                  <strong>96% Bersih</strong>
                  <small>Bebas jamur</small>
                </div>
                <div className={styles.diagnostic}>
                  <span>Sensor CMOS</span>
                  <strong>100% Bebas Cacat</strong>
                  <small>No dead pixel</small>
                </div>
                <div className={styles.diagnostic}>
                  <span>Bodi & Ergonomi</span>
                  <strong>84% Minor Scuff</strong>
                  <small>Goresan wajar</small>
                </div>
              </div>
            </section>
            <section className={styles.card}>
              <div className={styles.between}>
                <h2>Rute Pengiriman & Serah Terima</h2>
                <span className={styles.badge}>
                  <Leaf size={14} /> Zero-Waste Returnable Tote
                </span>
              </div>
              <div className={styles.impact}>
                <div className={styles.impactBox}>
                  <MapPin color="#005144" />
                  <strong>Circular Hub Tebet</strong>
                  <span>Pintu Barat Transit Hub • 16.30-18.00 WIB</span>
                </div>
                <div className={styles.impactBox}>
                  <Truck color="#005144" />
                  <strong>Hendra Wijaya</strong>
                  <span>Motor Listrik #EV-JKT-04</span>
                </div>
              </div>
              <div className={styles.notice}>
                <PackageCheck size={20} />
                <span>
                  Unit dibungkus padded sleeve daur ulang dan wajib dikembalikan
                  kepada kurir.
                </span>
              </div>
              <div className={styles.map}>
                <MapPin /> Lokasi Hub: Stasiun Tebet • Siap pukul 16.30
              </div>
            </section>
            <section className={styles.card}>
              <div className={styles.titleRow}>
                <History color="#005144" />
                <h2>Log Aktivitas Pesanan Terverifikasi</h2>
              </div>
              <div className={styles.log}>
                {logs.map((log, index) => (
                  <div className={styles.logItem} key={log.time}>
                    <b>{log.time}</b>
                    <span className={styles.logIcon}>
                      {index === logs.length - 1 ? (
                        <Clock3 size={13} />
                      ) : (
                        <Check size={13} />
                      )}
                    </span>
                    <div>
                      <strong>{log.title}</strong>
                      <p>{log.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
          <aside className={`${styles.column} ${styles.sticky}`}>
            <section className={styles.card}>
              <div className={styles.between}>
                <h2>Circular Escrow</h2>
                <span className={styles.badge}>TERKUNCI AMAN</span>
              </div>
              <div className={styles.escrow}>
                <span>Nominal Escrow</span>
                <div className={styles.price}>Rp4.500.000</div>
                <b>100% dilindungi kebijakan retur</b>
              </div>
              <div className={styles.notice}>
                <LockKeyhole size={19} /> Dana tidak diteruskan sebelum uji
                mandiri 48 jam selesai.
              </div>
              <div className={styles.notice}>
                <ShieldCheck size={19} /> Ajukan komplain jika kondisi tidak
                sesuai skor AI.
              </div>
            </section>
            <section className={styles.card}>
              <h3>Rincian Transaksi Simulasi</h3>
              <div className={styles.summary}>
                <div className={styles.summaryLine}>
                  <span>Harga Kesepakatan</span>
                  <b>Rp4.500.000</b>
                </div>
                <div className={styles.summaryLine}>
                  <span>Ongkir Hub</span>
                  <b>Gratis</b>
                </div>
                <div className={styles.summaryLine}>
                  <span>Escrow & Asuransi</span>
                  <b>Gratis</b>
                </div>
                <div className={styles.total}>
                  <span>Total</span>
                  <strong>Rp4.500.000</strong>
                </div>
                <small className={styles.muted}>
                  BCA Virtual Account Sandbox • #TRX-2026-99120
                </small>
              </div>
            </section>
            <section className={styles.card}>
              <h3>Dampak Sirkular Anda</h3>
              <div className={styles.impact}>
                <div className={styles.impactBox}>
                  <strong>420 g</strong>
                  <span>E-waste dihindari</span>
                </div>
                <div className={styles.impactBox}>
                  <strong>18,4 kg</strong>
                  <span>CO₂e dicegah</span>
                </div>
              </div>
              <div className={styles.notice}>
                <Leaf size={18} /> +45 poin setelah masa inspeksi selesai.
              </div>
            </section>
            <button className={styles.secondary}>
              <FileCheck2 size={18} /> Panduan Inspeksi 48 Jam
            </button>
          </aside>
        </div>
      </main>
      <MarketplaceFooter />
    </div>
  );
}
