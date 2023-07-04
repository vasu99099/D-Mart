import express from "express";
import postCart from "../Controller/cart/cart.controller.js";
import { getCart, putCart } from "../Controller/cart/cart.controller.js";
import TokenVerify from "../Controller/middleware/TokenVerify.js";

const route = express.Router();
route.post("/", postCart);
route.get("/", getCart);
route.use(TokenVerify);
route.put("/", putCart);

export default route;
