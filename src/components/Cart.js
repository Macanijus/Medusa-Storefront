import React, { useContext } from "react";
import { CartContext } from "../CartContext";
import "./Cart.css"; // Import the CSS file

const Cart = () => {
  const { cartItems, removeFromCart } = useContext(CartContext);

  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId);
  };

  const handleRemoveItem = (productId) => {
    const confirmed = window.confirm(
      "Are you sure to remove this product from your cart?"
    );
    if (confirmed) {
      handleRemoveFromCart(productId);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-container">
        <h2 className="cart-heading">Cart</h2>
        <p className="empty-cart-message">Your Cart is empty</p>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2 className="cart-heading">Košarica</h2>
      <ul className="cart-items">
        {cartItems.map((item) => (
          <li key={item.productId} className="cart-item">
            <div className="cart-item-image">
              <img src={item.thumbnail} alt={item.title} />
            </div>
            <div className="cart-item-details">
              <h3 className="cart-item-title">{item.title}</h3>
              {item.variant && item.variant.prices && (
                <p className="cart-item-price">
                  Cijena: {item.variant.prices[0].amount / 100} HRK
                </p>
              )}
              {item.variant && (
                <p className="cart-item-size">Veličina: {item.variant.title}</p>
              )}
              <button
                className="cart-item-remove"
                onClick={() => handleRemoveItem(item.productId)}
              >
                Ukloni
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;
