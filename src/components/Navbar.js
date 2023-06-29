import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBasketShopping } from "@fortawesome/free-solid-svg-icons";
import { CartContext } from "../CartContext";
import "./Navbar.css";
import logo from "../assets/medusa.jpg";

const Navbar = () => {
  const location = useLocation();
  const { cartItems } = useContext(CartContext);
  const [isMenuOpen, setMenuOpen] = useState(false);

  const showHomeButton = location.pathname !== "/";

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`navbar ${isMenuOpen ? "navbar--open" : ""}`}>
      <div className="navbar__left">
        <img src={logo} alt="Logo" className="navbar__logo" />
        <Link to="/" className="navbar__name">
          Medusa-Store
        </Link>
      </div>
      <div
        className={`navbar__right ${isMenuOpen ? "navbar__right--open" : ""}`}
      >
        <ul className="navbar__list">
          {showHomeButton && (
            <li className="navbar__item">
              <Link to="/" className="navbar__link">
                Home
              </Link>
            </li>
          )}

          <li className="navbar__item">
            <Link to="/about" className="navbar__link">
              About Us
            </Link>
          </li>
          <li className="navbar__item">
            <Link to="/contact" className="navbar__link">
              Contact Us
            </Link>
          </li>
          <li className="navbar__item">
            <Link to="/cart" className="navbar__link">
              <FontAwesomeIcon
                icon={faBasketShopping}
                className="navbar__icon"
              />
              {cartItems.length > 0 && (
                <span className="navbar__item-count">{cartItems.length}</span>
              )}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
