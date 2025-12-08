import React, { useState } from "react";
import styles from "./Header.module.css";

function Header() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.topBar}>
        <button
          className={styles.hamburger}
          aria-label="Open menu"
          onClick={() => setMobileOpen(!mobileOpen)}>
          <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden>
            <path
              d="M3 6h18M3 12h18M3 18h18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <a href="/" className={styles.logo} aria-label="Home">
          <span className={styles.logoBox}>amaz</span>
          <span className={styles.logoPrime}>on</span>
        </a>

        <form
          className={styles.search}
          role="search"
          onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="searchInput" className="visually-hidden">
            Search
          </label>

          <select
            aria-label="Select category"
            className={styles.category}
            value={category}
            onChange={(e) => setCategory(e.target.value)}>
            <option>All</option>
            <option>Books</option>
            <option>Electronics</option>
            <option>Fashion</option>
            <option>Home</option>
          </select>

          <input
            id="searchInput"
            className={styles.searchInput}
            placeholder="Search Amazon clone"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <button className={styles.searchBtn} aria-label="Search">
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden>
              <path
                d="M21 21l-4.35-4.35"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle
                cx="11"
                cy="11"
                r="6"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
              />
            </svg>
          </button>
        </form>

        <nav className={styles.nav} aria-label="Primary">
          <a className={styles.navItem} href="#">
            <small>Hello, Sign in</small>
            <strong>Account & Lists</strong>
          </a>

          <a className={styles.navItem} href="#">
            <small>Returns</small>
            <strong>& Orders</strong>
          </a>

          <a className={styles.cart} href="#" aria-label="Cart">
            <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden>
              <path
                d="M6 6h15l-1.5 9h-11L6 6z"
                stroke="currentColor"
                strokeWidth="1.2"
                fill="none"
              />
              <circle cx="10" cy="20" r="1" />
              <circle cx="18" cy="20" r="1" />
            </svg>
            <span className={styles.cartCount}>{''}</span>
            <span className={styles.cartText}>Cart</span>
          </a>
        </nav>
      </div>

      <div
        className={`${styles.mobileMenu} ${mobileOpen ? styles.open : ""}`}
        aria-hidden={!mobileOpen}>
        <a href="#">Deals</a>
        <a href="#">Customer Service</a>
        <a href="#">Gift Cards</a>
        <a href="#">Sell</a>
      </div>
    </header>
  );
}

export default Header;
