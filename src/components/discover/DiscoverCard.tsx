"use client";
import Link from "next/link";
import { Heart, ImageOff, ShoppingBag } from "lucide-react";
import { useState } from "react";
import type { DiscoverProduct } from "@/data/discover-products";

const rupiah = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

const focus =
  "focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#12705A]";

export function DiscoverCard({ product }: { product: DiscoverProduct }) {
  const [saved, setSaved] = useState(false);

  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-[#E4E7EB] bg-white shadow-[0_1px_2px_rgba(17,24,39,0.04)] transition-shadow hover:shadow-[0_10px_28px_-14px_rgba(17,24,39,0.18)]">
      <div className="relative aspect-[4/3] w-full bg-[#F3F4F2]">
        <img
          src={product.image}
          alt={product.title}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <span className="absolute top-3 left-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-[#0B4F3F] backdrop-blur-sm">
          {product.pathLabel}
        </span>

        <button
          type="button"
          onClick={() => setSaved((v) => !v)}
          aria-label={saved ? "Hapus dari wishlist" : "Simpan ke wishlist"}
          aria-pressed={saved}
          className={`absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#111827] shadow-sm transition-colors hover:bg-white ${
            saved ? "text-[#0B4F3F]" : ""
          } ${focus}`}
        >
          <Heart size={17} fill={saved ? "currentColor" : "none"} />
        </button>

        <span className="absolute bottom-3 left-3 rounded-full bg-black/55 px-2.5 py-1 text-xs font-medium text-white">
          {product.logistics}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-center justify-between gap-2 text-xs text-[#5B6675]">
          <span className="font-semibold text-[#111827]">
            {product.score}/100 · {product.condition}
          </span>
          <span>{product.detail}</span>
        </div>

        <h3 className="line-clamp-2 text-[0.95rem] font-semibold text-[#111827]">
          {product.title}
        </h3>

        <div className="flex items-end justify-between gap-2">
          <div>
            <small className="block text-xs text-[#5B6675]">
              Harga Sirkular
            </small>
            <div className="text-lg font-bold text-[#111827]">
              {rupiah.format(product.price)}
            </div>
          </div>
          <span className="rounded-full bg-[#E6F2ED] px-2.5 py-1 text-xs font-semibold text-[#0B4F3F]">
            -{product.carbonKg} kg CO₂e
          </span>
        </div>

        <div className="mt-1 flex items-center gap-2">
          <Link
            href={`/items/${product.id}`}
            className={`flex min-h-10 flex-1 items-center justify-center rounded-lg border border-[#E4E7EB] px-3 text-sm font-semibold !text-[#111827] no-underline transition-colors hover:border-[#0B4F3F] ${focus}`}
          >
            {product.actionLabel}
          </Link>
          <Link
            href="/checkout"
            aria-label="Beli sekarang"
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#0B4F3F] !text-white no-underline transition-colors hover:bg-[#083D31] ${focus}`}
          >
            <ShoppingBag size={18} />
          </Link>
        </div>
      </div>
    </article>
  );
}
