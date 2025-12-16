import React, { useContext } from "react";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import { type } from "../Utility/Action.type";
import Rating from "@mui/material/Rating";
import styles from "./Carts.module.css";

function Carts() {
  const { state, dispatch } = useContext(DataContext);
  const { basket = [] } = state;

  const removeFromCart = (index) => {
    dispatch({ type: type.REMOVE_FROM_CART, payload: index });
  };

  const updateQuantity = (index, qty) => {
    dispatch({
      type: type.UPDATE_QUANTITY,
      payload: { index, quantity: Number(qty) },
    });
  };

  const subtotal = basket.reduce(
    (sum, item) => sum + (item?.price || 0) * (item.quantity || 1),
    0
  );

  return (
    <div className={styles.CartPage}>
      <h2>Your Shopping Cart</h2>
      <hr />

      {basket.length === 0 ? (
        <p>Oops! No items in your cart.</p>
      ) : (
        <div className={styles.CartContainer}>
          {/* Left side: Items */}
          <div className={styles.CartItems}>
            {basket.map((item, index) => (
              <div key={item.id || index} className={styles.CartItem}>
                <img
                  src={item.image}
                  alt={item.title}
                  className={styles.CartItem_image}
                />

                <div className={styles.CartItem_info}>
                  <h3>{item.title}</h3>
                  {item.description && (
                    <p className={styles.CartItem_description}>
                      {item.description}
                    </p>
                  )}

                  {item.rating && (
                    <div className={styles.CartItem_rating}>
                      <Rating
                        value={item.rating.rate || 0}
                        precision={0.1}
                        readOnly
                        size="small"
                      />
                      <span>({item.rating.count || 0})</span>
                    </div>
                  )}

                  <p className={styles.CartItem_price}>
                    ${item.price?.toFixed(2)}
                  </p>

                  <label>
                    Qty:{" "}
                    <input
                      type="number"
                      min="1"
                      value={item.quantity || 1}
                      onChange={(e) => updateQuantity(index, e.target.value)}
                      className={styles.QuantityInput}
                    />
                  </label>

                  <button
                    className={styles.RemoveButton}
                    onClick={() => removeFromCart(index)}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Right side: Summary */}
          <div className={styles.CartSummary}>
            <p>
              Subtotal (
              {basket.reduce((sum, item) => sum + (item.quantity || 1), 0)}{" "}
              items): <strong>${subtotal.toFixed(2)}</strong>
            </p>
            <button className={styles.CheckoutButton}>
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Carts;
