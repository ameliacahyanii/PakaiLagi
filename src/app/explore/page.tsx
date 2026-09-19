"use client";
import {
  BarChart3,
  CheckCircle,
  Leaf,
  Search,
  ShieldCheck,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import {
  MarketplaceFooter,
  MarketplaceHeader,
} from "@/components/marketplace/MarketplaceShell";
import { DiscoverCard } from "@/components/discover/DiscoverCard";
import {
  discoverProducts,
  DiscoverCategory,
  DiscoverPath,
} from "@/data/discover-products";
import styles from "@/components/discover/Discover.module.css";

const paths: { value: DiscoverPath; label: string; count: number }[] = [
  { value: "sell", label: "Jual Langsung", count: 28 },
  { value: "swap", label: "Tukar Tambah", count: 12 },
  { value: "repair", label: "Perlu Servis", count: 5 },
  { value: "parts", label: "Ambil Komponen", count: 3 },
];
const categories: { value: DiscoverCategory; label: string }[] = [
  { value: "camera", label: "Kamera & Optik" },
  { value: "computer", label: "Komputasi & Laptop" },
  { value: "audio", label: "Audio & Akustik" },
  { value: "peripheral", label: "Periferal & Aksesori" },
  { value: "component", label: "Komponen & Sparepart" },
];

export default function ExplorePage() {
  const [query, setQuery] = useState("");
  const [selectedPaths, setSelectedPaths] = useState<DiscoverPath[]>([]);
  const [category, setCategory] = useState<DiscoverCategory | "all">("all");
  const [minimumScore, setMinimumScore] = useState(0);
  const [maximumPrice, setMaximumPrice] = useState(12000000);
  const [sort, setSort] = useState("score");

  const filtered = useMemo(() => {
    const normalized = query.toLowerCase();
    const result = discoverProducts.filter(
      (product) =>
        product.title.toLowerCase().includes(normalized) &&
        (selectedPaths.length === 0 || selectedPaths.includes(product.path)) &&
        (category === "all" || product.category === category) &&
        product.score >= minimumScore &&
        product.price <= maximumPrice,
    );
    return [...result].sort((a, b) =>
      sort === "price-low"
        ? a.price - b.price
        : sort === "price-high"
          ? b.price - a.price
          : sort === "carbon"
            ? b.carbonKg - a.carbonKg
            : b.score - a.score,
    );
  }, [category, maximumPrice, minimumScore, query, selectedPaths, sort]);

  function togglePath(path: DiscoverPath) {
    setSelectedPaths((current) =>
      current.includes(path)
        ? current.filter((item) => item !== path)
        : [...current, path],
    );
  }
  function reset() {
    setSelectedPaths([]);
    setCategory("all");
    setMinimumScore(0);
    setMaximumPrice(12000000);
    setQuery("");
  }

  return (
    <div className={styles.page}>
      <MarketplaceHeader />
      <div className={styles.topbar}>
        <div className={styles.topbarInner}>
          <span>
            Beranda › <b>Temukan / Discover</b> • {filtered.length} barang
            sesuai filter
          </span>
          <span className={styles.badge}>
            <ShieldCheck size={14} /> Escrow Garansi 30 Hari Aktif
          </span>
        </div>
      </div>
      <main className={styles.main}>
        <div className={styles.workspace}>
          <aside className={styles.sidebar}>
            <div className={styles.sideHead}>
              <b>Filter Sirkular</b>
              <button className={styles.reset} onClick={reset}>
                Reset
              </button>
            </div>
            <div className={styles.filterGroup}>
              <h3>Jalur Sirkular</h3>
              {paths.map((path) => (
                <label className={styles.filterOption} key={path.value}>
                  <span>
                    <input
                      type="checkbox"
                      checked={selectedPaths.includes(path.value)}
                      onChange={() => togglePath(path.value)}
                    />
                    {path.label}
                  </span>
                  <small>{path.count}</small>
                </label>
              ))}
            </div>
            <div className={styles.filterGroup}>
              <h3>Kategori Gawai</h3>
              <label className={styles.filterOption}>
                <span>
                  <input
                    type="radio"
                    name="category"
                    checked={category === "all"}
                    onChange={() => setCategory("all")}
                  />
                  Semua Kategori
                </span>
              </label>
              {categories.map((item) => (
                <label className={styles.filterOption} key={item.value}>
                  <span>
                    <input
                      type="radio"
                      name="category"
                      checked={category === item.value}
                      onChange={() => setCategory(item.value)}
                    />
                    {item.label}
                  </span>
                </label>
              ))}
            </div>
            <div className={styles.filterGroup}>
              <h3>Skor AI Diagnostic</h3>
              {[80, 65, 45, 25].map((score) => (
                <label className={styles.filterOption} key={score}>
                  <span>
                    <input
                      type="radio"
                      name="score"
                      checked={minimumScore === score}
                      onChange={() => setMinimumScore(score)}
                    />
                    Minimal {score}/100
                  </span>
                </label>
              ))}
            </div>
            <div className={styles.filterGroup}>
              <h3>Harga Maksimum</h3>
              <div className={styles.priceInputs}>
                <input value="Rp 500.000" readOnly />
                <span>-</span>
                <input
                  value={`Rp ${maximumPrice.toLocaleString("id-ID")}`}
                  readOnly
                />
              </div>
              <input
                type="range"
                min={500000}
                max={12000000}
                step={250000}
                value={maximumPrice}
                onChange={(event) =>
                  setMaximumPrice(Number(event.target.value))
                }
              />
            </div>
            <div className={styles.filterGroup}>
              <h3>Opsi Logistik Hijau</h3>
              <label className={styles.filterOption}>
                <span>
                  <input type="checkbox" defaultChecked />
                  Kurir Motor Listrik
                </span>
              </label>
              <label className={styles.filterOption}>
                <span>
                  <input type="checkbox" />
                  Drop Hub MRT / KRL
                </span>
              </label>
              <label className={styles.filterOption}>
                <span>
                  <input type="checkbox" />
                  Returnable Sleeve
                </span>
              </label>
            </div>
            <button className={styles.apply}>
              Terapkan Filter ({filtered.length})
            </button>
          </aside>
          <section className={styles.content}>
            <div className={styles.toolbar}>
              <div className={styles.toolbarTop}>
                <label className={styles.search}>
                  <Search size={19} />
                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Cari nama gawai atau spesifikasi..."
                  />
                </label>
                <div className={styles.controls}>
                  <select
                    className={styles.select}
                    value={sort}
                    onChange={(event) => setSort(event.target.value)}
                  >
                    <option value="score">Skor AI Tertinggi</option>
                    <option value="price-low">Harga Terendah</option>
                    <option value="price-high">Harga Tertinggi</option>
                    <option value="carbon">CO₂e Terhemat</option>
                  </select>
                </div>
              </div>
              <div className={styles.activeFilters}>
                <span>Filter Aktif:</span>
                {minimumScore > 0 && (
                  <span className={styles.chip}>
                    Skor AI ≥ {minimumScore}
                    <button onClick={() => setMinimumScore(0)}>
                      <X size={13} />
                    </button>
                  </span>
                )}
                {selectedPaths.map((path) => (
                  <span className={styles.chip} key={path}>
                    {paths.find((item) => item.value === path)?.label}
                    <button onClick={() => togglePath(path)}>
                      <X size={13} />
                    </button>
                  </span>
                ))}
                {(selectedPaths.length > 0 ||
                  minimumScore > 0 ||
                  category !== "all") && (
                  <button className={styles.clear} onClick={reset}>
                    Hapus Semua
                  </button>
                )}
              </div>
            </div>
            <div className={styles.grid}>
              {filtered.map((product) => (
                <DiscoverCard key={product.id} product={product} />
              ))}
            </div>
            {filtered.length === 0 && (
              <div className={styles.toolbar}>
                Tidak ada barang yang sesuai. Coba reset filter.
              </div>
            )}
            <div className={styles.pagination}>
              <span>
                Menampilkan <b>1 - {filtered.length}</b> dari <b>48</b> barang
                terverifikasi
              </span>
              <div className={styles.pages}>
                <button disabled>‹</button>
                <button className={styles.current}>1</button>
                <button>2</button>
                <button>3</button>
                <button>›</button>
              </div>
            </div>
          </section>
        </div>
      </main>
      <section className={styles.education}>
        <div className={styles.educationInner}>
          <div className={styles.educationPanel}>
            <div>
              <span className={styles.badge}>
                <CheckCircle size={14} /> Protokol Kepercayaan PakaiLagi
              </span>
              <h2>Mengapa Membeli dengan AI Condition Score?</h2>
              <p>
                Setiap gawai telah melalui audit visual dan pengujian fungsi.
                Smart Escrow menahan dana sampai kondisi sesuai laporan.
              </p>
              <div className={styles.benefits}>
                <div className={styles.benefit}>
                  <BarChart3 />
                  <span>
                    <b>Audit Optik Makro</b>
                    <small>Deteksi goresan mikro</small>
                  </span>
                </div>
                <div className={styles.benefit}>
                  <ShieldCheck />
                  <span>
                    <b>Smart Escrow</b>
                    <small>Jaminan uang kembali</small>
                  </span>
                </div>
                <div className={styles.benefit}>
                  <Leaf />
                  <span>
                    <b>Paspor CO₂e</b>
                    <small>Sertifikat dampak digital</small>
                  </span>
                </div>
              </div>
            </div>
            <div className={styles.report}>
              <small>Laporan Verifikasi #PKL-9082</small>
              <div className={styles.priceRow}>
                <div className={styles.ring}>
                  <b>92</b>
                </div>
                <div>
                  <h3>Indeks Integritas</h3>
                  <p>Baterai, optik, dan siklus komponen lolos uji.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <MarketplaceFooter />
    </div>
  );
}
