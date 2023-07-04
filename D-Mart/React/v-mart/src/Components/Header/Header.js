import React, { useState, useEffect, useContext } from "react";
import SelectLocation from "../SelectLocation/SelectLocation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faAngleDown,
  faClock,
  faUser,
  faCartPlus,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import Login from "../Login";
import "./Header.scss";
import NavigationBar from "./NavigationBar";
import Slidebar from "../Slidebar.js/slidebarAllCategory";
import axios from "axios";
import { cartContext } from "../Home/Home";

const Header = ({ cart }) => {
  const navigate = useNavigate();

  const {cartCount}=useContext(cartContext);
  let username = JSON.parse(localStorage.getItem("username"));
  const [selectedOption, setSelectedOption] = useState(null);
  const [displaymodal, setDisplaymodal] = useState("block");
  const [showLoginPage, setShowLoginPage] = useState(false);

  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    const prefredStore = localStorage.getItem("preferstore");
    if (prefredStore) {
      setDisplaymodal("none");
      setSelectedOption(JSON.parse(prefredStore));
    }

    axios
      .get("/profile")
      .then((response) => {
        if (response.status === 200) {
          setIsLogin(true);
          localStorage.setItem("username", JSON.stringify(response.data));
        }
      })
      .catch((err) => {
        setIsLogin(false);
      });
  }, []);

  return (
    <div>
      <div className="fixed-top bg-white">
        <SelectLocation
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          displaymodal={displaymodal}
          setDisplaymodal={setDisplaymodal}
        />
        <div className="container-fluid px-0 ">
          <div className=" row  py-2 mx-0 align-items-center  px-1 ">
            <div className=" row col-4 col-sm-4  col-xl-6">
              <div className="col-z col-xl-3 d-flex  align-items-center ">
                <a
                  className="text-dark fs-14 link ms-lg-3  d-lg-none"
                  data-bs-toggle="offcanvas"
                  href="#all-category"
                  role="button"
                  aria-controls="all-category"
                >
                  <em className="fa-solid fa-bars me-3"> </em>
                  <span className="d-none d-lg-inline-block">
                    All Categories
                  </span>
                </a>
                <img
                  src="../Images/dmart_ready_logo.svg"
                  alt="D-mart Ready logo"
                  className="Dmart-logo"
                  title="DMART"
                  onClick={() => navigate("/")}
                />
              </div>
              <div className="col-9 col-xl-9 d-none d-xl-flex">
                <div className="d-flex">
                  <div
                    className="border  pt-2 px-md-3 me-2 me-md-3"
                    title="DMART"
                    style={{
                      borderRadius: "1rem 0",
                      backgroundColor: "rgba(125, 164, 251, 0.1)",
                      cursor: "pointer",
                    }}
                    onClick={() => {setDisplaymodal("block");navigate("/")}}
                  >
                    <div className="d-flex my-auto">
                      <FontAwesomeIcon
                        icon={faLocationDot}
                        style={{ color: "green" }}
                        className="me-2"
                      />
                      <h6 className="mb-0 me-3">
                        {selectedOption ? selectedOption.Zipcode : "400053"}
                      </h6>
                      <FontAwesomeIcon icon={faAngleDown} />
                    </div>
                    <p className="text-muted text-center mb-0">
                      {selectedOption ? selectedOption.city : "Mumbai"}
                    </p>
                  </div>
                  <div className="mt-2">
                    <p className="fs-14 mb-1">
                      Earliest <span className="green ">Home Delivery</span>{" "}
                      available
                    </p>
                    <p className="fs-14 ">
                      <FontAwesomeIcon
                        icon={faClock}
                        style={{ color: "#ffa238" }}
                      />
                      <span className="fw-bolder ms-2">
                        Today 02:00 PM - 04:00 PM
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className=" row col-8 col-sm-8 col-xl-6 text-end text-xl-center align-items-baseline  ">
              <div className="col-3 col-sm-3 col-xl-7 mx-auto ">
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  className="green d-xl-none"
                />
                <div className="input-group d-none  d-xl-flex ">
                  <input
                    type="text"
                    className="form-control py-2 "
                    placeholder="What are looking for?"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                  />

                  <button
                    type="button"
                    className="backgreen text-white px-3 border rounded-end"
                  >
                    SEARCH
                  </button>
                </div>
              </div>
              <div className="col-5 col-sm-5 col-xl-3 mx-auto text-start">
                <div className="d-flex ">
                  <FontAwesomeIcon icon={faUser} className="green me-2" />
                  <p className="fw-bolder fs-14 text-dark">
                    {!isLogin ? (
                      <Link
                        className="link"
                        onClick={() => setShowLoginPage(true)}
                        to="/"
                      >
                        Sign In / Register
                      </Link>
                    ) : (
                      <>
                        <p className="py-0 my-0 text-muted fs-12">
                          Hello {username ? username.First_name : ""}
                        </p>
                        My Account
                      </>
                    )}
                  </p>
                </div>
              </div>
              <div className=" col-2 col-sm-2 mx-auto ">
                <div className="d-flex align-items-baseline ">
                  <div className="position-relative">
                    <FontAwesomeIcon
                      icon={faCartPlus}
                      flip="horizontal"
                      className="fa-lg green me-2 "
                    />
                    <span
                      className="position-absolute top-500 fs-12 start-0 px-1 translate-middle border border-light rounded-pill fw-bold"
                      style={{ backgroundColor: "#ffe589" }}
                    >
                      {cartCount.count}
                    </span>
                  </div>
                  <p className="fw-bolder ">₹. {cartCount.rupies}</p>
                </div>
              </div>
            </div>
          </div>
          <div className=" d-xl-none  border py-2 mx-0 ">
            <div className="d-flex px-1">
              <div
                className="border  pt-2  me-2 "
                title="DMART"
                style={{
                  borderRadius: "1rem 0",
                  backgroundColor: "rgba(125, 164, 251, 0.1)",
                  cursor: "pointer",
                }}
                onClick={() => setDisplaymodal("block")}
              >
                <div className="d-flex my-auto">
                  <FontAwesomeIcon
                    icon={faLocationDot}
                    style={{ color: "green" }}
                    className="me-3 ms-1"
                  />
                  <h6 className="mb-0 me-3">
                    {selectedOption ? selectedOption.Zipcode : "400053"}
                  </h6>
                  <FontAwesomeIcon icon={faAngleDown} className="me-3" />
                </div>
                <p className="text-muted text-center mb-0">
                  {selectedOption ? selectedOption.city : "Mumbai"}
                </p>
              </div>
              <div className="mt-2">
                <p className="fs-14 mb-1">
                  Earliest <span className="green ">Home Delivery</span>{" "}
                  available
                </p>
                <p className="fs-14 ">
                  <FontAwesomeIcon
                    icon={faClock}
                    style={{ color: "#ffa238" }}
                  />
                  <span className="fw-bolder ms-2">
                    Today 02:00 PM - 04:00 PM
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <NavigationBar />
        {showLoginPage && <Login setShowLoginPage={setShowLoginPage} />}
      </div>
      <Slidebar />
    </div>
  );
};

export default Header;
