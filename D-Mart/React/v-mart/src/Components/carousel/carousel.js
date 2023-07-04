import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
const CarouselHome = ({ img }) => {
  return (
    <div className="">
      <Carousel
        showArrows={false}
        autoPlay={true}
        infiniteLoop={true}
        showStatus={false}
        showThumbs={false}
        showIndicators={false}
        width={"100%"}
      >
        {img&&img.map((data, index) => {
          return (
            <div>
              <img src={data.image_id.url} alt={data.image_id.alt} title={data.image_id.title} key={index}/>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default CarouselHome;
