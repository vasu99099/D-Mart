import express from "express";
import postState from "../Controller/state/postState.js";
import getState from "../Controller/state/getState.js";
import deleteState from "../Controller/state/deleteState.js";
import updateState from "../Controller/state/putState.js";
import updateCity from "../Controller/city/putCity.js";
import getCity from "../Controller/city/getCity.js";
import deleteCity from "../Controller/city/deleteCity.js";
import postCity from "../Controller/city/postCity.js";

const route = express.Router();

route.post("/", postState);
route.get("/", getState);
route.get("/:stateId", getState);
route.put("/:stateId", updateState);
route.delete("/:stateId", deleteState);
route.post("/city/", postCity);
route.get("/city/", getCity);
route.get("/city/:cityId", getCity);
route.put("/city/:cityId", updateCity);
route.delete("/city/:cityId", deleteCity);

export default route;
