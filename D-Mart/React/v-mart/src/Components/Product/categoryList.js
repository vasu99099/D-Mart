import React from "react";
import { Link, useNavigate } from "react-router-dom";
const CategoryList = ({ categoryData }) => {
  const navigate = useNavigate();

  const { category, children } = categoryData;
  return (
    <div style={{ height: "100vh" }}>
      <h6 className="ms-2 py-2 fs-6 fw-bold">Grocery</h6>
      <ul className="list-group">
        {children &&
          children.map((child,index) => {
            return (
              <li
              key={index}
                className="list-group-item "
                onClick={() => navigate(`/product/${child.category._id}`)}

              >
                {child.category.category_name}
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default CategoryList;
