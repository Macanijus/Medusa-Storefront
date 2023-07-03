import React, { useContext } from "react";
import { CartContext } from "../CartContext";
import "./Cart.css";

const Cart = () => {
  const { cartItems, removeFromCart, clearCart } = useContext(CartContext);

  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId);
  };

  const handleProceedToCheckout = () => {
    alert("This feature is coming soon!");
  };

  const handleClearCart = () => {
    const confirmed = window.confirm("Are you sure to clear your cart?");
    if (confirmed) {
      clearCart();
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
              {item.variant && (
                <p className="cart-item-size">SIZE: {item.variant.title}</p>
              )}
              <p>Size: {item.size}</p>
            </div>
          </li>
        ))}
      </ul>
      <button className="cart-item-remove" onClick={handleClearCart}>
        Clear Cart
      </button>
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
