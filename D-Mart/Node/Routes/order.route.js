import express from "express";
import TokenVerify from "../Controller/middleware/TokenVerify.js";
import {
  postOrder,
  updateOrder,
} from "../Controller/order/order.controller.js";

const route = express.Router();
route.post("/", postOrder);
// route.get("/", getAllOrder);
route.put("/:orderId", updateOrder);
// route.use(TokenVerify);

export default route;
