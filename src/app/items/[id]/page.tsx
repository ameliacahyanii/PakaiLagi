"use client";
import {
  CheckCircle,
  Heart,
  Leaf,
  MessageCircle,
  Share2,
  ShieldCheck,
  ShoppingBag,
  Star,
  Truck,
  UserRound,
  Verified,
} from "lucide-react";
import { useState } from "react";
import {
  MarketplaceFooter,
  MarketplaceHeader,
} from "@/components/marketplace/MarketplaceShell";
import styles from "@/components/marketplace/Marketplace.module.css";

const images = [
  [
    "Tampak Depan & Bodi",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCaPaO73lRmP3vKSdqx6yH5mEB6AML0DexG0GkFXPde3AzvIAQGfLOWV0QUaYrSOp0GqN9FxRwgMc-3j3F7PMDNLGyM1bd7dq4sT9hJ1eQ_U-b658Y_jF1o_Ek4Hc8iY6F5ED7ILJTekbQQKl_lLVJzItA8NNhb6vUE7Ack8kMEbhL40yHA4UIRveC7HhWdPtWH3QpQkr3IhPFhwYjp1vH23SfP2iEzkfjF2Pg1ywZ-XCUcWqgaciYx",
  ],
  [
    "Lensa & Sensor CMOS APS-C",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCth0BBm-QRliEfC32wkJurPehafgwgYc2HMhwFcc-dknNXXvPJMG7iskaZSF18VWHQ-9vBNWxvf5NVj65JlyEor6_VJOfGY6pbYKChzETyfK-4cWIOkR6GMIQ0lMXrVEYrXPchGWnZ0diXSCOLfNuMnjuIfaDXSaFvcpAp8j8HlD5TvTv7WF0TcDNAcjHQVDPbtrV7l4KfDVWMrNwPVbQJUf8BQJDQsPYpor4aDiUmnVDhGK38lRx0",
  ],
  [
    "Bodi Atas, Mode Dial & Hotshoe",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAx5WCQSyg2tjmNdr-EMjCPndUmUGrOnt33w7lTkirPEiPOC0uZ0FioWY0v6jaE0DZNvsytjYiH70SD9ZWfO04VLePNA4ePuZQtAkkCSpGruqqvQ2IyVtraVOs0ZswiWwwda8IhcqGmiuxDQQiZWP3DQCk6Fk8sGsFuhwYr-W9Y4o_Z6HxKhke9fwXrxXHSoo8vRwGSwJLC0ZOMX43YbCNvpA1WcE_4PbWZCG6sowhvJs9FNNJ4Jdip",
  ],
  [
    "Layar LCD & Kompartemen Baterai",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuC1nd08sIUSP6LhY50BPS99yLGJFnIMQINafJ6nUUJV5OGjdD-Ler6fZaN-AYV6gQjIoIXJgHmtYVXq-Nsq4FQDjtLkp1bNb4U9yEbljRn6oE1_vbaICwe4HCCPrg98IZyBTwCZCg0dXT8vBgevEay9nHraK5iHY4UyLjDspZY6_JOABfcbyQSdCxEAoDZ_xU14r99mNbec7R9jZjFqoLyDLbEKY9bzwm5FY7UBOpJmyZTzHSnEaYVZ",
  ],
] as const;
const factors = [
  {
    name: "Fungsi Hardware",
    score: 95,
    text: "Shutter normal, autofocus responsif, sensor bersih bebas jamur.",
  },
  {
    name: "Kondisi Fisik",
    score: 82,
    text: "Goresan mikro tipis, bodi kokoh, grip karet masih rapat.",
  },
  {
    name: "Kelengkapan Paket",
    score: 90,
    text: "Box, dua baterai, wall-charger, dan neckstrap tersedia.",
  },
  {
    name: "Usia & Perawatan",
    score: 85,
    text: "Pemakaian dua tahun dan rutin tersimpan dalam drybox.",
  },
];
const events = [
  {
    title: "Diinspeksi AI PakaiLagi v1.2 (Skor 88)",
    date: "18 Sep 2026",
    text: "Pemeriksaan empat sudut citra berhasil mengonfirmasi kondisi bodi dan optik tanpa indikasi jamur.",
  },
  {
    title: "Pembersihan Sensor & Kalibrasi Lensa",
    date: "12 Jan 2025",
    text: "Perawatan dilakukan di pusat servis resmi dan bukti pengerjaan tersedia.",
  },
  {
    title: "Pembelian Baru oleh Pemilik Pertama",
    date: "15 Mar 2024",
    text: "Unit dibeli resmi bergaransi dan dokumen pembelian telah diverifikasi.",
  },
];

