"use client";

import Link from "next/link";
import { ArrowLeft, Check, CreditCard, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { marketplaceListings } from "@/lib/marketplace/data";

export default function CheckoutPage({ params }: { params: { id: string } }) {
  const listing =
    marketplaceListings.find((item) => item.id === params.id) ??
    marketplaceListings[1];
  const [paid, setPaid] = useState(false);

  return (
    <AppShell>
      <main className="dashboard-page checkout-page">
        <Link href={`/marketplace/${listing.id}/chat`} className="text-link">
          <ArrowLeft size={16} /> Kembali ke chat
        </Link>
        <section className="page-heading-block">
          <p className="eyebrow">Pembayaran demo</p>
          <h1>Amankan transaksi dengan jelas.</h1>
          <p>
            Pembayaran production nanti diproses melalui Midtrans atau Xendit.
            Saat ini gunakan simulasi untuk demo alur lomba.
          </p>
        </section>
        {paid ? (
          <section className="payment-success">
            <div>
              <Check size={28} />
            </div>
            <p className="eyebrow">Pembayaran berhasil</p>
            <h2>Transaksi siap untuk serah terima.</h2>
            <p>
              Kode serah-terima akan dibuat setelah seller mengonfirmasi jadwal.
            </p>
            <Link href="/dashboard" className="button button-primary">
              Kembali ke dashboard
            </Link>
          </section>
        ) : (
          <section className="checkout-card">
            <div className={`checkout-visual ${listing.accent}`}>
              <span>{listing.glyph}</span>
            </div>
            <div className="checkout-info">
              <p className="eyebrow">Barang yang dipilih</p>
              <h2>{listing.title}</h2>
              <span>
                {listing.location} · Seller {listing.seller}
              </span>
              <div className="checkout-total">
                <small>Total simulasi</small>
                <strong>
                  Rp{(listing.price ?? 0).toLocaleString("id-ID")}
                </strong>
              </div>
              <p className="checkout-safety">
                <ShieldCheck size={15} /> Uang tidak benar-benar dipotong dalam
                mode demo.
              </p>
              <button
                className="button button-primary"
                onClick={() => setPaid(true)}
              >
                <CreditCard size={17} /> Bayar sekarang (demo)
              </button>
            </div>
          </section>
        )}
      </main>
    </AppShell>
  );
}
