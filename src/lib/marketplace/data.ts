import type { Item } from "@/components/ui/ItemCard";

export type MarketplaceListing = Item & {
  price: number | null;
  description: string;
  seller: string;
  conditionScore: number;
  verified: boolean;
};

export const marketplaceListings: MarketplaceListing[] = [
  { id: "1", title: "Kipas meja Cosmos", category: "Elektronik", action: "Donasi", location: "Sleman, DIY", time: "2 jam lalu", accent: "visual-sage", glyph: "◌", price: null, description: "Kipas meja dengan kondisi visual baik dan noda ringan. Fungsi wajib dicek saat serah terima.", seller: "Nadia", conditionScore: 78, verified: true },
  { id: "2", title: "Kursi kerja minimalis", category: "Furnitur", action: "Jual", location: "Jakarta Selatan", time: "5 jam lalu", accent: "visual-sky", glyph: "▱", price: 180000, description: "Kursi kerja dengan rangka kokoh, terdapat goresan ringan pada sandaran.", seller: "Raka", conditionScore: 82, verified: true },
  { id: "3", title: "Set buku kuliah semester 2", category: "Belajar", action: "Tukar", location: "Bandung", time: "Kemarin", accent: "visual-sand", glyph: "▤", price: null, description: "Kumpulan buku kuliah yang masih bisa digunakan untuk belajar dan berbagi.", seller: "Sinta", conditionScore: 90, verified: true },
  { id: "4", title: "Rak kayu 3 tingkat", category: "Furnitur", action: "Donasi", location: "Depok", time: "Kemarin", accent: "visual-sage", glyph: "▥", price: null, description: "Rak kayu dengan beberapa bekas pemakaian, masih stabil untuk penyimpanan.", seller: "Dimas", conditionScore: 76, verified: false },
  { id: "5", title: "Tas kuliah kanvas", category: "Tekstil", action: "Jual", location: "Yogyakarta", time: "2 hari lalu", accent: "visual-sky", glyph: "▰", price: 65000, description: "Tas kanvas bekas pakai dengan noda kecil dan resleting normal.", seller: "Alya", conditionScore: 73, verified: true },
  { id: "6", title: "Rice cooker mini", category: "Elektronik", action: "Tukar", location: "Surabaya", time: "2 hari lalu", accent: "visual-sand", glyph: "◉", price: null, description: "Rice cooker mini untuk ditukar dengan kebutuhan dapur lain.", seller: "Bima", conditionScore: 80, verified: false },
];
