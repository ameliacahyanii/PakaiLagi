"use client";
import Link from "next/link";
import { Heart, ShoppingBag } from "lucide-react";
import { useState } from "react";
import type { DiscoverProduct } from "@/data/discover-products";
import styles from "./Discover.module.css";

const rupiah = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

export function DiscoverCard({ product }: { product: DiscoverProduct }) {
  const [saved, setSaved] = useState(false);
  return (
    <article className={styles.card}>
      <div className={styles.image}>
        <img src={product.image} alt={product.title} />
        <span className={styles.path}>{product.pathLabel}</span>
        <button
          className={`${styles.wish} ${saved ? styles.wishActive : ""}`}
          onClick={() => setSaved(!saved)}
          aria-label="Simpan ke wishlist"
        >
          <Heart size={17} fill={saved ? "currentColor" : "none"} />
        </button>
        <span className={styles.logistics}>{product.logistics}</span>
      </div>
      <div className={styles.body}>
        <div className={styles.cardTop}>
          <span className={styles.score}>
            {product.score}/100 • {product.condition}
          </span>
          <span className={styles.detail}>{product.detail}</span>
        </div>
        <h3>{product.title}</h3>
        <div className={styles.priceRow}>
          <div>
            <small>Harga Sirkular</small>
            <div className={styles.price}>{rupiah.format(product.price)}</div>
          </div>
          <span className={styles.carbon}>-{product.carbonKg} kg CO₂e</span>
        </div>
        <div className={styles.actions}>
          <Link href={`/items/${product.id}`} className={styles.secondary}>
            {product.actionLabel}
          </Link>
          <Link
            href="/checkout"
            className={styles.primary}
            aria-label="Beli sekarang"
          >
            <ShoppingBag size={18} />
          </Link>
        </div>
      </div>
    </article>
  );
}
