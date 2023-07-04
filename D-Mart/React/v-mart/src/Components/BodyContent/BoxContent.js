import React from "react";
import "./BoxContent.css";
const BoxContent = ({ img, title }) => {
  const col = 12 / img.length;
  return (
    <div className="m-4" style={{ background: "#fff" }}>
      <div className="border p-3 mx-auto row">
        {title && <h5>{title}</h5>}
        {img.map((link, index) => {
          return (
            <img
              src={link.image_id.url}
              key={index}
              alt={link.image_id.alt}
              title={link.image_id.title}
              className={`col-12 my-2 banner-grow col-sm-${col}`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default BoxContent;
