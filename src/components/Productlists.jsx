import React, { useEffect, useState } from "react";
import Product from "./Product";

const Productlists = ({
  searchTerm,
  category,
  setCategory,
  selectedCategory,
  priceRange,
}) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  const categoryDisplay = {
    all: "All Products",
    "men's clothing": "Men",
    "women's clothing": "Women",
    electronics: "Electronics",
    jewelery: "Jewelery",
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("https://fakestoreapi.com/products");
      const data = await res.json();
      setProducts(data);
      console.log(data);
    };
    fetchProducts();
  }, []);
  // Add item to cart
  const addToCart = (product) => {
    setCart([...cart, product]);
    console.log("Cart items: ", cart);
  };
  //convert price range string to number
  const filterbyPrice = (product) => {
    if (!priceRange || priceRange === "all") return true;
    const price = product.price;
    if (priceRange === "0-500") return price >= 0 && price < 500;
    if (priceRange === "500-1000") return price >= 500 && price <= 1000;
    return true;
  };

  const filterProducts = products.filter((product) => {
    //for search term to filter the name of product
    const matchProduct = (product.title || "")
      .toLowerCase()
      .includes((searchTerm || "").toLowerCase());
    //sorty by category for productlists
    const matchCategory = category === "all" || product.category === category;
    const matchCheckboxCategory =
      selectedCategory.length === 0 ||
      selectedCategory.includes(product.category);
    const matchfilterprice = filterbyPrice(product);
    return (
      matchProduct && matchCategory && matchCheckboxCategory && matchfilterprice
    );
  });

  return (
    <div className="container w-75 " style={{ marginTop: "120px" }}>
      <div className="d-flex">
        <h5 className="flex-grow-1 mx-4 p-2 py-2 align-item-center text-secondary rounded">
          {categoryDisplay[category]}
        </h5>
        <label htmlFor="filter" className="me-3 mt-2">
          <strong>Sort By </strong>:
        </label>
        <select
          className="form-select w-auto mb-2"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="all">All</option>
          <option value="men's clothing">Men</option>
          <option value="women's clothing">Women</option>
          <option value="electronics">Electronics</option>
          <option value="jewelery">Jewelery</option>
        </select>
      </div>

      <div className="row">
        {filterProducts.length > 0 ? (
          filterProducts.map((item) => (
            <div key={item.id} className="col-12 col-md-6 col-lg-4 mb-4">
              <Product info={item} />
            </div>
          ))
        ) : (
          <p className="no-results">No Product found.</p>
        )}
      </div>
      {/* <h5>Cart Count: {cart.length}</h5> */}
    </div>
  );
};

export default Productlists;
