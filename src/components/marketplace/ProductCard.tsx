"use client";
import Link from "next/link";
import { Heart, MapPin, Star, Verified } from "lucide-react";
import { useState } from "react";
import { MarketplaceProduct } from "@/data/marketplace";
import Image from "next/image";

const rupiah = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

export function ProductCard({ product }: { product: MarketplaceProduct }) {
  const [saved, setSaved] = useState(false);
  return (
    <article className="flex flex-col overflow-hidden rounded-[15px] bg-white shadow-[0_3px_14px_#2334310d] transition-transform duration-200 hover:-translate-y-1 hover:shadow-[0_12px_28px_#23343117]">
      <div className="relative aspect-[4/3] overflow-hidden bg-[#def2ed] group">
        <Link href={`/items/${product.id}`}>
          <Image
            src={product.image}
            alt={product.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
          />
        </Link>
        <span className="absolute left-3 top-3 rounded-full bg-[#176b5b] px-2.5 py-1.5 text-xs font-extrabold text-white">
          {product.pathLabel}
        </span>
        <button
          className={`absolute right-3 top-3 grid h-[34px] w-[34px] place-items-center rounded-full border-0 bg-white/95 ${
            saved ? "text-[#c95555]" : "text-[#65736f]"
          }`}
          onClick={() => setSaved(!saved)}
          aria-label="Simpan ke favorit"
        >
          <Heart size={17} fill={saved ? "currentColor" : "none"} />
        </button>
      </div>
      <div className="flex flex-1 flex-col gap-2.5 p-[15px]">
        <div className="flex items-center justify-between gap-2">
          <span className="flex items-center gap-1.5 rounded-full bg-[#def2ed] px-2 py-1.5 text-xs font-extrabold text-[#005144]">
            <Verified size={14} />
            {product.score} {product.condition}
          </span>
          <span className="text-[11px] text-[#65736f]">{product.note}</span>
        </div>
        <h3 className="m-0 text-[17px]">{product.title}</h3>
        <div className="mt-auto text-xl font-extrabold text-[#005144]">
          {rupiah.format(product.price)}
        </div>
        <div className="-mx-[15px] -mb-[15px] flex items-center justify-between gap-2 bg-[#e4f8f3] px-[15px] py-[11px] text-xs text-[#65736f]">
          <span className="flex items-center gap-1">
            <MapPin size={13} /> {product.location}
          </span>
          <span className="flex items-center gap-1">
            <Star size={13} fill="currentColor" /> {product.rating} (
            {product.reviews})
          </span>
        </div>
      </div>
    </article>
  );
}
