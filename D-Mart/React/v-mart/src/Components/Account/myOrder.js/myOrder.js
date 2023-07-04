import React, { useEffect, useState } from "react";
import axios from "axios";
import MyOrderProductCard from "./myOrderProductCard";
const MyOrder = () => {
  const [myorder, setMyOrder] = useState();
  useEffect(() => {
    const config = {
      method: "GET",
      url: `${process.env.REACT_APP_API_DOMAIN}/orderItem`,
      headers: {
        ContentYype: "application/json",
      },
    };
    axios(config)
      .then(function (response) {
        setMyOrder(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  return (
    <div className="row">
      <h5>My Order :</h5>
      {console.log(myorder)}
      {myorder &&
        myorder.map((order) => {
          console.log(order)
          return <MyOrderProductCard order={order} />;
        })}
    </div>
  );
};

export default MyOrder;
