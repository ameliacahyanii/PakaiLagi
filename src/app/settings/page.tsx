"use client";
import {
  Banknote,
  Bell,
  Camera,
  Check,
  ChevronRight,
  Cloud,
  FileDown,
  KeyRound,
  Leaf,
  LockKeyhole,
  MapPin,
  PackageCheck,
  Phone,
  Save,
  ShieldCheck,
  Store,
  Trash2,
  Truck,
  UserRound,
  Verified,
  WalletCards,
} from "lucide-react";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import {
  MarketplaceFooter,
  MarketplaceHeader,
} from "@/components/marketplace/MarketplaceShell";
import styles from "@/components/settings/Settings.module.css";

const initialAvatar =
  "https://lh3.googleusercontent.com/aida/AEtjO1VsL4Uy_rEEcCiUaFltDZ333A5shhHFn1AMYQlnQL7MY5gYE-FXSOTr1XLOlZvCgaTUZaXapoHq0ddHfNn_HEDVz9lCPOZIr4uPfaDkOnkEd4esTncIF0nriXO_O5_vQyPqwlvzmL1X-04oTJYQP89b6hXh18mNNJys7neklPchpkYUgyX2qlZDglHLGdo8GitoIpT3CtBh8tlmbTk8kDIBWSGWagZepNCFHMhNQg4k3wa4-IDdnd7M4Q";
const menus = [
  { label: "Profil & Identitas Diri", icon: UserRound },
  { label: "Alamat & Titik Kurir", icon: Truck },
  { label: "Rekening Bank & Escrow", icon: Banknote },
  { label: "Preferensi & Notifikasi", icon: Leaf },
  { label: "Keamanan & Kata Sandi", icon: LockKeyhole },
  { label: "Privasi & Ekspor Data", icon: FileDown },
];

