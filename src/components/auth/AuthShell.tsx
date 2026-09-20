import Link from "next/link";
import { ArrowLeft, CircleCheck, Leaf } from "lucide-react";
import type { ReactNode } from "react";
import { display, focus, focusDark, pageBg } from "@/components/ui/tokens";

const copy = {
  login: {
    title: "Selamat datang kembali di pasar sirkular.",
    text: "Lanjutkan transaksi, pantau pesanan, dan kelola inventarismu dalam satu tempat.",
  },
  register: {
    title: "Mulai perjalanan sirkularmu.",
    text: "Beli, jual, tukar, atau donasikan barang dengan skor kondisi yang transparan.",
  },
  forgot: {
    title: "Tenang, akunmu bisa dipulihkan.",
    text: "Kami kirim tautan aman untuk mengatur ulang kata sandi, lalu kamu bisa lanjut bertransaksi.",
  },
} as const;

const benefits = [
  "Skor kondisi transparan dari audit AI",
  "Safe Escrow melindungi setiap transaksi",
  "Circular Passport untuk setiap barang",
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

export function AuthShell({
  mode,
  children,
}: {
  mode: "login" | "register" | "forgot" | (string & {});
  children: ReactNode;
}) {
  const c = copy[mode as keyof typeof copy] ?? copy.login;
  return (
    <div
      className={`${pageBg} lg:grid lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]`}
    >
      {/* Panel merek (desktop) */}
      <aside className="hidden flex-col justify-between bg-[#0A3D31] p-12 text-white lg:sticky lg:top-0 lg:flex lg:h-screen">
        <Brand dark />
        <div>
          <h2
            className={`${display} max-w-[14ch] text-[3.4rem] leading-[1.02] font-normal tracking-[-0.02em]`}
          >
            {c.title}
          </h2>
          <p className="mt-5 max-w-[42ch] leading-relaxed text-white/70">
            {c.text}
          </p>
          <ul className="mt-9 space-y-3.5">
            {benefits.map((b) => (
              <li key={b} className="flex items-center gap-3 text-[0.95rem]">
                <CircleCheck size={18} className="shrink-0 text-[#E2BC6B]" />
                {b}
              </li>
            ))}
          </ul>
        </div>
        <p className="text-sm text-white/50">
          © 2026 PakaiLagi · Kenali. Alihkan. Lanjutkan.
        </p>
      </aside>

      {/* Area formulir */}
      <div className="flex min-h-screen flex-col">
        <header className="flex items-center justify-between px-4 py-4 sm:px-8 sm:py-6">
          <div className="lg:invisible">
            <Brand />
          </div>
          <Link
            href="/"
            className={`inline-flex items-center gap-1.5 text-sm font-semibold !text-[#5B6675] no-underline hover:!text-[#0B4F3F] ${focus}`}
          >
            <ArrowLeft size={16} /> Beranda
          </Link>
        </header>
        <main className="flex flex-1 items-start justify-center px-4 pb-12 sm:items-center sm:px-8">
          <div
            className={`w-full ${mode === "register" ? "max-w-[600px]" : "max-w-[460px]"}`}
          >
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
