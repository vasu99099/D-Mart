import express from "express";

import {
  updatePickUpPoint,
  getPickupPoint,
  postPickupPoint,
  deletePickUpPoint,
} from "../Controller/pickup/pickUpPoint.controller.js";

import hasAccess from "../Middleware/hasAccess.js";
const route = express.Router();

// unauthenticate routes
route.get("/:store_id", getPickupPoint);

// verify user role to access routes
route.use(hasAccess);

// authenticate routes
route.get("/", getPickupPoint);
route.get("/pickup/:pickUpId", getPickupPoint);
route.post("/", postPickupPoint);
route.put("/:pickup_id", updatePickUpPoint);
route.delete("/:pickup_id", deletePickUpPoint);
export default route;
