import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getuser, setUserDeatils } from "../../App/slices/userProfile";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const profileSchema = Yup.object({
  First_name: Yup.string().trim().min(2).max(25).required(" required"),
  Last_name: Yup.string().trim().min(2).max(25).required(" required"),
  Email: Yup.string().trim().email(),
});

const Profile = () => {
  const navigate = useNavigate();
  const user = useSelector(getuser);
  const dispatch = useDispatch();
  const handelsubmit = (data) => {
    Object.keys(data).forEach((key) => {
      if (data[key] === "") {
        delete data[key];
      }
    });
    delete data.Phone;
    const config = {
      method: "PUT",
      url: `${process.env.REACT_APP_API_DOMAIN}/profile/user`,
      headers: {
        ContentType: "application/json",
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        dispatch(setUserDeatils(response.data));
        toast.success("Profile updated successfully");
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const initialValues = {
    Phone: user.Phone,
    First_name: user.First_name || "",
    Last_name: user.Last_name || "",
    Email: user.Email || "",
  };
  const { values, errors, touched, handleSubmit, handleChange, handleBlur } =
    useFormik({
      initialValues: initialValues,
      enableReinitialize: true,
      validationSchema: profileSchema,
      onSubmit: (values) => {
        handelsubmit(values);
      },
    });

  return (
    <div className="row">
      <h3 className="fw-bolder">Profile</h3>

      <form className="mt-3 col-4" onSubmit={handleSubmit}>
        <div class="row g-3 mb-3">
          <div class="col">
            <label className="form-label text-muted fs-14">Mobile Number</label>
            <p>+91 | {values.Phone}</p>
          </div>
          <div class="col cursor-pointer">
            <label className="form-label "></label>
            <p
              className="green fs-14 fw-bolder"
              onClick={() => navigate("/account/changeMobileNumber")}
            >
              Change Mobile Number
            </p>
          </div>
        </div>
        <div class="row g-3 mb-3">
          <div class="col">
            <label className="form-label text-muted fs-14">
              First Name*{" "}
              <span className="text-danger">
                {touched.First_name && errors.First_name}
              </span>
            </label>
            <input
              type="text"
              class="form-control form-control-sm"
              name="First_name"
              placeholder="First name"
              aria-label="First name"
              value={values.First_name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
          <div class="col">
            <label className="form-label text-muted fs-14">
              Last Name*{" "}
              <span className="text-danger">
                {touched.Last_name && errors.Last_name}
              </span>
            </label>
            <input
              type="text"
              name="Last_name"
              class="form-control form-control-sm"
              placeholder="Last name"
              aria-label="Last name"
              value={values.Last_name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label text-muted fs-14">
            Email (optional){" "}
            <span className="text-danger">{touched.Email && errors.Email}</span>
          </label>
          <input
            type="text"
            class="form-control form-control-sm"
            name="Email"
            value={values.Email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <label className="form-label text-danger fs-12">
            Email is not verified.
            <a className="text-decoration-underline">Verify now</a>
          </label>
        </div>
        <div>
          <button type="submit" className="btn backgreen text-white btn-block">
            SAVE CHANGES
          </button>
        </div>
      </form>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default Profile;