export default function ProductDetailPage() {
  const [active, setActive] = useState(0);
  const [toast, setToast] = useState(false);
  const [chat, setChat] = useState(false);
  return (
    <div className={styles.shell}>
      <MarketplaceHeader />
      <main className={styles.main}>
        <div className={styles.breadcrumbs}>
          <span>Katalog Sirkular</span>
          <span>›</span>
          <span>Kamera & Optik</span>
          <span>›</span>
          <b>Sony Alpha A6000</b>
        </div>
        <div className={styles.detailGrid}>
          <div className={styles.left}>
            <section className={styles.panel}>
              <img
                className={styles.mainImage}
                src={images[active][1]}
                alt={images[active][0]}
              />
              <div className={styles.thumbs}>
                {images.map((image, index) => (
                  <button
                    key={image[0]}
                    className={`${styles.thumb} ${active === index ? styles.thumbActive : ""}`}
                    onClick={() => setActive(index)}
                  >
                    <img src={image[1]} alt={image[0]} />
                  </button>
                ))}
              </div>
              <p>{images[active][0]}</p>
            </section>
            <section className={`${styles.panel} ${styles.impact}`}>
              <div className={styles.scoreHead}>
                <div>
                  <h2>Skor Kondisi & Transparansi AI</h2>
                  <p>Skor berdasarkan foto empat sisi dan inspeksi penjual.</p>
                </div>
                <div>
                  <span className={styles.scoreBig}>88</span>/100
                </div>
              </div>
              <div className={styles.factorGrid}>
                {factors.map((f) => (
                  <div className={styles.factor} key={f.name}>
                    <div className={styles.factorTop}>
                      <span>{f.name}</span>
                      <span>{f.score}/100</span>
                    </div>
                    <div className={styles.track}>
                      <div
                        className={styles.fill}
                        style={{ width: `${f.score}%` }}
                      />
                    </div>
                    <p>{f.text}</p>
                  </div>
                ))}
              </div>
              <div className={styles.notice}>
                <ShieldCheck size={19} /> <b>Safety Pass.</b> Tidak ada indikasi
                kebocoran baterai atau korsleting.
              </div>
            </section>
            <section className={styles.panel}>
              <div className={styles.passportHead}>
                <div>
                  <small>DIGITAL PRODUCT PASSPORT</small>
                  <h3>#PASSPORT-ID-SNY-9921</h3>
                  <span>● Status: Aktif Dijual Kembali</span>
                </div>
                <div>
                  <Leaf /> <strong>~32 kg CO₂e</strong>
                </div>
              </div>
              <div className={styles.timeline}>
                {events.map((event) => (
                  <article className={styles.event} key={event.title}>
                    <b>{event.title}</b>
                    <small>{event.date}</small>
                    <p>{event.text}</p>
                  </article>
                ))}
              </div>
            </section>
            <section className={styles.panel}>
              <h2>Deskripsi & Spesifikasi Lengkap</h2>
              <p>
                Kamera mirrorless Sony Alpha A6000 Kit 16-50mm OSS tangan
                pertama, digunakan untuk dokumentasi hobi dan selalu disimpan di
                dry cabinet.
              </p>
              <div className={styles.factorGrid}>
                <div className={styles.notice}>Sensor: 24.3 MP APS-C CMOS</div>
                <div className={styles.notice}>Shutter Count: ~8.450</div>
                <div className={styles.notice}>
                  Sistem Lensa: Sony E-Mount OSS
                </div>
                <div className={styles.notice}>Konektivitas: Wi-Fi & NFC</div>
              </div>
            </section>
          </div>
          <aside className={styles.right}>
            <section className={`${styles.panel} ${styles.purchase}`}>
              <div className={styles.scoreRow}>
                <span className={styles.chip}>Kamera & Optik</span>
                <span>● Stok: 1</span>
              </div>
              <h1>
                Sony Alpha A6000 Kit 16-50mm OSS (Tangan Pertama, Sensor Bersih)
              </h1>
              <div className={styles.notice}>
                Harga Jual Transparan
                <div className={styles.detailPrice}>Rp 4.750.000</div>
                <s>Rp 5.200.000</s>
              </div>
              <div className={styles.notice}>
                <Verified size={18} /> <b>Garansi Cek Fisik 48 Jam.</b>{" "}
                Pembayaran pada prototype ini hanya simulasi sandbox.
              </div>
              <div className={styles.actions}>
                <button
                  className={styles.primaryButton}
                  onClick={() => setToast(true)}
                >
                  <ShoppingBag size={18} /> Beli Sekarang
                </button>
                <button
                  className={styles.secondaryButton}
                  onClick={() => setChat(true)}
                >
                  <MessageCircle size={18} /> Chat Penjual
                </button>
                <button className={styles.secondaryButton}>
                  <Heart size={18} />
                </button>
                <button className={styles.secondaryButton}>
                  <Share2 size={18} />
                </button>
              </div>
              {toast && (
                <div className={styles.toast}>
                  <CheckCircle size={18} /> Simulasi escrow aktif. Token
                  #SIM-TX-88219 berhasil diterbitkan.{" "}
                  <button onClick={() => setToast(false)}>Tutup</button>
                </div>
              )}
            </section>
            <section className={styles.panel}>
              <div className={styles.sellerCard}>
                <div className={styles.avatar}>
                  <UserRound />
                </div>
                <div>
                  <h3>
                    Rian Pratama <Verified size={15} />
                  </h3>
                  <span>
                    <Star size={14} fill="currentColor" /> 4.9 (42 ulasan)
                  </span>
                </div>
              </div>
              <div className={styles.metrics}>
                <div className={styles.metric}>
                  <strong>18</strong>
                  <span>Barang tersalurkan</span>
                </div>
                <div className={styles.metric}>
                  <strong>&lt;15m</strong>
                  <span>Balas</span>
                </div>
                <div className={styles.metric}>
                  <strong>100%</strong>
                  <span>Sukses</span>
                </div>
              </div>
            </section>
            <section className={styles.panel}>
              <h3>
                <Truck size={18} /> Opsi Pengiriman Ramah Lingkungan
              </h3>
              <div className={styles.shipping}>
                <b>COD Sirkular</b>
                <p>Temu di Circular Hub Tebet. Gratis.</p>
              </div>
              <div className={styles.shipping}>
                <b>Instant Motor Listrik</b>
                <p>Tiba maksimal tiga jam. Rp25.000.</p>
              </div>
              <div className={styles.shipping}>
                <b>Reguler Kardus Upcycled</b>
                <p>Kemasan guna ulang. Rp14.000.</p>
              </div>
            </section>
          </aside>
        </div>
      </main>
      <MarketplaceFooter />
      {chat && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modal}>
            <h3>Chat dengan Rian Pratama</h3>
            <p>Tanyakan kondisi, kelengkapan, atau jadwal COD.</p>
            <textarea defaultValue="Halo, apakah kamera ini masih tersedia?" />
            <div className={styles.modalActions}>
              <button
                className={styles.secondaryButton}
                onClick={() => setChat(false)}
              >
                Batal
              </button>
              <button
                className={styles.primaryButton}
                onClick={() => setChat(false)}
              >
                Kirim Pesan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
