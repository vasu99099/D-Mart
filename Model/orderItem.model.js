import mongoose from "mongoose";

const schema = mongoose.Schema;

const orderItemSchema = new schema(
  {
    order_id: {
      type: schema.Types.ObjectId,
      ref: "order",
      required: [true, "order id must be required"],
    },
    user_id: {
      type: schema.Types.ObjectId,
      ref: "user",
    },
    product_id: {
      type: schema.Types.ObjectId,
      ref: "Product",
      required: [true, "product id must be required"],
    },
    storeProduct_Id: {
      type: schema.Types.ObjectId,
      ref: "storeProduct",
      required: true,
    },
    quantity: {
      type: Number,
      min: 1,
      required: true,
    },
    Price: {
      type: Number,
      min: 1,
      required: true,
    },
  },
  { timestamps: true }
);

const orderItemModel = new mongoose.model("orderItem", orderItemSchema);

export default orderItemModel;
