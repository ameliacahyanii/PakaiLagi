"use client";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  Info,
  Lightbulb,
  ScanLine,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import { SellerShell } from "@/components/seller/SellerShell";
import styles from "@/components/seller/SellerWorkspace.module.css";
const hero =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBTMbgqskqQ5XkW0j1QptMkNgc7XvdfcDv2By0M5lmbMJJn_dGI1TouMSMVYVOHJBlljKp4eww24sgx5d4mbuJcECnobaDE4dD2wwrw4tgpHDG_YAx9KIpkz8b7Vc8rNTb0xxZH4L9jCH3dv0NPyoyxcyTgOOvDFqRJJQIFVdpDht41wF_8TQO01eSZpWQpoy6k-PeoqxUBQt6g1O6v76K_-fINEiQoROZQOtZpc4k3w_tHr5X0GSLy";
const thumbs = [
  hero,
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCf8h01pem8TBRbU9MYN2qCFo8A7_SKDgxfBuK2Gh7NVueCX-v2Z4byY4_NS-zqG7_zNR3NrX_yxJB9I6_E_0vDV5iHRfZVoCFLHfxHj_qVpjA2QZceypCR7qkN7jQRMjGT2Av8fMJ5VL1PzFQ_noPONBqEI-NCNHkQxRV6UVy2A2Ou4DMEN1mbdGk9JM_uXYbjHKNB9xpoqAYczQpBPgzfuEU-W6BjuoQXgHVJ5YOJQHCHjfyGwpmh",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBso24bIPc203UlLhrscM3kBhzYBhHN6ENbH8oeSCqMuwAOmHQMi0zsh50MS6_phv61arADf2ueBXD3mZwr9FtRjtr0a1LLb2EUhBpdMqJts8l4tbYVeFUbBkAEJs7VNxJk00Q3IiV4HllWQcSFLjwnkA7w9KkKpNchs8-bhe7kg1VVllQ_lhYi4aaumj6qBP3enoVqBMV0zbDL1WXgyCYBNoWQptkC0B_tpidfC_Ha6v9hxKFVimOJ",
];
export default function ScanPage() {
  const [route, setRoute] = useState("sell");
  const [modal, setModal] = useState(false);
  return (
    <SellerShell active="inventory">
      <div className={styles.stepper}>
        <div className={styles.steps}>
          {[
            "Upload",
            "Analisis AI",
            "Inspeksi Adaptif",
            "Hasil & Skor AI",
            "Lengkapi Listing",
            "Publikasi",
          ].map((step, index) => (
            <div
              className={`${styles.step} ${index < 3 ? styles.done : ""} ${index === 3 ? styles.current : ""}`}
              key={step}
            >
              {index < 3 ? "✓ " : `${index + 1}. `}
              {step}
              <div className={styles.stepLine} />
            </div>
          ))}
        </div>
      </div>
      <main className={styles.content}>
        <div className={styles.diagnosticGrid}>
          <div className={styles.column}>
            <section className={styles.card}>
              <div className={styles.between}>
                <div>
                  <span className={styles.badge}>Audit Multi-modal v4.2</span>
                  <h1>Hasil Analisis & Rekomendasi Sirkular AI</h1>
                </div>
                <span className={styles.badge}>Kepercayaan 96%</span>
              </div>
            </section>
            <section className={styles.card}>
              <h2>Kamera Mirrorless • Sony Alpha A6000 Kit 16-50mm</h2>
              <div className={styles.finding}>
                <b>Observasi Fisik AI</b>
                <p>
                  Goresan mikro wajar pada plat bawah. Optik lensa depan jernih
                  tanpa jamur, fogging, atau debu tebal. Tombol kontrol dan port
                  lengkap.
                </p>
                <div className={styles.pills}>
                  <span className={styles.badge}>Optik 9,6/10</span>
                  <span className={styles.badge}>Bodi 8,8/10</span>
                  <span className={styles.badge}>Port I/O Utuh</span>
                </div>
              </div>
            </section>
            <section className={styles.card}>
              <h2>Kartu Skor Kondisi Terurai</h2>
              <div className={styles.scoreHead}>
                <div>
                  <small>Peringkat Kelayakan</small>
                  <h3>Sangat Baik • Tier A</h3>
                </div>
                <div className={styles.scoreValue}>88</div>
              </div>
              {[
                {
                  name: "Kinerja Fungsional",
                  value: 38,
                  max: 40,
                  color: "#005144",
                },
                {
                  name: "Fisik & Kosmetik",
                  value: 25,
                  max: 30,
                  color: "#3478b8",
                },
                {
                  name: "Kelengkapan Aksesori",
                  value: 15,
                  max: 15,
                  color: "#2f8f68",
                },
                {
                  name: "Ketahanan & Usia",
                  value: 10,
                  max: 15,
                  color: "#e5a93d",
                },
              ].map((row) => (
                <div className={styles.scoreRow} key={row.name}>
                  <div className={styles.between}>
                    <b>{row.name}</b>
                    <b>
                      {row.value}/{row.max}
                    </b>
                  </div>
                  <div className={styles.progress}>
                    <i
                      style={{
                        width: `${(row.value / row.max) * 100}%`,
                        background: row.color,
                      }}
                    />
                  </div>
                </div>
              ))}
              <div className={styles.finding}>
                <ShieldCheck color="#2f8f68" />{" "}
                <b>Status Keamanan: Terverifikasi Aman</b>
                <p>Baterai tidak kembung dan sirkuit daya dalam batas aman.</p>
              </div>
            </section>
            <section className={styles.card}>
              <h2>Rekomendasi Jalur Sirkular</h2>
              <div className={styles.routeGrid}>
                <label
                  className={`${styles.routeCard} ${route === "sell" ? styles.routeSelected : ""}`}
                >
                  <input
                    type="radio"
                    checked={route === "sell"}
                    onChange={() => setRoute("sell")}
                  />
                  <h3>Jual Kembali</h3>
                  <p>Permintaan stabil, estimasi terjual 3-7 hari.</p>
                  <b>Rp4.500.000 - Rp4.900.000</b>
                </label>
                <label
                  className={`${styles.routeCard} ${route === "swap" ? styles.routeSelected : ""}`}
                >
                  <input
                    type="radio"
                    checked={route === "swap"}
                    onChange={() => setRoute("swap")}
                  />
                  <h3>Tukar Tambah</h3>
                  <p>Tukar dengan lensa 35mm atau gimbal.</p>
                  <b>~4.800 Poin Sirkular</b>
                </label>
              </div>
              <div className={styles.finding}>
                <Info size={17} /> Saran AI dapat dikoreksi sebelum publikasi.
              </div>
            </section>
          </div>
          <aside className={styles.column}>
            <section className={styles.card}>
              <div className={styles.between}>
                <h3>Visual Hasil Scan</h3>
                <span className={styles.badge}>3 Foto</span>
              </div>
              <div className={styles.scanImage}>
                <img src={hero} alt="Sony Alpha A6000 hasil scan" />
                <div className={styles.boxOverlay}>Optics: Clean 96%</div>
              </div>
              <div className={styles.thumbs}>
                {thumbs.map((src, index) => (
                  <img
                    key={index}
                    src={src}
                    alt={`Foto inspeksi ${index + 1}`}
                  />
                ))}
              </div>
            </section>
            <section className={styles.card}>
              <h3>Tindakan Selanjutnya</h3>
              <p>Setujui hasil mesin atau lakukan koreksi manual.</p>
              <div className={styles.column}>
                <Link className={styles.primary} href="/seller/dashboard">
                  Konfirmasi & Lanjut ke Draf <ArrowRight size={17} />
                </Link>
                <button
                  className={styles.secondary}
                  onClick={() => setModal(true)}
                >
                  Koreksi Data AI
                </button>
                <button className={styles.secondary}>Foto Ulang / Retry</button>
              </div>
            </section>
            <section className={styles.card}>
              <div className={styles.between}>
                <h3>Tips Cepat</h3>
                <Lightbulb color="#005144" />
              </div>
              <ul>
                <li>Sertakan nota atau riwayat servis.</li>
                <li>Skor AI di atas 85 cenderung lebih cepat terjual.</li>
                <li>Listing lolos uji memperoleh Verified Shield.</li>
              </ul>
            </section>
          </aside>
        </div>
      </main>
      {modal && (
        <div className={styles.modalBackdrop}>
          <form
            className={styles.modal}
            onSubmit={(e) => {
              e.preventDefault();
              setModal(false);
            }}
          >
            <h3>Koreksi Data Inspeksi AI</h3>
            <label>Nama / Seri Model</label>
            <input defaultValue="Sony Alpha A6000 Kit 16-50mm" />
            <label>Tingkat Kondisi</label>
            <select defaultValue="90">
              <option value="90">Sangat Baik</option>
              <option value="80">Baik</option>
              <option value="60">Cukup</option>
            </select>
            <label>Catatan Cacat / Minus</label>
            <textarea defaultValue="Goresan halus di bawah plat bodi karena tripod plate." />
            <div className={styles.actions}>
              <button
                type="button"
                className={styles.secondary}
                onClick={() => setModal(false)}
              >
                Batal
              </button>
              <button className={styles.primary}>Terapkan Perubahan</button>
            </div>
          </form>
        </div>
      )}
    </SellerShell>
  );
}
