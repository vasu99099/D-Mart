import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";
const Login = ({ setShowLoginPage }) => {
  const [error, setEroor] = useState(null);
  const [isdisabled, setIsdisabled] = useState(true);
  const [mobileStatus, setMobileStatus] = useState(false);
  const [mobile, setMobile] = useState();
  const [OTP, setOTP] = useState();

  const navigate = useNavigate();

  const validMobileNum = (e) => {
    const regMobile = /^[0-9]{10}$/;
    if (!regMobile.test(e.target.value)) {
      setEroor("* Enter a valid mobile number");
      e.target.classList.add("is-invalid");
      setIsdisabled(true);
    } else {
      setEroor(null);
      setIsdisabled(false);
      e.target.classList.remove("is-invalid");
      e.target.classList.add("is-valid");
    }
  };

  const validOTP = (e) => {
    if (e.target.value.length <= 4) {
      setOTP(e.target.value);
    }
    if (e.target.value.length == 4) {
      setIsdisabled(false);
    }
  };
  const generateOTP = (e) => {
    e && e.preventDefault();

    setMobileStatus(true);
    setIsdisabled(true);
    setOTP("");

    if (error === null || error === "") {
      const location = JSON.parse(localStorage.getItem("preferstore"));

      const config = {
        method: "POST",
        url: "/profile/OTP",
        data: { Phone: mobile, Store: location.id },
      };
      axios(config)
        .then((response) => {
          if (response.status === 200) {
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const verifyOTP = (e) => {
    e.preventDefault();
    const config = {
      method: "POST",
      url: "/profile/signIn",
      data: { OTP },
    };
    axios(config)
      .then((response) => {
        if (response.status === 200) {
          setEroor(null);
          navigate("/");
        }
        if (response.status === 401) {
          setEroor(response.message);
        }
      })
      .catch(function (error) {
        if (error.response.status === 401) {
          setEroor("* invalid OTP");
        }
      });
  };
  return (
    <section>
      <div
        className="container-fluid fixed-top py-5 h-100 "
        style={{ backgroundColor: "rgba(0, 0, 0,0.5)" }}
      >
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className=" col-7 col-xl-8">
            <div className="card rounded-3 text-black">
              <div className="row g-0">
                <div className="col-xl-4 align-items-center d-none d-xl-flex ">
                  <div className="text-white ">
                    <img
                      src="../Images/login_page.svg"
                      style={{
                        backgroundImage:
                          "url('../Images/login_page_background.png')",
                      }}
                    />
                  </div>
                </div>
                <div className=" col-xl-8">
                  <div className="card-body ms-5 text-center ">
                    <h6>
                      Let's Get You Logged In{" "}
                      <button
                        className="float-end btn rounded-circle bg-secondary"
                        onClick={() => setShowLoginPage(false)}
                      >
                        <i class="fa-solid fa-xmark text-white"></i>
                      </button>
                    </h6>
                    <hr />
                    {!mobileStatus ? (
                      <form onSubmit={generateOTP}>
                        <div className="col-10 mx-auto">
                          <p className="text-start text-muted">
                            Enter your 10 digit mobile number
                          </p>

                          {mobileStatus && (
                            <p className="text-start">Enter OTP :</p>
                          )}
                          <div className="input-group">
                            <div className="input-group-text">+91</div>
                            <input
                              type="number"
                              maxLength={10}
                              className="form-control"
                              value={mobile}
                              onChange={(e) => {
                                validMobileNum(e);
                                setMobile(e.target.value);
                              }}
                            />
                          </div>
                          <p className="error-msg text-start mt-1">{error}</p>
                          <p className="text-start font-monospace mt-4">
                            By Continuing, you agree to our{" "}
                            <span className="green">Terms, Refunds</span> and{" "}
                            <span className="green">privacy policy</span>
                          </p>
                          <div className="mt-5">
                            <button
                              type="submit"
                              className="btn  w-100 backgreen text-white px-5 fw-bolder "
                              disabled={isdisabled}
                            >
                              CONTINUE
                            </button>
                          </div>
                        </div>
                      </form>
                    ) : (
                      <form onSubmit={verifyOTP}>
                        <div className="col-10 mx-auto">
                          <p className="text-start text-muted">
                            OTP Sent via SMS to +91 {mobile} to verify your
                            mobile number
                          </p>

                          <p className="text-start">
                            Enter OTP :{" "}
                            <span className="error-msg">{error}</span>
                          </p>
                          <div className="input-group">
                            <input
                              type="tel"
                              value={OTP}
                              className="form-control fs-5"
                              onChange={validOTP}
                            />
                          </div>
                          <p className="text-start text-muted  mt-4">
                            Didn't Recieve the OTP
                          </p>
                          <p
                            className="text-start cursor-pointer green"
                            onClick={() => generateOTP()}
                          >
                            Resend via SMS
                          </p>
                          <div className="mt-5">
                            <button
                              type="submit"
                              className="btn  w-100 backgreen text-white px-5 fw-bolder "
                              disabled={isdisabled}
                            >
                              CONTINUE
                            </button>
                            <p
                              className="mt-3  fw-bold cursor-pointer link green"
                              onClick={() => {
                                setMobileStatus(false);
                                setOTP("");
                                setEroor("");
                              }}
                            >
                              {" "}
                              GO BACK
                            </p>
                          </div>
                        </div>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
