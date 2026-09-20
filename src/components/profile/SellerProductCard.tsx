import Link from "next/link";
import { CheckCircle, ShoppingCart } from "lucide-react";
import type { SellerProduct } from "@/data/profile-data";

const money = (value: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);

export function SellerProductCard({ product }: { product: SellerProduct }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-[15px] bg-white p-3.5 shadow-[0_3px_14px_rgba(35,52,49,0.05)]">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden rounded-[11px] bg-[#def2ed]">
        <img
          src={product.image}
          alt={product.title}
          className="h-full w-full object-cover"
        />

        <span className="absolute left-2.5 top-2.5 rounded-full bg-white/95 px-2.5 py-1.5 text-[10px] font-extrabold text-[#005144]">
          {product.path}
        </span>

        <span className="absolute bottom-2.5 right-2.5 rounded-full bg-white/95 px-2.5 py-1.5 text-[10px] font-extrabold text-[#005144]">
          AI {product.score}/100
        </span>
      </div>

      {/* Content */}
      <small className="mt-2 text-[#65736f]">{product.subtitle}</small>

      <h3 className="my-1.5 text-base font-bold text-[#0d1f1c]">
        {product.title}
      </h3>

      <span className="my-2 flex items-center gap-1.5 text-xs text-[#3f4945]">
        <CheckCircle size={15} className="text-[#2f8f68]" />
        {product.condition}
      </span>

      {/* Footer */}
      <div className="-mx-3.5 -mb-3.5 mt-2.5 rounded-b-[15px] bg-[#e4f8f3] px-3.5 py-3">
        <div className="flex items-center gap-2">
          <span className="text-xl font-extrabold text-[#005144]">
            {money(product.price)}
          </span>

          <span className="text-[10px] text-[#65736f] line-through">
            Baru {money(product.newPrice)}
          </span>
        </div>

        <div className="mt-2 flex items-center justify-between gap-2">
          <small className="text-[#65736f]">{product.inspection}</small>

          <Link
            href={`/items/${product.id}`}
            className="inline-flex items-center justify-center rounded-[11px] bg-[#def2ed] p-2.5 text-[#005144] transition hover:bg-[#cce9e2]"
            aria-label="Lihat produk"
          >
            <ShoppingCart size={16} />
          </Link>
        </div>
      </div>
    </article>
  );
}
