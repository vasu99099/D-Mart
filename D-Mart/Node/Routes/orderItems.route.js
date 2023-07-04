import express from "express";
import { getAllOrderItems } from "../Controller/orderItems/orderItems.js";

const route = express.Router();
// route.post("/", postOrder);
route.get("/", getAllOrderItems);
// route.put("/:orderId", updateOrder);
// route.use(TokenVerify);

export default route;
