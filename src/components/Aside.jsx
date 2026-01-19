import React, { useState } from "react";

const Aside = ({ selectedCategory, setSelectedCategory, setPriceRange }) => {
  const [showCategories, setShowCategories] = useState(true);
  const [showPrices, setShowPrices] = useState(true);

  const handlePrice = (e) => {
    setPriceRange(e.target.value);
  };

  const handleCheckbox = (e) => {
    const value = e.target.value;
    if (value === "all") {
      setSelectedCategory([]);
      return;
    }
    if (e.target.checked) {
      setSelectedCategory([...selectedCategory, value]);
    } else {
      setSelectedCategory(selectedCategory.filter((cat) => cat !== value));
    }
  };

  return (
    <div
      className="p-3"
      style={{
        position: "sticky",
        top: "100px",
        height: "100vh",
        overflowY: "auto",
        borderRight: "1px solid #ddd",
        backgroundColor: "#fff",
      }}
    >
      {/* Categories Section */}
      <div className="mb-4">
        <div
          className="d-flex justify-content-between align-items-center mb-2"
          style={{ cursor: "pointer" }}
          onClick={() => setShowCategories(!showCategories)}
        >
          <h5 className="mb-0">Categories</h5>
          <span>{showCategories ? "−" : "+"}</span>
        </div>
        {showCategories && (
          <div className="ps-2">
            <div className="form-check mb-2">
              <input
                className="form-check-input"
                type="checkbox"
                value="all"
                id="All"
                onChange={handleCheckbox}
              />
              <label className="form-check-label" htmlFor="All">
                All
              </label>
            </div>
            <div className="form-check mb-2">
              <input
                className="form-check-input"
                type="checkbox"
                value="men's clothing"
                id="Men"
                onChange={handleCheckbox}
                checked={selectedCategory.includes("men's clothing")}
              />
              <label className="form-check-label" htmlFor="Men">
                Men
              </label>
            </div>
            <div className="form-check mb-2">
              <input
                className="form-check-input"
                type="checkbox"
                value="women's clothing"
                id="Women"
                onChange={handleCheckbox}
                checked={selectedCategory.includes("women's clothing")}
              />
              <label className="form-check-label" htmlFor="Women">
                Women
              </label>
            </div>
            <div className="form-check mb-2">
              <input
                className="form-check-input"
                type="checkbox"
                value="electronics"
                id="Electronics"
                onChange={handleCheckbox}
                checked={selectedCategory.includes("electronics")}
              />
              <label className="form-check-label" htmlFor="Electronics">
                Electronics
              </label>
            </div>
            <div className="form-check mb-2">
              <input
                className="form-check-input"
                type="checkbox"
                value="jewelery"
                id="Jewelery"
                onChange={handleCheckbox}
                checked={selectedCategory.includes("jewelery")}
              />
              <label className="form-check-label" htmlFor="Jewelery">
                Jewelery
              </label>
            </div>
          </div>
        )}
      </div>

      {/* Price Section */}
      <div className="mb-4">
        <div
          className="d-flex justify-content-between align-items-center mb-2"
          style={{ cursor: "pointer" }}
          onClick={() => setShowPrices(!showPrices)}
        >
          <h5 className="mb-0">Price Range</h5>
          <span>{showPrices ? "−" : "+"}</span>
        </div>
        {showPrices && (
          <div className="ps-2">
            <div className="form-check mb-2">
              <input
                className="form-check-input"
                type="radio"
                name="price"
                value="0-500"
                id="price1"
                onChange={handlePrice}
              />
              <label className="form-check-label" htmlFor="price1">
                $0 - $500
              </label>
            </div>
            <div className="form-check mb-2">
              <input
                className="form-check-input"
                type="radio"
                name="price"
                value="500-1000"
                id="price2"
                onChange={handlePrice}
              />
              <label className="form-check-label" htmlFor="price2">
                $500 - $1000
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Aside;
