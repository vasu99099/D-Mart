import mongoose from "mongoose";

const schema = mongoose.Schema;

const pickupSchema = new schema({
  store_id: {
    type: schema.Types.ObjectId,
    ref: "store",
  },
  name: {
    type: String,
    minlength: 3,
    required: true,
  },
  Address: {
    type: String,
    minlength: 5,
    required: true,
  },
  Location_Name: {
    type: String,
    minlength: 2,
    required: true,
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
});

const PickupPointModel = new mongoose.model("pickupPoint", pickupSchema);

export default PickupPointModel;
