import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAddress,
  getuser,
  setDeliveryTimeslot,
} from "../../App/slices/userProfile";
import { useNavigate } from "react-router-dom";
import CheckoutAddress from "./checkoutAddress";
import TimeSlot from "./TimeSlot";

const CheckOutDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [Toggle, setToggle] = useState(false);
  const [timeSelected, setTimeSelected] = useState();
  const [deliveryOption, setDeliveryOption] = useState();
  const [deliverAddress, setDeliverAddress] = useState();

  useEffect(() => {
    if (
      timeSelected !== undefined &&
      deliverAddress !== undefined &&
      deliveryOption !== undefined
    ) {
      console.log(deliveryOption, timeSelected, deliverAddress);
      // setD_Option(deliveryOption);
      // setTimeslot(timeSelected);
      // setAddress(deliverAddress);
    }
  }, [timeSelected, deliverAddress, deliveryOption]);
  useEffect(() => {
    if (timeSelected !== undefined) {
      dispatch(setDeliveryTimeslot(timeSelected));
    }
  }, [timeSelected]);
  return (
    <div className="me-lg-4">
      <CheckoutAddress
        Toggle={Toggle}
        setToggle={setToggle}
        deliveryOption={deliveryOption}
        setDeliveryOption={setDeliveryOption}
        deliverAddress={deliverAddress}
        setDeliverAddress={setDeliverAddress}
      />
      <TimeSlot
        Toggle={Toggle}
        timeSelected={timeSelected}
        setTimeSelected={setTimeSelected}
      />
    </div>
  );
};

export default CheckOutDetails;
