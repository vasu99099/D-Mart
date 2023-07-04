import mongoose from "mongoose";

const schema = mongoose.Schema;

const stateSchema = new schema({
  state: {
    type: String,
    minlength: [
      3,
      "Minimum length of state name  should be greater than 3 character",
    ],
    required: [true, "state name is required"],
  },
});

const stateModel = new mongoose.model("state", stateSchema);

export default stateModel;
