import React from "react";
import Rating from "@mui/material/Rating";
import currencyFormatter from "../CurrencyFormater/CurrencyFormater";
import styles from "./ProductCard.module.css";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  if (!product) return null;

  const { id, image, title, price, rating } = product;

  return (
    <div className={styles.card}>
      <Link to={`/product/${id}`}>
        <img src={image} alt={title} className={styles.image} loading="lazy" />
      </Link>

      <div className={styles.info}>
        <h3 className={styles.title}>{title}</h3>

        <div className={styles.ratingBox}>
          <Rating value={rating?.rate || 0} precision={0.1} readOnly />
          <span className={styles.count}>({rating?.count || 0})</span>
        </div>

        <div className={styles.price}>{currencyFormatter(price)}</div>

        <button className={styles.button}>Add to Cart</button>
      </div>
    </div>
  );
}

export default ProductCard;
