import React from "react";
import { useSelector } from "react-redux";
import { getCart, getCartCount } from "../App/slices/cart";
import FullCartProductCard from "./fullCartProductCard";
import SideCartProductCard from "./sideCartProductCard";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const FullCartView = () => {
  const navigate = useNavigate();
  const { count, total, saving } = useSelector(getCartCount);
  const cartitem = useSelector(getCart);

  const CheckOutHandler = () => {
    console.log("profile");
    axios
      .get(`${process.env.REACT_APP_API_DOMAIN}/profile`)
      .then((response) => {
        console.log(response.data);
        if (response.data.isLogined) {
          navigate("/account/checkout");
        }
      })
      .catch((err) => {
        alert("Please Login First");
      });
  };
  return (
    <div style={{ marginTop: "140px", minHeight: "70vh" }}>
      {count > 0 ? (
        <div className="px-4 row gap-5">
          <div className="col-lg-8 ">
            <div>
              <h5 className="fw-bold">
                Your Shopping Cart{" "}
                <span className="text-muted fw-normal fs-6 ps-2">
                  {count} items
                </span>
              </h5>
              <div className="row pt-2 text-muted d-none d-md-flex ">
                <p className="col-4">Product</p>
                <p className="col-3">No. of items</p>
                <p className="col-2">You Pay</p>
                <p className="col-2">You Save</p>
                <p className="col-1"></p>
              </div>
            </div>
            <div className="d-none d-md-block">
              {cartitem.length > 0 &&
                cartitem.map((cart, index) => {
                  return (
                    <FullCartProductCard
                      product={{
                        D_mart_Price: cart.storeProduct.D_mart_Price,
                        MRP: cart.storeProduct.MRP,
                        Product_id: cart.product_id,
                      }}
                      key={index}
                    />
                  );
                })}
            </div>
            <div className="d-md-none">
              {cartitem.length > 0 &&
                cartitem.map((cart, index) => {
                  return (
                    <SideCartProductCard
                      product={{
                        D_mart_Price: cart.storeProduct.D_mart_Price,
                        MRP: cart.storeProduct.MRP,
                        Product_id: cart.product_id,
                      }}
                      key={index}
                    />
                  );
                })}
            </div>
          </div>
          <div className="col-lg-3 ">
            <div className="border rounded mb-3">
              <div>
                <p className="fs-5 border-bottom py-2 ps-3 mb-0">
                  Price Summary{" "}
                  <span className="text-muted fw-normal fs-6 ps-2">
                    {count} items
                  </span>
                </p>
              </div>
              <div className="d-flex justify-content-between mx-3 py-2 mb-0 border-bottom">
                <div>
                  <p className="mb-0 text-muted"> Cart Total</p>
                </div>
                <div>
                  <p className="mb-0">₹ {total}</p>
                </div>
              </div>
              <div className="d-flex justify-content-between mx-3 py-2 mb-0 border-bottom">
                <div>
                  <p className="mb-0 text-muted">
                    Delivery Charge <i class="fa fa-circle-info ms-2"></i>
                  </p>
                </div>
                <div>
                  <p className="mb-0 text-danger">+ Extra</p>
                </div>
              </div>
              <div className="d-flex justify-content-between mx-3 py-2 mb-0">
                <div>
                  <p className="mb-0 text-muted">Savings</p>
                </div>
                <div>
                  <p className="mb-0 text-success"> ₹ {saving}</p>
                </div>
              </div>
              <div className=" bg-light text-center py-2 ">
                <p className="fs-14 mx-4 mb-0">
                  Tax of <strong>₹ 33.04 </strong>has been included in the total
                  amount
                </p>
              </div>
            </div>
            <div class="alert alert-warning fs-14 pb-0 text-dark" role="alert">
              <ul>
                <li>Your minimum order value should be ₹ 500.</li>
              </ul>
            </div>
            <div>
              <button
                className="btn backgreen text-white w-100"
                disabled={total > 500 ? false : true}
                onClick={CheckOutHandler}
              >
                PROCEED TO CHECKOUT
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className=" text-center">
            <img
              src="https://content.dmart.in/site/static/media/empty-cart.34f07c6a.svg"
              className=" pt-5 mb-4"
              alt="no item in cart"
              title="cart"
            />
            <h3>There are no item in your cart</h3>
            <button
              className="btn backgreen text-white px-5 mt-3"
              onClick={() => navigate("/")}
            >
              Start Shopping
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FullCartView;
