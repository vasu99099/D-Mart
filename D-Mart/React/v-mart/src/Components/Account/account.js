import React from "react";
import "./account.css";
import { Link, NavLink, Outlet } from "react-router-dom";
const Account = () => {
  return (
    <div className="row py-0" style={{ minHeight: "70vh" }}>
      <div className="col-2 border text-indent-20 px-2">
        <ul className="profile-list ">
          <li className="profile-list-item">Account Details</li>
          <ul className="profile-list">
            <li className="profile-list-item text-indent-50">
              <NavLink className="profile-link" to="/account">
                My Profile
              </NavLink>
            </li>
            <li className="profile-list-item text-indent-50">
              <NavLink className="profile-link" to="/account/address">
                My Address
              </NavLink>
            </li>
            <li className="profile-list-item text-indent-50">My Saved card</li>
          </ul>
          <li className="profile-list-item ">Ready List</li>
          <li className="profile-list-item">
            {" "}
            <NavLink className="profile-link" to="/account/My-Order">
              My Order
            </NavLink>
          </li>
        </ul>{" "}
      </div>
      <div className="col-10 p-3">
        <Outlet />
      </div>
    </div>
  );
};

export default Account;
