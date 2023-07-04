import express from "express";

import {
  updatePickUpPoint,
  getPickupPoint,
  postPickupPoint,
  deletePickUpPoint,
} from "../Controller/Pickup/pickUpPoint.controller.js";
const route = express.Router();

route.post("/", postPickupPoint);
route.get("/:pickup_id", getPickupPoint);
route.put("/:pickup_id", updatePickUpPoint);
route.delete("/:pickup_id", deletePickUpPoint);
export default route;
