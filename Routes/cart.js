import express from "express";
import postCart, { getCart, putCart } from "../Controller/cart/cart.controller.js";
import TokenVerify from "../Middleware/tokenVerify.js";

const route = express.Router();

// unverified routes
route.post("/", postCart);
route.get("/", getCart);

// verify token
route.use(TokenVerify);

// user verified routes
route.put("/", putCart);

export default route;
