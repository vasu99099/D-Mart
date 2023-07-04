import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getuser, setUserDeatils } from "../../App/slices/userProfile";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ChangeMobileNumber = () => {
  const navigate = useNavigate();
  const user = useSelector(getuser);
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [OTPerror, setOTPError] = useState("");
  const [OTPSend, setOTPSend] = useState(false);
  const [OTP, setOTP] = useState("");
  const [mobileNumber, setMobileNumber] = useState();

  const changeHandler = (str) => {
    const mobileRegex = /^[0-9]{10}$/;
    if (str.trim() == "") {
      setError("* required");
    } else if (!mobileRegex.test(str.trim())) {
      setError("* Invalid mobile");
    } else {
      setError("");
    }
  };
  const validOTP = (str) => {
    const OTPRegex = /^[0-9]{4}$/;
    if (OTPRegex.test(str)) {
      setOTPError("");
    } else {
      setOTPError("* invalid OTP");
    }
  };
  const sendOTP = () => {
    const config = {
      method: "POST",
      url: `${process.env.REACT_APP_API_DOMAIN}/profile/OTP`,
      data: { Phone: mobileNumber },
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    axios(config)
      .then((response) => {
        if (response.status === 200) {
          setOTPSend(true);
          toast.success("OTP send Successful");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    const mobile = e.target.elements[0];
    let flag = true;
    changeHandler(mobile.value);
    if (error === "") {
      if (mobile.value === user.Phone) {
        setError("* Mobile number is already in use");
        flag = false;
      }
    } else {
      flag = false;
    }

    if (flag) {
      sendOTP();
    }
  };
  const OTPVereify = (e) => {
    e.preventDefault();
    const config = {
      method: "PUT",
      url: `${process.env.REACT_APP_API_DOMAIN}/profile/user`,
      headers: {
        ContentType: "application/json",
      },
      data: { OTP, Phone: mobileNumber },
    };
    if (OTPerror === "") {
      axios(config)
        .then(function (response) {
          toast.success("Successfully change Mobile number ");
          dispatch(setUserDeatils(response.data));
          navigate("/account/");
        })
        .catch(function (error) {
          console.log(error);
          setOTPError("* invalid OTP");
        });
    }
  };
  return (
    <div className="row">
      <h3 className="fw-bolder">Change Mobile Number</h3>
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
      <form
        className="mt-3 col-3"
        onSubmit={OTPSend ? OTPVereify : submitHandler}
      >
        <div class="row g-3 mb-3">
          <div class="col">
            <label className="form-label text-muted fs-14">
              old Mobile Number
            </label>
            <p>+91 | {user.Phone}</p>
          </div>
        </div>
        <div class="row g-3 mb-3">
          <div class="col">
            <label className="form-label text-muted fs-14">
              New Mobile Number<span className="text-danger">{error}</span>
            </label>
            <input
              type="text"
              className="form-control"
              name="newMobile"
              onChange={(e) => {
                changeHandler(e.target.value);
                setMobileNumber(e.target.value);
              }}
              onFocus={() => setOTPSend(false)}
            />
          </div>
        </div>
        {OTPSend && (
          <div className="mb-3">
            <label>
              OTP :<span className="text-danger">{OTPerror}</span>
            </label>
            <input
              type="text"
              name="OTP"
              className="form-control w-50"
              onChange={(e) => {
                setOTP(e.target.value);
                validOTP(e.target.value);
              }}
            />
            <p className="green mt-2 cursor-pointer" onClick={() => sendOTP()}>
              Resend
            </p>
          </div>
        )}
        <div>
          <button type="submit" className="btn backgreen text-white btn-block">
            {OTPSend ? "verify OTP" : "SAVE CHANGES"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangeMobileNumber;
