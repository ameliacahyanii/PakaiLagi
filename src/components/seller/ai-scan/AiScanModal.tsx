"use client";
import {
  AlertTriangle,
  ArrowRight,
  Camera,
  Check,
  CloudUpload,
  FileImage,
  Leaf,
  Lightbulb,
  Lock,
  RefreshCw,
  ScanLine,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import {
  ChangeEvent,
  DragEvent,
  type ReactNode,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { PhotoGuideModal } from "./PhotoGuideModal";
import { ManualListingForm } from "./ManualListingForm";
import {
  actionsRow,
  badge,
  badgeError,
  btnGhost,
  btnPrimary,
  btnSecondary,
  card,
  closeBtn,
  display,
  focusWithin,
  input as inputField,
  modalBackdrop,
  modalFooter,
  modalHeader,
  modalPanel,
  modalTitle,
  toastBox,
} from "@/components/ui/tokens";

type Phase = "upload" | "scanning" | "result" | "error";

const demoImages = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBdF_ncD3BtxaA6J6usF-0WygKPom48jCAc3CblfWGNSxilZhQO3RAtMyHoAQGPR2sN_UwDuv6UPuUf4PD_U51X61kkB4OtQsAO4SjnLiKbOQ-pKaLtvZi1D9GV0WMsK_vM-bGLs5otOtmxUinWby9R0B4BQQ9AOe18j8uK_nMVudA-GjyOAWhl_q0nElaJKIRIakiJzs-3lU2JueSRZNEBm22pZAEkb7M-OGn7M5QSd-wLBamU359i",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCNCzvjsig7X4XasI8GG-ZANzzLAWuX2ACEhqXqyen3ic9P8D5c0O7N-istxCeF12bPie7BQ0M6VOylIxSXKEgHaonZcB2A7ZZvwb1lO_C3GEp1Bzp64XCAhqDYgWGOWW3VPjxfp3YZ_Jyg5KCuXIG1j-JscSH-0lIdlNwbOWOhAO6BcetmU6H0O0sPR_0HSjkZVWVZuDM4SpyCTuN_lSsd_DtcIGAtkJxcMdJMbB0lta_FGBfd7-Oz",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAIOUnzU1LAe5Yme3fjySdeTqzIH1vnL7giwYytoBW26KQZE14axG1gplsJWkyf9sUvp6Xv-cm9Wn6-nasJoMyVyxRODacmIuGt_0igSQsx_sdyyEsywMp7JWKgSR8Md48d5qfLb07qLO-wsU_Zhd2qP45yFCHnKSx0_UaXL0b0kOLIWWDZ9titw4qDi7FSD_AgxJS8HKRtXbkTVxMJz87SpTVpgnBXDMlTIPqvdpoJGXQ-IHfEScIX",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAP89DfuO1UDg_p3H5mpi1cg4PAusmrQODnpeg9eBE7EgBiyubaxj8KkPV6wjkL78f2-4jl4V5_kXmOSv7AQEHaC88T01LfwLMyCkR2d4QgtZ98Ftt6Q-3WAlvB8Uapr-KvH0lgu-gaG1-43hsyOwMfwPKcpa8fV1aq0DaCkbLfHQtY1bhjNMzbDf3DpyNPVGmMAzJiZx9fCJS0RhzQxfonQwXdSYBLRVEGX-JmASlpVJdsTD7zOHcF",
];

const stepLabels = [
  "Unggah Foto",
  "Analisis AI",
  "Pertanyaan",
  "Skor & Rute",
  "Publikasi",
];

const categoryOptions = [
  { value: "camera", label: "Kamera & Optik • Mirrorless" },
  { value: "audio", label: "Audio & Headphone" },
  { value: "computer", label: "Komputer & Tablet" },
];

/* ---------- Stepper ---------- */
function Stepper({ phase }: { phase: Phase }) {
  const active = phase === "upload" ? 0 : 1;
  const error = phase === "error";
  const width =
    phase === "upload"
      ? "20%"
      : phase === "scanning"
        ? "55%"
        : phase === "error"
          ? "38%"
          : "78%";

  return (
    <div className="border-b border-[#E4E7EB] bg-white px-4 pt-4 pb-5 sm:px-6">
      <ol className="flex items-start justify-between gap-2 overflow-x-auto">
        {stepLabels.map((label, index) => {
          const done = index < active;
          const current = index === active;
          const failed = error && index === 1;
          return (
            <li
              key={label}
              aria-current={current ? "step" : undefined}
              className="flex min-w-[4.5rem] flex-1 flex-col items-center gap-1.5 text-center"
            >
              <span
                className={`grid h-8 w-8 place-items-center rounded-full text-[0.8rem] font-semibold ${
                  failed
                    ? "bg-[#C8672B] text-white"
                    : done
                      ? "bg-[#0B4F3F] text-white"
                      : current
                        ? "border-2 border-[#0B4F3F] bg-[#E6F2ED] text-[#0B4F3F]"
                        : "border border-[#E4E7EB] bg-white text-[#5B6675]"
                }`}
              >
                {failed ? (
                  <AlertTriangle size={14} />
                ) : done ? (
                  <Check size={14} />
                ) : (
                  index + 1
                )}
              </span>
              <b
                className={`text-[0.75rem] leading-tight ${
                  failed
                    ? "font-semibold text-[#9A4A1B]"
                    : current || done
                      ? "font-semibold text-[#111827]"
                      : "font-medium text-[#5B6675]"
                }`}
              >
                {label}
              </b>
            </li>
          );
        })}
      </ol>
      <div
        aria-hidden="true"
        className="mt-4 h-1.5 overflow-hidden rounded-full bg-[#EDEFEC]"
      >
        <div
          className={`h-full rounded-full transition-[width] duration-500 ${
            error ? "bg-[#C8672B]" : "bg-[#0B4F3F]"
          }`}
          style={{ width }}
        />
      </div>
    </div>
  );
}

/* ---------- Bagian visual kecil ---------- */
function Visual({
  src,
  alt,
  blurred = false,
  children,
}: {
  src: string;
  alt: string;
  blurred?: boolean;
  children?: ReactNode;
}) {
  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#111827]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className={`h-full w-full object-cover ${blurred ? "scale-105 blur-sm" : ""}`}
      />
      {children}
    </div>
  );
}

