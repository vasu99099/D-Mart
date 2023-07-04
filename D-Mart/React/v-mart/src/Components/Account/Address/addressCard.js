import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  deleteUserAddress,
  setUserDeatils,
} from "../../App/slices/userProfile";
import { useDispatch } from "react-redux";
import axios from "axios";
const AddressCard = ({ address, primary }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    _id,
    Floor,
    FullName,
    PinCode,
    Area,
    Locality,
    Landmark,
    city,
    Phone,
  } = address;

  const deleteAddress = () => {
    const config = {
      method: "DELETE",
      url: `${process.env.REACT_APP_API_DOMAIN}/address/${_id}`,
      headers: {
        ContentType: "application/json",
      },
    };

    axios(config)
      .then(function (response) {
        console.log(_id, "id");
        dispatch(deleteUserAddress(_id));
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const setPrimaryAddress = () => {
    const config = {
      method: "PUT",
      url: `${process.env.REACT_APP_API_DOMAIN}/profile/user`,
      headers: {
        ContentType: "application/json",
      },
      data: { primaryAddress: _id },
    };
    axios(config)
      .then(function (response) {
        console.log(response.data);
        dispatch(setUserDeatils(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <div
      className={`col-3 border address-card my-auto bg-white p-4 position-relative ${
        primary ? "border-success" : "border-dark"
      }`}
    >
      <div>
        <h5 className="fw-bolder">{FullName}</h5>

        <p className="text-capitalize mb-0">{Floor}</p>
        <p className="text-capitalize mb-0">{Locality}</p>
        <p className="text-capitalize mb-0">
          {Area},{city.city}-{PinCode}
        </p>
        {Landmark && (
          <p className="text-capitalize mb-0">Landmark: {Landmark}</p>
        )}
        <p className="text-capitalize mb-0">Mob No: {Phone}</p>
      </div>
      <div className="d-flex position-absolute bottom-0 text-decoration-none">
        <p
          className="text-success cursor-pointer"
          onClick={() => navigate(`/account/AddressForm/${_id}`)}
        >
          Edit
        </p>
        <p className="px-2">|</p>
        <p className="text-danger cursor-pointer" onClick={deleteAddress}>
          Delete
        </p>
        <p className="px-2">|</p>
        <p className="text-dark cursor-pointer" onClick={setPrimaryAddress}>
          set Primary
        </p>
      </div>
      {primary && (
        <div>
          <span class="badge rounded-pill border border-success green position-absolute top-0 end-0 m-4 px-2 py-1">
            Primary
          </span>
        </div>
      )}
    </div>
  );
};

export default AddressCard;
