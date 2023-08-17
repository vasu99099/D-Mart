import mongoose from "mongoose";

const schema = mongoose.Schema;

const paymentSchema = new schema(
  {
    payment_id: {
      type: String,
      required: true,
      immutable: true,
    },
    order_id: {
      type: String,
      required: true,
      ref: "order",
      immutable: true,
    },
    Payments_date: {
      type: Date,
      default: Date.now,
      required: true,
      immutable: true,
    },
    Total_amount: {
      type: Number,
      min: 1,
      required: true,
      immutable: true,
    },
  },
  { timestamps: true }
);

const paymentModel = new mongoose.model("payment", paymentSchema);

export default paymentModel;
