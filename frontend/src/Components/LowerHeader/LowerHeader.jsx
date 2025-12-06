import React from "react";
import styles from "./LowerHeader.module.css";

function LowerHeader() {
  return (
    <div className={styles.lowerHeader}>
      <div className="container d-flex flex-wrap align-items-center justify-content-start gap-3">
        <a href="#" className={styles.link}>
          Home
        </a>
        <a href="#" className={styles.link}>
          TV Shows
        </a>
        <a href="#" className={styles.link}>
          Movies
        </a>
        <a href="#" className={styles.link}>
          New & Popular
        </a>
        <a href="#" className={styles.link}>
          My List
        </a>
        <a href="#" className={styles.link}>
          Browse by Language
        </a>
      </div>
    </div>
  );
}
export default LowerHeader;
