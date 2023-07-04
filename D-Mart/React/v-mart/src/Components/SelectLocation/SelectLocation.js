import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Select, { components } from "react-select";
import { Link, useNavigate } from "react-router-dom";
import "./SelectLocation.css";

const SelectLocation = ({
  setSelectedOption,
  displaymodal,
  setDisplaymodal,
}) => {
  const navigate = useNavigate();

  const [store, setStore] = useState();
  const [options, setOptions] = useState(null);
  useEffect(() => {
    
    axios
      .get("/store")
      .then((response) => {
        setStore(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const locationhandler = () => {
    localStorage.setItem(
      "preferstore",
      JSON.stringify({
        id: options._id,
        store_name: options.store_name,
        city: options.city.city,
        Zipcode: options.Zipcode,
      })
    );
    setSelectedOption({
      id: options._id,
      store_name: options.store_name,
      city: options.city.city,
      Zipcode: options.Zipcode,
    });
    setDisplaymodal("none");
  };
  return (
    <div>
      <div
        className="modal show"
        style={{ display: displaymodal, overflow: "hidden" }}
      >
        <Modal.Dialog className="mx-auto modalstyle">
          <Modal.Body>
            <h5 className="text-center pb-0 ">
              Where should we deliver your order?
            </h5>
            <div className="p-3">
              <Select
                defaultValue={options}
                onChange={setOptions}
                options={store}
                placeholder="Enter your city, area or pincode"
                style={{ border: "1px solid green" }}
                getOptionLabel={(store) =>
                  `${store.Zipcode} - ${store.store_name}, ${store.city.city}`
                }
                getOptionValue={(option) => option._id}
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 5,
                  colors: {
                    ...theme.colors,
                    primary25: "lightgray",
                    primary: "green",
                  },
                })}
              />
            </div>
            <div style={{ minHeight: "30vh" }} className="text-center">
              {options && (
                <div>
                  <p className="text-secondary ps-3 text-success">
                    Your selected delivery location has following delivery
                    options :
                  </p>
                  <div className="d-flex justify-content-evenly mt-5">
                    <div className="d-md-flex ">
                      <div>
                        <img
                          src="./Images/home.svg"
                          alt="home delivery"
                          style={{ width: "3.5em" }}
                        />
                      </div>
                      <div className="p-3">
                        <h6 className="mb-0">Home Delivery</h6>
                        <p className="text-secondary">(charges Apply)</p>
                      </div>
                    </div>
                    <div className="d-md-flex ">
                      <div>
                        <img
                          src="./Images/pup.svg"
                          alt="home delivery"
                          style={{ width: "3.5em" }}
                        />
                      </div>
                      <div className="p-3 mt-1 mt-md-0">
                        <h6 className="mb-0">Pick up Point</h6>
                        <p className="text-secondary">(Free)</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-center mb-4">
                    <button
                      className="btn btn-success text-white px-5"
                      type="submit"
                      onClick={locationhandler}
                    >
                      START SHOPPING
                    </button>
                  </div>
                </div>
              )}
            </div>
          </Modal.Body>

          <Modal.Footer>
            <div className="row w-100 text-secondary ">
              <div className=" col-6 col-md-3 mx-auto text-center">
                <img
                  src="../Images/savings.svg"
                  alt="saving"
                  className="mb-2"
                  style={{ width: "2.5em" }}
                />
                <p>Daily Saving</p>
              </div>
              <div className=" col-6 col-md-3 mx-auto text-center">
                <img
                  src="../Images/discounts.svg"
                  alt="discounts"
                  className="mb-2"
                  style={{ width: "2.5em" }}
                />
                <p>Daily Saving</p>
              </div>
              <div className=" col-6 col-md-3 mx-auto text-center">
                <img
                  src="../Images/dailydelight.png"
                  alt="dailydelight"
                  className="mb-2"
                  style={{ width: "2.5em" }}
                />
                <p>Daily Saving</p>
              </div>
              <div className="col-6 col-md-3 mx-auto text-center">
                <img
                  src="../Images/secure-payment.svg"
                  alt="secure-payment"
                  className="mb-2"
                  style={{ width: "2.5em" }}
                />
                <p>Daily Saving</p>
              </div>
            </div>
          </Modal.Footer>
        </Modal.Dialog>
      </div>
    </div>
  );
};

export default SelectLocation;
