"use client";
import {
  BadgeCheck,
  Box,
  CheckCircle,
  HeartHandshake,
  Leaf,
  MessageCircle,
  PackageCheck,
  Recycle,
  Share2,
  ShieldCheck,
  Star,
  Timer,
  Truck,
  UserPlus,
  Verified,
} from "lucide-react";
import { useMemo, useState } from "react";
import {
  MarketplaceFooter,
  MarketplaceHeader,
} from "@/components/marketplace/MarketplaceShell";
import { SellerProductCard } from "@/components/profile/SellerProductCard";
import { sellerProducts } from "@/data/profile-data";
import styles from "@/components/profile/Profile.module.css";

const sellerAvatar =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuC89Ju9TrM9Qsk6N1abB41TMpGJZvYoy4MHvvZoSgokOoipLvmiX0CC0KtlFlv_bXKojBN1V1uVtQ-fN3kt8PCzpQ1r7m9Ny0e3HBJFajwzkDygE8Ss8Czpq9jrcTbLXDd7woKRC-mh7h9RR3FyCYypo-wjnDcQ_yP8pK4cfsPlRJIJwSN56po7ZzQtsrzTTHrqOagPryGh9k3mYPdKW6Etl2Riao48oz48_dPZO1ipWnah_oor3StK";
const packagingImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAEd-yLJ6w_-4XXh2cr5073VjzHYgdB-L8022iJpWOA7Z4z8bi2e4UWpFc5q8_KCOxin0oqqtesleyMJdWJEjdPO7QLmWlDIi75u6GPhmSp802Lfu0Rrfd1M76vMdl-vfaFhr4B1_R7RyfESY96LNlqNONGPzujX4-mGY7f7orEmboW0RCF-uIlryatDR77ws3oAMrMqQCLmmXzK74XuD4TY5fLhKu3P0a6dgls2XEDMZloi6u1n0v4";
const reviews = [
  {
    initials: "AS",
    name: "Arya Setiawan",
    item: "Fujifilm X-T30 Body",
    score: 92,
    text: "Pengemasan sleeve sirkular rapi. Sensor bersih dan performa AF sesuai laporan audit.",
  },
  {
    initials: "DW",
    name: "Dewi Wulandari",
    item: "Sony FE 85mm f/1.8",
    score: 96,
    text: "Lensa dirawat dalam drybox. Fokus mulus dan seller sangat transparan tentang riwayat servis.",
  },
  {
    initials: "MK",
    name: "Michael Kevin",
    item: "iPad Mini 5 & Pencil",
    score: 89,
    text: "Proses swap lancar melalui escrow. Kondisi baterai sama dengan bukti diagnostik yang diberikan.",
  },
];

