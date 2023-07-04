import express from "express";

import {
  deleteAddress,
  getAddress,
  postAddress,
  updateAddress,
} from "../Controller/Address/address.controller.js";
const route = express.Router();

route.post("/", postAddress);
route.get("/", getAddress);
route.put("/:addressId", updateAddress);
route.delete("/:addressId", deleteAddress);
export default route;
