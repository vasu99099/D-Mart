import ProductCard from "./ProductCard";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ProductCard.css";
import axios from "axios";
import CategoryList from "./categoryList";
import { cartContext } from "../Home/Home";

const Product = () => {
  const { categoryId } = useParams();
  const [product, setProduct] = useState();
  const [category, setCategory] = useState();

  const {cart,setcartItemCount,cartCount}=useContext(cartContext);
  useEffect(() => {
    const store_id = JSON.parse(localStorage.getItem("preferstore")).id;
    axios
      .get("/storeproduct/" + store_id + "/" + categoryId)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((err) => {
        console.log("some error occurred");
      });
    axios
      .get("/category/filter/" + categoryId)
      .then((response) => {
        setCategory(response.data);
      })
      .catch((err) => {});
      
  }, [categoryId]);

 

  return (
    <>
      <div className="mx-0 px-0 row">
        <div className="col-2 d-none d-lg-block border px-0">
          {category && <CategoryList categoryData={category} />}
        </div>
        <div className="col-12 col-lg-10  mx-0 px-2 border-bottom">
          <div className=" row px-0 mx-0 ">
            <h4 className="my-2 px-0">
              {category && category.category.category_name}
            </h4>
            {
              
            product &&
              product.map((data, index) => {
                let quantity = cart&&cart.filter((c) => c.product_id === data._id);
                let qty = 0;

                if (quantity.length > 0) {
                  qty = quantity[0].quantity;
                  // setcartItemCount({ ...cartCount, rupies: cartCount.rupies+data.D_mart_Price});
                }
                return <ProductCard product={data} qty={qty} key={index} />;
              })}
          </div>
        </div>
      </div>
    </>
  );
};
export default Product;
