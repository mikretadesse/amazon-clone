import React, { useState, useEffect } from "react";
import styles from "./Carousel.module.css";
import { img } from "./data"; // Imported images array

function Carousel() {
  const [current, setCurrent] = useState(0);
  const length = img.length;

// Auto-play: change slide every 3 seconds 
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % length);
    }, 3000);
    return () => clearInterval(interval);
  }, [length]);

  // ===== Previous Slide =====
  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  // ===== Next Slide =====
  const nextSlide = () => {
    setCurrent((current + 1) % length);
  };

  return (
    <div className={styles.carousel}>
      {/* ===== Slides ===== */}
      {img.map((image, index) => (
        <div
          key={index}
          className={`${styles.slide} ${
            index === current ? styles.active : ""
          }`}>
          {index === current && <img src={image} alt={`slide-${index}`} />}
        </div>
      ))}

      {/* ===== Arrows ===== */}
      <button className={styles.prev} onClick={prevSlide}>
        &#10094;
      </button>
      <button className={styles.next} onClick={nextSlide}>
        &#10095;
      </button>
    </div>
  );
}

export default Carousel;
