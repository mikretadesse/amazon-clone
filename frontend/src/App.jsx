import react from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import Header from "./Components/Header/Header";
import Carousel from"./Components/Carousel/Carousel.jsx"
import Footer from "./Components/Footer/Footer";
import LowerHeader from "./Components/LowerHeader/LowerHeader.jsx";

function App() {
  return (
    <>
      <Header />
      <LowerHeader />
      <Carousel />
      <Footer />
    </>
  );
}

export default App;
