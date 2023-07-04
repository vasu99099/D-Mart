import React from "react";

const PickupPoints = ({ pickupPoint }) => {
  return (
    <div>
      <div
        class="modal  fade "
        id="PickUpViewAll"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-xl">
          <div class="modal-content">
            <div class="modal-header">
              <h6 class="modal-title" id="staticBackdropLabel">
                Choose your pick-up point
              </h6>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body row">
              <div className="col-8">
                {pickupPoint &&
                  pickupPoint.map((pickup, index) => {
                    return (
                      <label
                        htmlFor={pickup._id}
                        className={`d-flex justify-content-between align-items-center border px-4 py-2 mt-3 me-4 `}
                      >
                        {" "}
                        <div className="d-flex ">
                          <input
                            type="radio"
                            name="address"
                            value={pickup._id}
                            id={pickup._id}
                            className="me-4"
                            // onChange={(e) => setSelectedAddress(e.target.value)}
                            // checked={
                            //   SelectedAddress == pickup._id ? true : false
                            // }
                          />
                          <div>
                            <h6 className="mb-0 fw-bold">{pickup.name}</h6>
                            <p className="fs-14 text-muted mb-0">
                              {pickup.Address}
                            </p>
                          </div>
                        </div>
                        <div
                          className="cursor-pointer"
                          data-bs-toggle="modal"
                          data-bs-target="#PickUpViewAll"
                        >
                          <em class="fa-solid green fa-location-dot me-2"></em>
                          <span className="green">view map</span>
                        </div>
                      </label>
                    );
                  })}
              </div>
              <div className="col-4">
                <iframe
                  src="https://www.google.com/maps/@23.0926205,72.5323136,15z?entry=ttu"
                  name="iframe_a"
                  height="300px"
                  width="100%"
                  title="Iframe Example"
                ></iframe>
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
              <button type="button" class="btn btn-primary">
                Understood
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PickupPoints;
