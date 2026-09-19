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
import { ChangeEvent, DragEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./AiScanModal.module.css";
import { PhotoGuideModal } from "./PhotoGuideModal";
import { ManualListingForm } from "./ManualListingForm";
type Phase = "upload" | "scanning" | "result" | "error";
const demoImages = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBdF_ncD3BtxaA6J6usF-0WygKPom48jCAc3CblfWGNSxilZhQO3RAtMyHoAQGPR2sN_UwDuv6UPuUf4PD_U51X61kkB4OtQsAO4SjnLiKbOQ-pKaLtvZi1D9GV0WMsK_vM-bGLs5otOtmxUinWby9R0B4BQQ9AOe18j8uK_nMVudA-GjyOAWhl_q0nElaJKIRIakiJzs-3lU2JueSRZNEBm22pZAEkb7M-OGn7M5QSd-wLBamU359i",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCNCzvjsig7X4XasI8GG-ZANzzLAWuX2ACEhqXqyen3ic9P8D5c0O7N-istxCeF12bPie7BQ0M6VOylIxSXKEgHaonZcB2A7ZZvwb1lO_C3GEp1Bzp64XCAhqDYgWGOWW3VPjxfp3YZ_Jyg5KCuXIG1j-JscSH-0lIdlNwbOWOhAO6BcetmU6H0O0sPR_0HSjkZVWVZuDM4SpyCTuN_lSsd_DtcIGAtkJxcMdJMbB0lta_FGBfd7-Oz",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAIOUnzU1LAe5Yme3fjySdeTqzIH1vnL7giwYytoBW26KQZE14axG1gplsJWkyf9sUvp6Xv-cm9Wn6-nasJoMyVyxRODacmIuGt_0igSQsx_sdyyEsywMp7JWKgSR8Md48d5qfLb07qLO-wsU_Zhd2qP45yFCHnKSx0_UaXL0b0kOLIWWDZ9titw4qDi7FSD_AgxJS8HKRtXbkTVxMJz87SpTVpgnBXDMlTIPqvdpoJGXQ-IHfEScIX",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAP89DfuO1UDg_p3H5mpi1cg4PAusmrQODnpeg9eBE7EgBiyubaxj8KkPV6wjkL78f2-4jl4V5_kXmOSv7AQEHaC88T01LfwLMyCkR2d4QgtZ98Ftt6Q-3WAlvB8Uapr-KvH0lgu-gaG1-43hsyOwMfwPKcpa8fV1aq0DaCkbLfHQtY1bhjNMzbDf3DpyNPVGmMAzJiZx9fCJS0RhzQxfonQwXdSYBLRVEGX-JmASlpVJdsTD7zOHcF",
];
function Stepper({ phase }: { phase: Phase }) {
  const active = phase === "upload" ? 0 : 1;
  const error = phase === "error";
  return (
    <div className={styles.stepper}>
      <div className={styles.steps}>
        {[
          "Unggah Foto",
          "Analisis AI",
          "Pertanyaan",
          "Skor & Rute",
          "Publikasi",
        ].map((label, index) => (
          <div
            key={label}
            className={`${styles.step} ${index < active ? styles.stepDone : ""} ${index === active ? styles.stepActive : ""} ${error && index === 1 ? styles.stepError : ""}`}
          >
            <span>
              {index < active ? (
                <Check size={14} />
              ) : error && index === 1 ? (
                <AlertTriangle size={14} />
              ) : (
                index + 1
              )}
            </span>
            <b>{label}</b>
          </div>
        ))}
      </div>
      <div className={`${styles.track} ${error ? styles.trackError : ""}`}>
        <i
          style={{
            width:
              phase === "upload"
                ? "20%"
                : phase === "scanning"
                  ? "55%"
                  : phase === "error"
                    ? "38%"
                    : "78%",
          }}
        />
      </div>
    </div>
  );
}
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
  return (
    <>
      <div className={styles.backdrop}>
        <section className={styles.modal} role="dialog" aria-modal="true">
          <header className={styles.header}>
            <div>
              <div className={styles.row}>
                <h2>Tambah Barang Baru • AI Scan & Verifikasi Sirkular</h2>
                <span
                  className={`${styles.badge} ${phase === "error" ? styles.errorBadge : ""}`}
                >
                  {phase === "error" ? (
                    <AlertTriangle size={14} />
                  ) : (
                    <Sparkles size={14} />
                  )}
                  AI Vision Engine v2.4
                </span>
              </div>
              <p>
                Unggah foto untuk analisis kondisi, estimasi nilai, dan
                rekomendasi jalur sirkular.
              </p>
            </div>
            <button className={styles.close} onClick={close} aria-label="Tutup">
              <X size={20} />
            </button>
          </header>
          <Stepper phase={phase} />
          {phase === "upload" && (
            <UploadPhase
              files={files}
              previews={previews}
              drag={drag}
              setDrag={setDrag}
              pick={pick}
              drop={drop}
            />
          )}{" "}
          {phase === "scanning" && <ScanningPhase />}
          {phase === "result" && <ResultPhase previews={previews} />}{" "}
          {phase === "error" && (
            <ErrorPhase
              previews={previews}
              retry={() => {
                setFiles([]);
                setPhase("upload");
              }}
            />
          )}
          <footer className={styles.footer}>
            <div className={styles.privacy}>
              <Lock size={15} />
              Data foto dienkripsi dan diproses privat untuk Paspor Digital.
            </div>
            <div className={styles.actions}>
              <button className={styles.buttonSoft} onClick={close}>
                Batalkan
              </button>
              {phase === "upload" && (
                <>
                  <button
                    className={styles.button}
                    onClick={() => setShowManual(true)}
                  >
                    Isi Manual
                  </button>
                  <button
                    className={styles.buttonPrimary}
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
                    className={styles.button}
                    onClick={() => setPhase("upload")}
                  >
                    <RefreshCw size={16} />
                    Unggah Ulang
                  </button>
                  <button
                    className={styles.buttonPrimary}
                    onClick={() => router.push("/seller/review/DRAFT-AI-8809")}
                  >
                    Lanjutkan ke Klarifikasi <ArrowRight size={17} />
                  </button>
                </>
              )}
              {phase === "error" && (
                <>
                  <button
                    className={styles.button}
                    onClick={() => setShowManual(true)}
                  >
                    Lanjut Manual
                  </button>
                  <button
                    className={styles.buttonPrimary}
                    onClick={() => {
                      setFiles([]);
                      setPhase("upload");
                    }}
                  >
                    <RefreshCw size={16} />
                    Coba Lagi
                  </button>
                </>
              )}
            </div>
          </footer>
          {phase === "upload" && (
            <label style={{ display: "none" }}>
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
      )}{" "}
      {showManual && (
        <ManualListingForm
          onClose={() => setShowManual(false)}
          onBack={() => setShowManual(false)}
          onSaved={() => notify("Draf manual berhasil disimpan secara lokal.")}
          onContinue={() => router.push("/seller/review/DRAFT-AI-8809")}
        />
      )}{" "}
      {toast && <div className={styles.toast}>{toast}</div>}
    </>
  );
}
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
    <div className={styles.body}>
      <label
        className={`${styles.dropzone} ${drag ? styles.dropzoneActive : ""}`}
        onDragEnter={(e) => {
          e.preventDefault();
          setDrag(true);
        }}
        onDragOver={(e) => e.preventDefault()}
        onDragLeave={() => setDrag(false)}
        onDrop={drop}
      >
        <input
          hidden
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          onChange={pick}
        />
        <div className={styles.uploadIcon}>
          <CloudUpload size={31} />
        </div>
        <h3>
          Tarik dan lepas foto di sini, atau <u>jelajahi berkas</u>
        </h3>
        <p>JPG, PNG, atau WEBP. Maksimal 10 MB per foto.</p>
        <div className={styles.actions}>
          <span className={styles.buttonPrimary}>
            <FileImage size={17} />
            Pilih Berkas Foto
          </span>
          <button
            type="button"
            className={styles.button}
            onClick={(e) => e.preventDefault()}
          >
            <Camera size={17} />
            Buka Kamera
          </button>
        </div>
      </label>
      <div className={styles.section}>
        <div className={styles.between}>
          <b>Slot Bukti Sudut Fisik</b>
          <small className={styles.muted}>Minimal 1 foto utama</small>
        </div>
        <div className={styles.slots}>
          {["Depan & Utuh", "Samping / Port", "Layar / Dial", "Nomor Seri"].map(
            (name, index) => (
              <div
                className={`${styles.slot} ${index < files.length ? styles.slotReady : ""}`}
                key={name}
              >
                {previews[index] ? (
                  <img
                    className={styles.slotPreview}
                    src={previews[index]}
                    alt={name}
                  />
                ) : (
                  <Camera size={24} />
                )}
                <b>{index === 0 ? `${name} • Wajib` : name}</b>
                <small>
                  {index < files.length
                    ? "Foto siap dianalisis"
                    : "Belum diunggah"}
                </small>
              </div>
            ),
          )}
        </div>
      </div>
      <div className={styles.tips}>
        <div className={styles.between}>
          <b>
            <Lightbulb size={16} /> Panduan Foto Akurat
          </b>
          <span className={styles.guideHint}>
            Buka panduan lengkap dari tombol di bawah.
          </span>
        </div>
        <div className={styles.tipsGrid}>
          <div className={styles.tip}>
            <Leaf size={17} />
            <span>Objek penuh, terang, dan tanpa bayangan tajam.</span>
          </div>
          <div className={styles.tip}>
            <ScanLine size={17} />
            <span>Nomor seri dan label harus terbaca jelas.</span>
          </div>
          <div className={styles.tip}>
            <ShieldCheck size={17} />
            <span>Hindari wajah, kartu identitas, dan data pribadi.</span>
          </div>
        </div>
        <button
          type="button"
          className={styles.buttonSoft}
          onClick={() =>
            window.dispatchEvent(new CustomEvent("open-photo-guide"))
          }
        >
          <Lightbulb size={16} />
          Lihat Panduan Foto Lengkap
        </button>
      </div>
    </div>
  );
}
function ScanningPhase() {
  return (
    <div className={styles.body}>
      <div className={styles.analysisGrid}>
        <div className={styles.visual}>
          <img src={demoImages[0]} alt="Fujifilm X-T30 II sedang dianalisis" />
          <div className={styles.scanLine} />
          <div className={`${styles.annotation} ${styles.a1}`}>
            Sensor dipindai...
          </div>
          <div className={`${styles.annotation} ${styles.a2}`}>
            Bodi dan dial dipindai...
          </div>
        </div>
        <div className={styles.panel}>
          <div className={styles.card}>
            <h3>
              <Sparkles size={17} /> Analisis neural sedang berjalan
            </h3>
            <p>
              Model sedang mengekstrak kategori, model, keausan, dan metadata
              produk.
            </p>
          </div>
          <div className={styles.cardWhite}>
            <b>Estimasi waktu</b>
            <h2>± 3 detik</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
function ResultPhase({ previews }: { previews: string[] }) {
  const imgs = previews.length ? previews : demoImages;
  return (
    <div className={styles.body}>
      <div className={styles.analysisGrid}>
        <div>
          <div className={styles.visual}>
            <img src={imgs[0] || demoImages[0]} alt="Hasil analisis Fujifilm" />
            <div className={styles.scanLine} />
            <div className={`${styles.annotation} ${styles.a1}`}>
              Sensor Bersih • 94%
            </div>
            <div className={`${styles.annotation} ${styles.a2}`}>
              Bodi Mulus • 96%
            </div>
            <div className={`${styles.annotation} ${styles.a3}`}>
              Baret Mikro • 78%
            </div>
          </div>
          <div className={styles.thumbs}>
            {demoImages.map((src, index) => (
              <img
                src={imgs[index] || src}
                alt={`Sudut ${index + 1}`}
                key={src}
              />
            ))}
          </div>
        </div>
        <div className={styles.panel}>
          <div className={styles.card}>
            <div className={styles.between}>
              <b>Kategori Terdeteksi</b>
              <span className={styles.badge}>97% Match</span>
            </div>
            <h3>Fujifilm X-T30 II Body Silver</h3>
            <p>Kamera & Optik • Mirrorless Body</p>
          </div>
          <div className={styles.card}>
            <b>Estimasi Dampak Sirkular</b>
            <div className={styles.impact}>
              <div className={styles.metric}>
                <small>e-Waste Dicegah</small>
                <strong>380 g</strong>
              </div>
              <div className={styles.metric}>
                <small>CO₂e Dihemat</small>
                <strong>16,5 kg</strong>
              </div>
            </div>
          </div>
          <div className={styles.cardWhite}>
            <small>Potensi Nilai Jual</small>
            <h3>Rp7.500.000 - Rp8.200.000</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
function ErrorPhase({
  previews,
  retry,
}: {
  previews: string[];
  retry: () => void;
}) {
  return (
    <div className={styles.body}>
      <div className={styles.analysisGrid}>
        <div>
          <div className={`${styles.visual} ${styles.errorVisual}`}>
            <img
              src={previews[0] || demoImages[0]}
              alt="Foto gagal dianalisis"
            />
            <div className={styles.errorOverlay}>
              <AlertTriangle size={34} />
              <h3>Foto Terlalu Buram atau Objek Tidak Jelas</h3>
              <p>
                AI mendeteksi motion blur dan pantulan yang menutupi detail
                penting.
              </p>
              <span className={`${styles.badge} ${styles.errorBadge}`}>
                Confidence 28% • Minimum 70%
              </span>
            </div>
          </div>
          <div className={styles.diagnostic}>
            <b>Diagnostik kegagalan</b>
            <ul>
              <li>Ketajaman tepi dan dial tidak memenuhi standar.</li>
              <li>Nomor seri tidak dapat dibaca.</li>
            </ul>
          </div>
        </div>
        <div className={styles.panel}>
          <div className={styles.card}>
            <b>Status: Analisis Otomatis Tertunda</b>
            <p>Draf tetap aman. Pilih salah satu jalur penyelesaian.</p>
          </div>
          <div className={`${styles.choice} ${styles.choiceRecommended}`}>
            <b>Opsi A: Unggah Ulang Foto</b>
            <p>Gunakan cahaya merata dan posisikan perangkat tanpa getaran.</p>
            <button className={styles.buttonPrimary} onClick={retry}>
              <Camera size={16} />
              Unggah Foto Baru
            </button>
          </div>
          <div className={`${styles.choice} ${styles.manual}`}>
            <b>Opsi B: Isi Manual</b>
            <select defaultValue="camera">
              <option value="camera">Kamera & Optik • Mirrorless</option>
            </select>
            <input defaultValue="Fujifilm X-T30 II Silver" />
          </div>
        </div>
      </div>
    </div>
  );
}
