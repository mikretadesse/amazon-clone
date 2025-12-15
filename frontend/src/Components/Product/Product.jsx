import React, { useState, useEffect } from "react";
import axios from "axios";
import { FadeLoader } from "react-spinners";
import ProductCard from "../Product/ProductCard";
import styles from "./ProductCard.module.css";

function Product() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        // Shuffle the products inline
        const shuffledProducts = res.data.sort(() => Math.random() - 0.5);
        setProducts(shuffledProducts);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setError("Failed to load products");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className={styles.loaderWrapper}>
        <FadeLoader color="#25b09b" />
      </div>
    );
  }

  if (error) {
    return <div className={styles.status}>{error}</div>;
  }

  return (
    <div className={styles.productGrid}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default Product;
