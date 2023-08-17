import express from "express";
import postRole from "../Controller/role/postRole.js";
import getRole from "../Controller/role/getRole.js";
import deleteRole from "../Controller/role/deleteRole.js";
import updateRole from "../Controller/role/putRole.js";
import hasAccess from "../Middleware/hasAccess.js";

const route = express.Router();

// unauthenticate routes
route.get("/", getRole);
route.get("/:roleId", getRole);

// verify user role to access routes
route.use(hasAccess);

// authenticate routes
route.post("/", postRole);
route.put("/:roleId", updateRole);
route.delete("/:roleId", deleteRole);

export default route;
