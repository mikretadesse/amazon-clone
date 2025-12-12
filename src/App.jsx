import react from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SharedLayout from "./Components/SharedLayout/SharedLayout";
import Landing from "./Pages/Landing/Landing";
import Signup from "./Pages/Auth/Signup";
import Carts from "./Pages/Carts/Carts";
import Payment from "./Pages/Payment/Payment";
import Orders from "./Pages/Orders/Orders";
import NotFound from "./Pages/NotFound/NotFound";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<Landing />} />
        <Route path="auth" element={<Signup />} />
        <Route path="payments" element={<Payment />} />
        <Route path="order" element={<Orders />} />
        <Route path="cart" element={<Carts />} />
        <Route path="*" element={<NotFound />} /> {/* 404 page */}
      </Route>
    </Routes>
  );
}

export default App;
