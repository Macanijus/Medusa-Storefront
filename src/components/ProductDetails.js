import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../CartContext";
import "./ProductDetails.css";
import "./ImageNavigation.css";
import { RiArrowLeftLine, RiArrowRightLine } from "react-icons/ri";

function ProductDetails() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
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
        quantity: 1, // Set the quantity to 1
        thumbnail,
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
      images,
      thumbnail,
      title,
      description,
      inventory_quantity,
    },
  } = product;

  const handleImageChange = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="product-details-container">
      <h2>Product Details</h2>
      <div className="product-details">
        <div className="product-image">
          <img src={images[currentImageIndex].url} alt={title} />
          {images.length > 1 && (
            <div className="image-navigation">
              {currentImageIndex > 0 && (
                <button
                  className="image-navigation-button"
                  onClick={() => handleImageChange(currentImageIndex - 1)}
                >
                  <RiArrowLeftLine />
                </button>
              )}
              {currentImageIndex < images.length - 1 && (
                <button
                  className="image-navigation-button"
                  onClick={() => handleImageChange(currentImageIndex + 1)}
                >
                  <RiArrowRightLine />
                </button>
              )}
            </div>
          )}
        </div>
        <div className="product-info">
          <h3 className="product-title">{title}</h3>
          <p className="product-price">
            {selectedVariant &&
            selectedVariant.prices &&
            selectedVariant.prices.length > 0 ? (
              <>Price: ${selectedVariant.prices[0].amount / 100} USD</>
            ) : (
              "Price not available"
            )}
          </p>
          <p className="product-description">{description}</p>
          <p className="product-quantity">Quantity: {inventory_quantity}</p>
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
          <button className="add-to-cart-button" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
