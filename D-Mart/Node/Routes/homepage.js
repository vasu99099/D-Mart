import express from "express";
import postHomePage from "../Controller/homePage/postHomePage.js";
import getHomepage from "../Controller/homePage/getHomePage.js";

const route = express.Router();

route.post("/", postHomePage);
route.get("/", getHomepage);

export default route;
