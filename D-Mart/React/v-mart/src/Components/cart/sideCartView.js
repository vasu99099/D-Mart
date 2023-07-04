import React from "react";
import { useSelector } from "react-redux";
import { getCart, getCartCount } from "../App/slices/cart";
import { useNavigate } from "react-router-dom";
import SideCartProductCard from "./sideCartProductCard";

const SideCartView = () => {
  const navigate = useNavigate();
  const { count, total, saving } = useSelector(getCartCount);
  const cartitem = useSelector(getCart);
  console.log(cartitem)
  return (
    <div>
      <div
        className="offcanvas offcanvas-end"
        style={{ width: "500px" }}
        data-bs-scroll="true"
        tabindex="-1"
        id="cart-side-view"
        aria-labelledby="cart-side-view"
      >
        <div className="offcanvas-header justify-content-center  row mx-0 m-1 px-0 py-1 border  ">
          <div className="col-2 px-0 align-self-center">
            <button
              type="button"
              className="btn-close "
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>

          <div className="col-10 row mt-1 text-center">
            <div className="col-4 ">
              <h6>
                <span className="text-muted ">items</span>
                <br />
                {count}
              </h6>
            </div>
            <div className="col-4 ">
              <h6>
                <span className="text-muted ">saving</span>
                <br /> ₹ {saving}
              </h6>
            </div>
            <div className="col-4 ">
              <h6>
                <span className="text-muted ">Cart total</span>
                <br /> ₹ {total}
              </h6>
            </div>
          </div>
        </div>
        <div className="offcanvas-body pb-0">
          <div className="mx-3">
            {cartitem.length > 0 ? (
              <>
                {cartitem.map((cart, index) => {
                  console.log(cart.storeProduct.Quantity_in_stock)
                  return (
                    <SideCartProductCard
                      product={{
                        D_mart_Price: cart.storeProduct.D_mart_Price,
                        stock: cart.storeProduct.Quantity_in_stock,
                        MRP: cart.storeProduct.MRP,
                        Product_id: cart.product_id,
                      }}
                      key={index}
                    />
                  );
                })}
                <div className="position-absolute bottom-0 start-50 translate-middle">
                  <h6
                    className="text-danger  border-xl py-2 px-5 text-center fs-12 w-100 "
                  >
                    Minimum Order Amount is ₹ 500
                  </h6>
                  <div className="text-center bg-light">
                    <button
                      className="btn border-success text-success px-5"
                      data-bs-dismiss="offcanvas"
                      aria-label="Close"
                      onClick={() => navigate("/product/cart")}
                    >
                      View Full Cart
                    </button>
                  </div>
                </div>
              </>
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
                    data-bs-dismiss="offcanvas"
                    onClick={() => navigate("/")}
                  >
                    Start Shopping
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideCartView;
