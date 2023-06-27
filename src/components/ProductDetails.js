import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ProductDetails.css";

function ProductDetails() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");

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

  const handleSizeChange = (event) => {
    const selectedSize = event.target.value;
    setSelectedSize(selectedSize);

    // Find the variant that matches the selected size
    const selectedVariant = product.product.variants.find(
      (variant) => variant.title === selectedSize
    );

    // Update the product with the selected variant
    const updatedProduct = { ...product };
    updatedProduct.product.selectedVariant = selectedVariant;
    setProduct(updatedProduct);
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  const selectedVariant = product.product.selectedVariant;

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
            {selectedVariant
              ? `$${selectedVariant.prices[0].amount / 100} USD`
              : ""}
          </p>
          <p className="product-description">{product.product.description}</p>
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
                {product.product.variants.map((variant) => (
                  <option key={variant.id} value={variant.title}>
                    {variant.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="dropdown">
              <label htmlFor="color">Color:</label>
              <select id="color" name="color">
                <option value="red">Red</option>
                <option value="blue">Blue</option>
                <option value="green">Green</option>
                <option value="yellow">Yellow</option>
              </select>
            </div>
          </div>
          <div className="quantity">
            <p>
              Quantity:
              {product.product.variants
                .map((variant) => variant.inventory_quantity)
                .filter((value, index, self) => self.indexOf(value) === index)
                .map((quantity, index) => (
                  <span key={index}>{quantity} </span>
                ))}
            </p>
          </div>
          <button className="add-to-cart-button">Add to Cart</button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
