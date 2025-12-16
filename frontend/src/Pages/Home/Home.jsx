import React from "react";
import Carousel from "../../Components/Carousel/Carousel";
import CategoryList from "../../Components/Category/CategoryList";
import Product from "../../Components/Product/Product";

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
