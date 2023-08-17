import express from "express";
import {
  creatPaymentSession,
  verifySignature,
} from "../Controller/payment/payment.controller.js";
import TokenVerify from "../Middleware/tokenVerify.js";

const route = express.Router();

// verify user token
route.use(TokenVerify);
route.post("/create-checkout-session", creatPaymentSession);
route.post("/verify-signature", verifySignature);

export default route;
