"use client";
import {
  Bell,
  Camera,
  Check,
  ChevronRight,
  Cloud,
  Download,
  KeyRound,
  Leaf,
  MapPin,
  MessageSquareText,
  Phone,
  Save,
  ShieldCheck,
  Trash2,
  Truck,
  UserRound,
} from "lucide-react";
import {
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
  useRef,
  useState,
} from "react";
import {
  MarketplaceFooter,
  MarketplaceHeader,
} from "@/components/marketplace/MarketplaceShell";
import Image from "next/image";

const display = "font-[family-name:var(--font-display,Georgia,serif)]";
const body = "font-[family-name:var(--font-body,system-ui,sans-serif)]";
const focus =
  "focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#12705A]";
const focusDark =
  "focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-white";
const card =
  "rounded-2xl border border-[#E4E7EB] bg-white shadow-[0_1px_2px_rgba(17,24,39,0.04),0_10px_28px_-14px_rgba(17,24,39,0.10)]";
const btn = `inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-4 text-sm font-semibold no-underline transition-colors`;
const btnPrimary = `${btn} ${focus} bg-[#0B4F3F] !text-white hover:bg-[#083D31]`;
const btnOutline = `${btn} ${focus} border border-[#E4E7EB] !text-[#111827] hover:border-[#0B4F3F]`;
const btnDanger = `${btn} ${focus} border border-[#F3D2D2] !text-[#B3261E] hover:bg-[#FBEAEA]`;
const inputCls = `mt-1.5 w-full rounded-xl border border-[#E4E7EB] px-4 py-2.5 text-sm ${focus}`;
const labelCls = "text-sm font-semibold";

const initialAvatar =
  "https://lh3.googleusercontent.com/aida/AEtjO1VsL4Uy_rEEcCiUaFltDZ333A5shhHFn1AMYQlnQL7MY5gYE-FXSOTr1XLOlZvCgaTUZaXapoHq0ddHfNn_HEDVz9lCPOZIr4uPfaDkOnkEd4esTncIF0nriXO_O5_vQyPqwlvzmL1X-04oTJYQP89b6hXh18mNNJys7neklPchpkYUgyX2qlZDglHLGdo8GitoIpT3CtBh8tlmbTk8kDIBWSGWagZepNCFHMhNQg4k3wa4-IDdnd7M4Q";

const menus = [
  { id: "profil", label: "Profil & Identitas", icon: UserRound },
  { id: "alamat", label: "Alamat & Titik Kurir", icon: Truck },
  { id: "serah-terima", label: "Preferensi Serah Terima", icon: MapPin },
  { id: "preferensi", label: "Preferensi & Notifikasi", icon: Leaf },
  { id: "keamanan", label: "Keamanan & Kata Sandi", icon: KeyRound },
  { id: "privasi", label: "Privasi & Ekspor Data", icon: Download },
];

