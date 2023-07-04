import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OrderSuccess = () => {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => navigate("/"), 1000);
  });
  return (
    <div>
      <div className="d-flex justify-content-center">
        <img
          src="https://i.gifer.com/7efs.gif"
          alt="order succes"
          title="ordered"
        />
      </div>
    </div>
  );
};

export default OrderSuccess;
