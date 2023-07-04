import React, { useState, useEffect, createContext } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/footer";
import BodyContent from "../BodyContent/BodyContent";
import Product from "../Product/Product";
import { Outlet } from "react-router-dom";
import axios from "axios";
export const cartContext = createContext();
const Home = () => {
  const [cart, setcartItem] = useState({ count: 5, rupies: 0 });
  const [cartCount, setcartItemCount] = useState({ count: 0, rupies: 0 });

  useEffect(() => {
    axios
      .get("/cart")
      .then((response) => {
        setcartItem(response.data);
        let count = 0;
        console.log(response.data);
        response.data.map((d) => {count += d.quantity;});
        setcartItemCount({ ...cartCount, count: count });
      })
      .catch((err) => {
        console.log(err.message, "Error");
      });
  }, []);
  return (
    <cartContext.Provider value={{ cart, setcartItemCount,cartCount }}>
      <div style={{ overflowX: "hidden" }}>
        <Header />
        <div style={{ marginTop: "120px" }}>
          <Outlet />
        </div>
        <Footer />
      </div>
    </cartContext.Provider>
  );
};

export default Home;
