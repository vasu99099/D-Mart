import mongoose from "mongoose";

const schema = mongoose.Schema;

const addressSchema = new schema({
  user_id: {
    type: schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  FullName: {
    type: String,
    required: [true, "full name is required"],
  },
  PinCode: {
    type: String,
    required: [true, "pin code is required"],
    maxlength: [6, "pincode must be 6 character long"],
    minlength: [6, "pincode must be 6 character long"],
  },
  Area: {
    type: String,
    required: [true, "Area is required"],
  },
  Locality: {
    type: String,
    required: [true, "locality is required"],
  },
  Floor: {
    type: String,
    required: [true, "locality is required"],
  },
  Landmark: {
    type: String,
  },
  city: {
    type: schema.Types.ObjectId,
    ref: "city",
    reqquired: [true, "city is required"],
  },
  state: {
    type: schema.Types.ObjectId,
    ref: "state",
    reqquired: [true, "city is required"],
  },
  Phone: {
    type: String,
    maxlength: [10, "invalid number"],
    minlength: [10, "invalid number"],
  },
});

const addressModel = new mongoose.model("address", addressSchema);

export default addressModel;
