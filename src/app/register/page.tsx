"use client";
import Link from "next/link";
import {
  ArrowRight,
  AtSign,
  Check,
  Loader2,
  Lock,
  ShoppingBag,
  Store,
  User,
} from "lucide-react";
import { type FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthShell } from "@/components/auth/AuthShell";
import { AuthInput, PasswordToggle } from "@/components/auth/AuthField";
import { GoogleIcon } from "@/components/auth/GoogleIcon";
import {
  btnPrimary,
  btnSecondary,
  card,
  display,
  focus,
  input,
} from "@/components/ui/tokens";
import { useToast } from "@/components/ui/useToast";

type Role = "buyer" | "seller";

const roles: {
  id: Role;
  label: string;
  text: string;
  icon: typeof ShoppingBag;
  tag?: string;
}[] = [
  {
    id: "buyer",
    label: "Pembeli & Kolektor",
    text: "Jelajahi, tawar, dan beli barang terverifikasi.",
    icon: ShoppingBag,
    tag: "Populer",
  },
  {
    id: "seller",
    label: "Penjual Sirkular",
    text: "Unggah barang, audit AI, dan kelola pesanan.",
    icon: Store,
  },
];

const strengthLabel = ["Menunggu input", "Lemah", "Cukup baik", "Sangat kuat"];
const strengthColor = ["", "bg-[#C8672B]", "bg-[#D9A441]", "bg-[#0B4F3F]"];

