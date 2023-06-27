import React from "react";
import "./Banner.css";
import landingImage from "../assets/landingpage.jpg";

function Banner() {
  return (
    <div className="banner">
      <img src={landingImage} alt="Landing Page" className="banner__image" />
      <div className="banner__overlay">
        <h1 className="banner__text">Explore Our Products</h1>
      </div>
    </div>
  );
}

export default Banner;
