"use client";
import Link from "next/link";
import {
  BadgeCheck,
  CheckCircle,
  ChevronRight,
  CloudCog,
  Edit3,
  FileDown,
  Gift,
  Handshake,
  Heart,
  Leaf,
  LockKeyhole,
  MessageCircle,
  PackageCheck,
  Recycle,
  Settings,
  ShieldCheck,
  Star,
  Timer,
  Truck,
  Verified,
  Wrench,
} from "lucide-react";
import { useState } from "react";
import {
  MarketplaceFooter,
  MarketplaceHeader,
} from "@/components/marketplace/MarketplaceShell";
import { userOrders } from "@/data/profile-data";
import styles from "@/components/profile/Profile.module.css";

const avatar =
  "https://lh3.googleusercontent.com/aida/AEtjO1VsL4Uy_rEEcCiUaFltDZ333A5shhHFn1AMYQlnQL7MY5gYE-FXSOTr1XLOlZvCgaTUZaXapoHq0ddHfNn_HEDVz9lCPOZIr4uPfaDkOnkEd4esTncIF0nriXO_O5_vQyPqwlvzmL1X-04oTJYQP89b6hXh18mNNJys7neklPchpkYUgyX2qlZDglHLGdo8GitoIpT3CtBh8tlmbTk8kDIBWSGWagZepNCFHMhNQg4k3wa4-IDdnd7M4Q";
const achievements = [
  {
    icon: Leaf,
    title: "Pionir Zero Waste",
    text: "Mencegah lebih dari 25 kg emisi",
  },
  { icon: Handshake, title: "Negosiator Adil", text: "Tanpa sengketa escrow" },
  {
    icon: Timer,
    title: "Verifikator Cepat",
    text: "Konfirmasi rata-rata di bawah 6 jam",
  },
  {
    icon: Wrench,
    title: "Penyelamat Elektronik",
    text: "Memperpanjang usia 4 perangkat",
  },
  {
    icon: Truck,
    title: "Pengadopsi Kurir EV",
    text: "100% pengiriman rendah emisi",
  },
];

