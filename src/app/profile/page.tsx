"use client";
import Link from "next/link";
import {
  CheckCircle,
  ChevronRight,
  Edit3,
  FileDown,
  Handshake,
  Leaf,
  MessageCircle,
  Settings,
  ShieldCheck,
  Timer,
  Truck,
  UserRound,
  Wrench,
} from "lucide-react";
import { useState } from "react";
import {
  MarketplaceFooter,
  MarketplaceHeader,
} from "@/components/marketplace/MarketplaceShell";
import { userOrders } from "@/data/profile-data";
import Image from "next/image";

/* ---------- Style tokens (shared dengan halaman lain) ---------- */
const display = "font-[family-name:var(--font-display,Georgia,serif)]";
const body = "font-[family-name:var(--font-body,system-ui,sans-serif)]";
const focus =
  "focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#12705A]";
const card =
  "rounded-2xl border border-[#E4E7EB] bg-white p-6 shadow-[0_1px_2px_rgba(17,24,39,0.04)]";
const btnPrimary = `inline-flex min-h-10 items-center justify-center gap-2 rounded-xl bg-[#0B4F3F] px-4 text-sm font-semibold !text-white no-underline transition-colors hover:bg-[#083D31] ${focus}`;
const btnSecondary = `inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-[#E4E7EB] px-4 text-sm font-semibold !text-[#111827] no-underline transition-colors hover:border-[#0B4F3F] ${focus}`;

const avatar =
  "https://lh3.googleusercontent.com/aida/AEtjO1VsL4Uy_rEEcCiUaFltDZ333A5shhHFn1AMYQlnQL7MY5gYE-FXSOTr1XLOlZvCgaTUZaXapoHq0ddHfNn_HEDVz9lCPOZIr4uPfaDkOnkEd4esTncIF0nriXO_O5_vQyPqwlvzmL1X-04oTJYQP89b6hXh18mNNJys7neklPchpkYUgyX2qlZDglHLGdo8GitoIpT3CtBh8tlmbTk8kDIBWSGWagZepNCFHMhNQg4k3wa4-IDdnd7M4Q";

