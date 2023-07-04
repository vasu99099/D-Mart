import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const NavigationBar = () => {
  const [category, setCategory] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("/category")
      .then((response) => {
        setCategory(response.data);
      })
      .catch((err) => {});
  }, []);
  return (
    <div className="row border py-1 fs-14 d-none d-lg-flex">
      <div className="col-2 border-end me-2 ">
        <a
          className="text-dark fs-14 link ms-3 "
          data-bs-toggle="offcanvas"
          href="#all-category"
          role="button"
          aria-controls="all-category"
        >
          <em className="fa-solid fa-bars me-3"> </em>
          <span className="d-none d-lg-inline-block">All Categories</span>
        </a>
      </div>
      <ul className="nav d-flex gap-5 col-9">
        {category &&
          category.map(
            (cat, index) =>
              index < 7 && (
                <li
                  key={index}
                  className="link"
                  onClick={() => navigate(`/product/${cat._id}`)}
                >
                  {cat.category_name}
                </li>
              )
          )}
      </ul>
    </div>
  );
};

export default NavigationBar;
