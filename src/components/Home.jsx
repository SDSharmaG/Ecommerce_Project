import React, { useState } from "react";
import Header from "../components/Header";
import Section from "../components/Section";
import Footer from "../components/Footer";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState(""); // State for search term

  return (
    <div style={{ backgroundColor: "white" }}>
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm} // Pass down setter function
      />
      <Section searchTerm={searchTerm} />
      <Footer />
    </div>
  );
};

export default Home;
