import React, { useEffect } from "react";
import { getCartCount } from "../../App/slices/cart";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getDeliveryData } from "../../App/slices/userProfile";
const PriceSummery = () => {
  const navigate = useNavigate();
  const { count, total, saving } = useSelector(getCartCount);
const deliveryDetail=useSelector(getDeliveryData)
  return (
    <div>
      <div className="">
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
              <p className="mb-0 text-muted"> You Pay</p>
            </div>
            <div>
              {deliveryDetail.address.deliveryOption!=="Home Delivery"?<p className="mb-0">₹ {total}</p>:<p className="mb-0">₹ {total+49}</p>}
            </div>
          </div>
          <div className="d-flex justify-content-between mx-3 py-2 mb-0 border-bottom">
            <div>
              <p className="mb-0 text-muted"> Cart Total</p>
            </div>
            <div>
              <p className="mb-0">₹ {total}</p>
            </div>
          </div>
          {deliveryDetail.address.deliveryOption=== "Home Delivery" && (
            <div className="d-flex justify-content-between mx-3 py-2 mb-0 border-bottom">
              <div>
                <p className="mb-0 text-muted">
                  Delivery Charge <i class="fa fa-circle-info ms-2"></i>
                </p>
              </div>
              <div>
                <p className="mb-0 ">₹ 49</p>
              </div>
            </div>
          )}
          <div className="d-flex justify-content-between mx-3 py-2 mb-0">
            <div>
              <p className="mb-0 text-muted">Your Savings</p>
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

        {/* <div>
          <button
            className="btn backgreen text-white w-100"
            disabled={total > 500 ? false : true}
            onClick={() => navigate("/account/checkout")}
          >
            PROCEED TO CHECKOUT
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default PriceSummery;