export default function SettingsPage() {
  const [active, setActive] = useState(0);
  const [avatar, setAvatar] = useState(initialAvatar);
  const [evDelivery, setEvDelivery] = useState(true);
  const [returnable, setReturnable] = useState(true);
  const [toast, setToast] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  function selectAvatar(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) setAvatar(URL.createObjectURL(file));
  }
  function save(event: FormEvent) {
    event.preventDefault();
    setToast(true);
    setTimeout(() => setToast(false), 3000);
  }

  return (
    <div className={styles.page}>
      <MarketplaceHeader />
      <div className={styles.notice}>
        <div className={styles.noticeInner}>
          <span>
            <Verified size={14} /> Paspor Digital #PKL-88291 tersinkronisasi.
          </span>
          <span>Tier 3 Pelopor Sirkular</span>
        </div>
      </div>
      <main className={styles.main}>
        <div className={styles.breadcrumb}>
          Beranda / Pengaturan Akun & Preferensi Sirkular
        </div>
        <div className={styles.layout}>
          <aside className={styles.sidebar}>
            <section className={styles.card}>
              <div className={styles.profile}>
                <div className={styles.avatar}>
                  {avatar ? (
                    <img src={avatar} alt="Budi Santoso" />
                  ) : (
                    <UserRound />
                  )}
                </div>
                <div>
                  <h3>
                    Budi Santoso <Verified size={15} />
                  </h3>
                  <p>@budisantoso</p>
                  <span className={styles.badge}>Skor Reputasi 98/100</span>
                </div>
              </div>
            </section>
            <nav className={`${styles.card} ${styles.nav}`}>
              {menus.map(({ label, icon: Icon }, index) => (
                <button
                  key={label}
                  className={active === index ? styles.active : ""}
                  onClick={() => setActive(index)}
                >
                  <span>
                    <Icon size={19} />
                    {label}
                  </span>
                  <ChevronRight size={17} />
                </button>
              ))}
            </nav>
            <section className={`${styles.card} ${styles.impact}`}>
              <h3>
                <Leaf size={18} /> Dampak Kumulatif Budi
              </h3>
              <p>
                Aktivitas sirkular dan pengiriman rendah emisi telah mereduksi:
              </p>
              <div className={styles.impactGrid}>
                <div>
                  <strong>42,8 kg</strong>
                  <small>CO₂e Tercegah</small>
                </div>
                <div>
                  <strong>3 Unit</strong>
                  <small>Perangkat Terselamatkan</small>
                </div>
              </div>
            </section>
          </aside>
          <section className={styles.content}>
            <div className={`${styles.card} ${styles.hero}`}>
              <div>
                <h1>Pengaturan Akun & Preferensi Sirkular</h1>
                <p>
                  Kelola identitas, logistik zero-emission, dan keamanan Smart
                  Escrow.
                </p>
              </div>
              <span className={styles.badge}>
                <Verified size={16} /> Identitas KYC Sahih
              </span>
            </div>
            <form className={styles.content} onSubmit={save}>
              <section className={styles.card}>
                <div className={styles.sectionHead}>
                  <div>
                    <h2>1. Informasi Personal</h2>
                    <p>
                      Data publik dan identitas digital di ekosistem PakaiLagi.
                    </p>
                  </div>
                  <span className={styles.badge}>Katalog Publik</span>
                </div>
                <div className={styles.avatarEditor}>
                  <div className={styles.avatar}>
                    {avatar ? (
                      <img src={avatar} alt="Preview avatar" />
                    ) : (
                      <UserRound />
                    )}
                  </div>
                  <div>
                    <h3>Foto Tampilan Pengguna</h3>
                    <p>
                      JPG atau PNG maksimal 4 MB. Foto jernih meningkatkan
                      kepercayaan transaksi.
                    </p>
                    <div className={styles.buttonRow}>
                      <button
                        type="button"
                        className={styles.secondary}
                        onClick={() => fileRef.current?.click()}
                      >
                        <Camera size={17} /> Ganti Foto
                      </button>
                      <button
                        type="button"
                        className={styles.danger}
                        onClick={() => setAvatar("")}
                      >
                        <Trash2 size={17} /> Hapus
                      </button>
                      <input
                        ref={fileRef}
                        className={styles.hiddenInput}
                        type="file"
                        accept="image/*"
                        onChange={selectAvatar}
                      />
                    </div>
                  </div>
                </div>
                <div className={styles.fields}>
                  <div className={styles.field}>
                    <label>Nama Lengkap</label>
                    <input defaultValue="Budi Santoso" />
                    <small>Sesuai kartu identitas.</small>
                  </div>
                  <div className={styles.field}>
                    <label>Username Publik</label>
                    <input defaultValue="budisantoso" />
                    <small>pakailagi.id/u/budisantoso</small>
                  </div>
                  <div className={styles.field}>
                    <label>Email Terdaftar</label>
                    <input
                      type="email"
                      defaultValue="budi.santoso@circular.id"
                    />
                    <small>Email telah terverifikasi.</small>
                  </div>
                  <div className={styles.field}>
                    <label>Nomor WhatsApp / HP</label>
                    <input defaultValue="+62 812-3456-7890" />
                    <small>Untuk OTP dan resi kurir EV.</small>
                  </div>
                  <div className={`${styles.field} ${styles.wide}`}>
                    <label>Bio / Ringkasan Sirkular</label>
                    <textarea
                      rows={3}
                      defaultValue="Pecinta fotografi dan perangkat kerja ergonomis. Mengutamakan produk preloved terawat dengan audit kondisi objektif."
                    />
                  </div>
                </div>
              </section>
              <section className={styles.card}>
                <div className={styles.sectionHead}>
                  <div>
                    <h2>2. Preferensi Logistik Ramah Lingkungan</h2>
                    <p>
                      Prioritaskan pengiriman nol emisi dan kemasan sirkular.
                    </p>
                  </div>
                </div>
                <div className={styles.preferences}>
                  <div className={styles.preference}>
                    <div className={styles.prefIntro}>
                      <span className={styles.icon}>
                        <Truck />
                      </span>
                      <div>
                        <b>Kurir Motor Listrik & Drop-off Stasiun</b>
                        <p>Armada 0 g CO₂/km dan loker MRT/KRL rekanan.</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      aria-label="Toggle kurir listrik"
                      className={`${styles.toggle} ${evDelivery ? styles.toggleOn : ""}`}
                      onClick={() => setEvDelivery(!evDelivery)}
                    >
                      <i />
                    </button>
                  </div>
                  <div className={styles.preference}>
                    <div className={styles.prefIntro}>
                      <span className={styles.icon}>
                        <PackageCheck />
                      </span>
                      <div>
                        <b>Returnable Padded Sleeve</b>
                        <p>
                          Kemasan serat daur ulang yang dikembalikan kepada
                          kurir.
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      aria-label="Toggle kemasan returnable"
                      className={`${styles.toggle} ${returnable ? styles.toggleOn : ""}`}
                      onClick={() => setReturnable(!returnable)}
                    >
                      <i />
                    </button>
                  </div>
                </div>
              </section>
              <section className={styles.card}>
                <div className={styles.sectionHead}>
                  <div>
                    <h2>3. Pengaturan Escrow & Transaksi</h2>
                    <p>Rekening pencairan dan kanal otorisasi Smart Escrow.</p>
                  </div>
                </div>
                <div className={styles.twoCols}>
                  <div className={styles.subcard}>
                    <span className={styles.badge}>Sandbox BCA Terhubung</span>
                    <div className={styles.bank}>
                      <span className={styles.bankLogo}>BCA</span>
                      <div>
                        <b>BCA Virtual Vault</b>
                        <div>•••• •••• 0001</div>
                      </div>
                    </div>
                    <small>Atas Nama: BUDI SANTOSO</small>
                    <div className={styles.buttonRow}>
                      <button type="button" className={styles.secondary}>
                        Ganti Rekening
                      </button>
                      <button type="button" className={styles.danger}>
                        Hapus
                      </button>
                    </div>
                  </div>
                  <div className={styles.subcard}>
                    <b>Kanal Notifikasi Smart Escrow</b>
                    <p>
                      Setiap penahanan dan pelepasan dana dikirimkan melalui:
                    </p>
                    <div className={styles.preference}>
                      <span>
                        <Phone size={16} /> SMS Real-time
                      </span>
                      <b>Aktif</b>
                    </div>
                    <div className={styles.preference}>
                      <span>
                        <Bell size={16} /> WhatsApp Instan
                      </span>
                      <b>Aktif</b>
                    </div>
                  </div>
                </div>
              </section>
              <section className={styles.card}>
                <div className={styles.sectionHead}>
                  <div>
                    <h2>4. Keamanan & Autentikasi</h2>
                    <p>Perlindungan ganda untuk aset dan identitas sirkular.</p>
                  </div>
                </div>
                <div className={styles.preferences}>
                  <div className={styles.securityItem}>
                    <div className={styles.prefIntro}>
                      <span className={styles.icon}>
                        <KeyRound />
                      </span>
                      <div>
                        <b>Ubah Kata Sandi</b>
                        <p>Terakhir diperbarui dua bulan lalu.</p>
                      </div>
                    </div>
                    <button type="button" className={styles.secondary}>
                      Perbarui Sandi
                    </button>
                  </div>
                  <div className={styles.securityItem}>
                    <div className={styles.prefIntro}>
                      <span className={styles.icon}>
                        <ShieldCheck />
                      </span>
                      <div>
                        <b>Autentikasi Dua Langkah (2FA)</b>
                        <p>Wajib untuk transaksi di atas Rp1.000.000.</p>
                      </div>
                    </div>
                    <button type="button" className={styles.secondary}>
                      Kelola 2FA
                    </button>
                  </div>
                </div>
              </section>
              <div className={styles.saveBar}>
                <span>
                  <Cloud size={17} /> Draft tersimpan otomatis secara lokal.
                </span>
                <div className={styles.saveActions}>
                  <button type="reset" className={styles.secondary}>
                    Batal
                  </button>
                  <button type="submit" className={styles.primary}>
                    <Save size={17} /> Simpan Pembaruan Profil
                  </button>
                </div>
              </div>
            </form>
          </section>
        </div>
      </main>
      <MarketplaceFooter />
      {toast && (
        <div className={styles.toast}>
          <Check size={18} /> Pengaturan berhasil diperbarui. Data masih
          bersifat dummy lokal.
        </div>
      )}
    </div>
  );
}
