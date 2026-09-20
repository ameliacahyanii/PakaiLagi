"use client";
import {
  CheckCircle,
  Clock,
  Handshake,
  Inbox,
  Leaf,
  Recycle,
  Settings2,
  Sparkles,
  Undo2,
  Wrench,
} from "lucide-react";
import {
  type KeyboardEvent as ReactKeyboardEvent,
  useCallback,
  useState,
} from "react";
import { SellerShell } from "@/components/seller/SellerShell";
import { repairQueue, swapProposals } from "@/data/seller-operations-data";
import { Dialog, Field } from "@/components/ui/Dialog";
import {
  badge,
  btnDanger,
  btnPrimary,
  btnSecondary,
  card,
  display,
  body,
  field,
  focus,
  money,
} from "@/components/ui/tokens";
import { useToast } from "@/components/ui/useToast";

type Tab = "swap" | "repair" | "parts" | "recovery";
type Decision = "accepted" | "rejected" | "negotiating";
type DialogState = { kind: "partner" } | { kind: "topup"; id: string } | null;

const tabs: { id: Tab; label: string }[] = [
  { id: "swap", label: "Usulan Tukar Tambah" },
  { id: "repair", label: "Unit Dalam Reparasi" },
  { id: "parts", label: "Parts Harvest" },
  { id: "recovery", label: "Log Daur Ulang" },
];

const metrics = [
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
];

const decisionLabel: Record<Decision, string> = {
  accepted: "Usulan diterima",
  rejected: "Usulan ditolak",
  negotiating: "Menunggu balasan negosiasi",
};

/* ---------- Panel barang swap ---------- */
type SwapItem = {
  image: string;
  name: string;
  score: number;
  passport: string;
  value: number;
};

