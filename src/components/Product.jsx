import React from "react";
import star from "../assets/images/star.png";
import "../assets/css/product.css";
import { useNavigate } from "react-router-dom";

const Product = (props) => {
  const { id, title, image, price, rating } = props.info;
  const navigate = useNavigate();
  const getproduct = () => {
    navigate(`/product/${id}`);
  };
  // Function to render stars visually
  const renderStars = (rate) => {
    const stars = [];
    const roundedRate = Math.round(rate); // round to nearest integer
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
  // Truncate Title Function (limit = 20 chars)
  const truncateTitle = (text, limit = 20) => {
    return text.length > limit ? text.substring(0, limit) + "..." : text;
  };
  return (
    <div>
      <div
        className="border w-100 h-100 p-3 bg-light rounded"
        onClick={getproduct}
      >
        <h4>{truncateTitle(title)}</h4>
        <img src={image} className="product-img" />
        <strong className="p-2 mt-3 ">$ {price}</strong>
        <br />
        <div className="d-flex align-items-center mt-2">
          {renderStars(rating.rate)}
          <span className="ms-2">{rating.rate.toFixed(1)}</span>
          <span className="ms-2">({rating.count})</span>
        </div>
        <br />
        <button
          className="btn mb-1 text-center text-light w-100"
          style={{ backgroundColor: "#63B9D6" }}
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default Product;
