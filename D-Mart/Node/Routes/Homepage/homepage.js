import express from "express";
import postHomePage from "../../Controller/homePage/postHomePage.js";
import getHomepage from "../../Controller/homePage/getHomePage.js";
// import getHomepage from "../../Controller/role/getRole.js";
// import deleteRole from "../../Controller/role/deleteRole.js";
// import updateRole from "../../Controller/role/putRole.js";

const route = express.Router();

route.post("/", postHomePage);
route.get("/", getHomepage);
// route.get("/:roleId", getRole);
// route.put("/:roleId", updateRole);
// route.delete("/:roleId", deleteRole);

export default route;
