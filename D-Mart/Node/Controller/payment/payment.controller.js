import Razorpay from "razorpay";
import crypto from "crypto";
import mongoose from "mongoose";
import paymentModel from "../../Model/payment.model.js";
import { postOrder } from "../order/order.controller.js";
export const creatPaymentSession = (req, res) => {
  console.log(req.body, "hello world");
  const { amount, currency } = req.body;
  var instance = new Razorpay({
    key_id: "rzp_test_VjEt3qjz7LZAHV",
    key_secret: "aNwOhpMw44qmI4aeZh2MI51y",
  });
  instance.orders.create({ amount, currency }, (err, order) => {
    //STEP 3 & 4:
    if (!err) {
      console.log(order);
      res.json(order);
    } else {
      console.log(err);
      res.send(err);
    }
  });
};
export const verifySignature = async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    Total_amount,
  } = req.body;
  console.log(req.body);

  const generatedSignature = crypto
    .createHmac("sha256", "aNwOhpMw44qmI4aeZh2MI51y")
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  if (generatedSignature === razorpay_signature) {
    await postOrder(req, res);
  } else {
    res.status(400).json({ status: "failure" });
  }
};

// export paymentCOD

export const postPayment = async (req, res) => {
  try {
    const pickup = await new paymentModel(req.body);
    await pickup.save();
    res.status(200).send(pickup);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};
