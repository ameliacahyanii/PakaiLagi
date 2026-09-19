import Link from "next/link";
import { Leaf, ShieldCheck } from "lucide-react";
import styles from "./Auth.module.css";
export function AuthShell({
  mode,
  children,
}: {
  mode: "login" | "register";
  children: React.ReactNode;
}) {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link href="/" className={styles.brand}>
            <span className={styles.brandIcon}>
              <Leaf size={21} />
            </span>
            PakaiLagi
          </Link>
          <div className={styles.headerLinks}>
            <Link className={styles.help} href="/help">
              <ShieldCheck size={17} /> Bantuan & Keamanan
            </Link>
            <span>
              {mode === "login" ? "Belum punya akun?" : "Sudah punya akun?"}
            </span>
            <Link href={mode === "login" ? "/register" : "/login"}>
              {mode === "login" ? "Daftar" : "Masuk"}
            </Link>
          </div>
        </div>
      </header>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <span>
            © 2026 PakaiLagi. Perlindungan data dan transaksi sirkular.
          </span>
          <div className={styles.footerLinks}>
            <Link href="/privacy">Privasi</Link>
            <Link href="/security">Keamanan Akun</Link>
            <Link href="/terms">Syarat & Ketentuan</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
