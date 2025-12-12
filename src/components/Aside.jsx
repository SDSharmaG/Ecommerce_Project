import React, { useState } from "react";

const Aside = ({ selectedCategory, setSelectedCategory, setPriceRange }) => {
  const handleprice = (e) => {
    const value = e.target.value;
    setPriceRange(value);
  };
  const handleCheckbox = (e) => {
    const value = e.target.value;
    if (value === "all") {
      setSelectedCategory([]);
      return;
    }
    if (e.target.checked) {
      //add category
      setSelectedCategory([...selectedCategory, value]);
    } else {
      //remove category
      setSelectedCategory(selectedCategory.filter((cat) => cat !== value));
    }
  };
  return (
    <div
      className=" justify-content-center ms-auto"
      style={{
        position: "sticky", // FIXED spelling
        top: "100px", // REQUIRED for sticky to work
        padding: "20px",
        height: "100vh",
      }}
    >
      <div className="mb-3">
        <h3>Categories</h3>
        <label htmlFor="All">
          <input
            id="All"
            type="checkbox"
            value="all"
            className="me-2"
            onChange={handleCheckbox}
          />
          All
        </label>
        <br />
        <label htmlFor="Men">
          <input
            id="Men"
            type="checkbox"
            value="men's clothing"
            className="me-2"
            onChange={handleCheckbox}
          />
          Men
        </label>
        <br />
        <label htmlFor="Women">
          <input
            id="Women"
            type="checkbox"
            value="women's clothing"
            className="me-2"
            onChange={handleCheckbox}
          />
          Women
        </label>
        <br />
        <label htmlFor="Electronics">
          <input
            id="Electronics"
            type="checkbox"
            value="electronics"
            className="me-2"
            onChange={handleCheckbox}
          />
          Electronics
        </label>
        <br />
        <label htmlFor="Jewelery">
          <input
            id="Jewelery"
            type="checkbox"
            value="jewelery"
            className="me-2"
            onChange={handleCheckbox}
          />
          Jewelery
        </label>
        <br />
        <hr />
      </div>
      <div>
        <h3>Price Range</h3>
        <label htmlFor="">
          <input
            type="radio"
            name="price"
            value="0-500"
            className="me-2"
            onChange={handleprice}
          />
          $ 0 <span className="mx-4"> - </span> $ 500
        </label>
        <br />
        <label htmlFor="">
          <input
            type="radio"
            name="price"
            value="500-1000"
            className="me-2"
            onChange={handleprice}
          />
          $ 500 <span className="ms-2  me-4"> -</span> $ 1000
        </label>
      </div>
    </div>
  );
};

export default Aside;
