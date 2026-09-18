import Link from "next/link";
import { ArrowLeft, Filter } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Item, ItemCard } from "@/components/ui/ItemCard";

const items: Item[] = [
  {
    id: "1",
    title: "Kipas meja Cosmos",
    category: "Elektronik",
    action: "Donasi",
    location: "Sleman, DIY",
    time: "2 jam lalu",
    accent: "visual-sage",
    glyph: "◌",
  },
  {
    id: "2",
    title: "Kursi kerja minimalis",
    category: "Furnitur",
    action: "Jual",
    location: "Jakarta Selatan",
    time: "5 jam lalu",
    accent: "visual-sky",
    glyph: "▱",
  },
  {
    id: "3",
    title: "Set buku kuliah semester 2",
    category: "Belajar",
    action: "Tukar",
    location: "Bandung",
    time: "Kemarin",
    accent: "visual-sand",
    glyph: "▤",
  },
  {
    id: "4",
    title: "Rak kayu 3 tingkat",
    category: "Furnitur",
    action: "Donasi",
    location: "Depok",
    time: "Kemarin",
    accent: "visual-sage",
    glyph: "▥",
  },
  {
    id: "5",
    title: "Tas kuliah kanvas",
    category: "Tekstil",
    action: "Jual",
    location: "Yogyakarta",
    time: "2 hari lalu",
    accent: "visual-sky",
    glyph: "▰",
  },
  {
    id: "6",
    title: "Rice cooker mini",
    category: "Elektronik",
    action: "Tukar",
    location: "Surabaya",
    time: "2 hari lalu",
    accent: "visual-sand",
    glyph: "◉",
  },
];

export default function ExplorePage() {
  return (
    <AppShell>
      <main className="dashboard-page">
        <Link href="/dashboard" className="text-link">
          <ArrowLeft size={16} /> Kembali ke ringkasan
        </Link>
        <section className="page-heading-block">
          <p className="eyebrow">Komunitas PakaiLagi</p>
          <h1>Eksplorasi barang</h1>
          <p>Temukan barang yang masih punya cerita dan manfaat untukmu.</p>
        </section>
        <div className="explore-toolbar">
          <div className="category-tabs">
            <button className="active">Semua</button>
            <button>Elektronik</button>
            <button>Furnitur</button>
            <button>Belajar</button>
            <button>Tekstil</button>
          </div>
          <button className="filter-button">
            <Filter size={15} /> Filter
          </button>
        </div>
        <section className="item-grid">
          {items.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </section>
      </main>
    </AppShell>
  );
}
