import React, { useState, useEffect } from "react";
import Category from "./Category";
import styles from "./Category.module.css";
import { categories } from "./data.js";
import { FadeLoader } from "react-spinners";

const CategoryList = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    setLoading(true);
    setError(null);

    // Simulate fetching categories (replace with real API later)
    const fetchCategories = () => {
      try {
        // Simulate success
        setTimeout(() => {
          setCategoryList(categories); // replace with API response
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError("Failed to load categories.");
        setLoading(false);
      }
    };

    fetchCategories();
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

  if (categoryList.length === 0) {
    return <div className={styles.status}>No categories found.</div>;
  }

  return (
    <section className={styles.listWrapper}>
      <div className={styles.container}>
        {categoryList.map((cat, index) => (
          <Category
            key={index}
            title={cat.title}
            image={cat.imageLink}
            name={cat.name}
          />
        ))}
      </div>
    </section>
  );
};

export default CategoryList;
