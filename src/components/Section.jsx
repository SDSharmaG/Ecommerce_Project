import React, { useState } from "react";
import Aside from "./Aside";
import Productlists from "./Productlists";

const Section = ({ searchTerm, addToCart }) => {
  const [category, setCategory] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [priceRange, setPriceRange] = useState("all");
  return (
    <div className="row g-0" style={{ marginTop: "90px" }}>
      <div className="col-12 col-md-3 col-lg-2">
        <Aside
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          setPriceRange={setPriceRange}
        />
      </div>
      <div className="col-12 col-md-9 col-lg-10">
        <Productlists
          searchTerm={searchTerm} // Pass down search term
          category={category} //pass down categories term (for sortby method)
          setCategory={setCategory}
          selectedCategory={selectedCategory} //pass down aside section
          priceRange={priceRange}
          addToCart={addToCart} //pass down addtocart term
        />
      </div>
    </div>
  );
};

export default Section;
