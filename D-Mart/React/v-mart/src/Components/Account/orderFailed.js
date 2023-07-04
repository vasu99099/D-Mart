import React from "react";
import { useNavigate } from "react-router-dom";

const OrderFailed = ({ setPaymentFaild }) => {
  const navigate = useNavigate();
  return (
    <div
      className="d-flex justify-content-center my-auto   fixed-top"
      style={{ minHeight: "100vh", backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="border border-dark h-50 w-50 mt-5 p-4 bg-white">
        <div className="d-flex align-items-baseline">
          {" "}
          <i class="fa-sharp fa-solid fa-circle-exclamation me-3 fa-xl text-danger">
            {" "}
          </i>
          <h5 className="fw-bold">Payment Failed</h5>
        </div>
        <p className="fw-bolder">
          If Money is deducted from your account, it will be Refunds
        </p>
        <div className="row gap-4 justify-content-around mx-4 mt-5 ">
          <button
            type="button"
            class="col-5 btn green border border-success fw-bold  py-0"
            onClick={() => setPaymentFaild(false)}
          >
            Retry
          </button>
          <button
            type="button"
            class="btn backgreen text-white col-5 btn-block"
            onClick={() => navigate("/")}
          >
            GO TO HOME
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderFailed;
