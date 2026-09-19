"use client";
import Link from "next/link";
import {
  Check,
  CheckCircle,
  Clock3,
  Copy,
  Leaf,
  LockKeyhole,
  MapPin,
  PackageCheck,
  ShieldCheck,
  ShoppingBag,
  Truck,
  WalletCards,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  MarketplaceFooter,
  MarketplaceHeader,
} from "@/components/marketplace/MarketplaceShell";
import styles from "@/components/transaction/Transaction.module.css";

const productImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAiHK34Habb8AELrl8rrkO8_Z7FX4nUzOg1D1fM_i_6POatyDtAOHFN0CrJcDiXnuyhAa42xDLK28FR4m1hzZkYrpxcwsaslx9Fd2hRvxjRBZ7TCKClCQFrahmiq8tgZayPnTC9fyAJ2Esxu6NezmvcyArSUCwfDBv-npOSNUniNbAHvsTPg79ZdxFGUuC4hDtctTrBecIim7BL0OynRe-sZbiAcmj8pepha-rQ_zJtJgSFw-NEavMu";
const shippingOptions = [
  {
    id: "cod",
    name: "COD Sirkular Jabodetabek",
    description:
      "Serah terima di Circular Hub Tebet. Bebas kemasan plastik dan tes langsung di tempat.",
    cost: 0,
    meta: "Hari ini 16.00",
  },
  {
    id: "ev",
    name: "Instant Kurir Motor Listrik",
    description: "Armada listrik langsung ke rumah dengan tote bag returnable.",
    cost: 25000,
    meta: "Tiba 2-3 jam",
  },
  {
    id: "regular",
    name: "Reguler Kardus Upcycled",
    description:
      "Kardus guna ulang dan bubble wrap biodegradable berbahan pati singkong.",
    cost: 14000,
    meta: "1-2 hari kerja",
  },
];
const payments = [
  {
    id: "va",
    name: "Virtual Account Simulasi",
    description: "BCA Sandbox, konfirmasi otomatis tanpa transfer nyata.",
  },
  {
    id: "wallet",
    name: "Dompet Sirkular",
    description: "Saldo sandbox tersedia Rp5.200.000.",
  },
  {
    id: "qris",
    name: "QRIS Dinamis Sandbox",
    description: "Kode simulasi untuk demo interaktif.",
  },
];
const money = (value: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);

