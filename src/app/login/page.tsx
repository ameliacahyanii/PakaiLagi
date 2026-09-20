"use client";
import Link from "next/link";
import { ArrowRight, AtSign, Loader2, Lock, ShieldCheck } from "lucide-react";
import { type FormEvent, useEffect, useRef, useState } from "react";
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
} from "@/components/ui/tokens";
import { useToast } from "@/components/ui/useToast";

export default function LoginPage() {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { notify, toast } = useToast();
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const identifier = String(data.get("identifier") || "").trim();
    const password = String(data.get("password") || "");
    if (!identifier || password.length < 8) {
      setError(
        "Masukkan email atau nomor ponsel dan kata sandi minimal 8 karakter.",
      );
      return;
    }
    setError("");
    setLoading(true);
    timer.current = setTimeout(() => router.push("/"), 700);
  }

  return (
    <AuthShell mode="login">
      <section className={`${card} p-6 sm:p-8`}>
        <h1
          className={`${display} text-[2rem] leading-[1.1] font-normal tracking-[-0.01em]`}
        >
          Selamat datang kembali
        </h1>
        <p className="mt-2 leading-relaxed text-[#5B6675]">
          Masuk untuk melanjutkan transaksi sirkular dan mengelola inventaris.
        </p>

        <button
          type="button"
          onClick={() => notify("Login Google belum tersedia di versi contoh.")}
          className={`${btnSecondary} mt-6 !min-h-12 sm:!w-full`}
        >
          <GoogleIcon />
          Lanjutkan dengan Google
        </button>

        <div className="my-6 flex items-center gap-3 text-xs text-[#5B6675]">
          <span className="h-px flex-1 bg-[#E4E7EB]" />
          atau masuk dengan email
          <span className="h-px flex-1 bg-[#E4E7EB]" />
        </div>

        <form onSubmit={submit} noValidate className="space-y-4">
          <AuthInput
            id="identifier"
            name="identifier"
            label="Email atau nomor ponsel"
            icon={AtSign}
            placeholder="nama@email.com atau 0812xxxx"
            autoComplete="username"
            required
          />
          <AuthInput
            id="password"
            name="password"
            label="Kata sandi"
            icon={Lock}
            type={show ? "text" : "password"}
            placeholder="Masukkan kata sandi"
            autoComplete="current-password"
            required
            labelExtra={
              <Link
                href="/forgot-password"
                className={`text-sm font-semibold !text-[#0B4F3F] underline-offset-4 hover:underline ${focus}`}
              >
                Lupa kata sandi?
              </Link>
            }
            end={
              <PasswordToggle
                shown={show}
                onToggle={() => setShow((v) => !v)}
              />
            }
          />

          <label className="flex cursor-pointer items-center gap-2.5 text-sm">
            <input
              type="checkbox"
              name="remember"
              className="h-4 w-4 cursor-pointer accent-[#0B4F3F]"
            />
            Ingat saya di perangkat ini
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
                Memproses...
              </>
            ) : (
              <>
                Masuk ke akun saya <ArrowRight size={17} />
              </>
            )}
          </button>
        </form>

        <p className="mt-6 rounded-xl bg-[#F7F8F7] p-4 text-center text-sm text-[#5B6675]">
          Belum punya akun?{" "}
          <Link
            href="/register"
            className={`font-semibold !text-[#0B4F3F] underline-offset-4 hover:underline ${focus}`}
          >
            Daftar akun baru
          </Link>
        </p>
        <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-[#5B6675]">
          <ShieldCheck size={15} className="text-[#12705A]" />
          Dilindungi enkripsi dan Smart Escrow Vault
        </p>
      </section>
      {toast}
    </AuthShell>
  );
}
