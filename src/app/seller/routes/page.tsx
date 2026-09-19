"use client";
import {
  ArrowRight,
  CheckCircle,
  Clock,
  Handshake,
  Leaf,
  Recycle,
  Settings2,
  Sparkles,
  Wrench,
} from "lucide-react";
import { useState } from "react";
import { SellerShell } from "@/components/seller/SellerShell";
import { repairQueue, swapProposals } from "@/data/seller-operations-data";
import styles from "@/components/seller/SellerOperations.module.css";
const money = (value: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
type Tab = "swap" | "repair" | "parts" | "recovery";
export default function SellerRoutesPage() {
  const [tab, setTab] = useState<Tab>("swap");
  const [toast, setToast] = useState("");
  const [modal, setModal] = useState<string | null>(null);
  function notify(value: string) {
    setToast(value);
    setTimeout(() => setToast(""), 2400);
  }
  return (
    <SellerShell active="routes">
      <main className={styles.page}>
        <header className={styles.head}>
          <div>
            <h1>Manajemen Rute Swap & Repair</h1>
            <p>
              Kelola barter terverifikasi, reparasi, pemulihan suku cadang, dan
              daur ulang material.
            </p>
          </div>
          <div className={styles.actions}>
            <button className={styles.secondary}>
              <Settings2 size={17} />
              Batas Toleransi Swap
            </button>
            <button
              className={styles.primary}
              onClick={() => setModal("partner")}
            >
              <Handshake size={17} />
              Daftarkan Mitra Reparasi
            </button>
          </div>
        </header>
        <section className={styles.metrics}>
          {[
            {
              label: "Usulan Swap Masuk",
              value: "4 Penawaran",
              detail: "2 membutuhkan valuasi AI",
              icon: Handshake,
            },
            {
              label: "Unit Dalam Reparasi",
              value: "6 Unit",
              detail: "Teknisi akreditasi sirkular",
              icon: Wrench,
            },
            {
              label: "Nilai Terselamatkan",
              value: "Rp14.800.000",
              detail: "Restorasi & parts recovery",
              icon: Leaf,
            },
            {
              label: "Pengalihan e-Waste",
              value: "58,4 kg",
              detail: "Dialihkan dari TPA bulan ini",
              icon: Recycle,
            },
          ].map(({ label, value, detail, icon: Icon }) => (
            <article className={styles.metric} key={label}>
              <div className={styles.between}>
                <span>{label}</span>
                <Icon color="#005144" />
              </div>
              <strong>{value}</strong>
              <small>{detail}</small>
            </article>
          ))}
        </section>
        <nav className={styles.tabs}>
          {(
            [
              ["swap", "Usulan Tukar Tambah"],
              ["repair", "Unit Dalam Reparasi"],
              ["parts", "Parts Harvest"],
              ["recovery", "Log Daur Ulang"],
            ] as [Tab, string][]
          ).map(([id, label]) => (
            <button
              key={id}
              className={`${styles.tab} ${tab === id ? styles.tabActive : ""}`}
              onClick={() => setTab(id)}
            >
              {label}
            </button>
          ))}
        </nav>
        {tab === "swap" && (
          <section className={styles.orders}>
            <div className={styles.between}>
              <h2>Usulan Swap Membutuhkan Tanggapan</h2>
              <span className={styles.muted}>
                AI Smart-Valuation diperbarui 12 menit lalu
              </span>
            </div>
            {swapProposals.map((proposal) => (
              <article className={styles.swapCard} key={proposal.id}>
                <header className={styles.swapHeader}>
                  <div>
                    <span className={styles.badge}>#{proposal.id}</span>{" "}
                    <b>{proposal.type}</b>
                  </div>
                  <span className={styles.muted}>
                    <Clock size={14} /> {proposal.deadline}
                  </span>
                </header>
                <div className={styles.comparison}>
                  <div className={styles.swapItem}>
                    <small>BARANG ANDA</small>
                    <div className={styles.swapProduct}>
                      <img src={proposal.own.image} alt={proposal.own.name} />
                      <div>
                        <span className={styles.badge}>
                          AI {proposal.own.score}/100
                        </span>
                        <h3>{proposal.own.name}</h3>
                        <small>{proposal.own.passport}</small>
                        <div className={styles.amount}>
                          {money(proposal.own.value)}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.bridge}>
                    <Handshake color="#005144" />
                    <small>
                      {proposal.topUp ? "SELISIH ESCROW" : "BARTER LANGSUNG"}
                    </small>
                    <strong>
                      {proposal.topUp
                        ? `+${money(proposal.topUp)}`
                        : "Tanpa Top-Up"}
                    </strong>
                    <span>Kecocokan AI {proposal.match}%</span>
                  </div>
                  <div className={styles.swapItem}>
                    <small>BARANG DITAWARKAN</small>
                    <div className={styles.swapProduct}>
                      <img
                        src={proposal.offered.image}
                        alt={proposal.offered.name}
                      />
                      <div>
                        <span className={styles.badge}>
                          AI {proposal.offered.score}/100
                        </span>
                        <h3>{proposal.offered.name}</h3>
                        <small>{proposal.offered.passport}</small>
                        <div className={styles.amount}>
                          {money(proposal.offered.value)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.aiInsight}>
                  <Sparkles size={17} /> <b>Analisis AI Matchmaker:</b> Kategori
                  dan likuiditas pasar dinilai seimbang. Inspeksi kedua barang
                  dilakukan di Circular Hub.
                </div>
                <div
                  className={styles.actions}
                  style={{ justifyContent: "flex-end" }}
                >
                  <button
                    className={styles.danger}
                    onClick={() => notify("Usulan ditandai untuk ditolak.")}
                  >
                    Tolak
                  </button>
                  <button
                    className={styles.secondary}
                    onClick={() => setModal(proposal.id)}
                  >
                    Negosiasi Top-Up
                  </button>
                  <button
                    className={styles.primary}
                    onClick={() => notify(`Usulan ${proposal.id} diterima.`)}
                  >
                    <CheckCircle size={16} />
                    Terima Usulan
                  </button>
                </div>
              </article>
            ))}
          </section>
        )}
        {tab === "repair" && (
          <section className={styles.repairList}>
            <div className={styles.repairHeader}>
              <h2>Pusat Antrian Reparasi & Restorasi Nilai</h2>
              <span className={styles.muted}>
                6 unit aktif pada mitra bengkel
              </span>
            </div>
            <div className={styles.repairGrid}>
              {repairQueue.map((item) => (
                <article className={styles.repairCard} key={item.id}>
                  <div className={styles.repairHeader}>
                    <div>
                      <small>#{item.id}</small>
                      <h3>{item.name}</h3>
                    </div>
                    <span className={styles.badge}>{item.status}</span>
                  </div>
                  <p>{item.issue}</p>
                  <div className={styles.repairValue}>
                    <div>
                      <small>Biaya</small>
                      <b>{money(item.cost)}</b>
                    </div>
                    <div>
                      <small>Kenaikan Nilai</small>
                      <b>+{money(item.uplift)}</b>
                    </div>
                  </div>
                  <p className={styles.muted}>
                    Mitra: <b>{item.partner}</b> • Estimasi {item.eta}
                  </p>
                </article>
              ))}
            </div>
          </section>
        )}
        {tab === "parts" && (
          <section className={styles.card}>
            <h2>Parts Harvest Terverifikasi</h2>
            <p>
              Komponen layak pakai dari unit yang tidak ekonomis diperbaiki akan
              dicatat dengan asal paspor, kondisi, kompatibilitas, serta tujuan
              penggunaan ulang.
            </p>
            <button
              className={styles.primary}
              onClick={() => notify("Form pencatatan komponen dibuka.")}
            >
              Catat Komponen Pulih
            </button>
          </section>
        )}
        {tab === "recovery" && (
          <section className={styles.card}>
            <h2>Log Daur Ulang & Material Recovery</h2>
            <p>
              12 batch material telah dialihkan ke mitra daur ulang resmi. Total
              58,4 kg e-waste tidak masuk ke TPA bulan ini.
            </p>
            <button
              className={styles.secondary}
              onClick={() => notify("Laporan pemulihan material disiapkan.")}
            >
              Unduh Laporan Ledger
            </button>
          </section>
        )}
        <section className={styles.impact}>
          <div>
            <span className={styles.badge}>
              <Leaf size={14} />
              Kalkulator Dampak Swap vs Baru
            </span>
            <h2>Hemat Hingga 84% Jejak Karbon</h2>
            <p className={styles.muted}>
              Memperpanjang masa pakai perangkat memangkas ekstraksi mineral dan
              kebutuhan produksi baru.
            </p>
          </div>
          <div className={styles.impactCompare}>
            <div>
              <small>Produksi Baru</small>
              <h3 style={{ color: "#c95555", textDecoration: "line-through" }}>
                78 kg CO₂e
              </h3>
            </div>
            <ArrowRight />
            <div>
              <small>Swap / Repair</small>
              <h2 style={{ color: "#2f8f68" }}>12,5 kg CO₂e</h2>
              <span className={styles.badge}>-84% Emisi</span>
            </div>
          </div>
        </section>
      </main>
      {toast && <div className={styles.toast}>{toast}</div>}
      {modal && (
        <div className={styles.modalBackdrop}>
          <form
            className={styles.modal}
            onSubmit={(event) => {
              event.preventDefault();
              notify(
                modal === "partner"
                  ? "Mitra reparasi ditambahkan secara lokal."
                  : "Nominal negosiasi dikirim.",
              );
              setModal(null);
            }}
          >
            <h3>
              {modal === "partner"
                ? "Daftarkan Mitra Reparasi"
                : "Negosiasi Nominal Top-Up"}
            </h3>
            {modal === "partner" ? (
              <>
                <input placeholder="Nama mitra bengkel" required />
                <input placeholder="Spesialisasi" required />
                <textarea
                  placeholder="Alamat dan kontak operasional"
                  required
                />
              </>
            ) : (
              <>
                <input defaultValue="Rp 600.000" />
                <textarea defaultValue="Nominal mengikuti selisih valuasi AI dan inspeksi fisik Hub." />
              </>
            )}
            <div className={styles.actions}>
              <button
                type="button"
                className={styles.secondary}
                onClick={() => setModal(null)}
              >
                Batal
              </button>
              <button className={styles.primary}>Simpan</button>
            </div>
          </form>
        </div>
      )}
    </SellerShell>
  );
}
