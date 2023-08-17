import mongoose from "mongoose";

const schema = mongoose.Schema;

const pickupSchema = new schema(
  {
    store_id: {
      type: schema.Types.ObjectId,
      ref: "store",
      required: true,
    },
    name: {
      type: String,
      minlength: 3,
      required: true,
    },
    Address: {
      type: String,
      minlength: 3,
      required: true,
    },
    Location_Name: {
      type: String,
      minlength: 2,
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
    Phone: {
      type: String,
      required: [true, "Phone Number is required"],
      unique: [true, "already registered"],
      validate: {
        validator: /^\d{10}$/,
        message: "please enter valid Phone number",
      },
    },
    longitude: {
      type: String,
      minlength: 2,
      required: true,
    },
    latitude: {
      type: String,
      minlength: 2,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const PickupPointModel = new mongoose.model("pickupPoint", pickupSchema);

export default PickupPointModel;