export default function UserProfilePage() {
  const [tab, setTab] = useState("activity");
  const [toast, setToast] = useState("");
  function notify(message: string) {
    setToast(message);
    setTimeout(() => setToast(""), 2500);
  }
  return (
    <div className={styles.page}>
      <MarketplaceHeader />
      <main className={`${styles.container} ${styles.main}`}>
        <section className={`${styles.card} ${styles.profileHero}`}>
          <div className={styles.profileIdentity}>
            <img
              className={styles.userAvatar}
              src={avatar}
              alt="Budi Santoso"
            />
            <div>
              <div className={styles.badgeRow}>
                <h1>Budi Santoso</h1>
                <span className={styles.badge}>
                  <ShieldCheck size={14} /> Pembeli Terverifikasi KTP & AI
                </span>
              </div>
              <div className={styles.meta}>
                <span>Tebet, Jakarta Selatan</span>
                <span>• Bergabung Maret 2024</span>
                <span>• Trust Index 99,4%</span>
              </div>
              <div>
                <div className={styles.priceRow}>
                  <b>Eco-Citizen Tier 2</b>
                  <small>680 / 1.000 XP ke Tier 3</small>
                </div>
                <div className={styles.progress}>
                  <i />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.actions}>
            <Link className={styles.secondary} href="/settings">
              <Edit3 size={17} /> Edit Profil
            </Link>
            <Link
              className={styles.iconButton}
              href="/settings"
              aria-label="Pengaturan"
            >
              <Settings size={18} />
            </Link>
            <Link className={styles.primary} href="/sellers/rian-pratama">
              Buka Portal Penjual
            </Link>
          </div>
        </section>
        <section>
          <div className={styles.impactHead}>
            <div className={styles.badgeRow}>
              <h2>Paspor Dampak Sirkular Pribadi</h2>
              <span className={styles.badge}>Buku Besar Terbuka</span>
            </div>
            <small>Audit terakhir: Hari ini, 14.10 WIB</small>
          </div>
          <div className={styles.impactGrid}>
            <div className={styles.impactCard}>
              <small>Jejak Emisi Dicegah</small>
              <strong>38,6 kg CO₂e</strong>
              <span>Setara menanam 3 pohon</span>
            </div>
            <div className={styles.impactCard}>
              <small>Dialihkan dari TPA</small>
              <strong>4 Perangkat</strong>
              <span>Elektronik aktif kembali</span>
            </div>
            <div className={styles.impactCard}>
              <small>Poin Sirkular Aktif</small>
              <strong>850 Pts</strong>
              <span>Tukar voucher logistik EV</span>
            </div>
            <div className={styles.impactCard}>
              <small>Escrow Selesai</small>
              <strong>12 Pesanan</strong>
              <span>100% verifikasi sukses</span>
            </div>
          </div>
        </section>
        <div className={styles.split}>
          <section className={styles.column}>
            <div className={`${styles.card} ${styles.tabs}`}>
              {[
                { id: "activity", label: "Aktivitas & Pesanan" },
                { id: "wishlist", label: "Wishlist" },
                { id: "offers", label: "Nego Aktif" },
                { id: "passport", label: "Paspor Barang" },
              ].map((item) => (
                <button
                  key={item.id}
                  className={tab === item.id ? styles.active : ""}
                  onClick={() => setTab(item.id)}
                >
                  {item.label}
                </button>
              ))}
            </div>
            {tab === "activity" &&
              userOrders.map((order) => (
                <article className={styles.orderCard} key={order.id}>
                  <div className={styles.orderHead}>
                    <div className={styles.badgeRow}>
                      <b>#{order.id}</b>
                      <span className={styles.badge}>{order.category}</span>
                    </div>
                    <span className={styles.badge}>
                      <CheckCircle size={13} />
                      {order.status}
                    </span>
                  </div>
                  <div className={styles.orderBody}>
                    <img src={order.image} alt={order.title} />
                    <div className={styles.orderInfo}>
                      <h3>{order.title}</h3>
                      <p>
                        Skor AI {order.score}/100 • Kondisi telah diverifikasi
                        melalui paspor digital.
                      </p>
                      <span className={styles.badge}>{order.impact}</span>
                    </div>
                    <div className={styles.orderPrice}>
                      <span className={styles.price}>
                        {new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                          maximumFractionDigits: 0,
                        }).format(order.price)}
                      </span>
                      <small>Smart Escrow</small>
                    </div>
                  </div>
                  {order.active && (
                    <div className={styles.tracking}>
                      <b>Estimasi tiba besok via Kurir Motor Listrik</b>
                      <div className={styles.trackBars}>
                        <i className={styles.done} />
                        <i className={styles.done} />
                        <i className={styles.done} />
                        <i />
                      </div>
                      <small>
                        Nego & Escrow • Audit Hub • Kurir Sirkular • Uji Mandiri
                        48 Jam
                      </small>
                    </div>
                  )}
                  <div className={styles.actions}>
                    <button
                      className={styles.secondary}
                      onClick={() =>
                        notify(
                          order.active
                            ? "Membuka percakapan penjual..."
                            : "Paspor digital siap diunduh.",
                        )
                      }
                    >
                      {order.active ? (
                        <MessageCircle size={16} />
                      ) : (
                        <FileDown size={16} />
                      )}{" "}
                      {order.active
                        ? "Hubungi Penjual"
                        : "Unduh Paspor Digital"}
                    </button>
                    <Link
                      className={styles.primary}
                      href={order.active ? "/status" : "/explore"}
                    >
                      {order.active ? "Lacak Pesanan" : "Jual Ulang Nanti"}
                    </Link>
                  </div>
                </article>
              ))}
            {tab !== "activity" && (
              <div className={styles.card}>
                <h3>
                  {tab === "wishlist"
                    ? "Wishlist Produk"
                    : tab === "offers"
                      ? "Penawaran Aktif"
                      : "Paspor Barang Digital"}
                </h3>
                <p>
                  Bagian ini menggunakan data dummy lokal dan siap dihubungkan
                  ke Supabase pada tahap integrasi.
                </p>
                <Link className={styles.primary} href="/explore">
                  Jelajahi Katalog
                </Link>
              </div>
            )}
          </section>
          <aside className={styles.sidebar}>
            <section className={styles.card}>
              <div className={styles.sectionHead}>
                <h3>Badge & Pencapaian</h3>
                <span className={styles.badge}>5 Diperoleh</span>
              </div>
              <div className={styles.column}>
                {achievements.map(({ icon: Icon, title, text }) => (
                  <div className={styles.achievement} key={title}>
                    <span className={styles.achievementIcon}>
                      <Icon size={20} />
                    </span>
                    <div>
                      <b>{title}</b>
                      <small>{text}</small>
                    </div>
                  </div>
                ))}
              </div>
            </section>
            <section className={styles.card}>
              <h3>Rekomendasi Berkelanjutan</h3>
              <p>Berdasarkan Sony A6000 yang kamu beli.</p>
              <div className={styles.recommendation}>
                <div>
                  <b>Sony E 35mm f/1.8 OSS</b>
                  <small>Skor AI 9,6 • Hemat 8,4 kg CO₂e</small>
                  <span className={styles.price}>Rp3.100.000</span>
                </div>
                <ChevronRight />
              </div>
              <div className={styles.recommendation}>
                <div>
                  <b>Strap Kamera Upcycled</b>
                  <small>Bahan daur ulang • Zero-waste craft</small>
                  <span className={styles.price}>Rp165.000</span>
                </div>
                <ChevronRight />
              </div>
              <Link className={styles.secondary} href="/explore">
                Jelajahi Aksesoris
              </Link>
            </section>
            <section className={styles.card}>
              <div className={styles.achievement}>
                <span className={styles.achievementIcon}>
                  <Wrench />
                </span>
                <div>
                  <b>Butuh Servis atau Suku Cadang?</b>
                  <small>Akses bengkel mitra bersertifikasi</small>
                </div>
              </div>
            </section>
          </aside>
        </div>
      </main>
      <MarketplaceFooter />
      {toast && <div className={styles.toast}>{toast}</div>}
    </div>
  );
}
