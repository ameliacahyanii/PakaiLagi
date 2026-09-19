"use client";
import Link from "next/link";
import { Heart, MapPin, Star, Verified } from "lucide-react";
import { useState } from "react";
import { MarketplaceProduct } from "@/data/marketplace";
import styles from "./Marketplace.module.css";

const rupiah = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

export function ProductCard({ product }: { product: MarketplaceProduct }) {
  const [saved, setSaved] = useState(false);
  return (
    <article className={styles.card}>
      <div className={styles.imageWrap}>
        <Link href={`/items/${product.id}`}>
          <img src={product.image} alt={product.title} />
        </Link>
        <span className={styles.path}>{product.pathLabel}</span>
        <button
          className={`${styles.heart} ${saved ? styles.heartActive : ""}`}
          onClick={() => setSaved(!saved)}
          aria-label="Simpan ke favorit"
        >
          <Heart size={17} fill={saved ? "currentColor" : "none"} />
        </button>
      </div>
      <div className={styles.cardBody}>
        <div className={styles.scoreRow}>
          <span className={styles.score}>
            <Verified size={14} />
            {product.score} {product.condition}
          </span>
          <span className={styles.note}>{product.note}</span>
        </div>
        <h3>{product.title}</h3>
        <div className={styles.price}>{rupiah.format(product.price)}</div>
        <div className={styles.cardFooter}>
          <span>
            <MapPin size={13} /> {product.location}
          </span>
          <span>
            <Star size={13} fill="currentColor" /> {product.rating} (
            {product.reviews})
          </span>
        </div>
      </div>
    </article>
  );
}
