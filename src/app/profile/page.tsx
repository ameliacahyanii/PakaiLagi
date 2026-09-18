"use client";

import Link from "next/link";
import { ArrowLeft, Leaf, LogOut, MapPin, ShieldCheck, UserRound } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function ProfilePage() {
  const router = useRouter();
  const [email, setEmail] = useState("Memuat akun...");
  const [name, setName] = useState("Pengguna PakaiLagi");
  const [city, setCity] = useState("Belum diatur");

  useEffect(() => {
    const supabase = createClient();
    void supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) {
        router.replace("/auth");
        return;
      }
      setEmail(data.user.email ?? "Email tidak tersedia");
      setName(data.user.user_metadata.full_name ?? data.user.email?.split("@")[0] ?? "Pengguna PakaiLagi");
      const profile = await supabase.from("profiles").select("display_name, city, role").eq("id", data.user.id).maybeSingle();
      if (profile.data) {
        setName(profile.data.display_name ?? name);
        setCity(profile.data.city ?? "Belum diatur");
      }
    });
  }, [router]);

  async function handleSignOut() {
    await createClient().auth.signOut();
    router.replace("/");
  }

  return (
    <main className="profile-page"><div className="profile-topbar"><Link href="/dashboard" className="brand"><span className="brand-mark"><Leaf size={18} /></span><span>PakaiLagi</span></Link><Link href="/dashboard" className="text-link"><ArrowLeft size={16} /> Kembali ke ringkasan</Link></div><section className="profile-card"><div className="profile-avatar"><UserRound size={30} /></div><p className="eyebrow">Profil pengguna</p><h1>{name}</h1><p className="profile-email">{email}</p><div className="profile-details"><div><MapPin size={17} /><span><small>Lokasi</small><strong>{city}</strong></span></div><div><ShieldCheck size={17} /><span><small>Peran akun</small><strong>User</strong></span></div><div><Leaf size={17} /><span><small>Dampak tercatat</small><strong>3 barang berputar</strong></span></div></div><div className="profile-actions"><button type="button" className="button button-primary">Simpan perubahan</button><button type="button" className="button button-ghost" onClick={handleSignOut}><LogOut size={16} /> Keluar</button></div></section></main>
  );
}
