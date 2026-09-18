import { ArrowUpRight, MapPin } from "lucide-react";
import Link from "next/link";

export type Item = {
  id: string;
  title: string;
  category: string;
  action: "Donasi" | "Jual" | "Tukar";
  location: string;
  time: string;
  accent: string;
  glyph: string;
};

export function ItemCard({ item }: { item: Item }) {
  return (
    <Link href={`/marketplace/${item.id}`} className="item-card">
      <div className={`item-visual ${item.accent}`}>
        <span>{item.glyph}</span>
        <span className="visual-label">{item.category}</span>
      </div>
      <div className="item-card-body">
        <div className="item-title-row">
          <h3>{item.title}</h3>
          <ArrowUpRight size={17} />
        </div>
        <div className="item-detail-row">
          <span className={`status status-${item.action.toLowerCase()}`}>
            {item.action}
          </span>
          <span>{item.time}</span>
        </div>
        <div className="item-location">
          <MapPin size={14} /> {item.location}
        </div>
      </div>
    </Link>
  );
}
