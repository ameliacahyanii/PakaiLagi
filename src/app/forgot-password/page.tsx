"use client";
import Link from "next/link";
import {
  ArrowLeft,
  AtSign,
  Loader2,
  MailCheck,
  ShieldCheck,
} from "lucide-react";
import { type FormEvent, useEffect, useRef, useState } from "react";
import { AuthShell } from "@/components/auth/AuthShell";
import { AuthInput } from "@/components/auth/AuthField";
import {
  btnPrimary,
  btnSecondary,
  card,
  display,
  focus,
} from "@/components/ui/tokens";
import { useToast } from "@/components/ui/useToast";

const RESEND_SECONDS = 60;

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const isPhone = (v: string) => /^\+?\d[\d\s-]{8,16}$/.test(v);

function mask(value: string) {
  if (value.includes("@")) {
    const [name, domain] = value.split("@");
    return `${name[0] ?? ""}${"•".repeat(Math.max(name.length - 1, 2))}@${domain}`;
  }
  const digits = value.replace(/\D/g, "");
  return `${"•".repeat(Math.max(digits.length - 3, 4))}${digits.slice(-3)}`;
}

export default function ForgotPasswordPage() {
  const [identifier, setIdentifier] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const { notify, toast } = useToast();
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  // Hitung mundur untuk kirim ulang
  useEffect(() => {
    if (cooldown <= 0) return;
    const id = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(id);
  }, [cooldown]);

  function requestLink() {
    setLoading(true);
    // Simulasi permintaan ke server
    timer.current = setTimeout(() => {
      setLoading(false);
      setSent(true);
      setCooldown(RESEND_SECONDS);
    }, 800);
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = identifier.trim();
    if (!value) {
      setError("Masukkan email atau nomor ponsel yang terdaftar.");
      return;
    }
    if (!isEmail(value) && !isPhone(value)) {
      setError("Format email atau nomor ponsel belum benar.");
      return;
    }
    setError("");
    requestLink();
  }

  function resend() {
    if (cooldown > 0) return;
    setCooldown(RESEND_SECONDS);
    notify("Tautan reset dikirim ulang.");
  }

  return (
    <AuthShell mode="forgot">
      <section className={`${card} p-6 sm:p-8`}>
        {!sent ? (
          <>
            <Link
              href="/login"
              className={`inline-flex items-center gap-1.5 text-sm font-semibold !text-[#5B6675] no-underline hover:!text-[#0B4F3F] ${focus}`}
            >
              <ArrowLeft size={16} /> Kembali ke halaman masuk
            </Link>

            <h1
              className={`${display} mt-5 text-[2rem] leading-[1.1] font-normal tracking-[-0.01em]`}
            >
              Lupa kata sandi?
            </h1>
            <p className="mt-2 leading-relaxed text-[#5B6675]">
              Masukkan email atau nomor ponsel yang kamu pakai saat mendaftar.
              Kami akan mengirim tautan untuk mengatur ulang kata sandi.
            </p>

            <form onSubmit={submit} noValidate className="mt-6 space-y-4">
              <AuthInput
                id="identifier"
                name="identifier"
                label="Email atau nomor ponsel"
                icon={AtSign}
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="nama@email.com atau 0812xxxx"
                autoComplete="username"
                aria-invalid={Boolean(error)}
                aria-describedby={error ? "forgot-error" : undefined}
                required
              />

              {error && (
                <div
                  id="forgot-error"
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
                    Mengirim...
                  </>
                ) : (
                  "Kirim tautan reset"
                )}
              </button>
            </form>

            <p className="mt-6 flex items-center justify-center gap-1.5 text-xs text-[#5B6675]">
              <ShieldCheck size={15} className="text-[#12705A]" />
              Tautan reset hanya berlaku 30 menit dan sekali pakai
            </p>
          </>
        ) : (
          <div role="status" aria-live="polite">
            <span className="grid h-14 w-14 place-items-center rounded-full bg-[#E6F2ED] text-[#0B4F3F]">
              <MailCheck size={26} />
            </span>
            <h1
              className={`${display} mt-5 text-[2rem] leading-[1.1] font-normal tracking-[-0.01em]`}
            >
              Cek pesanmu
            </h1>
            <p className="mt-2 leading-relaxed text-[#5B6675]">
              Jika <b className="text-[#111827]">{mask(identifier.trim())}</b>{" "}
              terdaftar, tautan untuk mengatur ulang kata sandi sudah kami
              kirim. Tautannya berlaku 30 menit.
            </p>

            <div className="mt-5 rounded-xl bg-[#F7F8F7] p-4 text-sm leading-relaxed text-[#5B6675]">
              Belum menerima? Periksa folder spam atau promosi, lalu pastikan
              penulisannya sudah benar.
            </div>

            <div className="mt-6 space-y-3">
              <button
                type="button"
                onClick={resend}
                disabled={cooldown > 0}
                className={`${btnSecondary} !min-h-12 sm:!w-full`}
              >
                {cooldown > 0
                  ? `Kirim ulang dalam ${cooldown} detik`
                  : "Kirim ulang tautan"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setSent(false);
                  setCooldown(0);
                }}
                className={`w-full cursor-pointer rounded-xl py-2.5 text-sm font-semibold text-[#0B4F3F] transition-colors hover:bg-[#E6F2ED] ${focus}`}
              >
                Ganti email atau nomor ponsel
              </button>
            </div>

            <p className="mt-6 text-center text-sm text-[#5B6675]">
              Sudah ingat kata sandi?{" "}
              <Link
                href="/login"
                className={`font-semibold !text-[#0B4F3F] underline-offset-4 hover:underline ${focus}`}
              >
                Masuk
              </Link>
            </p>
          </div>
        )}
      </section>
      {toast}
    </AuthShell>
  );
}
