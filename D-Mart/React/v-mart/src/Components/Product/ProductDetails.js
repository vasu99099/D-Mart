import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import "./carousel.style.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { getStore } from "../App/slices/userProfile";
import { AddtoCartAsync, cartItemQty } from "../App/slices/cart";
const ProductDetails = () => {
  const dispatch = useDispatch();
  const userstore = useSelector(getStore);
  const { productName } = useParams();
  const [product, setProduct] = useState();
  const [selectedvariant, SetSelectedvariant] = useState();
  const [previewImage, setpreviewImage] = useState();
  const [slidetoShow, setSlideToShow] = useState(4);
  const shoppingCartQty = useSelector((state) => {
    if (selectedvariant) {
      cartItemQty(state, selectedvariant.Product_id._id);
    }
  });
  useEffect(() => console.log(shoppingCartQty), [shoppingCartQty]);
  useEffect(() => {
    const config = {
      method: "GET",
      url: `${process.env.REACT_APP_API_DOMAIN}/storeproduct/search/${userstore.id}?search=${productName}`,
      headers: {
        ContentType: "application/json",
      },
    };
    axios(config)
      .then(function (response) {
        console.log(response.data, "r");
        setpreviewImage(response.data[0].Product_id.Images[0].url);
        setProduct(response.data);
        SetSelectedvariant(response.data[0]);
        if (response.data[0].Product_id.Images.length < 4) {
          setSlideToShow(response.data[0].Product_id.Images.length);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const addTocartProduct = () => {
    const data = {
      API: {
        product_id: selectedvariant.Product_id._id,
        quantity: 1,
        storeProduct: selectedvariant._id,
      },
      product: {
        product_id: selectedvariant.Product_id._id,
        storeProduct: {
          D_mart_Price: selectedvariant.D_mart_Price,
          MRP: selectedvariant.MRP,
          Product_id: selectedvariant.Product_id._id,
        },
        quantity: 1,
      },
    };
    const data1 = dispatch(AddtoCartAsync(data));
  };
  // product.Product_id.Images.length < 4 ? product.Product_id.Images.length :
  const settings = {
    speed: 500,
    slidesToShow: slidetoShow,
    slidesToScroll: 3,
  };

  return (
    <div className=" m-0 p-3">
      <div className="container">
        <h3 className="text-secondary">Product details :</h3>
        {product && (
          <div className="row gap-5">
            <div className="col-3 ">
              <div className="">
                {console.log(previewImage, "preview")}
                <img
                  src={previewImage}
                  className="border w-100 p-4 img-fluid"
                />
              </div>
              <Slider {...settings} className="mt-3">
                {" "}
                {selectedvariant.Product_id.Images.map((p) => {
                  return (
                    <div style={{ maxWidth: "50px!important" }}>
                      <img
                        src={p.url}
                        alt="Product"
                        className="border p-2 w-100"
                        onClick={() => setpreviewImage(p.url)}
                      />
                    </div>
                  );
                })}
              </Slider>
            </div>
            <div className="col-7">
              <h3>
                <span className="ms-2 fw-normal">
                  {selectedvariant.Product_id.Name}
                </span>
              </h3>
              <p>Variant :</p>
              <div className="d-flex gap-3">
                {product.map((p, index) => {
                  return (
                    <p
                      className="border green p-2 px-3 border-success"
                      onClick={() => {
                        SetSelectedvariant(product[index]);
                        setSlideToShow(product[index].Product_id.Images.length);
                      }}
                    >
                      {p.Product_id.Packing_size} {p.Product_id.unit}
                    </p>
                  );
                })}
              </div>
              <p class="card-text">
                Price:{" "}
                <del className="me-2 text-muted">₹ {selectedvariant.MRP}</del>₹{" "}
                {selectedvariant.D_mart_Price}
              </p>
              {/* <p class="card-text">Description: {product.Product_id.Description}</p> */}
              <p class="card-text  text-capitalize">
                country of origin:{" "}
                {selectedvariant.Product_id.Country_of_Origin}
              </p>

              <p className=" px-3 w-25 text-success text-center backlightGreen">
                save
                <br />₹ {selectedvariant.MRP - selectedvariant.D_mart_Price}
              </p>
              {shoppingCartQty !== 0 ? (
                <div className="d-grid my-2 mx-2">
                  <button
                    className="btn btn-block text-white addtoocart"
                    // value={_id}
                    onClick={addTocartProduct}
                  >
                    <i className="fa-solid fa-cart-shopping fa-flip-horizontal"></i>{" "}
                    ADD TO CART
                  </button>
                </div>
              ) : (
                <div className="mx-auto d-flex  justify-content-between my-3 ">
                  <div
                    className="btn-group mx-2"
                    role="group"
                    aria-label="Basic mixed styles example"
                  >
                    <button
                      type="button"
                      className="btn addtoocart text-white px-3  rounded-0"
                      // onClick={() => updateQty(1)}
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
                        // updateQty(-1);
                      }}
                    >
                      <i className="fa-solid fa-minus "></i>
                    </button>
                  </div>
                  <div>
                    <button
                      className="border btn rounded-0 mx-2"
                      // onClick={() => updateQty(-shoppingCartQty)}
                    >
                      <i className="fa-solid fa-xmark"></i>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