// Keyframes ditulis inline supaya tidak perlu mengubah konfigurasi Tailwind
function ScanLineFx() {
  return (
    <>
      <style>{`@keyframes ai-scan{0%,100%{top:4%}50%{top:94%}}`}</style>
      <div
        aria-hidden="true"
        className="absolute inset-x-0 h-0.5 animate-[ai-scan_2s_ease-in-out_infinite] bg-[#E2BC6B] shadow-[0_0_16px_4px_rgba(226,188,107,0.6)] motion-reduce:animate-none"
      />
    </>
  );
}

function Tag({
  className,
  children,
}: {
  className: string;
  children: ReactNode;
}) {
  return (
    <span
      className={`absolute rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-[#111827] shadow-[0_4px_12px_rgba(0,0,0,0.25)] ${className}`}
    >
      {children}
    </span>
  );
}

const analysisGrid = "grid gap-5 lg:grid-cols-[1.2fr_0.8fr]";

/* ---------- Modal utama ---------- */
export function AiScanModal() {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("upload");
  const [files, setFiles] = useState<File[]>([]);
  const [drag, setDrag] = useState(false);
  const [forceError, setForceError] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [showManual, setShowManual] = useState(false);
  const [toast, setToast] = useState("");

  const previews = useMemo(
    () => files.map((file) => URL.createObjectURL(file)),
    [files],
  );
  useEffect(() => () => previews.forEach(URL.revokeObjectURL), [previews]);

  useEffect(() => {
    const open = () => setShowGuide(true);
    window.addEventListener("open-photo-guide", open);
    return () => window.removeEventListener("open-photo-guide", open);
  }, []);

  function pick(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files)
      setFiles(Array.from(event.target.files).slice(0, 4));
  }
  function drop(event: DragEvent) {
    event.preventDefault();
    setDrag(false);
    setFiles(
      Array.from(event.dataTransfer.files)
        .filter((file) => file.type.startsWith("image/"))
        .slice(0, 4),
    );
  }
  function scan() {
    if (!files.length) return;
    setPhase("scanning");
    setTimeout(() => setPhase(forceError ? "error" : "result"), 1500);
  }
  function notify(value: string) {
    setToast(value);
    setTimeout(() => setToast(""), 2300);
  }
  function close() {
    router.push("/seller/inventory");
  }
  function restart() {
    setFiles([]);
    setPhase("upload");
  }

  return (
    <>
      <div className={modalBackdrop}>
        <section
          className={`${modalPanel} max-w-[980px]`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="ai-scan-title"
        >
          <header className={modalHeader}>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                <h2 id="ai-scan-title" className={modalTitle}>
                  Tambah Barang Baru • AI Scan & Verifikasi Sirkular
                </h2>
                <span className={phase === "error" ? badgeError : badge}>
                  {phase === "error" ? (
                    <AlertTriangle size={14} />
                  ) : (
                    <Sparkles size={14} />
                  )}
                  AI Vision Engine v2.4
                </span>
              </div>
              <p className="mt-2 max-w-[62ch] leading-relaxed text-[#5B6675]">
                Unggah foto untuk analisis kondisi, estimasi nilai, dan
                rekomendasi jalur sirkular.
              </p>
            </div>
            <button
              type="button"
              className={closeBtn}
              onClick={close}
              aria-label="Tutup"
            >
              <X size={20} />
            </button>
          </header>

          <Stepper phase={phase} />

          <div className="flex-1 overflow-y-auto p-4 sm:p-6">
            {phase === "upload" && (
              <UploadPhase
                files={files}
                previews={previews}
                drag={drag}
                setDrag={setDrag}
                pick={pick}
                drop={drop}
              />
            )}
            {phase === "scanning" && <ScanningPhase />}
            {phase === "result" && <ResultPhase previews={previews} />}
            {phase === "error" && (
              <ErrorPhase previews={previews} retry={restart} />
            )}
          </div>

          <footer className={modalFooter}>
            <div className="flex items-center gap-2 text-sm text-[#5B6675]">
              <Lock size={15} className="shrink-0 text-[#12705A]" />
              Data foto dienkripsi dan diproses privat untuk Paspor Digital.
            </div>
            <div className={actionsRow}>
              <button type="button" className={btnGhost} onClick={close}>
                Batalkan
              </button>
              {phase === "upload" && (
                <>
                  <button
                    type="button"
                    className={btnSecondary}
                    onClick={() => setShowManual(true)}
                  >
                    Isi Manual
                  </button>
                  <button
                    type="button"
                    className={btnPrimary}
                    disabled={!files.length}
                    onClick={scan}
                  >
                    <ScanLine size={17} />
                    {files.length
                      ? `Mulai Analisis (${files.length} Foto)`
                      : "Pilih Foto Terlebih Dahulu"}
                  </button>
                </>
              )}
              {phase === "result" && (
                <>
                  <button
                    type="button"
                    className={btnSecondary}
                    onClick={() => setPhase("upload")}
                  >
                    <RefreshCw size={16} />
                    Unggah Ulang
                  </button>
                  <button
                    type="button"
                    className={btnPrimary}
                    onClick={() => router.push("/seller/review/DRAFT-AI-8809")}
                  >
                    Lanjutkan ke Klarifikasi <ArrowRight size={17} />
                  </button>
                </>
              )}
              {phase === "error" && (
                <>
                  <button
                    type="button"
                    className={btnSecondary}
                    onClick={() => setShowManual(true)}
                  >
                    Lanjut Manual
                  </button>
                  <button
                    type="button"
                    className={btnPrimary}
                    onClick={restart}
                  >
                    <RefreshCw size={16} />
                    Coba Lagi
                  </button>
                </>
              )}
            </div>
          </footer>

          {/* Toggle uji coba untuk memaksa fase error (tetap tersembunyi) */}
          {phase === "upload" && (
            <label className="hidden">
              <input
                type="checkbox"
                checked={forceError}
                onChange={(e) => setForceError(e.target.checked)}
              />
            </label>
          )}
        </section>
      </div>

      {showGuide && (
        <PhotoGuideModal
          onClose={() => setShowGuide(false)}
          onContinue={() => setShowGuide(false)}
        />
      )}
      {showManual && (
        <ManualListingForm
          onClose={() => setShowManual(false)}
          onBack={() => setShowManual(false)}
          onSaved={() => notify("Draf manual berhasil disimpan secara lokal.")}
          onContinue={() => router.push("/seller/review/DRAFT-AI-8809")}
        />
      )}
      {toast && (
        <div role="status" className={toastBox}>
          {toast}
        </div>
      )}
    </>
  );
}

