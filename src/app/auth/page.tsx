"use client";

import Link from "next/link";
import { ArrowLeft, Leaf, LoaderCircle, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function AuthPage() {
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleOAuth() {
    setError("");
    setIsLoading(true);
    const supabase = createClient();
    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
    if (oauthError) {
      setError(
        oauthError.message.toLowerCase().includes("provider")
          ? "Google OAuth belum diaktifkan di Supabase Dashboard."
          : oauthError.message,
      );
      setIsLoading(false);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");
    setIsLoading(true);
    const supabase = createClient();
    const result = isSignUp
      ? await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: name } },
        })
      : await supabase.auth.signInWithPassword({ email, password });

    if (result.error) {
      setError(result.error.message);
    } else if (isSignUp) {
      setMessage(
        "Akun berhasil dibuat. Cek email untuk konfirmasi jika diminta, lalu masuk.",
      );
    } else {
      router.push("/dashboard");
    }
    setIsLoading(false);
  }

  return (
    <main className="auth-page">
      <div className="auth-art">
        <Link href="/" className="brand">
          <span className="brand-mark">
            <Leaf size={18} />
          </span>
          <span>PakaiLagi</span>
        </Link>
        <div>
          <p className="eyebrow">Perjalanan barang yang lebih panjang</p>
          <h1>Yang kamu lepas, bisa jadi awal bagi orang lain.</h1>
        </div>
        <span className="auth-art-note">Kenali. Alihkan. Lanjutkan.</span>
      </div>
      <section className="auth-panel">
        <Link href="/" className="text-link">
          <ArrowLeft size={16} /> Kembali
        </Link>
        <div className="auth-form-wrap">
          <p className="eyebrow">Ruang sirkularmu</p>
          <h2>{isSignUp ? "Buat akun baru" : "Selamat datang kembali"}</h2>
          <p className="auth-subtitle">
            {isSignUp
              ? "Mulai beri langkah baru untuk barang yang kamu punya."
              : "Lanjutkan perjalanan barang-barangmu."}
          </p>
          <button type="button" className="oauth-button" onClick={handleOAuth} disabled={isLoading}>
            <Sparkles size={17} /> Lanjutkan dengan Google
          </button>
          <div className="auth-divider"><span>atau dengan email</span></div>
          <form onSubmit={handleSubmit}>
            {isSignUp && (
              <label>
                Nama lengkap
                <input
                  required
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Nama kamu"
                />
              </label>
            )}
            <label>
              Email
              <input
                required
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="kamu@email.com"
              />
            </label>
            <label>
              Password
              <input
                required
                minLength={6}
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Minimal 6 karakter"
              />
            </label>
            {error && <p className="form-error">{error}</p>}
            {message && <p className="form-message">{message}</p>}
            <button
              disabled={isLoading}
              className="button button-primary auth-submit"
            >
              {isLoading && <LoaderCircle className="spin" size={16} />}
              {isSignUp ? "Buat akun" : "Masuk ke PakaiLagi"}
            </button>
          </form>
          <button
            className="auth-switch"
            onClick={() => {
              setIsSignUp(!isSignUp);
              setError("");
              setMessage("");
            }}
          >
            {isSignUp ? "Sudah punya akun? Masuk" : "Belum punya akun? Daftar"}
          </button>
        </div>
      </section>
    </main>
  );
}
