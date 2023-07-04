import React from "react";
import axios from "axios";
import { cartAsync } from "../../App/slices/cart";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const MyOrderProductCard = ({ order }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const addTocartProduct = async () => {
    var config = {
      method: "POST",
      url: `${process.env.REACT_APP_API_DOMAIN}/cart`,
      headers: {
        ContentType: "application/json",
      },
      data: {
        product_id: order.product_id._id,
        storeProduct: order.storeProduct_Id ,
        quantity: order.quantity,
      },
    };
console.log(config);
    const response = await axios(config);
    dispatch(cartAsync());
    navigate("/account/checkout");
  };
  return (
    <div className="col-8">
      <div className=" p-1  mx-0 mb-3">
        <div className="border border-success">
          <div className="row ">
            <img
              src={order.product_id.Images[0].url}
              className="mx-auto mt-2 p-2 grow col-2"
              style={{ width: "100px" }}
              alt={order.product_id.Images[0].alt}
              title={order.product_id.Images[0].title}
            />
            <div className="card-body px-0 px-lg-2 ms-3 col-2">
              <h5 className="fs-6 ">{`${order.product_id.Name} : ${order.product_id.Packing_size} ${order.product_id.unit}`}</h5>
              <p className="my-0 mt-3">
                Price : <strong>₹ {order.Price}</strong>
              </p>
              <p className="my-0 mt-3">
                Quantity : <strong>{order.quantity}</strong>
              </p>
              <p className="my-0 mt-3">
                you pay : <strong>₹ {parseFloat(order.Price * order.quantity)+parseFloat(order.order_id.deliver_charges)}</strong>
              </p>
            </div>

            <div className=" col-7">
              <div className="m-3  px-3 text-end">
                <span
                  class="badge bg-success fs-6 cursor-pointer"
                  title="re-order"
                  onClick={addTocartProduct}
                >
                  re-order
                </span>
              </div>

              <div className="d-flex align-items-baseline gap-4 my-2">
                <div
                  className="d-flex align-items-baseline"
                  title="order placed"
                >
                  <em class="fa-sharp fa-solid fa-circle-check fa-xl green "></em>
                  <p>-- Order Placed</p>
                </div>
                <div
                  className="d-flex align-items-baseline"
                  title="order dispatch from store"
                >
                  {order.order_id.tracking === "dispatch" ||
                  order.order_id.tracking === "Delivered" ? (
                    <em class="fa-sharp fa-solid fa-circle-check fa-xl green "></em>
                  ) : (
                    <p className="border border-success bg-light rounded-circle px-2">
                      2
                    </p>
                  )}
                  <p>-- Dispatch</p>
                </div>
                <div
                  className="d-flex align-items-baseline"
                  title="order deliverd"
                >
                  {order.order_id.tracking !== "Delivered" ? (
                    <p className="border border-success bg-light rounded-circle px-2">
                      3
                    </p>
                  ) : (
                    <em class="fa-sharp fa-solid fa-circle-check fa-xl green "></em>
                  )}
                  <p>-- Delivered</p>
                </div>
              </div>
              <div className=" bg-light fw-bold rounded px-2 ">
                <p className="my-0 ">
                  Deliver on:
                  <span className="green">{order.order_id.timeslot}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyOrderProductCard;
