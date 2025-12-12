import React, { useEffect, useState } from "react";
import people from "../assets/images/people.png";
import cart from "../assets/images/shopping-cart.png";
import swag from "../assets/images/swag.png";
import { FaSearch } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import Badge from "react-bootstrap/Badge";

const Header = ({ searchTerm, setSearchTerm, cartCount }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();
  const showBadge = location.pathname !== "/cart";

  // 🔥 Fetch products from Fake API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let res = await fetch("https://fakestoreapi.com/products");
        let data = await res.json();
        setAllProducts(data);
      } catch (err) {
        console.log("Error loading products:", err);
      }
    };

    fetchProducts();
  }, []);

  // 🔍 Filter suggestions whenever user types
  const handleSearch = (value) => {
    setSearchTerm(value);

    if (value.trim() === "") {
      setSuggestions([]);
      return;
    }

    const filtered = allProducts.filter((item) =>
      item.title.toLowerCase().includes(value.toLowerCase())
    );

    setSuggestions(filtered.slice(0, 6)); // show first 6 only
  };

  return (
    <div
      className="d-flex justify-content-between align-items-center px-4 py-2 w-100 shadow-sm position-fixed"
      style={{
        top: 0,
        width: "100%",
        backgroundColor: "#D4D7D9",
        zIndex: 1000,
      }}
    >
      {/* LOGO */}
      <img src={swag} alt="Logo" style={{ width: "220px", height: "90px" }} />

      {/* SEARCH BAR + SUGGESTIONS */}
      <div className="position-relative flex-grow-1 mx-4">
        {/* <div className="d-flex h-100 rounded bg-light">
          <span className="p-2 bg-white rounded-start d-flex align-items-center">
            <FaSearch />
          </span> */}

        <input
          type="text"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search products..."
          className="form-control"
        />
        {/* </div> */}

        {/* 🔥 SUGGESTION LIST */}
        {suggestions.length > 0 && (
          <ul
            className="list-group position-absolute w-100"
            style={{ top: "45px", zIndex: 9999 }}
          >
            {suggestions.map((item) => (
              <li
                key={item.id}
                className="list-group-item list-group-item-action"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setSearchTerm(item.title);
                  setSuggestions([]);
                }}
              >
                {item.title}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* ACCOUNT */}
      <div
        className="d-flex align-items-center mx-3"
        style={{ cursor: "pointer" }}
      >
        <img src={people} alt="user" width={28} height={28} className="me-2" />
        <h6 className="m-0">Account</h6>
      </div>

      {/* CART */}
      <div
        className="d-flex align-items-center position-relative"
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/cart")}
      >
        <img src={cart} alt="cart" width={28} height={28} className="me-2" />

        {showBadge && cartCount > 0 && (
          <Badge
            bg="danger"
            pill
            style={{ position: "absolute", top: "-10px", right: "-20px" }}
          >
            {cartCount}
          </Badge>
        )}

        <h6 className="m-0">Cart</h6>
      </div>
    </div>
  );
};

export default Header;
