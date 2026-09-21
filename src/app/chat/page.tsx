"use client";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle,
  ChevronLeft,
  ImagePlus,
  Leaf,
  LockKeyhole,
  Search,
  Send,
  ShieldCheck,
  ShoppingBag,
  Store,
  Verified,
} from "lucide-react";
import { type FormEvent, useEffect, useMemo, useRef, useState } from "react";
import {
  MarketplaceFooter,
  MarketplaceHeader,
} from "@/components/marketplace/MarketplaceShell";
import { Dialog, Field } from "@/components/ui/Dialog";
import {
  badge,
  btnLinkPrimary,
  btnLinkSecondary,
  btnPrimary,
  btnSecondary,
  card,
  container,
  display,
  focus,
  input,
  money,
  pageBg,
  segTab,
  segmented,
} from "@/components/ui/tokens";
import { useToast } from "@/components/ui/useToast";

/* ---------- Data ---------- */
type Role = "buy" | "sell";
type Conversation = {
  id: string;
  name: string;
  product: string;
  message: string;
  role: Role;
};

const conversations: Conversation[] = [
  {
    id: "rian",
    name: "Rian Pratama",
    product: "Sony Alpha A6000 Kit",
    message: "Bodi mulus, sensor aman sesuai audit AI.",
    role: "buy",
  },
  {
    id: "ergonomis",
    name: "Toko Ergonomis ID",
    product: "Kursi Kerja Mesh Sihoo V1",
    message: "Resi pick-up kurir hijau sudah aktif.",
    role: "buy",
  },
  {
    id: "hendra",
    name: "Hendra Wijaya",
    product: "Sepeda Lipat Polygon",
    message: "Transaksi selesai dan poin diterima.",
    role: "sell",
  },
  {
    id: "mitra",
    name: "Mitra Sirkular Peduli",
    product: "Donasi Blender Philips",
    message: "Jadwal penjemputan telah dikonfirmasi.",
    role: "sell",
  },
];

const listFilters: { id: "all" | Role; label: string }[] = [
  { id: "all", label: "Semua" },
  { id: "buy", label: "Membeli" },
  { id: "sell", label: "Menjual" },
];

const avatar =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCnSgT6ntJ6UboX-7-1XpKemiFB3EMdoV3S3fuBrouBxZNBa4dfZBMB5xefxIZgNosuW0L_2chHoFbXsntH7RmuQLUgXi7YrwyZ6NaO_JSSF61NGcdUnbMKgITAY1eyriBjOiZDnkPPBnpQuR_ldrq9oSihGA9trwzRyCtGs5AMGb2sDMib8y3tshTCmfA43adZoPYQmYf8iL_YJ8kkAOFp4fNgyKGpUZpyVsVtmOQViP2rGF-0QJjq";
const camera =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDSOY1qIndK-tt_rZo4FGyFdzvlthR_JxEVghNC8C0_cl9JTR0ugA7uC4NdsAI_A_zu0pvgAZ8AVlHLDL38BQ4_z6IY7TW85OkpIBBPPrbkSmSUJ3Z2zaxBszVZcvdwm8ch119BCb-c6y8R5yGckTUYmN9zG65LWCdkLJuZnmjDHEPimGkc264vwVjYKEdfcMYUPvcMgdD-ElaJUZzOlE7ajcykGPXLDg7ISGZZWLgiel2Xz3cYZS6k";
const inspection = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCem4TRib48iebKBlX6gBzoflqW-0hPas9UX8PPRaZhnHQ68ygFeEdINzpfuRMemXoKo_KiST-v0YNmcRrwlgoqcy9WVrTcjd0KDPNsHukCyQpbkmWsDjqcqqhwKYFdpqalJ5R1OOX3qI3UjRg0Db9dbvHhnosxzHnYuXny1i5khOyp7iekXB5OZDy2is2u8R4kHbgdTHkUxETCWp_-H3LyGVMXlplz8gOVdikLTgopSW9S7HlZQGm0",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDSNUKBXueX5K4pdy29wp5bDS39D_BsQmzYA2VmTZMT0Ga6D_ixGVsgu6pF3wh-Ch0WG6G5jrya1oFmZxud0otWGUc491k2ioYdz7VRffubxpKWiyOOsoMGtOEa4LvsPTxEPVE5vWRXUdY4zftWSZZDbyo7CdghPQOzhNRIRJO-i3ZzDUJ0mgXzJ8gmYhrAHvccs0GPwA3KlH19UhA4IhlFT7DEVKM9anR2os7Ipww4oMDiLRxhpvha",
];

