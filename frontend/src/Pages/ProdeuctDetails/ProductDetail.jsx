import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Rating from "@mui/material/Rating";
import { FadeLoader } from "react-spinners";
import { productUrl } from "../../Api/EndPoints";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import { type } from "../../Pages/Utility/Action.type";
import currencyFormatter from "../../Components/CurrencyFormater/CurrencyFormater";
import styles from "./ProductDetail.module.css";

function ProductDetails() {
  const { id } = useParams();
  const { dispatch } = useContext(DataContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch product by ID
  useEffect(() => {
    if (!id) return;

    setLoading(true);
    setError(null);

    axios
      .get(`${productUrl}products/${id}`, {
        setTimeout: 10000,
      })
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load product");
        setLoading(false);
      });
  }, [id]);

  const addToCart = () => {
    dispatch({
      type: type.ADD_TO_CART,
      payload: {
        id: product.id,
        image: product.image,
        title: product.title,
        description: product.description,
        price: product.price,
        rating: product.rating,
      },
    });
  };
  



  // Set dynamic page title
  useEffect(() => {
    if (product?.title) {
      document.title = `${product.title} | MyStore`; // Replace MyStore with your site name
    }
  }, [product]);

  if (loading) {
    return (
      <div className={styles.loaderWrapper}>
        <FadeLoader color="#25b09b" />
      </div>
    );
  }

  if (error) return <div className={styles.status}>{error}</div>;
  if (!product) return null;

  return (
    <section className={styles.details}>
      <div className={styles.imageBox}>
        <img src={product.image} alt={product.title} />
      </div>

      <div className={styles.info}>
        <h1>{product.title}</h1>
        <p className={styles.description}>{product.description}</p>
        <div className={styles.rating}>
          <Rating value={product.rating?.rate || 0} precision={0.1} readOnly />
          <span>({product.rating?.count || 0} ratings)</span>
        </div>
        <div className={styles.price}>{currencyFormatter(product.price)}</div>
        <button className={styles.button} onClick={addToCart}>Add to Cart</button>
      </div>
    </section>
  );
}

export default ProductDetails;
