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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedVariantId, setSelectedVariantId] = useState("");
  const [error, setError] = useState("");
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetchProduct();
  }, []);

  // Fetching single product!
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

  // Fetching size of a product and displaying it in a dropdown
  const handleSizeChange = (event) => {
    const selectedSize = event.target.value;
    setSelectedSize(selectedSize);
    const selectedVariant = product?.variants?.find(
      (variant) => variant.title === selectedSize
    );
    if (selectedVariant) {
      setSelectedVariantId(selectedVariant.id);
    }
  };

  // Function for adding products to the cart
  const handleAddToCart = () => {
    if (selectedSize === "") {
      setError("Please select a size");
    } else {
      setError("");
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
          quantity: 1,
          thumbnail,
        };
        addToCart(cartItem);
      }
    }
  };

  if (!product || !product.product) {
    return <div>Loading...</div>;
  }

  // Destructuring objects
  const {
    product: { variants, images, title, description, material },
  } = product;

  const selectedVariant = variants.find(
    (variant) => variant.id === selectedVariantId
  );

  const inventoryQuantity = selectedVariant
    ? selectedVariant.inventory_quantity
    : "N/A";
  console.log(inventoryQuantity);

  const handleImageChange = (index) => {
    setCurrentImageIndex(index);
  };

  console.log(product.product.variants[0].inventory_quantity);

  return (
    <div className="product-details-container">
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
          <p className="product-price">${variants[0].prices[0].amount / 100}</p>

          <p className="product-description">{description}</p>

          <p className="product-quantity">Quantity:</p>
          <span>{product.product.variants[0].inventory_quantity}</span>
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
                    <option key={variant.id} value={variant.title}>
                      {variant.title}
                    </option>
                  ))}
              </select>
            </div>
            <div className="dropdown">
              <label htmlFor="material">Material:</label>
              <p>{material}</p>
            </div>
          </div>

          {error && <p className="error-message">{error}</p>}

          <button className="add-to-cart-button" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
