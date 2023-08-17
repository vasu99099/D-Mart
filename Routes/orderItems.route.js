import express from "express";
import { getAllOrderItems } from "../Controller/orderItems/orderItems.js";
import TokenVerify from "../Middleware/tokenVerify.js";

const route = express.Router();

// verify user token
route.use(TokenVerify);

route.get("/", getAllOrderItems);
route.get("/:orderId", getAllOrderItems);

export default route;
