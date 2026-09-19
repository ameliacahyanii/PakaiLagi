"use client";
import Link from "next/link";
import {
  ArrowRight,
  AtSign,
  Eye,
  EyeOff,
  Lock,
  Phone,
  ShoppingBag,
  Store,
  User,
} from "lucide-react";
import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthShell } from "@/components/auth/AuthShell";
import { GoogleIcon } from "@/components/auth/GoogleIcon";
import styles from "@/components/auth/Auth.module.css";
type Role = "buyer" | "seller";
export default function RegisterPage() {
  const router = useRouter();
  const [role, setRole] = useState<Role>("buyer");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");
  const strength = useMemo(
    () => ({
      length: password.length >= 8,
      case: /[a-z]/.test(password) && /[A-Z]/.test(password),
      number: /\d/.test(password),
    }),
    [password],
  );
  const score = Object.values(strength).filter(Boolean).length;
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
    setTimeout(
      () => router.push(role === "seller" ? "/seller/dashboard" : "/dashboard"),
      500,
    );
  }
  return (
    <AuthShell mode="register">
      <section className={`${styles.card} ${styles.registerCard}`}>
        <div className={styles.intro}>
          <h1>Buat Akun Baru</h1>
          <p>
            Mulai transaksi barang pre-loved dengan transparansi skor dan paspor
            sirkular.
          </p>
        </div>
        <button className={styles.socialButton}>
          <GoogleIcon />
          Daftar dengan Google
        </button>
        <div className={styles.divider}>atau lengkapi formulir</div>
        <form className={styles.form} onSubmit={submit}>
          <div className={styles.field}>
            Pilih Peran Akun Utama
            <div className={styles.roleGrid}>
              <label
                className={`${styles.roleCard} ${role === "buyer" ? styles.roleActive : ""}`}
              >
                <input
                  type="radio"
                  checked={role === "buyer"}
                  onChange={() => setRole("buyer")}
                />
                <ShoppingBag size={18} />
                <b>Pembeli & Kolektor</b>
                <span className={styles.roleBadge}>Populer</span>
              </label>
              <label
                className={`${styles.roleCard} ${role === "seller" ? styles.roleActive : ""}`}
              >
                <input
                  type="radio"
                  checked={role === "seller"}
                  onChange={() => setRole("seller")}
                />
                <Store size={18} />
                <b>Penjual Sirkular</b>
              </label>
            </div>
          </div>
          <div className={styles.fieldRow}>
            <label className={styles.field}>
              Nama Lengkap
              <div className={`${styles.inputWrap} ${styles.withLeftIcon}`}>
                <User className={styles.inputIcon} size={17} />
                <input name="name" placeholder="Budi Santoso" required />
              </div>
            </label>
            <label className={styles.field}>
              Nomor WhatsApp
              <div className={styles.phone}>
                <span className={styles.phonePrefix}>🇮🇩 +62</span>
                <div className={styles.inputWrap} style={{ flex: 1 }}>
                  <input
                    name="phone"
                    placeholder="812 3456 7890"
                    inputMode="numeric"
                    required
                  />
                </div>
              </div>
            </label>
          </div>
          <label className={styles.field}>
            Email Aktif
            <div className={`${styles.inputWrap} ${styles.withLeftIcon}`}>
              <AtSign className={styles.inputIcon} size={17} />
              <input
                name="email"
                type="email"
                placeholder="budi@domain.id"
                required
              />
            </div>
          </label>
          <div className={styles.fieldRow}>
            <label className={styles.field}>
              Kata Sandi
              <div className={`${styles.inputWrap} ${styles.withLeftIcon}`}>
                <Lock className={styles.inputIcon} size={17} />
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={show ? "text" : "password"}
                  placeholder="Min. 8 karakter"
                  required
                />
                <button
                  className={styles.eye}
                  type="button"
                  onClick={() => setShow((v) => !v)}
                >
                  {show ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </label>
            <label className={styles.field}>
              Konfirmasi Kata Sandi
              <div className={`${styles.inputWrap} ${styles.withLeftIcon}`}>
                <Lock className={styles.inputIcon} size={17} />
                <input
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  type="password"
                  placeholder="Ulangi kata sandi"
                  required
                />
              </div>
            </label>
          </div>
          <div className={styles.strength}>
            <div className={styles.between}>
              <small>Kekuatan sandi</small>
              <small>
                {score === 0
                  ? "Menunggu input"
                  : score === 1
                    ? "Lemah"
                    : score === 2
                      ? "Cukup Baik"
                      : "Sangat Kuat"}
              </small>
            </div>
            <div className={styles.strengthBars}>
              <i className={strength.length ? styles.valid : ""} />
              <i className={strength.case ? styles.valid : ""} />
              <i className={strength.number ? styles.valid : ""} />
            </div>
            <div className={styles.requirements}>
              <span className={strength.length ? styles.validText : ""}>
                ✓ 8+ karakter
              </span>
              <span className={strength.case ? styles.validText : ""}>
                ✓ Huruf besar & kecil
              </span>
              <span className={strength.number ? styles.validText : ""}>
                ✓ Angka
              </span>
            </div>
            {confirm && password !== confirm && (
              <span className={styles.error}>
                Konfirmasi sandi tidak sesuai.
              </span>
            )}
          </div>
          <label className={styles.check}>
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
            />
            <span>
              Saya menyetujui{" "}
              <Link href="/terms" className={styles.link}>
                Ketentuan Layanan
              </Link>
              , Kebijakan Privasi, dan Protokol Transparansi Sirkular.
            </span>
          </label>
          {error && <div className={styles.error}>{error}</div>}
          <button
            className={`${styles.primaryButton} ${!agreed ? styles.submitDisabled : ""}`}
            type="submit"
          >
            Buat Akun & Dapatkan +100 Poin
            <ArrowRight size={17} />
          </button>
        </form>
        <div className={styles.secure}>
          Sudah punya akun?{" "}
          <Link className={styles.link} href="/login">
            Masuk Sekarang
          </Link>
        </div>
      </section>
    </AuthShell>
  );
}