function SwapItemPanel({ label, item }: { label: string; item: SwapItem }) {
  return (
    <div className="rounded-xl border border-[#E4E7EB] p-4">
      <p className="text-xs font-semibold text-[#5B6675]">{label}</p>
      <div className="mt-3 flex gap-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.image}
          alt={item.name}
          className="h-20 w-20 shrink-0 rounded-lg bg-[#F0F2EF] object-cover sm:h-24 sm:w-24"
        />
        <div className="min-w-0">
          <span className={badge}>AI {item.score}/100</span>
          <h3 className="mt-2 text-[0.98rem] leading-snug font-semibold">
            {item.name}
          </h3>
          <p className="text-xs text-[#5B6675]">{item.passport}</p>
          <p
            className={`${display} mt-1 text-[1.4rem] leading-none font-normal`}
          >
            {money(item.value)}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ---------- Halaman ---------- */
export default function SellerRoutesPage() {
  const [tab, setTab] = useState<Tab>("swap");
  const { notify, toast } = useToast();
  const [dialog, setDialog] = useState<DialogState>(null);
  const [decisions, setDecisions] = useState<Record<string, Decision>>({});
  const decide = (id: string, decision: Decision, message: string) => {
    setDecisions((d) => ({ ...d, [id]: decision }));
    notify(message);
  };
  const undo = (id: string) => {
    setDecisions((d) => {
      const next = { ...d };
      delete next[id];
      return next;
    });
    notify("Keputusan dibatalkan. Usulan kembali menunggu tanggapan.");
  };

  const pending = swapProposals.filter((p) => !decisions[p.id]).length;
  const closeDialog = useCallback(() => setDialog(null), []);
  const topupProposal =
    dialog?.kind === "topup"
      ? swapProposals.find((p) => p.id === dialog.id)
      : undefined;

  const onTabKey = (e: ReactKeyboardEvent) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const i = tabs.findIndex((t) => t.id === tab);
    const next =
      e.key === "ArrowRight"
        ? (i + 1) % tabs.length
        : (i - 1 + tabs.length) % tabs.length;
    setTab(tabs[next].id);
    document.getElementById(`tab-${tabs[next].id}`)?.focus();
  };

  return (
    <SellerShell active="routes">
      <main
        className={`${body} mx-auto w-full max-w-[1200px] space-y-8 px-4 py-6 text-[#111827] antialiased sm:px-6 sm:py-8`}
      >
        {/* ============ Header ============ */}
        <header className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1
              className={`${display} text-[2rem] leading-[1.08] font-normal tracking-[-0.01em] sm:text-[2.6rem]`}
            >
              Manajemen Rute Swap & Repair
            </h1>
            <p className="mt-2 max-w-[56ch] leading-relaxed text-[#5B6675]">
              Kelola barter terverifikasi, reparasi, pemulihan suku cadang, dan
              daur ulang material.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              className={btnSecondary}
              onClick={() => notify("Pengaturan batas toleransi swap dibuka.")}
            >
              <Settings2 size={17} /> Batas Toleransi Swap
            </button>
            <button
              type="button"
              className={btnPrimary}
              onClick={() => setDialog({ kind: "partner" })}
            >
              <Handshake size={17} /> Daftarkan Mitra Reparasi
            </button>
          </div>
        </header>

        {/* ============ Metrik ============ */}
        <section
          aria-label="Ringkasan"
          className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4"
        >
          {metrics.map(({ label, value, detail, icon: Icon }) => (
            <article key={label} className={`${card} p-4 sm:p-5`}>
              <div className="flex items-start justify-between gap-2">
                <span className="text-[0.82rem] leading-snug text-[#5B6675]">
                  {label}
                </span>
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#E6F2ED] text-[#0B4F3F]">
                  <Icon size={16} />
                </span>
              </div>
              <strong
                className={`${display} mt-3 block text-[1.55rem] leading-none font-normal sm:text-[1.9rem]`}
              >
                {value}
              </strong>
              <small className="mt-2 block text-xs text-[#5B6675]">
                {detail}
              </small>
            </article>
          ))}
        </section>

        {/* ============ Tab ============ */}
        <div className="-mx-4 overflow-x-auto px-4 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden">
          <div
            role="tablist"
            aria-label="Bagian rute"
            onKeyDown={onTabKey}
            className="inline-flex gap-1 rounded-xl bg-[#ECEEEB] p-1"
          >
            {tabs.map((t) => {
              const active = tab === t.id;
              const count =
                t.id === "swap"
                  ? pending
                  : t.id === "repair"
                    ? repairQueue.length
                    : null;
              return (
                <button
                  key={t.id}
                  id={`tab-${t.id}`}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  aria-controls={`panel-${t.id}`}
                  tabIndex={active ? 0 : -1}
                  onClick={() => setTab(t.id)}
                  className={`inline-flex min-h-10 shrink-0 cursor-pointer items-center gap-2 rounded-lg px-4 text-[0.88rem] font-semibold whitespace-nowrap transition-all ${focus} ${
                    active
                      ? "bg-white text-[#111827] shadow-[0_1px_3px_rgba(17,24,39,0.12)]"
                      : "text-[#5B6675] hover:text-[#111827]"
                  }`}
                >
                  {t.label}
                  {count !== null && count > 0 && (
                    <span
                      className={`grid h-5 min-w-5 place-items-center rounded-full px-1.5 text-[0.7rem] font-bold ${
                        active
                          ? "bg-[#0B4F3F] text-white"
                          : "bg-white text-[#5B6675]"
                      }`}
                    >
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ============ Panel: Swap ============ */}
        {tab === "swap" && (
          <section
            id="panel-swap"
            role="tabpanel"
            aria-labelledby="tab-swap"
            className="space-y-5"
          >
            <div className="flex flex-wrap items-end justify-between gap-2">
              <h2 className="text-[1.15rem] font-semibold tracking-tight">
                Usulan swap membutuhkan tanggapan
              </h2>
              <span className="text-sm text-[#5B6675]">
                AI Smart-Valuation diperbarui 12 menit lalu
              </span>
            </div>

            {swapProposals.length === 0 && (
              <div
                className={`${card} grid place-items-center gap-2 px-4 py-14 text-center text-[#5B6675]`}
              >
                <Inbox size={28} />
                <p>Belum ada usulan swap masuk.</p>
              </div>
            )}

            {swapProposals.map((proposal) => {
              const decision = decisions[proposal.id];
              return (
                <article
                  key={proposal.id}
                  className={`${card} overflow-hidden`}
                >
                  <header className="flex flex-wrap items-center justify-between gap-2 border-b border-[#EDEFEC] px-5 py-4 sm:px-6">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="rounded-full border border-[#E4E7EB] px-2.5 py-1 text-xs font-semibold text-[#5B6675]">
                        #{proposal.id}
                      </span>
                      <b className="font-semibold">{proposal.type}</b>
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-sm text-[#5B6675]">
                      <Clock size={14} /> {proposal.deadline}
                    </span>
                  </header>

                  <div className="grid gap-4 p-5 sm:p-6 lg:grid-cols-[1fr_auto_1fr] lg:items-stretch">
                    <SwapItemPanel label="Barang Anda" item={proposal.own} />

                    <div className="flex items-center justify-center gap-3 rounded-xl bg-[#F7F8F7] px-4 py-3 text-center lg:min-w-[11rem] lg:flex-col lg:gap-1.5 lg:px-6">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#E6F2ED] text-[#0B4F3F]">
                        <Handshake size={18} />
                      </span>
                      <div>
                        <small className="block text-xs text-[#5B6675]">
                          {proposal.topUp
                            ? "Selisih escrow"
                            : "Barter langsung"}
                        </small>
                        <strong
                          className={`${display} block text-[1.4rem] leading-tight font-normal`}
                        >
                          {proposal.topUp
                            ? `+${money(proposal.topUp)}`
                            : "Tanpa top-up"}
                        </strong>
                        <span className="text-xs font-semibold text-[#0B4F3F]">
                          Kecocokan AI {proposal.match}%
                        </span>
                      </div>
                    </div>

                    <SwapItemPanel
                      label="Barang Ditawarkan"
                      item={proposal.offered}
                    />
                  </div>

                  <div className="mx-5 mb-5 flex gap-3 rounded-xl bg-[#E6F2ED] p-4 text-sm leading-relaxed text-[#0A3D31] sm:mx-6">
                    <Sparkles size={17} className="mt-0.5 shrink-0" />
                    <p>
                      <b className="font-semibold">Analisis AI Matchmaker:</b>{" "}
                      Kategori dan likuiditas pasar dinilai seimbang. Inspeksi
                      kedua barang dilakukan di Circular Hub.
                    </p>
                  </div>

                  <footer className="flex flex-col gap-3 border-t border-[#EDEFEC] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                    {decision ? (
                      <>
                        <span
                          className={`inline-flex items-center gap-2 text-sm font-semibold ${
                            decision === "rejected"
                              ? "text-[#B4432B]"
                              : "text-[#0B4F3F]"
                          }`}
                          role="status"
                        >
                          <CheckCircle size={17} />
                          {decisionLabel[decision]}
                        </span>
                        <button
                          type="button"
                          className={btnSecondary}
                          onClick={() => undo(proposal.id)}
                        >
                          <Undo2 size={16} /> Batalkan keputusan
                        </button>
                      </>
                    ) : (
                      <>
                        <span className="hidden text-sm text-[#5B6675] sm:block">
                          Pilih tanggapan untuk usulan ini
                        </span>
                        <div className="flex flex-col-reverse gap-3 sm:flex-row">
                          <button
                            type="button"
                            className={btnDanger}
                            onClick={() =>
                              decide(
                                proposal.id,
                                "rejected",
                                `Usulan ${proposal.id} ditolak.`,
                              )
                            }
                          >
                            Tolak
                          </button>
                          <button
                            type="button"
                            className={btnSecondary}
                            onClick={() =>
                              setDialog({ kind: "topup", id: proposal.id })
                            }
                          >
                            Negosiasi Top-Up
                          </button>
                          <button
                            type="button"
                            className={btnPrimary}
                            onClick={() =>
                              decide(
                                proposal.id,
                                "accepted",
                                `Usulan ${proposal.id} diterima.`,
                              )
                            }
                          >
                            <CheckCircle size={16} /> Terima Usulan
                          </button>
                        </div>
                      </>
                    )}
                  </footer>
                </article>
              );
            })}
          </section>
        )}

        {/* ============ Panel: Reparasi ============ */}
        {tab === "repair" && (
          <section
            id="panel-repair"
            role="tabpanel"
            aria-labelledby="tab-repair"
            className="space-y-5"
          >
            <div className="flex flex-wrap items-end justify-between gap-2">
              <h2 className="text-[1.15rem] font-semibold tracking-tight">
                Pusat antrian reparasi & restorasi nilai
              </h2>
              <span className="text-sm text-[#5B6675]">
                {repairQueue.length} unit aktif pada mitra bengkel
              </span>
            </div>

            {repairQueue.length === 0 ? (
              <div
                className={`${card} grid place-items-center gap-2 px-4 py-14 text-center text-[#5B6675]`}
              >
                <Inbox size={28} />
                <p>Tidak ada unit dalam reparasi.</p>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {repairQueue.map((item) => (
                  <article
                    key={item.id}
                    className={`${card} flex flex-col p-5`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <small className="text-xs text-[#5B6675]">
                          #{item.id}
                        </small>
                        <h3 className="mt-0.5 leading-snug font-semibold">
                          {item.name}
                        </h3>
                      </div>
                      <span className={`${badge} shrink-0`}>{item.status}</span>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-[#5B6675]">
                      {item.issue}
                    </p>
                    <div className="mt-4 grid grid-cols-2 gap-3">
                      <div className="rounded-xl bg-[#F7F8F7] p-3">
                        <small className="block text-xs text-[#5B6675]">
                          Biaya
                        </small>
                        <b className="font-semibold">{money(item.cost)}</b>
                      </div>
                      <div className="rounded-xl bg-[#E6F2ED] p-3">
                        <small className="block text-xs text-[#0B4F3F]">
                          Kenaikan nilai
                        </small>
                        <b className="font-semibold text-[#0B4F3F]">
                          +{money(item.uplift)}
                        </b>
                      </div>
                    </div>
                    <p className="mt-4 border-t border-[#EDEFEC] pt-3 text-sm text-[#5B6675]">
                      Mitra: <b className="text-[#111827]">{item.partner}</b> •
                      Estimasi {item.eta}
                    </p>
                  </article>
                ))}
              </div>
            )}
          </section>
        )}

        {/* ============ Panel: Parts ============ */}
        {tab === "parts" && (
          <section
            id="panel-parts"
            role="tabpanel"
            aria-labelledby="tab-parts"
            className={`${card} flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8`}
          >
            <div className="flex gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#E6F2ED] text-[#0B4F3F]">
                <Wrench size={20} />
              </span>
              <div>
                <h2 className="text-[1.15rem] font-semibold tracking-tight">
                  Parts Harvest Terverifikasi
                </h2>
                <p className="mt-2 max-w-[60ch] leading-relaxed text-[#5B6675]">
                  Komponen layak pakai dari unit yang tidak ekonomis diperbaiki
                  akan dicatat dengan asal paspor, kondisi, kompatibilitas,
                  serta tujuan penggunaan ulang.
                </p>
              </div>
            </div>
            <button
              type="button"
              className={`${btnPrimary} shrink-0`}
              onClick={() => notify("Form pencatatan komponen dibuka.")}
            >
              Catat Komponen Pulih
            </button>
          </section>
        )}

        {/* ============ Panel: Daur ulang ============ */}
        {tab === "recovery" && (
          <section
            id="panel-recovery"
            role="tabpanel"
            aria-labelledby="tab-recovery"
            className={`${card} p-6 sm:p-8`}
          >
            <h2 className="text-[1.15rem] font-semibold tracking-tight">
              Log daur ulang & material recovery
            </h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl bg-[#F7F8F7] p-5">
                <strong
                  className={`${display} block text-[2.2rem] leading-none font-normal`}
                >
                  12
                </strong>
                <span className="mt-1.5 block text-sm text-[#5B6675]">
                  batch dialihkan ke mitra daur ulang resmi
                </span>
              </div>
              <div className="rounded-xl bg-[#E6F2ED] p-5">
                <strong
                  className={`${display} block text-[2.2rem] leading-none font-normal text-[#0A3D31]`}
                >
                  58,4 kg
                </strong>
                <span className="mt-1.5 block text-sm text-[#0A3D31]/80">
                  e-waste tidak masuk TPA bulan ini
                </span>
              </div>
            </div>
            <button
              type="button"
              className={`${btnSecondary} mt-5`}
              onClick={() => notify("Laporan pemulihan material disiapkan.")}
            >
              Unduh Laporan Ledger
            </button>
          </section>
        )}

        {/* ============ Kalkulator dampak ============ */}
        <section className="grid gap-8 rounded-3xl bg-[#0A3D31] p-6 text-white sm:p-10 lg:grid-cols-2 lg:items-center lg:gap-14">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-[#E2BC6B]">
              <Leaf size={13} /> Kalkulator dampak swap vs baru
            </span>
            <h2
              className={`${display} mt-4 text-[2rem] leading-[1.08] font-normal tracking-[-0.01em] sm:text-[2.6rem]`}
            >
              Hemat hingga 84% jejak karbon
            </h2>
            <p className="mt-3 max-w-[46ch] leading-relaxed text-white/70">
              Memperpanjang masa pakai perangkat memangkas ekstraksi mineral dan
              kebutuhan produksi baru.
            </p>
          </div>

          <div className="space-y-5">
            <div>
              <div className="flex items-baseline justify-between gap-3 text-sm">
                <span className="text-white/70">Produksi baru</span>
                <b className="font-semibold">78 kg CO₂e</b>
              </div>
              <div className="mt-2 h-3 overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-full rounded-full bg-white/45" />
              </div>
            </div>
            <div>
              <div className="flex items-baseline justify-between gap-3 text-sm">
                <span className="text-white/70">Swap / repair</span>
                <b className="font-semibold text-[#E2BC6B]">12,5 kg CO₂e</b>
              </div>
              <div className="mt-2 h-3 overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-[16%] rounded-full bg-[#E2BC6B]" />
              </div>
            </div>
            <span className="inline-flex rounded-full bg-[#E2BC6B] px-3 py-1 text-xs font-bold text-[#111827]">
              −84% emisi
            </span>
          </div>
        </section>
      </main>

      {toast}

      {/* Dialog: mitra reparasi */}
      {dialog?.kind === "partner" && (
        <Dialog title="Daftarkan mitra reparasi" onClose={closeDialog}>
          <form
            className="mt-6 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              notify("Mitra reparasi ditambahkan secara lokal.");
              closeDialog();
            }}
          >
            <Field label="Nama mitra bengkel" htmlFor="partner-name">
              <input
                id="partner-name"
                required
                placeholder="Contoh: Bengkel Elektronik Tebet"
                className={`${field} h-11`}
              />
            </Field>
            <Field label="Spesialisasi" htmlFor="partner-skill">
              <input
                id="partner-skill"
                required
                placeholder="Contoh: Kamera, laptop, audio"
                className={`${field} h-11`}
              />
            </Field>
            <Field
              label="Alamat dan kontak operasional"
              htmlFor="partner-contact"
            >
              <textarea
                id="partner-contact"
                required
                rows={3}
                placeholder="Alamat lengkap dan nomor yang bisa dihubungi"
                className={`${field} min-h-24 py-2.5`}
              />
            </Field>
            <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                className={btnSecondary}
                onClick={closeDialog}
              >
                Batal
              </button>
              <button type="submit" className={btnPrimary}>
                Simpan
              </button>
            </div>
          </form>
        </Dialog>
      )}

      {/* Dialog: negosiasi top-up */}
      {dialog?.kind === "topup" && (
        <Dialog title="Negosiasi nominal top-up" onClose={closeDialog}>
          <form
            className="mt-6 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              decide(dialog.id, "negotiating", "Nominal negosiasi dikirim.");
              closeDialog();
            }}
          >
            {topupProposal && (
              <p className="rounded-xl bg-[#F7F8F7] p-3.5 text-sm leading-relaxed text-[#5B6675]">
                <b className="text-[#111827]">{topupProposal.own.name}</b> ⇄{" "}
                <b className="text-[#111827]">{topupProposal.offered.name}</b>
              </p>
            )}
            <Field
              label="Nominal top-up"
              htmlFor="topup-amount"
              hint="Nominal mengikuti selisih valuasi AI dan inspeksi fisik Hub."
            >
              <div className="relative">
                <span className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-sm text-[#5B6675]">
                  Rp
                </span>
                <input
                  id="topup-amount"
                  type="number"
                  inputMode="numeric"
                  min={0}
                  step={10000}
                  required
                  defaultValue={topupProposal?.topUp ?? 600000}
                  className={`${field} h-11 pl-10`}
                />
              </div>
            </Field>
            <Field label="Catatan untuk pengusul" htmlFor="topup-note">
              <textarea
                id="topup-note"
                rows={3}
                defaultValue="Nominal mengikuti selisih valuasi AI dan inspeksi fisik Hub."
                className={`${field} min-h-24 py-2.5`}
              />
            </Field>
            <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                className={btnSecondary}
                onClick={closeDialog}
              >
                Batal
              </button>
              <button type="submit" className={btnPrimary}>
                Kirim negosiasi
              </button>
            </div>
          </form>
        </Dialog>
      )}
    </SellerShell>
  );
}
