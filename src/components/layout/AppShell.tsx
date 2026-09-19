"use client";

import Link from "next/link";
import {
  Bell,
  Compass,
  LayoutDashboard,
  Leaf,
  LogOut,
  Plus,
  UserRound,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

const navigation = [
  { href: "/dashboard", label: "Ringkasan", icon: LayoutDashboard },
  { href: "/explore", label: "Eksplorasi barang", icon: Compass },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [displayName, setDisplayName] = useState("Pengguna");
  const [initial, setInitial] = useState("P");

  useEffect(() => {
    void createClient()
      .auth.getUser()
      .then(({ data }) => {
        const name =
          data.user?.user_metadata.full_name ??
          data.user?.email?.split("@")[0] ??
          "Pengguna";
        setDisplayName(name);
        setInitial(name.charAt(0).toUpperCase());
      });
  }, []);

  async function handleSignOut() {
    await createClient().auth.signOut();
    router.replace("/");
    router.refresh();
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <Link
          href="/dashboard"
          className="brand"
          aria-label="PakaiLagi dashboard"
        >
          <span className="brand-mark">
            <Leaf size={18} strokeWidth={2.5} />
          </span>
          <span>PakaiLagi</span>
        </Link>

        <div className="sidebar-section-label">Ruang kerja</div>
        <nav className="sidebar-nav" aria-label="Navigasi utama">
          {navigation.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={`sidebar-link ${pathname === href ? "active" : ""}`}
            >
              <Icon size={18} />
              {label}
            </Link>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="sidebar-impact">
            <span className="impact-icon">
              <Leaf size={16} />
            </span>
            <div>
              <span className="eyebrow">Dampakmu</span>
              <strong>{displayName}, 3 barang berputar</strong>
            </div>
          </div>
          <Link href="/profile" className="sidebar-link">
            <UserRound size={18} />
            Profil saya
          </Link>
          <button
            type="button"
            className="sidebar-link sidebar-button"
            onClick={handleSignOut}
          >
            <LogOut size={18} />
            Keluar
          </button>
        </div>
      </aside>

      <div className="app-content">
        <header className="topbar">
          <div className="mobile-brand brand">
            <span className="brand-mark">
              <Leaf size={18} />
            </span>
            <span>PakaiLagi</span>
          </div>
          <div className="topbar-actions">
            <button className="icon-button" aria-label="Notifikasi">
              <Bell size={19} />
            </button>
            <Link
              href="/items/new"
              className="button button-primary button-small"
            >
              <Plus size={17} /> Tambah barang
            </Link>
            <Link
              href="/profile"
              className="avatar"
              aria-label={`Buka profil ${displayName}`}
            >
              {initial}
            </Link>
          </div>
        </header>
        {children}
      </div>
    </div>
  );
}
