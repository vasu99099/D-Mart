import mongoose from "mongoose";

const schema = mongoose.Schema;

const storeviceProductSchema = new schema(
  {
    store_id: {
      type: schema.Types.ObjectId,
      ref: "store",
      required: true,
    },
    Product_id: {
      type: schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    MRP: {
      type: Number,
      required: true,
      min: 0,
    },
    D_mart_Price: {
      type: Number,
      required: true,
      min: 0,
    },
    Quantity_in_stock: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { timestamps: true }
);

const storeProductModel = mongoose.model(
  "storeProduct",
  storeviceProductSchema
);

export default storeProductModel;
