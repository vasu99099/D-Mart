import mongoose from "mongoose";

const schema = mongoose.Schema;

const brand = new schema({
  name: {
    type: String,
    minlength: [3, "Minimum length of name should be greater than 3 character"],
    required: [true, "Brande name is required"],
  },
});

const brandModel = new mongoose.model(
  "brand",
  brand
);

export default brandModel;
