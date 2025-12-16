import React from "react";
import Header from "../Header/Header";
import LowerHeader from "../LowerHeader/LowerHeader";
import ScrollToTop from "../ScrollToTop/ScrollToTop";
import Footer from "../Footer/Footer";
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
