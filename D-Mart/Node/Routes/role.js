import express from "express";
import postRole from "../Controller/role/postRole.js";
import getRole from "../Controller/role/getRole.js";
import deleteRole from "../Controller/role/deleteRole.js";
import updateRole from "../Controller/role/putRole.js";

const route = express.Router();

route.post("/", postRole);
route.get("/", getRole);
route.get("/:roleId", getRole);
route.put("/:roleId", updateRole);
route.delete("/:roleId", deleteRole);

export default route;
