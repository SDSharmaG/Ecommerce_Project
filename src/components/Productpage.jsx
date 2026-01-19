import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import star from "../assets/images/star.png";

const Productpage = ({ addToCart }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`https://fakestoreapi.com/products/${id}`);
      const data = await res.json();
      setProduct(data);
    };
    fetchProduct();
  }, [id]);

  // ⭐ Rating stars
  const renderStars = (rate) => {
    const stars = [];
    const rounded = Math.round(rate);
    for (let i = 0; i < 5; i++) {
      stars.push(
        <img
          key={i}
          src={star}
          alt="star"
          className={i < rounded ? "star-filled" : "star"}
        />
      );
    }
    return stars;
  };

  if (!product) return <p className="text-center mt-5">Loading...</p>;

  /* 💰 Pricing Logic */
  const discountPercent = Math.floor(Math.random() * 30) + 10;
  const originalPrice = (
    product.price / (1 - discountPercent / 100)
  ).toFixed(2);

  /* 🚚 Delivery */
  const deliveryDays = Math.floor(Math.random() * 3) + 2;
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + deliveryDays);
  const deliveryText = deliveryDate.toLocaleDateString("en-IN", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  /* 📦 Stock */
  const stockLeft = Math.floor(Math.random() * 15) + 1;

  return (
    <div className="container" style={{ marginTop: "120px" }}>
      <div className="row align-items-center">
        {/* IMAGE */}
        <div className="col-md-6 text-center">
          <img
            src={product.image}
            alt={product.title}
            className="img-fluid"
            style={{ height: "420px", objectFit: "contain" }}
          />
        </div>

        {/* DETAILS */}
        <div className="col-md-6">
          {discountPercent >= 25 && (
            <span className="badge bg-danger mb-2">
              Limited Time Deal
            </span>
          )}

          <h2 className="mt-2">{product.title}</h2>

          {/* Rating */}
          <div className="d-flex align-items-center mt-2">
            {renderStars(product.rating.rate)}
            <span className="ms-2">
              {product.rating.rate.toFixed(1)}
            </span>
            <span className="ms-2">
              ({product.rating.count})
            </span>
          </div>

          {/* Price */}
          <div className="mt-3">
            <span className="old-price">
              M.R.P: $ {originalPrice}
            </span>
            <span className="new-price ms-3">
              $ {product.price}
            </span>
            <span className="discount ms-2">
              ({discountPercent}% OFF)
            </span>
          </div>

          {/* Delivery */}
          <p className="delivery mt-2">
            FREE Delivery by <strong>{deliveryText}</strong>
          </p>

          {/* Stock */}
          {stockLeft <= 5 && (
            <p className="stock-warning">
              Only {stockLeft} left in stock
            </p>
          )}

          {/* Description */}
          <p className="mt-4">{product.description}</p>

          {/* Category */}
          <p>
            <strong>Category:</strong> {product.category}
          </p>

          {/* Buttons */}
          <button
            className="btn buy-btn w-100 mt-3"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>

          <button
            onClick={() => navigate("/")}
            className="btn btn-secondary w-100 mt-2"
          >
            Back to Products
          </button>
        </div>
      </div>
    </div>
  );
};

export default Productpage;
