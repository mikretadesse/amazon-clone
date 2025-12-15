import React from "react";
import Carousel from "../../Components/Carousel/Carousel.jsx";
import CategoryList from "../../Components/Category/CategoryList.jsx";
import Product from "../../Components/Product/Product.jsx";

function Home() {
  return (
    <>
      <Carousel />
      <CategoryList />
      <Product />
    </>
  );
}

export default Home;
