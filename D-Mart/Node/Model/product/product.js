import mongoose from "mongoose";

const schema = mongoose.Schema;

const productSchema = new schema({
  Category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
    required: true,
  },
  Brand_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "brand",
  },
  Name: {
    type: String,
    minlength: [3, "Minimum length of name should be greater than 3 character"],
    required: [true, "Product name is required"],
  },
  Images: [
    {
      type: String,
      required: [true, "Product image is required"],
      ref: "image",
    },
  ],
  Packing_size: { type: Number, required: true },
  unit: {
    type: String,
    enum: ["gms", "Kg", "Nos", "m"],
  },
  Description: {
    type: String,
    minlength: [
      5,
      "Minimum length of description should be greater than 5 character",
    ],
  },
  Country_of_Origin: {
    type: String,
    required: true,
  },
  Disclaimer: {
    type: String,
    required: true,
  },
  Type: {
    type: String,
    enum: ["veg", "non-veg"],
    required: true,
  },
});

const ProductModel = mongoose.model("Product", productSchema);

export default ProductModel;
