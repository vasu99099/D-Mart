import mongoose from "mongoose";

const schema = mongoose.Schema;

const store = new schema(
  {
    store_name: {
      type: String,
      minlength: [
        3,
        "Minimum length of name should be greater than 3 character",
      ],
      required: [true, "store name is required"],
    },
    Address: {
      type: String,
      minlength: [
        5,
        "Minimum length of name should be greater than 3 character",
      ],
      required: [true, "address is required"],
    },
    Zipcode: {
      type: String,
      minlength: 6,
      required: [true, "zipcode is required"],
      validate: {
        validator: /^\d{6}$/,
        message: "length of zipcode must be 6",
      },
    },
    Phone: {
      type: String,
      required: [true, "Phone Number is required"],
      unique: [true, "already registered"],
      validate: {
        validator: /^\d{10}$/,
        message: "please enter valid Phone number",
      },
    },
    city: {
      type: schema.Types.ObjectId,
      required: true,
      ref: "city",
    },
    state: {
      type: schema.Types.ObjectId,
      ref: "state",
      required: true,
    },
    Email: {
      type: String,
      validate: {
        validator: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        message: "please enter valid email",
      },
      required: true,
    },
    createdBy: {
      type: schema.Types.ObjectId,
      ref: "user",
    },
    modifyBy: {
      type: schema.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);

const storeModel = new mongoose.model("store", store);

export default storeModel;
