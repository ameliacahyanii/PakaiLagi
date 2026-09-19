"use client";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle,
  ImagePlus,
  Leaf,
  LockKeyhole,
  MessageCircle,
  Send,
  ShieldCheck,
  ShoppingBag,
  Store,
  Verified,
} from "lucide-react";
import { FormEvent, useState } from "react";
import {
  MarketplaceFooter,
  MarketplaceHeader,
} from "@/components/marketplace/MarketplaceShell";
import styles from "@/components/chat/Chat.module.css";
const conversations = [
  {
    name: "Rian Pratama",
    product: "Sony Alpha A6000 Kit",
    message: "Bodi mulus, sensor aman sesuai audit AI.",
    active: true,
  },
  {
    name: "Toko Ergonomis ID",
    product: "Kursi Kerja Mesh Sihoo V1",
    message: "Resi pick-up kurir hijau sudah aktif.",
  },
  {
    name: "Hendra Wijaya",
    product: "Sepeda Lipat Polygon",
    message: "Transaksi selesai dan poin diterima.",
  },
  {
    name: "Mitra Sirkular Peduli",
    product: "Donasi Blender Philips",
    message: "Jadwal penjemputan telah dikonfirmasi.",
  },
];
const avatar =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCnSgT6ntJ6UboX-7-1XpKemiFB3EMdoV3S3fuBrouBxZNBa4dfZBMB5xefxIZgNosuW0L_2chHoFbXsntH7RmuQLUgXi7YrwyZ6NaO_JSSF61NGcdUnbMKgITAY1eyriBjOiZDnkPPBnpQuR_ldrq9oSihGA9trwzRyCtGs5AMGb2sDMib8y3tshTCmfA43adZoPYQmYf8iL_YJ8kkAOFp4fNgyKGpUZpyVsVtmOQViP2rGF-0QJjq";
const camera =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDSOY1qIndK-tt_rZo4FGyFdzvlthR_JxEVghNC8C0_cl9JTR0ugA7uC4NdsAI_A_zu0pvgAZ8AVlHLDL38BQ4_z6IY7TW85OkpIBBPPrbkSmSUJ3Z2zaxBszVZcvdwm8ch119BCb-c6y8R5yGckTUYmN9zG65LWCdkLJuZnmjDHEPimGkc264vwVjYKEdfcMYUPvcMgdD-ElaJUZzOlE7ajcykGPXLDg7ISGZZWLgiel2Xz3cYZS6k";
const inspection = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCem4TRib48iebKBlX6gBzoflqW-0hPas9UX8PPRaZhnHQ68ygFeEdINzpfuRMemXoKo_KiST-v0YNmcRrwlgoqcy9WVrTcjd0KDPNsHukCyQpbkmWsDjqcqqhwKYFdpqalJ5R1OOX3qI3UjRg0Db9dbvHhnosxzHnYuXny1i5khOyp7iekXB5OZDy2is2u8R4kHbgdTHkUxETCWp_-H3LyGVMXlplz8gOVdikLTgopSW9S7HlZQGm0",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDSNUKBXueX5K4pdy29wp5bDS39D_BsQmzYA2VmTZMT0Ga6D_ixGVsgu6pF3wh-Ch0WG6G5jrya1oFmZxud0otWGUc491k2ioYdz7VRffubxpKWiyOOsoMGtOEa4LvsPTxEPVE5vWRXUdY4zftWSZZDbyo7CdghPQOzhNRIRJO-i3ZzDUJ0mgXzJ8gmYhrAHvccs0GPwA3KlH19UhA4IhlFT7DEVKM9anR2os7Ipww4oMDiLRxhpvha",
];
export default function ChatPage() {
  const [messages, setMessages] = useState<string[]>([]);
  const [text, setText] = useState("");
  const [offer, setOffer] = useState(false);
  function send(e?: FormEvent) {
    e?.preventDefault();
    if (text.trim()) {
      setMessages((v) => [...v, text.trim()]);
      setText("");
    }
  }
  return (
    <div className={styles.page}>
      <MarketplaceHeader />
      <main className={styles.main}>
        <div className={styles.context}>
          <Link href="/explore">
            <ArrowLeft size={16} /> Kembali ke Katalog
          </Link>
          <span className={styles.badge}>
            <ShieldCheck size={14} /> Safe Escrow Aktif
          </span>
        </div>
        <div className={styles.layout}>
          <section className={`${styles.panel} ${styles.directory}`}>
            <div className={styles.directoryHead}>
              <div className={styles.between}>
                <h2>Pesan & Diskusi</h2>
                <span className={styles.badge}>4 Aktif</span>
              </div>
              <input
                className={styles.search}
                placeholder="Cari penjual atau barang..."
              />
              <div className={styles.listFilter}>
                <button className={styles.active}>Semua</button>
                <button>Membeli</button>
                <button>Menjual</button>
              </div>
            </div>
            {conversations.map((item, index) => (
              <article
                className={`${styles.conversation} ${item.active ? styles.conversationActive : ""}`}
                key={item.name}
              >
                <div className={styles.avatar}>
                  <MessageCircle />
                </div>
                <div className={styles.conversationBody}>
                  <b>{item.name}</b>
                  <span className={styles.badge}>{item.product}</span>
                  <p>{item.message}</p>
                </div>
              </article>
            ))}
          </section>
          <section className={styles.panel}>
            <header className={styles.chatHeader}>
              <div className={styles.seller}>
                <img
                  src={avatar}
                  alt="Rian Pratama"
                  className={styles.avatar}
                />
                <div>
                  <b>
                    Rian Pratama <Verified size={14} />
                  </b>
                  <small>Online • Balas &lt;15 menit • Tebet</small>
                </div>
              </div>
              <Link href="/sellers/rian-pratama" className={styles.badge}>
                <Store size={14} />
                Kunjungi Toko
              </Link>
            </header>
            <div className={styles.productBanner}>
              <div className={styles.product}>
                <img src={camera} alt="Sony Alpha A6000" />
                <div className={styles.productInfo}>
                  <span className={styles.badge}>
                    <CheckCircle size={13} />
                    Tersedia • Garansi 48 Jam
                  </span>
                  <h3>Sony Alpha A6000 Kit 16-50mm OSS</h3>
                  <span className={styles.price}>Rp4.750.000</span>{" "}
                  <span className={styles.badge}>Skor AI 88/100</span>
                </div>
                <div className={styles.between}>
                  <button
                    className={styles.badge}
                    onClick={() => setOffer(true)}
                  >
                    Tawar Harga
                  </button>
                  <Link className={styles.send} href="/checkout">
                    <ShoppingBag size={16} /> Beli Sekarang
                  </Link>
                </div>
              </div>
            </div>
            <div className={styles.messages}>
              <div className={styles.system}>
                <b>Pemeriksaan Multi-Sudut AI Terverifikasi</b>
                <p>
                  Kamera telah lulus verifikasi 4 sisi. Transaksi dilindungi
                  Safe Escrow dan garansi 48 jam.
                </p>
              </div>
              <div className={`${styles.bubble} ${styles.buyer}`}>
                Halo Mas Rian, apakah optik dan sensor benar-benar bebas jamur
                dan debu?<small>14:15 ✓✓</small>
              </div>
              <div className={`${styles.bubble} ${styles.sellerBubble}`}>
                Halo Kak Budi. Kamera selalu disimpan di dry box 45% RH. Sensor
                mulus dan AF responsif.<small>14:18</small>
              </div>
              <div className={`${styles.bubble} ${styles.sellerBubble}`}>
                Ini hasil test shutter terakhir. Shutter count 8.450 dan lensa
                memakai filter UV sejak awal.
                <div className={styles.attachment}>
                  <b>Inspeksi Manual Penjual</b>
                  <div className={styles.attachmentGrid}>
                    {inspection.map((src, index) => (
                      <img
                        src={src}
                        alt={`Bukti inspeksi ${index + 1}`}
                        key={src}
                      />
                    ))}
                  </div>
                </div>
                <small>14:20</small>
              </div>
              {messages.map((message, index) => (
                <div className={`${styles.bubble} ${styles.buyer}`} key={index}>
                  {message}
                  <small>Baru saja ✓</small>
                </div>
              ))}
              <div className={styles.system}>
                <LockKeyhole size={17} /> Jangan bertransaksi di luar platform
                agar garansi dan paspor digital tetap terlindungi.
              </div>
            </div>
            <div className={styles.quick}>
              <span>Saran:</span>
              {[
                "Minta Foto Sudut Lain",
                "Tawar Rp4.500.000",
                "Tanya COD Sirkular",
                "Tanya Baterai Cadangan",
              ].map((value) => (
                <button key={value} onClick={() => setText(value)}>
                  {value}
                </button>
              ))}
            </div>
            <form className={styles.composer} onSubmit={send}>
              <button type="button" className={styles.badge}>
                <ImagePlus size={17} />
              </button>
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Tulis pesan ke Rian..."
              />
              <button className={styles.send}>
                Kirim <Send size={16} />
              </button>
            </form>
          </section>
        </div>
        <div className={styles.impact}>
          <Leaf size={18} /> Membeli kamera ini berpotensi menghemat{" "}
          <b>18,4 kg CO₂e</b> dan mencegah <b>420 gram e-waste</b>.
        </div>
      </main>
      <MarketplaceFooter />
      {offer && (
        <div className={styles.modalBackdrop}>
          <form
            className={styles.modal}
            onSubmit={(e) => {
              e.preventDefault();
              setOffer(false);
              setMessages((v) => [
                ...v,
                "Saya mengajukan tawaran Rp4.500.000 melalui Safe Escrow.",
              ]);
            }}
          >
            <h3>Ajukan Tawaran Aman</h3>
            <p>
              Tawaran dikirim melalui PakaiLagi dan tidak memindahkan dana
              nyata.
            </p>
            <input defaultValue="Rp 4.500.000" />
            <div className={styles.between}>
              <button
                type="button"
                className={styles.badge}
                onClick={() => setOffer(false)}
              >
                Batal
              </button>
              <button className={styles.send}>Kirim Tawaran</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
