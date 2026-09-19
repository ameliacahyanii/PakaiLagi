import Link from "next/link";
import { CheckCircle, ShoppingCart } from "lucide-react";
import type { SellerProduct } from "@/data/profile-data";
import styles from "./Profile.module.css";

const money = (value: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);

export function SellerProductCard({ product }: { product: SellerProduct }) {
  return (
    <article className={styles.productCard}>
      <div className={styles.productImage}>
        <img src={product.image} alt={product.title} />
        <span className={styles.path}>{product.path}</span>
        <span className={styles.score}>AI {product.score}/100</span>
      </div>
      <small>{product.subtitle}</small>
      <h3>{product.title}</h3>
      <span className={styles.condition}>
        <CheckCircle size={15} color="#2f8f68" /> {product.condition}
      </span>
      <div className={styles.productFooter}>
        <div className={styles.priceRow}>
          <span className={styles.price}>{money(product.price)}</span>
          <span className={styles.oldPrice}>
            Baru {money(product.newPrice)}
          </span>
        </div>
        <div className={styles.priceRow}>
          <small>{product.inspection}</small>
          <Link
            href={`/items/${product.id}`}
            className={styles.iconButton}
            aria-label="Lihat produk"
          >
            <ShoppingCart size={16} />
          </Link>
        </div>
      </div>
    </article>
  );
}
