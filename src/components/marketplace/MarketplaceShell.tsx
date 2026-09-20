"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Leaf, Menu, Search, Store, UserRound, X } from "lucide-react";
import { useEffect, useState } from "react";

// Font: isi lewat next/font di layout.tsx (--font-display). Fallback Georgia.
const display = "font-[family-name:var(--font-display,Georgia,serif)]";
const focus =
  "focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#12705A]";
const focusDark =
  "focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-white";

const navLinks = [
  { href: "/", label: "Beranda" },
  { href: "/explore", label: "Temukan" },
  { href: "/status", label: "Status Pesanan" },
  { href: "/#dampak", label: "Dampak Sirkular" },
];

function Brand({ dark = false }: { dark?: boolean }) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2.5 no-underline ${display} text-[1.5rem] leading-none font-normal tracking-tight ${
        dark ? `!text-white ${focusDark}` : `!text-[#111827] ${focus}`
      }`}
    >
      <span
        className={`grid h-9 w-9 place-items-center rounded-xl ${
          dark ? "bg-[#E2BC6B] text-[#111827]" : "bg-[#0B4F3F] text-white"
        }`}
      >
        <Leaf size={19} />
      </span>
      PakaiLagi
    </Link>
  );
}

function NavLinks({
  vertical = false,
  onNavigate,
}: {
  vertical?: boolean;
  onNavigate?: () => void;
}) {
  const pathname = usePathname() ?? "";
  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/"
      : href.startsWith("/#")
        ? false
        : pathname.startsWith(href);

  return (
    <ul
      className={vertical ? "flex flex-col gap-1" : "flex items-center gap-1"}
    >
      {navLinks.map((l) => {
        const active = isActive(l.href);
        return (
          <li key={l.label}>
            <Link
              href={l.href}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
              className={`block rounded-lg px-3 py-2 text-[0.92rem] font-medium whitespace-nowrap no-underline transition-colors ${focus} ${
                active
                  ? "bg-[#E6F2ED] !text-[#0B4F3F]"
                  : "!text-[#5B6675] hover:bg-[#F3F4F2] hover:!text-[#111827]"
              }`}
            >
              {l.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

const sellerBtn = `inline-flex min-h-10 items-center justify-center gap-2 rounded-xl bg-[#0B4F3F] px-4 text-[0.9rem] font-semibold !text-white no-underline transition-colors hover:bg-[#083D31] ${focus}`;
const iconBtn = `grid h-10 w-10 shrink-0 cursor-pointer place-items-center rounded-xl border border-[#E4E7EB] bg-white text-[#111827] transition-colors hover:border-[#0B4F3F] ${focus}`;

export function MarketplaceHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Tutup menu mobile saat pindah halaman
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-[#E4E7EB] bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-[1200px] flex-wrap items-center gap-x-4 gap-y-3 px-4 py-3 sm:px-6">
        <Brand />

        {/* Nav desktop */}
        <nav aria-label="Navigasi utama" className="hidden xl:block">
          <NavLinks />
        </nav>

        {/* Pencarian: baris sendiri di HP, sebaris di tablet ke atas */}
        <form
          role="search"
          action="/explore"
          className="order-last basis-full md:order-none md:flex-1 md:basis-0"
        >
          <label className="relative block">
            <span className="sr-only">Cari barang</span>
            <Search
              size={18}
              className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-[#5B6675]"
            />
            <input
              type="search"
              name="q"
              placeholder="Cari barang bekas berkualitas..."
              className="h-11 w-full rounded-full border border-transparent bg-[#F0F2EF] pr-4 pl-11 text-[0.92rem] text-[#111827] placeholder:text-[#7A8593] focus:border-[#0B4F3F] focus:bg-white focus:ring-4 focus:ring-[#0B4F3F]/10 focus:outline-none"
            />
          </label>
        </form>

        <div className="ml-auto flex items-center gap-2 md:ml-0">
          <Link
            href="/seller/dashboard"
            className={`${sellerBtn} hidden md:inline-flex`}
          >
            <Store size={17} /> Mode Penjual
          </Link>
          <button type="button" className={iconBtn} aria-label="Notifikasi">
            <Bell size={19} />
          </button>
          <Link
            href="/profile"
            aria-label="Profil saya"
            className={`${iconBtn} !text-[#111827] no-underline`}
          >
            <UserRound size={19} />
          </Link>
          <button
            type="button"
            className={`${iconBtn} xl:hidden`}
            aria-label={open ? "Tutup menu" : "Buka menu"}
            aria-expanded={open}
            aria-controls="menu-mobile"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </div>

      {/* Menu mobile & tablet */}
      {open && (
        <div
          id="menu-mobile"
          className="border-t border-[#E4E7EB] bg-white xl:hidden"
        >
          <nav
            aria-label="Navigasi utama"
            className="mx-auto w-full max-w-[1200px] px-4 py-3 sm:px-6"
          >
            <NavLinks vertical onNavigate={() => setOpen(false)} />
            <Link
              href="/seller/dashboard"
              onClick={() => setOpen(false)}
              className={`${sellerBtn} mt-3 w-full md:hidden`}
            >
              <Store size={17} /> Mode Penjual
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

const footerColumns = [
  {
    title: "Eksplorasi Sirkular",
    links: [
      { label: "Katalog Elektronik Teruji", href: "/explore" },
      { label: "Tukar Tambah", href: "/explore" },
      { label: "Direktori Reparasi", href: "/explore" },
    ],
  },
  {
    title: "Akuntabilitas",
    links: [
      { label: "Standar Inspeksi", href: "#" },
      { label: "Garansi Rekondisi", href: "#" },
      { label: "Rekening Bersama", href: "#" },
    ],
  },
  {
    title: "Ekosistem",
    links: [
      { label: "Pusat Bantuan", href: "#" },
      { label: "Mitra Teknisi", href: "#" },
      { label: "Laporan Dampak", href: "#" },
    ],
  },
];

export function MarketplaceFooter() {
  return (
    <footer className="bg-[#072E25] text-white">
      <div className="mx-auto w-full max-w-[1200px] px-4 py-14 sm:px-6 sm:py-16">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-12">
          <div className="col-span-2 lg:col-span-1">
            <Brand dark />
            <p className="mt-5 max-w-[36ch] text-[0.92rem] leading-relaxed text-white/65">
              Infrastruktur pasar sirkular berbasis transparansi data, pengujian
              kondisi terverifikasi, dan penilaian siklus hidup.
            </p>
          </div>
          {footerColumns.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-white">{col.title}</h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className={`text-[0.92rem] !text-white/65 no-underline transition-colors hover:!text-[#E2BC6B] ${focusDark}`}
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-sm text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 PakaiLagi</span>
          <span>Kenali. Alihkan. Lanjutkan.</span>
        </div>
      </div>
    </footer>
  );
}
