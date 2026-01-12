import { useContext } from "react";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";

import { DataContext } from "../../Components/DataProvider/DataProvider";
import { type } from "../Utility/Action.type";
import styles from "./Carts.module.css";

const Cart = () => {
  const { state, dispatch } = useContext(DataContext);
  const { basket = [] } = state;

  // Remove an item from the cart by its index
  const removeFromCart = (index) => {
    dispatch({ type: type.REMOVE_FROM_CART, payload: index });
  };

  // Update the quantity of a specific item in the cart
  const updateQuantity = (index, qty) => {
    if (qty < 1) return;
    dispatch({
      type: type.UPDATE_QUANTITY,
      payload: { index, quantity: Number(qty) },
    });
  };

  // Calculate total cost of all items in the cart
  const subtotal = basket.reduce(
    (sum, item) => sum + (item?.price || 0) * (item.quantity || 1),
    0
  );

  // Calculate total number of items in the cart
  const totalItems = basket.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0
  );

  return (
    <div className={styles.Cart}>
      {/* LEFT SECTION */}
      <div className={styles.CartLeft}>
        <h2 className={styles.Title}>Your shopping basket</h2>
        <hr />

        {basket.length === 0 ? (
          <p className={styles.Empty}>Oops! No items in your cart.</p>
        ) : (
          basket.map((item, index) => (
            <div key={index} className={styles.CartItem}>
              <img
                src={item.image}
                alt={item.title}
                className={styles.ProductImage}
              />

              <div className={styles.ProductInfo}>
                <h3 className={styles.ProductTitle}>{item.title}</h3>
                {item.description && (
                  <p className={styles.ProductDescription}>
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

                <p className={styles.Price}>${item.price?.toFixed(2)}</p>

                <button
                  className={styles.RemoveButton}
                  onClick={() => removeFromCart(index)}>
                  Remove
                </button>
              </div>

              <div className={styles.QuantityControls}>
                <button
                  aria-label="Increase quantity"
                  onClick={() =>
                    updateQuantity(index, (item.quantity || 1) + 1)
                  }>
                  ▲
                </button>

                <span>{item.quantity || 1}</span>

                <button
                  aria-label="Decrease quantity"
                  onClick={() =>
                    updateQuantity(index, (item.quantity || 1) - 1)
                  }
                  disabled={(item.quantity || 1) <= 1}>
                  ▼
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* RIGHT SECTION */}
      <div className={styles.CartRight}>
        <div className={styles.SummaryBox}>
          <p className={styles.Subtotal}>
            Subtotal ({totalItems} {totalItems === 1 ? "item" : "items"}):{" "}
            <strong>${subtotal.toFixed(2)}</strong>
          </p>

          <div className={styles.GiftOption}>
            <input type="checkbox" id="gift" />
            <label htmlFor="gift">This order contains a gift</label>
          </div>

          <Link
            to={basket.length === 0 ? "#" : "/payments"}
            className={`${styles.CheckoutButton} ${
              basket.length === 0 ? styles.Disabled : ""
            }`}
            onClick={(e) => basket.length === 0 && e.preventDefault()}>
            Continue to checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
