import React, { useEffect, useState, useContext } from "react";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import styles from "./Orders.module.css";
import Rating from "@mui/material/Rating";
import currencyFormatter from "../../Components/CurrencyFormater/CurrencyFormater";
import { FadeLoader } from "react-spinners";

function Orders() {
  const { state } = useContext(DataContext);
  const { user } = state;
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/auth", {
        state: { msg: "You must log in to view orders.", redirect: "/orders" },
      });
      return;
    }

    const fetchOrders = async () => {
      try {
        const ordersRef = collection(db, "users", user.uid, "orders");
        const q = query(ordersRef, orderBy("created", "desc"));
        const querySnapshot = await getDocs(q);

        const fetchedOrders = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setOrders(fetchedOrders);
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, navigate]);

  if (loading)
    return (
      <div className={styles.loaderWrapper}>
        <FadeLoader color="#25b09b" />
        <p>Loading your orders...</p>
      </div>
    );

  if (!orders.length)
    return <p className={styles.empty}>You have no past orders.</p>;

  return (
    <section className={styles.container}>
      <div className={styles.orders_container}>
        <h1>Your Orders</h1>
        {orders.map((order) => (
          <div key={order.id} className={styles.order}>
            <h3>Order ID: {order.id}</h3>
            <p>
              Order Total:{" "}
              <strong>{currencyFormatter(order.amount / 100)}</strong>
            </p>
            <p>Placed on: {new Date(order.created * 1000).toLocaleString()}</p>
            <div className={styles.items}>
              {order.basket.map((item, i) => (
                <div key={i} className={styles.product}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className={styles.productImage}
                  />
                  <div className={styles.productInfo}>
                    <p className={styles.productTitle}>{item.title}</p>
                    {item.rating && (
                      <div className={styles.ratingBox}>
                        <Rating
                          value={item.rating?.rate || 0}
                          precision={0.1}
                          readOnly
                        />
                        <span>({item.rating?.count || 0})</span>
                      </div>
                    )}
                    <p>
                      {currencyFormatter(item.price)} x {item.quantity || 1}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Orders;
