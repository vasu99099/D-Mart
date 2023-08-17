import express from "express";
import {
  cancelOrder,
  getAllOrder,
  postOrder,
  updateOrder,
} from "../Controller/order/order.controller.js";
import hasAccess from "../Middleware/hasAccess.js";
import TokenVerify from "../Middleware/tokenVerify.js";
import { verifyStock } from "../Controller/order/stockVerify.controller.js";

const route = express.Router();

// verify user token
route.use(TokenVerify);

route.post("/", postOrder);
route.get("/verifyStock", verifyStock);
// verify user role to access it
route.use(hasAccess);

// authenticate routes
route.put("/:orderId", updateOrder);
route.get("/", getAllOrder);
route.get("/cancel/:orderId", cancelOrder);

export default route;
