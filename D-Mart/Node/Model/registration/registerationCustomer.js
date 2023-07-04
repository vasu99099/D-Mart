import mongoose from "mongoose";

const schema = mongoose.Schema;

const registerationCustomer = new schema({
  First_name: {
    type: String,
    minlength: [3, "Minimum length of name should be greater than 3 character"],
  },
  Last_name: {
    type: String,
    minlength: [3, "Minimum length of name should be greater than 3 character"],
  },
  Email: {
    type: String,
    validate: {
      validator: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      message: "please enter valid email",
    },
  },

  Phone: {
    type: String,
    required: [true, "Phone Number is required"],
    unique: [true, "already registered"],
    validate: {
      validator: /^\d{10,12}$/,
      message: "please enter valid Phone number",
    },
  },
  Address: [
    {
      type: String,
    },
  ],
  Role: {
    type: schema.Types.ObjectId,
    ref: "role",
    required: true,
    default: "647824eee03df92bf37f5bf5",
  },
  preferStore: {
    type: schema.Types.ObjectId,
    ref: "store",
  },
  OTP: {
    type: String,
    minlength: 4,
    validate: /^\d{4}$/,
  },
});

const registerationCustomerModel = new mongoose.model(
  "user",
  registerationCustomer
);

export default registerationCustomerModel;
