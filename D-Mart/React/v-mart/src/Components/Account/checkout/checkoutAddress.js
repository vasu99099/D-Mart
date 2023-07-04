import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAddress,
  getuser,
  setDeliveryAddress,
} from "../../App/slices/userProfile";
import { useNavigate } from "react-router-dom";
import { getStore } from "../../App/slices/userProfile";
import axios from "axios";
import PickupPoints from "./PickupPoints";
const CheckoutAddress = ({
  Toggle,
  setToggle,
  setDeliveryOption,
  deliveryOption,
  setDeliverAddress,
  deliverAddress,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const store = useSelector(getStore);
  const address = useSelector(getAddress);
  const userDetails = useSelector(getuser);
  const [SelectedAddress, setSelectedAddress] = useState();
  const [pickupPoint, setpickupPoint] = useState();
  const [primaryAddress, setPrimaryAddress] = useState();

  useEffect(() => {
    if (address.length > 0) {
      if (address[0]._id === userDetails.primaryAddress) {
        setPrimaryAddress(address[0]._id);
      }
    }

    const config = {
      method: "GET",
      url: `${process.env.REACT_APP_API_DOMAIN}/pickup/${store.id}`,
      headers: {
        ContentType: "application/json",
      },
    };
    axios(config)
      .then(function (response) {
        setpickupPoint(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  const toggleHnadler = () => {
    if (SelectedAddress !== undefined && deliveryOption !== undefined) {
      setToggle(!Toggle);
      if (deliveryOption == "Pick Up") {
        const address_selected = pickupPoint.find(
          (pickup) => pickup._id === SelectedAddress
        );
        setDeliverAddress(address);
        console.log("address is chnages");
        dispatch(
          setDeliveryAddress({
            deliveryOption: "Pick Up",
            address: address_selected,
          })
        );
      } else {
        const address_selected = address.find(
          (add) => add._id === SelectedAddress
        );
        setDeliverAddress(address_selected);
        console.log("address is chnages");
        dispatch(
          setDeliveryAddress({
            deliveryOption: "Home Delivery",
            address: address_selected,
          })
        );
      }
    }
  };
  return (
    <div>
      {!Toggle ? (
        <div>
          <h4>CheckOut</h4>
          <div className="border rounded">
            <div className="d-flex px-3 py-3  border-bottom">
              <div className="me-3">
                <p className="green border rounded-circle px-2 backlightGreen">
                  1
                </p>
              </div>
              <div>
                <p>
                  Select a Delivery Option Mode{" "}
                  <i class="fa fa-info-circle ms-2" aria-hidden="true"></i>
                </p>
                <div className="d-flex justify-content-evenly gap-4">
                  <div
                    className={`d-md-flex  border p-2 my-0 ${
                      deliveryOption == "Pick Up" ? "border-success" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="delivery_option"
                      value="Pick Up"
                      id="Pick_Up"
                      className="me-3"
                      checked={deliveryOption === "Pick Up" ? true : false}
                      onChange={(e) => {
                        setDeliveryOption(e.target.value);
                        setSelectedAddress(undefined);
                      }}
                    />
                    <label
                      className="d-flex align-items-center gap-3"
                      htmlFor="Pick_Up"
                    >
                      <img
                        src="https://content.dmart.in/site/static/media/pup.1f8aff71.svg"
                        alt="home delivery"
                        className="my-0 py-0"
                        style={{ width: "2em" }}
                      />
                      <h6 className="py-0 my-0">Pick Up Point</h6>
                      <p className="backlightGreen px-3 fs-12 green py-0 my-0">
                        Free Delivery
                      </p>
                    </label>
                  </div>
                  <div
                    className={`d-md-flex  border p-2 my-0 ${
                      deliveryOption == "Home Delivery" ? "border-success" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="delivery_option"
                      value="Home Delivery"
                      id="home_delivery"
                      className="me-3"
                      checked={
                        deliveryOption === "Home Delivery" ? true : false
                      }
                      onChange={(e) => {
                        setDeliveryOption(e.target.value);
                        setSelectedAddress(undefined);
                      }}
                    />
                    <label
                      className="d-flex align-items-center gap-3"
                      htmlFor="home_delivery"
                    >
                      <img
                        src="https://content.dmart.in/site/static/media/home.c4ab7044.svg"
                        alt="home delivery"
                        className="my-0 py-0"
                        style={{ width: "2em" }}
                      />
                      <h6 className="py-0 my-0">Home Delivery</h6>
                      <p className="backlightGreen px-3 fs-12 text-danger py-0 my-0">
                        Flat ₹ 49.00
                      </p>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className=" border-bottom ">
                <div className="ms-5 d-flex justify-content-between  py-2 px-3">
                  <p className="text-muted mb-0">
                    {deliveryOption === "Pick Up"
                      ? "Pick Up Points near you"
                      : "Saved Address"}
                  </p>

                  {deliveryOption === "Pick Up" ? (
                    <p className="fs-14 green mb-0 cursor-pointer">View All</p>
                  ) : (
                    <p
                      className="fs-14 green mb-0 cursor-pointer"
                      onClick={() => navigate(`/account/AddressForm`)}
                    >
                      <em className="fa fa-plus green"></em> Add New Address
                    </p>
                  )}
                </div>
              </div>
              <div className="border-bottom ">
                <div
                  className="ms-5 mb-3 overflow-auto"
                  style={{ maxHeight: "150px" }}
                >
                  {pickupPoint &&
                    deliveryOption === "Pick Up" &&
                    pickupPoint.map((pickup, index) => {
                      return (
                        <label
                          htmlFor={pickup._id}
                          className={`d-flex justify-content-between align-items-center border px-4 py-2 mt-3 me-4 ${
                            SelectedAddress === pickup._id
                              ? "border-success"
                              : ""
                          }`}
                        >
                          {" "}
                          <div className="d-flex ">
                            <input
                              type="radio"
                              name="address"
                              value={pickup._id}
                              id={pickup._id}
                              className="me-4"
                              onClick={(e) => {
                                setSelectedAddress(e.target.value);
                              }}
                              checked={
                                SelectedAddress == pickup._id ? true : false
                              }
                            />
                            <div>
                              <h6 className="mb-0 fw-bold">{pickup.name}</h6>
                              <p className="fs-14 text-muted mb-0">
                                {pickup.Address}
                              </p>
                            </div>
                          </div>
                          <div
                            className="cursor-pointer"
                            data-bs-toggle="modal"
                            data-bs-target="#PickUpViewAll"
                          >
                            <em class="fa-solid green fa-location-dot me-2"></em>
                            <span className="green">view map</span>
                          </div>
                        </label>
                      );
                    })}
                  <PickupPoints pickupPoint={pickupPoint} />
                  {deliveryOption !== "Pick Up" &&
                    address.map((address, index) => {
                      return (
                        <label
                          htmlFor={address._id}
                          className={`d-flex justify-content-between align-items-center border px-4 py-2 mt-3 me-4 ${
                            (primaryAddress || SelectedAddress) === address._id
                              ? "border-success"
                              : ""
                          }`}
                        >
                          {" "}
                          <div className="d-flex ">
                            <input
                              type="radio"
                              name="address"
                              value={address._id}
                              id={address._id}
                              className="me-4"
                              onChange={(e) =>
                                setSelectedAddress(e.target.value)
                              }
                              checked={
                                SelectedAddress == address._id ? true : false
                              }
                            />
                            <div>
                              <h6 className="mb-0 fw-bold">
                                {address.FullName}
                              </h6>
                              <p className="fs-14 text-muted mb-0">
                                {`${address.Floor}, ${address.Locality}, ${
                                  address.Area
                                }, ${address.city.city}-${address.PinCode}, ${
                                  address.Landmark
                                    ? "Landmark: " + address.Landmark + ","
                                    : ""
                                } Mob No: ${address.Phone} `}
                              </p>
                            </div>
                          </div>
                          <div
                            className="cursor-pointer"
                            onClick={() =>
                              navigate(`/account/AddressForm/${address._id}`)
                            }
                          >
                            <em className="fa fa-pen green fa-sm me-2"></em>
                            <span className="green">Edit</span>
                          </div>
                        </label>
                      );
                    })}
                </div>
              </div>
            </div>
            <div className="py-3 text-right px-4">
              <button
                className="btn backgreen text-white"
                onClick={toggleHnadler}
              >
                CONTINUE
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div
            className={`d-flex justify-content-between align-items-center border rounded px-4 py-2 mt-3 ${
              SelectedAddress === address._id ? "border-success" : ""
            }`}
          >
            {" "}
            <div className="d-flex py-2 align-items-baseline">
              <em class="fa-sharp fa-solid fa-circle-check fa-xl green me-3"></em>
              {deliveryOption === "Pick Up" ? (
                <p className=" fw-bold  mb-0">
                  <span className="text-muted fw-normal me-2">
                    Your selected pickup point is{" "}
                  </span>
                  {deliverAddress.name}
                </p>
              ) : (
                <p className=" fw-bold  mb-0">
                  <span className="text-muted fw-normal me-2">
                    Your selected home delivery address is{" "}
                  </span>
                  {`${deliverAddress.Floor}, ${deliverAddress.Locality}, ${deliverAddress.Area}, ${deliverAddress.city.city}-${deliverAddress.PinCode}, ${deliverAddress.state.state}`}
                </p>
              )}
            </div>
            <div className="cursor-pointer" onClick={() => setToggle(!Toggle)}>
              <span className="green">Change</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutAddress;
