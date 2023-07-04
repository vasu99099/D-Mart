import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./address.css";
import { useSelector } from "react-redux";
import { getAddress, getuser } from "../../App/slices/userProfile";
import AddressCard from "./addressCard";
import { useNavigate } from "react-router-dom";
const Address = () => {
  const navigate = useNavigate();
  const address = useSelector(getAddress);
  const userDetails = useSelector(getuser);
  return (
    <div className="px-4">
      <h3 className="fw-bolder">My Address</h3>

      <div className="row gap-5">
        <div className="col-3 border address-card my-auto d-flex align-items-center justify-content-center">
          <div
            className="text-center cursor-pointer"
            onClick={() => navigate("/account/addressForm")}
          >
            <em className="fa-solid fa-plus text-success  rounded-circle p-2 bg-white border"></em>
            <p className="fs-14 green fw-bolder">Add New Address</p>
          </div>
        </div>

        {address.map((add) => {
          let primary = false;
          if (add._id === userDetails.primaryAddress) {
            primary = true;
          }
          return <AddressCard address={add} primary={primary} />;
        })}
      </div>
    </div>
  );
};

export default Address;
