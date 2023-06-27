import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductGrid from "./components/ProductGrid";
import ProductDetails from "./components/ProductDetails";
import Navbar from "./components/Navbar";
import Banner from "./components/Banner";
import ContactUs from "./components/ContactUs";
import "./tailwind.css";
import { useLocation } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <MainContent />
      </div>
    </Router>
  );
}

function MainContent() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isContactPage = location.pathname === "/contact";

  return (
    <>
      {isHome && <Banner />}
      <Routes>
        <Route path="/" element={<ProductGrid />} />
        <Route path="/products/:productId" element={<ProductDetails />} />
        <Route path="/contact" element={<ContactUs />} />
      </Routes>
    </>
  );
}

export default App;
