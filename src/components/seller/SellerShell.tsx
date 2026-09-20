import Link from "next/link";
import {
  ArrowLeft,
  BarChart3,
  Box,
  PlusCircle,
  Recycle,
  ShieldCheck,
  Truck,
  type LucideIcon,
} from "lucide-react";
import type { ReactNode } from "react";
import {
  body,
  btnGhostDark,
  btnLinkPrimary,
  display,
  focus,
  focusDark,
  segmented,
} from "@/components/ui/tokens";

const avatar =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAchsCmu8eSuRKWKbhu_hXW5WbD-aJbsbrVh-1s5JyQPL4323_w2JHI9rvuLQKsMYic2qaS9F1Zl6GJuLVQmi36BLOzHGaGBQXk4cjAVBE95ZvvlKOfJGxUQ7wur8k9c4vRDlkzJEByKQt_qBkc0GGC-wshDN_9O76pQPHhcNJIUEPXT0-_kNbxMMEmcOI2Rgb1xI4u3FiOWv8OsiVBUcfU_sJaFQx8wizYjGE67tsGXFc1K4wdflSx";

type NavKey = "dashboard" | "inventory" | "orders" | "routes";

const nav: { key: NavKey; href: string; label: string; icon: LucideIcon }[] = [
  {
    key: "dashboard",
    href: "/seller/dashboard",
    label: "Ringkasan Toko",
    icon: BarChart3,
  },
  {
    key: "inventory",
    href: "/seller/inventory",
    label: "Inventaris & AI Audit",
    icon: Box,
  },
  {
    key: "orders",
    href: "/seller/orders",
    label: "Pesanan & Logistik",
    icon: Truck,
  },
  {
    key: "routes",
    href: "/seller/routes",
    label: "Rute Swap & Repair",
    icon: Recycle,
  },
];

const sideLink = (active: boolean) =>
  `flex min-h-11 items-center gap-3 rounded-xl px-3.5 text-[0.92rem] font-semibold no-underline transition-colors ${focusDark} ${
    active
      ? "bg-[#E6F2ED] !text-[#0A3D31]"
      : "!text-white/75 hover:bg-white/10 hover:!text-white"
  }`;

const topLink = (active: boolean) =>
  `inline-flex min-h-10 shrink-0 items-center gap-2 rounded-lg px-4 text-[0.88rem] font-semibold whitespace-nowrap no-underline transition-all ${focus} ${
    active
      ? "bg-white !text-[#111827] shadow-[0_1px_3px_rgba(17,24,39,0.12)]"
      : "!text-[#5B6675] hover:!text-[#111827]"
  }`;

export function SellerShell({
  children,
  active = "dashboard",
}: {
  children: ReactNode;
  active?: NavKey;
}) {
  return (
    <div
      className={`${body} flex min-h-screen bg-[#F7F8F7] text-[#111827] antialiased`}
    >
      {/* ============ Sidebar (desktop) ============ */}
      <aside
        aria-label="Navigasi penjual"
        className="sticky top-0 hidden h-screen w-[17rem] shrink-0 flex-col gap-6 overflow-y-auto bg-[#0A3D31] p-5 text-white lg:flex"
      >
        <div className="flex items-center gap-2.5 px-1 pt-1">
          <Link
            href="/dashboard"
            className={`${display} text-[1.7rem] leading-none font-normal tracking-[-0.01em] no-underline !text-white ${focusDark}`}
          >
            PakaiLagi
          </Link>
          <span className="rounded-full bg-[#E2BC6B] px-2 py-0.5 text-[0.7rem] font-semibold text-[#111827]">
            Seller
          </span>
        </div>

        <div className="flex items-center gap-3 rounded-2xl bg-white/10 p-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={avatar}
            alt="Budi Santoso"
            className="h-11 w-11 shrink-0 rounded-full object-cover ring-2 ring-white/25"
          />
          <div className="min-w-0">
            <b className="block truncate text-[0.95rem] font-semibold">
              Budi Santoso
            </b>
            <small className="mt-0.5 flex items-center gap-1.5 text-[0.78rem] text-white/75">
              <ShieldCheck size={13} className="shrink-0 text-[#E2BC6B]" />
              Penjual Terverifikasi
            </small>
          </div>
        </div>

        <nav aria-label="Menu seller" className="flex flex-col gap-1">
          {nav.map(({ key, href, label, icon: Icon }) => (
            <Link
              key={key}
              href={href}
              aria-current={active === key ? "page" : undefined}
              className={sideLink(active === key)}
            >
              <Icon size={18} className="shrink-0" />
              {label}
            </Link>
          ))}
        </nav>

        <Link
          href="/"
          className={`${btnGhostDark} mt-auto !w-full no-underline !text-white`}
        >
          <ArrowLeft size={16} /> Kembali ke Marketplace
        </Link>
      </aside>

      {/* ============ Area kerja ============ */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 border-b border-[#E4E7EB] bg-white/95 backdrop-blur">
          <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-6">
            <div className="flex min-w-0 items-center gap-3">
              <Link
                href="/"
                className={`${display} text-[1.35rem] leading-none font-normal no-underline !text-[#0A3D31] lg:hidden ${focus}`}
              >
                PakaiLagi
              </Link>
              <b className="hidden truncate text-[0.95rem] font-semibold sm:block">
                Portal Penjual Berkelanjutan
              </b>
            </div>
            <Link
              href="/seller/scan"
              className={`${btnLinkPrimary} shrink-0 !w-auto`}
            >
              <PlusCircle size={17} />
              <span className="hidden sm:inline">Tambah Listing Sirkular</span>
              <span className="sm:hidden">Tambah Listing</span>
            </Link>
          </div>

          {/* Navigasi mobile: baris tab yang bisa digeser */}
          <nav
            aria-label="Menu seller"
            className="overflow-x-auto px-4 pb-3 [scrollbar-width:none] sm:px-6 lg:hidden [&::-webkit-scrollbar]:hidden"
          >
            <div className={segmented}>
              {nav.map(({ key, href, label, icon: Icon }) => (
                <Link
                  key={key}
                  href={href}
                  aria-current={active === key ? "page" : undefined}
                  className={topLink(active === key)}
                >
                  <Icon size={16} />
                  {label}
                </Link>
              ))}
            </div>
          </nav>
        </header>

        {children}
      </div>
    </div>
  );
}