export default function SellerProfilePage() {
  const [followed, setFollowed] = useState(false);
  const [chat, setChat] = useState(false);
  const [tab, setTab] = useState("all");
  const [sort, setSort] = useState("score");
  const visible = useMemo(
    () =>
      sellerProducts
        .filter((product) => tab === "all" || product.category === tab)
        .sort((a, b) =>
          sort === "price-low"
            ? a.price - b.price
            : sort === "price-high"
              ? b.price - a.price
              : b.score - a.score,
        ),
    [sort, tab],
  );
  return (
    <div className={styles.page}>
      <MarketplaceHeader />
      <section className={styles.heroBg}>
        <div className={styles.container}>
          <div className={`${styles.card} ${styles.sellerHero}`}>
            <div className={styles.heroTop}>
              <div className={styles.identity}>
                <img
                  className={styles.sellerAvatar}
                  src={sellerAvatar}
                  alt="Rian Pratama"
                />
                <div className={styles.identityText}>
                  <div className={styles.badgeRow}>
                    <h1>Rian Pratama</h1>
                    <span className={styles.badge}>
                      <ShieldCheck size={14} /> Toko Sirkular Terverifikasi
                    </span>
                  </div>
                  <div className={styles.badgeRow}>
                    <span className={styles.badge}>
                      <Leaf size={14} /> Tier 1 Eco-Seller
                    </span>
                    <span className={styles.badge}>
                      <Verified size={14} /> AI Audit 98,4%
                    </span>
                  </div>
                  <div className={styles.meta}>
                    <span>Tebet, Jakarta Selatan</span>
                    <span>• Balas &lt;15 menit</span>
                    <span>• ★ 4,9 dari 42 ulasan</span>
                    <span>• EV & Returnable Sleeve Ready</span>
                  </div>
                </div>
              </div>
              <div className={styles.actions}>
                <button
                  className={styles.primary}
                  onClick={() => setChat(true)}
                >
                  <MessageCircle size={18} /> Chat Penjual
                </button>
                <button
                  className={styles.secondary}
                  onClick={() => setFollowed(!followed)}
                >
                  <UserPlus size={18} />
                  {followed ? "Mengikuti" : "Ikuti Toko"}
                </button>
                <button className={styles.iconButton} aria-label="Bagikan">
                  <Share2 size={18} />
                </button>
              </div>
            </div>
            <div className={styles.metrics}>
              <div className={styles.metric}>
                <span className={styles.metricIcon}>
                  <BadgeCheck />
                </span>
                <div>
                  <strong>98/100</strong>
                  <small>Skor Reputasi Sirkular</small>
                </div>
              </div>
              <div className={styles.metric}>
                <span className={styles.metricIcon}>
                  <Recycle />
                </span>
                <div>
                  <strong>18 Unit</strong>
                  <small>Barang Tersalurkan</small>
                </div>
              </div>
              <div className={styles.metric}>
                <span className={styles.metricIcon}>
                  <CheckCircle />
                </span>
                <div>
                  <strong>0% Komplain</strong>
                  <small>Retur Bebas Ribet</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <main className={`${styles.container} ${styles.main}`}>
        <div className={styles.sectionHead}>
          <div className={styles.tabs}>
            {[
              { id: "all", label: "Semua Produk" },
              { id: "camera", label: "Kamera & Optik" },
              { id: "accessory", label: "Aksesoris & Gadget" },
            ].map((item) => (
              <button
                key={item.id}
                className={tab === item.id ? styles.active : ""}
                onClick={() => setTab(item.id)}
              >
                {item.label}
              </button>
            ))}
            <button>Ulasan Pembeli</button>
            <button>Riwayat Sirkular</button>
          </div>
          <select
            className={styles.sort}
            value={sort}
            onChange={(event) => setSort(event.target.value)}
          >
            <option value="score">Skor AI Tertinggi</option>
            <option value="price-low">Harga Terendah</option>
            <option value="price-high">Harga Tertinggi</option>
          </select>
        </div>
        <div className={styles.productGrid}>
          {visible.map((product) => (
            <SellerProductCard key={product.id} product={product} />
          ))}
        </div>
        <section className={`${styles.card} ${styles.manifest}`}>
          <div>
            <span className={styles.badge}>
              <Verified size={14} /> Standar Transparansi Penjual
            </span>
            <h2>Komitmen Pengemasan Sirkular & Perawatan Optik</h2>
            <p>
              Setiap pengiriman meniadakan plastik sekali pakai tanpa
              mengorbankan keamanan optik dan presisi gawai.
            </p>
            <div className={styles.protocols}>
              <div className={styles.protocol}>
                <PackageCheck />
                <h3>Returnable Sleeve</h3>
                <p>Bantalan serat daur ulang yang dapat dikembalikan gratis.</p>
              </div>
              <div className={styles.protocol}>
                <Leaf />
                <h3>Drybox Khusus Optik</h3>
                <p>
                  Ruang terkontrol RH 40-45% untuk mencegah jamur dan
                  kondensasi.
                </p>
              </div>
            </div>
          </div>
          <img
            className={styles.manifestImage}
            src={packagingImage}
            alt="Kemasan sirkular returnable"
          />
        </section>
        <section className={styles.reviews}>
          <div className={styles.sectionHead}>
            <div>
              <span className={styles.badge}>
                <Star size={14} /> Reputasi Transaksi Nyata
              </span>
              <h2>Ulasan Pembeli & Hasil Uji Mandiri 48 Jam</h2>
            </div>
            <span className={styles.badge}>42 Ulasan Terverifikasi</span>
          </div>
          <div className={styles.reviewGrid}>
            {reviews.map((review) => (
              <article
                key={review.name}
                className={`${styles.card} ${styles.review}`}
              >
                <div>
                  <div className={styles.reviewHead}>
                    <span className={styles.reviewer}>{review.initials}</span>
                    <div>
                      <b>{review.name}</b>
                      <small>{review.item}</small>
                    </div>
                    <span className={styles.stars}>★★★★★</span>
                  </div>
                  <span className={styles.badge}>
                    <CheckCircle size={13} /> Skor Inspeksi Tiba {review.score}
                    /100
                  </span>
                  <p>“{review.text}”</p>
                </div>
                <small>Transaksi tervalidasi PakaiLagi</small>
              </article>
            ))}
          </div>
        </section>
      </main>
      <MarketplaceFooter />
      {chat && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modal}>
            <h3>Chat dengan Rian Pratama</h3>
            <p>Tanyakan kondisi, audit AI, atau opsi serah terima.</p>
            <textarea defaultValue="Halo, saya ingin bertanya tentang produk di toko Anda." />
            <div className={styles.actions}>
              <button
                className={styles.secondary}
                onClick={() => setChat(false)}
              >
                Batal
              </button>
              <button className={styles.primary} onClick={() => setChat(false)}>
                Kirim Pesan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
