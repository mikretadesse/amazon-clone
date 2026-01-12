import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Payment.module.css";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import Rating from "@mui/material/Rating";
import { FadeLoader } from "react-spinners";
import currencyFormatter from "../../Components/CurrencyFormater/CurrencyFormater";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { axiosInstance } from "../../Api/axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

function Payment() {
  const { state, dispatch } = useContext(DataContext);
  const { basket, user } = state;
  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const totalAmount = basket.reduce(
    (amount, item) => amount + item.price * item.quantity,
    0
  );

  const handleChange = (e) => {
    setCardError(e?.error?.message || "");
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    if (!user) {
      navigate("/auth", {
        state: {
          msg: "You must log in to complete payment.",
          redirect: "/payments",
        },
      });
      return;
    }

    setProcessing(true);
    setCardError(null);

    try {
      // 1. Create PaymentIntent (Backend)
      const { data } = await axiosInstance.post(
        `/payments/create?total=${Math.round(totalAmount * 100)}`
      );

      const clientSecret = data.clientSecret;

      // 2. Confirm card payment (Stripe)
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            email: user.email,
          },
        },
      });

      if (result.error) {
        setCardError(result.error.message);
        setProcessing(false);
        return;
      }

      const paymentIntent = result.paymentIntent;

      // 3. Save order to Firestore (AFTER success)
      await setDoc(doc(db, "users", user.uid, "orders", paymentIntent.id), {
        basket,
        amount: paymentIntent.amount,
        created: paymentIntent.created,
      });

      // 4. Clear basket
      dispatch({ type: "EMPTY_BASKET" });

      // 5. UI feedback (Show success message)
      setPaymentSuccess(true);
      setProcessing(false);

      // 6. Navigate after short delay to allow user to see success
      setTimeout(() => navigate("/orders"), 2500);
    } catch (err) {
      console.error("Payment error:", err);
      setCardError("Payment failed. Please try again.");
      setProcessing(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Checkout ({basket.length} items)</h1>
      <section className={styles.payment}>
        {/* Delivery Address */}
        <div className={styles.section}>
          <h3>Delivery Address</h3>
          <div className={styles.content}>
            <p>{user?.email}</p>
            <p>123 React Lane</p>
            <p>Addis Ababa, Ethiopia</p>
          </div>
        </div>

        {/* Review Items */}
        <div className={styles.section}>
          <h3>Review items and delivery</h3>
          <div className={styles.content}>
            {basket.map((item, index) => (
              <div key={index} className={styles.product}>
                <img
                  src={item.image}
                  alt={item.title}
                  className={styles.productImage}
                />

                <div className={styles.productInfo}>
                  <p className={styles.productTitle}>{item.title}</p>

                  <div className={styles.ratingBox}>
                    <Rating
                      value={item.rating?.rate || 0}
                      precision={0.1}
                      readOnly
                    />
                    <span className={styles.reviewCount}>
                      ({item.rating?.count || 0})
                    </span>
                  </div>

                  <strong>{currencyFormatter(item.price)}</strong>

                  {item.quantity > 1 && (
                    <p className={styles.quantity}>Quantity: {item.quantity}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Method */}
        <div className={styles.section}>
          <h3>Payment Method</h3>
          <div className={styles.payment_card}>
            <div>
              {paymentSuccess ? (
                <div className={styles.successMessage}>
                  Payment Successful! Thank you for your order.
                </div>
              ) : (
                <form onSubmit={handlePayment} autoComplete="on">
                  {cardError && (
                    <small style={{ color: "red" }}>{cardError}</small>
                  )}

                  <CardElement onChange={handleChange} />

                  <div className={styles.total}>
                    <div className={styles.totalText}>
                      Order Total |{" "}
                      <strong>{currencyFormatter(totalAmount)}</strong>
                    </div>

                    <button
                      type="submit"
                      className={styles.payButton}
                      disabled={processing || !stripe}>
                      {processing ? (
                        <div className={styles.loaderWrapper}>
                          <FadeLoader color="#fff" />{" "}
                          <span className={styles.loaderText}>
                            Processing...
                          </span>
                        </div>
                      ) : (
                        "Pay Now"
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Payment;
