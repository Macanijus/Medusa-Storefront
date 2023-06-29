import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../CartContext";
import "./ProductDetails.css";

function ProductDetails() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const response = await fetch(
        `http://localhost:9000/store/products/${productId}`
      );
      const data = await response.json();
      console.log("Fetched product data:", data);
      setProduct(data);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  const handleSizeChange = (event) => {
    const selectedSize = event.target.value;
    setSelectedSize(selectedSize);
  };

  const handleColorChange = (event) => {
    const selectedColor = event.target.value;
    setSelectedColor(selectedColor);
  };

  const handleQuantityChange = (event) => {
    const quantity = parseInt(event.target.value);
    setQuantity(quantity);
  };

  const handleAddToCart = () => {
    if (product) {
      const {
        productId,
        product: { title, selectedVariant, thumbnail },
      } = product;
      const cartItem = {
        productId,
        title,
        variant: selectedVariant,
        size: selectedSize,
        color: selectedColor,
        quantity,
        thumbnail, // Include the thumbnail in the cart item
      };
      addToCart(cartItem);
    }
  };

  if (!product || !product.product) {
    return <div>Loading...</div>;
  }

  const {
    product: {
      selectedVariant,
      variants,
      colors,
      thumbnail,
      title,
      description,
    },
  } = product;

  return (
    <div className="product-details-container">
      <h2>Product Details</h2>
      <div className="product-details">
        <div className="product-image">
          <img src={thumbnail} alt={title} />
        </div>
        <div className="product-info">
          <h3 className="product-title">{title}</h3>
          <p className="product-price">
            {selectedVariant
              ? `$${selectedVariant.prices[0].amount / 100} USD`
              : ""}
          </p>
          <p className="product-description">{description}</p>
          <div className="dropdowns">
            <div className="dropdown">
              <label htmlFor="size">Size:</label>
              <select
                id="size"
                name="size"
                value={selectedSize}
                onChange={handleSizeChange}
              >
                <option value="">Select size</option>
                {variants &&
                  variants.map((variant) => (
                    <option key={variant.title} value={variant.title}>
                      {variant.title}
                    </option>
                  ))}
              </select>
            </div>
            <div className="dropdown">
              <label htmlFor="color">Color:</label>
              <select
                id="color"
                name="color"
                value={selectedColor}
                onChange={handleColorChange}
              >
                <option value="">Select color</option>
                {colors &&
                  colors.map((color) => (
                    <option key={color} value={color}>
                      {color}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <div className="quantity-input">
            <label htmlFor="quantity">Quantity:</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={quantity}
              min="1"
              onChange={handleQuantityChange}
            />
          </div>
          <button className="add-to-cart-button" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
