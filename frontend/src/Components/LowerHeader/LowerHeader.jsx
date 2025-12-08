import React from "react";
import styles from "./LowerHeader.module.css";
import { MdMenu } from "react-icons/md";

function LowerHeader() {
  return (
    <header>
      <nav className={styles.header}>
        <ul className={styles.header__list}>
          <li className={styles.header__item}>
            <MdMenu className={styles.menuIcon} /> All
          </li>
          <li className={styles.header__item}>Today's Deals</li>
          <li className={styles.header__item}>Prime Video</li>
          <li className={styles.header__item}>Registry</li>
          <li className={styles.header__item}>Gift Cards</li>
          <li className={styles.header__item}>Customer Service</li>
          <li className={styles.header__item}>Sell</li>
        </ul>
      </nav>
    </header>
  );
}

export default LowerHeader;
