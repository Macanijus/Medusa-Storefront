import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setMenuOpen] = useState(false);

  const showHomeButton = location.pathname !== "/";

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`navbar ${isMenuOpen ? "navbar--open" : ""}`}>
      <div className="navbar__left">
        <Link to="/" className="navbar__name">
          Medusa-Store
        </Link>
      </div>
      <div
        className={`navbar__right ${isMenuOpen ? "navbar__right--open" : ""}`}
      >
        <div className="navbar__toggle" onClick={toggleMenu}>
          <div className="navbar__dot"></div>
          <div className="navbar__dot"></div>
          <div className="navbar__dot"></div>
        </div>
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
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
