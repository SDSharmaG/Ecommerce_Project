import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import people from "../assets/images/people.png";
import cart from "../assets/images/shopping-cart.png";
import swag from "../assets/images/swag.png";

const Header = ({ searchTerm, setSearchTerm, cartCount }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();
  const showBadge = location.pathname !== "/cart";

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();
        setAllProducts(data);
      } catch (err) {
        console.log("Error loading products:", err);
      }
    };
    fetchProducts();
  }, []);

  // Handle search input
  const handleSearch = (value) => {
    setSearchTerm(value);
    if (!value.trim()) {
      setSuggestions([]);
      return;
    }
    const filtered = allProducts.filter((item) =>
      item.title.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(filtered.slice(0, 6));
  };

  return (
    <header className="bg-white shadow-sm position-fixed w-100" style={{ top: 0, zIndex: 1000 }}>
      <div className="d-flex align-items-center justify-content-between px-2 py-2">
        {/* Logo */}
        <img
          src={swag}
          alt="Logo"
          style={{
            width: "120px", // smaller on mobile
            height: "50px",
            cursor: "pointer",
          }}
          onClick={() => navigate("/")}
        />

        {/* Search Bar */}
        <div className="flex-grow-1 mx-2 position-relative">
          <div className="input-group">
            <span className="input-group-text bg-white border-end-0">
              <FaSearch />
            </span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search products..."
              className="form-control border-start-0"
              style={{ minWidth: "120px" }}
            />
          </div>

          {/* Suggestions */}
          {suggestions.length > 0 && (
            <ul
              className="list-group position-absolute w-100 shadow"
              style={{ top: "40px", zIndex: 9999, maxHeight: "200px", overflowY: "auto" }}
            >
              {suggestions.map((item) => (
                <li
                  key={item.id}
                  className="list-group-item list-group-item-action"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setSearchTerm(item.title);
                    setSuggestions([]);
                    navigate(`/product/${item.id}`);
                  }}
                >
                  {item.title}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Account & Cart */}
        <div className="d-flex align-items-center">
          <div
            className="mx-2"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/account")}
          >
            <img src={people} alt="user" width={28} height={28} />
          </div>

          <div
            className="position-relative mx-2"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/cart")}
          >
            <img src={cart} alt="cart" width={28} height={28} />
            {showBadge && cartCount > 0 && (
              <Badge
                bg="danger"
                pill
                style={{ position: "absolute", top: "-10px", right: "-10px" }}
              >
                {cartCount}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
