import React, { useContext } from "react";
import { CartContext } from "../CartContext";
import "./Cart.css";

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
      <h2 className="cart-heading">Cart</h2>
      <ul className="cart-items">
        {cartItems.map((item) => (
          <li key={item.productId} className="cart-item">
            <div className="cart-item-image">
              <img src={item.thumbnail} alt={item.title} />
            </div>
            <div className="cart-item-details">
              <h3 className="cart-item-title">{item.title}</h3>
              {item.variants &&
              item.variants.prices &&
              item.variants.prices.length > 0 ? (
                <p className="cart-item-price">
                  Price: {item.variants.prices[0]?.amount / 100} USD
                </p>
              ) : (
                <p className="cart-item-price">Price not available</p>
              )}
              {item.variant && (
                <p className="cart-item-size">SIZE: {item.variant.title}</p>
              )}
              <button
                className="cart-item-remove"
                onClick={() => handleRemoveItem(item.productId)}
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;
