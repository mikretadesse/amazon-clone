import React from "react";
import { Routes, Route, redirect } from "react-router-dom";
import SharedLayout from "./Components/SharedLayout/SharedLayout";
import ProductDetail from "./Pages/ProdeuctDetails/ProductDetail";
import Delivery from "./Components/Delivery/Delivery";
import Auth from "./Pages/Auth/Auth";
import Carts from "./Pages/Carts/Carts";
import Payment from "./Pages/Payment/Payment";
import Orders from "./Pages/Orders/Orders";
import NotFound from "./Pages/NotFound/NotFound";
import Results from "./Pages/Results/Results";
import Home from "./Pages/Home/Home";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import "./App.css";

const stripePromise = loadStripe(
  "pk_test_51ShGCn5xrwKjDonT8xioSMXzEa9IshzHXYNCulBgtitSxJQXIOeBlTsIiPxIEwJYA0tHltuVQvY4D4N9AlPTwurN00rUjDCpUo"
);

function App() {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<Home />} />

        {/* Stripe-protected payment route */}
        <Route
          path="payments"
          element={
            <ProtectedRoute
              msg={"You must log in to pay"}
              redirect={"/payments"}>
              <Elements stripe={stripePromise}>
                <Payment />
              </Elements>
            </ProtectedRoute>
          }
        />

        <Route
          path="orders"
          element={
            <ProtectedRoute msg="You must log in to view orders">
              <Orders />
            </ProtectedRoute>
          }
        />
        <Route path="cart" element={<Carts />} />
        <Route path="delivery" element={<Delivery />} />
        <Route path="category/:categoryName" element={<Results />} />
        <Route path="product/:id" element={<ProductDetail />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      <Route path="auth" element={<Auth />} />
    </Routes>
  );
}

export default App;
