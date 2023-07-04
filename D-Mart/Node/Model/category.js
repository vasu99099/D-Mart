import mongoose from "mongoose";

const schema = mongoose.Schema;

const category = new schema(
  {
    category_name: {
      type: String,
      minlength: [
        3,
        "Minimum length of category should be greater than 3 character",
      ],
      required: [true, "category name is required"],
    },
    image: {
      type: schema.Types.ObjectId,
      ref: "image",
    },
    parent: {
      type: schema.Types.ObjectId,
      default: null,
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

const categoryModel = new mongoose.model("category", category);

export default categoryModel;
