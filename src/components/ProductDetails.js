import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ProductDetails.css";

function ProductDetails() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

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

  console.log("Product ID:", productId);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-details-container">
      <h2>Product Details</h2>
      <div className="product-details">
        <div className="product-image">
          <img src={product.product.thumbnail} alt={product.product.title} />
        </div>
        <div className="product-info">
          <h3 className="product-title">{product.product.title}</h3>
          <p className="product-price">
            ${product.product.variants[0].prices[0].amount / 100} USD
          </p>
          <p className="product-description">{product.product.description}</p>
          <div className="dropdowns">
            <div className="dropdown">
              <label htmlFor="size">Size:</label>
              <select id="size" name="size">
                {/* Add options for size */}
              </select>
            </div>
            <div className="dropdown">
              <label htmlFor="color">Color:</label>
              <select id="color" name="color">
                {/* Add options for color */}
              </select>
            </div>
            <div className="dropdown">
              <label htmlFor="quantity">Quantity:</label>
              <select id="quantity" name="quantity">
                {/* Add options for quantity */}
              </select>
            </div>
          </div>
          <button className="add-to-cart-button">Add to Cart</button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
