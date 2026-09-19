"use client";
import Link from "next/link";
import {
  ArrowRight,
  AtSign,
  Eye,
  EyeOff,
  GraduationCap,
  Lock,
  ShieldCheck,
} from "lucide-react";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthShell } from "@/components/auth/AuthShell";
import { GoogleIcon } from "@/components/auth/GoogleIcon";
import styles from "@/components/auth/Auth.module.css";
export default function LoginPage() {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
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
    setTimeout(() => router.push("/dashboard"), 700);
  }
  return (
    <AuthShell mode="login">
      <section className={styles.card}>
        <div className={styles.intro}>
          <h1>Selamat Datang Kembali</h1>
          <p>
            Masuk untuk melanjutkan transaksi sirkular dan mengelola inventaris.
          </p>
        </div>
        <div className={styles.socials}>
          <button className={styles.socialButton}>
            <GoogleIcon />
            Lanjutkan dengan Google
          </button>
        </div>
        <div className={styles.divider}>atau masuk dengan email</div>
        <form className={styles.form} onSubmit={submit}>
          <label className={styles.field}>
            Email atau Nomor Ponsel
            <div className={`${styles.inputWrap} ${styles.withLeftIcon}`}>
              <AtSign className={styles.inputIcon} size={18} />
              <input
                name="identifier"
                placeholder="nama@email.com atau 0812xxxx"
                autoComplete="username"
                required
              />
            </div>
          </label>
          <label className={styles.field}>
            <span className={styles.between}>
              <span>Kata Sandi</span>
              <Link className={styles.link} href="/forgot-password">
                Lupa kata sandi?
              </Link>
            </span>
            <div className={`${styles.inputWrap} ${styles.withLeftIcon}`}>
              <Lock className={styles.inputIcon} size={18} />
              <input
                name="password"
                type={show ? "text" : "password"}
                placeholder="Masukkan kata sandi"
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                className={styles.eye}
                onClick={() => setShow((value) => !value)}
                aria-label="Tampilkan atau sembunyikan kata sandi"
              >
                {show ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </label>
          <label className={styles.check}>
            <input type="checkbox" name="remember" />
            Ingat saya di perangkat ini
          </label>
          {error && <div className={styles.error}>{error}</div>}
          <button className={styles.primaryButton} disabled={loading}>
            {loading ? "Memproses..." : "Masuk ke Akun Saya"}
            <ArrowRight size={17} />
          </button>
        </form>
        <div className={styles.callout}>
          Belum punya akun?{" "}
          <Link className={styles.link} href="/register">
            Daftar Akun Baru
          </Link>
        </div>
        <div className={styles.secure}>
          <ShieldCheck size={15} color="#2f8f68" />
          Dilindungi enkripsi dan Smart Escrow Vault
        </div>
      </section>
    </AuthShell>
  );
}
