import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCartCount } from "../../App/slices/cart";
import { setDeliveryTimeslot } from "../../App/slices/userProfile";
const TimeSlot = ({ Toggle, setTimeSelected, timeSelected }) => {
  const dispatch=useDispatch()
  const { count, total, saving } = useSelector(getCartCount);
  const [selectedTimeZone, setSelectedTimeZone] = useState();
  const [availableDate, setAvailableDate] = useState();

  const [availableTimeZone, setAvailableTimeZone] = useState([
    "7:30 AM - 09:30 AM",
    "09:30 AM - 12:00 PM",
    "5:00 PM - 07:30 PM",
  ]);

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  useEffect(() => {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1);
    setSelectedTimeZone(
      `Tommorrow ${currentDate.getDate()}th ${
        months[currentDate.getMonth()]
      }, ${availableTimeZone[0]}`
    );
    const dates = [];
    for (let i = 1; i < 4; i++) {
      currentDate.setDate(new Date().getDate() + i);
      console.log(currentDate, i);

      dates.push(
        `${days[currentDate.getDay()]} ${currentDate.getDate()}th ${
          months[currentDate.getMonth()]
        } - ${currentDate.getFullYear()}`
      );
    }
    setAvailableDate(dates);
  }, []);

  return (
    <div className="mt-3">
      {Toggle ? (
        <div className="border rounded ">
          <div className="d-flex px-3 pt-2  border-bottom">
            <div className="me-3">
              {!timeSelected ? (
                <p className="green border rounded-circle px-2 backlightGreen">
                  2
                </p>
              ) : (
                <em class="fa-sharp fa-solid fa-circle-check fa-xl green me-3"></em>
              )}
            </div>
            <div>
              <p>Select a time slot </p>
            </div>
          </div>
          <div className=" my-2 px-4">
            <div
              class="alert alert-warning alert-dismissible fade show border-warning  "
              role="alert"
            >
              Earliest time slot suggested based on your delivery location.
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
              ></button>
            </div>
          </div>

          <div className="border mx-4 d-flex justify-content-between align-items-center pt-2 mb-3 ">
            <div className="d-flex ">
              <i class="fa-solid fa-truck-fast ps-3 pe-2"></i>
              <div>
                <p className="mb-0">
                  <span className="text-muted ">Shipment 1:</span>
                  <span className="ms-3 green fw-bold">
                    {count} <u>items</u>
                  </span>
                </p>
                <p className="fw-bold mb-1">{selectedTimeZone}</p>
              </div>
            </div>
            <div>
              <p
                className="green px-3"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
                onClick={() => setTimeSelected("")}
              >
                Change
              </p>
            </div>
          </div>
          {!timeSelected && (
            <div className="py-3 text-right px-4">
              <button
                className="btn backgreen text-white"
                data-bs-dismiss="alert"
                onClick={() => setTimeSelected(selectedTimeZone)}
              >
                CONTINUE
              </button>
            </div>
          )}
        </div>
      ) : (
        <div
          className={`d-flex justify-content-between align-items-center border rounded px-4 py-2 mt-3 }`}
        >
          {" "}
          <div className="d-flex px-3 pt-2  ">
            <div className="me-3">
              <p
                className=" border border-secondary rounded-circle px-2 "
                style={{ backgroundColor: "lightgray" }}
              >
                2
              </p>
            </div>
            <div>
              <p className="text-muted">Select a time slot </p>
            </div>
          </div>
        </div>
      )}
      <div
        class="modal fade "
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-lg modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-body mx-4">
              <p className="fw-bold">Select a time Slot</p>
              <p className="text-center">
                Shipment 1: <span className="text-muted">{count} items</span>
              </p>
              <div class="accordion" id="accordionExample">
                {availableDate &&
                  availableDate.map((date, index) => {
                    return (
                      <div class="accordion-item mb-3 border-success border-top">
                        <h2 class="accordion-header" id="headingTwo">
                          <button
                            class="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#accordion${index}`}
                            aria-expanded="false"
                            aria-controls={`accordion${index}`}
                          >
                            {date}
                          </button>
                        </h2>
                        <div
                          id={`accordion${index}`}
                          class="accordion-collapse collapse"
                          aria-labelledby="headingTwo"
                          data-bs-parent="#accordionExample"
                        >
                          <div class="accordion-body d-flex justify-content-around">
                            {availableTimeZone.map((time) => {
                              const valueTime = date + ", " + time;
                              return (
                                <button
                                  className="btn border px-3 bg-success text-white "
                                  value={valueTime}
                                  data-bs-dismiss="modal"
                                  onClick={(e) =>
                                    {setSelectedTimeZone(e.target.value)
                                   }
                                  }
                                >
                                  {time}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeSlot;
