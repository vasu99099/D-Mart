import React, { useState, useEffect } from "react";
import CarouselHome from "./carousel";
import BoxContent from "./BoxContent";

import axios from "axios";
const BodyContent = () => {
  const [homepage, setHomePage] = useState(null);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_DOMAIN}/homepage`)
      .then((response) => {
        setHomePage(response.data);
      })
      .catch((err) => {});
  }, []);
  return (
    <div style={{ backgroundColor: "#f0f2f6" }}>
      {homepage !== null &&
        homepage.map((data,index) => {
          if (data.isCarousel == true) {
            return <CarouselHome img={data.images} key={index} />;
          } else {
            return <BoxContent img={data.images} title={data.title} key={index}/>;
          }
        })}
    </div>
  );
};

export default BodyContent;
