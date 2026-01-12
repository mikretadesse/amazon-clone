import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { FadeLoader } from "react-spinners";
import { DataContext } from "../DataProvider/DataProvider";
import ProductCard from "../Product/ProductCard";
import styles from "./ProductCard.module.css";

function Product() {
  const { state } = useContext(DataContext);
  const { searchTerm = "" } = state; // Get search term from context
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

  // Filter products based on search term (title, description, category)
  const filteredProducts = products.filter((product) =>
    `${product.title} ${product.description} ${product.category}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.productGrid}>
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))
      ) : (
        <p className={styles.noResults}>No products found.</p>
      )}
    </div>
  );
}

export default Product;
