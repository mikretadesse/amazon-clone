import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../../Components/Product/ProductCard";
import { productUrl } from "../../Api/EndPoints";
import { FadeLoader } from "react-spinners";
import styles from "./Results.module.css";
import axios from "axios";

// Utility to convert category names to title case
const toTitleCase = (str) => {
  if (!str) return "";
  str = str.replace(/[_-]+/g, " ");
  return str
    .split(" ")
    .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

function Category() {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products
  useEffect(() => {
    if (!categoryName) return;

    setLoading(true);
    setError(null);

    axios
      .get(`${productUrl}products/category/${encodeURIComponent(categoryName)}`)
      .then((res) => {
        // Shuffle the products inline
        const shuffledProducts = res.data.sort(() => Math.random() - 0.5);
        setProducts(shuffledProducts);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch products");
        setLoading(false);
      });
  }, [categoryName]);

  // Set page title dynamically
  useEffect(() => {
    const title = toTitleCase(decodeURIComponent(categoryName));
    document.title = `${title} | MyStore`; // Change "MyStore" to your site name
  }, [categoryName]);

  // Render states
  if (loading) {
    return (
      <div className={styles.loaderWrapper}>
        <FadeLoader color="#25b09b" />
      </div>
    );
  }

  if (error) return <div className={styles.status}>{error}</div>;

  if (products.length === 0) {
    return (
      <div className={styles.status}>No products found in this category.</div>
    );
  }

  return (
    <section className={styles.categoryPage}>
      <h1 className={styles.heading}>Results</h1>
      <h3 className={styles.categoryTitle}>
        Category/ {toTitleCase(decodeURIComponent(categoryName))}
      </h3>
      <hr />
      <div className={styles.productGrid}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default Category;
