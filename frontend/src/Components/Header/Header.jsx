import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import Delivery from "../Delivery/Delivery";
import { DataContext } from "../DataProvider/DataProvider";

import { GrLocation } from "react-icons/gr";
import { FiSearch } from "react-icons/fi";
import { BiCart } from "react-icons/bi";
import { FaCaretDown } from "react-icons/fa";

import flag from "../../assets/logo/Flag_of_usa.svg.png";
import amazonLogo from "../../assets/logo/amazon-logo.png";

function Header() {
  // Local state to track the selected country for the delivery modal
  const [country, setCountry] = useState("Ethiopia");

  // Local state to control whether the Delivery modal is open or closed
  const [modalOpen, setModalOpen] = useState(false);

  // Access global state from DataContext
  // - `basket` contains the current cart items
  // - `dispatch` is used to send actions (e.g., add/remove cart items, set delivery location)
  const { state: { basket = [] } = {}, dispatch } = useContext(DataContext);

  // Calculate total number of items in the cart
  const totalItemsInCart = basket.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0
  );

  return (
    <header className={styles.Header}>
      {/* LEFT SECTION */}
      <div className={styles.Header__left}>
        {/* Logo */}
        <Link to="/" className={styles.Header__logoWrapper}>
          <img
            src={amazonLogo}
            alt="Amazon Logo"
            className={styles.Header__logo}
          />
        </Link>

        {/* Deliver Section */}
        <div className={styles.Deliver} onClick={() => setModalOpen(true)}>
          <GrLocation className={styles.Deliver__icon} />
          <div>
            <p className={styles.Deliver__small}>Deliver to</p>
            <span className={styles.Deliver__country}>{country}</span>
          </div>
        </div>
      </div>

      {modalOpen && (
        <Delivery
          country={country}
          setCountry={setCountry}
          onClose={() => setModalOpen(false)}
        />
      )}

      {/* SEARCH BAR */}
      <div className={styles.Search}>
        <select className={styles.Search__select}>
          <option>All</option>
          <option>TVs</option>
          <option>Books</option>
          <option>Fashion</option>
        </select>

        <input
          type="text"
          placeholder="Search Amazon"
          className={styles.Search__input}
        />

        <button className={styles.Search__button}>
          <FiSearch size={22} />
        </button>
      </div>

      {/* RIGHT SECTION */}
      <div className={styles.Header__right}>
        {/* Language Dropdown */}
        <div className={styles.Language}>
          <div className={styles.Language__trigger}>
            <img src={flag} alt="flag" className={styles.Language__flag} />
            <span className={styles.Language__code}>EN</span>

            {/* React Icon Arrow */}
            <FaCaretDown className={styles.Language__arrow} />
          </div>

          <div className={styles.Language__menu}>
            <label>
              <input type="radio" name="lang" /> English - EN
            </label>
            <label>
              <input type="radio" name="lang" /> Español - ES
            </label>
            <label>
              <input type="radio" name="lang" /> Deutsch - DE
            </label>
            <label>
              <input type="radio" name="lang" /> العربية - AR
            </label>
            <label>
              <input type="radio" name="lang" /> Français - FR
            </label>
          </div>
        </div>

        {/* Account */}
        <Link to="/auth" className={styles.NavItem}>
          <span className={styles.NavItem__small}>Hello, sign in</span>
          <span className={styles.NavItem__big}>Account & Lists</span>
        </Link>

        {/* Orders */}
        <Link to="/order" className={styles.NavItem}>
          <span className={styles.NavItem__small}>Returns</span>
          <span className={styles.NavItem__big}>& Orders</span>
        </Link>

        {/* Cart */}
        <Link to="/cart" className={styles.Cart}>
          <BiCart className={styles.Cart__icon} />
          <span className={styles.Cart__title}>Cart</span>
          <span className={styles.Cart__count}>{totalItemsInCart} </span>
        </Link>
      </div>
    </header>
  );
}

export default Header;