export default function CheckoutPage() {
  const [shipping, setShipping] = useState("cod");
  const [payment, setPayment] = useState("va");
  const [agreed, setAgreed] = useState(true);
  const [modal, setModal] = useState(false);
  const [seconds, setSeconds] = useState(85510);
  useEffect(() => {
    const timer = setInterval(
      () => setSeconds((v) => Math.max(0, v - 1)),
      1000,
    );
    return () => clearInterval(timer);
  }, []);
  const selectedShipping = shippingOptions.find(
    (item) => item.id === shipping,
  )!;
  const total = 4500000 + selectedShipping.cost;
  const countdown = useMemo(
    () =>
      [
        Math.floor(seconds / 3600),
        Math.floor((seconds % 3600) / 60),
        seconds % 60,
      ]
        .map((v) => String(v).padStart(2, "0"))
        .join(":"),
    [seconds],
  );
  function pay() {
    if (!agreed) {
      alert("Silakan setujui ketentuan escrow terlebih dahulu.");
      return;
    }
    setModal(true);
  }
  return (
    <div className={styles.page}>
      <MarketplaceHeader />
      <main className={styles.main}>
        <div className={styles.context}>
          <div className={styles.row}>
            <span className={styles.pill}>Accepted Offer Checkout</span>
            <span className={styles.muted}>#ORDER-SIM-88219</span>
          </div>
          <div className={styles.steps}>
            <span className={`${styles.step} ${styles.stepActive}`}>
              <i>1</i>Verifikasi Pesanan
            </span>
            <span>—</span>
            <span className={styles.step}>
              <i>2</i>Escrow Locked
            </span>
            <span>—</span>
            <span className={styles.step}>
              <i>3</i>Inspeksi 48 Jam
            </span>
          </div>
        </div>
        <div className={styles.grid}>
          <div className={styles.column}>
            <section className={`${styles.card} ${styles.accepted}`}>
              <div className={styles.row}>
                <CheckCircle color="#005144" />
                <div>
                  <strong>Tawaran Disepakati Rp4.500.000</strong>
                  <p>
                    Rian Pratama menyetujui tawaran Anda. Selesaikan simulasi
                    sebelum inventaris dibuka kembali.
                  </p>
                </div>
              </div>
              <div className={styles.timer}>
                <Clock3 size={16} /> {countdown}
              </div>
            </section>
            <section className={styles.card}>
              <div className={styles.between}>
                <h2>Snapshot Barang Terverifikasi</h2>
                <Link href="/items/sony-a6000">Lihat Paspor Lengkap</Link>
              </div>
              <div className={styles.product}>
                <img src={productImage} alt="Sony Alpha A6000" />
                <div>
                  <span className={styles.badge}>Skor AI 88/100</span>
                  <h3>Sony Alpha A6000 Kit 16-50mm OSS</h3>
                  <p className={styles.muted}>
                    Optik bersih • Sensor steril • Shutter count 4.210 • Box
                    original
                  </p>
                  <small>
                    Penjual: <b>Rian Pratama</b> • Tebet, Jakarta Selatan
                  </small>
                </div>
                <div>
                  <div className={styles.original}>Rp4.750.000</div>
                  <div className={styles.price}>Rp4.500.000</div>
                </div>
              </div>
              <div className={styles.notice}>
                <ShieldCheck size={20} />
                <span>
                  <b>Jaminan Circular Escrow.</b> Dana ditahan sampai inspeksi
                  fisik mandiri 48 jam selesai.
                </span>
              </div>
            </section>
            <section className={styles.card}>
              <div className={styles.titleRow}>
                <MapPin color="#005144" />
                <h2>Alamat Penerima & Lokasi Serah Terima</h2>
              </div>
              <div className={styles.address}>
                <b>Budi Santoso • Rumah Utama</b>
                <p>
                  Jl. Tebet Barat Dalam Raya No. 42, Jakarta Selatan 12810 • +62
                  812-3456-7890
                </p>
                <small className={styles.muted}>
                  Radius 1,8 km dari penjual, ideal untuk COD Sirkular.
                </small>
              </div>
              <input
                className={styles.input}
                defaultValue="Titipkan di pos satpam bila tidak ada orang di rumah."
                aria-label="Catatan kurir"
              />
            </section>
            <section className={styles.card}>
              <div className={styles.between}>
                <div className={styles.titleRow}>
                  <Truck color="#005144" />
                  <h2>Opsi Pengiriman Ramah Lingkungan</h2>
                </div>
                <span className={styles.badge}>
                  <Leaf size={14} /> Zero-Waste Packaging
                </span>
              </div>
              <div className={styles.options}>
                {shippingOptions.map((option) => (
                  <label
                    key={option.id}
                    className={`${styles.option} ${shipping === option.id ? styles.optionSelected : ""}`}
                  >
                    <input
                      type="radio"
                      name="shipping"
                      checked={shipping === option.id}
                      onChange={() => setShipping(option.id)}
                    />
                    <div className={styles.optionBody}>
                      <div>
                        <strong>{option.name}</strong>
                        <p>{option.description}</p>
                        <small className={styles.muted}>{option.meta}</small>
                      </div>
                      <span className={styles.optionPrice}>
                        {option.cost === 0 ? "GRATIS" : money(option.cost)}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
              <div className={styles.notice}>
                <PackageCheck size={20} /> Semua pengiriman dilindungi asuransi
                kerusakan fisik sirkular.
              </div>
            </section>
            <section className={styles.card}>
              <div className={styles.between}>
                <div className={styles.titleRow}>
                  <WalletCards color="#005144" />
                  <h2>Metode Pembayaran Simulasi</h2>
                </div>
                <span className={styles.badge}>SANDBOX PROTOTYPE</span>
              </div>
              <div className={styles.warning}>
                <b>Perhatian penguji:</b> tidak ada kartu, PIN, OTP, atau
                transaksi perbankan nyata yang digunakan.
              </div>
              <div className={styles.options}>
                {payments.map((option) => (
                  <label
                    key={option.id}
                    className={`${styles.option} ${payment === option.id ? styles.optionSelected : ""}`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={payment === option.id}
                      onChange={() => setPayment(option.id)}
                    />
                    <div>
                      <strong>{option.name}</strong>
                      <p>{option.description}</p>
                      {option.id === "va" && payment === "va" && (
                        <div className={styles.va}>
                          <span className={styles.mono}>
                            8820 9128 4500 0001
                          </span>
                          <button
                            onClick={() =>
                              navigator.clipboard?.writeText("8820912845000001")
                            }
                          >
                            <Copy size={15} /> Salin
                          </button>
                        </div>
                      )}
                    </div>
                  </label>
                ))}
              </div>
            </section>
            <section className={styles.card}>
              <label className={styles.agreement}>
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(event) => setAgreed(event.target.checked)}
                />
                <span>
                  Saya menyetujui Ketentuan Circular Escrow dan akan
                  menyelesaikan inspeksi mandiri sesuai skor AI dalam 48 jam
                  setelah barang diterima.
                </span>
              </label>
            </section>
          </div>
          <aside className={`${styles.column} ${styles.sticky}`}>
            <section className={styles.card}>
              <h2>Ringkasan Biaya Pesanan</h2>
              <div className={styles.summary}>
                <div className={styles.summaryLine}>
                  <span>Harga Kesepakatan</span>
                  <b>Rp4.500.000</b>
                </div>
                <div className={styles.summaryLine}>
                  <span>Potongan Nego</span>
                  <b>- Rp250.000</b>
                </div>
                <div className={styles.summaryLine}>
                  <span>Ongkir {selectedShipping.name}</span>
                  <b>
                    {selectedShipping.cost
                      ? money(selectedShipping.cost)
                      : "Gratis"}
                  </b>
                </div>
                <div className={styles.summaryLine}>
                  <span>Escrow & Proteksi</span>
                  <b>Gratis</b>
                </div>
                <div className={styles.total}>
                  <span>Total Simulasi</span>
                  <strong>{money(total)}</strong>
                </div>
                <button className={styles.button} onClick={pay}>
                  <LockKeyhole size={18} /> Bayar Simulasi {money(total)}
                </button>
                <div className={styles.notice}>
                  Tombol ini hanya mencatat status PAID pada data dummy dan
                  tidak memindahkan uang.
                </div>
              </div>
            </section>
            <section className={styles.card}>
              <h3>Dampak Sirkular Transaksi</h3>
              <div className={styles.impact}>
                <div className={styles.impactBox}>
                  <strong>18,4 kg CO₂e</strong>
                  <span>Emisi dicegah</span>
                </div>
                <div className={styles.impactBox}>
                  <strong>420 g e-waste</strong>
                  <span>Dialihkan dari TPA</span>
                </div>
              </div>
              <div className={styles.notice}>
                <Leaf size={18} /> +45 Poin Sirkular setelah inspeksi selesai.
              </div>
            </section>
          </aside>
        </div>
      </main>
      <MarketplaceFooter />
      {modal && (
        <div className={styles.modalBackdrop}>
          <section className={styles.modal}>
            <div className={styles.successIcon}>
              <Check size={34} />
            </div>
            <h2>Simulasi Pembayaran Berhasil</h2>
            <span className={styles.muted}>#PL-TX-994102</span>
            <div className={styles.price}>{money(total)}</div>
            <p>
              Status berubah menjadi <b>PAID / DANA TAHAN DI ESCROW</b>. Tidak
              ada saldo finansial nyata yang terpotong.
            </p>
            <Link href="/status" className={styles.button}>
              <ShoppingBag size={18} /> Buka Status Pesanan
            </Link>
            <button
              className={styles.secondary}
              onClick={() => setModal(false)}
            >
              Tetap di halaman ini
            </button>
          </section>
        </div>
      )}
    </div>
  );
}
