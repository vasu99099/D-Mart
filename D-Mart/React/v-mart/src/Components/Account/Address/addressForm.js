import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { addressSchema } from "./address.schema";
import { useDispatch, useSelector } from "react-redux";
import {
  getAddressById,
  getAllStore,
  setUserAddress,
  updateAddress,
} from "../../App/slices/userProfile";
import { getuser } from "../../App/slices/userProfile";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddressForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const AllStore = useSelector(getAllStore);
  const user = useSelector(getuser);
  const [matchedStore, setMatchedStore] = useState();

  const { addressId } = useParams();
  const address = useSelector((state) => {
    if (addressId) {
      return getAddressById(state, addressId);
    }
  });
  let initialValues;
  if (address) {
    initialValues = {
      FullName: address.FullName || "",
      PinCode: address.PinCode || "",
      Area: address.Area || "",
      Locality: address.Locality || "",
      Floor: address.Floor || "",
      Landmark: address.Landmark || "",
      Phone: address.Phone || user.Phone,
    };
  } else {
    initialValues = {
      FullName: "",
      PinCode: "",
      Area: "",
      Locality: "",
      Floor: "",
      Landmark: "",
      city: "",
      state: "",
      Phone: user.Phone,
    };
  }
  const changePinCode = async (pin) => {
    const store = AllStore.find((store) => store.Zipcode === pin);
    if (store) {
      setFieldValue("city", store.city.city);
      setFieldValue("Area", store.store_name);
      setFieldValue("state", store.state.state);
      setMatchedStore(store);
    }else{
      if(pin.length===6){
        alert("We can't deliver Order at this location ")
        setFieldValue("PinCode", '');
      }
    }
  };
  useEffect(() => {
    if (address) {
      changePinCode(address.PinCode);
    }
  }, []);

  const submitForm = (values) => {
    toast.success("Address added ");
    const address = { ...values };
    address.city = matchedStore.city._id;
    address.state = matchedStore.state._id;
    if (address.Landmark == "") {
      delete address.Landmark;
    }
    var config = {
      method: "POST",
      url: `${process.env.REACT_APP_API_DOMAIN}/address`,
      headers: {
        ContentType: "application/json",
      },
      data: address,
    };
    axios(config)
      .then(function (response) {
        const address = response.data;

        address.city = matchedStore.city;
        address.state = matchedStore.state;

        dispatch(setUserAddress(address));
        setTimeout(() => navigate("/account/address"), 2000);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const editAddressSubmit = () => {
    toast.success("Address added ");
    const addressUpdate = { ...values };
    addressUpdate.city = matchedStore.city._id;
    addressUpdate.state = matchedStore.state._id;
    if (addressUpdate.Landmark == "") {
      delete addressUpdate.Landmark;
    }
    var config = {
      method: "PUT",
      url: `${process.env.REACT_APP_API_DOMAIN}/address/${addressId}`,
      headers: {
        ContentType: "application/json",
      },
      data: addressUpdate,
    };
    axios(config)
      .then(function (response) {
        dispatch(updateAddress(response.data));
        setTimeout(() => navigate("/account/address"), 2000);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const {
    values,
    errors,
    touched,
    handleSubmit,
    handleChange,
    handleBlur,
    setFieldValue,
  } = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    validationSchema: addressSchema,
    onSubmit: (values) => {
      if (addressId) {
        editAddressSubmit(values);
      } else {
        submitForm(values);
      }
    },
  });

  return (
    <div>
      <h3 className="fw-bolder">My Address </h3>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <form className="w-25 ms-2" onSubmit={handleSubmit}>
        <div className="form-outline mb-3 fs-14 text-muted">
          <label className="form-label mb-0" for="form2Example1">
            Full Name{" "}
            <span className="error-msg">
              {touched.FullName && errors.FullName}
            </span>
          </label>
          <input
            type="text"
            name="FullName"
            value={values.FullName}
            onChange={handleChange}
            onBlur={handleBlur}
            className="form-control"
            autoComplete="off"
          />
        </div>

        <div className="form-outline mb-3 fs-14 text-muted">
          <label className="form-label mb-0">
            Pin Code
            <span className="error-msg">
              {touched.PinCode && errors.PinCode}
            </span>
          </label>
          <input
            type="number"
            name="PinCode"
            className="form-control"
            value={values.PinCode}
            autoComplete="off"
            onChange={(e) => {
              handleChange(e);
              changePinCode(e.target.value);
            }}
            onBlur={handleBlur}
          />
        </div>

        <div className="form-outline mb-3 fs-14 text-muted">
          <label className="form-label mb-0">
            Area
            <span className="error-msg">{touched.Area && errors.Area}</span>
          </label>
          <input
            type="text"
            name="Area"
            className="form-control "
            value={values.Area}
            autoComplete="off"
            onChange={handleChange}
            onBlur={handleBlur}
            disabled
          />
        </div>

        <div className="form-outline mb-3 fs-14 text-muted">
          <label className="form-label mb-0">
            Locality/ Street Name/ Apartment*
            <span className="error-msg">
              {touched.Locality && errors.Locality}
            </span>
          </label>
          <input
            type="text"
            name="Locality"
            className="form-control "
            autoComplete="off"
            value={values.Locality}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>

        <div className="form-outline mb-3 fs-14 text-muted">
          <label className="form-label mb-0">
            Wing/ Floor/ Flat/ House No.*
            <span className="error-msg">{touched.Floor && errors.Floor}</span>
          </label>

          <input
            type="text"
            name="Floor"
            className="form-control "
            autoComplete="off"
            value={values.Floor}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>

        <div className="form-outline mb-3 fs-14 text-muted">
          <label className="form-label mb-0">
            Landmark (optional)
            <span className="error-msg">
              {touched.Landmark && errors.Landmark}
            </span>
          </label>
          <input
            type="text"
            name="Landmark"
            className="form-control "
            autoComplete="off"
            value={values.Landmark}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>

        <div className="form-outline mb-3 fs-14 text-muted">
          <label className="form-label mb-0">
            City
            <span className="error-msg">{touched.city && errors.city}</span>
          </label>
          <input
            type="text"
            name="city"
            className="form-control"
            autoComplete="off"
            value={values.city}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled
          />
        </div>

        <div className="form-outline mb-3 fs-14 text-muted">
          <label className="form-label mb-0">
            State
            <span className="error-msg">{touched.state && errors.state}</span>
          </label>
          <input
            type="text"
            name="state"
            className="form-control"
            autoComplete="off"
            value={values.state}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled
          />
        </div>

        <div className="form-outline mb-3 fs-14 text-muted">
          <label className="form-label mb-0">
            Contact Number
            <span className="error-msg">{touched.Phone && errors.Phone}</span>
          </label>
          <input
            type="text"
            name="Phone"
            className="form-control"
            autoComplete="off"
            value={values.Phone}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>

        <button
          type="submit"
          className="btn backgreen text-white btn-block mb-3 "
        >
          Save changes
        </button>
      </form>
    </div>
  );
};

export default AddressForm;
