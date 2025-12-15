import react from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SharedLayout from "./Components/SharedLayout/SharedLayout";
import ProductDetail from "./Pages/ProdeuctDetails/ProductDetail";
import Delivery from "./Components/Delivery/Delivery";
import Signup from "./Pages/Auth/Signup";
import Carts from "./Pages/Carts/Carts";
import Payment from "./Pages/Payment/Payment";
import Orders from "./Pages/Orders/Orders";
import NotFound from "./Pages/NotFound/NotFound";
import Results from "./Pages/Results/Results";
import Home from "./Pages/Home/Home";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<Home />} />
        <Route path="payments" element={<Payment />} />
        <Route path="auth" element={<Signup />} />
        <Route path="order" element={<Orders />} />
        <Route path="cart" element={<Carts />} />
        <Route path="/delivery" element={<Delivery />} />
        <Route path="/category/:categoryName" element={<Results />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="*" element={<NotFound />} /> {/* 404 page */}
      </Route>
    </Routes>
  );
}

export default App;
