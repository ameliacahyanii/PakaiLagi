"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Check,
  ClipboardCheck,
  Flag,
  ShieldAlert,
} from "lucide-react";
import { useEffect, useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { createClient } from "@/lib/supabase/client";

export default function AdminPage() {
  const [role, setRole] = useState("Memeriksa akses...");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    void supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) {
        setRole("Silakan masuk terlebih dahulu.");
        return;
      }
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", data.user.id)
        .maybeSingle();
      const admin = profile?.role === "admin";
      setIsAdmin(admin);
      setRole(admin ? "admin" : (profile?.role ?? "user"));
    });
  }, []);

  return (
    <AppShell>
      <main className="dashboard-page admin-page">
        <Link href="/dashboard" className="text-link">
          <ArrowLeft size={16} /> Kembali ke dashboard
        </Link>
        {isAdmin ? (
          <>
            <section className="page-heading-block">
              <p className="eyebrow">Admin workspace</p>
              <h1>Moderasi komunitas.</h1>
              <p>
                Tinjau listing, laporan, dan transaksi yang membutuhkan
                perhatian.
              </p>
            </section>
            <div className="admin-grid">
              <div className="admin-card">
                <ClipboardCheck size={21} />
                <strong>6</strong>
                <span>Listing menunggu review</span>
                <button>
                  <Check size={15} /> Buka antrian
                </button>
              </div>
              <div className="admin-card">
                <Flag size={21} />
                <strong>2</strong>
                <span>Laporan pengguna</span>
                <button>
                  <Check size={15} /> Tinjau laporan
                </button>
              </div>
              <div className="admin-card">
                <ShieldAlert size={21} />
                <strong>0</strong>
                <span>Transaksi bermasalah</span>
                <button>
                  <Check size={15} /> Lihat transaksi
                </button>
              </div>
            </div>
          </>
        ) : (
          <section className="access-denied">
            <ShieldAlert size={30} />
            <h1>Akses admin diperlukan.</h1>
            <p>
              Role akunmu saat ini: <strong>{role}</strong>. Admin dibuat manual
              melalui Supabase, bukan dari form daftar publik.
            </p>
            <Link href="/dashboard" className="button button-primary">
              Kembali ke dashboard
            </Link>
          </section>
        )}
      </main>
    </AppShell>
  );
}
