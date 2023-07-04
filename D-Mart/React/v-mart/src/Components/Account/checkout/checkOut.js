import React, { useEffect, useState } from "react";
import PriceSummery from "./PriceSummery";
import CheckOutDetails from "./CheckOutDetails";
import { useCallback } from "react";
import useRazorpay from "react-razorpay";
import axios from "axios";
import "./checkOut.css";
import CODModal from "./COD.Modal";
import { getCartCount, resetCart } from "../../App/slices/cart";
import { useDispatch, useSelector } from "react-redux";
import {
  getDeliveryData,
  getStore,
  getuser,
} from "../../App/slices/userProfile";
import { useNavigate } from "react-router-dom";
import OrderFailed from "../orderFailed";
const CheckOut = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { count, total, saving } = useSelector(getCartCount);
  const user = useSelector(getuser);
  const store = useSelector(getStore);
  const deliveryData = useSelector(getDeliveryData);
  console.log(deliveryData);
  const [paymentDisable, setPaymentDisable] = useState(false);
  const [payableAmount, setPayableAmount] = useState(total);
  const [paymentFaild, setPaymentFaild] = useState(false);
  const [delivery, setDelivery] = useState();

  useEffect(() => {
    if (deliveryData.address.deliveryOption !== "Pick Up") {
      setPayableAmount(total + 49);
    }
  }, [deliveryData]);
  const createOrder = async () => {
    const response = await axios(
      `${process.env.REACT_APP_API_DOMAIN}/payment/create-checkout-session`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: { amount: payableAmount * 100, currency: "INR" }, // Change amount and currency as per your requirement
      }
    );

    return response.data.id;
  };
  // verifySignature;
  const verifySignature = async (res) => {
    console.log(deliveryData, "here");
    try {
      const response = await axios(
        `${process.env.REACT_APP_API_DOMAIN}/payment/verify-signature`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          data: res,
        }
      );
      if (response.status === 200) {
        // dispatch(resetCart());
        navigate("/success");
      }
      console.log(response);
    } catch (e) {
      console.log(e);
      setPaymentFaild(true);
    }
  };

  const Razorpay = useRazorpay();
  const handlePayment = useCallback(async () => {
    const order = await createOrder();

    const options = {
      key: "rzp_test_VjEt3qjz7LZAHV",
      amount: payableAmount * 100,
      currency: "INR",
      name: "V-Mart ",
      description: "V-Mart",
      image: "https://cdn.dmart.in/images/icons/dmart_ready_logo.svg",
      order_id: order,
      handler: function (res) {
        verifySignature(res);
      },
      prefill: {
        name: user.First_name,
        contact: user.Phone,
      },
      notes: {
        address: "V-Mart coporate",
      },
      theme: {
        color: "#25a541",
      },
    };

    const rzpay = new Razorpay(options);
    rzpay.open();
    console.log(rzpay);
  }, [Razorpay]);

  return (
    <div className="row  m-4 mt-2">
      <div className="col-12 col-lg-8 mx-auto mt-3">
        <CheckOutDetails />
      </div>
      <div className="col-12 col-lg-3 ms-auto mt-4">
        <PriceSummery />
        <div>
          <button
            className="btn backgreen text-white w-100 mb-3"
            data-bs-toggle="modal"
            data-bs-target="#CODModal"
            disabled={paymentDisable}
          >
            PAY ON DELIVERY (COD)
          </button>
          <h4 className="payment-option text-secondary mx-5">
            <span className="mx-3">OR</span>
          </h4>
          <button
            className="btn backgreen text-white w-100"
            onClick={() => handlePayment()}
            disabled={paymentDisable}
          >
            PAYNOW(Preapaid)
          </button>
        </div>
        <CODModal payableAmount={payableAmount} />
      </div>

      {paymentFaild && <OrderFailed setPaymentFaild={setPaymentFaild} />}
    </div>
  );
};

export default CheckOut;
