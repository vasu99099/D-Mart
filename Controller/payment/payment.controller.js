import Razorpay from "razorpay";
import crypto from "crypto";
import paymentModel from "../../Model/payment.model.js";
import { postOrder } from "../order/order.controller.js";

/**
 * The function `creatPaymentSession` creates a payment session using the Razorpay API and returns the
 * order details.
 */
export const creatPaymentSession = (req, res) => {
  const { amount, currency } = req.body;
  var instance = new Razorpay({
    key_id: process.env.RAZOR_PAY_KEY_ID,
    key_secret: process.env.RAZOR_PAY_KEY_SECRET,
  });
  instance.orders.create({ amount, currency }, (err, order) => {
    //STEP 3 & 4:
    if (!err) {
      res.json(order);
    } else {
      res.status(402).send({ message: err.message });
    }
  });
};
/**
 * The function `verifySignature` verifies the signature of a payment made using Razorpay and calls the
 * `postOrder` function if the signature is valid.
 */
export const verifySignature = async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  } = req.body;

  const generatedSignature = crypto
    .createHmac("sha256", process.env.RAZOR_PAY_KEY_SECRET)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  if (generatedSignature === razorpay_signature) {
    await postOrder(req, res);
  } else {
    res.status(400).json({ status: "failure" });
  }
};

/**
 * The function `postPayment` saves a new payment record in the database and sends a response with the
 * saved record.
 */
export const postPayment = async (req, res) => {
  try {
    const pickup = await new paymentModel(req.body);
    await pickup.save();
    res.status(200).send(pickup);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};
