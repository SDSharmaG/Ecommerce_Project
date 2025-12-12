import React, { useState } from "react";
import Aside from "./Aside";
import Productlists from "./Productlists";

const Section = ({ searchTerm, addToCart }) => {
  const [category, setCategory] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [priceRange, setPriceRange] = useState("all");
  return (
    <div className="d-flex">
      <Aside
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        setPriceRange={setPriceRange}
      />
      <Productlists
        searchTerm={searchTerm} // Pass down search term
        category={category} //pass down categories term (for sortby method)
        setCategory={setCategory}
        selectedCategory={selectedCategory} //pass down aside section
        priceRange={priceRange}
        addToCart={addToCart} //pass down addtocart term
      />
    </div>
  );
};

export default Section;
