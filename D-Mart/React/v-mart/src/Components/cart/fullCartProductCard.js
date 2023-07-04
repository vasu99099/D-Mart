import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AddtoCartAsync,
  cartItemQty,
  updateCartAsync,
} from "../App/slices/cart";
const FullCartProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { MRP, D_mart_Price } = product;
  const { Name, Packing_size, unit, _id } = product.Product_id;
  const { url, alt, title } = product.Product_id.Images[0];
  const price = D_mart_Price / Packing_size;
  const shoppingCartQty = useSelector((state) => cartItemQty(state, _id));
  /**
   * The function updates the quantity of a product into cart
   * It will call when product is already in cart
   */

  const updateQty = (uqty) => {
    let updatedQty = shoppingCartQty + uqty;
    const data = {
      API: {
        product_id: _id,
        quantity: updatedQty,
        storeProduct: product._id,
      },
      product: {
        product_id: product.Product_id,
        storeProduct: { D_mart_Price, MRP, Product_id: _id },
        quantity: updatedQty,
      },
    };
    dispatch(updateCartAsync(data));
  };
  const addTocartProduct = () => {
    const data = {
      API: {
        product_id: _id,
        quantity: 1,
        storeProduct: product._id,
      },
      product: {
        product_id: product.Product_id,
        storeProduct: { D_mart_Price, MRP, Product_id: _id },
        quantity: 1,
      },
    };
    const data1 = dispatch(AddtoCartAsync(data));
  };

  return (
    <div className=" p-1 row col-12 mx-0 mb-3">
      <div className="card">
        <div className="row align-items-center">
          <div className="col-4 d-flex">
            {" "}
            <div className="d-flex align-items-top position-relative">
              <img
                src={url}
                className="mx-auto mt-2 p-2 grow"
                style={{ width: "100px" }}
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
            <div className="card-body px-0 px-lg-2 ms-3">
              <h5 className="fs-6 ">{`${Name} : ${Packing_size} ${unit}`}</h5>
              <div className="d-flex justify-content-between">
                <div>
                  <div>
                    {" "}
                    <p className="my-0 pt-3">
                      Variant : <strong>{`${Packing_size}${unit}`} </strong>{" "}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-3">
            {/* product quantity is zero then display add to cart button rather then + or - utton will display */}
            <div className="mx-auto d-flex  justify-content-between my-1">
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
                  {shoppingCartQty}
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
            </div>
          </div>
          <div className="col-2">
            <div className="fw-bold rounded px-2 ">
              <p className="my-0 ">₹ {shoppingCartQty * D_mart_Price}</p>
            </div>
          </div>
          <div className="col-2">
            <div className="text-success fw-bold rounded px-2 ">
              <p className="my-0 ">
                ₹ {shoppingCartQty * (MRP - D_mart_Price)}
              </p>
            </div>
          </div>
          <div className="col-1">
            <div>
              <button
                className="border btn rounded"
                onClick={() => updateQty(-shoppingCartQty)}
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullCartProductCard;