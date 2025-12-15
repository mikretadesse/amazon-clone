import React, { useState } from "react";
import styles from "./Delivery.module.css";

const countries = ["Ethiopia", "USA", "India", "Germany", "Canada"];

const Delivery = ({ country, setCountry, onClose }) => {
  const [zip, setZip] = useState("");

  const handleApply = () => {
    onClose();
    navigate("/");
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        {/* Header */}
        <div className={styles.modalHeader}>
          <h2>Choose your location</h2>
          <button className={styles.close} onClick={onClose}>
            &times;
          </button>
        </div>

        <p className={styles.subtitle}>
          Delivery options and delivery speeds may vary for different locations
        </p>

        <button className={styles.signin}>Sign in to see your addresses</button>

        <div className={styles.zipSection}>
          <hr className={styles.separator} />
          <p className={styles.orText}>or enter a US zip code</p>
          <div className={styles.zipInput}>
            <input
              type="text"
              placeholder="ZIP code"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
            />
            <button onClick={handleApply}>Apply</button>
          </div>
          <hr className={styles.separator} />
          <p className={styles.orText}>or ship outside the US</p>
        </div>

        <select
          className={styles.countrySelect}
          value={country}
          onChange={(e) => setCountry(e.target.value)}>
          {countries.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <button className={styles.done} onClick={handleApply}>
          Done
        </button>
      </div>
    </div>
  );
};

export default Delivery;
