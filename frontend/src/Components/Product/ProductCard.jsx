import React, { useContext } from "react";
import Rating from "@mui/material/Rating";
import currencyFormatter from "../CurrencyFormater/CurrencyFormater";
import styles from "./ProductCard.module.css";
import { Link } from "react-router-dom";
import { DataContext } from "../DataProvider/DataProvider";
import { type } from "../../Pages/Utility/Action.type";

function ProductCard({ product }) {
  if (!product) return null;
  const { id, image, title, price, description, rating } = product;
  const { dispatch } = useContext(DataContext);

  const addToCart = () => {
    dispatch({
      type: type.ADD_TO_CART,
      payload: {
        id,
        image,
        title,
        description, 
        price,
        rating,
      },
    });
  };
  

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

        <button className={styles.button} onClick={addToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
