import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer.jsx";
import LowerHeader from "../LowerHeader/LowerHeader.jsx";
import ScrollToTop from "../ScrollToTop/ScrollToTop";
import { Outlet } from "react-router-dom";

function SharedLayout() {
  return (
    <>
      <Header />
      <LowerHeader />
      <ScrollToTop />
      <Outlet />
      <Footer />
    </>
  );
}

export default SharedLayout;