/* ---------- Fase: unggah ---------- */
function UploadPhase({
  files,
  previews,
  drag,
  setDrag,
  pick,
  drop,
}: {
  files: File[];
  previews: string[];
  drag: boolean;
  setDrag: (v: boolean) => void;
  pick: (e: ChangeEvent<HTMLInputElement>) => void;
  drop: (e: DragEvent) => void;
}) {
  return (
    <div className="flex flex-col gap-6">
      <label
        className={`flex cursor-pointer flex-col items-center gap-3 rounded-2xl border-2 border-dashed px-6 py-10 text-center transition-colors ${focusWithin} ${
          drag
            ? "border-[#0B4F3F] bg-[#E6F2ED]"
            : "border-[#CBD0D6] bg-white hover:border-[#0B4F3F]"
        }`}
        onDragEnter={(e) => {
          e.preventDefault();
          setDrag(true);
        }}
        onDragOver={(e) => e.preventDefault()}
        onDragLeave={() => setDrag(false)}
        onDrop={drop}
      >
        <input
          className="sr-only"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          onChange={pick}
        />
        <span className="grid h-16 w-16 place-items-center rounded-full bg-[#E6F2ED] text-[#0B4F3F]">
          <CloudUpload size={31} />
        </span>
        <h3 className="max-w-[32ch] text-[1.1rem] leading-snug font-semibold">
          Tarik dan lepas foto di sini, atau{" "}
          <u className="decoration-[#12705A] underline-offset-4">
            jelajahi berkas
          </u>
        </h3>
        <p className="text-sm text-[#5B6675]">
          JPG, PNG, atau WEBP. Maksimal 10 MB per foto.
        </p>
        <div className="mt-2 flex w-full flex-col justify-center gap-2 sm:w-auto sm:flex-row">
          <span className={btnPrimary}>
            <FileImage size={17} />
            Pilih Berkas Foto
          </span>
          <button
            type="button"
            className={btnSecondary}
            onClick={(e) => e.preventDefault()}
          >
            <Camera size={17} />
            Buka Kamera
          </button>
        </div>
      </label>

      <section>
        <div className="flex items-center justify-between gap-3">
          <b className="font-semibold">Slot Bukti Sudut Fisik</b>
          <small className="text-[#5B6675]">Minimal 1 foto utama</small>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {["Depan & Utuh", "Samping / Port", "Layar / Dial", "Nomor Seri"].map(
            (name, index) => {
              const ready = index < files.length;
              return (
                <div
                  key={name}
                  className={`flex flex-col items-center gap-1.5 rounded-xl border p-3 text-center ${
                    ready
                      ? "border-[#0B4F3F] bg-[#E6F2ED]"
                      : "border-[#E4E7EB] bg-white"
                  }`}
                >
                  {previews[index] ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={previews[index]}
                      alt={name}
                      className="aspect-[4/3] w-full rounded-lg object-cover"
                    />
                  ) : (
                    <span className="grid aspect-[4/3] w-full place-items-center rounded-lg bg-[#F7F8F7] text-[#5B6675]">
                      <Camera size={24} />
                    </span>
                  )}
                  <b className="text-[0.85rem] leading-snug font-semibold">
                    {index === 0 ? `${name} • Wajib` : name}
                  </b>
                  <small
                    className={`text-[0.78rem] ${ready ? "font-semibold text-[#0B4F3F]" : "text-[#5B6675]"}`}
                  >
                    {ready ? "Foto siap dianalisis" : "Belum diunggah"}
                  </small>
                </div>
              );
            },
          )}
        </div>
      </section>

      <section className={`${card} p-4 sm:p-5`}>
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <b className="inline-flex items-center gap-2 font-semibold">
            <Lightbulb size={16} className="text-[#C29A4B]" /> Panduan Foto
            Akurat
          </b>
          <span className="text-sm text-[#5B6675]">
            Buka panduan lengkap dari tombol di bawah.
          </span>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {[
            {
              icon: Leaf,
              text: "Objek penuh, terang, dan tanpa bayangan tajam.",
            },
            {
              icon: ScanLine,
              text: "Nomor seri dan label harus terbaca jelas.",
            },
            {
              icon: ShieldCheck,
              text: "Hindari wajah, kartu identitas, dan data pribadi.",
            },
          ].map(({ icon: Icon, text }) => (
            <div
              key={text}
              className="flex items-start gap-3 rounded-xl bg-[#F7F8F7] p-3 text-[0.9rem] leading-snug"
            >
              <Icon size={17} className="mt-0.5 shrink-0 text-[#12705A]" />
              <span>{text}</span>
            </div>
          ))}
        </div>
        <button
          type="button"
          className={`${btnSecondary} mt-4`}
          onClick={() =>
            window.dispatchEvent(new CustomEvent("open-photo-guide"))
          }
        >
          <Lightbulb size={16} />
          Lihat Panduan Foto Lengkap
        </button>
      </section>
    </div>
  );
}

