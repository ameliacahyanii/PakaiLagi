"use client";

import Link from "next/link";
import { ArrowLeft, Check, MapPin, ShieldCheck, Sparkles } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { marketplaceListings } from "@/lib/marketplace/data";
import { createClient } from "@/lib/supabase/client";

export default function MarketplaceDetail({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const listing =
    marketplaceListings.find((item) => item.id === params.id) ??
    marketplaceListings[0];
  const [status, setStatus] = useState<
    "idle" | "loading" | "claimed" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  async function handleClaim() {
    setStatus("loading");
    setMessage("");
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      router.push("/auth");
      return;
    }
    if (!/^[0-9a-f-]{36}$/i.test(listing.id)) {
      setStatus("claimed");
      setMessage(
        "Permintaan klaim demo tercatat. Setelah database aktif, permintaan ini akan tersimpan permanen.",
      );
      return;
    }
    const { error } = await supabase
      .from("claims")
      .insert({ listing_id: listing.id, claimant_id: user.id });
    if (error) {
      setStatus("error");
      setMessage(error.message);
    } else {
      setStatus("claimed");
      setMessage("Permintaan klaim berhasil dikirim ke pemilik barang.");
    }
  }

  return (
    <AppShell>
      <main className="dashboard-page detail-page">
        <Link href="/explore" className="text-link">
          <ArrowLeft size={16} /> Kembali ke eksplorasi
        </Link>
        <section className="detail-layout">
          <div className={`detail-visual ${listing.accent}`}>
            <span>{listing.glyph}</span>
            <span className="visual-label">{listing.category}</span>
          </div>
          <div className="detail-copy">
            <div className="detail-heading">
              <div>
                <p className="eyebrow">
                  {listing.action} · {listing.category}
                </p>
                <h1>{listing.title}</h1>
              </div>
              {listing.verified && (
                <span className="verified-badge">
                  <ShieldCheck size={14} /> Terverifikasi
                </span>
              )}
            </div>
            <div className="detail-price">
              {listing.price
                ? `Rp${listing.price.toLocaleString("id-ID")}`
                : "Untuk komunitas"}
              <small>
                {listing.action === "Jual"
                  ? "Harga dari pemilik"
                  : "Tidak dipungut biaya"}
              </small>
            </div>
            <p className="detail-description">{listing.description}</p>
            <div className="detail-facts">
              <span>
                <MapPin size={15} /> {listing.location}
              </span>
              <span>
                <Check size={15} /> Skor kondisi {listing.conditionScore}/100
              </span>
              <span>
                <Sparkles size={15} /> Pemilik: {listing.seller}
              </span>
            </div>
            {status === "claimed" ? (
              <div className="claim-success">
                <Check size={18} />
                <strong>Permintaan dikirim</strong>
                <p>{message}</p>
              </div>
            ) : (
              <button
                className="button button-primary claim-button"
                disabled={status === "loading"}
                onClick={handleClaim}
              >
                {status === "loading"
                  ? "Mengirim..."
                  : listing.action === "Donasi"
                    ? "Ajukan untuk menerima"
                    : listing.action === "Tukar"
                      ? "Ajukan pertukaran"
                      : "Klaim barang ini"}
              </button>
            )}
            {status === "error" && <p className="form-error">{message}</p>}
            <p className="detail-safety">
              Pastikan kondisi dan waktu serah terima dikonfirmasi bersama.
              Jangan membagikan data sensitif melalui deskripsi barang.
            </p>
          </div>
        </section>
      </main>
    </AppShell>
  );
}
