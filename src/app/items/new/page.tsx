"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, ImagePlus, Sparkles } from "lucide-react";
import { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import type { AnalyzeItemResponse } from "@/types/ai";
import { calculateConditionScore } from "@/lib/ai/analyze-item";

export default function NewItemPage() {
  const [fileName, setFileName] = useState("");
  const [analysis, setAnalysis] = useState<AnalyzeItemResponse | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState("");
  const [step, setStep] = useState<
    "upload" | "inspect" | "result" | "published"
  >("upload");
  const [inspectionAnswers, setInspectionAnswers] = useState<
    Record<number, boolean>
  >({});
  const [conditionScore, setConditionScore] = useState(0);
  const [selectedAction, setSelectedAction] = useState("");
  const progress = { upload: 25, inspect: 50, result: 75, published: 100 }[
    step
  ];
  const stepLabel = {
    upload: "Langkah 01 dari 04",
    inspect: "Langkah 02 dari 04",
    result: "Langkah 03 dari 04",
    published: "Langkah 04 dari 04",
  }[step];

  async function handleAnalyze(file: File | undefined) {
    if (!file) return;
    setFileName(file.name);
    setAnalysis(null);
    setError("");
    setIsAnalyzing(true);

    try {
      const image = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result));
        reader.onerror = () => reject(new Error("Unable to read image"));
        reader.readAsDataURL(file);
      });
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image }),
      });
      const result = (await response.json()) as AnalyzeItemResponse & {
        error?: string;
      };
      if (!response.ok) throw new Error(result.error ?? "Analisis gagal");
      setAnalysis(result);
      setStep("inspect");
    } catch (analysisError) {
      setError(
        analysisError instanceof Error
          ? analysisError.message
          : "Analisis gagal",
      );
    } finally {
      setIsAnalyzing(false);
    }
  }

  function completeInspection() {
    const yesCount = Object.values(inspectionAnswers).filter(Boolean).length;
    const score = calculateConditionScore({
      functionScore: yesCount >= 2 ? 82 : 55,
      physicalScore: yesCount >= 3 ? 78 : 60,
      completenessScore: yesCount >= 2 ? 80 : 58,
      ageScore: 70,
      repairHistoryScore: 70,
    });
    setConditionScore(score);
    setSelectedAction(analysis?.recommendations[0]?.action ?? "donate");
    setStep("result");
  }

  return (
    <AppShell>
      <main className="dashboard-page form-page">
        <Link href="/dashboard" className="text-link">
          <ArrowLeft size={16} /> Kembali ke ringkasan
        </Link>
        <section className="page-heading-block">
          <p className="eyebrow">{stepLabel}</p>
          <h1>Mulai dari satu barang.</h1>
          <p>
            Tambahkan foto yang jelas. AI akan membantu mengenali barang dan
            menyiapkan inspeksi yang sesuai.
          </p>
        </section>
        <div className="progress-bar">
          <span style={{ width: `${progress}%` }} />
        </div>
        <section className="upload-layout">
          <label className="upload-zone">
            <input
              type="file"
              accept="image/*"
              onChange={(event) => handleAnalyze(event.target.files?.[0])}
            />
            <span className="upload-icon">
              <ImagePlus size={25} />
            </span>
            <strong>
              {isAnalyzing
                ? "Sedang menganalisis..."
                : fileName || "Pilih foto barang"}
            </strong>
            <span>
              {fileName
                ? "Foto sudah dikirim ke pemeriksaan awal"
                : "PNG, JPG atau WEBP · maksimal 10 MB"}
            </span>
          </label>
          <aside className="upload-aside">
            <div className="aside-icon">
              <Sparkles size={18} />
            </div>
            <h2>Foto yang membantu AI</h2>
            <ul>
              <li>Pastikan barang terlihat utuh.</li>
              <li>Gunakan cahaya yang cukup.</li>
              <li>Tambahkan foto bagian yang rusak.</li>
              <li>Hindari memasukkan data pribadi.</li>
            </ul>
          </aside>
        </section>
        {error && <p className="form-error">{error}</p>}
        {analysis && step === "inspect" && (
          <section className="analysis-result">
            <div className="analysis-result-header">
              <div>
                <p className="eyebrow">Hasil pemeriksaan awal</p>
                <h2>{analysis.analysis.item_type}</h2>
              </div>
              <span className="confidence-badge">
                {Math.round(analysis.analysis.confidence * 100)}% yakin
              </span>
            </div>
            <p className="analysis-note">{analysis.analysis.safety_note}</p>
            <div className="analysis-columns">
              <div>
                <span className="result-label">Kategori</span>
                <strong>{analysis.analysis.category}</strong>
                <span className="result-label">Kondisi visual</span>
                <strong>{analysis.analysis.visual_condition}</strong>
              </div>
              <div>
                <span className="result-label">Terlihat dari foto</span>
                <ul>
                  {analysis.analysis.visible_issues.map((issue) => (
                    <li key={issue}>{issue}</li>
                  ))}
                </ul>
              </div>
              <div>
                <span className="result-label">
                  Pertanyaan inspeksi berikutnya
                </span>
                <ul>
                  {analysis.analysis.inspection_questions.map((question) => (
                    <li key={question}>{question}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="recommendation-list">
              <span className="result-label">Jalur yang mungkin</span>
              {analysis.recommendations.map((recommendation) => (
                <div className="recommendation-row" key={recommendation.action}>
                  <strong>{recommendation.action}</strong>
                  <span>{recommendation.suitability_score}%</span>
                  <small>{recommendation.reason}</small>
                </div>
              ))}
            </div>
            <div className="price-estimate">
              <div>
                <span className="result-label">Rentang harga indikatif</span>
                <strong>
                  Rp{analysis.price_range.min.toLocaleString("id-ID")} - Rp
                  {analysis.price_range.max.toLocaleString("id-ID")}
                </strong>
              </div>
              <small>
                Keyakinan {analysis.price_range.confidence}.{" "}
                {analysis.price_range.reason}
              </small>
            </div>
          </section>
        )}
        {analysis && step === "inspect" && (
          <section className="inspection-panel">
            <p className="eyebrow">Langkah 02 dari 03</p>
            <h2>Jawab sesuai kondisi sebenarnya.</h2>
            <p className="inspection-intro">
              Jawabanmu membantu kami memberi rekomendasi yang lebih bertanggung
              jawab. Tidak ada jawaban yang salah.
            </p>
            <div className="inspection-list">
              {analysis.analysis.inspection_questions.map((question, index) => (
                <label key={question} className="inspection-row">
                  <span>{question}</span>
                  <input
                    type="checkbox"
                    checked={Boolean(inspectionAnswers[index])}
                    onChange={(event) =>
                      setInspectionAnswers((answers) => ({
                        ...answers,
                        [index]: event.target.checked,
                      }))
                    }
                  />
                </label>
              ))}
            </div>
          </section>
        )}
        {analysis && step === "result" && (
          <section className="final-result">
            <p className="eyebrow">Langkah 03 dari 03 · Selesai dianalisis</p>
            <h2>
              Barang ini mendapat skor <em>{conditionScore}/100</em>
            </h2>
            <p className="analysis-note">
              Skor ini transparan dan hanya estimasi awal. Pastikan kondisi
              barang saat serah terima sesuai deskripsi.
            </p>
            <div className="final-choice">
              <span className="result-label">Pilih jalur penyaluran</span>
              <div className="choice-grid">
                {analysis.recommendations.map((recommendation) => (
                  <button
                    type="button"
                    key={recommendation.action}
                    className={
                      selectedAction === recommendation.action
                        ? "choice active"
                        : "choice"
                    }
                    onClick={() => setSelectedAction(recommendation.action)}
                  >
                    <strong>{recommendation.action}</strong>
                    <span>{recommendation.suitability_score}% cocok</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="price-estimate">
              <div>
                <span className="result-label">
                  Saran harga untuk jalur jual
                </span>
                <strong>
                  Rp{analysis.price_range.min.toLocaleString("id-ID")} - Rp
                  {analysis.price_range.max.toLocaleString("id-ID")}
                </strong>
              </div>
              <small>
                Harga bukan jaminan pasar. Kamu tetap menentukan harga akhir.
              </small>
            </div>
          </section>
        )}
        {step === "published" && (
          <section className="published-panel">
            <div className="published-check">✓</div>
            <p className="eyebrow">Listing berhasil dibuat</p>
            <h2>Barangmu siap menemukan pemilik berikutnya.</h2>
            <p>
              Jalur pilihan: <strong>{selectedAction}</strong>. Kamu bisa
              melanjutkan dengan menunggu klaim dari komunitas.
            </p>
            <Link href="/dashboard" className="button button-primary">
              Kembali ke dashboard <ArrowRight size={17} />
            </Link>
          </section>
        )}
        <div className="form-actions">
          <Link href="/dashboard" className="button button-ghost">
            Simpan nanti
          </Link>
          {step === "inspect" && (
            <button
              type="button"
              className="button button-primary"
              onClick={completeInspection}
            >
              Lihat rekomendasi <ArrowRight size={17} />
            </button>
          )}
          {step === "result" && (
            <button
              type="button"
              className="button button-primary"
              disabled={!selectedAction}
              onClick={() => setStep("published")}
            >
              Publikasikan listing <ArrowRight size={17} />
            </button>
          )}
        </div>
      </main>
    </AppShell>
  );
}
