import React from "react";
import styles from "./Footer.module.css";
import visa from "../../assets/Icon/visa.svg";
import mastercard from "../../assets/Icon/mastercard.svg";
import paypal from "../../assets/Icon/paypal.svg";
import amex from "../../assets/Icon/amex.svg";
import discover from "../../assets/Icon/discover.svg";


const Footer = () => {
  console.log("Footer rendered");
  return (
    <footer className={styles.footer}>
      {/* Back To Top */}
      <button
        className={styles.backToTop}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
        Back to top
      </button>

      {/* Main Footer Links */}
      <div className="container py-4">
        <div className="row row-cols-2 row-cols-md-4 g-4">
          <div className="col">
            <h5 className={styles.title}>Get to Know Us</h5>
            <ul className={styles.links}>
              <li>
                <a href="#">About Us</a>
              </li>
              <li>
                <a href="#">Careers</a>
              </li>
              <li>
                <a href="#">Press Releases</a>
              </li>
              <li>
                <a href="#">Amazon Science</a>
              </li>
            </ul>
          </div>

          <div className="col">
            <h5 className={styles.title}>Connect With Us</h5>
            <ul className={styles.links}>
              <li>
                <a href="#">Facebook</a>
              </li>
              <li>
                <a href="#">Twitter</a>
              </li>
              <li>
                <a href="#">Instagram</a>
              </li>
            </ul>
          </div>

          <div className="col">
            <h5 className={styles.title}>Make Money With Us</h5>
            <ul className={styles.links}>
              <li>
                <a href="#">Sell on Amazon</a>
              </li>
              <li>
                <a href="#">Affiliate Program</a>
              </li>
              <li>
                <a href="#">Advertise</a>
              </li>
              <li>
                <a href="#">Self-Publish</a>
              </li>
            </ul>
          </div>

          <div className="col">
            <h5 className={styles.title}>Let Us Help You</h5>
            <ul className={styles.links}>
              <li>
                <a href="#">Your Account</a>
              </li>
              <li>
                <a href="#">Shipping Rates</a>
              </li>
              <li>
                <a href="#">Returns Centre</a>
              </li>
              <li>
                <a href="#">Help</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
<p>TEST FOOTER</p>


      {/* Payment Icons */}
      <div className={styles.payments}>
        <div className={styles.paymentContainer}>
          <img src={visa} alt="Visa" />
          <img src={mastercard} alt="Mastercard" />
          <img src={amex} alt="American Express" />
          <img src={paypal} alt="PayPal" />
          <img src={discover} alt="Discover" />
        </div>
      </div>

      {/* Bottom Bar */}
      <div className={styles.bottomBar}>
        <div className="container text-center py-3">
          <a href="#" className={styles.logo}>
            Amazon Clone
          </a>
          <p className="mt-2 mb-0">© 2025 Amazon Clone — Built for Practice</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
