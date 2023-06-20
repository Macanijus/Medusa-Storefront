import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./ProductGrid.css";

function ProductGrid() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:9000/store/products");
      const data = await response.json();
      setProducts(data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <div className="product-grid-container">
      <h2 className="product-grid-title">Product Grid</h2>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card text-center">
            <Link to={`/products/${product.id}`}>
              <img
                src={product.thumbnail}
                alt={product.title}
                className="product-image"
              />
              <h3 className="product-title">{product.title}</h3>
            </Link>
            <p className="product-price">
              ${product.variants[0].prices[0].amount / 100} USD
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductGrid;
