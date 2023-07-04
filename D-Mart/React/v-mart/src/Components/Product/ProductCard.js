import React, { useState } from "react";
import axios from "axios";
const ProductCard = ({ product, qty }) => {
  const [pqty, setPqty] = useState(qty);

  const { type, MRP, D_mart_Price } = product;
  const { Name, Packing_size, unit,_id } = product.Product_id;
  const { url, alt, title } = product.Product_id.Images[0];

  const price = D_mart_Price / Packing_size;

  const updateQty = (uqty) => {
    let updatedQty = pqty + uqty;
    const data = {
      product_id: _id,
      quantity: updatedQty,
    };
    const config = {
      method: "PUT",
      url: "/cart",
      headers: {
        ContentType: "application/json",
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        setPqty(updatedQty);  
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const addTocartProduct = () => {
    console.log(product)
    const data = {
      product_id: _id,
      quantity: 1,
    };
    var config = {
      method: "POST",
      url: "/cart",
      headers: {
        ContentType: "application/json",
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        setPqty(1);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className=" p-1 row col-12 mx-0 col-md-6 col-lg-4 col-xl-3 mb-3">
      <div className={pqty && pqty > 0 ? "card border-success" : "card"}>
        <div className="d-flex d-lg-block">
          <div className="d-flex align-items-top position-relative">
            <img
              src={url}
              className="mx-auto mt-2 p-2  card-img-top  grow"
              alt={alt}
              title={title}
            />
            {product.Type == "veg" ? (
              <img
                src="../Images/vegeterian.svg"
                className="veg ps-muto position-absolute end-0 m-2"
                alt="tag"
                title="vegeterian"
              />
            ) : (
              ""
            )}
          </div>
          <div className="card-body px-0 px-lg-2">
            <h5 className="fs-6 ">{`${Name} : ${Packing_size} ${unit}`}</h5>
            <div className="d-flex justify-content-between">
              <div>
                <div className="d-flex ms-3">
                  <div className="text-muted me-3">
                    <p className="my-0">MRP</p>
                    <p className="my-0">
                      ₹ <del>{MRP}</del>
                    </p>
                  </div>
                  <div>
                    <p className="my-0">MRP</p>
                    <p className="my-0">₹ {D_mart_Price}</p>
                  </div>
                </div>
                <p className="text-muted my-0 py-0 ">
                  <i>(Inclusive of all taxes)</i>
                </p>
              </div>
              <div className="text-success bg-light fw-bold rounded px-3 mt-3">
                <p className="my-0 ">Save</p>
                <p className="fs-6">₹ {MRP - D_mart_Price}</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="mx-auto">
            <p className="my-0 px-2 py-1 border border-success rounded  ">
              {`${Packing_size}${unit}`}{" "}
              <span className="text-muted">
                (₹ {price} / 1 {unit})
              </span>
            </p>
          </div>
          {pqty === 0 ? (
            <div className="d-grid my-2">
              <button
                className="btn btn-block text-white addtoocart"
                value={_id}
                onClick={addTocartProduct}
              >
                <i className="fa-solid fa-cart-shopping fa-flip-horizontal"></i>{" "}
                ADD TO CART
              </button>
            </div>
          ) : (
            <div className="mx-auto d-flex  justify-content-between my-3">
              <div
                className="btn-group"
                role="group"
                aria-label="Basic mixed styles example"
              >
                <button
                  type="button"
                  className="btn addtoocart text-white px-3  rounded-0"
                  onClick={() => updateQty(1)}
                >
                  <i className="fa-solid fa-plus "></i>
                </button>
                <button type="button" className=" px-4 border rounded-0">
                  {pqty}
                </button>
                <button
                  type="button"
                  className="btn addtoocart text-white px-3 rounded-0"
                  onClick={() => {
                    updateQty(-1);
                  }}
                >
                  <i className="fa-solid fa-minus "></i>
                </button>
              </div>
              <div>
                <button
                  className="border btn rounded-0"
                  onClick={() => updateQty(-pqty)}
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
