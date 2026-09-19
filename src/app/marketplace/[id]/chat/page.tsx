"use client";

import Link from "next/link";
import { ArrowLeft, Send, ShieldCheck } from "lucide-react";
import { FormEvent, useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { marketplaceListings } from "@/lib/marketplace/data";

export default function ChatPage({ params }: { params: { id: string } }) {
  const listing =
    marketplaceListings.find((item) => item.id === params.id) ??
    marketplaceListings[0];
  const [messages, setMessages] = useState([
    {
      from: "seller",
      text: `Halo, terima kasih sudah tertarik dengan ${listing.title}.`,
    },
  ]);
  const [message, setMessage] = useState("");

  function sendMessage(event: FormEvent) {
    event.preventDefault();
    if (!message.trim()) return;
    setMessages((current) => [
      ...current,
      { from: "buyer", text: message.trim() },
    ]);
    setMessage("");
  }

  return (
    <AppShell>
      <main className="dashboard-page chat-page">
        <Link href={`/marketplace/${listing.id}`} className="text-link">
          <ArrowLeft size={16} /> Kembali ke listing
        </Link>
        <section className="chat-heading">
          <div>
            <p className="eyebrow">Percakapan aman</p>
            <h1>{listing.title}</h1>
            <p>
              Dengan {listing.seller} · {listing.location}
            </p>
          </div>
          <span>
            <ShieldCheck size={15} /> Jangan bagikan data sensitif
          </span>
        </section>
        <section className="chat-window">
          <div className="chat-messages">
            {messages.map((item, index) => (
              <div
                className={`chat-bubble ${item.from}`}
                key={`${item.text}-${index}`}
              >
                {item.text}
              </div>
            ))}
          </div>
          <form className="chat-compose" onSubmit={sendMessage}>
            <input
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Tulis pesan untuk pemilik..."
              aria-label="Pesan"
            />
            <button type="submit" aria-label="Kirim pesan">
              <Send size={17} />
            </button>
          </form>
        </section>
        {listing.price && (
          <Link
            href={`/marketplace/${listing.id}/checkout`}
            className="button button-primary chat-checkout"
          >
            Lanjut ke pembayaran demo
          </Link>
        )}
      </main>
    </AppShell>
  );
}
