import React from "react";
import './footer.css'
const Footer = () => {
  return (
    <div className="container-fluid mx-auto ">
      <div className="m-5 row justify-content-between">
        <div className="col-12 col-lg-5 order-2 order-lg-1">
          <p>Download DMart Ready Mobile App Now!!</p>
          <div>
            <img
              src="../Images/footer/google-play.svg"
              alt="Google pay"
              className="play-icon me-3 mb-2 mb-md-0"
            />
            <img
              src="../Images/footer/download-app-store.svg"
              alt="Google pay"
              className="play-icon"
            />
          </div>
          <div className="">
            <img
              src="../Images/footer/visa.svg"
              alt="Google pay"
              className="payment-card-icon mx-1"
            />
            <img
              src="../Images/footer/mastercard.svg"
              alt="Google pay"
              className="payment-card-icon mx-1"
            />
            <img
              src="../Images/footer/american.svg"
              alt="Google pay"
              className="payment-card-icon mx-1"
            />
            <img
              src="../Images/footer/rupay.svg"
              alt="Google pay"
              className="payment-card-icon mx-1"
            />
            <img
              src="../Images/footer/cash_outlined.svg"
              alt="Google pay"
              className="payment-card-icon mx-1"
            />
          </div>
        </div>
        <div className="col-12 col-lg-6 order-1 order-lg-2">
          <ul className="row text-start list-group list-group-horizontal nav">
            <li className="col-12 col-md-6 link">
              <a>FAQS</a>
            </li>
            <li className="col-12 col-md-6 link">
              <a>Contact Us</a>
            </li>
            <li className="col-12 col-md-6 link">
              <a>Privacy Policy</a>
            </li>
            <li className="col-12 col-md-6 link">
              <a>About Us</a>
            </li>
            <li className="col-12 col-md-6 link">
              <a>Pricing, Delivery, Return and Refund Policy</a>
            </li>
            <li className="col-12 col-md-6 link">
              <a>Pickup Points</a>
            </li>
            <li className="col-12 col-md-6 link">
              <a>Terms and Conditions</a>
            </li>
            <li className="col-12 col-md-6 link">
              <a>Disclaimer</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="mx-5">
        <hr />
        <p className="text-center">
          Copyright © 2023 Avenue E-Commerce Limited (AEL). All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
