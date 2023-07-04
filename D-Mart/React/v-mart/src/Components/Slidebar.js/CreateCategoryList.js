import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import "./slidebarAllCategory.css";
const CreateCategoryList = (props) => {
  const navigate=useNavigate();
  const { category } = props.category;
  const { children } = props.category;
  const { image, category_name } = category;
  const [toggle, setToggle] = useState(false);
  return (
    <div className="my-2 col-lg-2">
      <div className="mx-0 px-0 py-2">
        <div className="d-flex d-lg-block">
          <div className="ms-2" data-bs-dismiss="offcanvas" onClick={()=>navigate('/product/'+category._id)}>
            {" "}
            {image && (
              <img
                src={image.url}
                alt={image.alt}
                title={image.title}
                className="category-img"
              />
            )}
          </div>
          <div className="ms-4 list-category ">
            <h5 className="my-2 fw-bold category-title cursor-pointer fs-6" data-bs-dismiss="offcanvas" onClick={()=>navigate('/product/'+category._id)}>{category_name}</h5>
            <ul
              className={
                !toggle
                  ? "list-group list-style-none flex-lg-column flex-row "
                  : "list-group list-style-none  list-category"
              }
            >
              {children.map((child, index) => {
                return (
                  <li key={index}>
                    <Link
                      to={`/product/${child.category._id}`}
                      className="sub-category"
                      data-bs-dismiss="offcanvas"
                    >
                      {child.category.category_name}
                      <span className="d-lg-none ">, </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div
            className=" ms-auto mt-3 d-lg-none"
            onClick={() => setToggle(!toggle)}
          >
            {!toggle ? (
              <i className="fas fa-plus float-right rounded-circle bg-secondary p-1 mx-3"></i>
            ) : (
              <i className="fas fa-minus float-right rounded-circle bg-secondary p-1 mx-3"></i>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCategoryList;