/* ---------- Toggle switch aksesibel ---------- */
function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${focus} ${
        checked ? "bg-[#0B4F3F]" : "bg-[#E4E7EB]"
      }`}
    >
      <span
        className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
          checked ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
}

function SectionCard({
  id,
  title,
  description,
  badge,
  children,
  registerRef,
}: {
  id: string;
  title: string;
  description: string;
  badge?: string;
  children: ReactNode;
  registerRef: (el: HTMLDivElement | null) => void;
}) {
  return (
    <section id={id} ref={registerRef} className={`${card} scroll-mt-24 p-6`}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className={`${display} text-xl font-normal`}>{title}</h2>
          <p className="mt-1 text-sm text-[#5B6675]">{description}</p>
        </div>
        {badge && (
          <span className="rounded-full bg-[#E6F2ED] px-2.5 py-1 text-xs font-semibold text-[#0B4F3F]">
            {badge}
          </span>
        )}
      </div>
      <div className="mt-5">{children}</div>
    </section>
  );
}

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("profil");
  const [avatar, setAvatar] = useState(initialAvatar);
  const [evDelivery, setEvDelivery] = useState(true);
  const [returnable, setReturnable] = useState(true);
  const [notifyEmail, setNotifyEmail] = useState(true);
  const [notifyWhatsapp, setNotifyWhatsapp] = useState(true);
  const [publicProfile, setPublicProfile] = useState(true);
  const [handoverPref, setHandoverPref] = useState("hub");
  const [toast, setToast] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  function selectAvatar(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) setAvatar(URL.createObjectURL(file));
  }

  function save(event: FormEvent) {
    event.preventDefault();
    setToast(true);
    setTimeout(() => setToast(false), 3000);
  }

  function goTo(id: string) {
    setActiveSection(id);
    sectionRefs.current[id]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  return (
    <div
      className={`${body} min-h-screen bg-[#F7F8F7] text-[#111827] antialiased`}
    >
      <MarketplaceHeader />

      <div className="border-b border-[#E4E7EB] bg-white">
        <div className="mx-auto flex w-full max-w-[1200px] flex-wrap items-center justify-between gap-2 px-4 py-2.5 text-sm text-[#5B6675] sm:px-6">
          <span>Beranda / Pengaturan Akun & Preferensi Sirkular</span>
          <span className="inline-flex items-center gap-1.5 font-semibold text-[#0B4F3F]">
            <ShieldCheck size={14} /> Tier 3 Pelopor Sirkular
          </span>
        </div>
      </div>

      <main className="mx-auto w-full max-w-[1200px] px-4 py-8 sm:px-6 sm:py-12">
        {/* ============ Hero halaman (sama pola dengan profil) ============ */}
        <section className="grid gap-6 rounded-3xl bg-[#0A3D31] p-6 text-white sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center lg:p-14">
          <div>
            <h1
              className={`${display} text-[2rem] font-normal leading-tight tracking-[-0.01em] sm:text-[2.4rem]`}
            >
              Pengaturan Akun & Preferensi Sirkular
            </h1>
            <p className="mt-2 max-w-[50ch] text-white/75">
              Kelola identitas, alamat, preferensi logistik, dan keamanan
              akunmu.
            </p>
          </div>
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-sm font-semibold">
            <ShieldCheck size={16} className="text-[#E2BC6B]" /> Profil
            Terverifikasi
          </span>
        </section>

        <div className="mt-8 grid gap-8 lg:grid-cols-[18rem_1fr]">
          {/* ============ Sidebar ============ */}
          <aside className="flex flex-col gap-6 lg:sticky lg:top-6 lg:h-fit">
            <section className={`${card} p-5`}>
              <div className="flex items-center gap-3">
                {avatar ? (
                  <Image
                    src={avatar}
                    alt="Budi Santoso"
                    className="h-14 w-14 shrink-0 rounded-full object-cover"
                  />
                ) : (
                  <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-[#E6F2ED] text-[#0B4F3F]">
                    <UserRound size={24} />
                  </div>
                )}
                <div>
                  <h3 className="flex items-center gap-1.5 font-semibold">
                    Budi Santoso{" "}
                    <ShieldCheck size={15} className="text-[#0B4F3F]" />
                  </h3>
                  <p className="text-sm text-[#5B6675]">@budisantoso</p>
                  <span className="mt-1 inline-block rounded-full bg-[#E6F2ED] px-2 py-0.5 text-xs font-semibold text-[#0B4F3F]">
                    Skor Reputasi 98/100
                  </span>
                </div>
              </div>
            </section>

            <nav
              aria-label="Bagian pengaturan"
              className={`${card} flex flex-col gap-1 p-2`}
            >
              {menus.map(({ id, label, icon: Icon }) => {
                const active = activeSection === id;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => goTo(id)}
                    aria-current={active ? "true" : undefined}
                    className={`flex items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-left text-sm font-semibold transition-colors ${focus} ${
                      active
                        ? "bg-[#E6F2ED] text-[#0B4F3F]"
                        : "text-[#5B6675] hover:bg-[#F3F4F2] hover:text-[#111827]"
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <Icon size={18} /> {label}
                    </span>
                    <ChevronRight size={16} className="shrink-0" />
                  </button>
                );
              })}
            </nav>

            <section className={`${card} p-5`}>
              <h3 className="flex items-center gap-2 font-semibold">
                <Leaf size={18} className="text-[#0B4F3F]" /> Dampak Kumulatif
                Budi
              </h3>
              <p className="mt-1 text-sm text-[#5B6675]">
                Aktivitas sirkular dan pengiriman rendah emisi telah mereduksi:
              </p>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-[#F7F8F7] p-3">
                  <strong className="block">42,8 kg</strong>
                  <small className="text-[#5B6675]">CO₂e Tercegah</small>
                </div>
                <div className="rounded-xl bg-[#F7F8F7] p-3">
                  <strong className="block">3 Unit</strong>
                  <small className="text-[#5B6675]">
                    Perangkat Terselamatkan
                  </small>
                </div>
              </div>
            </section>
          </aside>

          {/* ============ Konten ============ */}
          <form onSubmit={save} className="flex flex-col gap-6">
            <SectionCard
              id="profil"
              title="1. Informasi Personal"
              description="Data publik dan identitas digital di ekosistem PakaiLagi."
              badge="Katalog Publik"
              registerRef={(el) => (sectionRefs.current.profil = el)}
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                {avatar ? (
                  <Image
                    src={avatar}
                    alt="Preview avatar"
                    className="h-20 w-20 shrink-0 rounded-full object-cover"
                  />
                ) : (
                  <div className="grid h-20 w-20 shrink-0 place-items-center rounded-full bg-[#E6F2ED] text-[#0B4F3F]">
                    <UserRound size={28} />
                  </div>
                )}
                <div>
                  <h3 className="font-semibold">Foto Tampilan Pengguna</h3>
                  <p className="mt-1 text-sm text-[#5B6675]">
                    JPG atau PNG maksimal 4 MB. Foto jernih meningkatkan
                    kepercayaan transaksi.
                  </p>
                  <div className="mt-3 flex items-center gap-2.5">
                    <button
                      type="button"
                      onClick={() => fileRef.current?.click()}
                      className={btnOutline}
                    >
                      <Camera size={16} /> Ganti Foto
                    </button>
                    <button
                      type="button"
                      onClick={() => setAvatar("")}
                      className={btnDanger}
                    >
                      <Trash2 size={16} /> Hapus
                    </button>
                    <input
                      ref={fileRef}
                      type="file"
                      accept="image/*"
                      onChange={selectAvatar}
                      className="hidden"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className={labelCls}>Nama Lengkap</span>
                  <input defaultValue="Budi Santoso" className={inputCls} />
                </label>
                <label className="block">
                  <span className={labelCls}>Username Publik</span>
                  <input defaultValue="budisantoso" className={inputCls} />
                  <small className="mt-1 block text-xs text-[#5B6675]">
                    pakailagi.id/u/budisantoso
                  </small>
                </label>
                <label className="block">
                  <span className={labelCls}>Email Terdaftar</span>
                  <input
                    type="email"
                    defaultValue="budi.santoso@circular.id"
                    className={inputCls}
                  />
                  <small className="mt-1 block text-xs text-[#5B6675]">
                    Email telah terverifikasi.
                  </small>
                </label>
                <label className="block">
                  <span className={labelCls}>Nomor WhatsApp / HP</span>
                  <input
                    defaultValue="+62 812-3456-7890"
                    className={inputCls}
                  />
                  <small className="mt-1 block text-xs text-[#5B6675]">
                    Untuk OTP dan notifikasi serah terima.
                  </small>
                </label>
                <label className="block sm:col-span-2">
                  <span className={labelCls}>Bio / Ringkasan Sirkular</span>
                  <textarea
                    rows={3}
                    defaultValue="Suka merapikan barang rumah dan memberi barang lama kesempatan kedua sebelum benar-benar dibuang."
                    className={inputCls}
                  />
                </label>
              </div>
            </SectionCard>

            <SectionCard
              id="alamat"
              title="2. Alamat & Titik Kurir"
              description="Alamat utama dan hub serah terima favoritmu."
              registerRef={(el) => (sectionRefs.current.alamat = el)}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block sm:col-span-2">
                  <span className={labelCls}>Nama Penerima</span>
                  <input defaultValue="Budi Santoso" className={inputCls} />
                </label>
                <label className="block sm:col-span-2">
                  <span className={labelCls}>Alamat Lengkap</span>
                  <textarea
                    rows={2}
                    defaultValue="Jl. Tebet Barat Dalam Raya No. 42, Jakarta Selatan 12810"
                    className={inputCls}
                  />
                </label>
                <label className="block">
                  <span className={labelCls}>Nomor Telepon</span>
                  <input
                    defaultValue="+62 812-3456-7890"
                    className={inputCls}
                  />
                </label>
                <label className="block">
                  <span className={labelCls}>Hub Serah Terima Favorit</span>
                  <select defaultValue="tebet" className={inputCls}>
                    <option value="tebet">Circular Hub Tebet</option>
                    <option value="depok">Circular Hub Depok</option>
                    <option value="bekasi">Circular Hub Bekasi</option>
                  </select>
                </label>
              </div>
            </SectionCard>

            <SectionCard
              id="serah-terima"
              title="3. Preferensi Serah Terima"
              description="Cara default barang sampai ke kamu dan bagaimana kode serah terima dikirimkan."
              registerRef={(el) => (sectionRefs.current["serah-terima"] = el)}
            >
              <fieldset>
                <legend className={labelCls}>Metode default</legend>
                <div className="mt-2 flex flex-col gap-2.5 text-sm">
                  {[
                    { id: "hub", label: "Ketemu langsung di Circular Hub" },
                    { id: "ev", label: "Diantar Kurir Motor Listrik" },
                    { id: "regular", label: "Reguler, kardus upcycled" },
                  ].map((opt) => (
                    <label key={opt.id} className="flex items-center gap-2.5">
                      <input
                        type="radio"
                        name="handoverPref"
                        checked={handoverPref === opt.id}
                        onChange={() => setHandoverPref(opt.id)}
                        className="h-4 w-4 border-[#CBD0D6] text-[#0B4F3F] focus-visible:outline-[#12705A]"
                      />
                      {opt.label}
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="mt-5 flex flex-col gap-3 border-t border-[#EDEFEC] pt-5">
                <p className={labelCls}>Kirim kode serah terima lewat</p>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-sm">
                    <Phone size={16} className="text-[#5B6675]" /> SMS
                  </span>
                  <Toggle
                    checked={notifyEmail}
                    onChange={setNotifyEmail}
                    label="Kode via SMS"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-sm">
                    <Bell size={16} className="text-[#5B6675]" /> WhatsApp
                  </span>
                  <Toggle
                    checked={notifyWhatsapp}
                    onChange={setNotifyWhatsapp}
                    label="Kode via WhatsApp"
                  />
                </div>
              </div>
            </SectionCard>

            <SectionCard
              id="preferensi"
              title="4. Preferensi Logistik Ramah Lingkungan"
              description="Prioritaskan pengiriman nol emisi dan kemasan sirkular."
              registerRef={(el) => (sectionRefs.current.preferensi = el)}
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#E6F2ED] text-[#0B4F3F]">
                      <Truck size={18} />
                    </span>
                    <div>
                      <b className="block text-sm">
                        Kurir Motor Listrik & Drop-off Stasiun
                      </b>
                      <p className="text-sm text-[#5B6675]">
                        Diprioritaskan saat memilih opsi serah terima.
                      </p>
                    </div>
                  </div>
                  <Toggle
                    checked={evDelivery}
                    onChange={setEvDelivery}
                    label="Kurir motor listrik"
                  />
                </div>
                <div className="flex items-center justify-between gap-4 border-t border-[#EDEFEC] pt-4">
                  <div className="flex items-start gap-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#E6F2ED] text-[#0B4F3F]">
                      <MessageSquareText size={18} />
                    </span>
                    <div>
                      <b className="block text-sm">Returnable Padded Sleeve</b>
                      <p className="text-sm text-[#5B6675]">
                        Kemasan serat daur ulang yang dikembalikan ke kurir.
                      </p>
                    </div>
                  </div>
                  <Toggle
                    checked={returnable}
                    onChange={setReturnable}
                    label="Kemasan returnable"
                  />
                </div>
              </div>
            </SectionCard>

            <SectionCard
              id="keamanan"
              title="5. Keamanan & Autentikasi"
              description="Perlindungan untuk akun dan aktivitas sirkularmu."
              registerRef={(el) => (sectionRefs.current.keamanan = el)}
            >
              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#E6F2ED] text-[#0B4F3F]">
                      <KeyRound size={18} />
                    </span>
                    <div>
                      <b className="block text-sm">Ubah Kata Sandi</b>
                      <p className="text-sm text-[#5B6675]">
                        Terakhir diperbarui dua bulan lalu.
                      </p>
                    </div>
                  </div>
                  <button type="button" className={btnOutline}>
                    Perbarui Sandi
                  </button>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#EDEFEC] pt-4">
                  <div className="flex items-start gap-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#E6F2ED] text-[#0B4F3F]">
                      <ShieldCheck size={18} />
                    </span>
                    <div>
                      <b className="block text-sm">
                        Autentikasi Dua Langkah (2FA)
                      </b>
                      <p className="text-sm text-[#5B6675]">
                        Wajib saat mengubah email, nomor HP, atau kata sandi.
                      </p>
                    </div>
                  </div>
                  <button type="button" className={btnOutline}>
                    Kelola 2FA
                  </button>
                </div>
              </div>
            </SectionCard>

            <SectionCard
              id="privasi"
              title="6. Privasi & Ekspor Data"
              description="Kendalikan visibilitas profil dan data yang tersimpan tentangmu."
              registerRef={(el) => (sectionRefs.current.privasi = el)}
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <b className="block text-sm">
                      Tampilkan profil di katalog publik
                    </b>
                    <p className="text-sm text-[#5B6675]">
                      Nama, foto, dan skor reputasi terlihat pembeli lain.
                    </p>
                  </div>
                  <Toggle
                    checked={publicProfile}
                    onChange={setPublicProfile}
                    label="Profil publik"
                  />
                </div>
                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#EDEFEC] pt-4">
                  <div>
                    <b className="block text-sm">Unduh data saya</b>
                    <p className="text-sm text-[#5B6675]">
                      Salinan profil, riwayat pesanan, dan paspor barangmu.
                    </p>
                  </div>
                  <button type="button" className={btnOutline}>
                    <Download size={16} /> Unduh Data
                  </button>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#F3D2D2] pt-4">
                  <div>
                    <b className="block text-sm text-[#B3261E]">Hapus Akun</b>
                    <p className="text-sm text-[#5B6675]">
                      Semua data dan riwayat transaksi akan dihapus permanen.
                    </p>
                  </div>
                  <button type="button" className={btnDanger}>
                    <Trash2 size={16} /> Hapus Akun
                  </button>
                </div>
              </div>
            </SectionCard>

            {/* ============ Bar simpan ============ */}
            <div
              className={`${card} sticky bottom-4 flex flex-wrap items-center justify-between gap-3 p-4`}
            >
              <span className="flex items-center gap-2 text-sm text-[#5B6675]">
                <Cloud size={16} /> Perubahan belum tersimpan sampai kamu klik
                simpan.
              </span>
              <div className="flex items-center gap-2.5">
                <button type="reset" className={btnOutline}>
                  Batal
                </button>
                <button type="submit" className={btnPrimary}>
                  <Save size={16} /> Simpan Pembaruan Profil
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>

      <MarketplaceFooter />

      {toast && (
        <div
          role="status"
          className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-xl bg-[#111827] px-4 py-2.5 text-sm font-medium text-white shadow-lg"
        >
          <Check size={18} /> Pengaturan berhasil diperbarui. Data masih
          bersifat dummy lokal.
        </div>
      )}
    </div>
  );
}
