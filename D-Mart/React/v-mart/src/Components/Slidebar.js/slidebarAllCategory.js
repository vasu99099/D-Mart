import React, { useEffect, useState } from "react";
import "./slidebarAllCategory.css";
import axios from "axios";
import CreateCategoryList from "./CreateCategoryList";
const Slidebar = () => {
  const [allCategory, setAllCategory] = useState();
  useEffect(() => {
    axios
      .get("/category/filter")
      .then((response) => {
        setAllCategory(response.data);
      })
      .catch((err) => {});
  }, []);
  return (
    <div className="mt-3">
      <div
        className="offcanvas offcanvas-start all-category-slidebar position-absolute"
        tabIndex="-1"
        id="all-category"
        aria-labelledby="all-category"
      >
        <div className="offcanvas-header ">
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          >
            <p className="ps-5 ">ALL&nbsp;Category</p>
          </button>
        </div>
        <div className="offcanvas-body px-0">
          <div className="row mx-auto">
            {allCategory &&
              allCategory.map((c, index) => {
                return <CreateCategoryList category={c} key={index} />;
              })}
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Slidebar;