const achievements = [
  {
    icon: Leaf,
    title: "Pionir Zero Waste",
    text: "Mencegah lebih dari 25 kg emisi",
  },
  {
    icon: Handshake,
    title: "Negosiator Adil",
    text: "Transaksi tanpa sengketa",
  },
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

const tabs = [
  { id: "activity", label: "Aktivitas & Pesanan" },
  { id: "wishlist", label: "Wishlist" },
  { id: "offers", label: "Nego Aktif" },
  { id: "passport", label: "Paspor Barang" },
];

const xpCurrent = 680;
const xpTarget = 1000;
const xpPercent = Math.round((xpCurrent / xpTarget) * 100);

const money = (value: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);

export default function UserProfilePage() {
  const [tab, setTab] = useState("activity");
  const [toast, setToast] = useState("");
  const [avatarFailed, setAvatarFailed] = useState(false);

  function notify(message: string) {
    setToast(message);
    setTimeout(() => setToast(""), 2500);
  }

  return (
    <div
      className={`${body} min-h-screen bg-[#F7F8F7] text-[#111827] antialiased`}
    >
      <MarketplaceHeader />
      <main className="mx-auto w-full max-w-[1200px] px-4 py-8 sm:px-6 sm:py-12">
        {/* ============ Hero profil ============ */}
        <section
          className={`${card} flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between`}
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            {avatarFailed ? (
              <div className="grid h-20 w-20 shrink-0 place-items-center rounded-full bg-[#E6F2ED] text-[#0B4F3F]">
                <UserRound size={32} />
              </div>
            ) : (
              <Image
                src={avatar}
                alt="Budi Santoso"
                onError={() => setAvatarFailed(true)}
                className="h-20 w-20 shrink-0 rounded-full object-cover"
              />
            )}
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className={`${display} text-2xl font-normal`}>
                  Budi Santoso
                </h1>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E6F2ED] px-2.5 py-1 text-xs font-semibold text-[#0B4F3F]">
                  <ShieldCheck size={13} /> Profil Terverifikasi
                </span>
              </div>
              <div className="mt-1 flex flex-wrap gap-x-2 gap-y-1 text-sm text-[#5B6675]">
                <span>Tebet, Jakarta Selatan</span>
                <span>· Bergabung Maret 2024</span>
                <span>· Trust Index 99,4%</span>
              </div>
              <div className="mt-3 w-full max-w-xs">
                <div className="flex items-center justify-between text-sm">
                  <b>Eco-Citizen Tier 2</b>
                  <small className="text-[#5B6675]">
                    {xpCurrent} / {xpTarget} XP ke Tier 3
                  </small>
                </div>
                <div
                  className="mt-1.5 h-2 overflow-hidden rounded-full bg-[#EDEFEC]"
                  role="progressbar"
                  aria-valuenow={xpPercent}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label="Progres menuju Eco-Citizen Tier 3"
                >
                  <div
                    className="h-full rounded-full bg-[#0B4F3F]"
                    style={{ width: `${xpPercent}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/settings" className={btnSecondary}>
              <Edit3 size={16} /> Edit Profil
            </Link>
            <Link
              href="/settings"
              aria-label="Pengaturan"
              className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-[#E4E7EB] !text-[#111827] no-underline transition-colors hover:border-[#0B4F3F] ${focus}`}
            >
              <Settings size={18} />
            </Link>
            <Link href="/sellers/rian-pratama" className={btnPrimary}>
              Buka Portal Penjual
            </Link>
          </div>
        </section>

        {/* ============ Paspor dampak pribadi ============ */}
        <section className="mt-8">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <h2 className={`${display} text-xl font-normal`}>
                Paspor Dampak Sirkular Pribadi
              </h2>
              <span className="rounded-full bg-[#E6F2ED] px-2.5 py-1 text-xs font-semibold text-[#0B4F3F]">
                Buku Besar Terbuka
              </span>
            </div>
            <small className="text-[#5B6675]">
              Audit terakhir: Hari ini, 14.10 WIB
            </small>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {[
              {
                label: "Jejak Emisi Dicegah",
                value: "38,6 kg CO₂e",
                note: "Setara menanam 3 pohon",
              },
              {
                label: "Dialihkan dari TPA",
                value: "4 Perangkat",
                note: "Elektronik aktif kembali",
              },
              {
                label: "Poin Sirkular Aktif",
                value: "850 Pts",
                note: "Tukar voucher logistik EV",
              },
              {
                label: "Serah Terima Selesai",
                value: "12 Pesanan",
                note: "100% kode terkonfirmasi",
              },
            ].map((item) => (
              <div key={item.label} className={card}>
                <small className="text-xs text-[#5B6675]">{item.label}</small>
                <strong
                  className={`${display} mt-1 block text-2xl font-normal`}
                >
                  {item.value}
                </strong>
                <span className="text-xs text-[#5B6675]">{item.note}</span>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_20rem]">
          {/* ============ Kolom utama ============ */}
          <section className="flex flex-col gap-4">
            <div
              role="tablist"
              aria-label="Bagian profil"
              className={`${card} flex flex-wrap gap-1 p-1.5`}
            >
              {tabs.map((item) => {
                const active = tab === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setTab(item.id)}
                    className={`min-h-9 flex-1 rounded-lg px-3 text-sm font-semibold whitespace-nowrap transition-colors ${focus} ${
                      active
                        ? "bg-[#E6F2ED] text-[#0B4F3F]"
                        : "text-[#5B6675] hover:bg-[#F3F4F2] hover:text-[#111827]"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>

            {tab === "activity" &&
              userOrders.map((order) => (
                <article key={order.id} className={card}>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <b className="text-sm">#{order.id}</b>
                      <span className="rounded-full bg-[#F3F4F2] px-2 py-0.5 text-xs font-semibold text-[#5B6675]">
                        {order.category}
                      </span>
                    </div>
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#E6F2ED] px-2.5 py-1 text-xs font-semibold text-[#0B4F3F]">
                      <CheckCircle size={13} /> {order.status}
                    </span>
                  </div>

                  <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-start">
                    <Image
                      src={order.image}
                      alt={order.title}
                      className="h-20 w-20 shrink-0 rounded-xl object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold">{order.title}</h3>
                      <p className="mt-1 text-sm text-[#5B6675]">
                        Skor kondisi {order.score}/100 · dinilai lewat inspeksi
                        adaptif dan tercatat di Circular Passport.
                      </p>
                      <span className="mt-2 inline-block rounded-full bg-[#F3F4F2] px-2.5 py-1 text-xs font-semibold text-[#5B6675]">
                        {order.impact}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="block text-lg font-bold">
                        {money(order.price)}
                      </span>
                      <small className="text-[#5B6675]">
                        Serah Terima Terverifikasi
                      </small>
                    </div>
                  </div>

                  {order.active && (
                    <div className="mt-4 rounded-xl bg-[#F7F8F7] p-3.5">
                      <b className="text-sm">
                        Estimasi tiba besok via Kurir Motor Listrik
                      </b>
                      <div className="mt-2 flex gap-1.5">
                        {[true, true, true, false].map((done, i) => (
                          <span
                            key={i}
                            className={`h-1.5 flex-1 rounded-full ${
                              done ? "bg-[#0B4F3F]" : "bg-[#E4E7EB]"
                            }`}
                          />
                        ))}
                      </div>
                      <small className="mt-1.5 block text-xs text-[#5B6675]">
                        Verifikasi Pesanan · Jadwal Serah Terima · Kurir
                        Sirkular · Konfirmasi Kode
                      </small>
                    </div>
                  )}

                  <div className="mt-4 flex items-center gap-2.5">
                    <button
                      type="button"
                      onClick={() =>
                        notify(
                          order.active
                            ? "Membuka percakapan penjual..."
                            : "Paspor digital siap diunduh.",
                        )
                      }
                      className={btnSecondary}
                    >
                      {order.active ? (
                        <MessageCircle size={16} />
                      ) : (
                        <FileDown size={16} />
                      )}
                      {order.active
                        ? "Hubungi Penjual"
                        : "Unduh Paspor Digital"}
                    </button>
                    <Link
                      href={order.active ? "/status" : "/explore"}
                      className={btnPrimary}
                    >
                      {order.active ? "Lacak Pesanan" : "Jual Ulang Nanti"}
                    </Link>
                  </div>
                </article>
              ))}

            {tab !== "activity" && (
              <div className={card}>
                <h3 className="font-semibold">
                  {tab === "wishlist"
                    ? "Wishlist Produk"
                    : tab === "offers"
                      ? "Penawaran Aktif"
                      : "Paspor Barang Digital"}
                </h3>
                <p className="mt-1 text-sm text-[#5B6675]">
                  Bagian ini masih memakai data contoh dan akan dihubungkan ke
                  data asli pada tahap integrasi.
                </p>
                <Link href="/explore" className={`${btnPrimary} mt-3`}>
                  Jelajahi Katalog
                </Link>
              </div>
            )}
          </section>

          {/* ============ Sidebar ============ */}
          <aside className="flex flex-col gap-6">
            <section className={card}>
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Badge & Pencapaian</h3>
                <span className="rounded-full bg-[#E6F2ED] px-2.5 py-1 text-xs font-semibold text-[#0B4F3F]">
                  {achievements.length} Diperoleh
                </span>
              </div>
              <div className="mt-4 flex flex-col gap-3.5">
                {achievements.map(({ icon: Icon, title, text }) => (
                  <div key={title} className="flex items-start gap-3">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#E6F2ED] text-[#0B4F3F]">
                      <Icon size={18} />
                    </span>
                    <div>
                      <b className="block text-sm">{title}</b>
                      <small className="text-[#5B6675]">{text}</small>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className={card}>
              <h3 className="font-semibold">Rekomendasi Berkelanjutan</h3>
              <p className="mt-1 text-sm text-[#5B6675]">
                Berdasarkan Kipas Angin Meja yang kamu beli.
              </p>
              <div className="mt-3 flex flex-col gap-2.5">
                {[
                  {
                    name: "Kabel Ekstensi 3 Meter",
                    note: "Bekas layak pakai · Hemat 0,4 kg CO₂e",
                    price: 25_000,
                  },
                  {
                    name: "Kain Lap Mikrofiber Upcycled",
                    note: "Bahan daur ulang · Zero-waste craft",
                    price: 15_000,
                  },
                ].map((item) => (
                  <Link
                    key={item.name}
                    href="/explore"
                    className={`flex items-center justify-between gap-3 rounded-xl border border-[#E4E7EB] p-3 no-underline transition-colors hover:border-[#0B4F3F] ${focus}`}
                  >
                    <div>
                      <b className="block text-sm !text-[#111827]">
                        {item.name}
                      </b>
                      <small className="text-[#5B6675]">{item.note}</small>
                      <span className="mt-1 block text-sm font-semibold !text-[#111827]">
                        {money(item.price)}
                      </span>
                    </div>
                    <ChevronRight
                      size={18}
                      className="shrink-0 text-[#5B6675]"
                    />
                  </Link>
                ))}
              </div>
              <Link href="/explore" className={`${btnSecondary} mt-3 w-full`}>
                Jelajahi Aksesori
              </Link>
            </section>

            <section className={card}>
              <div className="flex items-start gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#E6F2ED] text-[#0B4F3F]">
                  <Wrench size={18} />
                </span>
                <div>
                  <b className="block text-sm">
                    Butuh Servis atau Suku Cadang?
                  </b>
                  <small className="text-[#5B6675]">
                    Akses mitra reparasi bersertifikat
                  </small>
                </div>
              </div>
            </section>
          </aside>
        </div>
      </main>
      <MarketplaceFooter />

      {toast && (
        <div
          role="status"
          className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-xl bg-[#111827] px-4 py-2.5 text-sm font-medium text-white shadow-lg"
        >
          {toast}
        </div>
      )}
    </div>
  );
}
