import express from "express";

import updateCity from "../Controller/city/putCity.js";
import getCity from "../Controller/city/getCity.js";
import deleteCity from "../Controller/city/deleteCity.js";
import postCity from "../Controller/city/postCity.js";
import hasAccess from "../Middleware/hasAccess.js";


const route = express.Router();

// unauthenticated routes
route.get("/city/:stateId", getCity);
route.get("/", getCity);

// verify user role to access it
route.use(hasAccess);

// authenticate routes
route.post("/", postCity);
route.put("/:cityId", updateCity);
route.delete("/:cityId", deleteCity);

export default route;
