import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom"; // ✅ Only Routes here
import Home from "./components/Home";
import Productpage from "./components/Productpage";
import Cart from "./components/Cart";
import Header from "./components/Header";

const App = () => {
  const [cart, setCart] = useState([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(saved);
  }, []);

  // Save cart whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Add product to cart
  const addToCart = (product) => {
    const exist = cart.find((item) => item.id === product.id);
    alert("Your item added to the cart");
    if (exist) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };
  // CART COUNT = total items (sum of quantities)
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <>
      <Header cartCount={cartCount} />
      <Routes>
        <Route path="/" element={<Home addToCart={addToCart} />} />
        <Route
          path="/product/:id"
          element={<Productpage cart={cart} addToCart={addToCart} />}
        />
        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
      </Routes>
    </>
  );
};

export default App;
