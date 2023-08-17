import mongoose from "mongoose";

const schema = mongoose.Schema;

const trackSchema = new schema({
  tracking: {
    type: String,
    minlength: [
      3,
      "Minimum length of track should be greater than 3 character",
    ],
    required: [true, "tracking  is required"],
  },
}, { timestamps: true });

const trackModel = new mongoose.model("track", trackSchema);

export default trackModel;
