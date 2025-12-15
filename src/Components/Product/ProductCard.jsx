import React from "react";
import Rating from "@mui/material/Rating";
import currencyFormatter from "../CurrencyFormater/CurrencyFormater";
import styles from "./ProductCard.module.css";

function ProductCard({ image, title, price, rating }) {
  return (
    <div className={styles.card}>
      <a href="#">
        <img src={image} alt={title} className={styles.image} />
      </a>

      <div className={styles.info}>
        <h3 className={styles.title}>{title}</h3>

        <div className={styles.ratingBox}>
          <Rating value={rating.rate} precision={0.1} />
          <span className={styles.count}>({rating.count})</span>
        </div>

        <div className={styles.price}>{currencyFormatter(price)}</div>

        <button className={styles.button}>Add to Cart</button>
      </div>
    </div>
  );
}

export default ProductCard;
