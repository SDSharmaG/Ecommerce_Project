import React from "react";
import star from "../assets/images/star.png";
import "../assets/css/product.css";
import { useNavigate } from "react-router-dom";

const Product = ({ info }) => {
  const { id, title, image, price, rating } = info;
  const navigate = useNavigate();

  // Navigate to product details
  const getProduct = () => {
    navigate(`/product/${id}`);
  };

  // Render rating stars
  const renderStars = (rate) => {
    const stars = [];
    const roundedRate = Math.round(rate);
    for (let i = 0; i < 5; i++) {
      stars.push(
        <img
          key={i}
          src={star}
          alt="star"
          className={i < roundedRate ? "star-filled" : "star"}
        />
      );
    }
    return stars;
  };

  // Truncate product title
  const truncateTitle = (text, limit = 50) =>
    text.length > limit ? text.substring(0, limit) + "..." : text;

  // Dynamic Discount Logic (10%–40%)
  const discountPercent = Math.floor(Math.random() * 30) + 10;
  const originalPrice = (price / (1 - discountPercent / 100)).toFixed(2);

  // Delivery Date Logic (2–4 days)
  const deliveryDays = Math.floor(Math.random() * 3) + 2;
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + deliveryDays);
  const deliveryText = deliveryDate.toLocaleDateString("en-IN", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  // Stock availability
  const stockLeft = Math.floor(Math.random() * 15) + 1;

  return (
    <div
      className="border bg-light rounded p-3 h-100 product-card"
      onClick={getProduct}
    >
      {/* Deal Badge */}
      {discountPercent >= 25 && (
        <span className="badge w-50 bg-danger mb-2">Limited Time Deal</span>
      )}

      <h4 className="product-title">{truncateTitle(title)}</h4>

      <img src={image} alt={title} className="product-img" />

      {/* Price Section */}
      <div className="price-section mt-2">
        <span className="old-price">M.R.P: $ {originalPrice}</span>
        <span className="new-price ms-2">$ {price}</span>
        <span className="discount ms-2">
          ({discountPercent}% OFF)
        </span>
      </div>

      {/* Rating */}
      <div className="d-flex align-items-center mt-2">
        {renderStars(rating.rate)}
        <span className="ms-2">{rating.rate.toFixed(1)}</span>
        <span className="ms-2">({rating.count})</span>
      </div>

      {/* Delivery Info */}
      <p className="delivery mt-2">
        FREE Delivery by <strong>{deliveryText}</strong>
      </p>

      {/* Stock Alert */}
      {stockLeft <= 5 && (
        <p className="stock-warning">
          Only {stockLeft} left in stock
        </p>
      )}

      {/* Buy Button */}
      <button
        className="btn buy-btn w-100"
        onClick={(e) => {
          e.stopPropagation(); // prevent card click
          alert(`Your Order will be placed and Delievered at ${deliveryText}`);
        }}
      >
        Buy Now
      </button>
    </div>
  );
};

export default Product;
