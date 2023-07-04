import mongoose from "mongoose";

const schema = mongoose.Schema;

const citySchema = new schema({
  city: {
    type: String,
    minlength: [
      3,
      "Minimum length of state name  should be greater than 3 character",
    ],
    required: [true, "state name is required"],
  },
  state_id: {
    type: schema.Types.ObjectId,
    ref: "state",
    required: true
  },
});

const cityModel = new mongoose.model("city", citySchema);

export default cityModel;
