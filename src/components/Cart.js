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

  const handleProceedToCheckout = () => {
    alert("This feature is coming soon!");
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
              {item.variant && (
                <p className="cart-item-size">SIZE: {item.variant.title}</p>
              )}
              <p>Size: {item.size}</p>
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
      <button
        className="proceed-to-checkout-button"
        onClick={handleProceedToCheckout}
      >
        Proceed to Checkout
      </button>
    </div>
  );
};

export default Cart;