type Bubble = {
  from: "buyer" | "seller";
  text: string;
  time?: string;
  attachments?: string[];
};

const rianThread: Bubble[] = [
  {
    from: "buyer",
    text: "Halo Mas Rian, apakah optik dan sensor benar-benar bebas jamur dan debu?",
    time: "14:15 ✓✓",
  },
  {
    from: "seller",
    text: "Halo Kak Budi. Kamera selalu disimpan di dry box 45% RH. Sensor mulus dan AF responsif.",
    time: "14:18",
  },
  {
    from: "seller",
    text: "Ini hasil test shutter terakhir. Shutter count 8.450 dan lensa memakai filter UV sejak awal.",
    time: "14:20",
    attachments: inspection,
  },
];

const quickReplies = [
  "Minta Foto Sudut Lain",
  "Tawar Rp4.500.000",
  "Tanya COD Sirkular",
  "Tanya Baterai Cadangan",
];

const initials = (name: string) =>
  name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

function Avatar({
  name,
  src,
  size = "h-11 w-11",
}: {
  name: string;
  src?: string;
  size?: string;
}) {
  const [failed, setFailed] = useState(false);
  if (src && !failed) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={name}
        onError={() => setFailed(true)}
        className={`${size} shrink-0 rounded-full object-cover`}
      />
    );
  }
  return (
    <span
      aria-hidden="true"
      className={`${size} grid shrink-0 place-items-center rounded-full bg-[#E6F2ED] text-sm font-semibold text-[#0B4F3F]`}
    >
      {initials(name)}
    </span>
  );
}

