"use client";
import Link from "next/link";
import { LogOut, Store, User as UserIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import { focus } from "@/components/ui/tokens";

const linkBase = `inline-flex min-h-10 items-center gap-1.5 rounded-xl px-3.5 text-sm font-semibold no-underline transition-colors ${focus}`;

export function AuthNav() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setReady(true);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  async function logout() {
    await createClient().auth.signOut();
    setUser(null);
    router.push("/");
    router.refresh();
  }

  // Placeholder supaya navbar tidak berkedip saat status login dicek
  if (!ready) return <div className="h-10 w-40" aria-hidden="true" />;

  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Link
          href="/login"
          className={`${linkBase} !text-[#0B4F3F] hover:bg-[#E6F2ED]`}
        >
          Masuk
        </Link>
        <Link
          href="/register"
          className={`${linkBase} bg-[#0B4F3F] !text-white hover:bg-[#083D31]`}
        >
          Daftar
        </Link>
      </div>
    );
  }

  const name =
    (user.user_metadata?.full_name as string | undefined)?.split(" ")[0] ??
    user.email?.split("@")[0] ??
    "Akun";

  return (
    <div className="flex items-center gap-1">
      <Link
        href="/seller/dashboard"
        className={`${linkBase} !text-[#0B4F3F] hover:bg-[#E6F2ED]`}
      >
        <Store size={16} />
        <span className="hidden sm:inline">Mode penjual</span>
      </Link>
      <Link
        href="/profile"
        className={`${linkBase} !text-[#111827] hover:bg-[#F0F2EF]`}
      >
        <UserIcon size={16} />
        <span className="hidden sm:inline">{name}</span>
      </Link>
      <button
        type="button"
        onClick={logout}
        aria-label="Keluar"
        className={`${linkBase} cursor-pointer text-[#5B6675] hover:bg-[#F0F2EF]`}
      >
        <LogOut size={16} />
        <span className="hidden sm:inline">Keluar</span>
      </button>
    </div>
  );
}
