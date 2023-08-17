import express from "express";
import {
  deleteAddress,
  getAddress,
  postAddress,
  updateAddress,
} from "../Controller/address/address.controller.js";
import TokenVerify from "../Middleware/tokenVerify.js";

const route = express.Router();

// verify token middleware
route.use(TokenVerify);

route.post("/", postAddress);
route.get("/", getAddress);
route.put("/:addressId", updateAddress);
route.delete("/:addressId", deleteAddress);

export default route;