/* ---------- Halaman ---------- */
export default function ChatPage() {
  const [activeId, setActiveId] = useState("rian");
  const [showChat, setShowChat] = useState(true); // khusus layar kecil
  const [listFilter, setListFilter] = useState<"all" | Role>("all");
  const [query, setQuery] = useState("");
  const [text, setText] = useState("");
  const [sent, setSent] = useState<Record<string, string[]>>({});
  const [offerOpen, setOfferOpen] = useState(false);
  const { notify, toast } = useToast();

  const messagesRef = useRef<HTMLDivElement>(null);
  const composerRef = useRef<HTMLInputElement>(null);

  const active =
    conversations.find((c) => c.id === activeId) ?? conversations[0];
  const isRian = active.id === "rian";
  const mySent = sent[active.id] ?? [];

  const visibleConversations = useMemo(() => {
    const q = query.trim().toLowerCase();
    return conversations.filter(
      (c) =>
        (listFilter === "all" || c.role === listFilter) &&
        (!q ||
          c.name.toLowerCase().includes(q) ||
          c.product.toLowerCase().includes(q)),
    );
  }, [listFilter, query]);

  // Scroll ke pesan terbaru di dalam panel (bukan seluruh halaman)
  useEffect(() => {
    const el = messagesRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [mySent.length, activeId]);

  function addMessage(value: string) {
    setSent((s) => ({ ...s, [active.id]: [...(s[active.id] ?? []), value] }));
  }

  function send(e?: FormEvent) {
    e?.preventDefault();
    const value = text.trim();
    if (!value) return;
    addMessage(value);
    setText("");
  }

  function openConversation(id: string) {
    setActiveId(id);
    setShowChat(true);
    setText("");
  }

  const thread: Bubble[] = isRian
    ? rianThread
    : [{ from: "seller", text: active.message }];

  return (
    <div className={pageBg}>
      <MarketplaceHeader />
      <main
        className={`${container} flex flex-col gap-5 pt-6 pb-16 sm:pt-8 sm:pb-24`}
      >
        {/* Konteks */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/explore"
            className={`inline-flex items-center gap-1.5 text-sm font-semibold !text-[#5B6675] no-underline hover:!text-[#0B4F3F] ${focus}`}
          >
            <ArrowLeft size={16} /> Kembali ke Katalog
          </Link>
          <span className={badge}>
            <ShieldCheck size={14} /> Safe Escrow Aktif
          </span>
        </div>

        <div className="grid gap-5 lg:h-[720px] lg:grid-cols-[340px_minmax(0,1fr)]">
          {/* ============ Daftar percakapan ============ */}
          <section
            aria-label="Daftar percakapan"
            className={`${card} ${showChat ? "hidden lg:flex" : "flex"} min-h-[70vh] flex-col overflow-hidden lg:min-h-0`}
          >
            <div className="space-y-3 border-b border-[#EDEFEC] p-4">
              <div className="flex items-center justify-between gap-2">
                <h1
                  className={`${display} text-[1.6rem] leading-none font-normal`}
                >
                  Pesan & diskusi
                </h1>
                <span className={badge}>{conversations.length} Aktif</span>
              </div>
              <label className="relative block">
                <span className="sr-only">Cari penjual atau barang</span>
                <Search
                  size={17}
                  className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-[#5B6675]"
                />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Cari penjual atau barang..."
                  className={`${input} pl-10`}
                />
              </label>
              <div
                role="group"
                aria-label="Filter percakapan"
                className={`${segmented} w-full`}
              >
                {listFilters.map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    aria-pressed={listFilter === f.id}
                    onClick={() => setListFilter(f.id)}
                    className={`${segTab(listFilter === f.id)} flex-1 justify-center px-2`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            <ul className="flex-1 overflow-y-auto p-2">
              {visibleConversations.length === 0 && (
                <li className="px-4 py-12 text-center text-sm text-[#5B6675]">
                  Tidak ada percakapan yang cocok.
                </li>
              )}
              {visibleConversations.map((item) => {
                const selected = item.id === activeId;
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      aria-current={selected ? "true" : undefined}
                      onClick={() => openConversation(item.id)}
                      className={`flex w-full cursor-pointer items-start gap-3 rounded-xl p-3 text-left transition-colors ${focus} ${
                        selected ? "bg-[#E6F2ED]" : "hover:bg-[#F3F4F2]"
                      }`}
                    >
                      <Avatar
                        name={item.name}
                        src={item.id === "rian" ? avatar : undefined}
                      />
                      <span className="min-w-0 flex-1">
                        <b className="block truncate text-[0.95rem] font-semibold">
                          {item.name}
                        </b>
                        <span className="block truncate text-xs font-semibold text-[#0B4F3F]">
                          {item.product}
                        </span>
                        <span className="mt-0.5 block truncate text-sm text-[#5B6675]">
                          {item.message}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </section>

          {/* ============ Panel chat ============ */}
          <section
            aria-label={`Percakapan dengan ${active.name}`}
            className={`${card} ${showChat ? "flex" : "hidden lg:flex"} min-h-[80vh] min-w-0 flex-col overflow-hidden lg:min-h-0`}
          >
            <header className="flex items-center justify-between gap-3 border-b border-[#EDEFEC] px-4 py-3 sm:px-5">
              <div className="flex min-w-0 items-center gap-3">
                <button
                  type="button"
                  onClick={() => setShowChat(false)}
                  aria-label="Kembali ke daftar pesan"
                  className={`grid h-9 w-9 shrink-0 cursor-pointer place-items-center rounded-lg text-[#5B6675] hover:bg-[#F3F4F2] lg:hidden ${focus}`}
                >
                  <ChevronLeft size={20} />
                </button>
                <Avatar name={active.name} src={isRian ? avatar : undefined} />
                <div className="min-w-0">
                  <b className="flex items-center gap-1.5 truncate font-semibold">
                    <span className="truncate">{active.name}</span>
                    {isRian && (
                      <Verified size={15} className="shrink-0 text-[#12705A]" />
                    )}
                  </b>
                  <small className="block truncate text-xs text-[#5B6675]">
                    {isRian ? (
                      <>
                        <span className="text-[#12705A]">●</span> Online • Balas
                        &lt;15 menit • Tebet
                      </>
                    ) : (
                      active.product
                    )}
                  </small>
                </div>
              </div>
              {isRian && (
                <Link
                  href="/sellers/rian-pratama"
                  className={`${btnLinkSecondary} !min-h-9 shrink-0 !px-3 !text-[0.82rem]`}
                >
                  <Store size={15} />
                  <span className="hidden sm:inline">Kunjungi Toko</span>
                </Link>
              )}
            </header>

            {/* Banner produk */}
            {isRian ? (
              <div className="flex flex-col gap-3 border-b border-[#EDEFEC] bg-[#F7F8F7] p-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
                <div className="flex min-w-0 items-center gap-3.5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={camera}
                    alt="Sony Alpha A6000"
                    className="h-16 w-16 shrink-0 rounded-xl bg-[#F0F2EF] object-cover"
                  />
                  <div className="min-w-0">
                    <span className={badge}>
                      <CheckCircle size={12} /> Tersedia • Garansi 48 Jam
                    </span>
                    <h2 className="mt-1.5 truncate text-[0.95rem] font-semibold">
                      Sony Alpha A6000 Kit 16-50mm OSS
                    </h2>
                    <p className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                      <span
                        className={`${display} text-[1.35rem] leading-none`}
                      >
                        Rp4.750.000
                      </span>
                      <span className="text-xs font-semibold text-[#0B4F3F]">
                        Skor AI 88/100
                      </span>
                    </p>
                  </div>
                </div>
                <div className="flex shrink-0 gap-2">
                  <button
                    type="button"
                    className={btnSecondary}
                    onClick={() => setOfferOpen(true)}
                  >
                    Tawar Harga
                  </button>
                  <Link href="/checkout" className={btnLinkPrimary}>
                    <ShoppingBag size={16} /> Beli Sekarang
                  </Link>
                </div>
              </div>
            ) : (
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#EDEFEC] bg-[#F7F8F7] px-4 py-3 text-sm sm:px-5">
                <span className="text-[#5B6675]">
                  Produk: <b className="text-[#111827]">{active.product}</b>
                </span>
                <Link
                  href="/explore"
                  className={`font-semibold !text-[#0B4F3F] underline-offset-4 hover:underline ${focus}`}
                >
                  Lihat di katalog
                </Link>
              </div>
            )}

            {/* Pesan */}
            <div
              ref={messagesRef}
              role="log"
              aria-live="polite"
              aria-label="Riwayat pesan"
              className="flex flex-1 flex-col gap-3 overflow-y-auto p-4 sm:p-5"
            >
              {isRian && (
                <div className="rounded-xl bg-[#E6F2ED] p-3.5 text-sm leading-relaxed text-[#0A3D31]">
                  <b className="font-semibold">
                    Pemeriksaan Multi-Sudut AI Terverifikasi
                  </b>
                  <p className="mt-0.5">
                    Kamera telah lulus verifikasi 4 sisi. Transaksi dilindungi
                    Safe Escrow dan garansi 48 jam.
                  </p>
                </div>
              )}

              {[
                ...thread,
                ...mySent.map<Bubble>((t) => ({
                  from: "buyer",
                  text: t,
                  time: "Baru saja ✓",
                })),
              ].map((b, i) => {
                const mine = b.from === "buyer";
                return (
                  <div
                    key={i}
                    className={`flex ${mine ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[88%] rounded-2xl px-4 py-2.5 text-[0.92rem] leading-relaxed sm:max-w-[70%] ${
                        mine
                          ? "rounded-br-md bg-[#0B4F3F] text-white"
                          : "rounded-bl-md border border-[#E4E7EB] bg-white"
                      }`}
                    >
                      <p className="break-words">{b.text}</p>
                      {b.attachments && (
                        <div
                          className={`mt-2.5 rounded-xl p-2.5 ${
                            mine ? "bg-white/10" : "bg-[#F7F8F7]"
                          }`}
                        >
                          <b className="text-xs font-semibold">
                            Inspeksi Manual Penjual
                          </b>
                          <div className="mt-2 grid grid-cols-2 gap-2">
                            {b.attachments.map((src, n) => (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                key={src}
                                src={src}
                                alt={`Bukti inspeksi ${n + 1}`}
                                className="aspect-[4/3] w-full rounded-lg bg-[#F0F2EF] object-cover"
                              />
                            ))}
                          </div>
                        </div>
                      )}
                      {b.time && (
                        <small
                          className={`mt-1 block text-[0.7rem] ${
                            mine ? "text-white/70" : "text-[#7A8593]"
                          }`}
                        >
                          {b.time}
                        </small>
                      )}
                    </div>
                  </div>
                );
              })}

              <div className="flex items-start gap-2.5 rounded-xl bg-[#F5ECD7] p-3.5 text-sm leading-relaxed text-[#5C4515]">
                <LockKeyhole size={17} className="mt-0.5 shrink-0" />
                Jangan bertransaksi di luar platform agar garansi dan paspor
                digital tetap terlindungi.
              </div>
            </div>

            {/* Saran cepat */}
            <div className="flex items-center gap-2 overflow-x-auto border-t border-[#EDEFEC] px-4 py-2.5 [scrollbar-width:none] sm:px-5 [&::-webkit-scrollbar]:hidden">
              <span className="shrink-0 text-xs text-[#5B6675]">Saran:</span>
              {quickReplies.map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => {
                    setText(value);
                    composerRef.current?.focus();
                  }}
                  className={`shrink-0 cursor-pointer rounded-full border border-[#E4E7EB] bg-white px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-colors hover:border-[#0B4F3F] hover:text-[#0B4F3F] ${focus}`}
                >
                  {value}
                </button>
              ))}
            </div>

            {/* Composer */}
            <form
              onSubmit={send}
              className="flex items-center gap-2 border-t border-[#EDEFEC] p-3 sm:p-4"
            >
              <button
                type="button"
                aria-label="Lampirkan foto"
                onClick={() =>
                  notify("Lampiran foto belum tersedia di versi contoh.")
                }
                className={`grid h-11 w-11 shrink-0 cursor-pointer place-items-center rounded-xl border border-[#E4E7EB] text-[#5B6675] transition-colors hover:border-[#0B4F3F] hover:text-[#0B4F3F] ${focus}`}
              >
                <ImagePlus size={19} />
              </button>
              <input
                ref={composerRef}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={`Tulis pesan ke ${active.name.split(" ")[0]}...`}
                aria-label="Tulis pesan"
                className={`${input} flex-1`}
              />
              <button
                type="submit"
                disabled={!text.trim()}
                className={`${btnPrimary} !w-auto shrink-0`}
              >
                <span className="hidden sm:inline">Kirim</span>
                <Send size={16} />
              </button>
            </form>
          </section>
        </div>

        {/* Dampak */}
        {isRian && (
          <div className="flex items-start gap-3 rounded-2xl bg-[#E6F2ED] p-4 text-sm leading-relaxed text-[#0A3D31] sm:items-center sm:px-6">
            <Leaf size={18} className="mt-0.5 shrink-0 sm:mt-0" />
            <p>
              Membeli kamera ini berpotensi menghemat{" "}
              <b className="font-semibold">18,4 kg CO₂e</b> dan mencegah{" "}
              <b className="font-semibold">420 gram e-waste</b>.
            </p>
          </div>
        )}
      </main>
      <MarketplaceFooter />
      {toast}

      {/* Dialog tawaran */}
      {offerOpen && (
        <Dialog title="Ajukan tawaran aman" onClose={() => setOfferOpen(false)}>
          <form
            className="mt-4 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              const value = Number(
                new FormData(e.currentTarget).get("offer") ?? 0,
              );
              if (!value) return;
              setOfferOpen(false);
              addMessage(
                `Saya mengajukan tawaran ${money(value)} melalui Safe Escrow.`,
              );
              notify("Tawaran terkirim ke penjual.");
            }}
          >
            <p className="text-sm leading-relaxed text-[#5B6675]">
              Tawaran dikirim melalui PakaiLagi dan tidak memindahkan dana
              nyata. Harga saat ini Rp4.750.000.
            </p>
            <Field label="Nominal tawaran" htmlFor="offer-amount">
              <div className="relative">
                <span className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-sm text-[#5B6675]">
                  Rp
                </span>
                <input
                  id="offer-amount"
                  name="offer"
                  type="number"
                  inputMode="numeric"
                  min={1}
                  step={10000}
                  required
                  defaultValue={4500000}
                  className={`${input} pl-10`}
                />
              </div>
            </Field>
            <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                className={btnSecondary}
                onClick={() => setOfferOpen(false)}
              >
                Batal
              </button>
              <button type="submit" className={btnPrimary}>
                Kirim tawaran
              </button>
            </div>
          </form>
        </Dialog>
      )}
    </div>
  );
}