export default function RegisterPage() {
  const router = useRouter();
  const [role, setRole] = useState<Role>("buyer");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { notify, toast } = useToast();
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  const strength = useMemo(
    () => [
      { ok: password.length >= 8, label: "8+ karakter" },
      {
        ok: /[a-z]/.test(password) && /[A-Z]/.test(password),
        label: "Huruf besar & kecil",
      },
      { ok: /\d/.test(password), label: "Angka" },
    ],
    [password],
  );
  const score = strength.filter((s) => s.ok).length;
  const mismatch = confirm.length > 0 && password !== confirm;

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (score < 3) {
      setError("Kata sandi harus memenuhi seluruh persyaratan keamanan.");
      return;
    }
    if (password !== confirm) {
      setError("Konfirmasi kata sandi tidak sesuai.");
      return;
    }
    if (!agreed) {
      setError("Anda harus menyetujui ketentuan layanan.");
      return;
    }
    setError("");
    setLoading(true);
    timer.current = setTimeout(
      () => router.push(role === "seller" ? "/seller/dashboard" : "/"),
      500,
    );
  }

  return (
    <AuthShell mode="register">
      <section className={`${card} p-6 sm:p-8`}>
        <h1
          className={`${display} text-[2rem] leading-[1.1] font-normal tracking-[-0.01em]`}
        >
          Buat akun baru
        </h1>
        <p className="mt-2 leading-relaxed text-[#5B6675]">
          Mulai transaksi barang pre-loved dengan transparansi skor dan paspor
          sirkular.
        </p>

        <button
          type="button"
          onClick={() =>
            notify("Daftar dengan Google belum tersedia di versi contoh.")
          }
          className={`${btnSecondary} mt-6 !min-h-12 sm:!w-full`}
        >
          <GoogleIcon />
          Daftar dengan Google
        </button>

        <div className="my-6 flex items-center gap-3 text-xs text-[#5B6675]">
          <span className="h-px flex-1 bg-[#E4E7EB]" />
          atau lengkapi formulir
          <span className="h-px flex-1 bg-[#E4E7EB]" />
        </div>

        <form onSubmit={submit} noValidate className="space-y-5">
          {/* Peran */}
          <fieldset>
            <legend className="mb-2 text-sm font-semibold">
              Pilih peran akun utama
            </legend>
            <div className="grid gap-3 sm:grid-cols-2">
              {roles.map(({ id, label, text, icon: Icon, tag }) => (
                <label key={id} className="relative block cursor-pointer">
                  <input
                    type="radio"
                    name="role"
                    value={id}
                    checked={role === id}
                    onChange={() => setRole(id)}
                    className="peer sr-only"
                  />
                  <div className="h-full rounded-xl border border-[#E4E7EB] bg-white p-4 transition-colors peer-checked:border-[#0B4F3F] peer-checked:bg-[#E6F2ED] peer-focus-visible:outline peer-focus-visible:outline-[3px] peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#12705A] hover:border-[#0B4F3F]/50">
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`grid h-9 w-9 place-items-center rounded-full ${
                          role === id
                            ? "bg-[#0B4F3F] text-white"
                            : "bg-[#F0F2EF] text-[#0B4F3F]"
                        }`}
                      >
                        <Icon size={17} />
                      </span>
                      {tag && (
                        <span className="rounded-full bg-[#F5ECD7] px-2 py-0.5 text-[0.7rem] font-semibold text-[#8A6A25]">
                          {tag}
                        </span>
                      )}
                    </div>
                    <b className="mt-3 block text-[0.95rem] font-semibold">
                      {label}
                    </b>
                    <span className="mt-0.5 block text-[0.82rem] leading-snug text-[#5B6675]">
                      {text}
                    </span>
                  </div>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="grid gap-4 sm:grid-cols-2">
            <AuthInput
              id="name"
              name="name"
              label="Nama lengkap"
              icon={User}
              placeholder="Budi Santoso"
              autoComplete="name"
              required
            />
            <div>
              <label
                htmlFor="phone"
                className="mb-1.5 block text-sm font-semibold"
              >
                Nomor WhatsApp
              </label>
              <div className="flex">
                <span className="grid shrink-0 place-items-center rounded-l-xl border border-r-0 border-[#E4E7EB] bg-[#F7F8F7] px-3 text-sm text-[#5B6675]">
                  +62
                </span>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel-national"
                  placeholder="812 3456 7890"
                  required
                  className={`${input} !rounded-l-none`}
                />
              </div>
            </div>
          </div>

          <AuthInput
            id="email"
            name="email"
            type="email"
            label="Email aktif"
            icon={AtSign}
            placeholder="budi@domain.id"
            autoComplete="email"
            required
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <AuthInput
              id="password"
              name="password"
              label="Kata sandi"
              icon={Lock}
              type={show ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Min. 8 karakter"
              autoComplete="new-password"
              required
              end={
                <PasswordToggle
                  shown={show}
                  onToggle={() => setShow((v) => !v)}
                />
              }
            />
            <AuthInput
              id="confirm"
              name="confirm"
              label="Konfirmasi kata sandi"
              icon={Lock}
              type={show ? "text" : "password"}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="Ulangi kata sandi"
              autoComplete="new-password"
              required
              aria-invalid={mismatch}
              aria-describedby={mismatch ? "confirm-error" : undefined}
              hint={
                mismatch && (
                  <p
                    id="confirm-error"
                    className="mt-1.5 text-xs text-[#B4432B]"
                  >
                    Konfirmasi sandi tidak sesuai.
                  </p>
                )
              }
            />
          </div>

          {/* Kekuatan sandi */}
          <div className="rounded-xl bg-[#F7F8F7] p-4">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#5B6675]">Kekuatan sandi</span>
              <span className="font-semibold" aria-live="polite">
                {strengthLabel[score]}
              </span>
            </div>
            <div className="mt-2 flex gap-1.5" aria-hidden="true">
              {[1, 2, 3].map((n) => (
                <span
                  key={n}
                  className={`h-1.5 flex-1 rounded-full ${
                    n <= score ? strengthColor[score] : "bg-[#E4E7EB]"
                  }`}
                />
              ))}
            </div>
            <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-xs">
              {strength.map((s) => (
                <li
                  key={s.label}
                  className={`flex items-center gap-1.5 ${
                    s.ok ? "text-[#0B4F3F]" : "text-[#5B6675]"
                  }`}
                >
                  {s.ok ? (
                    <Check size={13} />
                  ) : (
                    <span className="h-1 w-1 rounded-full bg-[#9AA3AE]" />
                  )}
                  {s.label}
                </li>
              ))}
            </ul>
          </div>

          <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-1 h-4 w-4 shrink-0 cursor-pointer accent-[#0B4F3F]"
            />
            <span>
              Saya menyetujui{" "}
              <Link
                href="/terms"
                className={`font-semibold !text-[#0B4F3F] underline-offset-4 hover:underline ${focus}`}
              >
                Ketentuan Layanan
              </Link>
              , Kebijakan Privasi, dan Protokol Transparansi Sirkular.
            </span>
          </label>

          {error && (
            <div
              role="alert"
              className="rounded-xl bg-[#FBEDE8] p-3.5 text-sm leading-relaxed text-[#B4432B]"
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`${btnPrimary} !min-h-12 sm:!w-full`}
          >
            {loading ? (
              <>
                <Loader2
                  size={17}
                  className="animate-spin motion-reduce:animate-none"
                />
                Membuat akun...
              </>
            ) : (
              <>
                Buat akun & dapatkan +100 poin <ArrowRight size={17} />
              </>
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[#5B6675]">
          Sudah punya akun?{" "}
          <Link
            href="/login"
            className={`font-semibold !text-[#0B4F3F] underline-offset-4 hover:underline ${focus}`}
          >
            Masuk sekarang
          </Link>
        </p>
      </section>
      {toast}
    </AuthShell>
  );
}