/* ---------- Fase: memindai ---------- */
function ScanningPhase() {
  return (
    <div className={analysisGrid}>
      <Visual src={demoImages[0]} alt="Fujifilm X-T30 II sedang dianalisis">
        <ScanLineFx />
        <Tag className="top-3 left-3">Sensor dipindai...</Tag>
        <Tag className="right-3 bottom-3">Bodi dan dial dipindai...</Tag>
      </Visual>
      <div className="flex flex-col gap-4">
        <div className={`${card} p-5`}>
          <h3 className="flex items-center gap-2 text-[1.05rem] font-semibold">
            <Sparkles size={17} className="text-[#12705A]" /> Analisis neural
            sedang berjalan
          </h3>
          <p className="mt-2 leading-relaxed text-[#5B6675]">
            Model sedang mengekstrak kategori, model, keausan, dan metadata
            produk.
          </p>
        </div>
        <div className={`${card} p-5`}>
          <b className="text-sm font-semibold text-[#5B6675]">Estimasi waktu</b>
          <p className={`${display} mt-1 text-4xl leading-none font-normal`}>
            ± 3 detik
          </p>
        </div>
      </div>
    </div>
  );
}

/* ---------- Fase: hasil ---------- */
function ResultPhase({ previews }: { previews: string[] }) {
  const imgs = previews.length ? previews : demoImages;
  return (
    <div className={analysisGrid}>
      <div>
        <Visual src={imgs[0] || demoImages[0]} alt="Hasil analisis Fujifilm">
          <Tag className="top-3 left-3">Sensor Bersih • 94%</Tag>
          <Tag className="top-3 right-3">Bodi Mulus • 96%</Tag>
          <Tag className="bottom-3 left-3">Baret Mikro • 78%</Tag>
        </Visual>
        <div className="mt-3 grid grid-cols-4 gap-2">
          {demoImages.map((src, index) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={src}
              src={imgs[index] || src}
              alt={`Sudut ${index + 1}`}
              className="aspect-square w-full rounded-lg border border-[#E4E7EB] object-cover"
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className={`${card} p-5`}>
          <div className="flex items-center justify-between gap-3">
            <b className="text-sm font-semibold text-[#5B6675]">
              Kategori Terdeteksi
            </b>
            <span className={badge}>97% Match</span>
          </div>
          <h3 className="mt-3 text-[1.1rem] leading-snug font-semibold">
            Fujifilm X-T30 II Body Silver
          </h3>
          <p className="mt-1 text-sm text-[#5B6675]">
            Kamera & Optik • Mirrorless Body
          </p>
        </div>

        <div className={`${card} p-5`}>
          <b className="text-sm font-semibold text-[#5B6675]">
            Estimasi Dampak Sirkular
          </b>
          <div className="mt-3 grid grid-cols-2 gap-3">
            {[
              { label: "e-Waste Dicegah", value: "380 g" },
              { label: "CO₂e Dihemat", value: "16,5 kg" },
            ].map((m) => (
              <div key={m.label} className="rounded-xl bg-[#E6F2ED] p-3">
                <small className="block text-[0.8rem] text-[#5B6675]">
                  {m.label}
                </small>
                <strong
                  className={`${display} mt-1 block text-[1.6rem] leading-none font-normal text-[#0B4F3F]`}
                >
                  {m.value}
                </strong>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-[#0A3D31] p-5 text-white">
          <small className="text-sm text-white/75">Potensi Nilai Jual</small>
          <h3
            className={`${display} mt-1 text-[1.6rem] leading-[1.1] font-normal`}
          >
            Rp7.500.000 - Rp8.200.000
          </h3>
        </div>
      </div>
    </div>
  );
}

/* ---------- Fase: error ---------- */
function ErrorPhase({
  previews,
  retry,
}: {
  previews: string[];
  retry: () => void;
}) {
  return (
    <div className={analysisGrid}>
      <div>
        <Visual
          src={previews[0] || demoImages[0]}
          alt="Foto gagal dianalisis"
          blurred
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[#111827]/75 p-6 text-center text-white">
            <AlertTriangle size={34} className="text-[#E2BC6B]" />
            <h3 className="max-w-[26ch] text-[1.15rem] leading-snug font-semibold">
              Foto Terlalu Buram atau Objek Tidak Jelas
            </h3>
            <p className="max-w-[40ch] text-sm leading-relaxed text-white/80">
              AI mendeteksi motion blur dan pantulan yang menutupi detail
              penting.
            </p>
            <span className={badgeError}>Confidence 28% • Minimum 70%</span>
          </div>
        </Visual>
        <div className="mt-3 rounded-2xl border border-[#EBC5AB] bg-[#FBEDE4] p-4 text-[#9A4A1B]">
          <b className="font-semibold">Diagnostik kegagalan</b>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-[0.9rem]">
            <li>Ketajaman tepi dan dial tidak memenuhi standar.</li>
            <li>Nomor seri tidak dapat dibaca.</li>
          </ul>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className={`${card} p-5`}>
          <b className="font-semibold">Status: Analisis Otomatis Tertunda</b>
          <p className="mt-2 leading-relaxed text-[#5B6675]">
            Draf tetap aman. Pilih salah satu jalur penyelesaian.
          </p>
        </div>

        <div className="rounded-2xl border border-[#0B4F3F] bg-[#E6F2ED] p-5">
          <b className="font-semibold">Opsi A: Unggah Ulang Foto</b>
          <p className="mt-2 leading-relaxed text-[#5B6675]">
            Gunakan cahaya merata dan posisikan perangkat tanpa getaran.
          </p>
          <button
            type="button"
            className={`${btnPrimary} mt-4`}
            onClick={retry}
          >
            <Camera size={16} />
            Unggah Foto Baru
          </button>
        </div>

        <div className={`${card} flex flex-col gap-3 p-5`}>
          <b className="font-semibold">Opsi B: Isi Manual</b>
          <select
            aria-label="Kategori barang"
            defaultValue="camera"
            className={`${inputField} cursor-pointer`}
          >
            {categoryOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <input
            aria-label="Nama barang"
            defaultValue="Fujifilm X-T30 II Silver"
            className={inputField}
          />
        </div>
      </div>
    </div>
  );
}
