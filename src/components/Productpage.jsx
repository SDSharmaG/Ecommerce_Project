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

  if (!product) return <p>Loading...</p>;

  return (
    <div>
      <div
        className="container d-flex col-12 align-item-center justify-content-center"
        style={{ marginTop: "130px" }}
      >
        <div className="col-6">
          <img
            src={product.image}
            alt=""
            style={{
              width: "100%",
              height: "400px",
              objectFit: "contain",
              padding: "20px",
              marginRight: "20px",
            }}
          />
        </div>
        <div className="col-6 w-50">
          <h1 className="my-2">{product.title}</h1>
          <p className="my-5 text-justify">{product.description}</p>
          <h4 className="mb-4">
            <strong>${product.price}</strong>
          </h4>
          <h6 className="my-3">
            <strong>Category: </strong>
            {product.category}
          </h6>
          <div className="d-flex align-items-center mt-2">
            {renderStars(product?.rating?.rate)}
            <span className="ms-2">{product?.rating?.rate}</span>
            <span className="ms-2">[{product?.rating?.count}]</span>
          </div>
          <br />
          <button
            className="btn w-100 mt-3"
            style={{ backgroundColor: "#63B9D6" }}
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
          <br />
          <button
            onClick={() => navigate("/")}
            className="btn btn-secondary w-100 mt-3"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default Productpage;
