"use client";
import Link from "next/link";
import {
  Check,
  CheckCircle,
  Clock,
  FileDown,
  Leaf,
  LockKeyhole,
  MessageCircle,
  PackageCheck,
  Phone,
  Printer,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { useEffect, useState } from "react";
import { SellerShell } from "@/components/seller/SellerShell";
import styles from "@/components/seller/SellerDetail.module.css";
const product =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCl8YQw4XH0Vg84F64eq_3ZOKlgmTbnUEevL_vSu5AJ59h-guz1aj6nQDo2gB2LoCywWHeE2XLk79yYICRMAvFnEhfVY40ywPUMHEQM-DPGFaUEPdEUpdARkjcy7F85k1ptZ5jcwusZINym72AuuWA84SSdEk8BGfVHSl6Z5BDPCJXqsPaM-UawjVNl81fF7xzPn8I9NdqjRq7qeW_DcvIRYD81Qz2uJSxhdVGFBaGXRpfL4j42IwmK";
const courier =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCouTV9ncM63Ap8ydwCv3Nm9YaeInVQ5sx3Z219rN935YRDFJXAml2ag-ehwUv7sSuMum7dvLkM76ZGmiKwLqMWA2y9F-MqlcgfkFZMHLpSSDZlKKcPOUze-sMGDQ610jvXuQGQWPjM8Bln7BvKJyJBY-dmETA3kGZDuuhF-BKHAr2H28d1fYhf1b72T5iH1w-zOw3hzFV9sS9rnFXmFLZ2OUuqEdE-Kv3rETHn5VOYrjG4WOBp06vo";
function format(seconds: number) {
  const h = Math.floor(seconds / 3600),
    m = Math.floor((seconds % 3600) / 60),
    s = seconds % 60;
  return [h, m, s].map((v) => String(v).padStart(2, "0")).join(":");
}
export default function SellerOrderPage() {
  const [seconds, setSeconds] = useState(9910);
  const [handover, setHandover] = useState(false);
  const [toast, setToast] = useState("");
  useEffect(() => {
    const id = setInterval(() => setSeconds((v) => Math.max(0, v - 1)), 1000);
    return () => clearInterval(id);
  }, []);
  function notify(v: string) {
    setToast(v);
    setTimeout(() => setToast(""), 2400);
  }
  return (
    <SellerShell active="orders">
      <main className={styles.page}>
        <section className={styles.hero}>
          <div>
            <div className={styles.badgeRow}>
              <Clock />
              <h1>Pesanan Perlu Diproses & Dikirim Hari Ini</h1>
              <span className={styles.badge}>Prioritas Kurir EV</span>
            </div>
            <p>
              Serahkan unit dalam Returnable Sleeve sebelum batas operasional
              hub.
            </p>
          </div>
          <div className={styles.actions}>
            <div className={styles.countdown}>
              <small>Batas kirim 18.00 WIB</small>
              <b>Tersisa {format(seconds)}</b>
            </div>
            <div className={styles.countdown}>
              <small>Status Escrow</small>
              <b>Rp4.500.000 Terkunci</b>
            </div>
          </div>
        </section>
        <section className={`${styles.card} ${styles.orderMeta}`}>
          <div>
            <small>Nomor Faktur</small>
            <b>#ORDER-SIM-88219</b>
          </div>
          <div>
            <small>Waktu Pemesanan</small>
            <b>19 Sep 2026, 14.35 WIB</b>
          </div>
          <span className={styles.badge}>Perlu Pengiriman</span>
          <div className={styles.actions}>
            <button
              className={styles.secondary}
              onClick={() =>
                notify("Label reusable dikirim ke antrean printer.")
              }
            >
              <Printer size={16} />
              Cetak Label
            </button>
            <Link className={styles.secondary} href="/chat">
              <MessageCircle size={16} />
              Chat Pembeli
            </Link>
            <button
              className={styles.primary}
              onClick={() => {
                setHandover(true);
                notify("Serah terima kurir EV berhasil dicatat.");
              }}
            >
              <ShieldCheck size={16} />
              {handover ? "Kurir Telah Menerima" : "Konfirmasi Serah Terima"}
            </button>
          </div>
        </section>
        <div className={styles.grid}>
          <section className={styles.column}>
            <article className={styles.card}>
              <div className={styles.between}>
                <h2>Alur Pemrosesan Penjual</h2>
                <span className={styles.badge}>
                  Langkah {handover ? 4 : 3} dari 5
                </span>
              </div>
              <div className={styles.process}>
                {[
                  {
                    title: "Pembayaran Pembeli Selesai",
                    text: "Dana Rp4.500.000 diamankan di Circular Escrow Vault.",
                    done: true,
                  },
                  {
                    title: "Verifikasi Fisik Akhir",
                    text: "Serial, sensor, shutter, dan aksesori telah sesuai paspor.",
                    done: true,
                  },
                  {
                    title: "Pengemasan Zero-Waste",
                    text: "Gunakan Returnable Sleeve #SWAP-BAG-092 dan unggah bukti.",
                    active: !handover,
                    done: handover,
                  },
                  {
                    title: "Serah Terima Kurir EV",
                    text: "Hendra Wijaya dijadwalkan tiba di Circular Hub Tebet.",
                    active: handover,
                  },
                  {
                    title: "Uji Mandiri 48 Jam & Pencairan",
                    text: "Dana cair setelah masa uji selesai tanpa sengketa.",
                  },
                ].map((step, index) => (
                  <div
                    className={`${styles.processStep} ${step.done ? styles.processDone : ""} ${step.active ? styles.processActive : ""}`}
                    key={step.title}
                  >
                    <b>
                      {index + 1}. {step.title}
                    </b>
                    <p>{step.text}</p>
                    {index === 2 && !handover && (
                      <button
                        className={styles.primary}
                        onClick={() =>
                          notify("Bukti kemasan telah ditandai terunggah.")
                        }
                      >
                        <PackageCheck size={16} />
                        Upload Bukti Kemasan
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </article>
            <article className={styles.card}>
              <div className={styles.between}>
                <h2>Detail Barang & Paspor Sirkular</h2>
                <span className={styles.badge}>AI Score 88/100</span>
              </div>
              <div className={styles.product}>
                <img
                  src={product}
                  alt="Sony Alpha A6000 dalam kemasan reusable"
                />
                <div className={styles.productInfo}>
                  <b>#PASSPORT-ID-SNY-9921</b>
                  <h2>Sony Alpha A6000 Kit 16-50mm OSS</h2>
                  <p>
                    Kondisi terawat, sensor bersih, autofocus dan zoom normal.
                  </p>
                  <div className={styles.twoCols}>
                    <div>
                      <small>Harga Awal</small>
                      <div>Rp4.750.000</div>
                    </div>
                    <div>
                      <small>Harga Kesepakatan</small>
                      <div className={styles.price}>Rp4.500.000</div>
                    </div>
                  </div>
                </div>
              </div>
              <h3>Checklist Verifikasi Fisik</h3>
              <div className={styles.twoCols}>
                {[
                  "Optik depan & belakang bersih",
                  "Shutter mekanis responsif",
                  "Aksesori bawaan lengkap",
                  "Serial bodi dan lensa cocok",
                ].map((item) => (
                  <div className={styles.ready} key={item}>
                    <span className={styles.readyDot}>✓</span>
                    {item}
                  </div>
                ))}
              </div>
            </article>
            <article className={styles.card}>
              <h2>Instruksi Pengemasan Zero-Waste</h2>
              <div className={styles.notice}>
                <PackageCheck />
                <div>
                  <b>Gunakan Returnable Padded Sleeve #SWAP-BAG-092</b>
                  <p>
                    Dilarang menggunakan bubble wrap plastik, isolasi PVC
                    berlebih, atau styrofoam.
                  </p>
                </div>
              </div>
              <div className={styles.actions}>
                <button className={styles.secondary}>
                  Minta Sleeve Pengganti
                </button>
                <button className={styles.secondary}>Panduan Pengemasan</button>
              </div>
            </article>
            <article className={styles.card}>
              <h2>Log Aktivitas Pemrosesan</h2>
              <div className={styles.timeline}>
                {[
                  { t: "15.15", a: "Barcode kurir EV digenerate" },
                  { t: "15.00", a: "Unit dimasukkan ke sleeve reusable" },
                  { t: "14.40", a: "Jadwal pickup dikonfirmasi" },
                  { t: "14.35", a: "Dana masuk Escrow" },
                ].map((item) => (
                  <div className={styles.timelineItem} key={item.t}>
                    <div>
                      <b>{item.a}</b>
                      <p>Dicatat pada Circular Ledger PakaiLagi.</p>
                    </div>
                    <span>{item.t} WIB</span>
                  </div>
                ))}
              </div>
            </article>
          </section>
          <aside className={`${styles.column} ${styles.sticky}`}>
            <article className={styles.card}>
              <div className={styles.between}>
                <h3>Circular Escrow Vault</h3>
                <CheckCircle color="#2f8f68" />
              </div>
              <div className={styles.notice}>
                <LockKeyhole />
                <div>
                  <b>TERKUNCI AMAN</b>
                  <div className={styles.price}>Rp4.500.000</div>
                </div>
              </div>
              <p>
                Dana cair setelah uji mandiri 48 jam selesai tanpa komplain.
              </p>
              <small>Vault Ref #ESC-JKT-88219</small>
            </article>
            <article className={styles.card}>
              <div className={styles.between}>
                <h3>Logistik Rendah Emisi</h3>
                <span className={styles.badge}>EV Delivery</span>
              </div>
              <p>
                <b>COD Sirkular Jabodetabek</b>
                <br />
                Circular Hub Tebet, pintu barat
                <br />
                <b>Hari ini, 16.30 - 18.00 WIB</b>
              </p>
              <div className={styles.courier}>
                <img src={courier} alt="Hendra Wijaya" />
                <div>
                  <b>Hendra Wijaya</b>
                  <small>Motor Listrik #EV-JKT-04 • ★4,9</small>
                </div>
              </div>
              <button
                className={styles.primary}
                onClick={() => notify("Membuka kanal komunikasi kurir...")}
              >
                <Phone size={16} />
                Hubungi Kurir
              </button>
            </article>
            <article className={styles.card}>
              <h3>Profil & Catatan Pembeli</h3>
              <b>Budi Santoso ✓</b>
              <p>Trust Index 98/100 • Tebet, Jakarta Selatan</p>
              <div className={styles.notice}>
                “Telepon sebelum tiba. Titipkan di pos satpam bila rumah
                kosong.”
              </div>
              <Link className={styles.secondary} href="/chat">
                <MessageCircle size={16} />
                Kirim Pesan
              </Link>
            </article>
            <article className={styles.card}>
              <h3>Dampak Ekologis</h3>
              <div className={styles.stats}>
                <div className={styles.stat}>
                  <strong>+45</strong>
                  <small>Poin Sirkular</small>
                </div>
                <div className={styles.stat}>
                  <strong>420 g</strong>
                  <small>e-Waste Dicegah</small>
                </div>
              </div>
              <div className={styles.stat}>
                <strong>18,4 kg CO₂e</strong>
                <small>Reduksi emisi transaksi</small>
              </div>
            </article>
          </aside>
        </div>
      </main>
      {toast && <div className={styles.toast}>{toast}</div>}
    </SellerShell>
  );
}
