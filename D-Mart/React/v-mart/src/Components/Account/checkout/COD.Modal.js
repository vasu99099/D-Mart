import React from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getDeliveryData, getStore } from "../../App/slices/userProfile";
import { resetCart } from "../../App/slices/cart";
import { useNavigate } from "react-router-dom";
const CODModal = ({ payableAmount }) => {
  const store = useSelector(getStore);
  const dispatch = useDispatch();
  const deliveryData = useSelector(getDeliveryData);
  const navigate = useNavigate();
  const handelOrder = () => {
    console.log(store);
    let charges = 0;
    if (deliveryData.address.deliveryOption === "Home Delivery") {
      charges = 49;
    }
    const data = {
      address: deliveryData.address.address._id,
      store_id: store.id,
      Total_amount: payableAmount,
      timeslot: deliveryData.timeslot,
      deliver_charges: charges,
      tracking: "order placed",
      OrderType: deliveryData.address.deliveryOption,
      paymentStatus: "COD",
    };
    const config = {
      method: "POST",
      url: `${process.env.REACT_APP_API_DOMAIN}/order`,
      headers: {
        ContentType: "application/json",
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        dispatch(resetCart());
        navigate("/success");
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <div>
      <div
        class="modal fade "
        id="CODModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog  modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-body mx-4">
              <p className="fw-bold fs-4">Card/ Cash on Delivery</p>
              <p className="fs-6">
                You can pay by Card, Cash or UPI at the time of delivery.
              </p>
              <p className="fs-5 fw-bold">
                AMOUNT TO BE PAID{" "}
                <span className="green ms-3">₹ {payableAmount}</span>
              </p>
            </div>
            <div className="row gap-4 justify-content-around mx-4 mt-3 mb-5">
              <button
                type="button"
                class="col-5 btn green border border-success fw-bold  py-0"
                data-bs-dismiss="modal"
              >
                GO BACK
              </button>
              <button
                type="button"
                class="btn backgreen text-white col-5 btn-block"
                data-bs-dismiss="modal"
                onClick={handelOrder}
              >
                CONFIRM ORDER
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CODModal;
