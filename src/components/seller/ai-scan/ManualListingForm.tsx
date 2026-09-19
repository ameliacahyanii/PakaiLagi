"use client";
import {
  ArrowLeft,
  ArrowRight,
  Camera,
  Leaf,
  Lock,
  Plus,
  Save,
  ShieldCheck,
  X,
} from "lucide-react";
import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import styles from "./AiScanModal.module.css";

const defaultPhotos = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuD829EtupoqbvwyD50gGu7oWyMKHjT8NiMekjT6RW75RzOKUjuTX69P46oh1kaUbVPYfXFfV9k_Ti6SOXMjVI3A4aH0rgi8pUUTblwmq8K3d77o3F-9DhfPc59Hh1g9t9uM6IPw4VVNIl95lnmRDVgQvU-3tkjhSNunfxnE0Co3pydV3o_ItStQvUlrQ-vKqeKIfLqW1EAgaeokIzy4pZIi2iqQAhv8mO-lJY4yq4GIH0-hBSWm-Azl",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAkFs4fjOvdVcof_0iLmAiXl3sJpSEJlYqNzCqOjaV-Ix5HSL3behLoWkhx-MyvTzWisOtudm5qe0CEBrWKSy5SIbXaHpw1LgRi9hc9kkP9ccRbhszRiOy5g5zRsZlziknNc4VNGndMedkKmfrouqjr2RTA3UPrsfwr80p5muMnkAhBO7ppAt0CS9czYQ53g7KameGQUvEL2uOwg-uAUPbzVRxTYdJi-zuYPK882qkyEAYIwila-rvk",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBzpL0g2s71wb0kzqoFp2wU_1mB8s3riYTMUOz3J1cHFwDC-CyS5VUACmm8YUQcrUFQ_jbIp4_-q7xqoRbEdRA1qT6uYfNyYTjlyGDWzQ35vpfwtZLz-hBykcnm9ZgFBpiumNmrwFftW-4liIXVtCjvjUseDq8vMZpeJVHfpFbdEEaJumJydcf23Iq6XEuVxim-_6TAMV2mmL2Ehh8ovXp6SEftMD8Fz7XuhOqfa6NOd4AZhrkNXHK8",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuADwpmWa6096Nbirg2pSBvEI8OIH3f66ytU5lO2-bt6_cSDokj2y00Gq7PfVINKPcRcVEO9h7uCgv2HGZPs1y51AxhuRFAMKG5OAm_bm1wE8pfzc_Yx5Ovp8bw0BbD1q_dwb9BuzY9kqBnVBsbSVrkD6oTOG2Fsj8EfDsaTpOvKQwGHypN00VlJcaAiOgvTgb7NTJKSJjHh5OMSoqoJ0na-qbLXLCkG497evJpdLpOi6tGwsZ2o-M99",
];
export function ManualListingForm({
  onClose,
  onBack,
  onSaved,
  onContinue,
}: {
  onClose: () => void;
  onBack: () => void;
  onSaved: () => void;
  onContinue: () => void;
}) {
  const [photos, setPhotos] = useState<string[]>(defaultPhotos);
  const [route, setRoute] = useState("sell");
  const [agreed, setAgreed] = useState(true);
  const [price, setPrice] = useState("7.850.000");
  function addPhoto(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file)
      setPhotos((current) =>
        [...current, URL.createObjectURL(file)].slice(0, 5),
      );
  }
  function formatPrice(value: string) {
    const raw = value.replace(/\D/g, "");
    setPrice(raw ? new Intl.NumberFormat("id-ID").format(Number(raw)) : "");
  }
  function submit(event: FormEvent) {
    event.preventDefault();
    if (agreed) onContinue();
  }
  return (
    <div className={styles.nestedBackdrop}>
      <form className={styles.manualModal} onSubmit={submit}>
        <header className={styles.guideHeader}>
          <div>
            <div className={styles.row}>
              <h2>Tambah Barang Manual • Jalur Mandiri</h2>
              <span className={styles.badge}>Verifikasi Deklarasi Penjual</span>
            </div>
            <p>
              Isi kondisi dan riwayat barang secara transparan. Paspor Digital
              akan mencatat sumber deklarasi.
            </p>
          </div>
          <button type="button" className={styles.close} onClick={onClose}>
            <X size={20} />
          </button>
        </header>
        <div className={styles.manualNotice}>
          <ShieldCheck size={20} />
          <p>
            <b>Transparansi skor:</b> kondisi dihitung dari jawaban penjual dan
            ditandai sebagai deklarasi mandiri.
          </p>
        </div>
        <div className={styles.manualBody}>
          <ManualSection number="1" title="Foto & Media Barang">
            <div className={styles.manualPhotos}>
              <img
                className={styles.mainPhoto}
                src={photos[0]}
                alt="Foto utama Fujifilm X-T30 II"
              />
              <div className={styles.photoThumbGrid}>
                {photos.slice(1, 4).map((photo, index) => (
                  <img
                    src={photo}
                    alt={`Foto tambahan ${index + 1}`}
                    key={photo}
                  />
                ))}
                <label className={styles.addPhoto}>
                  <input
                    hidden
                    type="file"
                    accept="image/*"
                    onChange={addPhoto}
                  />
                  <Plus size={22} />
                  <span>Tambah Foto</span>
                </label>
              </div>
            </div>
          </ManualSection>
          <ManualSection number="2" title="Informasi Dasar Produk">
            <div className={styles.formGrid}>
              <label className={styles.fullField}>
                Judul Listing
                <input
                  defaultValue="Fujifilm X-T30 II Body Only - Silver (Kondisi Sangat Baik)"
                  required
                />
              </label>
              <label>
                Kategori
                <select defaultValue="camera">
                  <option value="camera">Kamera & Optik • Mirrorless</option>
                  <option value="audio">Audio & Headphone</option>
                  <option value="computer">Komputer & Tablet</option>
                </select>
              </label>
              <label>
                Tahun / Riwayat
                <input defaultValue="2022 • Pemakaian sekitar 2 tahun" />
              </label>
              <label>
                Merk
                <input defaultValue="Fujifilm" required />
              </label>
              <label>
                Model
                <input defaultValue="X-T30 II" required />
              </label>
            </div>
          </ManualSection>
          <ManualSection number="3" title="Deklarasi Kondisi Fisik & Fungsi">
            <div className={styles.optionGroup}>
              <b>Status Fungsi</b>
              <div className={styles.optionGrid}>
                {["100% Normal", "Ada Minus Minor", "Perlu Servis"].map(
                  (item, index) => (
                    <label key={item}>
                      <input
                        defaultChecked={index === 0}
                        type="radio"
                        name="function"
                      />
                      {item}
                    </label>
                  ),
                )}
              </div>
            </div>
            <div className={styles.optionGroup}>
              <b>Kondisi Kosmetik</b>
              <div className={styles.optionGrid}>
                {[
                  "Mulus Seperti Baru",
                  "Lecet Pemakaian Wajar",
                  "Dent / Cacat Jelas",
                ].map((item, index) => (
                  <label key={item}>
                    <input
                      defaultChecked={index === 1}
                      type="radio"
                      name="cosmetic"
                    />
                    {item}
                  </label>
                ))}
              </div>
            </div>
            <label className={styles.fullField}>
              Deskripsi Kejujuran
              <textarea
                rows={4}
                defaultValue="Kondisi fisik terawat. Sensor bersih, shutter count 4.200. Ada baret mikro di sudut bawah yang tidak memengaruhi fungsi. Lengkap box dan charger."
                required
              />
            </label>
          </ManualSection>
          <ManualSection number="4" title="Harga, Jalur Sirkular & Dampak">
            <div className={styles.routeButtons}>
              {[
                ["sell", "Jual Langsung"],
                ["swap", "Tukar Tambah"],
                ["donate", "Donasi Hijau"],
              ].map(([id, label]) => (
                <button
                  type="button"
                  key={id}
                  className={route === id ? styles.routeActive : ""}
                  onClick={() => setRoute(id)}
                >
                  {label}
                </button>
              ))}
            </div>
            <label className={styles.priceField}>
              Harga Pasang
              <span>
                <b>Rp</b>
                <input
                  value={price}
                  onChange={(event) => formatPrice(event.target.value)}
                  required
                />
              </span>
              <small>Rekomendasi pasar: Rp7.500.000 - Rp8.200.000</small>
            </label>
            <div className={styles.impactSummary}>
              <Leaf size={22} />
              <div>
                <b>+45 Poin</b>
                <small>Sirkularitas</small>
              </div>
              <div>
                <b>380 g</b>
                <small>e-Waste Dicegah</small>
              </div>
              <div>
                <b>16,5 kg</b>
                <small>CO₂e Dihemat</small>
              </div>
            </div>
          </ManualSection>
          <label className={styles.agreement}>
            <input
              type="checkbox"
              checked={agreed}
              onChange={(event) => setAgreed(event.target.checked)}
            />
            <span>
              Saya menyatakan seluruh informasi sesuai dengan kondisi fisik
              barang sebenarnya.
            </span>
          </label>
        </div>
        <footer className={styles.guideFooter}>
          <button type="button" className={styles.buttonSoft} onClick={onBack}>
            <ArrowLeft size={16} />
            Beralih ke AI Scan
          </button>
          <div className={styles.actions}>
            <button type="button" className={styles.button} onClick={onSaved}>
              <Save size={16} />
              Simpan Draf
            </button>
            <button
              type="submit"
              disabled={!agreed}
              className={styles.buttonPrimary}
            >
              Pratinjau & Publikasi <ArrowRight size={16} />
            </button>
          </div>
        </footer>
      </form>
    </div>
  );
}
function ManualSection({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className={styles.manualSection}>
      <h3>
        <span>{number}</span>
        {title}
      </h3>
      {children}
    </section>
  );
}
