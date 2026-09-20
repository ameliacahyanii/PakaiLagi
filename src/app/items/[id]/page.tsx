"use client";
import Link from "next/link";
import {
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
import { useParams } from "next/navigation";

/* ---------- Style tokens (shared dengan halaman lain) ---------- */
const display = "font-[family-name:var(--font-display,Georgia,serif)]";
const body = "font-[family-name:var(--font-body,system-ui,sans-serif)]";
const focus =
  "focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#12705A]";
const card =
  "rounded-2xl border border-[#E4E7EB] bg-white p-6 shadow-[0_1px_2px_rgba(17,24,39,0.04)]";

const images = [
  [
    "Tampak Depan & Baling-baling",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCaPaO73lRmP3vKSdqx6yH5mEB6AML0DexG0GkFXPde3AzvIAQGfLOWV0QUaYrSOp0GqN9FxRwgMc-3j3F7PMDNLGyM1bd7dq4sT9hJ1eQ_U-b658Y_jF1o_Ek4Hc8iY6F5ED7ILJTekbQQKl_lLVJzItA8NNhb6vUE7Ack8kMEbhL40yHA4UIRveC7HhWdPtWH3QpQkr3IhPFhwYjp1vH23SfP2iEzkfjF2Pg1ywZ-XCUcWqgaciYx",
  ],
  [
    "Pelindung & Motor",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCth0BBm-QRliEfC32wkJurPehafgwgYc2HMhwFcc-dknNXXvPJMG7iskaZSF18VWHQ-9vBNWxvf5NVj65JlyEor6_VJOfGY6pbYKChzETyfK-4cWIOkR6GMIQ0lMXrVEYrXPchGWnZ0diXSCOLfNuMnjuIfaDXSaFvcpAp8j8HlD5TvTv7WF0TcDNAcjHQVDPbtrV7l4KfDVWMrNwPVbQJUf8BQJDQsPYpor4aDiUmnVDhGK38lRx0",
  ],
  [
    "Panel Pengatur Kecepatan",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAx5WCQSyg2tjmNdr-EMjCPndUmUGrOnt33w7lTkirPEiPOC0uZ0FioWY0v6jaE0DZNvsytjYiH70SD9ZWfO04VLePNA4ePuZQtAkkCSpGruqqvQ2IyVtraVOs0ZswiWwwda8IhcqGmiuxDQQiZWP3DQCk6Fk8sGsFuhwYr-W9Y4o_Z6HxKhke9fwXrxXHSoo8vRwGSwJLC0ZOMX43YbCNvpA1WcE_4PbWZCG6sowhvJs9FNNJ4Jdip",
  ],
  [
    "Kabel & Dudukan",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuC1nd08sIUSP6LhY50BPS99yLGJFnIMQINafJ6nUUJV5OGjdD-Ler6fZaN-AYV6gQjIoIXJgHmtYVXq-Nsq4FQDjtLkp1bNb4U9yEbljRn6oE1_vbaICwe4HCCPrg98IZyBTwCZCg0dXT8vBgevEay9nHraK5iHY4UyLjDspZY6_JOABfcbyQSdCxEAoDZ_xU14r99mNbec7R9jZjFqoLyDLbEKY9bzwm5FY7UBOpJmyZTzHSnEaYVZ",
  ],
] as const;

const factors = [
  {
    name: "Fungsi Utama",
    weight: 35,
    score: 85,
    text: "Dinyatakan pemilik menyala normal di semua tingkat kecepatan.",
  },
  {
    name: "Kondisi Fisik",
    weight: 25,
    score: 68,
    text: "Pelindung baling-baling sedikit penyok, bodi masih kokoh.",
  },
  {
    name: "Kelengkapan Komponen",
    weight: 20,
    score: 90,
    text: "Kabel, dudukan, dan seluruh pelindung baling-baling tersedia.",
  },
  {
    name: "Usia Penggunaan",
    weight: 10,
    score: 60,
    text: "Dipakai sekitar dua tahun, disimpan di dalam ruangan.",
  },
  {
    name: "Riwayat Perbaikan",
    weight: 10,
    score: 35,
    text: "Belum pernah diperbaiki atau dibongkar sebelumnya.",
  },
];
const overallScore = Math.round(
  factors.reduce((sum, f) => sum + (f.score * f.weight) / 100, 0),
);

const toCheck = [
  "Kestabilan dudukan dan baut pengencang",
  "Fungsi pengatur kecepatan di semua tingkat",
  "Kekuatan pelindung baling-baling saat menyala",
];

const events = [
  {
    title: "Inspeksi Adaptif Selesai",
    date: "18 Sep 2026",
    text: "Pemilik menjawab pertanyaan inspeksi: fungsi motor normal, pelindung baling-baling sedikit penyok.",
  },
  {
    title: "Pembersihan Motor & Pengencangan Baut",
    date: "12 Jan 2025",
    text: "Perawatan ringan dilakukan mandiri oleh pemilik di rumah.",
  },
  {
    title: "Pembelian Baru oleh Pemilik Pertama",
    date: "15 Mar 2024",
    text: "Dibeli baru dan digunakan sehari-hari sejak saat itu.",
  },
];

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [active, setActive] = useState(0);
  const [chat, setChat] = useState(false);
  const [saved, setSaved] = useState(false);
  const [shared, setShared] = useState(false);

  async function handleShare() {
    const shareData = {
      title: "Kipas Angin Meja 16 Inci — PakaiLagi",
      text: "Lihat barang ini di PakaiLagi: Kipas Angin Meja 16 Inci, skor kondisi 74/100.",
      url: typeof window !== "undefined" ? window.location.href : "",
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
        return;
      }
      await navigator.clipboard?.writeText(shareData.url);
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    } catch {
      // Dibatalkan pengguna atau clipboard tidak tersedia - tidak perlu error.
    }
  }

  return (
    <div
      className={`${body} min-h-screen bg-[#F7F8F7] text-[#111827] antialiased`}
    >
      <MarketplaceHeader />
      <main className="mx-auto w-full max-w-[1200px] px-4 py-8 sm:px-6 sm:py-12">
        <div className="flex flex-wrap items-center gap-1.5 text-sm text-[#5B6675]">
          <Link
            href="/"
            className={`no-underline hover:!text-[#0B4F3F] hover:underline ${focus}`}
          >
            Katalog Sirkular
          </Link>
          <span>›</span>
          <Link
            href="/explore?category=electronics"
            className={`no-underline hover:!text-[#0B4F3F] hover:underline ${focus}`}
          >
            Elektronik Kecil
          </Link>
          <span>›</span>
          <b className="text-[#111827]">Kipas Angin Meja 16 Inci</b>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_22rem]">
          {/* ============ Kolom kiri ============ */}
          <div className="flex flex-col gap-6">
            <section className={card}>
              <img
                src={images[active][1]}
                alt={images[active][0]}
                className="aspect-[4/3] w-full rounded-xl object-cover"
              />
              <div className="mt-3 grid grid-cols-4 gap-2">
                {images.map((image, index) => {
                  const isActive = active === index;
                  return (
                    <button
                      key={image[0]}
                      type="button"
                      aria-current={isActive}
                      aria-label={image[0]}
                      onClick={() => setActive(index)}
                      className={`overflow-hidden rounded-lg border-2 transition-colors ${focus} ${
                        isActive ? "border-[#0B4F3F]" : "border-transparent"
                      }`}
                    >
                      <img
                        src={image[1]}
                        alt=""
                        className="aspect-square w-full object-cover"
                      />
                    </button>
                  );
                })}
              </div>
              <p className="mt-2 text-sm text-[#5B6675]">{images[active][0]}</p>
            </section>

            <section className={card}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className={`${display} text-xl font-normal`}>
                    Skor Kondisi & Transparansi
                  </h2>
                  <p className="mt-1 text-sm text-[#5B6675]">
                    Dihitung dari inspeksi adaptif dan deklarasi penjual — bukan
                    pengujian fisik oleh teknisi.
                  </p>
                </div>
                <p className="flex shrink-0 items-baseline gap-1">
                  <span className={`${display} text-4xl font-normal`}>
                    {overallScore}
                  </span>
                  <span className="text-sm text-[#5B6675]">/100</span>
                </p>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {factors.map((f) => (
                  <div key={f.name}>
                    <div className="flex items-baseline justify-between text-sm">
                      <span className="font-semibold">
                        {f.name}{" "}
                        <span className="font-normal text-[#5B6675]">
                          ({f.weight}%)
                        </span>
                      </span>
                      <span className="font-semibold">{f.score}/100</span>
                    </div>
                    <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-[#EDEFEC]">
                      <div
                        className="h-full rounded-full bg-[#12705A]"
                        style={{ width: `${f.score}%` }}
                      />
                    </div>
                    <p className="mt-1.5 text-xs text-[#5B6675]">{f.text}</p>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-xl bg-[#F7F8F7] p-4">
                <b className="text-sm">
                  Perlu diperiksa langsung saat serah terima:
                </b>
                <ul className="mt-2 space-y-1 text-sm text-[#5B6675]">
                  {toCheck.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#5B6675]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section className={card}>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <small className="text-xs font-semibold tracking-wide text-[#5B6675]">
                    CIRCULAR PASSPORT
                  </small>
                  <h3 className={`${display} text-lg font-normal`}>
                    #PKL-2026-0245
                  </h3>
                  <span className="text-sm text-[#0B4F3F]">
                    ● Status: Aktif Dijual Kembali
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-sm text-[#5B6675]">
                  <Leaf size={16} className="text-[#0B4F3F]" />
                  <span>
                    Estimasi potensi ~4,8 kg CO₂e{" "}
                    <span className="block text-xs">
                      (tercatat resmi setelah serah terima selesai)
                    </span>
                  </span>
                </div>
              </div>
              <div className="mt-5 flex flex-col gap-4 border-l-2 border-[#E6F2ED] pl-4">
                {events.map((event) => (
                  <article key={event.title}>
                    <b className="block text-sm">{event.title}</b>
                    <small className="text-[#5B6675]">{event.date}</small>
                    <p className="mt-1 text-sm text-[#5B6675]">{event.text}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className={card}>
              <h2 className={`${display} text-xl font-normal`}>
                Deskripsi & Spesifikasi
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[#5B6675]">
                Kipas angin meja tangan pertama, dipakai untuk kebutuhan
                sehari-hari di kamar kos dan selalu disimpan di dalam ruangan.
              </p>
              <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {[
                  "Daya: 45 Watt",
                  "3 tingkat kecepatan",
                  "Diameter: 16 inci",
                  "Kabel: 1,5 meter",
                ].map((spec) => (
                  <div
                    key={spec}
                    className="rounded-lg bg-[#F7F8F7] px-3 py-2 text-center text-xs font-medium text-[#111827]"
                  >
                    {spec}
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* ============ Kolom kanan ============ */}
          <aside className="flex flex-col gap-6">
            <section className={card}>
              <div className="flex items-center justify-between text-sm">
                <span className="rounded-full bg-[#E6F2ED] px-2.5 py-1 font-semibold text-[#0B4F3F]">
                  Elektronik Kecil
                </span>
                <span className="text-[#5B6675]">● Stok: 1</span>
              </div>
              <h1
                className={`${display} mt-3 text-2xl font-normal leading-snug`}
              >
                Kipas Angin Meja 16 Inci (Tangan Pertama, Fungsi Normal)
              </h1>

              <div className="mt-4 rounded-xl bg-[#F7F8F7] p-4">
                <span className="text-xs font-semibold text-[#5B6675]">
                  Harga Jual Transparan
                </span>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-2xl font-bold">Rp 110.000</span>
                  <s className="text-sm text-[#5B6675]">Rp 140.000</s>
                </div>
              </div>

              <div className="mt-3 flex items-start gap-2.5 rounded-xl bg-[#F7F8F7] p-3.5 text-sm text-[#5B6675]">
                <Verified
                  size={18}
                  className="mt-0.5 shrink-0 text-[#0B4F3F]"
                />
                Periksa langsung kondisi barang saat serah terima sebelum
                mengonfirmasi kode.
              </div>

              <div className="mt-4 flex flex-col gap-2.5">
                <Link
                  href="/checkout"
                  className={`flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#0B4F3F] !text-white no-underline transition-colors hover:bg-[#083D31] ${focus}`}
                >
                  <ShoppingBag size={18} /> Beli Sekarang
                </Link>
                <div className="flex items-center gap-2.5">
                  <Link
                    href={`/chat?item=${id}`}
                    className={`flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-[#E4E7EB] text-sm font-semibold !text-[#111827] no-underline transition-colors hover:border-[#0B4F3F] ${focus}`}
                  >
                    <MessageCircle size={18} /> Chat Penjual
                  </Link>
                  <button
                    type="button"
                    onClick={() => setSaved((v) => !v)}
                    aria-pressed={saved}
                    aria-label={
                      saved ? "Hapus dari wishlist" : "Simpan ke wishlist"
                    }
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition-colors ${
                      saved
                        ? "border-[#0B4F3F] text-[#0B4F3F]"
                        : "border-[#E4E7EB] text-[#111827] hover:border-[#0B4F3F]"
                    } ${focus}`}
                  >
                    <Heart size={18} fill={saved ? "currentColor" : "none"} />
                  </button>
                  <button
                    type="button"
                    onClick={handleShare}
                    aria-label="Bagikan barang ini"
                    className={`relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#E4E7EB] text-[#111827] transition-colors hover:border-[#0B4F3F] ${focus}`}
                  >
                    <Share2 size={18} />
                    {shared && (
                      <span className="absolute -top-9 right-0 whitespace-nowrap rounded-lg bg-[#111827] px-2.5 py-1 text-xs font-semibold text-white">
                        Link tersalin!
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </section>

            <section className={card}>
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#E6F2ED] text-[#0B4F3F]">
                  <UserRound size={20} />
                </span>
                <div>
                  <h3 className="flex items-center gap-1.5 font-semibold">
                    Rian Pratama{" "}
                    <Verified size={15} className="text-[#0B4F3F]" />
                  </h3>
                  <span className="flex items-center gap-1 text-sm text-[#5B6675]">
                    <Star
                      size={13}
                      fill="currentColor"
                      className="text-[#C29A4B]"
                    />
                    4,9 (42 ulasan)
                  </span>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 divide-x divide-[#EDEFEC] text-center">
                <div>
                  <strong className="block">18</strong>
                  <span className="text-xs text-[#5B6675]">Tersalurkan</span>
                </div>
                <div>
                  <strong className="block">&lt;15m</strong>
                  <span className="text-xs text-[#5B6675]">Balas</span>
                </div>
                <div>
                  <strong className="block">100%</strong>
                  <span className="text-xs text-[#5B6675]">Sukses</span>
                </div>
              </div>
            </section>

            <section className={card}>
              <h3 className="flex items-center gap-2 font-semibold">
                <Truck size={18} className="text-[#0B4F3F]" /> Opsi Serah Terima
              </h3>
              <div className="mt-3 flex flex-col gap-3 text-sm">
                <div>
                  <b>Circular Hub Tebet</b>
                  <p className="text-[#5B6675]">Ketemu langsung. Gratis.</p>
                </div>
                <div>
                  <b>Kurir Motor Listrik</b>
                  <p className="text-[#5B6675]">
                    Tiba maksimal 3 jam. Rp25.000.
                  </p>
                </div>
                <div>
                  <b>Reguler Kardus Upcycled</b>
                  <p className="text-[#5B6675]">
                    Kemasan guna ulang. Rp14.000.
                  </p>
                </div>
              </div>
            </section>
          </aside>
        </div>
      </main>
      <MarketplaceFooter />

      {chat && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Chat dengan penjual"
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 p-4"
        >
          <div className={`${card} w-full max-w-sm`}>
            <h3 className="font-semibold">Chat dengan Rian Pratama</h3>
            <p className="mt-1 text-sm text-[#5B6675]">
              Tanyakan kondisi, kelengkapan, atau jadwal serah terima.
            </p>
            <textarea
              defaultValue="Halo, apakah kipas anginnya masih tersedia?"
              className={`mt-3 min-h-24 w-full rounded-xl border border-[#E4E7EB] p-3 text-sm ${focus}`}
            />
            <div className="mt-3 flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => setChat(false)}
                className={`flex min-h-11 flex-1 items-center justify-center rounded-xl border border-[#E4E7EB] text-sm font-semibold text-[#111827] ${focus}`}
              >
                Batal
              </button>
              <button
                type="button"
                onClick={() => setChat(false)}
                className={`flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-[#0B4F3F] !text-white no-underline ${focus}`}
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
