import express from "express";
import postHomePage from "../Controller/homePage/postHomePage.js";
import getHomepage from "../Controller/homePage/getHomePage.js";
import deleteHomePage from "../Controller/homePage/deleteHomePage.js";
import updateHomePage from "../Controller/homePage/updateHomePage.js";
import hasAccess from "../Middleware/hasAccess.js";

const route = express.Router();

// unauthenicate routes
route.get("/", getHomepage);

// verify user role to access it
route.use(hasAccess);

// authenticate routes

route.get("/:homepageId", getHomepage);
route.post("/", postHomePage);
route.put("/:homepageId", updateHomePage);
route.delete("/:homepageId", deleteHomePage);

export default route;
